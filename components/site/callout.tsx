import { Info, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

export function Callout({
  tone = "info",
  title,
  children,
  className,
}: {
  tone?: "info" | "warning";
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const Icon = tone === "warning" ? TriangleAlert : Info;
  return (
    <div
      role="note"
      className={cn(
        "flex gap-3 rounded-lg border p-4 text-sm",
        tone === "warning" ? "border-amber-200 bg-amber-50/70 text-amber-950" : "border-blue-200 bg-blue-50/60 text-blue-950",
        className,
      )}
    >
      <Icon className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      <div className="space-y-1 [&_a]:underline [&_a]:underline-offset-2">
        {title && <p className="font-medium">{title}</p>}
        <div className="leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
