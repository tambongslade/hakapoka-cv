"use client";

import { useFormState, useFormStatus } from "react-dom";
import { login } from "../actions";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="focus-ring h-12 w-full rounded-sm bg-gold text-sm font-medium text-ink transition hover:bg-gold/90 disabled:opacity-50">
      {pending ? "Connexion…" : "Se connecter"}
    </button>
  );
}

export function LoginForm() {
  const [state, action] = useFormState(login, {});
  return (
    <form action={action} className="mt-10 space-y-6">
      <label className="block text-sm">
        Mot de passe
        <input
          name="password"
          type="password"
          required
          autoFocus
          autoComplete="current-password"
          className="mt-2 block h-12 w-full rounded-sm border border-white/20 bg-white/5 px-4 text-base text-ink-foreground focus:border-gold focus:outline-none"
        />
      </label>
      {state.error && <p role="alert" className="rounded-sm bg-destructive px-3 py-2 text-sm text-destructive-foreground">{state.error}</p>}
      <Submit />
    </form>
  );
}
