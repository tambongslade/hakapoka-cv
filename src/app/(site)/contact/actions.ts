"use server";

import { mailerConfigured, sendContactMail } from "@/lib/mailer";
import { newId, readDb, writeDb } from "@/lib/store";

export type ContactState = { ok: boolean; error?: string; fields?: Record<string, string> };

export async function sendMessage(_: ContactState, form: FormData): Promise<ContactState> {
  const get = (k: string) => String(form.get(k) ?? "").trim();
  // Honeypot: bots fill every field.
  if (get("website")) return { ok: true };

  const fields = { name: get("name"), email: get("email"), organisation: get("organisation"), subject: get("subject"), body: get("body") };
  if (!fields.name || !fields.email || !fields.body) return { ok: false, error: "Merci de renseigner votre nom, votre e-mail et votre message.", fields };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) return { ok: false, error: "L'adresse e-mail semble invalide.", fields };
  if (fields.body.length > 5000) return { ok: false, error: "Le message est trop long (5 000 caractères maximum).", fields };

  const subject = fields.subject || "Autre";

  // Always keep a copy in /admin/messages, so nothing is lost if the mail server is down.
  const db = await readDb();
  db.messages.unshift({ id: newId(), ...fields, subject, createdAt: new Date().toISOString(), read: false });
  await writeDb(db);

  if (!mailerConfigured()) {
    console.warn("[contact] SMTP not configured — message saved to /admin/messages only, no e-mail sent.");
    return { ok: true };
  }
  try {
    await sendContactMail({ ...fields, subject });
  } catch (err) {
    console.error("[contact] e-mail delivery failed (message kept in /admin/messages):", err);
  }
  return { ok: true };
}
