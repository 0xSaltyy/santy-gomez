"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LogIn } from "lucide-react";
import { createSupabaseBrowserClient, hasBrowserSupabaseConfig } from "@/lib/supabase/client";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState(process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasConfig = hasBrowserSupabaseConfig();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!hasConfig) {
      setError("Supabase environment variables are not configured.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    const supabase = createSupabaseBrowserClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    setIsSubmitting(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    router.push(searchParams.get("next") || "/admin");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="glass-panel p-6">
      <div className="space-y-5">
        <div>
          <label className="input-label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            className="input-field"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div>
          <label className="input-label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            className="input-field"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
      </div>
      {error ? <p className="mt-4 rounded-lg border border-wine/20 bg-wine/5 px-4 py-3 text-sm text-wine">{error}</p> : null}
      <button className="button-primary mt-6 w-full" type="submit" disabled={isSubmitting || !hasConfig}>
        <LogIn className="h-4 w-4" aria-hidden="true" />
        {isSubmitting ? "Signing in" : "Log in"}
      </button>
      {!hasConfig ? <p className="mt-4 text-sm leading-6 text-ink/60">Add Supabase values to `.env.local` before logging in.</p> : null}
    </form>
  );
}
