import { cacheLife } from "next/cache";
import { createHighlighter, type Highlighter } from "shiki";
import { cn } from "@/lib/utils";
import { CopyButton } from "./copy-button";

const LANGS = ["json", "ts", "tsx", "js", "bash", "http", "text"] as const;
let highlighter: Promise<Highlighter> | null = null;

function getHighlighter() {
  highlighter ??= createHighlighter({ themes: ["github-light"], langs: [...LANGS] });
  return highlighter;
}

export async function highlight(code: string, lang = "text") {
  // Highlighting is deterministic; caching also keeps Shiki's internal timers out of prerendering.
  "use cache";
  cacheLife("max");
  const h = await getHighlighter();
  const language = (LANGS as readonly string[]).includes(lang) ? lang : "text";
  return h.codeToHtml(code, { lang: language, theme: "github-light" });
}

/** Server-rendered, syntax-highlighted code with a copy button. */
export async function CodeBlock({
  code,
  lang,
  title,
  className,
}: {
  code: string;
  lang?: string;
  title?: string;
  className?: string;
}) {
  const html = await highlight(code.replace(/\n$/, ""), lang);
  return (
    <figure className={cn("group relative my-6", className)}>
      {title && <figcaption className="mb-2 font-mono text-xs text-muted-foreground">{title}</figcaption>}
      <div className="relative">
        <div dangerouslySetInnerHTML={{ __html: html }} />
        <CopyButton value={code} className="absolute top-2 right-2 opacity-90" />
      </div>
    </figure>
  );
}
