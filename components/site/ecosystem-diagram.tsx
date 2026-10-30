import { ArrowDown, ArrowRight, BarChart3, Building2, Calculator, Wrench } from "lucide-react";

const sources = [
  { icon: Building2, label: "Strata management software" },
  { icon: Calculator, label: "Financial tools" },
  { icon: Wrench, label: "Maintenance platforms" },
  { icon: BarChart3, label: "Analytics and AI" },
];

const sample = `{
  "type": "StrataCorporation",
  "strataPlanNumber": "EPS0001",
  "jurisdiction": "BC"
}`;

/** Many systems → one shared definition → consistent data. */
export function EcosystemDiagram() {
  return (
    <figure aria-labelledby="ecosystem-caption" className="rounded-xl border bg-background p-4 shadow-xs sm:p-6">
      <div className="grid items-center gap-4 lg:grid-cols-[1fr_auto_1.1fr_auto_1fr]">
        <ul className="grid grid-cols-2 gap-2 lg:grid-cols-1">
          {sources.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-2 rounded-lg border bg-muted/40 px-3 py-2.5 text-sm">
              <Icon className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
              {label}
            </li>
          ))}
        </ul>
        <Arrow />
        <div className="rounded-lg border-2 border-primary/70 bg-accent px-4 py-6 text-center">
          <p className="font-mono text-[11px] tracking-wider text-primary uppercase">Shared definitions</p>
          <p className="mt-1 text-lg font-semibold">Common Ownership Operating Schema (COOS)</p>
          <p className="mt-1 text-xs text-muted-foreground">Entities · fields · relationships · vocabularies</p>
        </div>
        <Arrow />
        <div className="rounded-lg border bg-muted/40 p-3">
          <p className="mb-2 text-sm font-medium">Consistent, interoperable data</p>
          <pre className="overflow-x-auto rounded-md bg-background p-3 font-mono text-[11px] leading-relaxed text-muted-foreground">
            {sample}
          </pre>
        </div>
      </div>
      <figcaption id="ecosystem-caption" className="mt-4 text-xs text-muted-foreground">
        Illustration: different applications map their data to the same shared definitions, so information means the same
        thing wherever it goes.
      </figcaption>
    </figure>
  );
}

function Arrow() {
  return (
    <div className="flex justify-center text-primary" aria-hidden="true">
      <ArrowDown className="size-5 lg:hidden" />
      <ArrowRight className="hidden size-5 lg:block" />
    </div>
  );
}
