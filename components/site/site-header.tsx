import Link from "next/link";
import { getManifest } from "@/lib/spec/load";
import { site } from "@/lib/site";
import { GitHubLink } from "./github-link";
import { BrandName, LogoMark } from "./icons";
import { MobileNav } from "./mobile-nav";
import { NavLinks } from "./nav-links";

export function SiteHeader() {
  const { version } = getManifest();
  const versionBadge = (
    <Link
      href="/changelog"
      className="rounded-full border px-2 py-0.5 whitespace-nowrap font-mono text-[11px] text-muted-foreground hover:border-primary/40 hover:text-foreground"
      title="Current working draft of the Common Ownership Operating Schema (COOS). No stable release has been published."
    >
      v{version}
    </Link>
  );
  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:ring-2 focus:ring-ring"
      >
        Skip to content
      </a>
      <div className="container-page flex h-14 items-center gap-4">
        <Link href="/" className="flex items-center gap-2.5 font-bold tracking-tight" aria-label={`${site.name} home`}>
          <LogoMark className="size-8" />
          <BrandName />
        </Link>
        <div className="hidden sm:block">{versionBadge}</div>
        <nav aria-label="Primary" className="ml-auto hidden lg:block">
          <NavLinks className="flex items-center gap-0.5" />
        </nav>
        <GitHubLink className="ml-auto hidden lg:ml-2 lg:inline-flex" showLabel={false} />
        <div className="ml-auto lg:hidden">
          <MobileNav>
            <div className="flex items-center justify-between">
              <GitHubLink />
              {versionBadge}
            </div>
          </MobileNav>
        </div>
      </div>
    </header>
  );
}
