// Shapes the website uses to present the specification. These are derived from the
// JSON Schema source in spec/ and are safe to pass to client components.

export type EntityStatus = "stable" | "proposed" | "experimental" | "deprecated";
export type Status = EntityStatus | "planned";

export interface EnumValue {
  value: string;
  description?: string;
}

export interface Field {
  name: string;
  type: string;
  /** Shared definition the field uses, e.g. "Money", linking to the shared definitions page. */
  sharedType?: string;
  description: string;
  required: boolean;
  constraints: string[];
  enumValues?: EnumValue[];
  references?: string;
  children?: Field[];
}

export interface Relationship {
  field: string;
  target: string;
  cardinality: "one" | "many";
  required: boolean;
}

export interface Entity {
  name: string;
  domain: string;
  status: EntityStatus;
  since: string;
  description: string;
  fields: Field[];
  relationships: Relationship[];
  referencedBy: { entity: string; field: string }[];
  validationRules: string[];
  legalReviewNotes: string[];
  example: unknown;
  schema: unknown;
  schemaUrl: string;
  exampleUrl: string;
}

export interface PlannedEntity {
  name: string;
  description: string;
}

export interface Domain {
  id: string;
  order: number;
  name: string;
  summary: string;
  purpose: string;
  inScope: string[];
  outOfScope: string[];
  planned: PlannedEntity[];
  openIssues: { title: string; description: string }[];
  entities: Entity[];
}

export interface SharedDefinition {
  name: string;
  description: string;
  type: string;
  constraints: string[];
  fields?: Field[];
}

export interface Manifest {
  name: string;
  shortName: string;
  version: string;
  status: string;
  released: boolean;
  license: string | null;
  initialJurisdiction: string;
  idPrefix: string;
  domains: string[];
}

export interface ChangelogEntry {
  version: string;
  date: string;
  status: string;
  title: string;
  summary: string;
  added: string[];
  changed: string[];
  deprecated: string[];
  breaking: string[];
  migration: string;
}

export interface Changelog {
  entries: ChangelogEntry[];
  openProposals: { title: string; domain: string; description: string }[];
}

export const statusInfo: Record<Status, { label: string; description: string }> = {
  stable: { label: "Stable", description: "Part of a published release. Changes follow the deprecation policy." },
  proposed: { label: "Proposed", description: "Drafted and open for review. May change before a release." },
  experimental: { label: "Experimental", description: "Early draft that needs implementation feedback. Likely to change." },
  deprecated: { label: "Deprecated", description: "Scheduled for removal in a future major version." },
  planned: { label: "Planned", description: "Identified for future work. No schema has been drafted yet." },
};
