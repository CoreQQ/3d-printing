import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border-soft)] bg-[var(--surface-soft)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-[var(--ink-soft)]">
            A small-batch 3D printing studio based in Dublin, shipping considered
            designs and custom prints across the EU.
          </p>
        </div>
        <div className="text-sm">
          <h3 className="mb-3 font-semibold text-[var(--ink)]">Studio</h3>
          <ul className="space-y-2 text-[var(--ink-soft)]">
            <li>Dublin, Ireland</li>
            <li>Shipping to all EU member states</li>
            <li>
              <a href="mailto:hello@nimbus3d.ie" className="hover:text-[var(--ink)]">
                hello@nimbus3d.ie
              </a>
            </li>
          </ul>
        </div>
        <div className="text-sm">
          <h3 className="mb-3 font-semibold text-[var(--ink)]">Explore</h3>
          <ul className="space-y-2 text-[var(--ink-soft)]">
            <li>
              <Link href="/shop" className="hover:text-[var(--ink)]">
                Shop all prints
              </Link>
            </li>
            <li>
              <Link href="/custom" className="hover:text-[var(--ink)]">
                Request a custom print
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-[var(--ink)]">
                About &amp; shipping
              </Link>
            </li>
            <li>
              <Link href="/admin/login" className="hover:text-[var(--ink)]">
                Studio login
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--border-soft)] px-6 py-5 text-center text-xs text-[var(--ink-soft)]">
        © {new Date().getFullYear()} Nimbus3D Dublin. All prints made to order.
      </div>
    </footer>
  );
}
