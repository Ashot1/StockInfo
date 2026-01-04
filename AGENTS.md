# Agents Guide: StockInfo

This file is a quick, agent-friendly overview of the StockInfo project. It summarizes architecture, structure, and the key rules needed to work in this repo. For the full workflow and standards, also see `AGENTS.md` and the `AI-workflow/` docs.

## Project Summary
- **Product**: StockInfo, a web app for monitoring financial markets and managing a virtual investment portfolio.
- **Core features**: real-time quotes (stocks/bonds/currency), MOEX news, virtual trading, favorites, user profiles, PWA support, accessibility, theme switching.
- **External APIs**: MOEX API (securities + news), CBR-XML-DAILY (currency), Supabase (auth + data).

## Tech Stack
- **Framework**: Next.js (App Router)
- **Language**: TypeScript (strict)
- **UI**: React, Tailwind CSS, Radix UI (via ShadCN)
- **State**: React Context + TanStack Query
- **Backend**: Supabase (Auth + Postgres)
- **Charts**: Chart.js
- **Animations**: Framer Motion

## Architecture Overview
- **Server Components by default** in `src/app/`, with `'use client'` only when necessary.
- **Server Actions** live in `src/actions/` and use a `TryCatch` wrapper to return `{ data, error }`.
- **Client state** is split between Context providers and React Query for server state.
- **Supabase clients**:
  - `src/utils/supabase/client.ts` for client components
  - `src/utils/supabase/server.ts` for server components
  - `src/utils/supabase/service.ts` for admin/service role operations
- **Routing** uses App Router with route groups like `(mainpages)` and `[id]` dynamic routes.

## Directory Structure (Key Paths)
```
src/
  app/                 # App Router pages, layouts, loading/error
  actions/             # Server actions (Account, Security, etc.)
  components/          # UI: entity/module/ui/widgets
  hoc/                 # Providers, HOCs, client wrappers
  hooks/               # Custom hooks
  types/               # Shared TypeScript types
  utils/               # Helpers, config, supabase clients
public/                # Static assets, logos, PWA manifest
AI-workflow/           # Process docs (roles, setup, mgmt)
```

## Data + Formatting Rules
- **Money values**: use `number` type.
- **Locale**: Russian number formatting.
- **Dates**: `DD.MM.YYYY HH:MM`.
- **Caching**: MOEX calls should revalidate around 60s.

## Styling & UI
- Tailwind CSS only; prefer tokens from `globals.css`.
- Responsive design with custom breakpoints: `300p`, `500p`, `768p`, `1024p`, `1080p`, `4k`.
- Use `cn()` utility for conditional classes.
- Follow accessibility rules (ARIA, keyboard, contrast).

## Development Workflow (Essentials)
- **Do not commit** unless the user asks.
- **Branch naming**: `issue-<id>-<slug>`.
- **Conventional commits** preferred (English).
- **One task = one PR** when possible.

## Environment
Create `.env.local` at repo root:
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_KEY=
NEXT_PUBLIC_SITEURL=http://localhost:3000
```

## Common Commands
```
yarn install
yarn dev
yarn build
yarn start
yarn lint
yarn generate:types
```

## Where to Look First
- `src/app/` for pages and layouts
- `src/actions/` for data fetching/mutations
- `src/components/` for UI building blocks
- `src/utils/` for shared utilities

