import { CustomOrderForm } from "./CustomOrderForm";

export const metadata = {
  title: "Custom Print Request — Nimbus3D",
};

export default function CustomPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-10 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--ink-soft)]">
          Custom 3D Printing
        </span>
        <h1 className="mt-4 text-3xl font-semibold text-[var(--ink)] md:text-4xl">
          Have an idea? We can print it.
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-[var(--ink-soft)]">
          From replacement parts and cosplay props to personalised gifts and prototypes —
          tell us what you need and we&apos;ll send a quote. We print in Dublin and ship
          anywhere in the EU.
        </p>
      </div>

      <CustomOrderForm />

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {[
          { title: "1. Tell us", body: "Share your idea, file, or reference photos." },
          { title: "2. Get a quote", body: "We reply by email with pricing and timing." },
          { title: "3. We print & ship", body: "Your custom piece is printed and shipped across the EU." },
        ].map((step) => (
          <div key={step.title} className="glass-card rounded-2xl p-5 text-sm">
            <h3 className="font-semibold text-[var(--ink)]">{step.title}</h3>
            <p className="mt-1 text-[var(--ink-soft)]">{step.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
