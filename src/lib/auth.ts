// Edge-compatible session helpers (used by middleware and server actions).
export const SESSION_COOKIE = "hh_session";

async function hmac(value: string) {
  const secret = process.env.SESSION_SECRET || "dev-secret-change-me";
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return Array.from(new Uint8Array(sig), (b) => b.toString(16).padStart(2, "0")).join("");
}

export async function createToken() {
  const expires = Date.now() + 1000 * 60 * 60 * 24 * 7;
  return `${expires}.${await hmac(String(expires))}`;
}

export async function verifyToken(token?: string) {
  if (!token) return false;
  const [expires, sig] = token.split(".");
  if (!expires || !sig || Number(expires) < Date.now()) return false;
  return sig === (await hmac(expires));
}
