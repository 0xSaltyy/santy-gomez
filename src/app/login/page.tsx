import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "@/components/login-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Login"
};

export default function LoginPage() {
  return (
    <section className="soft-band bg-paper/70 py-20">
      <div className="container-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="eyebrow">Owner login</p>
          <h1 className="mt-3 font-display text-5xl font-bold leading-tight text-ink sm:text-6xl">Admin access for Santy Gomez</h1>
          <p className="body-copy mt-6">Private administrative access for the owner account connected to this archive.</p>
        </div>
        <Suspense fallback={<div className="glass-panel p-6">Loading login...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </section>
  );
}
