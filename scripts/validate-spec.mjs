// Validates the specification source: compiles every JSON Schema, validates every
// example against its schema, and checks that relationship targets exist.
import fs from "node:fs";
import path from "node:path";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const SPEC_DIR = path.resolve(process.env.SPEC_DIR ?? "spec");
const VENDOR_KEYWORDS = [
  "x-domain",
  "x-status",
  "x-since",
  "x-relationships",
  "x-validationRules",
  "x-legalReviewNotes",
  "x-references",
  "x-enumDescriptions",
];
const STATUSES = ["stable", "proposed", "experimental", "deprecated"];

const ajv = new Ajv2020({ allErrors: true, strict: true });
addFormats(ajv);
for (const keyword of VENDOR_KEYWORDS) ajv.addKeyword(keyword);

const readJson = (file) => JSON.parse(fs.readFileSync(file, "utf8"));
const errors = [];

const manifest = readJson(path.join(SPEC_DIR, "spec.json"));
const schemaFiles = fs
  .readdirSync(path.join(SPEC_DIR, "schemas"), { recursive: true })
  .filter((f) => f.endsWith(".schema.json"))
  .map((f) => path.join(SPEC_DIR, "schemas", f));

const schemas = schemaFiles.map(readJson);
for (const schema of schemas) ajv.addSchema(schema);

const entities = schemas.filter((s) => s["x-domain"]);
const names = new Set(entities.map((s) => s.title));

for (const schema of entities) {
  const name = schema.title;
  if (schema.$id !== `${manifest.idPrefix}${name}`) errors.push(`${name}: $id must be ${manifest.idPrefix}${name}`);
  if (!manifest.domains.includes(schema["x-domain"])) errors.push(`${name}: unknown domain ${schema["x-domain"]}`);
  if (!STATUSES.includes(schema["x-status"])) errors.push(`${name}: unknown status ${schema["x-status"]}`);
  for (const rel of schema["x-relationships"]) {
    if (!names.has(rel.target)) errors.push(`${name}.${rel.field}: relationship target ${rel.target} is not defined`);
  }

  const validate = ajv.getSchema(schema.$id);
  const exampleFile = path.join(SPEC_DIR, "examples", `${name}.example.json`);
  if (!fs.existsSync(exampleFile)) {
    errors.push(`${name}: missing example ${path.relative(SPEC_DIR, exampleFile)}`);
    continue;
  }
  if (!validate(readJson(exampleFile))) {
    for (const e of validate.errors) errors.push(`${name} example: ${e.instancePath || "/"} ${e.message}`);
  }
}

for (const domain of manifest.domains) {
  if (!fs.existsSync(path.join(SPEC_DIR, "domains", `${domain}.json`))) errors.push(`missing domain metadata for ${domain}`);
}

if (errors.length) {
  console.error(`Specification validation failed (${errors.length} problems):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(`Specification ${manifest.version}: ${entities.length} entity schemas and examples are valid.`);
