import { DocsPager, DocsSidebar } from "@/components/site/docs-sidebar";
import { getManifest } from "@/lib/spec/load";

export default function DocsLayout({ children }: LayoutProps<"/docs">) {
  const { version } = getManifest();
  return (
    <div className="container-page grid gap-10 py-10 lg:grid-cols-[220px_1fr]">
      <aside className="lg:sticky lg:top-20 lg:self-start">
        <details className="rounded-lg border p-3 lg:hidden">
          <summary className="cursor-pointer text-sm font-medium">Documentation menu</summary>
          <div className="mt-4">
            <DocsSidebar />
          </div>
        </details>
        <div className="hidden lg:block">
          <DocsSidebar />
          <p className="mt-8 font-mono text-[11px] text-muted-foreground">Spec v{version}</p>
        </div>
      </aside>
      <div className="min-w-0 max-w-3xl">
        <div className="docs-content">{children}</div>
        <DocsPager />
      </div>
    </div>
  );
}
