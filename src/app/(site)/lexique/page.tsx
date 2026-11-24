import type { Metadata } from "next";
import Link from "next/link";
import { LEXIQUE } from "@/lib/lexique";
import { JsonLd, PERSON_ID, abs, breadcrumb } from "@/lib/site";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink, PageHero } from "@/components/site/ui";

export const metadata: Metadata = {
  title: "Lexique de l'intelligence économique",
  description:
    "Définitions claires des notions clés de l'intelligence économique et de la stratégie : veille, signal faible, OSINT, influence, guerre de l'information, prospective, souveraineté économique…",
  alternates: { canonical: "/lexique" },
};

const sorted = [...LEXIQUE].sort((a, b) => a.term.localeCompare(b.term, "fr"));
const byslug = Object.fromEntries(LEXIQUE.map((t) => [t.slug, t]));
const letters = Array.from(new Set(sorted.map((t) => t.term[0].toUpperCase())));

export default function Lexique() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@type": "DefinedTermSet",
            "@id": abs("/lexique"),
            name: "Lexique de l'intelligence économique",
            inLanguage: "fr-FR",
            author: { "@id": PERSON_ID },
            hasDefinedTerm: sorted.map((t) => ({ "@type": "DefinedTerm", "@id": abs(`/lexique#${t.slug}`), name: t.term, description: t.definition })),
          },
          breadcrumb([["Lexique", "/lexique"]]),
        ]}
      />
      <PageHero
        eyebrow="Lexique"
        title="Les mots de l'intelligence économique."
        lead="Une discipline se reconnaît à son vocabulaire. Ces définitions posent les notions essentielles utilisées dans les analyses publiées sur ce site."
      />

      <section className="container grid gap-12 py-16 md:py-24 lg:grid-cols-[180px_1fr]">
        <nav aria-label="Index alphabétique" className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow">Index</p>
          <ul className="mt-4 flex flex-wrap gap-2 lg:flex-col lg:gap-1">
            {sorted.map((t) => (
              <li key={t.slug}>
                <a href={`#${t.slug}`} className="focus-ring block rounded-sm py-1 text-sm text-muted-foreground hover:text-accent">
                  {t.term.replace(/ \(.*\)$/, "")}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          {letters.map((letter) => (
            <div key={letter} className="mb-12">
              <p className="border-b border-border pb-3 font-display text-3xl text-accent">{letter}</p>
              <dl className="divide-y divide-border">
                {sorted
                  .filter((t) => t.term[0].toUpperCase() === letter)
                  .map((t) => (
                    <Reveal key={t.slug} id={t.slug} className="scroll-mt-28 py-8">
                        <dt className="text-2xl">{t.term}</dt>
                        <dd className="mt-3 max-w-[68ch] text-lg text-muted-foreground">{t.definition}</dd>
                        {t.related && (
                          <dd className="mt-4 flex flex-wrap items-center gap-2 text-sm">
                            <span className="text-muted-foreground">Voir aussi :</span>
                            {t.related
                              .filter((r) => byslug[r])
                              .map((r) => (
                                <Link key={r} href={`#${r}`} className="focus-ring rounded-sm bg-secondary px-3 py-1 hover:text-accent">
                                  {byslug[r].term.replace(/ \(.*\)$/, "")}
                                </Link>
                              ))}
                          </dd>
                        )}
                    </Reveal>
                  ))}
              </dl>
            </div>
          ))}
          <div className="mt-8 flex flex-wrap gap-4 border-t border-border pt-10">
            <ButtonLink href="/intelligence-economique">Découvrir la discipline</ButtonLink>
            <ButtonLink href="/publications" variant="outline">
              Lire les analyses
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
