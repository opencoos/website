// Plain-text summaries for answer engines and LLM crawlers (https://llmstxt.org).
import { crosswalk } from "./content/jurisdictions";
import { docsNav } from "./content/docs-nav";
import { faq } from "./content/faq";
import { absoluteUrl, founder, site, standard } from "./site";
import { getDomains, getManifest } from "./spec/load";
import type { Field } from "./spec/types";

function keyFacts() {
  const { version } = getManifest();
  return [
    `- Name: ${standard.name} (${standard.shortName})`,
    `- What it is: ${standard.summary} An open data standard, not a software product, API or database.`,
    `- Coverage: ${standard.reach} The first working draft is modelled on BC strata.`,
    `- Maintained by: ${site.name}, an open community initiative founded by ${founder.name}. Adoption does not require any ManageStrata product.`,
    `- Status: early development. Current version ${version} is an unreleased working draft; no entity is stable yet.`,
    `- Format: JSON Schema (draft 2020-12) definitions with example payloads.`,
    `- Licence: Apache License 2.0 (free for commercial use; includes a patent grant).`,
    `- Source: ${site.links.specificationRepo}`,
    `- Not legal advice; not endorsed by any government or regulator.`,
  ].join("\n");
}

export function llmsTxt() {
  const domains = getDomains();
  const pages = [
    ["/", "Home: what COOS is and who it is for"],
    ["/standard", "The Standard: scope, principles, terminology, versioning"],
    ["/standard/jurisdictions", "Jurisdictions: BC strata vs Ontario and Alberta condo terminology"],
    ["/standard/shared-definitions", "Shared definitions: identifiers, money, dates, addresses"],
    ["/data-model", "Data Model Explorer: every entity, field and relationship"],
    ["/use-cases", "Use cases"],
    ["/governance", "Governance and change process"],
    ["/about", "About OpenCOOS and its relationship with ManageStrata"],
    ["/contribute", "How to contribute"],
    ["/changelog", "Changelog and open proposals"],
  ];
  return `# ${site.name}: ${standard.name} (${standard.shortName})

> ${standard.shortName} is an open, vendor-neutral data model for strata and condominium communities across Canada: strata corporations in British Columbia and condominium corporations in Ontario, Alberta and other provinces. It gives software platforms, property managers, councils and boards a common way to represent and exchange community data.

## Key facts

${keyFacts()}

## Pages

${pages.map(([p, d]) => `- [${d.split(":")[0]}](${absoluteUrl(p)}): ${d}`).join("\n")}

## Specification domains

${domains.map((d) => `- [${d.name}](${absoluteUrl(`/standard/${d.id}`)}): ${d.summary} Entities: ${d.entities.map((e) => e.name).join(", ")}.`).join("\n")}

## Developer documentation

${docsNav.flatMap((g) => g.items).map((i) => `- [${i.label}](${absoluteUrl(i.href)})`).join("\n")}

## Optional

- [Full entity reference](${absoluteUrl("/llms-full.txt")}): every entity, field, type and controlled vocabulary in plain text
- [Specification repository](${site.links.specificationRepo})
`;
}

function fieldLines(fields: Field[], indent = ""): string[] {
  return fields.flatMap((f) => {
    const parts = [`${indent}- ${f.name} (${f.type}, ${f.required ? "required" : "optional"}): ${f.description}`];
    if (f.references) parts[0] += ` References ${f.references}.`;
    if (f.enumValues) parts[0] += ` Values: ${f.enumValues.map((v) => (v.description ? `${v.value} (${v.description.replace(/\.$/, "")})` : v.value)).join("; ")}.`;
    return f.children ? [...parts, ...fieldLines(f.children, `${indent}  `)] : parts;
  });
}

export function llmsFullTxt() {
  const domains = getDomains();
  return `# ${standard.name} (${standard.shortName}) — full reference

${keyFacts()}

## Terminology across provinces

| Concept | BC (strata) | Ontario (condo) | Alberta (condo) |
| --- | --- | --- | --- |
${crosswalk.map((r) => `| ${r.concept} | ${r.bc} | ${r.on} | ${r.ab} |`).join("\n")}

Summaries of common usage, pending legal review. Not legal advice.

${domains
  .map(
    (d) => `## ${d.name}

${d.purpose}

${d.entities
  .map(
    (e) => `### ${e.name} (${e.status})

${e.description}

Page: ${absoluteUrl(`/data-model/${e.name}`)}
JSON Schema: ${absoluteUrl(e.schemaUrl)}

Fields:
${fieldLines(e.fields).join("\n")}
`,
  )
  .join("\n")}
Planned (no schema yet): ${d.planned.map((p) => `${p.name} — ${p.description}`).join(" ")}
`,
  )
  .join("\n")}
## Frequently asked questions

${faq.map((f) => `### ${f.q}\n\n${f.a}`).join("\n\n")}
`;
}
