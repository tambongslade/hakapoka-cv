import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { marked } from "marked";
import { ArrowLeft, ArrowUpRight, FileDown } from "lucide-react";
import { getLivePublications, getPublication, liveDate } from "@/lib/store";
import { formatDate, readingTime } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd, PERSON_ID, abs, breadcrumb, personJsonLd } from "@/lib/site";
import { Meridians, PublicationCard, typeLabel } from "@/components/site/ui";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const p = await getPublication(params.slug);
  if (!p) return {};
  const url = `/publications/${p.slug}`;
  const title = p.seoTitle || p.title;
  const description = p.seoDescription || p.summary;
  return {
    title,
    description,
    keywords: p.tags,
    authors: [{ name: "Hermann Hakapoka", url: "/a-propos" }],
    alternates: { canonical: url },
    // Demo texts must never reach search engines.
    robots: p.demo ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "article",
      url,
      title,
      description,
      publishedTime: liveDate(p),
      modifiedTime: p.updatedAt,
      authors: ["Hermann Hakapoka"],
      section: p.category,
      tags: p.tags,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function Article({ params }: { params: { slug: string } }) {
  const p = await getPublication(params.slug);
  if (!p) notFound();
  const date = liveDate(p);
  const html = await marked.parse(p.content);
  const more = (await getLivePublications()).filter((x) => x.id !== p.id && x.category === p.category).slice(0, 3);

  const url = abs(`/publications/${p.slug}`);
  return (
    <article>
      <JsonLd
        data={[
          {
            "@type": "Article",
            "@id": `${url}#article`,
            mainEntityOfPage: url,
            url,
            headline: p.title,
            description: p.summary,
            ...(p.cover ? { image: [p.cover.startsWith("http") ? p.cover : abs(p.cover)] } : {}),
            datePublished: date,
            dateModified: p.updatedAt,
            inLanguage: "fr-FR",
            articleSection: p.category,
            genre: typeLabel(p.type),
            keywords: p.tags.join(", "),
            wordCount: p.content.split(/\s+/).filter(Boolean).length,
            author: { "@id": PERSON_ID, "@type": "Person", name: "Hermann Hakapoka", url: abs("/a-propos") },
            publisher: { "@id": PERSON_ID },
            isAccessibleForFree: true,
            ...(p.sourceUrl ? { isBasedOn: p.sourceUrl } : {}),
          },
          personJsonLd,
          breadcrumb([["Publications", "/publications"], [p.title, `/publications/${p.slug}`]]),
        ]}
      />
      <header className="relative overflow-hidden bg-ink text-ink-foreground">
        <Meridians className="absolute inset-0 h-full w-full text-white/[0.05]" />
        <div className="container relative pb-16 pt-32 md:pb-20 md:pt-40">
          <Link href="/publications" className="focus-ring inline-flex items-center gap-2 rounded-sm text-sm text-ink-muted hover:text-ink-foreground">
            <ArrowLeft className="h-4 w-4" /> Publications
          </Link>
          <Reveal>
            <p className="mt-10 flex flex-wrap gap-x-3 text-xs uppercase tracking-[0.16em] text-ink-muted">
              <span className="font-semibold text-gold">{typeLabel(p.type)}</span>
              <span aria-hidden>·</span>
              <span>{p.category}</span>
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl md:text-5xl">{p.title}</h1>
            <p className="mt-6 max-w-2xl font-display text-xl italic text-ink-foreground/80">{p.summary}</p>
            <p className="mt-8 text-sm text-ink-muted">
              Par Hermann Hakapoka · <time dateTime={date}>{formatDate(date)}</time> · {readingTime(p.content)} min de lecture
            </p>
          </Reveal>
        </div>
      </header>

      {p.cover && (
        <div className="container -mt-px">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.cover} alt="" className="aspect-[21/9] w-full rounded-b-sm object-cover grayscale-[35%]" />
        </div>
      )}

      <div className="container grid gap-12 py-16 md:py-20 lg:grid-cols-[1fr_220px]">
        <div>
          <div className="prose-h" dangerouslySetInnerHTML={{ __html: html }} />
          {p.sourceUrl && (
            <a
              href={p.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring group mt-12 flex max-w-[68ch] items-center justify-between gap-6 rounded-md border border-border bg-card p-6 transition-colors hover:border-accent"
            >
              <span>
                <span className="eyebrow block">Article original</span>
                <span className="mt-2 block text-lg font-semibold">Lire l&apos;article complet sur {p.sourceName || "le site d'origine"}</span>
              </span>
              <ArrowUpRight className="h-6 w-6 shrink-0 text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          )}
        </div>
        <aside className="space-y-8 text-sm lg:border-l lg:border-border lg:pl-8">
          {p.tags.length > 0 && (
            <div>
              <p className="eyebrow">Mots-clés</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <li key={t} className="rounded-sm bg-secondary px-3 py-1 text-secondary-foreground">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {p.pdf && (
            <a href={p.pdf} target="_blank" rel="noopener" className="focus-ring inline-flex items-center gap-2 rounded-sm font-medium text-accent">
              <FileDown className="h-4 w-4" /> Télécharger le PDF
            </a>
          )}
          <div>
            <p className="eyebrow">Échanger</p>
            <p className="mt-3 text-muted-foreground">Une question, une réaction, une demande d&apos;intervention sur ce sujet ?</p>
            <Link href="/contact" className="focus-ring mt-3 inline-block rounded-sm font-medium text-accent underline underline-offset-4">
              Contacter l&apos;auteur
            </Link>
          </div>
        </aside>
      </div>

      {more.length > 0 && (
        <section className="border-t border-border bg-secondary/50 py-16 md:py-24">
          <div className="container">
            <h2 className="text-2xl md:text-3xl">À lire également</h2>
            <div className="mt-10 grid gap-10 md:grid-cols-3">
              {more.map((m) => (
                <PublicationCard key={m.id} p={m} date={liveDate(m)} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
