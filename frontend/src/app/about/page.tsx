export const metadata = {
  title: "About & Shipping — Nimbus3D",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-semibold text-[var(--ink)]">About Nimbus3D</h1>
      <p className="mt-4 max-w-2xl text-[var(--ink-soft)]">
        Nimbus3D is a small 3D printing studio based in Dublin, Ireland. We design and
        print a curated catalog of figurines, home decor, and functional pieces — and
        we take on fully custom print requests, from cosplay props to replacement parts.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <div className="glass-card rounded-3xl p-6">
          <h2 className="font-semibold text-[var(--ink)]">Studio address</h2>
          <p className="mt-2 text-[var(--ink-soft)]">
            Nimbus3D Print Studio<br />
            Dublin, Ireland
          </p>
          <p className="mt-3 text-sm text-[var(--ink-soft)]">
            Orders are made by appointment — we don&apos;t currently have a walk-in
            storefront. All sales happen online.
          </p>
        </div>
        <div className="glass-card rounded-3xl p-6">
          <h2 className="font-semibold text-[var(--ink)]">Shipping</h2>
          <p className="mt-2 text-[var(--ink-soft)]">
            We ship across the entire European Union with tracked courier
            delivery. Typical delivery time is 3–7 business days after your
            order is printed, depending on destination.
          </p>
        </div>
        <div className="glass-card rounded-3xl p-6">
          <h2 className="font-semibold text-[var(--ink)]">Materials</h2>
          <p className="mt-2 text-[var(--ink-soft)]">
            We print primarily in PLA, PLA+, PETG, TPU, and resin, chosen per
            piece for the best balance of detail, strength, and finish.
          </p>
        </div>
        <div className="glass-card rounded-3xl p-6">
          <h2 className="font-semibold text-[var(--ink)]">Get in touch</h2>
          <p className="mt-2 text-[var(--ink-soft)]">
            Questions about an order or a custom print?{" "}
            <a href="mailto:hello@nimbus3d.ie" className="font-semibold text-[var(--accent)]">
              hello@nimbus3d.ie
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
