"use client";

import { useFormState, useFormStatus } from "react-dom";
import { CheckCircle2 } from "lucide-react";
import { sendMessage, type ContactState } from "./actions";

const SUBJECTS = [
  "Consultation stratégique",
  "Conférence / intervention",
  "Interview / média",
  "Collaboration professionnelle",
  "Partenariat institutionnel ou de recherche",
  "Autre",
];

const field =
  "mt-2 block w-full rounded-sm border border-input bg-card px-4 text-base transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/30";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="focus-ring inline-flex h-12 items-center rounded-sm bg-primary px-8 text-sm font-medium text-primary-foreground transition-all duration-200 hover:bg-primary/90 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
    >
      {pending ? "Envoi en cours…" : "Envoyer le message"}
    </button>
  );
}

export function ContactForm() {
  const [state, action] = useFormState<ContactState, FormData>(sendMessage, { ok: false });
  const f = state.fields ?? {};

  if (state.ok) {
    return (
      <div role="status" className="rounded-sm border border-border bg-card p-10">
        <CheckCircle2 className="h-8 w-8 text-accent" aria-hidden />
        <p className="mt-4 font-display text-2xl">Message bien reçu.</p>
        <p className="mt-2 text-muted-foreground">Merci pour votre prise de contact. Une réponse vous sera adressée dans les meilleurs délais.</p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-6" noValidate>
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block text-sm font-medium">
          Nom complet *
          <input name="name" required autoComplete="name" defaultValue={f.name} className={`${field} h-12`} />
        </label>
        <label className="block text-sm font-medium">
          E-mail *
          <input name="email" type="email" required autoComplete="email" defaultValue={f.email} className={`${field} h-12`} />
        </label>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block text-sm font-medium">
          Organisation
          <input name="organisation" autoComplete="organization" defaultValue={f.organisation} className={`${field} h-12`} />
        </label>
        <label className="block text-sm font-medium">
          Objet
          <select name="subject" defaultValue={f.subject || SUBJECTS[0]} className={`${field} h-12`}>
            {SUBJECTS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="block text-sm font-medium">
        Message *
        <textarea name="body" required rows={6} defaultValue={f.body} className={`${field} py-3`} />
      </label>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      {state.error && (
        <p role="alert" className="text-sm text-destructive">
          {state.error}
        </p>
      )}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">* Champs obligatoires. Vos données ne sont utilisées que pour répondre à votre demande.</p>
        <Submit />
      </div>
    </form>
  );
}
