// Technical FAQ. Rendered on /docs/faq and published as FAQPage structured data.
// Answers support [links](/path) and `code` only.
export const techFaq = [
  {
    q: "Do I have to change my database?",
    a: "No. Most implementers map at their system boundary. See [Migration and mapping](/docs/mapping).",
  },
  {
    q: "Why JSON Schema?",
    a: "It is widely supported, language-neutral and can validate data directly. Types for most programming languages can be generated from it.",
  },
  {
    q: "Why are amounts strings?",
    a: "Decimal strings such as `\"1250.00\"` avoid floating-point rounding errors. Parse them with a decimal type in your language.",
  },
  {
    q: "Why is `additionalProperties` false?",
    a: "Closed objects catch typos and undocumented fields. Put product-specific data in `extensions`.",
  },
  {
    q: "Why are unit and strata lot separate?",
    a: "The unit number people use in an address often differs from the strata lot number on the plan, and some strata lots have no unit address. Keeping them separate avoids mixing the legal and civic identifiers.",
  },
  {
    q: "How do I represent something the standard doesn't cover?",
    a: "Use `extensions` with your reverse-domain namespace, and open an issue describing the gap so it can be considered for the standard.",
  },
  {
    q: "Is there an official SDK, validator or API?",
    a: "Not yet. You can use any JSON Schema 2020-12 validator today. See [Validation](/docs/validation).",
  },
  {
    q: "Does the standard work for condos outside British Columbia?",
    a: "That is the intent. The first working draft is modelled on BC strata, so some entity names use BC terms. Ontario and Alberta condominium terminology is mapped in the [jurisdictions crosswalk](/standard/jurisdictions), and adding those jurisdictions is the next priority. How entities should be named across provinces is an open proposal.",
  },
  {
    q: "What licence applies to the specification?",
    a: "The specification and the website are licensed under the [Apache License, Version 2.0](https://github.com/opencoos/spec/blob/main/LICENSE). You can use, modify and embed the schemas in open-source or commercial products, and the licence includes a patent grant from contributors. It does not grant rights to the names \"COOS\" or \"OpenCOOS\".",
  },
];
