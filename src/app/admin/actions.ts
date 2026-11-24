"use server";

import { promises as fs } from "fs";
import path from "path";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { SESSION_COOKIE, createToken, verifyToken } from "@/lib/auth";
import { newId, readDb, slugify, writeDb } from "@/lib/store";
import type { MediaKind, Publication, PublicationType, Status } from "@/lib/types";

const UPLOAD_DIR = path.join(process.cwd(), "data", "uploads");

async function guard() {
  if (!(await verifyToken(cookies().get(SESSION_COOKIE)?.value))) redirect("/admin/login");
}

const str = (f: FormData, k: string) => String(f.get(k) ?? "").trim();

async function saveUpload(file: FormDataEntryValue | null) {
  if (!(file instanceof File) || file.size === 0) return undefined;
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  const ext = path.extname(file.name).toLowerCase().replace(/[^.a-z0-9]/g, "");
  const name = `${Date.now().toString(36)}-${slugify(path.basename(file.name, ext)) || "fichier"}${ext}`;
  await fs.writeFile(path.join(UPLOAD_DIR, name), Buffer.from(await file.arrayBuffer()));
  return `/uploads/${name}`;
}

function refresh() {
  revalidatePath("/", "layout");
}

/* ---------- Auth ---------- */

export async function login(_: { error?: string }, form: FormData): Promise<{ error?: string }> {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || str(form, "password") !== expected) return { error: "Mot de passe incorrect." };
  cookies().set(SESSION_COOKIE, await createToken(), { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 24 * 7 });
  redirect("/admin");
}

export async function logout() {
  cookies().delete(SESSION_COOKIE);
  redirect("/admin/login");
}

/* ---------- Publications ---------- */

export async function savePublication(_: { error?: string }, form: FormData): Promise<{ error?: string }> {
  await guard();
  const intent = str(form, "intent") as "draft" | "publish" | "schedule";
  const id = str(form, "id");
  const title = str(form, "title");
  if (!title) return { error: "Le titre est obligatoire." };

  const status: Status = intent === "publish" ? "published" : intent === "schedule" ? "scheduled" : "draft";
  const publishAt = str(form, "publishAt");
  if (status === "scheduled" && !publishAt) return { error: "Choisissez une date de publication pour programmer." };

  const db = await readDb();
  const now = new Date().toISOString();
  const existing = db.publications.find((p) => p.id === id);

  let slug = slugify(str(form, "slug") || title) || newId();
  if (db.publications.some((p) => p.slug === slug && p.id !== id)) slug = `${slug}-${Date.now().toString(36).slice(-4)}`;

  const cover = (await saveUpload(form.get("coverFile"))) ?? (str(form, "cover") || undefined);
  const pdf = (await saveUpload(form.get("pdfFile"))) ?? (str(form, "pdf") || undefined);

  const data: Publication = {
    id: existing?.id ?? newId(),
    slug,
    title,
    summary: str(form, "summary"),
    content: str(form, "content"),
    cover,
    pdf,
    sourceUrl: str(form, "sourceUrl") || undefined,
    sourceName: str(form, "sourceName") || undefined,
    type: (str(form, "type") || "analyse") as PublicationType,
    category: str(form, "category"),
    tags: str(form, "tags").split(",").map((t) => t.trim()).filter(Boolean),
    seoTitle: str(form, "seoTitle") || undefined,
    seoDescription: str(form, "seoDescription") || undefined,
    status,
    publishAt: status === "scheduled" ? new Date(publishAt).toISOString() : undefined,
    publishedAt: status === "published" ? existing?.publishedAt ?? now : existing?.publishedAt,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
    demo: false,
  };

  if (existing) Object.assign(existing, data);
  else db.publications.unshift(data);
  await writeDb(db);
  refresh();
  redirect(`/admin/publications?saved=${status}`);
}

export async function deletePublication(form: FormData) {
  await guard();
  const db = await readDb();
  db.publications = db.publications.filter((p) => p.id !== str(form, "id"));
  await writeDb(db);
  refresh();
}

/* ---------- Media ---------- */

export async function addMedia(form: FormData) {
  await guard();
  const db = await readDb();
  db.media.unshift({
    id: newId(),
    title: str(form, "title"),
    kind: str(form, "kind") as MediaKind,
    outlet: str(form, "outlet") || undefined,
    date: new Date(str(form, "date") || Date.now()).toISOString(),
    url: str(form, "url"),
    summary: str(form, "summary") || undefined,
  });
  await writeDb(db);
  refresh();
}

export async function deleteMedia(form: FormData) {
  await guard();
  const db = await readDb();
  db.media = db.media.filter((m) => m.id !== str(form, "id"));
  await writeDb(db);
  refresh();
}

/* ---------- Events ---------- */

export async function addEvent(form: FormData) {
  await guard();
  const photos: string[] = [];
  for (const f of form.getAll("photos")) {
    const url = await saveUpload(f);
    if (url) photos.push(url);
  }
  const db = await readDb();
  db.events.unshift({
    id: newId(),
    name: str(form, "name"),
    date: new Date(str(form, "date") || Date.now()).toISOString(),
    location: str(form, "location"),
    topic: str(form, "topic"),
    summary: str(form, "summary") || undefined,
    video: str(form, "video") || undefined,
    pdf: (await saveUpload(form.get("pdfFile"))) ?? undefined,
    photos,
  });
  await writeDb(db);
  refresh();
}

export async function deleteEvent(form: FormData) {
  await guard();
  const db = await readDb();
  db.events = db.events.filter((e) => e.id !== str(form, "id"));
  await writeDb(db);
  refresh();
}

/* ---------- Messages ---------- */

export async function toggleMessageRead(form: FormData) {
  await guard();
  const db = await readDb();
  const m = db.messages.find((x) => x.id === str(form, "id"));
  if (m) m.read = !m.read;
  await writeDb(db);
  revalidatePath("/admin", "layout");
}

export async function deleteMessage(form: FormData) {
  await guard();
  const db = await readDb();
  db.messages = db.messages.filter((m) => m.id !== str(form, "id"));
  await writeDb(db);
  revalidatePath("/admin", "layout");
}
