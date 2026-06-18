# Nimbus3D

A small 3D printing e-commerce site. A NestJS API backs a Next.js storefront where
visitors can browse a curated product catalog or request a fully custom print. Only
the studio owner (a single admin account) can add, edit, or remove products.

Studio based in Dublin, Ireland — ships across the EU.

## Stack

- **frontend/** — Next.js 16 (App Router, TypeScript, Tailwind CSS v4)
- **backend/** — NestJS 11, Prisma 7 (PostgreSQL via the `pg` driver adapter), JWT auth

## Getting started

### 1. Backend

Needs a PostgreSQL database (a local instance, or a free hosted one like
[Neon](https://neon.tech) or [Vercel Postgres](https://vercel.com/storage/postgres)).

```bash
cd backend
cp .env.example .env   # set DATABASE_URL + adjust ADMIN_EMAIL / ADMIN_PASSWORD / JWT_SECRET
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

## Deploying to Vercel

This is a two-project deployment on Vercel — one project for `frontend/`, one
for `backend/` — both pointed at this same GitHub repo.

### Database

Create a Postgres database first (e.g. [Neon](https://neon.tech) free tier, or
Vercel's own Postgres/Neon integration from the Storage tab). You'll need its
connection string for `DATABASE_URL` below.

### Backend project

1. "Add New Project" → import this repo → set **Root Directory** to `backend`.
   Framework Preset: "Other".
2. Environment variables (Project Settings → Environment Variables):
   - `DATABASE_URL` — your Postgres connection string
   - `JWT_SECRET` — a long random string
   - `FRONTEND_URL` — your frontend's Vercel URL (for CORS), e.g. `https://nimbus3d.vercel.app`
   - `ADMIN_EMAIL`, `ADMIN_PASSWORD` — owner login
3. Deploy. The build runs `prisma generate` (via `postinstall`) and `nest build`
   automatically; the compiled app is served through `api/index.js`, a thin
   wrapper that boots Nest as an Express app inside a single serverless
   function (`vercel.json` rewrites every request to it).
4. Apply migrations and seed the production database once, from your machine,
   pointing `DATABASE_URL` at the same Postgres instance:
   ```bash
   cd backend
   DATABASE_URL="<your-prod-url>" npm run db:migrate:deploy
   DATABASE_URL="<your-prod-url>" ADMIN_EMAIL=... ADMIN_PASSWORD=... npm run db:seed
   ```

### Frontend project

1. "Add New Project" → import this repo again → set **Root Directory** to
   `frontend`. Framework Preset: Next.js (auto-detected).
2. Environment variable: `NEXT_PUBLIC_API_URL` = `https://<your-backend-project>.vercel.app/api`
3. Deploy.

> Note: NestJS relies on `emitDecoratorMetadata` for dependency injection, which
> Vercel's zero-config esbuild bundler doesn't support for raw TypeScript. That's
> why the backend ships a pre-compiled `api/index.js` pointing at `dist/` (built
> via `tsc`/`nest build`) instead of letting Vercel transpile `src/` directly.

## Notes

- Product pricing was set based on researched market rates for small-batch
  3D printing (roughly €12–€35 for small/functional items, €20–€70 for
  medium pieces, and €45+ for large or multi-part prints).
- The custom print flow and product "buy" actions are quote/inquiry based
  (submissions are stored and reviewable in the admin dashboard, or routed
  to email) rather than a full cart/checkout — there's no payment
  integration wired up yet.
