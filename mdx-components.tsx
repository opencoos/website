import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { isValidElement, type ReactElement, type ReactNode } from "react";
import { Callout } from "@/components/site/callout";
import { CodeBlock } from "@/components/site/code-block";
import { StatusBadge } from "@/components/site/status-badge";

function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return textOf(node.props.children);
  return "";
}

const slugify = (node: ReactNode) =>
  textOf(node)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

const components: MDXComponents = {
  h1: ({ children }) => <h1 className="text-3xl font-semibold tracking-tight text-balance">{children}</h1>,
  h2: ({ children }) => (
    <h2 id={slugify(children)} className="mt-12 scroll-mt-20 border-b pb-2 text-xl font-semibold tracking-tight">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 id={slugify(children)} className="mt-8 scroll-mt-20 font-semibold">
      {children}
    </h3>
  ),
  p: ({ children }) => <p className="mt-4 leading-7 text-pretty">{children}</p>,
  ul: ({ children }) => <ul className="mt-4 list-disc space-y-1.5 pl-6 marker:text-muted-foreground">{children}</ul>,
  ol: ({ children }) => <ol className="mt-4 list-decimal space-y-1.5 pl-6 marker:text-muted-foreground">{children}</ol>,
  li: ({ children }) => <li className="leading-7">{children}</li>,
  a: ({ href = "", children }) =>
    href.startsWith("/") || href.startsWith("#") ? (
      <Link href={href} className="text-primary underline underline-offset-4 hover:no-underline">
        {children}
      </Link>
    ) : (
      <a href={href} rel="noopener" className="text-primary underline underline-offset-4 hover:no-underline">
        {children}
      </a>
    ),
  blockquote: ({ children }) => <blockquote className="mt-4 border-l-2 pl-4 text-muted-foreground">{children}</blockquote>,
  hr: () => <hr className="my-10" />,
  code: ({ children }) => <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em]">{children}</code>,
  pre: ({ children }) => {
    const code = children as ReactElement<{ className?: string; children?: ReactNode }>;
    const lang = code.props.className?.replace("language-", "");
    return <CodeBlock code={textOf(code.props.children)} lang={lang} />;
  },
  table: ({ children }) => (
    <div className="mt-6 overflow-x-auto rounded-lg border">
      <table className="w-full text-left text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-muted/50 text-xs text-muted-foreground">{children}</thead>,
  th: ({ children }) => <th className="px-3 py-2 font-medium">{children}</th>,
  td: ({ children }) => <td className="border-t px-3 py-2 align-top">{children}</td>,
  Callout,
  StatusBadge,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
