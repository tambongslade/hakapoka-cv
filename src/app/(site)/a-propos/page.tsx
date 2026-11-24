import type { Metadata } from "next";
import Image from "next/image";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ButtonLink, SectionHeading } from "@/components/site/ui";
import { JsonLd, abs, breadcrumb, personJsonLd } from "@/lib/site";

export const metadata: Metadata = {
  title: "À propos",
  alternates: { canonical: "/a-propos" },
  openGraph: { type: "profile", url: "/a-propos", images: [{ url: "/images/hermann-library.jpg", width: 984, height: 1092, alt: "Hermann Hakapoka" }] },
  description: "Penser l'économie au-delà des chiffres : le parcours, l'expertise et l'approche de Hermann Hakapoka.",
};

/*
 * BIOGRAPHY — TO BE VALIDATED BY THE CLIENT before launch.
 * Publicly verifiable facts used here (Sept. 2026):
 *  - Inspecteur principal des régies financières (Douanes), Cameroun — Décret n°2018/8135/PM du 18 sept. 2018 (MINFI)
 *  - MBA Stratégie & Intelligence économique, École de Guerre Économique (Paris)
 *  - Fondateur / Président, 2H International Consulting Group (LinkedIn)
 *  - ENAM Yaoundé, Division des régies financières (Douanes) — self-reported (Facebook), consistent with his grade; TO CONFIRM
 * Everything else is deliberately phrased in general terms.
 */

const expertise = [
  { title: "Intelligence économique", text: "Veille, analyse, protection de l'information et influence au service de la décision." },
  { title: "Finances publiques & régulation", text: "Une connaissance de l'intérieur des administrations financières et des mécanismes de l'État." },
  { title: "Commerce international", text: "Flux, régulations et enjeux des échanges pour les économies d'Afrique centrale." },
  { title: "Analyse géoéconomique", text: "Lecture des rapports de force entre États, entreprises et puissances étrangères." },
  { title: "Prospective stratégique", text: "Scénarios, signaux faibles et aide à la décision à moyen et long terme." },
  { title: "Influence & guerre de l'information", text: "Stratégies d'influence, gestion des perceptions et défense face aux attaques informationnelles." },
  { title: "Conseil stratégique", text: "Recommandations stratégiques pour les organisations confrontées à des choix à forts enjeux informationnels." },
];

const chapters = [
  {
    label: "Parcours",
    title: "L'État vu de l'intérieur",
    text: "Formé à l'École nationale d'administration et de magistrature (ENAM) de Yaoundé, au sein de la division des régies financières, son parcours s'est construit au cœur de l'administration financière publique. Une expérience qui apprend une chose essentielle : les économies ne se pilotent pas seulement avec des budgets, mais avec de l'information fiable, des circuits de décision clairs et une compréhension fine des flux qui traversent un territoire.",
  },
  {
    label: "Formation",
    title: "L'école de la guerre économique",
    text: "Il se forme à l'École de Guerre Économique de Paris, fondée en 1997 par Christian Harbulot et le général Jean Pichot-Duclos, au sein du MBA Stratégie et Intelligence économique — le programme de référence de la discipline en France. Il y acquiert une méthode : lire les affrontements économiques comme des rapports de force, construire des dispositifs de veille, élaborer des scénarios prospectifs et concevoir des stratégies d'influence. Une devise la résume : surveiller, analyser, protéger, influencer.",
  },
  {
    label: "Engagement",
    title: "Du diagnostic au conseil",
    text: "À travers 2H International Consulting Group, il prolonge cette réflexion dans l'accompagnement des organisations : comprendre leur environnement, anticiper les risques et construire des positions durables.",
  },
  {
    label: "Réflexions",
    title: "Une pensée pour l'Afrique qui vient",
    text: "Ses travaux interrogent la souveraineté économique, l'intégration régionale en Afrique centrale et la place du continent dans la recomposition du monde. Une conviction les relie : l'Afrique ne manque pas de ressources, elle a besoin de stratégie.",
  },
];

const method = [
  { title: "Cadrer la question", text: "Identifier la décision à éclairer, les acteurs concernés et ce qui est réellement en jeu." },
  { title: "Collecter", text: "Mobiliser les sources ouvertes, la veille et les réseaux pour réunir une information fiable et recoupée." },
  { title: "Analyser", text: "Lire les rapports de force, les dépendances et les signaux faibles ; construire des scénarios." },
  { title: "Recommander", text: "Formuler des options claires, hiérarchisées et assorties de leurs risques, au service de la décision." },
];

// Visible FAQ + FAQPage schema: short, factual answers are what search and AI answer engines quote.
const faq = [
  {
    q: "Qui est Hermann Hakapoka ?",
    a: "Hermann Hakapoka est un spécialiste camerounais de l'intelligence économique et de la stratégie. Issu de l'administration financière publique, où il est Inspecteur principal des régies financières, il est diplômé du MBA Stratégie et Intelligence économique de l'École de Guerre Économique de Paris et préside 2H International Consulting Group.",
  },
  {
    q: "Quelle est sa formation ?",
    a: "Hermann Hakapoka a été formé à l'École nationale d'administration et de magistrature (ENAM) de Yaoundé, dans la division des régies financières (Douanes), qui forme les cadres supérieurs de l'administration camerounaise. Il est également diplômé du MBA Stratégie et Intelligence économique de l'École de Guerre Économique (EGE, Paris), école spécialisée dans l'intelligence économique, la guerre de l'information et les stratégies d'influence.",
  },
  {
    q: "Quels sont ses domaines d'expertise ?",
    a: "Intelligence économique (veille, analyse, protection de l'information, influence), finances publiques, commerce international, analyse géoéconomique de l'Afrique centrale et de la CEMAC, et prospective stratégique.",
  },
  {
    q: "Sur quels sujets écrit-il ?",
    a: "Souveraineté économique africaine, intelligence économique comme levier de puissance pour les États, géopolitique des ressources naturelles, intégration régionale en Afrique centrale et futurs économiques du continent.",
  },
  {
    q: "Comment solliciter Hermann Hakapoka ?",
    a: "Pour une consultation stratégique, une conférence, une interview ou un partenariat institutionnel, utilisez le formulaire de la page Contact en précisant l'objet de votre demande.",
  },
];

export default function About() {
  return (
    <>
      <JsonLd
        data={[
          { "@type": "ProfilePage", "@id": abs("/a-propos"), url: abs("/a-propos"), name: "À propos de Hermann Hakapoka", inLanguage: "fr-FR", mainEntity: personJsonLd },
          { "@type": "FAQPage", mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
          breadcrumb([["À propos", "/a-propos"]]),
        ]}
      />
      {/* HERO — the headline is part of the artwork, so the h1 stays for SEO/screen readers only. */}
      <section className="relative isolate overflow-hidden bg-ink text-ink-foreground">
        <h1 className="sr-only">Penser l&apos;économie au-delà des chiffres.</h1>
        <div className="relative aspect-[3/2] max-h-[90svh] w-full">
          <Image
            src="/images/hermann-a-propos.png"
            alt="Hermann Hakapoka dans son bureau — Penser l'économie au-delà des chiffres."
            fill
            priority
            sizes="100vw"
            quality={90}
            className="object-cover object-[center_40%]"
          />
          {/* Keeps the fixed header legible and melts the image into the band below */}
          <div aria-hidden className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink/80 to-transparent" />
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink to-transparent" />
        </div>
        <div className="container relative pb-16 pt-4 md:pb-20">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">À propos</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg text-ink-muted">
              Un parcours entre institutions publiques, environnements économiques et analyse stratégique — au service d&apos;une même question : comment l&apos;information transforme le pouvoir économique.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container grid gap-12 py-16 md:grid-cols-[0.9fr_1.1fr] md:gap-20 md:py-24">
        <Reveal className="relative self-start md:sticky md:top-28">
          <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-card">
            <Image src="/images/hermann-hero.png" alt="Hermann Hakapoka" fill sizes="(min-width: 768px) 460px, 100vw" className="object-cover object-[76%_center]" />
          </div>
          <dl className="mt-6 grid grid-cols-2 gap-6 border-t border-border pt-6 text-sm">
            <div>
              <dt className="text-muted-foreground">Domaine</dt>
              <dd className="mt-1 font-medium">Intelligence économique & stratégie</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Formation</dt>
              <dd className="mt-1 font-medium">ENAM Yaoundé · École de Guerre Économique, Paris</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Ancrage</dt>
              <dd className="mt-1 font-medium">Yaoundé, Cameroun</dd>
            </div>
        
          </dl>
        </Reveal>

        <div className="space-y-16">
          {chapters.map((c, i) => (
            <Reveal key={c.label} delay={i === 0 ? 0.1 : 0}>
              <p className="eyebrow">{c.label}</p>
              <h2 className="mt-3 text-2xl md:text-3xl">{c.title}</h2>
              <p className="mt-5 text-lg text-muted-foreground">{c.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-ink py-16 text-ink-foreground md:py-24">
        <div className="container">
          <Reveal className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Méthode</p>
            <h2 className="mt-4 text-3xl md:text-4xl">De l&apos;information à la décision</h2>
            <p className="mt-6 text-lg text-ink-muted">Chaque analyse suit une même discipline, héritée des méthodes de l&apos;intelligence économique.</p>
          </Reveal>
          <Stagger className="mt-12 grid gap-px overflow-hidden rounded-sm bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {method.map((m, i) => (
              <StaggerItem key={m.title} className="bg-ink p-8">
                <span className="font-display text-4xl text-gold">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-xl">{m.title}</h3>
                <p className="mt-3 text-ink-muted">{m.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/50 py-16 md:py-24">
        <div className="container">
          <SectionHeading eyebrow="Expertise" title="Domaines d'intervention" />
          <Stagger className="mt-12 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {expertise.map((e) => (
              <StaggerItem key={e.title} className="bg-background p-8">
                <h3 className="text-xl">{e.title}</h3>
                <p className="mt-3 text-muted-foreground">{e.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="container grid gap-12 py-16 md:grid-cols-[0.8fr_1.2fr] md:gap-20 md:py-24">
        <SectionHeading eyebrow="Questions fréquentes" title="En bref" />
        <Reveal delay={0.1}>
          <dl className="divide-y divide-border border-y border-border">
            {faq.map((f) => (
              <div key={f.q} className="py-6">
                <dt className="font-display text-xl">{f.q}</dt>
                <dd className="mt-3 text-muted-foreground">{f.a}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      <section className="border-t border-border py-16 md:py-24">
        <Reveal className="container mx-auto max-w-3xl text-center">
          <p className="font-display text-2xl italic leading-snug md:text-4xl md:leading-tight">
            Son parcours fonde sa crédibilité. Ses idées fondent son autorité. Ses publications construisent son influence.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <ButtonLink href="/publications">Lire ses analyses</ButtonLink>
            <ButtonLink href="/contact" variant="outline">
              Prendre contact
            </ButtonLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
