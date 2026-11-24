import type { Metadata } from "next";
import { Mic, MonitorPlay, Presentation, Radio, Video } from "lucide-react";
import { readDb } from "@/lib/store";
import { MEDIA_KINDS } from "@/lib/types";
import { formatDate, youtubeId } from "@/lib/utils";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { JsonLd, breadcrumb } from "@/lib/site";
import { EmptyState, PageHero, SectionHeading } from "@/components/site/ui";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { alternates: { canonical: "/medias" }, title: "Médias", description: "Interviews, podcasts, passages télévisés, conférences et analyses vidéo." };

const icons = { interview: Mic, podcast: Radio, tv: MonitorPlay, conference: Presentation, video: Video };

export default async function Medias() {
  const { media } = await readDb();
  const items = [...media].sort((a, b) => +new Date(b.date) - +new Date(a.date));

  return (
    <>
      <JsonLd data={breadcrumb([["Médias", "/medias"]])} />
      <PageHero
        eyebrow="Médias"
        title="La pensée en mouvement."
        lead="Interviews, podcasts, passages télévisés, conférences et analyses vidéo : les interventions de Hermann Hakapoka dans le débat public."
      />
      <section className="container py-16 md:py-24">
        <SectionHeading eyebrow="Formats" title="Interventions" />
        <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground">
          {MEDIA_KINDS.map((k) => {
            const Icon = icons[k.value];
            return (
              <li key={k.value} className="inline-flex items-center gap-2">
                <Icon className="h-4 w-4 text-accent" aria-hidden /> {k.label}
              </li>
            );
          })}
        </ul>

        <div className="mt-12">
          {items.length ? (
            <Stagger className="grid gap-10 md:grid-cols-2">
              {items.map((m) => {
                const yt = youtubeId(m.url);
                const Icon = icons[m.kind];
                const label = MEDIA_KINDS.find((k) => k.value === m.kind)?.label;
                return (
                  <StaggerItem key={m.id} className="flex flex-col">
                    {yt ? (
                      <div className="aspect-video overflow-hidden rounded-sm bg-ink">
                        <iframe
                          src={`https://www.youtube-nocookie.com/embed/${yt}`}
                          title={m.title}
                          loading="lazy"
                          allow="accelerometer; encrypted-media; picture-in-picture"
                          allowFullScreen
                          className="h-full w-full"
                        />
                      </div>
                    ) : (
                      <div className="flex aspect-video items-center justify-center rounded-sm bg-ink text-gold">
                        <Icon className="h-10 w-10" aria-hidden />
                      </div>
                    )}
                    <p className="mt-5 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                      <span className="font-semibold text-accent">{label}</span>
                      {m.outlet && ` · ${m.outlet}`} · {formatDate(m.date)}
                    </p>
                    <h3 className="mt-2 text-xl">
                      <a href={m.url} target="_blank" rel="noopener" className="focus-ring rounded-sm hover:text-accent">
                        {m.title}
                      </a>
                    </h3>
                    {m.summary && <p className="mt-2 text-muted-foreground">{m.summary}</p>}
                  </StaggerItem>
                );
              })}
            </Stagger>
          ) : (
            <EmptyState title="Les premières interventions arrivent" text="Interviews, conférences et analyses vidéo seront publiées ici au fil de l'actualité." />
          )}
        </div>
      </section>
    </>
  );
}
