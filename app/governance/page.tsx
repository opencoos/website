import type { Metadata } from "next";
import Link from "next/link";
import { Callout } from "@/components/site/callout";
import { PageHeader } from "@/components/site/page-header";

export const metadata: Metadata = {
  title: "Governance",
  description:
    "How the Common Ownership Operating Schema is maintained: contribution process, proposals, maintainers, versioning, deprecation, compatibility and conflict resolution.",
  alternates: { canonical: "/governance" },
};

const sections = [
  {
    id: "contribution",
    title: "Open contribution process",
    body: [
      "Anyone can propose changes. Discussion and decisions happen in public, in the specification repository's issues and discussions once they are configured.",
      "Changes to the specification are made by pull request and must pass automated schema and example validation.",
    ],
  },
  {
    id: "issues",
    title: "Issue reporting",
    body: [
      "Report errors, unclear definitions, missing concepts or terminology that doesn't match practice in your province as issues. You don't need to propose a solution.",
      "Please never include real personal information or confidential strata records in an issue.",
    ],
  },
  {
    id: "proposals",
    title: "Proposals and design discussions",
    body: [
      "Substantial changes — new entities, new domains, breaking changes — start as a written proposal describing the problem, real-world examples, the proposed definitions and alternatives considered.",
      "Proposals stay open for comment for a reasonable period before a decision, and the decision and its rationale are recorded with the proposal.",
    ],
  },
  {
    id: "maintainers",
    title: "Maintainer responsibilities",
    body: [
      "Maintainers review contributions, keep the specification internally consistent, run releases, publish release notes, and make sure decisions are documented.",
      "Maintainers must act in the interest of the standard as a whole and not of any one product, including products they work on. They disclose relevant affiliations.",
    ],
  },
  {
    id: "versioning",
    title: "Versioning policy",
    body: [
      "Releases follow semantic versioning. Before 1.0.0, minor releases may include breaking changes. Working drafts carry a -draft suffix.",
    ],
    link: { href: "/docs/versioning", label: "Full versioning policy" },
  },
  {
    id: "release-notes",
    title: "Release notes",
    body: ["Every release lists added, changed, deprecated and breaking changes with migration instructions."],
    link: { href: "/changelog", label: "Changelog" },
  },
  {
    id: "deprecation",
    title: "Deprecation policy",
    body: [
      "Fields and entities are deprecated before they are removed, remain valid for at least one further minor release, and are only removed in a major release.",
    ],
  },
  {
    id: "compatibility",
    title: "Compatibility principles",
    body: [
      "Consumers ignore unknown extensions; producers send only defined fields; names are never reused with a different meaning once stable.",
    ],
  },
  {
    id: "conflicts",
    title: "Conflict resolution",
    body: [
      "Disagreements are resolved by discussion aimed at consensus, guided by the design principles and real-world evidence.",
      "If consensus can't be reached, maintainers make a decision, record the reasoning, and the question can be revisited when new evidence emerges.",
    ],
  },
  {
    id: "participation",
    title: "Community participation",
    body: [
      "Participation is open to developers, councils, owners, property managers, industry organizations and researchers. A code of conduct will be published with the repository.",
    ],
  },
];

export default function GovernancePage() {
  return (
    <>
      <PageHeader eyebrow="Governance" title="How the standard is maintained">
        Lightweight during early development, with a clear path toward broader industry participation.
      </PageHeader>
      <div className="container-page grid gap-10 py-12 lg:grid-cols-[220px_1fr]">
        <aside className="hidden lg:block">
          <nav aria-label="On this page" className="sticky top-20 space-y-1 text-sm">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="block text-muted-foreground hover:text-foreground">
                {s.title}
              </a>
            ))}
          </nav>
        </aside>
        <div className="max-w-3xl space-y-10">
          <Callout title="Current stage">
            OpenCOOS was founded by ManageStrata. It has no formal institutional backing and no governing body or member
            organizations yet. During early development, drafts are prepared by a small group of maintainers, starting with
            the ManageStrata team. The aim is to broaden maintainership to independent participants as the community grows.
          </Callout>
          {sections.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-20">
              <h2 className="border-b pb-2 text-xl font-semibold">{s.title}</h2>
              {s.body.map((p) => (
                <p key={p} className="mt-3 leading-7 text-pretty">
                  {p}
                </p>
              ))}
              {s.link && (
                <Link href={s.link.href} className="mt-3 inline-block text-sm text-primary hover:underline">
                  {s.link.label} →
                </Link>
              )}
            </section>
          ))}
          <section id="path" className="scroll-mt-20">
            <h2 className="border-b pb-2 text-xl font-semibold">Path toward broader governance</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-6">
              <li>
                <strong>Early development (now):</strong> small maintainer group, open drafts, public feedback.
              </li>
              <li>
                <strong>First release:</strong> code of conduct and documented
                decision process.
              </li>
              <li>
                <strong>Broader participation:</strong> maintainers from multiple independent organizations, so that no single
                vendor controls the standard.
              </li>
              <li>
                <strong>Mature governance:</strong> if there is demand, a more formal structure, such as a steering group, with
                industry and community representation.
              </li>
            </ol>
          </section>
        </div>
      </div>
    </>
  );
}
