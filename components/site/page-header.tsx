import { cn } from "@/lib/utils";

export function PageHeader({
  eyebrow,
  title,
  children,
  className,
}: {
  eyebrow?: string;
  title: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("border-b bg-muted/30", className)}>
      <div className="container-page py-12 sm:py-16">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{title}</h1>
        {children && <div className="mt-4 max-w-2xl text-lg text-pretty text-muted-foreground">{children}</div>}
      </div>
    </div>
  );
}

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  intro?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} aria-labelledby={id ? `${id}-title` : undefined} className={cn("scroll-mt-20 py-16 sm:py-20", className)}>
      <div className="container-page">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 id={id ? `${id}-title` : undefined} className="mt-2 text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
          {title}
        </h2>
        {intro && <div className="mt-3 max-w-2xl text-pretty text-muted-foreground">{intro}</div>}
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}
