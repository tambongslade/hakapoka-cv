// Runs before `next build`: data/db.json is not in git (it holds live content and visitors' messages),
// so a fresh checkout — e.g. a Vercel build — creates it from the seed. An existing file is never touched.
import fs from "fs";

if (fs.existsSync(new URL("../data/db.json", import.meta.url))) {
  console.log("data/db.json present — keeping it.");
} else {
  fs.mkdirSync(new URL("../data/", import.meta.url), { recursive: true });
  await import("./seed.mjs");
}
