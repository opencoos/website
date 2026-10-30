// Server-only loader for the specification source. The source lives in spec/ by default;
// set SPEC_DIR to read from a separately checked-out specification repository instead.
import fs from "node:fs";
import path from "node:path";
import type {
  Changelog,
  Domain,
  Entity,
  EntityStatus,
  Field,
  Manifest,
  Relationship,
  SharedDefinition,
} from "./types";

type JsonSchema = Record<string, unknown> & {
  type?: string;
  description?: string;
  $ref?: string;
  enum?: string[];
  properties?: Record<string, JsonSchema>;
  required?: string[];
  items?: JsonSchema;
};

// Every page that reads the spec is prerendered at build time, so the spec directory
// does not need to be traced into the server bundle.
const SPEC_DIR = path.resolve(/*turbopackIgnore: true*/ process.env.SPEC_DIR ?? path.join(process.cwd(), "spec"));
const COMMON_REF = /#\/\$defs\/(\w+)$/;

const readJson = <T>(...segments: string[]): T =>
  JSON.parse(fs.readFileSync(path.join(SPEC_DIR, ...segments), "utf8")) as T;

function constraintsOf(schema: JsonSchema): string[] {
  const out: string[] = [];
  if (schema.format) out.push(`format: ${schema.format}`);
  if (schema.pattern) out.push(`pattern: ${schema.pattern}`);
  if (schema.minLength !== undefined) out.push(`min length ${schema.minLength}`);
  if (schema.maxLength !== undefined) out.push(`max length ${schema.maxLength}`);
  if (schema.minimum !== undefined) out.push(`≥ ${schema.minimum}`);
  if (schema.exclusiveMinimum !== undefined) out.push(`> ${schema.exclusiveMinimum}`);
  if (schema.maximum !== undefined) out.push(`≤ ${schema.maximum}`);
  if (schema.uniqueItems) out.push("unique items");
  return out;
}

function sharedName(schema: JsonSchema) {
  return schema.$ref?.match(COMMON_REF)?.[1];
}

function typeLabel(schema: JsonSchema): string {
  const shared = sharedName(schema);
  if (shared) return shared;
  if (schema.enum) return "enum";
  if (schema.type === "array" && schema.items) return `array<${typeLabel(schema.items)}>`;
  return schema.type ?? "any";
}

function toFields(schema: JsonSchema): Field[] {
  const required = new Set(schema.required ?? []);
  return Object.entries(schema.properties ?? {}).map(([name, prop]) => {
    const item = prop.type === "array" ? prop.items : undefined;
    const target = (prop["x-references"] ?? item?.["x-references"]) as string | undefined;
    const enumSource = prop.enum ? prop : item?.enum ? item : undefined;
    const enumDescriptions = (enumSource?.["x-enumDescriptions"] ?? {}) as Record<string, string>;
    const nested = prop.type === "object" ? prop : item?.type === "object" ? item : undefined;
    return {
      name,
      type: typeLabel(prop),
      sharedType: sharedName(prop) ?? (item ? sharedName(item) : undefined),
      description: prop.description ?? "",
      required: required.has(name),
      constraints: constraintsOf(prop),
      enumValues: enumSource?.enum?.map((value) => ({ value, description: enumDescriptions[value] })),
      references: target,
      children: nested?.properties ? toFields(nested) : undefined,
    };
  });
}

let cache: { manifest: Manifest; domains: Domain[]; entities: Entity[]; shared: SharedDefinition[]; changelog: Changelog } | null =
  null;

function load() {
  if (cache) return cache;
  const manifest = readJson<Manifest>("spec.json");
  const base = `/spec/${manifest.version}`;

  const schemaFiles = (fs.readdirSync(path.join(SPEC_DIR, "schemas"), { recursive: true }) as string[])
    .filter((f) => f.endsWith(".schema.json") && f !== "common.schema.json")
    .sort();

  const entities: Entity[] = schemaFiles.map((file) => {
    const schema = readJson<JsonSchema>("schemas", file);
    const name = schema.title as string;
    return {
      name,
      domain: schema["x-domain"] as string,
      status: schema["x-status"] as EntityStatus,
      since: schema["x-since"] as string,
      description: schema.description ?? "",
      fields: toFields(schema),
      relationships: schema["x-relationships"] as Relationship[],
      referencedBy: [],
      validationRules: (schema["x-validationRules"] as string[]) ?? [],
      legalReviewNotes: (schema["x-legalReviewNotes"] as string[]) ?? [],
      example: readJson("examples", `${name}.example.json`),
      schema,
      schemaUrl: `${base}/schemas/${file.split(path.sep).join("/")}`,
      exampleUrl: `${base}/examples/${name}.example.json`,
    };
  });

  entities.sort((a, b) => manifest.domains.indexOf(a.domain) - manifest.domains.indexOf(b.domain));

  for (const entity of entities) {
    for (const rel of entity.relationships) {
      entities.find((e) => e.name === rel.target)?.referencedBy.push({ entity: entity.name, field: rel.field });
    }
  }

  const domains: Domain[] = manifest.domains
    .map((id) => ({
      ...readJson<Omit<Domain, "entities">>("domains", `${id}.json`),
      entities: entities.filter((e) => e.domain === id),
    }))
    .sort((a, b) => a.order - b.order);

  const common = readJson<{ $defs: Record<string, JsonSchema> }>("schemas", "common.schema.json");
  const shared: SharedDefinition[] = Object.entries(common.$defs).map(([name, def]) => ({
    name,
    description: def.description ?? "",
    type: def.type ?? "any",
    constraints: constraintsOf(def),
    fields: def.properties ? toFields(def) : undefined,
  }));

  cache = { manifest, domains, entities, shared, changelog: readJson<Changelog>("changelog.json") };
  return cache;
}

export const getManifest = () => load().manifest;
export const getDomains = () => load().domains;
export const getDomain = (id: string) => load().domains.find((d) => d.id === id);
export const getEntities = () => load().entities;
export const getEntity = (name: string) => load().entities.find((e) => e.name === name);
export const getSharedDefinitions = () => load().shared;
export const getChangelog = () => load().changelog;
export const commonSchemaUrl = () => `/spec/${load().manifest.version}/schemas/common.schema.json`;
