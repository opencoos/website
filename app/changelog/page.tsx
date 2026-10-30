import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/site/page-header";
import { getChangelog } from "@/lib/spec/load";

export const metadata: Metadata = {
  title: "Changelog",
  description: "Version history of the Common Ownership Operating Schema: releases, new entities, changes, deprecations, breaking changes and open proposals.",
  alternates: { canonical: "/changelog" },
};

const groups = [
  ["added", "New entities and attributes"],
  ["changed", "Changes to existing definitions"],
  ["deprecated", "Deprecated fields"],
  ["breaking", "Breaking changes"],
] as const;

export default function ChangelogPage() {
  const { entries, openProposals } = getChangelog();
  return (
    <>
      <PageHeader eyebrow="Changelog" title="Specification version history">
        No stable release has been published yet. Working drafts are listed so changes can be followed from the start.
      </PageHeader>
      <div className="container-page max-w-4xl space-y-12 py-12">
        {entries.map((e) => (
          <article key={e.version} id={`v${e.version}`} className="scroll-mt-20 rounded-xl border p-6">
            <header className="flex flex-wrap items-center gap-3">
              <h2 className="font-mono text-xl font-semibold">v{e.version}</h2>
              <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-900">
                {e.status === "unreleased" ? "Unreleased working draft" : e.status}
              </span>
              <time dateTime={e.date} className="text-sm text-muted-foreground">
                {e.date}
              </time>
            </header>
            <p className="mt-2 font-medium">{e.title}</p>
            <p className="mt-2 text-sm text-muted-foreground">{e.summary}</p>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {groups.map(([key, label]) => (
                <section key={key}>
                  <h3 className="text-sm font-semibold">{label}</h3>
                  {e[key].length ? (
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                      {e[key].map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-2 text-sm text-muted-foreground">None.</p>
                  )}
                </section>
              ))}
            </div>
            <section className="mt-6">
              <h3 className="text-sm font-semibold">Migration instructions</h3>
              <p className="mt-2 text-sm">{e.migration}</p>
            </section>
          </article>
        ))}

        <section id="open-proposals" className="scroll-mt-20">
          <h2 className="text-xl font-semibold">Open proposals</h2>
          <p className="mt-2 text-sm text-muted-foreground">Under discussion for a future draft. Not part of any version.</p>
          <ul className="mt-4 space-y-3">
            {openProposals.map((p) => (
              <li key={p.title} className="rounded-lg border p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium">{p.title}</p>
                  <Link href={`/standard/${p.domain}#issues`} className="rounded-md border px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground hover:text-foreground">
                    {p.domain}
                  </Link>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
