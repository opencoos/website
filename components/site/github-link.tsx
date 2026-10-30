import Link from "next/link";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { GitHubMark } from "./icons";

/** Links to the specification repository, or to the repositories section while it is not yet configured. */
export function GitHubLink({ className, showLabel = true }: { className?: string; showLabel?: boolean }) {
  const href = site.links.specificationRepo;
  const classes = cn(
    "inline-flex items-center gap-2 rounded-md text-sm text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
    className,
  );
  if (href) {
    return (
      <a href={href} className={classes} rel="noopener">
        <GitHubMark className="size-4" />
        {showLabel ? <span>GitHub</span> : <span className="sr-only">GitHub repository</span>}
      </a>
    );
  }
  return (
    <Link href="/contribute#repositories" className={classes} title="The public repository has not been configured yet">
      <GitHubMark className="size-4" />
      {showLabel ? <span>GitHub (pending)</span> : <span className="sr-only">GitHub repository (pending)</span>}
    </Link>
  );
}
