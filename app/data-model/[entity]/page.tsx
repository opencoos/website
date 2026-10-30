import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { JsonLd } from "@/components/site/json-ld";
import { pageMetadata } from "@/lib/seo";
import { EntityDetail } from "@/components/spec/entity-detail";
import { Breadcrumbs } from "@/components/site/structured-data";
import { absoluteUrl, standard } from "@/lib/site";
import { getEntities, getEntity, getManifest } from "@/lib/spec/load";
import { getEntityView } from "@/lib/spec/views";

export function generateStaticParams() {
  return getEntities().map((e) => ({ entity: e.name }));
}

export async function generateMetadata({ params }: PageProps<"/data-model/[entity]">): Promise<Metadata> {
  const { entity: name } = await params;
  const entity = getEntity(name);
  if (!entity) return {};
  return pageMetadata({
    title: `${entity.name} entity`,
    description: `${entity.description} Draft definition, fields, relationships and example JSON.`,
    path: `/data-model/${entity.name}`,
    type: "article",
  });
}

export default async function EntityPage({ params }: PageProps<"/data-model/[entity]">) {
  const { entity: name } = await params;
  const entity = await getEntityView(name);
  if (!entity) notFound();
  const { version } = getManifest();

  return (
    <div className="container-page py-10">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: `${entity.name} — ${standard.name}`,
          description: entity.description,
          url: absoluteUrl(`/data-model/${entity.name}`),
          version,
          inLanguage: "en-CA",
        }}
      />
      <Breadcrumbs items={[{ name: "Data Model", path: "/data-model" }, { name: entity.name, path: `/data-model/${entity.name}` }]} />
      <Link href={`/data-model?entity=${entity.name}`} className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" aria-hidden="true" /> Open in explorer
      </Link>
      <EntityDetail entity={entity} version={version} />
    </div>
  );
}
