import Link from "next/link";
import { CATEGORY_LABELS, formatPrice, type Product } from "@/lib/api";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/shop/${product.slug}`}
      className="glass-card group flex flex-col overflow-hidden rounded-3xl transition-transform hover:-translate-y-1"
    >
      <div
        className="flex h-44 items-center justify-center text-6xl"
        style={{ background: `linear-gradient(135deg, ${product.accentColor}55, ${product.accentColor}15)` }}
      >
        <span className="drop-shadow-sm transition-transform group-hover:scale-110">
          {product.imageEmoji}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <span className="text-xs font-semibold uppercase tracking-wide text-[var(--ink-soft)]">
          {CATEGORY_LABELS[product.category]}
        </span>
        <h3 className="font-semibold text-[var(--ink)]">{product.name}</h3>
        <p className="line-clamp-2 text-sm text-[var(--ink-soft)]">{product.description}</p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="text-lg font-semibold text-[var(--ink)]">
            {formatPrice(product.priceCents, product.currency)}
          </span>
          {!product.inStock && (
            <span className="text-xs font-medium text-[var(--peach)]">Made to order</span>
          )}
        </div>
      </div>
    </Link>
  );
}
