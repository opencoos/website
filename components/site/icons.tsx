import type { SVGProps } from "react";
import { cn } from "@/lib/utils";

export function GitHubMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

/**
 * COOS mark: a pigeon (the bird that coos; it lives in shared buildings and carries
 * messages between them) with a curly-brace wing for the schema. Flat colours so it
 * stays legible at favicon size. Source of truth for app/icon.svg.
 */
export function LogoMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <path d="M10 17.5 L2.5 14.2 C2 14 1.7 14.6 2.1 15 L7.5 20.5 Z" fill="#115e59" />
      <path
        d="M7 18.5 C7 13.2 11.5 10.6 16.5 11.2 L19.5 11.8 C24.6 13 27 17.8 25.2 22.2 C23.5 26.2 18 27.6 13.5 26.3 C9.6 25.2 7 22.4 7 18.5 Z"
        fill="#0f766e"
      />
      <circle cx="21.8" cy="9.4" r="4.4" fill="#0f766e" />
      <path d="M18.6 12.8 C20.4 14.3 23.2 14.2 24.9 12.6 C24.6 14.6 22.6 16 20.4 15.6 C19.5 15.4 18.9 14.4 18.6 12.8 Z" fill="#14b8a6" />
      <path d="M25.9 8.6 L29.3 9.8 L25.9 11 Z" fill="#f59e0b" />
      <circle cx="22.9" cy="8.5" r="1.55" fill="#fff" />
      <circle cx="23.3" cy="8.5" r="0.8" fill="#0f172a" />
      <path
        d="M11.6 15.6 c1.9 0 2.4 0.7 2.4 2 v1.1 c0 1 0.5 1.5 1.7 1.5 c-1.2 0 -1.7 0.5 -1.7 1.5 v1.1 c0 1.3 -0.5 2 -2.4 2"
        fill="none"
        stroke="#fff"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M15 26.6 v2.6 M19.2 26.2 v3" stroke="#f59e0b" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Two-tone monospace wordmark: "Open" in ink, "COOS" (the schema) in the brand
 * accent. One wrapping element so a parent flex gap can't
 * push the halves apart.
 */
export function BrandName({ className }: { className?: string }) {
  return (
    <span className={cn("font-mono font-bold tracking-tight", className)}>
      Open<span className="text-brand-accent">COOS</span>
    </span>
  );
}
