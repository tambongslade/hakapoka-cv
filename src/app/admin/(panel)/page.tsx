import Link from "next/link";
import { FilePlus2 } from "lucide-react";
import { isLive, readDb } from "@/lib/store";
import { formatDate } from "@/lib/utils";
import { AdminHeader, Panel, StatusBadge, btn } from "@/components/admin/ui";

export default async function Dashboard() {
  const db = await readDb();
  const pubs = db.publications;
  const stats = [
    { label: "Publiées", value: pubs.filter((p) => isLive(p)).length, href: "/admin/publications?status=published" },
    { label: "Brouillons", value: pubs.filter((p) => p.status === "draft").length, href: "/admin/publications?status=draft" },
    { label: "Programmées", value: pubs.filter((p) => p.status === "scheduled" && !isLive(p)).length, href: "/admin/publications?status=scheduled" },
    { label: "Messages non lus", value: db.messages.filter((m) => !m.read).length, href: "/admin/messages" },
  ];
  const recent = [...pubs].sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt)).slice(0, 5);

  return (
    <div className="space-y-8">
      <AdminHeader title="Bonjour Hermann" lead="Votre plateforme d'analyse en un coup d'œil.">
        <Link href="/admin/publications/new" className={btn.primary}>
          <FilePlus2 className="h-4 w-4" /> Nouvelle publication
        </Link>
      </AdminHeader>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="focus-ring rounded-sm border border-border bg-card p-6 transition hover:border-accent/50">
            <p className="text-sm text-muted-foreground">{s.label}</p>
            <p className="mt-2 font-display text-4xl">{s.value}</p>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <Panel title="Dernières modifications">
          <ul className="divide-y divide-border">
            {recent.map((p) => (
              <li key={p.id} className="flex items-center justify-between gap-4 py-3">
                <Link href={`/admin/publications/${p.id}`} className="focus-ring min-w-0 rounded-sm hover:text-accent">
                  <p className="truncate font-medium">{p.title}</p>
                  <p className="text-xs text-muted-foreground">Modifié le {formatDate(p.updatedAt)}</p>
                </Link>
                <StatusBadge status={p.status} />
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Derniers messages">
          {db.messages.length ? (
            <ul className="divide-y divide-border">
              {db.messages.slice(0, 5).map((m) => (
                <li key={m.id} className="py-3">
                  <p className="font-medium">
                    {!m.read && <span className="mr-2 inline-block h-2 w-2 rounded-full bg-accent" aria-label="non lu" />}
                    {m.name}
                  </p>
                  <p className="truncate text-sm text-muted-foreground">
                    {m.subject} — {m.body}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">Aucun message pour l&apos;instant.</p>
          )}
          <Link href="/admin/messages" className="mt-4 inline-block text-sm font-medium text-accent">
            Tous les messages
          </Link>
        </Panel>
      </div>
    </div>
  );
}
