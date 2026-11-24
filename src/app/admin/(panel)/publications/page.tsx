import Link from "next/link";
import { ExternalLink, FilePlus2, Pencil, Trash2 } from "lucide-react";
import { deletePublication } from "@/app/admin/actions";
import { isLive, readDb } from "@/lib/store";
import { cn, formatDate } from "@/lib/utils";
import { AdminHeader, StatusBadge, btn } from "@/components/admin/ui";
import { ConfirmButton } from "@/components/admin/confirm-button";
import { typeLabel } from "@/components/site/ui";

const TABS = [
  { value: "", label: "Toutes" },
  { value: "draft", label: "Brouillons" },
  { value: "published", label: "Publiées" },
  { value: "scheduled", label: "Programmées" },
];

const SAVED: Record<string, string> = {
  draft: "Brouillon enregistré.",
  published: "Publication en ligne.",
  scheduled: "Publication programmée.",
};

export default async function AdminPublications({ searchParams }: { searchParams: { status?: string; saved?: string } }) {
  const { publications } = await readDb();
  const status = searchParams.status ?? "";
  const list = publications
    .filter((p) => !status || p.status === status)
    .sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt));

  return (
    <div className="space-y-6">
      <AdminHeader title="Mes publications">
        <Link href="/admin/publications/new" className={btn.primary}>
          <FilePlus2 className="h-4 w-4" /> Nouvelle publication
        </Link>
      </AdminHeader>

      {searchParams.saved && SAVED[searchParams.saved] && (
        <p role="status" className="rounded-sm border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-accent">
          {SAVED[searchParams.saved]}
        </p>
      )}

      <nav aria-label="Filtrer" className="flex flex-wrap gap-2">
        {TABS.map((t) => (
          <Link
            key={t.value}
            href={t.value ? `/admin/publications?status=${t.value}` : "/admin/publications"}
            className={cn(
              "focus-ring inline-flex h-10 items-center rounded-sm border px-4 text-sm",
              status === t.value ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-foreground/40",
            )}
          >
            {t.label} ({t.value ? publications.filter((p) => p.status === t.value).length : publications.length})
          </Link>
        ))}
      </nav>

      <div className="overflow-hidden rounded-sm border border-border bg-card">
        {list.length === 0 ? (
          <p className="p-8 text-center text-muted-foreground">Aucune publication ici.</p>
        ) : (
          <ul className="divide-y divide-border">
            {list.map((p) => (
              <li key={p.id} className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:gap-6 md:px-6">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusBadge status={p.status} />
                    {p.demo && <span className="rounded-sm bg-muted px-2 py-0.5 text-xs text-muted-foreground">Démo</span>}
                    <span className="text-xs text-muted-foreground">
                      {typeLabel(p.type)} · {p.category}
                    </span>
                  </div>
                  <Link href={`/admin/publications/${p.id}`} className="focus-ring mt-1 block rounded-sm font-display text-lg hover:text-accent">
                    {p.title}
                  </Link>
                  <p className="text-xs text-muted-foreground">
                    {p.status === "scheduled" && p.publishAt ? `Parution le ${formatDate(p.publishAt, { dateStyle: "long", timeStyle: "short" })}` : `Modifié le ${formatDate(p.updatedAt)}`}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  {isLive(p) && (
                    <Link href={`/publications/${p.slug}`} target="_blank" className="focus-ring inline-flex h-9 items-center gap-1 rounded-sm px-2 text-sm hover:bg-muted" aria-label="Voir en ligne">
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  )}
                  <Link href={`/admin/publications/${p.id}`} className="focus-ring inline-flex h-9 items-center gap-1 rounded-sm px-2 text-sm hover:bg-muted">
                    <Pencil className="h-4 w-4" /> Modifier
                  </Link>
                  <form action={deletePublication}>
                    <input type="hidden" name="id" value={p.id} />
                    <ConfirmButton message={`Supprimer « ${p.title} » ?`} className={btn.danger}>
                      <Trash2 className="h-4 w-4" /> Supprimer
                    </ConfirmButton>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
