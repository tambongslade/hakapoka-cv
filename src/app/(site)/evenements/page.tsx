import type { Metadata } from "next";
import { CalendarDays, FileDown, MapPin, PlayCircle } from "lucide-react";
import { readDb } from "@/lib/store";
import { formatDate } from "@/lib/utils";
import { JsonLd, PERSON_ID, abs, breadcrumb } from "@/lib/site";
import { EmptyState, PageHero } from "@/components/site/ui";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { alternates: { canonical: "/evenements" }, title: "Conférences & interventions", description: "Archive des conférences, panels et interventions de Hermann Hakapoka." };

export default async function Evenements() {
  const { events } = await readDb();
  const now = new Date();
  const sorted = [...events].sort((a, b) => +new Date(b.date) - +new Date(a.date));
  const upcoming = sorted.filter((e) => new Date(e.date) >= now).reverse();
  const past = sorted.filter((e) => new Date(e.date) < now);

  const List = ({ items }: { items: typeof events }) => (
    <ol className="border-t border-border">
      {items.map((e) => (
          <li key={e.id} className="grid gap-6 border-b border-border py-10 md:grid-cols-[180px_1fr_1fr]">
            <div className="text-sm">
              <p className="inline-flex items-center gap-2 font-medium">
                <CalendarDays className="h-4 w-4 text-accent" aria-hidden />
                {formatDate(e.date)}
              </p>
              <p className="mt-2 inline-flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" aria-hidden />
                {e.location}
              </p>
            </div>
            <div>
              <h3 className="text-2xl">{e.name}</h3>
              <p className="mt-2 font-display text-lg italic text-muted-foreground">{e.topic}</p>
              {e.summary && <p className="mt-4 text-muted-foreground">{e.summary}</p>}
              <div className="mt-4 flex flex-wrap gap-6 text-sm font-medium text-accent">
                {e.video && (
                  <a href={e.video} target="_blank" rel="noopener" className="focus-ring inline-flex items-center gap-2 rounded-sm">
                    <PlayCircle className="h-4 w-4" /> Voir la vidéo
                  </a>
                )}
                {e.pdf && (
                  <a href={e.pdf} target="_blank" rel="noopener" className="focus-ring inline-flex items-center gap-2 rounded-sm">
                    <FileDown className="h-4 w-4" /> Présentation (PDF)
                  </a>
                )}
              </div>
            </div>
            {e.photos.length > 0 && (
              <div className="grid grid-cols-2 gap-2">
                {e.photos.slice(0, 4).map((src) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={src} src={src} alt={`${e.name} — photo`} loading="lazy" className="aspect-[4/3] w-full rounded-sm object-cover" />
                ))}
              </div>
            )}
          </li>
      ))}
    </ol>
  );

  return (
    <>
      <JsonLd
        data={[
          breadcrumb([["Événements", "/evenements"]]),
          ...events.map((e) => ({
            "@type": "Event",
            name: e.name,
            startDate: e.date,
            description: e.summary || e.topic,
            eventStatus: "https://schema.org/EventScheduled",
            location: { "@type": "Place", name: e.location, address: e.location },
            performer: { "@id": PERSON_ID },
            ...(e.photos[0] ? { image: e.photos.map((src) => abs(src)) } : {}),
          })),
        ]}
      />
      <PageHero
        eyebrow="Événements"
        title="Conférences & interventions"
        lead="Forums, panels, séminaires et conférences : une archive des interventions publiques et des échanges qui nourrissent la réflexion."
      />
      <section className="container space-y-16 py-16 md:py-24">
        {upcoming.length > 0 && (
          <div>
            <h2 className="eyebrow">À venir</h2>
            <div className="mt-6">
              <List items={upcoming} />
            </div>
          </div>
        )}
        <div>
          <h2 className="eyebrow">Archive</h2>
          <div className="mt-6">
            {past.length ? <List items={past} /> : <EmptyState title="Archive en construction" text="Les conférences et interventions passées seront documentées ici : thème, lieu, photos, vidéo et supports." />}
          </div>
        </div>
      </section>
    </>
  );
}
