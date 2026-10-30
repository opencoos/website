import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Callout } from "@/components/site/callout";
import { DomainIcon } from "@/components/site/domain-icon";
import { StatusBadge } from "@/components/site/status-badge";
import { getChangelog, getDomain, getDomains, getManifest } from "@/lib/spec/load";

export function generateStaticParams() {
  return getDomains().map((d) => ({ domain: d.id }));
}

export async function generateMetadata({ params }: PageProps<"/standard/[domain]">): Promise<Metadata> {
  const { domain: id } = await params;
  const domain = getDomain(id);
  if (!domain) return {};
  return {
    title: `${domain.name} domain`,
    description: `${domain.summary} Draft entity definitions for Canadian strata and condominium data.`,
    alternates: { canonical: `/standard/${domain.id}` },
  };
}

const toc = [
  ["purpose", "Purpose and scope"],
  ["entities", "Entity definitions"],
  ["fields", "Fields at a glance"],
  ["relationships", "Relationships"],
  ["planned", "Planned work"],
  ["issues", "Open issues and proposals"],
  ["history", "Version history"],
];

export default async function DomainPage({ params }: PageProps<"/standard/[domain]">) {
  const { domain: id } = await params;
  const domain = getDomain(id);
  if (!domain) notFound();
  const { version } = getManifest();
  const changelog = getChangelog();
  const proposals = changelog.openProposals.filter((p) => p.domain === domain.id);

  return (
    <div className="container-page grid gap-10 py-10 lg:grid-cols-[200px_1fr]">
      <aside className="hidden lg:block">
        <nav aria-label="On this page" className="sticky top-20 space-y-1 text-sm">
          <p className="mb-2 text-xs font-medium text-muted-foreground">On this page</p>
          {toc.map(([href, label]) => (
            <a key={href} href={`#${href}`} className="block text-muted-foreground hover:text-foreground">
              {label}
            </a>
          ))}
        </nav>
      </aside>

      <article className="min-w-0 space-y-12">
        <header className="space-y-3">
          <Link href="/standard" className="text-sm text-muted-foreground hover:text-foreground">
            The Standard
          </Link>
          <div className="flex items-center gap-3">
            <DomainIcon domain={domain.id} className="size-6 text-primary" />
            <h1 className="text-3xl font-semibold tracking-tight">{domain.name}</h1>
          </div>
          <p className="max-w-3xl text-lg text-muted-foreground">{domain.summary}</p>
          <p className="font-mono text-xs text-muted-foreground">Working draft v{version} · not yet released</p>
        </header>

        <section id="purpose" className="scroll-mt-20 space-y-4">
          <h2 className="border-b pb-2 text-xl font-semibold">Purpose and scope</h2>
          <p className="max-w-3xl">{domain.purpose}</p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border p-4">
              <h3 className="text-sm font-semibold">In scope</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                {domain.inScope.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="text-sm font-semibold">Out of scope</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                {domain.outOfScope.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="entities" className="scroll-mt-20 space-y-4">
          <h2 className="border-b pb-2 text-xl font-semibold">Entity definitions</h2>
          <div className="divide-y rounded-lg border">
            {domain.entities.map((e) => (
              <div key={e.name} className="grid gap-2 p-4 sm:grid-cols-[220px_1fr]">
                <div className="flex flex-wrap items-center gap-2">
                  <Link href={`/data-model/${e.name}`} className="font-mono text-sm font-medium text-primary hover:underline">
                    {e.name}
                  </Link>
                  <StatusBadge status={e.status} />
                </div>
                <p className="text-sm text-muted-foreground">{e.description}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            Each entity page lists data types, required and optional fields, controlled vocabularies, validation rules and an
            example payload.
          </p>
        </section>

        <section id="fields" className="scroll-mt-20 space-y-4">
          <h2 className="border-b pb-2 text-xl font-semibold">Fields at a glance</h2>
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="bg-muted/50 text-xs text-muted-foreground">
                <tr>
                  <th scope="col" className="px-3 py-2 font-medium">Entity</th>
                  <th scope="col" className="px-3 py-2 font-medium">Required fields</th>
                  <th scope="col" className="px-3 py-2 font-medium">Optional fields</th>
                </tr>
              </thead>
              <tbody>
                {domain.entities.map((e) => (
                  <tr key={e.name} className="border-t align-top">
                    <td className="px-3 py-2 font-mono text-[13px]">{e.name}</td>
                    <td className="px-3 py-2 font-mono text-xs">{e.fields.filter((f) => f.required).map((f) => f.name).join(", ")}</td>
                    <td className="px-3 py-2 font-mono text-xs text-muted-foreground">
                      {e.fields.filter((f) => !f.required).map((f) => f.name).join(", ")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="relationships" className="scroll-mt-20 space-y-4">
          <h2 className="border-b pb-2 text-xl font-semibold">Relationships</h2>
          <ul className="space-y-1.5 font-mono text-[13px]">
            {domain.entities.flatMap((e) =>
              e.relationships.map((r) => (
                <li key={`${e.name}.${r.field}`} className="flex flex-wrap items-center gap-2">
                  <span>{e.name}</span>
                  <span className="text-muted-foreground">.{r.field}</span>
                  <span className="text-muted-foreground" aria-label={r.cardinality === "many" ? "references many" : "references one"}>
                    {r.cardinality === "many" ? "→*" : "→"}
                  </span>
                  <Link href={`/data-model/${r.target}`} className="text-primary hover:underline">
                    {r.target}
                  </Link>
                  {r.required && <span className="font-sans text-[11px] text-muted-foreground">(required)</span>}
                </li>
              )),
            )}
          </ul>
        </section>

        <section id="planned" className="scroll-mt-20 space-y-4">
          <h2 className="border-b pb-2 text-xl font-semibold">Planned work</h2>
          {domain.planned.length ? (
            <ul className="grid gap-3 md:grid-cols-2">
              {domain.planned.map((p) => (
                <li key={p.name} className="rounded-lg border border-dashed p-4">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm">{p.name}</span>
                    <StatusBadge status="planned" />
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No planned entities.</p>
          )}
        </section>

        <section id="issues" className="scroll-mt-20 space-y-4">
          <h2 className="border-b pb-2 text-xl font-semibold">Open issues and proposals</h2>
          <ul className="space-y-3">
            {[...domain.openIssues, ...proposals].map((i) => (
              <li key={i.title} className="rounded-lg border p-4">
                <p className="font-medium">{i.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{i.description}</p>
              </li>
            ))}
          </ul>
          <Callout>
            Have a view on these questions? See{" "}
            <Link href="/contribute">how to contribute</Link> — feedback from people who are not developers is welcome.
          </Callout>
        </section>

        <section id="history" className="scroll-mt-20 space-y-4">
          <h2 className="border-b pb-2 text-xl font-semibold">Version history</h2>
          <ul className="space-y-2 text-sm">
            {changelog.entries.map((c) => (
              <li key={c.version}>
                <span className="font-mono">v{c.version}</span> ({c.date}, {c.status}) — {c.title}.{" "}
                <Link href="/changelog" className="text-primary hover:underline">
                  Details
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </div>
  );
}
