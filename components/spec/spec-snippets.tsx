// Small server components for use inside MDX documentation.
import Link from "next/link";
import { CodeBlock } from "@/components/site/code-block";
import { StatusBadge } from "@/components/site/status-badge";
import { absoluteUrl } from "@/lib/site";
import { commonSchemaUrl, getDomains, getEntities, getEntity, getManifest } from "@/lib/spec/load";

export function SpecVersion() {
  return <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em]">{getManifest().version}</code>;
}

export function ExampleFor({ entity }: { entity: string }) {
  const e = getEntity(entity);
  if (!e) return null;
  return <CodeBlock code={JSON.stringify(e.example, null, 2)} lang="json" title={`${e.name}.example.json`} />;
}

export function SchemaIndex() {
  const entities = getEntities();
  return (
    <div className="mt-6 overflow-x-auto rounded-lg border">
      <table className="w-full min-w-[560px] text-left text-sm">
        <thead className="bg-muted/50 text-xs text-muted-foreground">
          <tr>
            <th scope="col" className="px-3 py-2 font-medium">Entity</th>
            <th scope="col" className="px-3 py-2 font-medium">Status</th>
            <th scope="col" className="px-3 py-2 font-medium">Schema</th>
            <th scope="col" className="px-3 py-2 font-medium">Example</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t">
            <td className="px-3 py-2 font-mono text-[13px]">(shared definitions)</td>
            <td className="px-3 py-2" />
            <td className="px-3 py-2">
              <a href={commonSchemaUrl()} className="font-mono text-xs text-primary hover:underline">
                common.schema.json
              </a>
            </td>
            <td className="px-3 py-2" />
          </tr>
          {entities.map((e) => (
            <tr key={e.name} className="border-t">
              <td className="px-3 py-2">
                <Link href={`/data-model/${e.name}`} className="font-mono text-[13px] hover:text-primary">
                  {e.name}
                </Link>
              </td>
              <td className="px-3 py-2">
                <StatusBadge status={e.status} />
              </td>
              <td className="px-3 py-2">
                <a href={e.schemaUrl} className="font-mono text-xs text-primary hover:underline">
                  {e.schemaUrl.split("/").pop()}
                </a>
              </td>
              <td className="px-3 py-2">
                <a href={e.exampleUrl} className="font-mono text-xs text-primary hover:underline">
                  {e.exampleUrl.split("/").pop()}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function SchemaBaseUrl() {
  return (
    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em] break-all">
      {absoluteUrl(`/spec/${getManifest().version}/`)}
    </code>
  );
}

export function RelationshipIndex() {
  return (
    <div className="mt-6 space-y-6">
      {getDomains().map((d) => (
        <div key={d.id}>
          <h3 className="font-semibold">{d.name}</h3>
          <ul className="mt-2 space-y-1 font-mono text-[13px]">
            {d.entities.flatMap((e) =>
              e.relationships.map((r) => (
                <li key={`${e.name}.${r.field}`}>
                  <Link href={`/data-model/${e.name}`} className="hover:text-primary">
                    {e.name}
                  </Link>
                  <span className="text-muted-foreground">.{r.field}</span>{" "}
                  <span className="text-muted-foreground">{r.cardinality === "many" ? "→ many" : "→"}</span>{" "}
                  <Link href={`/data-model/${r.target}`} className="text-primary hover:underline">
                    {r.target}
                  </Link>
                </li>
              )),
            )}
          </ul>
        </div>
      ))}
    </div>
  );
}
