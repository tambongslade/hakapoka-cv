import "server-only";
import { promises as fs } from "fs";
import path from "path";
import type { Db, Publication } from "./types";

/**
 * Minimal JSON-file store. Good for local use and a single VPS.
 * For serverless hosting (Vercel), swap these functions for a database
 * (Supabase, Postgres, etc.) — every page and action goes through them.
 */
const DB_PATH = path.join(process.cwd(), "data", "db.json");

export async function readDb(): Promise<Db> {
  const raw = await fs.readFile(DB_PATH, "utf8");
  return JSON.parse(raw) as Db;
}

export async function writeDb(db: Db) {
  const tmp = DB_PATH + ".tmp";
  await fs.writeFile(tmp, JSON.stringify(db, null, 2));
  await fs.rename(tmp, DB_PATH);
}

export function isLive(p: Publication, now = new Date()) {
  if (p.status === "published") return true;
  return p.status === "scheduled" && !!p.publishAt && new Date(p.publishAt) <= now;
}

export function liveDate(p: Publication) {
  return p.status === "scheduled" ? p.publishAt! : p.publishedAt ?? p.createdAt;
}

export async function getLivePublications() {
  const db = await readDb();
  return db.publications
    .filter((p) => isLive(p))
    .sort((a, b) => +new Date(liveDate(b)) - +new Date(liveDate(a)));
}

export async function getPublication(slug: string) {
  const db = await readDb();
  const p = db.publications.find((x) => x.slug === slug);
  return p && isLive(p) ? p : null;
}

export function newId() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

export function slugify(s: string) {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
