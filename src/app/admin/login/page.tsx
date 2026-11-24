import type { Metadata } from "next";
import { LoginForm } from "./login-form";

export const metadata: Metadata = { title: "Administration", robots: { index: false } };

export default function Login() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-5 text-ink-foreground">
      <div className="w-full max-w-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Espace privé</p>
        <h1 className="mt-4 text-3xl">Hermann Hakapoka — Administration</h1>
        <LoginForm />
      </div>
    </main>
  );
}
