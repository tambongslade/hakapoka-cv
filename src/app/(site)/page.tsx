import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Check,
  Compass,
  FileLock2,
  Handshake,
  Library,
  Mail,
  MapPin,
  Phone,
  Radar,
  ShieldCheck,
  Ship,
  Shield,
} from "lucide-react";
import { CRISIS, ECOSYSTEM, ENGAGEMENT, FOUNDER, HERO, VISION } from "@/lib/home-content";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { JsonLd, personJsonLd, websiteJsonLd } from "@/lib/site";

// Wide portrait: face on the right, dark negative space on the left for the text.
const HERO_IMAGE = "/images/hermann-hero.png";
const FOUNDER_IMAGE = "/images/hermann-library.jpg";

const icon = (d: string) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="h-5 w-5">
    <path d={d} />
  </svg>
);

// Profiles from personJsonLd.sameAs. Still to be confirmed with the client.
const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/hermann-hakapoka-151534388/",
    icon: icon("M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z"),
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/hakapoka",
    icon: icon("M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z"),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/hermann.hakapoka/",
    icon: icon("M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.62 23.1 24 18.1 24 12.07Z"),
  },
  {
    label: "Contact",
    href: "/contact",
    icon: <Mail className="h-5 w-5" aria-hidden />,
  },
];

const COMPANY_ICONS = [Building2, Ship, Library, Shield];
const PILLAR_ICONS = [Radar, Compass, Handshake, ShieldCheck];
const RULE_ICONS = [FileLock2, BadgeCheck];


export default function Home() {
  // Section numbers follow render order.
  let n = 0;
  const next = () => `${String(++n).padStart(2, "0")}.`;

  return (
    <>
      <JsonLd data={[websiteJsonLd, personJsonLd]} />

      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-[#141518] text-white">
        {/* Portrait bleeding in from the right, melted into the dark background */}
        <div aria-hidden className="absolute inset-0 -z-10">
          <Image src={HERO_IMAGE} alt="" fill priority sizes="100vw" quality={90} className="object-cover object-[72%_center] md:object-right" />
          <div className="absolute inset-0 bg-[#141518]/70 md:bg-transparent md:bg-gradient-to-r md:from-[#141518]/95 md:via-[#141518]/50 md:via-50% md:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141518] via-transparent via-30% to-[#141518]/50" />
        </div>

        <div className="container flex min-h-[min(100svh,62rem)] flex-col justify-center pb-20 pt-32">
          <Reveal className="flex flex-wrap gap-2">
            {HERO.pills.map((p) => (
              <span key={p} className="rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-gold">
                {p}
              </span>
            ))}
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-8 font-sans text-[clamp(3.25rem,9vw,8rem)] font-extrabold leading-[0.92] tracking-[-0.04em]">
              Hermann
              <br />
              Hakapoka
            </h1>
          </Reveal>
          <Reveal delay={0.2} className="max-w-xl">
            <p className="mt-8 font-sans text-2xl font-bold leading-snug text-white md:text-3xl">{HERO.tagline}</p>
            <p className="mt-5 text-base leading-relaxed text-white/75 md:text-lg">{HERO.lead}</p>
          </Reveal>
          <Reveal delay={0.3} className="mt-10 flex flex-wrap gap-4">
            <Link
              href={HERO.primaryCta.href}
              className="focus-ring inline-flex h-12 items-center gap-2 rounded-md bg-gold px-6 text-sm font-bold uppercase tracking-[0.06em] text-[#141518] transition-colors hover:bg-gold/90"
            >
              {HERO.primaryCta.label} <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={HERO.secondaryCta.href}
              className="focus-ring inline-flex h-12 items-center rounded-md border border-white/20 px-6 text-sm font-bold uppercase tracking-[0.06em] text-white transition-colors hover:border-gold hover:text-gold"
            >
              {HERO.secondaryCta.label}
            </a>
          </Reveal>
          <Reveal delay={0.4} className="mt-10 flex gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={s.label}
                className="focus-ring grid h-12 w-12 place-items-center rounded-full bg-white/[0.07] text-white transition-colors duration-200 hover:bg-gold hover:text-[#141518]"
              >
                {s.icon}
              </a>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ÉCOSYSTÈME */}
      <section id="ecosysteme" className="scroll-mt-20 bg-[#141518] py-24 text-white md:py-32">
        <div className="container">
          <DarkHeading index={next()} eyebrow={ECOSYSTEM.eyebrow} title={ECOSYSTEM.title} ghost="Écosystème" lead={ECOSYSTEM.lead} />
          <Stagger className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {ECOSYSTEM.companies.map((c, i) => {
              const Icon = COMPANY_ICONS[i];
              return (
                <StaggerItem key={c.name} className="group relative isolate flex h-full min-h-[28rem] flex-col overflow-hidden rounded-md border border-white/10 bg-[#24262c] p-8 transition-colors duration-200 hover:border-gold/50">
                  {/* Stock photo behind the card, darkened so the text stays readable */}
                  <Image
                    src={c.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 300px, (min-width: 768px) 50vw, 100vw"
                    className="-z-20 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-[#141518]/75 via-[#141518]/85 to-[#141518]/95" />
                  <div className="flex items-center justify-between">
                    <Icon className="h-8 w-8 text-gold" strokeWidth={1.75} aria-hidden />
                    <span className="font-sans text-sm font-bold text-white/40">{c.index}</span>
                  </div>
                  <p className="mt-8 text-xs font-semibold uppercase tracking-[0.12em] text-gold">{c.sector}</p>
                  <h3 className="mt-2 font-sans text-xl font-bold leading-snug text-white">{c.name}</h3>
                  <p className="mt-1 text-sm text-white/60">{c.focus}</p>
                  <ul className="mt-6 space-y-3 border-t border-white/10 pt-6">
                    {c.services.map((s) => (
                      <li key={s} className="flex gap-3 text-[15px] leading-snug text-white/85">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
                        {s}
                      </li>
                    ))}
                  </ul>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* MOT DU FONDATEUR */}
      <section className="bg-[#1a1b1f] py-24 text-white md:py-32">
        <div className="container grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative aspect-[984/1092] overflow-hidden rounded-md">
              <Image src={FOUNDER_IMAGE} alt="Hermann Hakapoka, fondateur du cabinet C.2.H" fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
            </div>
            <div aria-hidden className="absolute -bottom-4 -left-4 -z-10 h-full w-full rounded-md border border-gold/30" />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-sm font-bold text-gold">
              {next()} <span className="ml-2 uppercase tracking-[0.12em]">{FOUNDER.eyebrow}</span>
            </p>
            <blockquote className="mt-6 font-display text-3xl italic leading-tight text-white md:text-4xl">« {FOUNDER.quote} »</blockquote>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-white/75 md:text-lg">
              {FOUNDER.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <div className="mt-10 border-l-2 border-gold pl-5">
              <p className="font-sans text-lg font-bold">{FOUNDER.signature}</p>
              <p className="text-sm text-white/60">{FOUNDER.role}</p>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-white/50">
                <MapPin className="h-3.5 w-3.5" aria-hidden /> {FOUNDER.place}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* VISION C.2.H */}
      <section id="vision" className="scroll-mt-20 bg-[#141518] py-24 text-white md:py-32">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-20">
            <DarkHeading index={next()} eyebrow={VISION.eyebrow} title={VISION.title} ghost="Vision" lead={VISION.lead} />
            <Reveal delay={0.1} className="rounded-md border border-gold/40 bg-gradient-to-br from-gold/10 to-transparent p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gold">C.2.H</p>
              <h3 className="mt-2 font-sans text-xl font-bold">{VISION.offer.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-white/70">{VISION.offer.text}</p>
              <ul className="mt-6 space-y-3">
                {VISION.offer.points.map((p) => (
                  <li key={p} className="flex gap-3 text-[15px] leading-snug text-white/90">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Stagger className="mt-16 grid gap-px overflow-hidden rounded-md border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {VISION.pillars.map((p, i) => {
              const Icon = PILLAR_ICONS[i];
              return (
                <StaggerItem key={p.title} className="flex flex-col bg-[#1a1b1f] p-8">
                  <div className="flex items-center justify-between">
                    <Icon className="h-7 w-7 text-gold" strokeWidth={1.75} aria-hidden />
                    <span className="font-sans text-4xl font-extrabold text-white/[0.08]">{i + 1}</span>
                  </div>
                  <h3 className="mt-8 font-sans text-lg font-bold leading-snug">{p.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-white/70">{p.text}</p>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* SOLUTIONS ASYMÉTRIQUES */}
      <section id="solutions" className="scroll-mt-20 bg-[#1a1b1f] py-24 text-white md:py-32">
        <div className="container">
          <DarkHeading index={next()} eyebrow={CRISIS.eyebrow} title={CRISIS.title} ghost="Crise" lead={CRISIS.lead} />
          <Stagger className="relative mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
            {/* Timeline rail linking the three phases */}
            <div aria-hidden className="absolute left-0 right-0 top-[11px] hidden h-px bg-gradient-to-r from-gold/60 via-gold/30 to-gold/60 md:block" />
            {CRISIS.phases.map((p) => (
              <StaggerItem key={p.title} className="relative">
                <span aria-hidden className="relative block h-[23px] w-[23px] rounded-full border-2 border-gold bg-[#1a1b1f]">
                  <span className="absolute inset-[5px] rounded-full bg-gold" />
                </span>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.12em] text-gold">{p.label}</p>
                <h3 className="mt-2 font-sans text-xl font-bold">{p.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/70">{p.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ÉCHANGE CONFIDENTIEL */}
      <section id="echange" className="scroll-mt-20 bg-[#141518] py-24 text-white md:py-32">
        <div className="container grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <DarkHeading index={next()} eyebrow={ENGAGEMENT.eyebrow} title={ENGAGEMENT.title} ghost="Contact" lead={ENGAGEMENT.lead} />
            <Stagger className="mt-12 grid gap-6 sm:grid-cols-2">
              {ENGAGEMENT.rules.map((r, i) => {
                const Icon = RULE_ICONS[i];
                return (
                  <StaggerItem key={r.title} className="rounded-md border border-white/10 bg-[#1d1e22] p-7">
                    <Icon className="h-7 w-7 text-gold" strokeWidth={1.75} aria-hidden />
                    <h3 className="mt-6 font-sans text-lg font-bold leading-snug">
                      {i + 1}. {r.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-white/70">{r.text}</p>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>

          <Reveal delay={0.1} className="relative isolate self-start overflow-hidden rounded-md border border-gold/40 bg-[#1d1e22] p-8 md:p-10">
            <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-br from-gold/10 to-transparent" />
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gold">Coordonnées du cabinet</p>
            <ul className="mt-8 space-y-6">
              <li className="flex gap-4">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden />
                <div>
                  <p className="text-xs uppercase tracking-[0.08em] text-white/50">Adresse</p>
                  <p className="mt-1 text-[15px] leading-snug">{ENGAGEMENT.contact.address}</p>
                </div>
              </li>
              <li className="flex gap-4">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden />
                <div>
                  <p className="text-xs uppercase tracking-[0.08em] text-white/50">Téléphone direct</p>
                  <a href={`tel:${ENGAGEMENT.contact.phone.replace(/\s/g, "")}`} className="focus-ring mt-1 block text-[15px] hover:text-gold">
                    {ENGAGEMENT.contact.phone}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden />
                <div>
                  <p className="text-xs uppercase tracking-[0.08em] text-white/50">Email</p>
                  <a href={`mailto:${ENGAGEMENT.contact.email}`} className="focus-ring mt-1 block text-[15px] hover:text-gold">
                    {ENGAGEMENT.contact.email}
                  </a>
                </div>
              </li>
            </ul>
            <Link
              href={ENGAGEMENT.cta.href}
              className="focus-ring mt-10 inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-gold px-6 text-sm font-bold uppercase tracking-[0.06em] text-[#141518] transition-colors hover:bg-gold/90"
            >
              {ENGAGEMENT.cta.label} <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/** Persona-style section title: number, bold heading, faint outlined word behind it, optional lead and button. */
function DarkHeading({
  index,
  eyebrow,
  title,
  ghost,
  lead,
  href,
  cta,
}: {
  index: string;
  eyebrow?: string;
  title: string;
  ghost: string;
  lead?: string;
  href?: string;
  cta?: string;
}) {
  return (
    <Reveal className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
      <div className="max-w-3xl">
        <p className="text-sm font-bold text-gold">
          {index}
          {eyebrow && <span className="ml-2 uppercase tracking-[0.12em]">{eyebrow}</span>}
        </p>
        <div className="relative mt-3">
          <span aria-hidden className="pointer-events-none absolute -top-6 left-0 max-w-full select-none overflow-hidden whitespace-nowrap font-sans text-5xl sm:text-6xl font-extrabold tracking-[-0.04em] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.07)] md:-top-9 md:text-8xl">
            {ghost}
          </span>
          <h2 className="relative font-sans text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] md:text-5xl">{title}</h2>
        </div>
        {lead && <p className="mt-6 text-base leading-relaxed text-white/70 md:text-lg">{lead}</p>}
      </div>
      {href && cta && (
        <Link href={href} className="focus-ring inline-flex h-12 shrink-0 items-center self-start rounded-md bg-white/[0.06] px-6 text-xs font-bold uppercase tracking-[0.08em] transition-colors hover:bg-gold hover:text-[#141518] sm:self-auto">
          {cta}
        </Link>
      )}
    </Reveal>
  );
}
