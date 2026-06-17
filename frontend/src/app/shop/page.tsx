import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { CATEGORY_LABELS, getProducts, type ProductCategory } from "@/lib/api";

export const metadata = {
  title: "Shop — Nimbus3D",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const products = await getProducts().catch(() => []);
  const categories = Object.keys(CATEGORY_LABELS) as ProductCategory[];
  const filtered = category
    ? products.filter((p) => p.category === category)
    : products;

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-[var(--ink)]">Shop</h1>
        <p className="mt-2 text-[var(--ink-soft)]">
          A small, considered catalog — every piece is printed to order in our Dublin studio.
        </p>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        <Link
          href="/shop"
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            !category
              ? "bg-[var(--accent)] text-[var(--accent-ink)]"
              : "bg-white/70 text-[var(--ink-soft)] hover:text-[var(--ink)]"
          }`}
        >
          All
        </Link>
        {categories.map((c) => (
          <Link
            key={c}
            href={`/shop?category=${c}`}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              category === c
                ? "bg-[var(--accent)] text-[var(--accent-ink)]"
                : "bg-white/70 text-[var(--ink-soft)] hover:text-[var(--ink)]"
            }`}
          >
            {CATEGORY_LABELS[c]}
          </Link>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-[var(--ink-soft)]">No products in this category yet — check back soon.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
