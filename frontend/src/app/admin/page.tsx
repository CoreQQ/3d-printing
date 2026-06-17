"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  CATEGORY_LABELS,
  createProduct,
  deleteProduct,
  formatPrice,
  getCustomOrders,
  getProducts,
  type CustomOrderRequest,
  type Product,
  type ProductCategory,
} from "@/lib/api";
import { clearSession, getAdminEmail, getToken } from "@/lib/auth";

export default function AdminDashboard() {
  const router = useRouter();
  const [token] = useState(() => getToken());
  const [email] = useState(() => getAdminEmail());
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<CustomOrderRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!token) {
      router.replace("/admin/login");
      return;
    }

    Promise.all([getProducts(), getCustomOrders(token)])
      .then(([productsRes, ordersRes]) => {
        setProducts(productsRes);
        setOrders(ordersRes);
      })
      .catch(() => {
        clearSession();
        router.replace("/admin/login");
      })
      .finally(() => setLoading(false));
  }, [router, token]);

  async function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!token) return;
    setSubmitting(true);
    setFormError("");

    const formEl = event.currentTarget;
    const form = new FormData(formEl);
    try {
      const product = await createProduct(
        {
          name: form.get("name") as string,
          description: form.get("description") as string,
          category: form.get("category") as ProductCategory,
          priceCents: Math.round(Number(form.get("price")) * 100),
          material: form.get("material") as string,
          printTimeHours: Number(form.get("printTimeHours")),
          imageEmoji: (form.get("imageEmoji") as string) || "🧊",
          accentColor: (form.get("accentColor") as string) || "#9CCFD8",
          featured: form.get("featured") === "on",
        },
        token,
      );
      setProducts((prev) => [product, ...prev]);
      formEl.reset();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Could not create product");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    if (!token) return;
    if (!window.confirm("Remove this product from the shop?")) return;
    await deleteProduct(id, token);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  function handleLogout() {
    clearSession();
    router.replace("/admin/login");
  }

  if (loading) {
    return <div className="px-6 py-20 text-center text-[var(--ink-soft)]">Loading studio dashboard...</div>;
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--ink)]">Studio dashboard</h1>
          <p className="text-sm text-[var(--ink-soft)]">Signed in as {email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="rounded-full border border-[var(--border-soft)] bg-white/70 px-5 py-2 text-sm font-semibold text-[var(--ink)]"
        >
          Log out
        </button>
      </div>

      <section className="glass-card mb-12 rounded-3xl p-8">
        <h2 className="text-lg font-semibold text-[var(--ink)]">Add a new product</h2>
        <form onSubmit={handleCreate} className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field label="Name" name="name" required />
          <Field label="Category" name="category" as="select" required>
            {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Field>
          <Field
            label="Description"
            name="description"
            as="textarea"
            rows={3}
            required
            className="sm:col-span-2"
          />
          <Field label="Price (EUR)" name="price" type="number" step="0.01" min="0" required />
          <Field label="Print time (hours)" name="printTimeHours" type="number" step="0.1" min="0" required />
          <Field label="Material" name="material" required />
          <Field label="Emoji icon" name="imageEmoji" placeholder="🧊" />
          <Field label="Accent color (hex)" name="accentColor" placeholder="#9CCFD8" />
          <label className="flex items-center gap-2 text-sm font-medium text-[var(--ink)] sm:col-span-2">
            <input type="checkbox" name="featured" className="h-4 w-4" />
            Feature on homepage
          </label>

          {formError && <p className="text-sm text-red-500 sm:col-span-2">{formError}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="sm:col-span-2 mt-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--accent-ink)] shadow-sm disabled:opacity-60"
          >
            {submitting ? "Adding..." : "Add product"}
          </button>
        </form>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-lg font-semibold text-[var(--ink)]">
          Products ({products.length})
        </h2>
        <div className="overflow-hidden rounded-3xl border border-[var(--border-soft)] bg-white/70">
          <table className="w-full text-sm">
            <thead className="bg-[var(--surface-soft)] text-left text-[var(--ink-soft)]">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t border-[var(--border-soft)]">
                  <td className="px-4 py-3 font-medium text-[var(--ink)]">
                    {product.imageEmoji} {product.name}
                  </td>
                  <td className="px-4 py-3 text-[var(--ink-soft)]">
                    {CATEGORY_LABELS[product.category]}
                  </td>
                  <td className="px-4 py-3 text-[var(--ink-soft)]">
                    {formatPrice(product.priceCents, product.currency)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-[var(--ink)]">
          Custom print requests ({orders.length})
        </h2>
        <div className="flex flex-col gap-4">
          {orders.length === 0 && (
            <p className="text-sm text-[var(--ink-soft)]">No custom requests yet.</p>
          )}
          {orders.map((order) => (
            <div key={order.id} className="glass-card rounded-2xl p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-semibold text-[var(--ink)]">{order.name}</span>
                <span className="text-xs text-[var(--ink-soft)]">
                  {new Date(order.createdAt).toLocaleString("en-IE")}
                </span>
              </div>
              <a href={`mailto:${order.email}`} className="text-sm text-[var(--accent)]">
                {order.email}
              </a>
              <p className="mt-2 text-sm text-[var(--ink-soft)]">{order.description}</p>
              {order.budgetCents != null && (
                <p className="mt-1 text-sm text-[var(--ink-soft)]">
                  Budget: {formatPrice(order.budgetCents)}
                </p>
              )}
              {order.fileNote && (
                <p className="mt-1 text-sm text-[var(--ink-soft)]">Reference: {order.fileNote}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  as = "input",
  required,
  className = "",
  children,
  ...rest
}: {
  label: string;
  name: string;
  type?: string;
  as?: "input" | "textarea" | "select";
  required?: boolean;
  className?: string;
  children?: React.ReactNode;
  [key: string]: unknown;
}) {
  const inputClass =
    "rounded-2xl border border-[var(--border-soft)] bg-white/80 px-4 py-3 text-sm text-[var(--ink)] outline-none focus:border-[var(--accent)]";

  return (
    <label className={`flex flex-col gap-2 text-sm font-medium text-[var(--ink)] ${className}`}>
      {label}
      {as === "textarea" && (
        <textarea name={name} required={required} className={inputClass} {...rest} />
      )}
      {as === "select" && (
        <select name={name} required={required} className={inputClass} {...rest}>
          {children}
        </select>
      )}
      {as === "input" && (
        <input name={name} type={type} required={required} className={inputClass} {...rest} />
      )}
    </label>
  );
}
