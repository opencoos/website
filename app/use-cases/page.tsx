import type { Metadata } from "next";
import Link from "next/link";
import { Callout } from "@/components/site/callout";
import { PageHeader } from "@/components/site/page-header";

export const metadata: Metadata = {
  title: "Use cases",
  description:
    "How a shared strata data standard is intended to help: moving data between platforms, connecting maintenance systems, normalising financial reporting and more.",
  alternates: { canonical: "/use-cases" },
};

const useCases = [
  {
    id: "platform-migration",
    title: "Moving data between property management platforms",
    problem: "Changing platforms today often means spreadsheets, manual re-entry and lost history.",
    benefit:
      "If both platforms can export and import standard records, core data — the corporation, strata lots, owners, council, meetings and documents — could move with far less manual work.",
    entities: ["StrataCorporation", "StrataLot", "OwnershipInterest", "Document"],
  },
  {
    id: "maintenance",
    title: "Connecting maintenance and contractor systems",
    problem: "Maintenance requests and work orders are re-keyed between management software and contractor tools.",
    benefit: "A shared shape for requests, work orders and assets is intended to let these systems exchange work without one-off integrations.",
    entities: ["MaintenanceRequest", "WorkOrder", "CommonAsset"],
  },
  {
    id: "financial-reporting",
    title: "Normalising financial reporting",
    problem: "Budgets and fund balances are structured differently by every accounting tool.",
    benefit:
      "Consistent definitions of the operating fund, contingency reserve fund, budgets and levies are intended to make reports comparable across years and providers.",
    entities: ["Fund", "Budget", "Levy", "FinancialTransaction"],
  },
  {
    id: "analysis",
    title: "Making strata records easier to analyse",
    problem: "Records spread across PDFs and incompatible exports are hard to search or analyse.",
    benefit: "Structured, consistently categorised records could make it easier to answer questions such as when a component was last replaced.",
    entities: ["Document", "CommonAsset", "Resolution"],
  },
  {
    id: "portfolio-reporting",
    title: "Consistent reporting across many strata and condo corporations",
    problem: "Managers of many corporations reconcile different formats for each one.",
    benefit: "A common model is intended to support consistent reporting across a portfolio, regardless of which tools each corporation uses.",
    entities: ["StrataCorporation", "InsurancePolicy", "GeneralMeeting"],
  },
  {
    id: "ai-assistants",
    title: "AI assistants that understand strata entities",
    problem: "AI tools must guess what fields mean when every system names them differently.",
    benefit:
      "Clearly defined entities and vocabularies give AI applications a reliable vocabulary for strata concepts, which may improve accuracy and make answers easier to verify.",
    entities: ["Bylaw", "Resolution", "Budget"],
  },
  {
    id: "integration-effort",
    title: "Less duplicate integration work for developers",
    problem: "Each new integration means another bespoke mapping between two proprietary models.",
    benefit: "Mapping once to a shared standard is intended to replace many pairwise mappings.",
    entities: ["Organization", "Person", "StrataLot"],
  },
];

export default function UseCasesPage() {
  return (
    <>
      <PageHeader eyebrow="Use cases" title="What a shared standard could make easier">
        These are intended benefits of a common data model for strata information. They depend on adoption and are not
        guaranteed outcomes.
      </PageHeader>
      <div className="container-page space-y-6 py-12">
        <Callout>
          Have a workflow we should consider? Real examples from councils, managers and vendors directly shape what the
          standard covers. <Link href="/contribute">Share a use case</Link>.
        </Callout>
        <div className="grid gap-6 md:grid-cols-2">
          {useCases.map((u) => (
            <article key={u.id} id={u.id} className="scroll-mt-20 rounded-xl border p-6">
              <h2 className="text-lg font-semibold">{u.title}</h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="font-medium">Today</dt>
                  <dd className="mt-0.5 text-muted-foreground">{u.problem}</dd>
                </div>
                <div>
                  <dt className="font-medium">Intended benefit</dt>
                  <dd className="mt-0.5 text-muted-foreground">{u.benefit}</dd>
                </div>
                <div>
                  <dt className="font-medium">Relevant entities</dt>
                  <dd className="mt-1.5 flex flex-wrap gap-1.5">
                    {u.entities.map((e) => (
                      <Link key={e} href={`/data-model/${e}`} className="rounded-md border px-2 py-0.5 font-mono text-xs hover:border-primary/50">
                        {e}
                      </Link>
                    ))}
                  </dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
