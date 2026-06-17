import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORY_LABELS, formatPrice, getProduct } from "@/lib/api";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug).catch(() => null);

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <Link href="/shop" className="text-sm font-medium text-[var(--ink-soft)] hover:text-[var(--ink)]">
        ← Back to shop
      </Link>

      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <div
          className="flex aspect-square items-center justify-center rounded-[2rem] text-[10rem]"
          style={{ background: `linear-gradient(135deg, ${product.accentColor}55, ${product.accentColor}15)` }}
        >
          {product.imageEmoji}
        </div>

        <div>
          <span className="text-xs font-semibold uppercase tracking-wide text-[var(--ink-soft)]">
            {CATEGORY_LABELS[product.category]}
          </span>
          <h1 className="mt-2 text-3xl font-semibold text-[var(--ink)]">{product.name}</h1>
          <p className="mt-4 text-[var(--ink-soft)]">{product.description}</p>

          <div className="mt-6 text-3xl font-semibold text-[var(--ink)]">
            {formatPrice(product.priceCents, product.currency)}
          </div>

          <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div className="glass-card rounded-2xl p-4">
              <dt className="text-[var(--ink-soft)]">Material</dt>
              <dd className="mt-1 font-semibold text-[var(--ink)]">{product.material}</dd>
            </div>
            <div className="glass-card rounded-2xl p-4">
              <dt className="text-[var(--ink-soft)]">Print time</dt>
              <dd className="mt-1 font-semibold text-[var(--ink)]">~{product.printTimeHours}h</dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={`mailto:hello@nimbus3d.ie?subject=Order: ${encodeURIComponent(product.name)}`}
              className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--accent-ink)] shadow-sm transition-transform hover:scale-[1.03]"
            >
              Order via email
            </a>
            <Link
              href="/custom"
              className="rounded-full border border-[var(--border-soft)] bg-white/70 px-6 py-3 text-sm font-semibold text-[var(--ink)] transition-transform hover:scale-[1.03]"
            >
              Want it customised?
            </Link>
          </div>
          <p className="mt-4 text-xs text-[var(--ink-soft)]">
            Ships from Dublin, Ireland. Delivery available across the EU.
          </p>
        </div>
      </div>
    </div>
  );
}
