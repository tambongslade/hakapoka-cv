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

  // Two independent channels: a copy in /admin/messages and an e-mail. The request succeeds if
  // either works — on serverless hosts (Vercel) the filesystem is read-only, so e-mail is the one that counts.
  let saved = false;
  try {
    const db = await readDb();
    db.messages.unshift({ id: newId(), ...fields, subject, createdAt: new Date().toISOString(), read: false });
    await writeDb(db);
    saved = true;
  } catch (err) {
    console.error("[contact] could not save the message to /admin/messages:", err);
  }

  let mailed = false;
  if (mailerConfigured()) {
    try {
      await sendContactMail({ ...fields, subject });
      mailed = true;
    } catch (err) {
      console.error("[contact] e-mail delivery failed:", err);
    }
  } else {
    console.warn("[contact] SMTP not configured — no e-mail sent.");
  }

  if (!saved && !mailed) {
    return { ok: false, error: "L'envoi a échoué. Merci de réessayer ou d'écrire directement à hakapoka@gmail.com.", fields };
  }
  return { ok: true };
}
