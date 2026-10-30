// Site-wide configuration. External links are read from environment variables so
// they can be configured without code changes; a null value means "not yet configured"
// and the UI says so instead of inventing a URL.

const optional = (value: string | undefined) => (value && value.trim() ? value.trim() : null);

// Three brand layers: the open initiative (OpenCOOS), the specification it
// maintains (COOS), and the company that founded it (ManageStrata).
export const site = {
  name: "OpenCOOS",
  tagline: "Open standards for community management",
  audience: "For strata and condo communities across Canada",
  description:
    "OpenCOOS is a proudly Canadian open initiative maintaining COOS, the Common Ownership Operating Schema: an open data model for strata and condominium communities across Canada.",
  // No production domain has been chosen yet; set NEXT_PUBLIC_SITE_URL before deploying.
  url: (optional(process.env.NEXT_PUBLIC_SITE_URL) ?? "http://localhost:3000").replace(/\/$/, ""),
  links: {
    specificationRepo: optional(process.env.NEXT_PUBLIC_SPEC_REPO_URL) ?? "https://github.com/opencoos/spec",
    websiteRepo: optional(process.env.NEXT_PUBLIC_WEBSITE_REPO_URL) ?? "https://github.com/opencoos/website",
    issues: optional(process.env.NEXT_PUBLIC_ISSUES_URL) ?? "https://github.com/opencoos/spec/issues",
    discussions: optional(process.env.NEXT_PUBLIC_DISCUSSIONS_URL),
    contributing: optional(process.env.NEXT_PUBLIC_CONTRIBUTING_URL) ?? "https://github.com/opencoos/.github/blob/main/CONTRIBUTING.md",
    contactEmail: optional(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
  },
};

export const standard = {
  name: "Common Ownership Operating Schema",
  shortName: "COOS",
  summary: "An open, vendor-neutral data model for shared-ownership communities.",
  reach: "Strata in British Columbia. Condominiums in Ontario, Alberta and across Canada.",
  headline: "A Common Language for Canada's Strata and Condo Data",
};

export const founder = {
  name: "ManageStrata",
  url: "https://managestrata.ca",
  role: "The software company helping initiate and implement the standard.",
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/standard", label: "The Standard" },
  { href: "/data-model", label: "Data Model" },
  { href: "/docs", label: "Documentation" },
  { href: "/use-cases", label: "Use Cases" },
  { href: "/governance", label: "Governance" },
  { href: "/contribute", label: "Contribute" },
] as const;

export function absoluteUrl(path: string) {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}
