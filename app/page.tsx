import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Boxes, GitBranch, Network } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { BrandStack, brandLayers } from "@/components/site/brand-stack";
import { Callout } from "@/components/site/callout";
import { CrosswalkTable, JurisdictionGrid, ProudlyCanadian } from "@/components/site/canada";
import { DomainIcon } from "@/components/site/domain-icon";
import { EcosystemDiagram } from "@/components/site/ecosystem-diagram";
import { BrandName, GitHubMark } from "@/components/site/icons";
import { JsonLd } from "@/components/site/json-ld";
import { Section } from "@/components/site/page-header";
import { StatusBadge } from "@/components/site/status-badge";
import { faq } from "@/lib/content/faq";
import { implementations } from "@/lib/content/implementations";
import { absoluteUrl, founder, site, standard } from "@/lib/site";
import { getChangelog, getDomains, getEntities, getManifest } from "@/lib/spec/load";

const problems = [
  "The same strata concepts are represented differently across software platforms.",
  "Integrations require custom mappings and duplicated effort.",
  "Inconsistent terminology makes reporting, analytics and automation harder.",
  "Data portability and cross-platform innovation become unnecessarily difficult.",
];

const pillars = [
  {
    icon: BookOpen,
    title: "Common Definitions",
    body: "Shared definitions that map each province's terms — strata lot or unit, council or board — to the same concepts.",
  },
  {
    icon: Network,
    title: "Interoperable Systems",
    body: "Consistent structures and machine-readable schemas that make integrations simpler and more predictable.",
  },
  {
    icon: GitBranch,
    title: "Open Collaboration",
    body: "A transparent specification the industry can review, adopt and improve together, with no single vendor in control.",
  },
];

const steps = [
  { title: "Shared definitions", body: "Each entity, such as StrataLot or Resolution, has a plain-language definition, fields, types and controlled vocabularies." },
  { title: "Machine-readable schemas", body: "Every definition is published as a JSON Schema with an example payload that is validated automatically." },
  { title: "Map and validate", body: "Implementers map their own data to the standard at their system boundary and validate exports and imports against the schemas." },
  { title: "Versioned releases", body: "Changes are proposed in the open and published as versioned releases with migration notes." },
];

const audiences = [
  { title: "Developers and software vendors", body: "Build compatible strata applications and reduce custom integration work." },
  { title: "Strata councils, condo boards and owners", body: "Help make community records more transparent, portable and consistent." },
  { title: "Property management companies", body: "Push for better integrations and less fragmented data across tools." },
  { title: "Industry organizations", body: "Share terminology and data definitions across initiatives." },
  { title: "Researchers and data practitioners", body: "Work with strata information that has consistent meaning." },
  { title: "Open-source contributors", body: "Improve the schemas, documentation and validation tooling." },
];

export default function HomePage() {
  const manifest = getManifest();
  const domains = getDomains();
  const entities = getEntities();
  const changelog = getChangelog();
  const latest = changelog.entries[0];
  const plannedCount = domains.reduce((n, d) => n + d.planned.length, 0);
  const counts = {
    proposed: entities.filter((e) => e.status === "proposed").length,
    experimental: entities.filter((e) => e.status === "experimental").length,
    stable: entities.filter((e) => e.status === "stable").length,
  };

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "WebSite", name: site.name, url: absoluteUrl("/"), description: site.description, inLanguage: "en-CA" },
            {
              "@type": "Organization",
              name: site.name,
              url: absoluteUrl("/"),
              description: site.tagline,
              founder: { "@type": "Organization", name: founder.name, url: founder.url },
            },
            {
              "@type": "FAQPage",
              mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
            },
          ],
        }}
      />

      {/* Hero */}
      <section className="border-b bg-[linear-gradient(to_bottom,var(--color-muted),transparent)]">
        <div className="container-page py-16 sm:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <ProudlyCanadian />
                <Link
                  href="/changelog"
                  className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs text-muted-foreground hover:text-foreground"
                >
                  <span className="size-1.5 rounded-full bg-amber-500" aria-hidden="true" />
                  {standard.shortName} · early development · working draft v{manifest.version}
                </Link>
              </div>
              <p className="mt-8 text-lg font-medium">
                <BrandName className="font-bold tracking-tight" />
                <span className="text-muted-foreground"> — {site.audience.charAt(0).toLowerCase() + site.audience.slice(1)}</span>
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">{standard.headline}.</h1>
              <p className="mt-5 max-w-xl text-lg text-pretty text-muted-foreground">
                The {standard.name} ({standard.shortName}) is an open, community-driven data standard that makes strata and
                condominium information consistent, connected and interoperable — from strata corporations in British
                Columbia to condominium corporations in Ontario, Alberta and across Canada.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href="/standard">
                    Explore the Standard <ArrowRight data-icon="inline-end" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  {site.links.specificationRepo ? (
                    <a href={site.links.specificationRepo} rel="noopener">
                      <GitHubMark className="size-4" /> Contribute on GitHub
                    </a>
                  ) : (
                    <Link href="/contribute">
                      <GitHubMark className="size-4" /> Contribute on GitHub
                    </Link>
                  )}
                </Button>
              </div>
              <p className="mt-6 max-w-xl text-sm text-muted-foreground">
                {standard.shortName} is maintained by {site.name}, an open initiative founded by {founder.name}. It is
                industry infrastructure, not another property management product.
              </p>
            </div>
            <div className="mx-auto w-full max-w-md lg:max-w-none">
              <Image
                src="/brand/opencoos-hero-art.svg"
                alt="Pigeons carrying a data card between a strata mid-rise, a condo tower and townhouses"
                width={600}
                height={600}
                priority
                unoptimized
                className="w-full rounded-2xl border shadow-xs"
              />
            </div>
          </div>
          <div className="mt-14">
            <EcosystemDiagram />
          </div>
        </div>
      </section>

      {/* Problem */}
      <Section
        id="problem"
        eyebrow="The problem"
        title="Community data means different things in different systems"
        intro="Strata and condominium corporations, managers and vendors rely on many tools. Each one describes the same units, meetings, fees and repairs in its own way — and every province adds its own vocabulary."
      >
        <ul className="grid gap-4 sm:grid-cols-2">
          {problems.map((p, i) => (
            <li key={p} className="flex gap-4 rounded-lg border p-5">
              <span className="font-mono text-sm text-primary">0{i + 1}</span>
              <span className="text-pretty">{p}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Solution */}
      <Section
        id="solution"
        eyebrow="The approach"
        title="One openly documented way to represent strata information"
        className="border-y bg-muted/30"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-xl border bg-background p-6">
              <Icon className="size-5 text-primary" aria-hidden="true" />
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-pretty text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Brand structure */}
      <Section
        id="structure"
        eyebrow="How the pieces fit"
        title="One initiative, one schema, one founding implementer"
        intro="Keeping these roles separate is what lets the standard stay vendor-neutral."
      >
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
          <BrandStack />
          <ul className="space-y-5">
            {brandLayers.map((l) => (
              <li key={l.name} className="border-l-2 border-primary/60 pl-4">
                <p className="font-semibold">{l.name}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{l.role}</p>
              </li>
            ))}
            <li className="pt-1 text-sm">
              <Link href="/about#managestrata" className="text-primary underline-offset-4 hover:underline">
                Read how ManageStrata relates to the standard
              </Link>
            </li>
          </ul>
        </div>
      </Section>

      {/* Canada */}
      <Section
        id="canada"
        eyebrow="Built in Canada, for Canada"
        title="Strata or condo, one common language"
        intro="BC has strata corporations; Ontario and Alberta have condominium corporations. The concepts are largely shared — the words differ. COOS maps them to one model, starting with BC and extending to Ontario and Alberta next."
        className="border-y bg-muted/30"
      >
        <JurisdictionGrid />
        <div className="mt-10">
          <CrosswalkTable limit={6} />
        </div>
        <Link href="/standard/jurisdictions" className="mt-4 inline-flex items-center gap-1 text-sm text-primary hover:underline">
          Full terminology crosswalk <ArrowRight className="size-3.5" aria-hidden="true" />
        </Link>
      </Section>

      {/* Coverage */}
      <Section
        id="coverage"
        eyebrow="What the standard covers"
        title="Six proposed domains"
        intro="These are the proposed initial domains. Some entities have draft schemas; others are planned and not yet drafted."
      >
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {domains.map((d) => (
            <li key={d.id}>
              <Link
                href={`/standard/${d.id}`}
                className="group flex h-full flex-col rounded-xl border bg-background p-5 transition-colors hover:border-primary/40 hover:bg-accent/40"
              >
                <DomainIcon domain={d.id} className="size-5 text-primary" />
                <h3 className="mt-3 font-semibold group-hover:text-primary">{d.name}</h3>
                <p className="mt-1.5 flex-1 text-sm text-muted-foreground">{d.summary}</p>
                <p className="mt-4 font-mono text-xs text-muted-foreground">
                  {d.entities.length} drafted · {d.planned.length} planned
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* How it works */}
      <Section id="how-it-works" eyebrow="How it works" title="From definitions to working integrations" className="border-y bg-muted/30">
        <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="relative rounded-xl border bg-background p-6">
              <span className="flex size-7 items-center justify-center rounded-full bg-primary font-mono text-xs text-primary-foreground">
                {i + 1}
              </span>
              <h3 className="mt-4 font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-pretty text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-sm text-muted-foreground">
          The standard defines data, not an API. Systems remain free to choose their own storage, APIs and technology.{" "}
          <Link href="/docs" className="text-primary underline-offset-4 hover:underline">
            Read the developer documentation
          </Link>
          .
        </p>
      </Section>

      {/* Status */}
      <Section id="status" eyebrow="Current status" title="Early development" intro="Nothing is final yet. This is the right time to influence the definitions.">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <dl className="grid grid-cols-2 gap-4">
            <Stat label="Working draft" value={`v${manifest.version}`} />
            <Stat label="Stable releases" value={String(counts.stable)} />
            <Stat label="Proposed entities" value={String(counts.proposed)} badge="proposed" />
            <Stat label="Experimental entities" value={String(counts.experimental)} badge="experimental" />
            <Stat label="Planned entities" value={String(plannedCount)} badge="planned" />
            <Stat label="Domains" value={String(domains.length)} />
          </dl>
          <div className="space-y-4">
            <Callout title="What “draft” means">
              Draft schemas are published so people can review them and try them out. They are illustrative and not yet normative:
              names, fields and permitted values can change before the first stable release. Provincial legal terminology is flagged
              for review before it is treated as normative guidance.
            </Callout>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="outline">
                <Link href="/data-model">
                  <Boxes /> Browse the data model
                </Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href="/changelog">View the changelog</Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Participate */}
      <Section
        id="participate"
        eyebrow="Who can participate"
        title="Built with the people who use strata data"
        intro="You do not need to be a developer to contribute. Feedback on terminology and real-world workflows is as valuable as code."
        className="border-y bg-muted/30"
      >
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((a) => (
            <li key={a.title} className="rounded-lg border bg-background p-5">
              <h3 className="font-medium">{a.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{a.body}</p>
            </li>
          ))}
        </ul>
        <Button asChild className="mt-8">
          <Link href="/contribute">
            Ways to contribute <ArrowRight data-icon="inline-end" />
          </Link>
        </Button>
      </Section>

      {/* Adopters */}
      <Section
        id="adopters"
        eyebrow="Early adopters and implementations"
        title="Implementations"
        intro="Because no stable release exists, no product can claim conformance yet. Planned implementations are listed transparently."
      >
        <div className="overflow-hidden rounded-xl border bg-background">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">Known implementations</caption>
            <thead className="bg-muted/50 text-xs text-muted-foreground">
              <tr>
                <th scope="col" className="px-4 py-3 font-medium">Implementation</th>
                <th scope="col" className="px-4 py-3 font-medium">Type</th>
                <th scope="col" className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {implementations.map((impl) => (
                <tr key={impl.name} className="border-t align-top">
                  <td className="px-4 py-3">
                    <a href={impl.url} rel="noopener" className="font-medium hover:text-primary">
                      {impl.name}
                    </a>
                    {impl.relationship && <span className="block text-xs text-muted-foreground">{impl.relationship}</span>}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{impl.type}</td>
                  <td className="px-4 py-3 text-muted-foreground">{impl.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Building something compatible?{" "}
          <Link href="/contribute#implementers" className="text-primary underline-offset-4 hover:underline">
            Tell us about your implementation
          </Link>
          . Read how ManageStrata relates to the standard on the{" "}
          <Link href="/about#managestrata" className="text-primary underline-offset-4 hover:underline">
            About page
          </Link>
          .
        </p>
      </Section>

      {/* Updates */}
      <Section id="updates" eyebrow="Latest specification updates" title="What changed recently" className="border-y bg-muted/30">
        <article className="rounded-xl border bg-background p-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-sm font-medium">v{latest.version}</span>
            <StatusBadge status="proposed" />
            <time dateTime={latest.date} className="text-sm text-muted-foreground">
              {latest.date}
            </time>
          </div>
          <h3 className="mt-3 font-semibold">{latest.title}</h3>
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">{latest.summary}</p>
          <Link href="/changelog" className="mt-4 inline-flex items-center gap-1 text-sm text-primary hover:underline">
            Full changelog <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        </article>
      </Section>

      {/* FAQ */}
      <Section id="faq" eyebrow="Frequently asked questions" title="Questions and answers">
        <Accordion type="single" collapsible className="max-w-3xl">
          {faq.map((f, i) => (
            <AccordionItem key={f.q} value={`faq-${i}`}>
              <AccordionTrigger className="text-base">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>

      {/* CTA */}
      <section className="container-page">
        <div className="rounded-2xl bg-primary px-6 py-12 text-primary-foreground sm:px-12">
          <h2 className="max-w-2xl text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            Help shape a common language for strata data.
          </h2>
          <p className="mt-3 max-w-2xl text-primary-foreground/85">
            Review the draft, try the schemas in your own systems, or tell us where the definitions don&apos;t match how your
            strata corporation works.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" variant="secondary">
              <Link href="/docs">Read the documentation</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
              <Link href="/contribute">Contribute</Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
              <Link href="/docs/implementation">Adopt the standard</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({ label, value, badge }: { label: string; value: string; badge?: "proposed" | "experimental" | "planned" }) {
  return (
    <div className="rounded-lg border bg-background p-4">
      <dt className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
        {label}
        {badge && <StatusBadge status={badge} />}
      </dt>
      <dd className="mt-2 font-mono text-2xl font-medium">{value}</dd>
    </div>
  );
}
