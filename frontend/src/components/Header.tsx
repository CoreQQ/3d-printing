import Link from "next/link";
import { Logo } from "./Logo";

const NAV_LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/custom", label: "Custom Print" },
  { href: "/about", label: "About & Shipping" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border-soft)] bg-[rgba(250,249,246,0.8)] backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="shrink-0">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-[var(--ink-soft)] md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-[var(--ink)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/custom"
          className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--accent-ink)] shadow-sm transition-transform hover:scale-[1.03]"
        >
          Get a Custom Quote
        </Link>
      </div>
    </header>
  );
}
