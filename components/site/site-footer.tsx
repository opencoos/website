import Link from "next/link";
import { founder, site, standard } from "@/lib/site";
import { getManifest } from "@/lib/spec/load";
import { ProudlyCanadian } from "./canada";
import { BrandName, LogoMark } from "./icons";

const columns = [
  {
    title: "Standard",
    links: [
      { href: "/standard", label: "Overview" },
      { href: "/data-model", label: "Data Model Explorer" },
      { href: "/standard/jurisdictions", label: "Jurisdictions" },
      { href: "/standard/shared-definitions", label: "Shared definitions" },
      { href: "/changelog", label: "Changelog" },
    ],
  },
  {
    title: "Developers",
    links: [
      { href: "/docs", label: "Getting started" },
      { href: "/docs/json-schema", label: "JSON Schema" },
      { href: "/docs/versioning", label: "Versioning" },
      { href: "/docs/faq", label: "Technical FAQ" },
    ],
  },
  {
    title: "Community",
    links: [
      { href: "/about", label: "About" },
      { href: "/contribute", label: "Contribute" },
      { href: "/governance", label: "Governance" },
      { href: "/use-cases", label: "Use cases" },
    ],
  },
];

export function SiteFooter() {
  const { version } = getManifest();
  return (
    <footer className="mt-24 border-t bg-muted/40">
      <div className="container-page grid gap-10 py-12 md:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div className="space-y-3">
          <Link href="/" className="flex items-center gap-2 font-bold tracking-tight">
            <LogoMark className="size-7" />
            <BrandName />
          </Link>
          <p className="max-w-sm text-sm text-muted-foreground">
            Maintainers of the {standard.name} ({standard.shortName}). {site.tagline}. Currently in early development (working draft v{version}).
          </p>
          <p className="text-sm text-muted-foreground">
            An initiative founded by{" "}
            <a href={founder.url} rel="noopener" className="text-foreground hover:text-primary">
              {founder.name}
            </a>
            .
          </p>
          <ProudlyCanadian />
        </div>
        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="text-sm font-medium">{col.title}</h2>
            <ul className="mt-3 space-y-2">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-muted-foreground hover:text-foreground">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t">
        <p className="container-page py-6 text-xs leading-relaxed text-muted-foreground">
          OpenCOOS is an open community initiative founded by ManageStrata. It is not endorsed by, affiliated with, or mandated by the Government
          of Canada, any province or territory, or any regulator. Data modelling guidance on this site is not legal advice.
        </p>
      </div>
    </footer>
  );
}
