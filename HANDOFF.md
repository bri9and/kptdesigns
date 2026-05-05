# KPT Designs — Handoff

Orientation doc for a fresh Claude session. Read this before touching code.

---

## What this project is

**KPT Designs** (package name `qwd`) — a Next.js marketing + product site for a small web-design business. Three things live in one repo:

1. **Marketing site** for KPT Designs itself (home, about, pricing, contact, pitch decks).
2. **Customer site portfolio** (`/sites/<slug>`) — ~35 fully-built customer landing pages, some real clients, some pitched mockups. Each has its own `_lib/` (data) and `_sections/` (components).
3. **Internal design playground**:
   - `/mockup/v1`–`/mockup/v83` — 80+ hero/landing-page concept variants the founder iterates on.
   - `/ideas` — unified catalog that surfaces every mockup and brand study, organized by business type.
   - `/concepts/*.html` (in `public/`) — static-HTML brand-language studies linked from `/ideas`.

There's also a budding **SaaS layer** (Clerk auth + Supabase + Stripe) for selling domains, hosting, and AI-generated sites — `/dashboard`, `/api/provision`, `/api/domains`, `/api/hosting`, `/api/ai`. Partially wired.

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js **16.1.6** (App Router, RSC) |
| React | **19.2.3** |
| Styling | Tailwind v4 (`@tailwindcss/postcss`) + `tw-animate-css` + a few shadcn/ui components |
| Animation | `framer-motion` v12, `react-spring`, `@react-three/fiber` + `drei` (Three.js for some hero variants) |
| Auth | `@clerk/nextjs` v7 |
| DB | Supabase (`@supabase/supabase-js`) — schema in `supabase/migrations/001_initial_schema.sql` |
| Payments | Stripe (`stripe` + `@stripe/stripe-js`) |
| AI | `@anthropic-ai/sdk` (Claude) + `GOOGLE_API_KEY` for Gemini |
| Email | `resend` |
| Forms | `react-hook-form` + `zod` |
| TS | strict, **but `next.config.ts` currently sets `typescript.ignoreBuildErrors: true`** (temporary — see "Known quirks" below) |

No test runner is configured. `npm run lint` is the only check beyond `next build`.

---

## Top-level layout

```
kptdesigns/
├── CLAUDE.md                 # Project rules (env vars table)
├── HANDOFF.md                # ← this file
├── README.md                 # Default create-next-app boilerplate, ignore
├── next.config.ts            # Security headers + /concepts rewrite + TS-bypass
├── package.json              # name "qwd", v2.1.0
├── tsconfig.json
├── eslint.config.mjs
├── components.json           # shadcn config
├── postcss.config.mjs
│
├── src/
│   ├── app/                  # Next.js App Router (see below)
│   ├── components/           # Shared components
│   └── lib/                  # Shared utilities, data, clients
│
├── public/
│   ├── concepts/             # Static-HTML brand studies, served via /concepts rewrite
│   ├── proposal/             # Proposal-page assets
│   ├── sites/                # Per-customer image assets (organized by site slug)
│   └── *.svg                 # Logos and icons
│
├── supabase/
│   └── migrations/001_initial_schema.sql   # customers, domains, sites, orders + RLS
│
├── agent/                    # AI site-builder system prompt + intake schema (Zod)
│   ├── intake-schema.ts
│   └── system-prompt.md
│
├── docs/superpowers/         # Notes from the superpowers skill system
├── .claude/                  # Claude Code project settings (empty/minimal)
├── .clerk/                   # Clerk dev artifacts (gitignored)
├── .vercel/                  # Vercel link (gitignored)
└── .worktrees/               # Git worktrees for parallel branches (gitignored)
```

---

## `src/app/` — App Router routes

```
app/
├── layout.tsx                # Root: Clerk provider, fonts (Space Grotesk + JetBrains Mono), LayoutShell
├── page.tsx                  # Marketing home (uses framer-motion + portfolio data)
├── globals.css
├── opengraph-image.tsx
├── favicon.ico
│
├── about/
├── contact/
├── pricing/
├── projects/
│   └── touchdesign/          # Specific project page
├── neo/                      # (alt landing/experiment)
├── landman/                  # Landing page using src/components/landman/*
│
├── pitch/                    # Pitch deck route + _components/
│   ├── page.tsx
│   └── _components/
│
├── proposal/                 # Per-customer proposal pages
│   ├── desert-coyote-landscape/
│   └── lake-arthur/
│
├── sites/                    # ── 35 customer site mockups, one folder each
│   ├── lake-arthur/          # Pattern: page.tsx → SiteComponent.tsx → _sections/* + _lib/*
│   │   ├── page.tsx
│   │   ├── LakeArthurSite.tsx
│   │   ├── _sections/        # Hero, Amenities, Rates, Scorecard, etc.
│   │   └── _lib/             # Site-specific data, palette, copy
│   ├── desert-coyote-landscape/   # Same pattern (mid-rename: palette.charcoal → palette.ink)
│   ├── cirigliano-plumbing/
│   ├── nicholas-electric/
│   ├── zeke-son-roofing/
│   └── … (~30 more — see `src/lib/portfolio.ts` for the registry)
│
├── mockup/                   # ── 80+ hero/landing concept variants
│   ├── page.tsx              # Index of all variants (auto-generated UI)
│   ├── INSPIRATION.md, INSPIRATION_V5_V20.md
│   ├── POLISH_NOTES.md, POLISH_NOTES_V5_V20.md
│   ├── QA_CHECKLIST.md
│   ├── _lib/                 # Shared mockup utilities
│   ├── v1-current/  v2-cosmos/  v3-editorial/ … v83-aetheris/
│   └── (each variant is a self-contained route with its own page.tsx + components)
│
├── ideas/                    # Unified concept catalog
│   ├── page.tsx              # Renders categorized cards for mockups + brand studies
│   └── _lib/
│
├── dashboard/                # Authenticated SaaS dashboard
│   ├── layout.tsx
│   ├── page.tsx
│   ├── account/
│   ├── domains/
│   ├── orders/
│   └── sites/
│
├── domains/                  # Public domain-purchase flow + /success
├── complete-profile/         # Post-signup profile completion
├── sign-in/                  # Clerk catch-all + sso-callback
├── sign-up/                  # Clerk catch-all + sso-callback
│
└── api/                      # ── Route handlers
    ├── ai/
    │   ├── commit/           # Save AI-generated site
    │   ├── draft/            # Generate draft
    │   ├── generate/         # Full generation
    │   └── preview/          # Preview render
    ├── contact/route.ts
    ├── domains/
    │   ├── route.ts
    │   ├── checkout/         # Stripe checkout for domain purchase
    │   ├── session/
    │   └── webhook/          # Stripe webhook
    ├── hosting/
    │   ├── checkout/
    │   ├── manage/           # Customer portal
    │   └── webhook/
    └── provision/            # Site provisioning pipeline
        ├── route.ts
        ├── dns/              # Namesilo DNS
        ├── github/           # Repo creation
        └── vercel/           # Vercel project creation
```

### Naming convention

Folders prefixed with `_` (e.g. `_components`, `_sections`, `_lib`) are **App Router private folders** — Next.js does not turn them into routes. Use this pattern for per-route helpers; never put route-eligible files there.

Catch-all auth routes use Clerk's `[[...sign-in]]` / `[[...sign-up]]` pattern.

---

## `src/components/` — Shared UI

```
components/
├── header.tsx
├── footer.tsx
├── layout-shell.tsx          # Wraps children with header/footer/page-transition
├── page-transition.tsx
├── back-to-top.tsx
├── browser-mockup.tsx        # Faux browser chrome for screenshots
├── cta-banner.tsx
├── logo.tsx
├── user-menu.tsx             # Clerk user button
│
├── ui/                       # shadcn/ui (8 components only — keep lean)
│   ├── badge.tsx  button.tsx  card.tsx  input.tsx
│   ├── label.tsx  separator.tsx  sheet.tsx  textarea.tsx
│
└── landman/                  # Components specific to /landman (don't reuse elsewhere)
    ├── hero.tsx  problem-section.tsx  audience-section.tsx
    ├── how-it-works.tsx  sources-section.tsx  final-cta.tsx
    ├── section-header.tsx  site-nav.tsx  site-footer.tsx
    ├── grain-overlay.tsx  topo-background.tsx
```

---

## `src/lib/` — Shared utilities

| File | Purpose |
|---|---|
| `portfolio.ts` | Registry of all customer sites (name, url, href, category, image, logo). Used by home + dashboard. |
| `landman.ts` | Data + types for `/landman` page. |
| `hosting-plans.ts` | Hosting tier definitions (priced via Stripe). |
| `provision.ts` | Site-provisioning pipeline helpers (Namesilo + GitHub + Vercel). |
| `ai-prompts.ts` | Anthropic/Gemini prompt templates for AI site generation. |
| `stripe.ts` | Stripe client + helpers. |
| `supabase.ts` | Server + client Supabase factories. |
| `useSupabase.ts` | React hook for client Supabase (auth bridged from Clerk). |
| `supabase-types.ts` | Generated DB types. |
| `rate-limit.ts` | In-memory rate limiter for API routes. |
| `animations.ts` | Reusable framer-motion variants (`fadeUp`, `stagger`, `staggerSlow`). |
| `utils.ts` | `cn` (clsx + tailwind-merge), misc. |
| `version.ts` | App version constant. |

---

## Data model (Supabase)

Single migration `001_initial_schema.sql`. Tables:

- **customers** — synced from Clerk (`clerk_id` unique).
- **domains** — Namesilo registrations per customer (status: pending/active/expired/transferred).
- **sites** — one site per domain. Tracks `github_repo`, `vercel_project_id`, `vercel_url`, `template_prompt`, status (provisioning/building/live/suspended).
- **orders** — Stripe-backed line items (type: domain/site_design/hosting), with `stripe_payment_intent_id` or `stripe_subscription_id`.

RLS policies are in the same migration. Service-role key bypasses them in API routes.

---

## Environment variables

See `CLAUDE.md` for the full table. Required keys (all in `.env.local`, never committed):

```
GOOGLE_API_KEY                        # Gemini
ANTHROPIC_API_KEY                     # Claude AI site builder
CLERK_SECRET_KEY
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
GITHUB_TOKEN                          # Repo provisioning
EWD_VERCEL_TOKEN                      # Vercel project provisioning
NAMESILO_API_KEY                      # Domain registration
```

Resend isn't in the CLAUDE.md table but the package is installed — check `src/app/api/contact/route.ts` if you touch contact-form code.

---

## Branches & current work

- **`main`** — production.
- **`feat/mockup-playground`** ← currently checked out. Lots of recent hero variant work (v73 marquee, v74–v83 cinematic concepts ported from motionsites.ai).
- **`feat/onboarding-wizard`** — separate WIP (worktree).

Recent commits (most recent first):
```
6d0043d feat(mockup): v74–v83 — 10 cinematic hero concepts
e48f764 feat(mockup): v73-marquee — cinematic streaming hero
b08f0ea feat(ideas): reorganize catalog by business type
c609d08 fix(ideas): drop V1 — Current Site baseline category
ad1d20b Revert "feat(ideas): add Built Sites section"
…
11a15a8 chore(lenis): purge Lenis smooth-scroll library from codebase
3c03a13 feat: remove Lenis smooth-scroll from all routes
```

**Lenis was deliberately removed** — do not reintroduce it. Native scroll only.

---

## Conventions and gotchas

1. **`use client` for animation-heavy pages.** Most marketing pages are client components because of framer-motion. RSC is used for layouts and simple pages.
2. **Per-site directories are self-contained.** A customer site lives in `src/app/sites/<slug>/` with its own `_lib/` (data) and `_sections/` (components). Don't pull these into shared `components/`.
3. **Mockup variants are throwaway-ish.** Each `v##-<name>/` is an isolated experiment. Don't refactor across them — they're meant to diverge.
4. **`/ideas` is the index.** When adding a new mockup or brand concept, also register it in `src/app/ideas/_lib/` so it shows up in the catalog.
5. **Brand studies are static HTML** in `public/concepts/`, served via the `/concepts` rewrite in `next.config.ts`. They're not React.
6. **Path alias:** `@/*` → `src/*` (per `tsconfig.json`).
7. **shadcn is intentionally minimal** — only 8 components installed. Add more sparingly.
8. **No test suite.** Verify changes with `npm run dev`, `npm run build`, `npm run lint`, and a browser check (per `CLAUDE.md`).

### Known quirks

- `next.config.ts` sets `typescript.ignoreBuildErrors: true` as a **temporary** measure during a mid-rename in `src/app/sites/desert-coyote-landscape/` (`palette.charcoal → palette.ink`). Revert that flag once the rename lands.
- `next.config.ts` also sets strict security headers (X-Frame-Options SAMEORIGIN, HSTS preload, etc.) — keep these intact.
- `tsconfig.tsbuildinfo` is ~2.8 MB and committed-into-the-repo-locally (not gitignored as `.tsbuildinfo` but `*.tsbuildinfo` is in `.gitignore`); leave it alone.

---

## Useful commands

```bash
npm run dev      # next dev (http://localhost:3000)
npm run build    # next build
npm run start    # next start
npm run lint     # eslint
```

Vercel CLI is linked (`.vercel/`). The Vercel plugin loaded in this Claude session has skills for `/deploy`, `/env`, `/status`, etc.

---

## Where to look first for common tasks

| Task | Start here |
|---|---|
| Add a new customer site | Copy `src/app/sites/lake-arthur/` as a template. Register in `src/lib/portfolio.ts`. |
| Add a new design mockup | Create `src/app/mockup/v##-<name>/page.tsx`. Register in `src/app/ideas/_lib/`. |
| Touch the home page | `src/app/page.tsx` (large client component). |
| Auth changes | `src/app/layout.tsx` (ClerkProvider) + `src/app/sign-{in,up}/`. **Risky — confirm before changing.** |
| DB schema change | Add a new migration file in `supabase/migrations/`. **Risky — confirm before changing.** |
| Stripe / billing | `src/app/api/{domains,hosting}/{checkout,webhook}/`. **Risky — confirm before changing.** |
| Provisioning pipeline | `src/lib/provision.ts` + `src/app/api/provision/{dns,github,vercel}/`. |
| AI site generation | `agent/system-prompt.md` + `agent/intake-schema.ts` + `src/app/api/ai/`. |
| Shared animation variants | `src/lib/animations.ts`. |

---

## Project rules (from `CLAUDE.md`)

The repo has a `CLAUDE.md` at the root — read it. Highlights:
- Never commit values for any of the env vars above.
- Treat any change to auth, billing, DB schema, infra, or external APIs as risky — flag it and confirm.
- Verify before claiming done: lint, typecheck, browser check.
