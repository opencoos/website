import Link from "next/link";
import type { ReactNode } from "react";
import { JsonLd } from "./json-ld";

const TOKEN = /\[([^\]]+)\]\(([^)]+)\)|`([^`]+)`/g;

/** Renders the small subset of markdown used in FAQ answers: links and inline code. */
function renderInline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(TOKEN)) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1]) {
      const [label, href] = [m[1], m[2]];
      out.push(
        href.startsWith("/") ? (
          <Link key={m.index} href={href} className="text-primary underline underline-offset-4 hover:no-underline">
            {label}
          </Link>
        ) : (
          <a key={m.index} href={href} rel="noopener" className="text-primary underline underline-offset-4 hover:no-underline">
            {label}
          </a>
        ),
      );
    } else {
      out.push(
        <code key={m.index} className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em]">
          {m[3]}
        </code>,
      );
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export const plainText = (text: string) => text.replace(TOKEN, (_, label, _href, code) => label ?? code);

const slug = (q: string) =>
  plainText(q)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

/** FAQ as headed question/answer pairs, plus matching FAQPage structured data. */
export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((f) => ({
            "@type": "Question",
            name: plainText(f.q),
            acceptedAnswer: { "@type": "Answer", text: plainText(f.a) },
          })),
        }}
      />
      {items.map((f) => (
        <section key={f.q}>
          <h3 id={slug(f.q)} className="mt-8 scroll-mt-20 font-semibold">
            {renderInline(f.q)}
          </h3>
          <p className="mt-2 leading-7 text-pretty">{renderInline(f.a)}</p>
        </section>
      ))}
    </>
  );
}
