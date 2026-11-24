import { Trash2 } from "lucide-react";
import { addEvent, deleteEvent } from "@/app/admin/actions";
import { readDb } from "@/lib/store";
import { cn, formatDate } from "@/lib/utils";
import { AdminHeader, Field, Panel, btn, inputCls } from "@/components/admin/ui";
import { ConfirmButton } from "@/components/admin/confirm-button";

const fileCls = "mt-2 block w-full text-sm file:mr-3 file:h-9 file:rounded-sm file:border-0 file:bg-secondary file:px-3 file:text-sm";

export default async function AdminEvents() {
  const { events } = await readDb();
  const items = [...events].sort((a, b) => +new Date(b.date) - +new Date(a.date));

  return (
    <div className="space-y-6">
      <AdminHeader title="Conférences & interventions" lead="Chaque événement enrichit l'archive publique de vos interventions." />
      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <Panel title={`${items.length} événement(s)`}>
          {items.length ? (
            <ul className="divide-y divide-border">
              {items.map((e) => (
                <li key={e.id} className="flex items-center justify-between gap-4 py-3">
                  <div className="min-w-0">
                    <p className="truncate font-medium">{e.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(e.date)} · {e.location} · {e.photos.length} photo(s)
                    </p>
                  </div>
                  <form action={deleteEvent}>
                    <input type="hidden" name="id" value={e.id} />
                    <ConfirmButton message="Supprimer cet événement ?" className={btn.danger}>
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Supprimer</span>
                    </ConfirmButton>
                  </form>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">Aucun événement pour l&apos;instant.</p>
          )}
        </Panel>

        <Panel title="Ajouter un événement">
          <form action={addEvent} className="space-y-4">
            <Field label="Nom de l'événement *">
              <input name="name" required className={cn(inputCls, "h-11")} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Date *">
                <input type="date" name="date" required className={cn(inputCls, "h-11")} />
              </Field>
              <Field label="Lieu *">
                <input name="location" required className={cn(inputCls, "h-11")} />
              </Field>
            </div>
            <Field label="Thème de l'intervention *">
              <input name="topic" required className={cn(inputCls, "h-11")} />
            </Field>
            <Field label="Résumé">
              <textarea name="summary" rows={3} className={cn(inputCls, "py-2")} />
            </Field>
            <Field label="Lien vidéo">
              <input type="url" name="video" className={cn(inputCls, "h-11")} placeholder="https://" />
            </Field>
            <Field label="Photos">
              <input type="file" name="photos" accept="image/*" multiple className={fileCls} />
            </Field>
            <Field label="Présentation (PDF)">
              <input type="file" name="pdfFile" accept="application/pdf" className={fileCls} />
            </Field>
            <button className={cn(btn.primary, "w-full")}>Ajouter</button>
          </form>
        </Panel>
      </div>
    </div>
  );
}
