import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Callout } from "@/components/site/callout";
import { DomainIcon } from "@/components/site/domain-icon";
import { PageHeader, Section } from "@/components/site/page-header";
import { StatusBadge, StatusLegend } from "@/components/site/status-badge";
import { standard } from "@/lib/site";
import { getDomains, getManifest } from "@/lib/spec/load";

export const metadata: Metadata = {
  title: "The Standard",
  description:
    "Scope, terminology, design principles, versioning and proposed domains of the Common Ownership Operating Schema, an open data model for strata and condominium corporations across Canada.",
  alternates: { canonical: "/standard" },
};

const principles = [
  ["Open by default", "Public specifications, transparent documentation and an open development process."],
  ["Interoperable", "Different systems can exchange and interpret information consistently."],
  ["Canadian and jurisdiction-aware", "Reflects the terminology, governance and regulatory context of each province, starting with BC strata and Ontario and Alberta condos."],
  ["Community-driven", "Developers, councils, managers, researchers and industry participants can all contribute."],
  ["Practical", "Starts with real-world strata workflows and evolves through implementation experience."],
  ["Extensible", "Namespaced extensions support future integrations, automation, analytics and AI."],
  ["Vendor-neutral", "No dependency on a single software provider or technology stack."],
  ["Privacy-conscious", "Defines structures without requiring disclosure of private or sensitive strata information."],
];

const terms = [
  ["Entity", "A kind of thing the standard describes, such as StrataLot or Resolution. Each entity has one JSON Schema."],
  ["Field", "A named property of an entity, with a type, description and constraints."],
  ["Shared definition", "A reusable type such as Money or Address used by many entities."],
  ["Controlled vocabulary", "A fixed list of permitted values for a field, each with a definition."],
  ["Relationship", "A field whose value is the identifier of another entity."],
  ["Extension", "Implementation-specific data kept under a reverse-domain namespace, outside the standard."],
  ["Normative / informative", "Normative text is a requirement of a release. Draft definitions and examples are informative until released."],
];

export default function StandardPage() {
  const manifest = getManifest();
  const domains = getDomains();

  return (
    <>
      <PageHeader eyebrow="The Standard" title="Common Ownership Operating Schema">
        The {standard.name} ({standard.shortName}) defines how strata information is named, structured and related, so that it can be represented and
        exchanged consistently across software platforms and industry initiatives.
      </PageHeader>

      <div className="container-page pt-10">
        <Callout tone="warning" title={`Working draft v${manifest.version} — not yet released`}>
          The domains below are proposed. Entities marked Proposed or Experimental have draft schemas that may change; entities
          marked Planned have no schema yet. Provincial legal terminology is used carefully and flagged for review before it becomes
          normative. Nothing here is legal advice.
        </Callout>
      </div>

      <Section id="scope" eyebrow="Scope" title="What the standard is — and is not">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border p-6">
            <h3 className="font-semibold">In scope</h3>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
              <li>Definitions of strata entities, fields, relationships and controlled vocabularies</li>
              <li>Machine-readable JSON Schemas and example payloads</li>
              <li>Conventions for identifiers, dates, money, addresses and extensions</li>
              <li>Versioning, deprecation and compatibility rules</li>
              <li>Strata and condominium corporations across Canada: BC first, then Ontario and Alberta</li>
            </ul>
          </div>
          <div className="rounded-xl border p-6">
            <h3 className="font-semibold">Out of scope</h3>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
              <li>A hosted API, database or software product</li>
              <li>Storing or publishing any strata corporation&apos;s data</li>
              <li>Legal interpretation or compliance determinations</li>
              <li>Mandating how implementers store data internally</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section id="domains" eyebrow="Specification domains" title="Proposed initial domains" className="border-y bg-muted/30">
        <StatusLegend className="mb-8" />
        <div className="grid gap-6 lg:grid-cols-2">
          {domains.map((d) => (
            <article key={d.id} className="flex flex-col rounded-xl border bg-background p-6">
              <div className="flex items-center gap-3">
                <DomainIcon domain={d.id} className="size-5 text-primary" />
                <h3 className="text-lg font-semibold">
                  <Link href={`/standard/${d.id}`} className="hover:text-primary">
                    {d.name}
                  </Link>
                </h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{d.summary}</p>
              <ul className="mt-4 flex flex-1 flex-wrap content-start gap-2">
                {d.entities.map((e) => (
                  <li key={e.name}>
                    <Link
                      href={`/data-model/${e.name}`}
                      className="inline-flex items-center gap-2 rounded-md border px-2 py-1 font-mono text-xs hover:border-primary/50"
                    >
                      {e.name} <StatusBadge status={e.status} />
                    </Link>
                  </li>
                ))}
                {d.planned.map((p) => (
                  <li key={p.name} className="inline-flex items-center gap-2 rounded-md border border-dashed px-2 py-1 font-mono text-xs text-muted-foreground">
                    {p.name} <StatusBadge status="planned" />
                  </li>
                ))}
              </ul>
              <Link href={`/standard/${d.id}`} className="mt-5 inline-flex items-center gap-1 text-sm text-primary hover:underline">
                Domain documentation <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          See how terms map across provinces in{" "}
          <Link href="/standard/jurisdictions" className="text-primary hover:underline">
            jurisdictions and terminology
          </Link>
          . All entities use the{" "}
          <Link href="/standard/shared-definitions" className="text-primary hover:underline">
            shared definitions
          </Link>{" "}
          for identifiers, dates, money, addresses and extensions.
        </p>
      </Section>

      <Section id="principles" eyebrow="Design principles" title="How decisions are made">
        <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map(([t, d]) => (
            <div key={t}>
              <dt className="font-medium">{t}</dt>
              <dd className="mt-1 text-sm text-muted-foreground">{d}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="terminology" eyebrow="Terminology" title="Terms used in the specification" className="border-y bg-muted/30">
        <dl className="divide-y rounded-xl border bg-background">
          {terms.map(([t, d]) => (
            <div key={t} className="grid gap-1 p-4 sm:grid-cols-[220px_1fr]">
              <dt className="font-medium">{t}</dt>
              <dd className="text-sm text-muted-foreground">{d}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-sm text-muted-foreground">
          Strata terms such as <em>strata lot</em>, <em>common property</em>, <em>unit entitlement</em> and{" "}
          <em>contingency reserve fund</em> are currently used in their BC sense; see the{" "}
          <Link href="/standard/jurisdictions" className="text-primary hover:underline">
            terminology crosswalk
          </Link>{" "}
          for Ontario and Alberta equivalents. Definitions in the draft summarise common usage and are
          marked for legal review.
        </p>
      </Section>

      <Section id="versioning" eyebrow="Versioning" title="How releases are identified">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border p-6">
            <p className="font-mono text-sm text-primary">MAJOR.MINOR.PATCH</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Releases follow semantic versioning. Breaking changes increase the major version.
            </p>
          </div>
          <div className="rounded-xl border p-6">
            <p className="font-mono text-sm text-primary">0.x and -draft</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Until 1.0.0, any release may contain breaking changes. Drafts carry a <code>-draft</code> suffix.
            </p>
          </div>
          <div className="rounded-xl border p-6">
            <p className="font-mono text-sm text-primary">/spec/{"{version}"}/…</p>
            <p className="mt-2 text-sm text-muted-foreground">Each version&apos;s schemas are published at a stable URL that does not change.</p>
          </div>
        </div>
        <Link href="/docs/versioning" className="mt-6 inline-flex items-center gap-1 text-sm text-primary hover:underline">
          Versioning and compatibility policy <ArrowRight className="size-3.5" aria-hidden="true" />
        </Link>
      </Section>
    </>
  );
}
