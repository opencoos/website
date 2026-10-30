// Provinces the standard is designed to serve, and how the same concepts are named
// in each. Informative only: summaries of common usage, pending legal review.

export interface Jurisdiction {
  code: string;
  name: string;
  model: string;
  legislation: string;
  status: "draft" | "planned" | "future";
  statusLabel: string;
}

export const jurisdictions: Jurisdiction[] = [
  {
    code: "BC",
    name: "British Columbia",
    model: "Strata",
    legislation: "Strata Property Act",
    status: "draft",
    statusLabel: "Working draft",
  },
  {
    code: "ON",
    name: "Ontario",
    model: "Condominium",
    legislation: "Condominium Act, 1998",
    status: "planned",
    statusLabel: "Next priority",
  },
  {
    code: "AB",
    name: "Alberta",
    model: "Condominium",
    legislation: "Condominium Property Act",
    status: "planned",
    statusLabel: "Next priority",
  },
  {
    code: "+",
    name: "Other provinces and territories",
    model: "Strata, condominium and co-ownership",
    legislation: "Provincial and territorial legislation",
    status: "future",
    statusLabel: "Welcome",
  },
];

/** One shared concept and the term each province uses for it. */
export interface CrosswalkRow {
  concept: string;
  bc: string;
  on: string;
  ab: string;
  entity?: string;
}

export const crosswalk: CrosswalkRow[] = [
  { concept: "The community's legal entity", bc: "Strata corporation", on: "Condominium corporation", ab: "Condominium corporation", entity: "StrataCorporation" },
  { concept: "Registered plan creating the community", bc: "Strata plan", on: "Declaration and description", ab: "Condominium plan", entity: "StrataPlan" },
  { concept: "Individually owned property", bc: "Strata lot", on: "Unit", ab: "Unit", entity: "StrataLot" },
  { concept: "Shared areas", bc: "Common property", on: "Common elements", ab: "Common property", entity: "CommonProperty" },
  { concept: "Shared areas for one owner's exclusive use", bc: "Limited common property", on: "Exclusive-use common elements", ab: "Exclusive use common property", entity: "CommonProperty" },
  { concept: "Owner's share of expenses", bc: "Unit entitlement", on: "Proportion of common interest", ab: "Unit factor", entity: "StrataLot" },
  { concept: "Elected governing body", bc: "Strata council", on: "Board of directors", ab: "Board of directors", entity: "StrataCouncil" },
  { concept: "Regular owner payments", bc: "Strata fees", on: "Common expense contributions (condo fees)", ab: "Contributions (condo fees)", entity: "Levy" },
  { concept: "Long-term repair savings", bc: "Contingency reserve fund", on: "Reserve fund", ab: "Capital replacement reserve fund", entity: "Fund" },
  { concept: "Study of long-term repair needs", bc: "Depreciation report", on: "Reserve fund study", ab: "Reserve fund study", entity: "Document" },
  { concept: "Governing rules", bc: "Bylaws and rules", on: "Declaration, by-laws and rules", ab: "Bylaws", entity: "Bylaw" },
  { concept: "Resale disclosure document", bc: "Information certificate (Form B)", on: "Status certificate", ab: "Estoppel certificate" },
];
