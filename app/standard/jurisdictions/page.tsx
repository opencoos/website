import Link from "next/link";
import { Callout } from "@/components/site/callout";
import { CrosswalkTable, JurisdictionGrid, ProudlyCanadian } from "@/components/site/canada";
import { PageHeader, Section } from "@/components/site/page-header";
import { Breadcrumbs, TerminologyLd } from "@/components/site/structured-data";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Jurisdictions and terminology",
  description:
    "How the Common Ownership Operating Schema serves strata in British Columbia and condominiums in Ontario, Alberta and across Canada, with a terminology crosswalk.",
  path: "/standard/jurisdictions",
});

export default function JurisdictionsPage() {
  return (
    <>
      <TerminologyLd />
      <Breadcrumbs items={[{ name: "The Standard", path: "/standard" }, { name: "Jurisdictions", path: "/standard/jurisdictions" }]} />
      <PageHeader eyebrow="Jurisdictions" title="One standard for strata and condo communities across Canada">
        BC calls them strata corporations; Ontario and Alberta call them condominium corporations. The concepts are largely
        shared — the words, documents and rules differ. COOS is designed to represent both.
      </PageHeader>

      <Section id="provinces" eyebrow="Coverage" title="Where the standard stands in each province" intro={<ProudlyCanadian />}>
        <JurisdictionGrid />
        <Callout className="mt-6" tone="warning">
          The first working draft is modelled on BC strata, so entity names such as <code>StrataCorporation</code> currently
          use BC terms. Supporting Ontario and Alberta condominiums is the next priority; how to name entities across
          jurisdictions is an <Link href="/changelog#open-proposals">open proposal</Link>.
        </Callout>
      </Section>

      <Section
        id="crosswalk"
        eyebrow="Terminology crosswalk"
        title="Same concept, different words"
        intro="How each province names the concepts the standard models. Informative only: these are summaries of common usage, pending legal review, and not legal advice."
        className="border-y bg-muted/30"
      >
        <CrosswalkTable />
      </Section>

      <Section id="approach" eyebrow="Approach" title="How the standard will handle provincial differences">
        <ul className="max-w-3xl list-disc space-y-2 pl-6">
          <li>
            <strong>Shared core.</strong> Concepts that exist everywhere — the corporation, owned units, shared areas, the
            governing body, meetings, budgets, reserve funds — are modelled once.
          </li>
          <li>
            <strong>Jurisdiction profiles.</strong> Province-specific values, documents and vocabularies (for example vote
            thresholds, or a BC information certificate versus an Ontario status certificate) are captured per jurisdiction.
          </li>
          <li>
            <strong>Local terms in documentation.</strong> Each province&apos;s own terminology is shown alongside the shared
            definition, so a condo board member in Toronto and a strata council member in Vancouver can both recognise it.
          </li>
          <li>
            <strong>Contributors from every province.</strong> Ontario and Alberta practitioners are especially welcome to{" "}
            <Link href="/contribute" className="text-primary hover:underline">
              review the mappings
            </Link>
            .
          </li>
        </ul>
      </Section>
    </>
  );
}
