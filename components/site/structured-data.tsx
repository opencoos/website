// schema.org structured data shared across pages, for search and answer engines.
import { crosswalk } from "@/lib/content/jurisdictions";
import { absoluteUrl, founder, site, standard } from "@/lib/site";
import { commonSchemaUrl, getEntities, getManifest } from "@/lib/spec/load";
import { JsonLd } from "./json-ld";

export function organizationLd() {
  return {
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: site.name,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/brand/opencoos-avatar.png"),
    description: site.description,
    sameAs: ["https://github.com/opencoos"],
    founder: { "@type": "Organization", name: founder.name, url: founder.url },
    areaServed: { "@type": "Country", name: "Canada" },
  };
}

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: absoluteUrl(item.path),
        })),
      }}
    />
  );
}

/** The specification as a downloadable dataset of JSON Schema files. */
export function DatasetLd() {
  const { version } = getManifest();
  const files = [
    { name: "common.schema.json", url: commonSchemaUrl() },
    ...getEntities().map((e) => ({ name: `${e.name}.schema.json`, url: e.schemaUrl })),
  ];
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Dataset",
        name: `${standard.name} (${standard.shortName})`,
        alternateName: standard.shortName,
        description: `${standard.summary} ${standard.reach} JSON Schema (draft 2020-12) definitions and example payloads for strata and condominium data in Canada.`,
        url: absoluteUrl("/standard"),
        version,
        license: "https://www.apache.org/licenses/LICENSE-2.0",
        isAccessibleForFree: true,
        creator: { "@id": absoluteUrl("/#organization"), "@type": "Organization", name: site.name },
        spatialCoverage: { "@type": "Place", name: "Canada" },
        keywords: ["strata", "condominium", "data standard", "JSON Schema", "British Columbia", "Ontario", "Alberta"],
        sameAs: site.links.specificationRepo ?? undefined,
        distribution: files.map((f) => ({
          "@type": "DataDownload",
          name: f.name,
          encodingFormat: "application/schema+json",
          contentUrl: absoluteUrl(f.url),
        })),
      }}
    />
  );
}

/** Province-by-province terminology as defined terms. */
export function TerminologyLd() {
  const provinces = [
    { key: "bc", label: "British Columbia (strata)" },
    { key: "on", label: "Ontario (condominium)" },
    { key: "ab", label: "Alberta (condominium)" },
  ] as const;
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "DefinedTermSet",
        name: "Strata and condominium terminology across Canadian provinces",
        url: absoluteUrl("/standard/jurisdictions"),
        hasDefinedTerm: crosswalk.flatMap((row) =>
          provinces.map((p) => ({
            "@type": "DefinedTerm",
            name: row[p.key],
            description: `${row.concept} in ${p.label}. Equivalent terms: ${provinces
              .filter((o) => o.key !== p.key)
              .map((o) => `${row[o.key]} (${o.label})`)
              .join("; ")}.`,
          })),
        ),
      }}
    />
  );
}

/** Answer-first facts, shown on the page and mirrored in llms.txt. */
export function KeyFacts({ className }: { className?: string }) {
  const { version } = getManifest();
  const facts = [
    ["What it is", `${standard.summary} A data standard, not a software product.`],
    ["Coverage", "Strata in BC; condominiums in Ontario, Alberta and across Canada"],
    ["Status", `Early development · working draft v${version}`],
    ["Format", "JSON Schema (2020-12) with example payloads"],
    ["Licence", "Apache-2.0: free for commercial use"],
    ["Maintained by", `${site.name}, an open initiative founded by ${founder.name}`],
  ];
  return (
    <dl className={className ?? "grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3"}>
      {facts.map(([term, detail]) => (
        <div key={term} className="border-l-2 border-primary/50 pl-3">
          <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{term}</dt>
          <dd className="mt-0.5 text-sm">{detail}</dd>
        </div>
      ))}
    </dl>
  );
}
