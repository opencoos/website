// Known implementations of COOS. No stable release exists, so none can claim
// conformance yet; list only what each implementer has actually stated.
export interface Implementation {
  name: string;
  url: string;
  type: string;
  status: string;
  /** Relationship to the initiative, disclosed for transparency. */
  relationship?: string;
}

export const implementations: Implementation[] = [
  {
    name: "ManageStrata.ca",
    url: "https://managestrata.ca",
    type: "Strata management platform",
    status: "Planned: intends to adopt the standard as the foundation of its data model",
    relationship: "Founder of OpenCOOS",
  },
  {
    name: "SearchStrata.com",
    url: "https://searchstrata.com",
    type: "Strata document analysis for buyers, owners and councils",
    status: "Planned implementation",
  },
];
