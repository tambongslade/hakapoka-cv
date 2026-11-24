import { cn } from "@/lib/utils";

export const inputCls =
  "mt-2 block w-full rounded-sm border border-input bg-card px-3 text-base transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/30";

export function AdminHeader({ title, lead, children }: { title: string; lead?: string; children?: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-between gap-4 border-b border-border pb-6 md:flex-row md:items-end">
      <div>
        <h1 className="text-3xl">{title}</h1>
        {lead && <p className="mt-2 text-muted-foreground">{lead}</p>}
      </div>
      {children}
    </div>
  );
}

export function Panel({ title, children, className }: { title?: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={cn("rounded-sm border border-border bg-card p-6", className)}>
      {title && <h2 className="mb-4 font-sans text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">{title}</h2>}
      {children}
    </section>
  );
}

export function Field({ label, hint, children, className }: { label: string; hint?: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={cn("block text-sm font-medium", className)}>
      {label}
      {children}
      {hint && <span className="mt-1 block text-xs font-normal text-muted-foreground">{hint}</span>}
    </label>
  );
}

const statusStyles = {
  published: "bg-accent/10 text-accent",
  scheduled: "bg-primary/10 text-primary",
  draft: "bg-muted text-muted-foreground",
};
const statusLabels = { published: "Publié", scheduled: "Programmé", draft: "Brouillon" };

export function StatusBadge({ status }: { status: keyof typeof statusStyles }) {
  return <span className={cn("inline-flex rounded-sm px-2 py-0.5 text-xs font-semibold", statusStyles[status])}>{statusLabels[status]}</span>;
}

export const btn = {
  primary:
    "focus-ring inline-flex h-11 items-center justify-center gap-2 rounded-sm bg-primary px-5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
  outline:
    "focus-ring inline-flex h-11 items-center justify-center gap-2 rounded-sm border border-border bg-card px-5 text-sm font-medium transition hover:border-foreground/40 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
  danger: "focus-ring inline-flex h-9 items-center gap-1 rounded-sm px-2 text-sm text-destructive hover:bg-destructive/10",
};
