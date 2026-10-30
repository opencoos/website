import Link from "next/link";
import { BrandStack, brandLayers } from "@/components/site/brand-stack";
import { Callout } from "@/components/site/callout";
import { ProudlyCanadian } from "@/components/site/canada";
import { PageHeader } from "@/components/site/page-header";
import { founder, site, standard } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description:
    "About COOS, the Common Ownership Operating Schema: why it exists, its mission and vision, and how its founder ManageStrata relates to the standard.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About" title="Why this initiative exists">
        Different software platforms, service providers and industry initiatives represent the same strata information
        differently. That makes it hard to share data, integrate systems and build better digital services.
      </PageHeader>
      <div className="container-page max-w-3xl space-y-12 py-12">
        <section id="structure" className="scroll-mt-20">
          <h2 className="text-xl font-semibold">How the pieces fit</h2>
          <BrandStack className="mt-4" />
          <p className="mt-6 leading-7">This gives the initiative three distinct layers:</p>
          <ul className="mt-3 list-disc space-y-1.5 pl-6">
            {brandLayers.map((l) => (
              <li key={l.name}>
                <strong>{l.name}</strong> — {l.role.charAt(0).toLowerCase() + l.role.slice(1)}
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold">Mission</h2>
          <p className="mt-3 leading-7">
            Create an open, consistent and extensible data standard for Canada&apos;s strata and condominium sector so that information can be
            represented, exchanged and understood consistently across software platforms and industry initiatives.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold">Vision</h2>
          <p className="mt-3 leading-7">
            A connected strata ecosystem where data belongs to the communities it represents, systems can work together, and
            innovation is not limited by incompatible data models or proprietary formats.
          </p>
        </section>
        <section>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-xl font-semibold">Proudly Canadian</h2>
            <ProudlyCanadian />
          </div>
          <p className="mt-3 leading-7">
            {site.name} is built in Canada, for Canadian communities. It is designed for every kind of
            shared-ownership community in the country: strata corporations in British Columbia, and condominium
            corporations in Ontario, Alberta and the other provinces and territories.
          </p>
          <p className="mt-3 leading-7">
            The first working draft is modelled on BC strata. Ontario and Alberta condominium terminology has been mapped,
            and support for those provinces is the next priority. See{" "}
            <Link href="/standard/jurisdictions" className="text-primary hover:underline">
              jurisdictions and terminology
            </Link>
            .
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold">Status</h2>
          <p className="mt-3 leading-7">
            Early development. The current working draft has not been released, and no part of it is stable. See the{" "}
            <Link href="/changelog" className="text-primary hover:underline">
              changelog
            </Link>{" "}
            for what has been drafted.
          </p>
        </section>
        <section id="managestrata" className="scroll-mt-20">
          <h2 className="text-xl font-semibold">Relationship with ManageStrata</h2>
          <div className="mt-3 space-y-3 leading-7">
            <p>
              {site.name} was founded by{" "}
              <a href={founder.url} rel="noopener" className="text-primary hover:underline">
                {founder.name}
              </a>
              , a Canadian strata management platform. ManageStrata helps initiate the standard, contributes practical use cases and
              implementation feedback, and plans to adopt {standard.shortName} as the foundation of its own data model as an
              early implementation.
            </p>
            <p>Founding the initiative does not make the standard a ManageStrata product. It is designed to be independent:</p>
            <ul className="list-disc space-y-1.5 pl-6">
              <li>Adopting the standard never requires using ManageStrata or any other product.</li>
              <li>Competing products, independent developers and other industry initiatives are equally welcome to implement and shape it.</li>
              <li>Maintainers disclose their affiliations and act in the interest of the standard, not of one product.</li>
              <li>ManageStrata&apos;s own APIs and product features are not part of the standard.</li>
            </ul>
            <p>The long-term value of the initiative comes from industry interoperability, shared definitions and broad participation.</p>
          </div>
        </section>
        <section>
          <h2 className="text-xl font-semibold">What this initiative is not</h2>
          <Callout className="mt-3">
            It is not endorsed by, affiliated with or mandated by any federal, provincial or territorial government or regulator, and it
            has no formal industry partnerships at this stage. Nothing on this site is legal advice. The standard does not collect,
            host or publish any strata corporation&apos;s data.
          </Callout>
        </section>
      </div>
    </>
  );
}
