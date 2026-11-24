import "server-only";
import nodemailer from "nodemailer";

/*
 * Contact-form notifications by SMTP.
 *
 * Works with any SMTP provider. With Gmail: SMTP_HOST=smtp.gmail.com, SMTP_PORT=465,
 * SMTP_USER=<the Gmail address>, SMTP_PASS=<a 16-character App Password, not the account password>
 * (Google account → Security → 2-Step Verification → App passwords).
 */

const env = (k: string) => process.env[k]?.trim() || undefined;

export const CONTACT_TO = env("CONTACT_TO") ?? "hakapoka@gmail.com";

export function mailerConfigured() {
  return Boolean(env("SMTP_HOST") && env("SMTP_USER") && env("SMTP_PASS"));
}

let transport: nodemailer.Transporter | null = null;
function getTransport() {
  if (!transport) {
    const port = Number(env("SMTP_PORT") ?? 465);
    transport = nodemailer.createTransport({
      host: env("SMTP_HOST"),
      port,
      secure: port === 465,
      auth: { user: env("SMTP_USER"), pass: env("SMTP_PASS") },
    });
  }
  return transport;
}

const escape = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export type ContactMail = { name: string; email: string; organisation: string; subject: string; body: string };

export async function sendContactMail(m: ContactMail) {
  const rows: [string, string][] = [
    ["Nom & fonction", m.name],
    ["Organisation", m.organisation || "—"],
    ["E-mail", m.email],
    ["Domaine", m.subject],
  ];
  const text = `${rows.map(([k, v]) => `${k} : ${v}`).join("\n")}\n\n${m.body}\n\n— Envoyé depuis le formulaire de contact du site.`;
  const html = `<table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="color:#666">${escape(k)}</td><td><strong>${escape(v)}</strong></td></tr>`)
    .join("")}</table><p style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap;border-left:3px solid #c9a35b;padding-left:12px">${escape(
    m.body,
  )}</p><p style="font-family:Arial,sans-serif;font-size:12px;color:#888">Envoyé depuis le formulaire de contact du site. Répondez directement à ce message pour écrire à ${escape(m.name)}.</p>`;

  await getTransport().sendMail({
    from: { name: "Site Hermann Hakapoka", address: env("SMTP_FROM") ?? env("SMTP_USER")! },
    to: CONTACT_TO,
    replyTo: { name: m.name, address: m.email },
    subject: `Nouvelle demande — ${m.subject} — ${m.name}`,
    text,
    html,
  });
}
