// Presentational view of one entity. Has no hooks so it renders on the server for
// /data-model/[entity] and inside the client-side explorer.
import Link from "next/link";
import { ArrowLeft, ArrowRight, FileJson } from "lucide-react";
import { CopyButton } from "@/components/site/copy-button";
import { StatusBadge } from "@/components/site/status-badge";
import type { Entity, Field } from "@/lib/spec/types";
import { cn } from "@/lib/utils";

export type EntityView = Entity & { domainName: string; exampleHtml: string };

const defaultHref = (name: string) => `/data-model/${name}`;

export function EntityDetail({
  entity,
  version,
  hrefFor = defaultHref,
  headingLevel = 1,
}: {
  entity: EntityView;
  version: string;
  hrefFor?: (name: string) => string;
  headingLevel?: 1 | 2;
}) {
  const H = headingLevel === 1 ? "h1" : "h2";
  const S = headingLevel === 1 ? "h2" : "h3";
  const enums = collectEnums(entity.fields);
  const exampleJson = JSON.stringify(entity.example, null, 2);

  return (
    <article className="min-w-0 space-y-10">
      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <Link href={`/standard/${entity.domain}`} className="hover:text-foreground">
            {entity.domainName}
          </Link>
          <span aria-hidden="true">·</span>
          <span className="font-mono">since {entity.since}</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono">spec v{version}</span>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <H className="font-mono text-2xl font-semibold tracking-tight sm:text-3xl">{entity.name}</H>
          <StatusBadge status={entity.status} />
        </div>
        <p className="max-w-3xl text-pretty text-muted-foreground">{entity.description}</p>
        <div className="flex flex-wrap gap-2 pt-1">
          <a href={entity.schemaUrl} className="inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs hover:bg-muted">
            <FileJson className="size-3.5" aria-hidden="true" /> JSON Schema
          </a>
          <a href={entity.exampleUrl} className="inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs hover:bg-muted">
            <FileJson className="size-3.5" aria-hidden="true" /> Example file
          </a>
        </div>
      </header>

      <section aria-label="Fields">
        <S className="text-lg font-semibold">Fields</S>
        <div className="mt-3 overflow-x-auto rounded-lg border">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-muted/50 text-xs text-muted-foreground">
              <tr>
                <th scope="col" className="px-3 py-2 font-medium">Field</th>
                <th scope="col" className="px-3 py-2 font-medium">Type</th>
                <th scope="col" className="px-3 py-2 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <FieldRows fields={entity.fields} hrefFor={hrefFor} />
            </tbody>
          </table>
        </div>
      </section>

      {enums.length > 0 && (
        <section aria-label="Enumerations">
          <S className="text-lg font-semibold">Controlled vocabularies</S>
          <div className="mt-3 grid gap-4 md:grid-cols-2">
            {enums.map((f) => (
              <div key={f.path} className="rounded-lg border p-4">
                <p className="font-mono text-sm font-medium">{f.path}</p>
                <dl className="mt-2 space-y-1.5 text-sm">
                  {f.values.map((v) => (
                    <div key={v.value} className="grid grid-cols-[auto_1fr] gap-3">
                      <dt>
                        <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">{v.value}</code>
                      </dt>
                      <dd className="text-muted-foreground">{v.description}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </section>
      )}

      <section aria-label="Relationships">
        <S className="text-lg font-semibold">Relationships</S>
        <RelationshipMap entity={entity} hrefFor={hrefFor} />
      </section>

      {entity.validationRules.length > 0 && (
        <section aria-label="Validation rules">
          <S className="text-lg font-semibold">Validation rules</S>
          <p className="mt-1 text-sm text-muted-foreground">
            Cross-field rules beyond what JSON Schema expresses. Documented in the draft; not yet enforced by tooling.
          </p>
          <ul className="mt-3 list-disc space-y-1.5 pl-6 text-sm">
            {entity.validationRules.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </section>
      )}

      {entity.legalReviewNotes.length > 0 && (
        <section aria-label="Legal review notes" className="rounded-lg border border-amber-200 bg-amber-50/60 p-4">
          <S className="text-sm font-semibold text-amber-950">Open questions for legal and industry review</S>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-amber-950">
            {entity.legalReviewNotes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </section>
      )}

      <section aria-label="Example payload">
        <div className="flex items-center justify-between gap-3">
          <S className="text-lg font-semibold">Example payload</S>
          <CopyButton value={exampleJson} label="Copy JSON" />
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          Illustrative only, with fictional data. Validated against the draft schema at build time.
        </p>
        <div className="mt-3" dangerouslySetInnerHTML={{ __html: entity.exampleHtml }} />
      </section>
    </article>
  );
}

function FieldRows({ fields, hrefFor, depth = 0 }: { fields: Field[]; hrefFor: (n: string) => string; depth?: number }) {
  return fields.map((f) => (
    <FieldRow key={`${depth}-${f.name}`} field={f} hrefFor={hrefFor} depth={depth} />
  ));
}

function FieldRow({ field: f, hrefFor, depth }: { field: Field; hrefFor: (n: string) => string; depth: number }) {
  return (
    <>
      <tr className="border-t align-top">
        <td className="px-3 py-2.5" style={{ paddingLeft: `${0.75 + depth * 1.25}rem` }}>
          <code className={cn("font-mono text-[13px]", depth > 0 && "text-muted-foreground")}>
            {depth > 0 && "↳ "}
            {f.name}
          </code>
          <div className="mt-1">
            {f.required ? (
              <span className="text-[11px] font-medium text-primary">required</span>
            ) : (
              <span className="text-[11px] text-muted-foreground">optional</span>
            )}
          </div>
        </td>
        <td className="px-3 py-2.5 whitespace-nowrap">
          {f.sharedType ? (
            <Link href={`/standard/shared-definitions#${f.sharedType}`} className="font-mono text-[13px] text-primary hover:underline">
              {f.type}
            </Link>
          ) : (
            <span className="font-mono text-[13px]">{f.type}</span>
          )}
        </td>
        <td className="px-3 py-2.5">
          <p className="text-pretty">{f.description}</p>
          {f.references && (
            <p className="mt-1 text-xs text-muted-foreground">
              References{" "}
              <Link href={hrefFor(f.references)} className="font-mono text-primary hover:underline">
                {f.references}
              </Link>
            </p>
          )}
          {f.enumValues && (
            <p className="mt-1 flex flex-wrap gap-1">
              {f.enumValues.map((v) => (
                <code key={v.value} className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px]">
                  {v.value}
                </code>
              ))}
            </p>
          )}
          {f.constraints.length > 0 && <p className="mt-1 font-mono text-[11px] break-all text-muted-foreground">{f.constraints.join(" · ")}</p>}
        </td>
      </tr>
      {f.children && <FieldRows fields={f.children} hrefFor={hrefFor} depth={depth + 1} />}
    </>
  );
}

function collectEnums(fields: Field[], prefix = ""): { path: string; values: { value: string; description?: string }[] }[] {
  return fields.flatMap((f) => {
    const path = prefix ? `${prefix}.${f.name}` : f.name;
    const own = f.enumValues && f.enumValues.length > 1 ? [{ path, values: f.enumValues }] : [];
    return [...own, ...(f.children ? collectEnums(f.children, `${path}[]`) : [])];
  });
}

function RelationshipMap({ entity, hrefFor }: { entity: EntityView; hrefFor: (n: string) => string }) {
  const incoming = entity.referencedBy;
  const outgoing = entity.relationships;
  if (!incoming.length && !outgoing.length) {
    return <p className="mt-3 text-sm text-muted-foreground">No relationships defined.</p>;
  }
  return (
    <div className="mt-3 grid items-center gap-4 rounded-lg border bg-muted/30 p-4 md:grid-cols-[1fr_auto_1fr]">
      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground">Referenced by</p>
        {incoming.length ? (
          <ul className="space-y-1.5">
            {incoming.map((r) => (
              <li key={`${r.entity}.${r.field}`} className="flex items-center gap-2 text-sm">
                <Link href={hrefFor(r.entity)} className="rounded-md border bg-background px-2 py-1 font-mono text-xs hover:border-primary/50">
                  {r.entity}
                </Link>
                <span className="font-mono text-[11px] text-muted-foreground">.{r.field}</span>
                <ArrowRight className="ml-auto size-3.5 text-muted-foreground" aria-hidden="true" />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">None</p>
        )}
      </div>
      <div className="flex justify-center">
        <span className="rounded-md border-2 border-primary bg-background px-3 py-2 font-mono text-sm font-medium">{entity.name}</span>
      </div>
      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground">References</p>
        {outgoing.length ? (
          <ul className="space-y-1.5">
            {outgoing.map((r) => (
              <li key={r.field} className="flex items-center gap-2 text-sm">
                <ArrowLeft className="size-3.5 rotate-180 text-muted-foreground" aria-hidden="true" />
                <span className="font-mono text-[11px] text-muted-foreground">
                  {r.field}
                  {r.cardinality === "many" ? "[]" : ""}
                </span>
                <Link href={hrefFor(r.target)} className="rounded-md border bg-background px-2 py-1 font-mono text-xs hover:border-primary/50">
                  {r.target}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">None</p>
        )}
      </div>
    </div>
  );
}
