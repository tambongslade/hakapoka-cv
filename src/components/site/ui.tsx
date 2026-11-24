import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import { typeLabel, type Publication } from "@/lib/types";
import { Reveal } from "@/components/motion/reveal";

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline" | "gold" | "ghost-dark";
  className?: string;
}) {
  const styles = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-foreground/25 hover:border-foreground",
    gold: "bg-gold text-ink hover:bg-gold/90",
    "ghost-dark": "border border-white/25 text-ink-foreground hover:border-gold hover:text-gold",
  }[variant];
  return (
    <Link
      href={href}
      className={cn(
        "focus-ring group inline-flex h-12 items-center gap-2 rounded-sm px-6 text-sm font-medium transition-all duration-200 active:scale-[0.98]",
        styles,
        className,
      )}
    >
      {children}
      <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </Link>
  );
}

/** Dark page header for inner pages. */
export function PageHero({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-ink text-ink-foreground">
      <Meridians className="absolute inset-0 h-full w-full text-white/[0.06]" />
      <div className="container relative pb-16 pt-32 md:pb-24 md:pt-44">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">{eyebrow}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-6 max-w-4xl text-4xl md:text-6xl">{title}</h1>
        </Reveal>
        {lead && (
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-2xl text-lg text-ink-muted">{lead}</p>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}

/** Signature backdrop: projected meridians and parallels, like a strategic map with no country drawn. */
export function Meridians({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" className={className} fill="none" stroke="currentColor">
      {Array.from({ length: 9 }).map((_, i) => (
        <ellipse key={`m${i}`} cx="900" cy="350" rx={40 + i * 55} ry="420" strokeWidth="1" />
      ))}
      {Array.from({ length: 11 }).map((_, i) => (
        <path key={`p${i}`} d={`M 0 ${40 + i * 62} Q 600 ${10 + i * 62} 1200 ${40 + i * 62}`} strokeWidth="1" />
      ))}
    </svg>
  );
}

export function SectionHeading({ index, eyebrow, title, lead, className }: { index?: string; eyebrow: string; title: string; lead?: string; className?: string }) {
  return (
    <Reveal className={cn("max-w-3xl", className)}>
      <p className="eyebrow flex items-center gap-3">
        {index && <span className="font-display text-base normal-case tracking-normal">{index}</span>}
        {index && <span className="h-px w-8 bg-accent" />}
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl md:text-4xl">{title}</h2>
      {lead && <p className="mt-6 text-lg text-muted-foreground">{lead}</p>}
    </Reveal>
  );
}

export { typeLabel };

export function PublicationCard({ p, date, featured = false }: { p: Publication; date: string; featured?: boolean }) {
  return (
    <Link href={`/publications/${p.slug}`} className="focus-ring group flex h-full flex-col rounded-sm">
      {p.cover && (
        <div className={cn("overflow-hidden rounded-sm bg-muted", featured ? "aspect-[16/10]" : "aspect-[3/2]")}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={p.cover}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover grayscale-[35%] transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col pt-5">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">
          <span className="font-semibold text-accent">{typeLabel(p.type)}</span>
          <span aria-hidden>·</span>
          <time dateTime={date}>{formatDate(date)}</time>
        </p>
        <h3 className={cn("mt-3 transition-colors group-hover:text-accent", featured ? "text-2xl md:text-3xl" : "text-xl")}>{p.title}</h3>
        <p className="mt-3 line-clamp-3 text-base text-muted-foreground">{p.summary}</p>
      </div>
    </Link>
  );
}

export function EmptyState({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-sm border border-dashed border-border px-6 py-16 text-center">
      <p className="font-display text-xl">{title}</p>
      <p className="mx-auto mt-3 max-w-md text-muted-foreground">{text}</p>
    </div>
  );
}
