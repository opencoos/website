"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/site/status-badge";
import type { PlannedEntity, Status } from "@/lib/spec/types";
import { cn } from "@/lib/utils";
import { EntityDetail, type EntityView } from "./entity-detail";

interface DomainOption {
  id: string;
  name: string;
  planned: PlannedEntity[];
}

type Row =
  | { kind: "entity"; name: string; domain: string; status: Status; matches: string[]; entity: EntityView }
  | { kind: "planned"; name: string; domain: string; status: "planned"; matches: string[]; description: string };

const selectClass =
  "h-9 rounded-md border bg-background px-2.5 text-sm shadow-xs focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none";

export function Explorer({ entities, domains, version }: { entities: EntityView[]; domains: DomainOption[]; version: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const query = params.get("q") ?? "";
  const domain = params.get("domain") ?? "all";
  const status = params.get("status") ?? "all";
  const selectedName = params.get("entity");

  function update(next: Record<string, string | null>) {
    const sp = new URLSearchParams(params.toString());
    for (const [k, v] of Object.entries(next)) {
      if (v === null || v === "" || v === "all") sp.delete(k);
      else sp.set(k, v);
    }
    const qs = sp.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  const rows = useMemo<Row[]>(() => {
    const q = query.trim().toLowerCase();
    const all: Row[] = [
      ...entities.map((e) => ({
        kind: "entity" as const,
        name: e.name,
        domain: e.domain,
        status: e.status,
        entity: e,
        matches: q
          ? e.fields.filter((f) => f.name.toLowerCase().includes(q) || f.description.toLowerCase().includes(q)).map((f) => f.name)
          : [],
      })),
      ...domains.flatMap((d) =>
        d.planned.map((p) => ({
          kind: "planned" as const,
          name: p.name,
          domain: d.id,
          status: "planned" as const,
          description: p.description,
          matches: [],
        })),
      ),
    ];
    return all.filter((r) => {
      if (domain !== "all" && r.domain !== domain) return false;
      if (status !== "all" && r.status !== status) return false;
      if (!q) return true;
      const text = r.kind === "entity" ? `${r.name} ${r.entity.description}` : `${r.name} ${r.description}`;
      return text.toLowerCase().includes(q) || r.matches.length > 0;
    });
  }, [entities, domains, query, domain, status]);

  // Keep showing the chosen entity even when the filters hide it from the list.
  const chosen = entities.find((e) => e.name === selectedName);
  const selected: Row | undefined =
    rows.find((r) => r.name === selectedName) ??
    (chosen ? { kind: "entity", name: chosen.name, domain: chosen.domain, status: chosen.status, entity: chosen, matches: [] } : undefined) ??
    (query || domain !== "all" || status !== "all" ? rows[0] : (rows.find((r) => r.name === "StrataCorporation") ?? rows[0]));

  const hrefFor = (name: string) => {
    const sp = new URLSearchParams(params.toString());
    sp.set("entity", name);
    return `${pathname}?${sp.toString()}`;
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
      <div className="space-y-4 lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:self-start lg:overflow-y-auto lg:pr-1">
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <label htmlFor="explorer-search" className="sr-only">
            Search entities and attributes
          </label>
          <Input
            id="explorer-search"
            type="search"
            placeholder="Search entities and fields…"
            defaultValue={query}
            onChange={(e) => update({ q: e.target.value })}
            className="pl-8"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <label className="space-y-1 text-xs text-muted-foreground">
            Domain
            <select value={domain} onChange={(e) => update({ domain: e.target.value })} className={cn(selectClass, "w-full text-foreground")}>
              <option value="all">All domains</option>
              {domains.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-1 text-xs text-muted-foreground">
            Status
            <select value={status} onChange={(e) => update({ status: e.target.value })} className={cn(selectClass, "w-full text-foreground")}>
              <option value="all">All statuses</option>
              <option value="stable">Stable</option>
              <option value="proposed">Proposed</option>
              <option value="experimental">Experimental</option>
              <option value="planned">Planned</option>
            </select>
          </label>
        </div>
        <p className="text-xs text-muted-foreground" aria-live="polite">
          {rows.length} {rows.length === 1 ? "result" : "results"} · spec v{version}
        </p>
        <nav aria-label="Entities">
          {domains
            .filter((d) => rows.some((r) => r.domain === d.id))
            .map((d) => (
              <div key={d.id} className="mb-4">
                <p className="mb-1 px-2 text-xs font-medium text-muted-foreground">{d.name}</p>
                <ul>
                  {rows
                    .filter((r) => r.domain === d.id)
                    .map((r) => {
                      const active = selected?.name === r.name;
                      return (
                        <li key={r.name}>
                          <button
                            type="button"
                            onClick={() => update({ entity: r.name })}
                            aria-current={active ? "true" : undefined}
                            className={cn(
                              "flex w-full items-center justify-between gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                              active && "bg-accent text-accent-foreground",
                              r.kind === "planned" && "text-muted-foreground",
                            )}
                          >
                            <span className="min-w-0">
                              <span className="block truncate font-mono text-[13px]">{r.name}</span>
                              {r.matches.length > 0 && (
                                <span className="block truncate font-mono text-[11px] text-muted-foreground">
                                  {r.matches.slice(0, 3).join(", ")}
                                </span>
                              )}
                            </span>
                            <StatusBadge status={r.status} />
                          </button>
                        </li>
                      );
                    })}
                </ul>
              </div>
            ))}
          {rows.length === 0 && <p className="px-2 text-sm text-muted-foreground">No entities match these filters.</p>}
        </nav>
      </div>

      <div className="min-w-0">
        {selected?.kind === "entity" ? (
          <EntityDetail entity={selected.entity} version={version} hrefFor={hrefFor} headingLevel={2} />
        ) : selected ? (
          <div className="rounded-xl border border-dashed p-8">
            <div className="flex items-center gap-3">
              <h2 className="font-mono text-2xl font-semibold">{selected.name}</h2>
              <StatusBadge status="planned" />
            </div>
            <p className="mt-3 text-muted-foreground">{selected.description}</p>
            <p className="mt-4 text-sm text-muted-foreground">
              This entity is planned. No schema has been drafted yet, so there are no fields or examples to show. Proposals
              and use cases are welcome.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
