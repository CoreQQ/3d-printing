"use client";

import { useState, type FormEvent } from "react";
import { createCustomOrder } from "@/lib/api";

export function CustomOrderForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");

    const formEl = event.currentTarget;
    const form = new FormData(formEl);
    const budget = form.get("budget") as string;

    try {
      await createCustomOrder({
        name: form.get("name") as string,
        email: form.get("email") as string,
        description: form.get("description") as string,
        budgetCents: budget ? Math.round(Number(budget) * 100) : undefined,
        fileNote: (form.get("fileNote") as string) || undefined,
      });
      setStatus("success");
      formEl.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <div className="glass-card rounded-3xl p-8 text-center">
        <h2 className="text-xl font-semibold text-[var(--ink)]">Request received!</h2>
        <p className="mt-2 text-[var(--ink-soft)]">
          Thanks for reaching out. We&apos;ll review your request and reply by email with a
          quote, usually within 1–2 business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card flex flex-col gap-5 rounded-3xl p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" name="name" required />
        <Field label="Email address" name="email" type="email" required />
      </div>
      <Field
        label="Describe what you'd like printed"
        name="description"
        as="textarea"
        rows={5}
        required
        placeholder="Share dimensions, reference photos or links, material preferences, deadlines — anything that helps us quote accurately."
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Budget (EUR, optional)" name="budget" type="number" min="0" step="1" />
        <Field label="Link to a 3D file, image, or reference (optional)" name="fileNote" />
      </div>

      {status === "error" && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--accent-ink)] shadow-sm transition-transform hover:scale-[1.02] disabled:opacity-60"
      >
        {status === "loading" ? "Sending..." : "Send custom print request"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  as = "input",
  required,
  ...rest
}: {
  label: string;
  name: string;
  type?: string;
  as?: "input" | "textarea";
  required?: boolean;
  [key: string]: unknown;
}) {
  const className =
    "rounded-2xl border border-[var(--border-soft)] bg-white/80 px-4 py-3 text-sm text-[var(--ink)] outline-none transition-colors focus:border-[var(--accent)]";

  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-[var(--ink)]">
      {label}
      {as === "textarea" ? (
        <textarea name={name} required={required} className={className} {...rest} />
      ) : (
        <input name={name} type={type} required={required} className={className} {...rest} />
      )}
    </label>
  );
}
