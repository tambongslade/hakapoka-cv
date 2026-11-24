import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd, breadcrumb } from "@/lib/site";
import { PageHero } from "@/components/site/ui";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = { alternates: { canonical: "/contact" },
  title: "Contact",
  description: "Consultations stratégiques, conférences, interviews et partenariats : échanger avec Hermann Hakapoka.",
};

const reasons = [
  ["Consultations stratégiques", "Analyse d'environnement, risques et aide à la décision."],
  ["Conférences & interventions", "Keynotes, panels, séminaires et formations."],
  ["Interviews & médias", "Presse écrite, radio, télévision, podcasts."],
  ["Collaborations professionnelles", "Missions et projets conjoints."],
  ["Recherche & partenariats institutionnels", "Travaux académiques, think tanks, organisations régionales."],
];

export default function Contact() {
  return (
    <>
      <JsonLd data={breadcrumb([["Contact", "/contact"]])} />
      <PageHero eyebrow="Contact" title="Échanger avec Hermann Hakapoka" lead="Pour toute sollicitation professionnelle, merci d'utiliser le formulaire ci-dessous en précisant l'objet de votre demande." />
      <section className="container grid gap-16 py-16 md:py-24 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <p className="eyebrow">Sollicitations</p>
          <ul className="mt-6 divide-y divide-border border-y border-border">
            {reasons.map(([t, d]) => (
              <li key={t} className="py-5">
                <p className="font-display text-lg">{t}</p>
                <p className="mt-1 text-sm text-muted-foreground">{d}</p>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </section>
    </>
  );
}
