"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { docsNav } from "@/lib/content/docs-nav";
import { cn } from "@/lib/utils";

export function DocsSidebar() {
  const pathname = usePathname();
  return (
    <nav aria-label="Documentation" className="space-y-6 text-sm">
      {docsNav.map((group) => (
        <div key={group.title}>
          <p className="mb-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">{group.title}</p>
          <ul className="space-y-0.5 border-l">
            {group.items.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "-ml-px block border-l py-1 pl-3 text-muted-foreground hover:border-foreground/40 hover:text-foreground",
                      active && "border-primary font-medium text-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export function DocsPager() {
  const pathname = usePathname();
  const flat = docsNav.flatMap((g) => g.items);
  const i = flat.findIndex((item) => item.href === pathname);
  if (i === -1) return null;
  const prev = flat[i - 1];
  const next = flat[i + 1];
  return (
    <nav aria-label="Previous and next pages" className="mt-16 grid gap-4 border-t pt-6 sm:grid-cols-2">
      {prev ? (
        <Link href={prev.href} className="rounded-lg border p-4 hover:border-primary/40">
          <span className="text-xs text-muted-foreground">Previous</span>
          <span className="block font-medium">{prev.label}</span>
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link href={next.href} className="rounded-lg border p-4 text-right hover:border-primary/40">
          <span className="text-xs text-muted-foreground">Next</span>
          <span className="block font-medium">{next.label}</span>
        </Link>
      )}
    </nav>
  );
}
