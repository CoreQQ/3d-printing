"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api";
import { setSession } from "@/lib/auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(event.currentTarget);
    try {
      const { accessToken, email } = await login(
        form.get("email") as string,
        form.get("password") as string,
      );
      setSession(accessToken, email);
      router.push("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex max-w-md flex-col px-6 py-20">
      <h1 className="text-2xl font-semibold text-[var(--ink)]">Studio login</h1>
      <p className="mt-2 text-sm text-[var(--ink-soft)]">
        Owner access only — sign in to manage products and view custom requests.
      </p>

      <form onSubmit={handleSubmit} className="glass-card mt-8 flex flex-col gap-4 rounded-3xl p-8">
        <label className="flex flex-col gap-2 text-sm font-medium text-[var(--ink)]">
          Email
          <input
            type="email"
            name="email"
            required
            className="rounded-2xl border border-[var(--border-soft)] bg-white/80 px-4 py-3 text-sm outline-none focus:border-[var(--accent)]"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-[var(--ink)]">
          Password
          <input
            type="password"
            name="password"
            required
            className="rounded-2xl border border-[var(--border-soft)] bg-white/80 px-4 py-3 text-sm outline-none focus:border-[var(--accent)]"
          />
        </label>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="mt-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--accent-ink)] shadow-sm transition-transform hover:scale-[1.02] disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}
