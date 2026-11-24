import { Mail, MailOpen, Reply, Trash2 } from "lucide-react";
import { deleteMessage, toggleMessageRead } from "@/app/admin/actions";
import { readDb } from "@/lib/store";
import { cn, formatDate } from "@/lib/utils";
import { AdminHeader, btn } from "@/components/admin/ui";
import { ConfirmButton } from "@/components/admin/confirm-button";

export default async function AdminMessages() {
  const { messages } = await readDb();

  return (
    <div className="space-y-6">
      <AdminHeader title="Messages" lead="Demandes reçues via le formulaire de contact." />
      {messages.length === 0 ? (
        <p className="rounded-sm border border-border bg-card p-8 text-center text-muted-foreground">Aucun message pour l&apos;instant.</p>
      ) : (
        <ul className="space-y-4">
          {messages.map((m) => (
            <li key={m.id} className={cn("rounded-sm border bg-card p-6", m.read ? "border-border" : "border-accent/40")}>
              <div className="flex flex-col justify-between gap-2 md:flex-row md:items-start">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">{m.subject}</p>
                  <p className="mt-1 font-display text-xl">
                    {m.name}
                    {m.organisation && <span className="text-muted-foreground"> — {m.organisation}</span>}
                  </p>
                  <a href={`mailto:${m.email}`} className="text-sm text-muted-foreground underline underline-offset-4">
                    {m.email}
                  </a>
                </div>
                <p className="text-xs text-muted-foreground">{formatDate(m.createdAt, { dateStyle: "long", timeStyle: "short" })}</p>
              </div>
              <p className="mt-4 whitespace-pre-line">{m.body}</p>
              <div className="mt-4 flex flex-wrap gap-1 border-t border-border pt-3">
                <a href={`mailto:${m.email}?subject=${encodeURIComponent("Re : " + m.subject)}`} className="focus-ring inline-flex h-9 items-center gap-1 rounded-sm px-2 text-sm hover:bg-muted">
                  <Reply className="h-4 w-4" /> Répondre
                </a>
                <form action={toggleMessageRead}>
                  <input type="hidden" name="id" value={m.id} />
                  <button className="focus-ring inline-flex h-9 items-center gap-1 rounded-sm px-2 text-sm hover:bg-muted">
                    {m.read ? <Mail className="h-4 w-4" /> : <MailOpen className="h-4 w-4" />}
                    {m.read ? "Marquer non lu" : "Marquer lu"}
                  </button>
                </form>
                <form action={deleteMessage}>
                  <input type="hidden" name="id" value={m.id} />
                  <ConfirmButton message="Supprimer ce message ?" className={btn.danger}>
                    <Trash2 className="h-4 w-4" /> Supprimer
                  </ConfirmButton>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
