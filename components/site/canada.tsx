import Link from "next/link";
import { crosswalk, jurisdictions } from "@/lib/content/jurisdictions";
import { cn } from "@/lib/utils";

export function ProudlyCanadian({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-800",
        className,
      )}
    >
      <span aria-hidden="true">🍁</span>
      Proudly Canadian
    </span>
  );
}

const statusStyles = {
  draft: "border-blue-200 bg-blue-50 text-blue-800",
  planned: "border-dashed border-slate-300 bg-white text-slate-600",
  future: "border-dashed border-slate-300 bg-white text-slate-500",
};

export function JurisdictionGrid({ className }: { className?: string }) {
  return (
    <ul className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {jurisdictions.map((j) => (
        <li key={j.code} className="flex flex-col rounded-xl border bg-background p-5">
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-sm font-medium text-primary">{j.code}</span>
            <span className={cn("rounded-full border px-2 py-0.5 text-[11px] font-medium whitespace-nowrap", statusStyles[j.status])}>{j.statusLabel}</span>
          </div>
          <h3 className="mt-3 font-semibold">{j.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{j.model}</p>
          <p className="mt-auto pt-3 text-xs text-muted-foreground">{j.legislation}</p>
        </li>
      ))}
    </ul>
  );
}

export function CrosswalkTable({ limit }: { limit?: number }) {
  const rows = limit ? crosswalk.slice(0, limit) : crosswalk;
  return (
    <div className="overflow-x-auto rounded-xl border bg-background">
      <table className="w-full min-w-[720px] text-left text-sm">
        <caption className="sr-only">Terminology used for the same concept in British Columbia, Ontario and Alberta</caption>
        <thead className="bg-muted/50 text-xs text-muted-foreground">
          <tr>
            <th scope="col" className="px-4 py-3 font-medium">Concept</th>
            <th scope="col" className="px-4 py-3 font-medium">BC (strata)</th>
            <th scope="col" className="px-4 py-3 font-medium">Ontario (condo)</th>
            <th scope="col" className="px-4 py-3 font-medium">Alberta (condo)</th>
            {!limit && <th scope="col" className="px-4 py-3 font-medium">Draft entity</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.concept} className="border-t align-top">
              <th scope="row" className="px-4 py-3 font-medium">{r.concept}</th>
              <td className="px-4 py-3">{r.bc}</td>
              <td className="px-4 py-3">{r.on}</td>
              <td className="px-4 py-3">{r.ab}</td>
              {!limit && (
                <td className="px-4 py-3">
                  {r.entity ? (
                    <Link href={`/data-model/${r.entity}`} className="font-mono text-xs text-primary hover:underline">
                      {r.entity}
                    </Link>
                  ) : (
                    <span className="text-xs text-muted-foreground">Not yet modelled</span>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
