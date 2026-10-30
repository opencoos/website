import Link from "next/link";
import { founder, site, standard } from "@/lib/site";
import { cn } from "@/lib/utils";
import { BrandName, LogoMark } from "./icons";

/** The three brand layers: initiative → specification → founder. */
export function BrandStack({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-2xl border bg-background text-center", className)}>
      <div className="px-6 py-8">
        <LogoMark className="mx-auto size-16" />
        <p className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
          <BrandName />
        </p>
        <p className="mt-2 text-muted-foreground">{site.tagline}</p>
      </div>
      <div className="border-t px-6 py-6">
        <Link href="/standard" className="font-semibold hover:text-primary">
          {standard.name} ({standard.shortName})
        </Link>
        <p className="mt-1.5 text-sm text-muted-foreground">{standard.summary}</p>
      </div>
      <div className="border-t px-6 py-4 text-sm text-muted-foreground">
        An initiative founded by{" "}
        <a href={founder.url} rel="noopener" className="text-foreground hover:text-primary">
          {founder.name}
        </a>
      </div>
    </div>
  );
}

export const brandLayers = [
  { name: site.name, role: "The open initiative and community." },
  { name: standard.shortName, role: "The technical specification: the Common Ownership Operating Schema." },
  { name: founder.name, role: founder.role },
];
