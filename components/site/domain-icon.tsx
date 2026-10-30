import { Building2, FileText, Landmark, ShieldCheck, Wallet, Wrench, type LucideIcon } from "lucide-react";

const icons: Record<string, LucideIcon> = {
  core: Building2,
  governance: Landmark,
  financial: Wallet,
  maintenance: Wrench,
  documents: FileText,
  compliance: ShieldCheck,
};

export function DomainIcon({ domain, className }: { domain: string; className?: string }) {
  const Icon = icons[domain] ?? Building2;
  return <Icon className={className} aria-hidden="true" />;
}
