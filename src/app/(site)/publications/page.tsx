import type { Metadata } from "next";
import Link from "next/link";
import { getLivePublications, liveDate } from "@/lib/store";
import { CATEGORIES, PUBLICATION_TYPES } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { JsonLd, PERSON_ID, abs, breadcrumb } from "@/lib/site";
import { EmptyState, PageHero, PublicationCard } from "@/components/site/ui";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  alternates: { canonical: "/publications" },
  title: "Publications",
  description: "Analyses, notes stratégiques, perspectives et rapports sur l'intelligence économique, l'économie africaine et la géopolitique.",
};

export default async function Publications({ searchParams }: { searchParams: { type?: string; categorie?: string } }) {
  const all = await getLivePublications();
  const { type, categorie } = searchParams;
  const list = all.filter((p) => (!type || p.type === type) && (!categorie || p.category === categorie));
  const usedTypes = PUBLICATION_TYPES.filter((t) => all.some((p) => p.type === t.value));

  const href = (next: { type?: string; categorie?: string }) => {
    const q = new URLSearchParams();
    const merged = { type, categorie, ...next };
    if (merged.type) q.set("type", merged.type);
    if (merged.categorie) q.set("categorie", merged.categorie);
    const s = q.toString();
    return `/publications${s ? `?${s}` : ""}`;
  };

  const chip = (active: boolean) =>
    cn(
      "focus-ring inline-flex h-10 items-center rounded-sm border px-4 text-sm transition-colors duration-200",
      active ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-foreground/40",
    );

  return (
    <>
      <JsonLd
        data={[
          {
            "@type": "CollectionPage",
            "@id": abs("/publications"),
            url: abs("/publications"),
            name: "Publications — Hermann Hakapoka",
            inLanguage: "fr-FR",
            author: { "@id": PERSON_ID },
            mainEntity: {
              "@type": "ItemList",
              itemListElement: all.filter((p) => !p.demo).map((p, i) => ({ "@type": "ListItem", position: i + 1, url: abs(`/publications/${p.slug}`), name: p.title })),
            },
          },
          breadcrumb([["Publications", "/publications"]]),
        ]}
      />
      <PageHero
        eyebrow="Analyses & Perspectives"
        title="Publications"
        lead="Analyses de fond, notes stratégiques, tribunes et rapports. Un espace de réflexion continue sur les dynamiques économiques et géopolitiques."
      />

      <section className="container py-12 md:py-16">
        <div className="space-y-4 border-b border-border pb-8">
          <nav aria-label="Filtrer par format" className="flex flex-wrap gap-2">
            <Link href={href({ type: undefined })} className={chip(!type)}>
              Tous les formats
            </Link>
            {usedTypes.map((t) => (
              <Link key={t.value} href={href({ type: t.value })} className={chip(type === t.value)}>
                {t.label}
              </Link>
            ))}
          </nav>
          <nav aria-label="Filtrer par thème" className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link href={href({ categorie: undefined })} className={cn("focus-ring rounded-sm py-1", !categorie ? "text-accent underline underline-offset-4" : "text-muted-foreground hover:text-foreground")}>
              Tous les thèmes
            </Link>
            {CATEGORIES.map((c) => (
              <Link key={c} href={href({ categorie: c })} className={cn("focus-ring rounded-sm py-1", categorie === c ? "text-accent underline underline-offset-4" : "text-muted-foreground hover:text-foreground")}>
                {c}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-12">
          {list.length ? (
            <Stagger key={`${type}-${categorie}`} className="grid gap-x-10 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
              {list.map((p) => (
                <StaggerItem key={p.id}>
                  <PublicationCard p={p} date={liveDate(p)} />
                </StaggerItem>
              ))}
            </Stagger>
          ) : (
            <EmptyState title="Aucune publication pour ce filtre" text="Essayez un autre format ou un autre thème." />
          )}
        </div>
      </section>
    </>
  );
}
