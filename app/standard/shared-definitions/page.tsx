import Link from "next/link";
import { PageHeader } from "@/components/site/page-header";
import { Breadcrumbs } from "@/components/site/structured-data";
import { commonSchemaUrl, getSharedDefinitions } from "@/lib/spec/load";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Shared definitions",
  description:
    "Reusable data types — identifiers, dates, money, addresses, strata plan numbers, PIDs and extensions — used across the draft strata data standard.",
  path: "/standard/shared-definitions",
});

export default function SharedDefinitionsPage() {
  const defs = getSharedDefinitions();
  return (
    <>
      <Breadcrumbs items={[{ name: "The Standard", path: "/standard" }, { name: "Shared definitions", path: "/standard/shared-definitions" }]} />
      <PageHeader eyebrow="The Standard" title="Shared definitions">
        Reusable types referenced by every entity. They keep identifiers, dates, money and addresses consistent across the
        whole standard.
      </PageHeader>
      <div className="container-page space-y-6 py-10">
        <p className="text-sm text-muted-foreground">
          Machine-readable source:{" "}
          <a href={commonSchemaUrl()} className="font-mono text-primary hover:underline">
            common.schema.json
          </a>
          . See also <Link href="/docs/conventions" className="text-primary hover:underline">data model conventions</Link>.
        </p>
        {defs.map((d) => (
          <section key={d.name} id={d.name} className="scroll-mt-20 rounded-xl border p-6">
            <div className="flex flex-wrap items-baseline gap-3">
              <h2 className="font-mono text-lg font-semibold">{d.name}</h2>
              <span className="font-mono text-xs text-muted-foreground">{d.type}</span>
            </div>
            <p className="mt-2 max-w-3xl text-sm text-muted-foreground">{d.description}</p>
            {d.constraints.length > 0 && <p className="mt-2 font-mono text-xs break-all">{d.constraints.join(" · ")}</p>}
            {d.fields && (
              <div className="mt-4 overflow-x-auto rounded-lg border">
                <table className="w-full min-w-[480px] text-left text-sm">
                  <thead className="bg-muted/50 text-xs text-muted-foreground">
                    <tr>
                      <th scope="col" className="px-3 py-2 font-medium">Field</th>
                      <th scope="col" className="px-3 py-2 font-medium">Type</th>
                      <th scope="col" className="px-3 py-2 font-medium">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {d.fields.map((f) => (
                      <tr key={f.name} className="border-t align-top">
                        <td className="px-3 py-2 font-mono text-[13px]">
                          {f.name}
                          <span className="block font-sans text-[11px] text-muted-foreground">{f.required ? "required" : "optional"}</span>
                        </td>
                        <td className="px-3 py-2 font-mono text-[13px]">{f.type}</td>
                        <td className="px-3 py-2">
                          {f.description}
                          {f.constraints.length > 0 && (
                            <span className="mt-1 block font-mono text-[11px] break-all text-muted-foreground">{f.constraints.join(" · ")}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        ))}
      </div>
    </>
  );
}
