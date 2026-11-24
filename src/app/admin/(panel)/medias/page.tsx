import { Trash2 } from "lucide-react";
import { addMedia, deleteMedia } from "@/app/admin/actions";
import { readDb } from "@/lib/store";
import { MEDIA_KINDS } from "@/lib/types";
import { cn, formatDate } from "@/lib/utils";
import { AdminHeader, Field, Panel, btn, inputCls } from "@/components/admin/ui";
import { ConfirmButton } from "@/components/admin/confirm-button";

export default async function AdminMedias() {
  const { media } = await readDb();
  const items = [...media].sort((a, b) => +new Date(b.date) - +new Date(a.date));

  return (
    <div className="space-y-6">
      <AdminHeader title="Médias" lead="Interviews, podcasts, passages TV, conférences filmées et analyses vidéo. Les liens YouTube s'affichent directement en lecteur." />
      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <Panel title={`${items.length} élément(s)`}>
          {items.length ? (
            <ul className="divide-y divide-border">
              {items.map((m) => (
                <li key={m.id} className="flex items-center justify-between gap-4 py-3">
                  <div className="min-w-0">
                    <p className="truncate font-medium">{m.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {MEDIA_KINDS.find((k) => k.value === m.kind)?.label} {m.outlet && `· ${m.outlet}`} · {formatDate(m.date)}
                    </p>
                  </div>
                  <form action={deleteMedia}>
                    <input type="hidden" name="id" value={m.id} />
                    <ConfirmButton message="Supprimer ce média ?" className={btn.danger}>
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Supprimer</span>
                    </ConfirmButton>
                  </form>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">Aucun média pour l&apos;instant.</p>
          )}
        </Panel>

        <Panel title="Ajouter un média">
          <form action={addMedia} className="space-y-4">
            <Field label="Titre *">
              <input name="title" required className={cn(inputCls, "h-11")} />
            </Field>
            <Field label="Type">
              <select name="kind" className={cn(inputCls, "h-11")}>
                {MEDIA_KINDS.map((k) => (
                  <option key={k.value} value={k.value}>
                    {k.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Média / organisateur">
              <input name="outlet" className={cn(inputCls, "h-11")} placeholder="ex. CRTV, RFI, Forum…" />
            </Field>
            <Field label="Date">
              <input type="date" name="date" required className={cn(inputCls, "h-11")} />
            </Field>
            <Field label="Lien *" hint="YouTube, podcast, article…">
              <input type="url" name="url" required className={cn(inputCls, "h-11")} placeholder="https://" />
            </Field>
            <Field label="Résumé">
              <textarea name="summary" rows={3} className={cn(inputCls, "py-2")} />
            </Field>
            <button className={cn(btn.primary, "w-full")}>Ajouter</button>
          </form>
        </Panel>
      </div>
    </div>
  );
}
