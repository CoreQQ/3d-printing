const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

export type ProductCategory =
  | "FIGURINES"
  | "HOME_DECOR"
  | "FUNCTIONAL"
  | "TABLETOP_GAMING"
  | "TECH_ACCESSORIES";

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  FIGURINES: "Figurines",
  HOME_DECOR: "Home Decor",
  FUNCTIONAL: "Functional",
  TABLETOP_GAMING: "Tabletop & Gaming",
  TECH_ACCESSORIES: "Tech Accessories",
};

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: ProductCategory;
  priceCents: number;
  currency: string;
  material: string;
  printTimeHours: number;
  imageEmoji: string;
  accentColor: string;
  inStock: boolean;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CustomOrderRequest {
  id: string;
  name: string;
  email: string;
  description: string;
  budgetCents: number | null;
  fileNote: string | null;
  status: string;
  createdAt: string;
}

export function formatPrice(cents: number, currency = "EUR") {
  return new Intl.NumberFormat("en-IE", { style: "currency", currency }).format(cents / 100);
}

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({ message: res.statusText }));
    throw new ApiError(res.status, body.message ?? "Something went wrong");
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return res.json();
}

export function getProducts() {
  return request<Product[]>("/products");
}

export function getProduct(slug: string) {
  return request<Product>(`/products/${slug}`);
}

export interface CreateProductInput {
  name: string;
  description: string;
  category: ProductCategory;
  priceCents: number;
  material: string;
  printTimeHours: number;
  imageEmoji?: string;
  accentColor?: string;
  inStock?: boolean;
  featured?: boolean;
}

export function createProduct(input: CreateProductInput, token: string) {
  return request<Product>("/products", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(input),
  });
}

export function updateProduct(id: string, input: Partial<CreateProductInput>, token: string) {
  return request<Product>(`/products/${id}`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(input),
  });
}

export function deleteProduct(id: string, token: string) {
  return request<{ success: boolean }>(`/products/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function login(email: string, password: string) {
  return request<{ accessToken: string; email: string }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export interface CreateCustomOrderInput {
  name: string;
  email: string;
  description: string;
  budgetCents?: number;
  fileNote?: string;
}

export function createCustomOrder(input: CreateCustomOrderInput) {
  return request<CustomOrderRequest>("/custom-orders", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function getCustomOrders(token: string) {
  return request<CustomOrderRequest[]>("/custom-orders", {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export { ApiError };
