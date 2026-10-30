import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { Callout } from "@/components/site/callout";
import { PageHeader, Section } from "@/components/site/page-header";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contribute",
  description:
    "How developers, property managers, strata council members, industry professionals, researchers and software vendors can contribute to the strata data standard.",
  alternates: { canonical: "/contribute" },
};

const pathways = [
  {
    id: "developers",
    title: "Developers",
    items: ["Review draft schemas for consistency and usability", "Try mapping your own data and report what didn't fit", "Improve validation tooling and examples"],
  },
  {
    id: "property-managers",
    title: "Property managers",
    items: ["Tell us which integrations and exports cost you the most time", "Review definitions against day-to-day workflows", "Share (anonymised) examples of the reports you produce"],
  },
  {
    id: "council-members",
    title: "Strata councils and condo boards",
    items: ["Check that terms match how your council or board actually works", "Tell us which records are hardest to find or move", "Review governance definitions such as meetings and resolutions"],
  },
  {
    id: "industry-professionals",
    title: "Industry professionals",
    items: ["Lawyers, accountants, engineers, insurers and appraisers: review terminology in your province", "Flag places where the draft could be misread as legal guidance"],
  },
  {
    id: "researchers",
    title: "Researchers",
    items: ["Identify the data needed to study strata housing", "Advise on privacy-preserving structures and aggregation"],
  },
  {
    id: "implementers",
    title: "Software vendors",
    items: ["Implement draft entities and share implementation feedback", "Propose vocabulary values your product needs", "Tell us about planned implementations so they can be listed accurately"],
  },
];

export default function ContributePage() {
  const links = [
    { label: "Specification repository", href: site.links.specificationRepo },
    { label: "Issue tracker", href: site.links.issues },
    { label: "Discussion forum", href: site.links.discussions },
    { label: "Contribution guide", href: site.links.contributing },
    { label: "Website source repository", href: site.links.websiteRepo },
  ];

  return (
    <>
      <PageHeader eyebrow="Contribute" title="Help build a common language for strata data">
        Feedback from the industry is welcome, including from people who are not developers. Knowing how strata and condo corporations
        actually work is as valuable as writing code.
      </PageHeader>

      <Section id="pathways" eyebrow="Ways to help" title="Contribution pathways">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pathways.map((p) => (
            <article key={p.id} id={p.id} className="scroll-mt-20 rounded-xl border p-6">
              <h3 className="font-semibold">{p.title}</h3>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
                {p.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section id="repositories" eyebrow="Where to contribute" title="Repositories and channels" className="border-y bg-muted/30">
        <ul className="divide-y rounded-xl border bg-background">
          {links.map((l) => (
            <li key={l.label} className="flex flex-wrap items-center justify-between gap-3 p-4">
              <span className="font-medium">{l.label}</span>
              {l.href ? (
                <a href={l.href} rel="noopener" className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline">
                  {l.href.replace(/^https?:\/\//, "")} <ExternalLink className="size-3.5" aria-hidden="true" />
                </a>
              ) : (
                <span className="rounded-full border border-dashed px-2.5 py-0.5 text-xs text-muted-foreground">Pending configuration</span>
              )}
            </li>
          ))}
        </ul>
        {site.links.contactEmail ? (
          <p className="mt-4 text-sm text-muted-foreground">
            Prefer email? Write to{" "}
            <a href={`mailto:${site.links.contactEmail}`} className="text-primary hover:underline">
              {site.links.contactEmail}
            </a>
            .
          </p>
        ) : (
          <p className="mt-4 text-sm text-muted-foreground">
            Public channels are being set up. Links will appear here as soon as they are available.
          </p>
        )}
      </Section>

      <Section id="guidelines" eyebrow="Before you contribute" title="A few ground rules">
        <div className="max-w-3xl space-y-4">
          <Callout tone="warning" title="Never share real personal or confidential information">
            Use fictional examples in issues and proposals. Do not post owner names, contact details, financial records or
            other confidential strata information.
          </Callout>
          <ul className="list-disc space-y-2 pl-6">
            <li>Describe the real-world problem first; a proposed solution is optional.</li>
            <li>Disclose your affiliation (for example, the product you work on) when proposing changes.</li>
            <li>Discussions are public and decisions are recorded, as described in <a href="/governance" className="text-primary hover:underline">governance</a>.</li>
          </ul>
        </div>
      </Section>
    </>
  );
}
