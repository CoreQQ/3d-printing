import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { getProducts } from "@/lib/api";

export default async function Home() {
  const products = await getProducts().catch(() => []);
  const featured = products.filter((p) => p.featured).slice(0, 3);
  const fallback = products.slice(0, 3);
  const showcase = featured.length > 0 ? featured : fallback;

  return (
    <div>
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-20 md:pt-24">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--ink-soft)]">
              Dublin · Shipping across the EU
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-[var(--ink)] md:text-5xl">
              Thoughtfully designed 3D prints, made to order.
            </h1>
            <p className="mt-5 max-w-md text-lg text-[var(--ink-soft)]">
              Browse our small collection of figurines, home decor, and
              functional designs — or send us your own idea and we&apos;ll
              print it just for you.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/shop"
                className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--accent-ink)] shadow-sm transition-transform hover:scale-[1.03]"
              >
                Browse the shop
              </Link>
              <Link
                href="/custom"
                className="rounded-full border border-[var(--border-soft)] bg-white/70 px-6 py-3 text-sm font-semibold text-[var(--ink)] transition-transform hover:scale-[1.03]"
              >
                Request a custom print
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="glass-card grid grid-cols-2 gap-4 rounded-[2rem] p-6">
              {["🐉", "🪴", "♟️", "🤖"].map((emoji, i) => (
                <div
                  key={emoji}
                  className="flex aspect-square items-center justify-center rounded-2xl text-5xl"
                  style={{
                    background: [
                      "linear-gradient(135deg, #C9B7F255, #C9B7F215)",
                      "linear-gradient(135deg, #9CCFD855, #9CCFD815)",
                      "linear-gradient(135deg, #F6D8A855, #F6D8A815)",
                      "linear-gradient(135deg, #B8D8BA55, #B8D8BA15)",
                    ][i],
                  }}
                >
                  {emoji}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: "Made in Dublin", body: "Every order is printed in our studio and quality-checked by hand before it ships." },
            { title: "EU-wide delivery", body: "We ship across the European Union with tracked, carbon-conscious courier options." },
            { title: "Fully custom prints", body: "Have your own model or idea? Send the details and we will quote a custom print." },
          ].map((item) => (
            <div key={item.title} className="glass-card rounded-3xl p-6">
              <h3 className="font-semibold text-[var(--ink)]">{item.title}</h3>
              <p className="mt-2 text-sm text-[var(--ink-soft)]">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {showcase.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-12">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-2xl font-semibold text-[var(--ink)]">Popular prints</h2>
            <Link href="/shop" className="text-sm font-semibold text-[var(--accent)]">
              View all →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {showcase.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="glass-card flex flex-col items-center gap-4 rounded-[2rem] p-10 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <h2 className="text-2xl font-semibold text-[var(--ink)]">
              Got a model you want printed?
            </h2>
            <p className="mt-2 max-w-md text-[var(--ink-soft)]">
              Send us your file or idea — cosplay props, replacement parts,
              gifts, prototypes. We&apos;ll get back to you with a quote.
            </p>
          </div>
          <Link
            href="/custom"
            className="shrink-0 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--accent-ink)] shadow-sm transition-transform hover:scale-[1.03]"
          >
            Start a custom order
          </Link>
        </div>
      </section>
    </div>
  );
}
