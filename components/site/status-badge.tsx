import { statusInfo, type Status } from "@/lib/spec/types";
import { cn } from "@/lib/utils";

const styles: Record<Status, string> = {
  stable: "border-emerald-200 bg-emerald-50 text-emerald-800",
  proposed: "border-blue-200 bg-blue-50 text-blue-800",
  experimental: "border-amber-200 bg-amber-50 text-amber-900",
  deprecated: "border-red-200 bg-red-50 text-red-800",
  planned: "border-dashed border-slate-300 bg-white text-slate-600",
};

export function StatusBadge({ status, className }: { status: Status; className?: string }) {
  return (
    <span
      title={statusInfo[status].description}
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium whitespace-nowrap",
        styles[status],
        className,
      )}
    >
      {statusInfo[status].label}
    </span>
  );
}

export function StatusLegend({ className }: { className?: string }) {
  return (
    <dl className={cn("grid gap-3 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {(["stable", "proposed", "experimental", "planned"] as const).map((s) => (
        <div key={s} className="space-y-1.5">
          <dt>
            <StatusBadge status={s} />
          </dt>
          <dd className="text-xs text-muted-foreground">{statusInfo[s].description}</dd>
        </div>
      ))}
    </dl>
  );
}
