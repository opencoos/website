import type { Metadata } from "next";
import { Suspense } from "react";
import { Callout } from "@/components/site/callout";
import { PageHeader } from "@/components/site/page-header";
import { StatusLegend } from "@/components/site/status-badge";
import { Explorer } from "@/components/spec/explorer";
import { getDomains, getManifest } from "@/lib/spec/load";
import { getEntityViews } from "@/lib/spec/views";

export const metadata: Metadata = {
  title: "Data Model Explorer",
  description:
    "Browse the draft entities, fields, relationships and example payloads of the Common Ownership Operating Schema for Canadian strata and condominium data.",
  alternates: { canonical: "/data-model" },
};

export default async function DataModelPage() {
  const { version } = getManifest();
  const entities = await getEntityViews();
  const domains = getDomains().map(({ id, name, planned }) => ({ id, name, planned }));

  return (
    <>
      <PageHeader eyebrow="Data Model Explorer" title="Browse entities, fields and relationships">
        Search the draft data model, filter by domain or status, and copy example payloads. Every entity links to its JSON
        Schema.
      </PageHeader>
      <div className="container-page space-y-8 py-10">
        <div className="space-y-4">
          <StatusLegend />
          <Callout tone="warning">
            No entity is stable yet. Example payloads are illustrative and use fictional data; normative fields and values will
            be set by the first published release.
          </Callout>
        </div>
        <Suspense fallback={<p className="text-sm text-muted-foreground">Loading explorer…</p>}>
          <Explorer entities={entities} domains={domains} version={version} />
        </Suspense>
      </div>
    </>
  );
}
