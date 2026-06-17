# Nimbus3D

A small 3D printing e-commerce site. A NestJS API backs a Next.js storefront where
visitors can browse a curated product catalog or request a fully custom print. Only
the studio owner (a single admin account) can add, edit, or remove products.

Studio based in Dublin, Ireland — ships across the EU.

## Stack

- **frontend/** — Next.js 16 (App Router, TypeScript, Tailwind CSS v4)
- **backend/** — NestJS 11, Prisma 7 (SQLite via the `better-sqlite3` driver adapter), JWT auth

## Getting started

### 1. Backend

```bash
cd backend
cp .env.example .env   # adjust ADMIN_EMAIL / ADMIN_PASSWORD / JWT_SECRET
npm install
npx prisma migrate dev
npm run db:seed         # creates the admin user + sample catalog
npm run start:dev       # http://localhost:3001/api
```

### 2. Frontend

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev              # http://localhost:3000
```

### Admin access

Sign in at `/admin/login` with the `ADMIN_EMAIL` / `ADMIN_PASSWORD` from the
backend `.env` (defaults: `owner@dublin3dprints.ie` / `ChangeMe123!` — change
these before deploying). The dashboard lets the owner add or remove products
and review incoming custom print requests. All product-mutating API routes
are protected with a JWT guard, so only an authenticated owner session can
change the catalog.

## Notes

- Product pricing was set based on researched market rates for small-batch
  3D printing (roughly €12–€35 for small/functional items, €20–€70 for
  medium pieces, and €45+ for large or multi-part prints).
- The custom print flow and product "buy" actions are quote/inquiry based
  (submissions are stored and reviewable in the admin dashboard, or routed
  to email) rather than a full cart/checkout — there's no payment
  integration wired up yet.
