import { promises as fs } from "fs";
import path from "path";

// Serves files uploaded from the admin (stored outside /public so they work after `next build`).
const DIR = path.join(process.cwd(), "data", "uploads");
const TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".pdf": "application/pdf",
};

export async function GET(_: Request, { params }: { params: { file: string } }) {
  const name = path.basename(params.file);
  try {
    const data = await fs.readFile(path.join(DIR, name));
    return new Response(data, {
      headers: {
        "Content-Type": TYPES[path.extname(name).toLowerCase()] ?? "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
