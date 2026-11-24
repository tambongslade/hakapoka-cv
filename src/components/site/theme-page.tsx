import { getLivePublications, liveDate } from "@/lib/store";
import type { Theme } from "@/lib/content";
import { JsonLd, PERSON_ID, abs, breadcrumb } from "@/lib/site";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ButtonLink, EmptyState, PageHero, PublicationCard, SectionHeading } from "./ui";

const roman = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

export async function ThemePage({ theme }: { theme: Theme }) {
  const related = (await getLivePublications()).filter((p) => p.category === theme.category).slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          { "@type": "CollectionPage", "@id": abs(`/${theme.slug}`), url: abs(`/${theme.slug}`), name: theme.eyebrow, description: theme.lead, inLanguage: "fr-FR", author: { "@id": PERSON_ID }, about: theme.topics.map((t) => ({ "@type": "Thing", name: t.title })) },
          breadcrumb([[theme.eyebrow, `/${theme.slug}`]]),
        ]}
      />
      <PageHero eyebrow={theme.eyebrow} title={theme.title} lead={theme.lead} />

      <section className="container grid gap-12 py-16 md:grid-cols-[1fr_1.2fr] md:gap-24 md:py-24">
        <Reveal>
          <p className="font-display text-2xl italic leading-snug text-foreground md:text-3xl">« {theme.question} »</p>
        </Reveal>
        <Reveal delay={0.1} className="space-y-6 text-lg text-muted-foreground">
          {theme.intro.map((t) => (
            <p key={t}>{t}</p>
          ))}
        </Reveal>
      </section>

      {theme.reperes && (
        <section className="container pb-16 md:pb-24">
          <div className="border-t border-border pt-12">
            <Reveal className="max-w-2xl">
              <p className="eyebrow">{theme.reperes.title}</p>
              <p className="mt-4 text-lg text-muted-foreground">{theme.reperes.lead}</p>
            </Reveal>
            <Stagger className={`mt-10 grid gap-10 sm:grid-cols-2 ${theme.reperes.items.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
              {theme.reperes.items.map((r) => (
                <StaggerItem key={r.value} className="border-l border-accent/40 pl-6">
                  <p className="font-display text-4xl text-foreground md:text-5xl">{r.value}</p>
                  <p className="mt-3 text-muted-foreground">{r.label}</p>
                </StaggerItem>
              ))}
            </Stagger>
            <p className="mt-10 text-xs text-muted-foreground">{theme.reperes.source}</p>
          </div>
        </section>
      )}

      {theme.doctrine && (
        <section className="bg-ink py-16 text-ink-foreground md:py-24">
          <div className="container">
            <Reveal className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <h2 className="text-3xl md:text-4xl">{theme.doctrine.title}</h2>
              <div className="flex flex-col gap-2 md:items-end">
                <p className="text-sm italic text-ink-muted">{theme.doctrine.source}</p>
                <a href="/lexique" className="focus-ring rounded-sm text-sm text-gold underline underline-offset-4">
                  Consulter le lexique de la discipline
                </a>
              </div>
            </Reveal>
            <Stagger className="mt-12 grid gap-px overflow-hidden rounded-sm bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
              {theme.doctrine.verbs.map((v, i) => (
                <StaggerItem key={v.verb} className="bg-ink p-8">
                  <span className="font-display text-lg text-gold">{roman[i]}</span>
                  <h3 className="mt-4 text-2xl">{v.verb}</h3>
                  <p className="mt-3 text-ink-muted">{v.text}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      <section className="border-y border-border bg-secondary/50 py-16 md:py-24">
        <div className="container">
          <SectionHeading eyebrow="Champs d'analyse" title="Les questions que nous explorons" />
          <Stagger className="mt-12 grid border-t border-border sm:grid-cols-2">
            {theme.topics.map((t, i) => (
              <StaggerItem key={t.title} className="flex gap-6 border-b border-border py-8 sm:odd:pr-10 sm:even:border-l sm:even:pl-10">
                <span className="w-8 shrink-0 font-display text-lg text-accent">{roman[i]}</span>
                <div>
                  <h3 className="text-xl">{t.title}</h3>
                  <p className="mt-2 text-muted-foreground">{t.text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="container py-16 md:py-24">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="Publications liées" title={`Analyses — ${theme.eyebrow}`} />
          <ButtonLink href="/publications" variant="outline">
            Toutes les publications
          </ButtonLink>
        </div>
        <div className="mt-12">
          {related.length ? (
            <Stagger className="grid gap-10 md:grid-cols-3">
              {related.map((p) => (
                <StaggerItem key={p.id}>
                  <PublicationCard p={p} date={liveDate(p)} />
                </StaggerItem>
              ))}
            </Stagger>
          ) : (
            <EmptyState title="Analyses à venir" text="Les premières publications de cette rubrique seront bientôt en ligne." />
          )}
        </div>
      </section>
    </>
  );
}
