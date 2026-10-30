export interface DocsNavGroup {
  title: string;
  items: { href: string; label: string }[];
}

export const docsNav: DocsNavGroup[] = [
  {
    title: "Introduction",
    items: [
      { href: "/docs", label: "Getting started" },
      { href: "/docs/specification", label: "Specification overview" },
    ],
  },
  {
    title: "Data model",
    items: [
      { href: "/docs/conventions", label: "Conventions and naming" },
      { href: "/docs/relationships", label: "Entity relationships" },
      { href: "/docs/json-schema", label: "JSON Schema definitions" },
      { href: "/docs/validation", label: "Validation" },
    ],
  },
  {
    title: "Implementing",
    items: [
      { href: "/docs/api-interoperability", label: "API interoperability" },
      { href: "/docs/mapping", label: "Migration and mapping" },
      { href: "/docs/implementation", label: "Implementation examples" },
      { href: "/docs/versioning", label: "Versioning and compatibility" },
      { href: "/docs/faq", label: "Technical FAQ" },
    ],
  },
];
