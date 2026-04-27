# Onboarding Wizard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the customer's auth-gated `/start` wizard that triages every visitor into one of four paths (just-host, redesign, new-byo-domain, new-with-domain) and lands them at a Stripe Checkout for the chosen build tier and hosting decision.

**Architecture:** Single-page client wizard at `/start?step=N`, framer-motion transitions, Supabase autosave keyed to `clerk_id`. New `/api/wizard/*` routes for session, autosave, checkout, and webhook. Pricing flows from a flexible catalog module (`pricing-catalog.ts`). Existing provision pipeline (`provisionSite`) triggers post-checkout via Stripe webhook.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Clerk v7, Supabase (Postgres + RLS), Stripe (Checkout Sessions API `2026-02-25.clover`), framer-motion, Vitest (new — for pure-function and route-handler tests).

**Spec:** `docs/superpowers/specs/2026-04-27-onboarding-wizard-design.md`

---

## File Structure

### New files

| Path | Purpose |
|------|---------|
| `vitest.config.ts` | Vitest configuration |
| `src/lib/pricing-catalog.ts` | Source of truth for tier prices, hosting terms, à la carte items |
| `src/lib/pricing-catalog.test.ts` | Tests for catalog accessors |
| `src/lib/wizard-types.ts` | Type definitions for wizard state, paths, answers |
| `src/lib/recommend-tier.ts` | `recommendTier(answers, path)` heuristic |
| `src/lib/recommend-tier.test.ts` | Tests for the heuristic |
| `supabase/migrations/002_wizard_sessions.sql` | New table + RLS |
| `supabase/migrations/003_sites_launch_state.sql` | Add `hosting_decision`, `grace_until`, `replicate_from_url` to `sites` |
| `src/app/api/wizard/session/route.ts` | `POST` to create/fetch active session |
| `src/app/api/wizard/session/[id]/route.ts` | `PATCH` for autosave |
| `src/app/api/wizard/checkout/just-host/route.ts` | `POST` — finalize Path 1 |
| `src/app/api/wizard/checkout/build/route.ts` | `POST` — finalize Paths 2/3/4 |
| `src/app/api/wizard/webhook/route.ts` | Stripe webhook for wizard-originated checkouts |
| `src/app/start/page.tsx` | The wizard route |
| `src/components/wizard/wizard-frame.tsx` | Outer shell, state, autosave, step routing |
| `src/components/wizard/step-have-site.tsx` | Q1 |
| `src/components/wizard/step-like-it.tsx` | Q2 (yes branch) |
| `src/components/wizard/step-have-domain.tsx` | Q2 (no branch) |
| `src/components/wizard/step-site-url.tsx` | Q3 (paths 1/2) |
| `src/components/wizard/step-domain-input.tsx` | Q3 (path 3) |
| `src/components/wizard/step-domain-search.tsx` | Q4 (path 4) |
| `src/components/wizard/step-business-info.tsx` | business name + industry |
| `src/components/wizard/step-hosting-term.tsx` | Q4 path 1 (hosting commitment) |
| `src/components/wizard/step-scope-picker.tsx` | Q5 paths 2/3/4 |
| `src/components/wizard/step-order-review.tsx` | Final review before checkout |
| `src/components/dashboard/launch-panel.tsx` | Post-build "host or take code" panel |

### Modified files

| Path | Change |
|------|--------|
| `package.json` | Add `vitest` + `test` script |
| `src/lib/supabase-types.ts` | Add `WizardSession`, update `Site` columns, add new enum types |
| `src/middleware.ts` | Add `/api/wizard/webhook(.*)` to public routes |
| `src/app/pricing/page.tsx` | Read tiers/hosting from `pricing-catalog.ts` |
| `src/app/page.tsx` | Update primary CTA target to `/start` |
| `src/app/dashboard/page.tsx` | Render `<LaunchPanel />` for sites needing a hosting decision |
| `src/lib/hosting-plans.ts` | **Delete** — superseded by `pricing-catalog.ts` |

---

## Conventions

- **Currency:** all prices in cents (matches existing `orders.amount_cents`)
- **Stripe API version:** `2026-02-25.clover` (already in `src/lib/stripe.ts`)
- **Supabase client:** API routes use `createServiceClient()` (bypasses RLS) and verify ownership manually via `clerk_id → customers.id` lookup. UI components use `createBrowserClient(token)` with the user's Clerk JWT so RLS applies.
- **Session ID:** URL search-param `?step=N&session=<uuid>` keeps the wizard refresh-safe and deep-linkable
- **Commit style:** match existing repo convention (`feat:`, `fix:`, `chore:`, `refactor:` prefixes; no scope jargon; one-line subject under ~70 chars)

---

## Task 1: Vitest setup

**Files:**
- Create: `vitest.config.ts`
- Modify: `package.json`

- [ ] **Step 1: Install Vitest**

```bash
npm install --save-dev vitest @vitest/ui
```

- [ ] **Step 2: Create `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
```

- [ ] **Step 3: Add `test` script to `package.json`**

In the `scripts` block, add a line:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 4: Verify Vitest runs (no tests yet → 0 pass)**

Run: `npm test`
Expected: Vitest exits 0 with "No test files found" or "0 tests passed". Either is success.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json vitest.config.ts
git commit -m "chore: add vitest test runner"
```

---

## Task 2: Pricing catalog module

**Files:**
- Create: `src/lib/pricing-catalog.ts`
- Create: `src/lib/pricing-catalog.test.ts`

- [ ] **Step 1: Write the failing test**

Create `src/lib/pricing-catalog.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import {
  tiers,
  hostingTerms,
  aLaCarte,
  replicationFlat,
  isTierSlug,
  isHostingTermSlug,
} from "./pricing-catalog";

describe("pricing catalog", () => {
  it("exposes three tiers in canonical order", () => {
    expect(Object.keys(tiers)).toEqual(["starter", "pro", "signature"]);
  });

  it("each tier has a positive price in cents", () => {
    for (const tier of Object.values(tiers)) {
      expect(tier.priceCents).toBeGreaterThan(0);
    }
  });

  it("only the pro tier is marked recommended", () => {
    expect(tiers.starter.recommended).toBeUndefined();
    expect(tiers.pro.recommended).toBe(true);
    expect(tiers.signature.recommended).toBeUndefined();
  });

  it("exposes 1yr / 3yr / 5yr hosting terms", () => {
    expect(Object.keys(hostingTerms)).toEqual(["1yr", "3yr", "5yr"]);
    expect(hostingTerms["1yr"].months).toBe(12);
    expect(hostingTerms["3yr"].months).toBe(36);
    expect(hostingTerms["5yr"].months).toBe(60);
  });

  it("à la carte includes extraPage at $50", () => {
    expect(aLaCarte.extraPage.priceCents).toBe(5000);
  });

  it("replication flat price equals starter tier price", () => {
    expect(replicationFlat.priceCents).toBe(tiers.starter.priceCents);
  });

  it("isTierSlug accepts known slugs and rejects others", () => {
    expect(isTierSlug("starter")).toBe(true);
    expect(isTierSlug("pro")).toBe(true);
    expect(isTierSlug("signature")).toBe(true);
    expect(isTierSlug("foo")).toBe(false);
    expect(isTierSlug("")).toBe(false);
  });

  it("isHostingTermSlug accepts known slugs and rejects others", () => {
    expect(isHostingTermSlug("1yr")).toBe(true);
    expect(isHostingTermSlug("3yr")).toBe(true);
    expect(isHostingTermSlug("5yr")).toBe(true);
    expect(isHostingTermSlug("2yr")).toBe(false);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL with "Cannot find module './pricing-catalog'"

- [ ] **Step 3: Implement the catalog**

Create `src/lib/pricing-catalog.ts`:

```ts
/**
 * Single source of truth for build pricing, hosting terms, and à la carte items.
 * The wizard, /pricing page, and recommendTier logic all read from here.
 *
 * Numbers marked `// TBD` are placeholders pending stakeholder confirmation.
 * They must be filled in before launch — see the "fill catalog" task.
 */

export const tiers = {
  starter: {
    slug: "starter" as const,
    name: "Starter",
    priceCents: 25000,
    pages: "1",
    revisions: 1,
    turnaroundDays: 5,
    custom: "template-skinned" as const,
    features: [
      "Single landing page",
      "Brand colors + fonts applied",
      "Mobile responsive",
      "Basic contact form",
      "Stock imagery",
    ],
  },
  pro: {
    slug: "pro" as const,
    name: "Pro",
    priceCents: 50000,
    pages: "up to 5",
    revisions: 2,
    turnaroundDays: 7,
    custom: "semi-custom" as const,
    features: [
      "Up to 5 pages",
      "Semi-custom design",
      "Light Motion animations",
      "Lead capture with email handoff",
      "Basic on-page SEO + sitemap",
      "Analytics setup",
    ],
    recommended: true,
  },
  signature: {
    slug: "signature" as const,
    name: "Signature",
    priceCents: 100000,
    pages: "up to 10",
    revisions: 3,
    turnaroundDays: 30,
    custom: "fully-custom" as const,
    features: [
      "Up to 10 pages",
      "Fully custom design",
      "Advanced Motion + scroll interactions",
      "Custom graphics / illustrations",
      "Full SEO including schema",
      "Copywriting polish",
      "CMS / easy-edit setup",
      "Lighthouse 90+ tuning",
      "30 days of post-launch tweaks",
    ],
  },
} as const;

export const hostingTerms = {
  "1yr": { slug: "1yr" as const, months: 12, monthlyCents: 0, label: "1 year" }, // TBD
  "3yr": { slug: "3yr" as const, months: 36, monthlyCents: 0, label: "3 years (best value)" }, // TBD
  "5yr": { slug: "5yr" as const, months: 60, monthlyCents: 0, label: "5 years" }, // TBD
} as const;

export const aLaCarte = {
  extraPage: { slug: "extra-page" as const, priceCents: 5000, label: "Extra page" },
  logo: { slug: "logo" as const, priceCents: 0, label: "Logo / brand work" }, // TBD
  maintenance: { slug: "maintenance" as const, priceCents: 0, label: "Monthly maintenance" }, // TBD
  ecommerce: { slug: "ecommerce" as const, priceCents: 0, label: "E-commerce" }, // TBD
  multilang: { slug: "multilang" as const, priceCents: 0, label: "Multi-language" }, // TBD
} as const;

export const replicationFlat = {
  priceCents: 25000,
};

export type TierSlug = keyof typeof tiers;
export type HostingTermSlug = keyof typeof hostingTerms;

export function isTierSlug(value: string): value is TierSlug {
  return value in tiers;
}

export function isHostingTermSlug(value: string): value is HostingTermSlug {
  return value in hostingTerms;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test`
Expected: 8/8 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/lib/pricing-catalog.ts src/lib/pricing-catalog.test.ts
git commit -m "feat: add pricing catalog as single source of truth"
```

---

## Task 3: Wizard type definitions

**Files:**
- Create: `src/lib/wizard-types.ts`

This task is types-only — no separate test file. Type correctness is verified by `tsc --noEmit` in the integration step.

- [ ] **Step 1: Create the file with all wizard types**

```ts
/**
 * Wizard state and path types. Source of truth for the shape passed
 * between WizardFrame, step components, and the autosave endpoint.
 */

import type { TierSlug, HostingTermSlug } from "./pricing-catalog";

export type WizardPath =
  | "just-host"   // existing site they like → we replicate + host
  | "redesign"    // existing site they want changed
  | "new-byo"     // new build, BYO domain
  | "new-domain"; // new build + domain via Porkbun

export interface WizardAnswers {
  hasSite?: boolean;
  likesIt?: boolean;
  hasDomain?: boolean;
  siteUrl?: string;
  domainName?: string;
  businessName?: string;
  industry?: string;
}

export interface SelectedDomain {
  name: string;
  priceCents: number;
}

export interface WizardState {
  sessionId: string;
  path?: WizardPath;
  answers: WizardAnswers;
  selectedTier?: TierSlug;
  recommendedTier?: TierSlug;
  selectedHostingTerm?: HostingTermSlug;
  selectedDomain?: SelectedDomain;
  completedAt?: string;
}

export type WizardStep =
  | "have-site"
  | "like-it"
  | "have-domain"
  | "site-url"
  | "domain-input"
  | "domain-search"
  | "business-info"
  | "hosting-term"
  | "scope"
  | "review";

/**
 * Returns the ordered list of steps for a given path.
 * Used by WizardFrame to compute progress and validate URL state.
 */
export function stepsForPath(path: WizardPath): WizardStep[] {
  switch (path) {
    case "just-host":
      return ["have-site", "like-it", "site-url", "hosting-term", "review"];
    case "redesign":
      return ["have-site", "like-it", "site-url", "business-info", "scope", "review"];
    case "new-byo":
      return ["have-site", "have-domain", "domain-input", "business-info", "scope", "review"];
    case "new-domain":
      return ["have-site", "have-domain", "business-info", "domain-search", "scope", "review"];
  }
}

/**
 * Resolve the path from collected answers.
 * Returns undefined until enough answers are present to disambiguate.
 */
export function resolvePath(answers: WizardAnswers): WizardPath | undefined {
  if (answers.hasSite === true) {
    if (answers.likesIt === true) return "just-host";
    if (answers.likesIt === false) return "redesign";
    return undefined;
  }
  if (answers.hasSite === false) {
    if (answers.hasDomain === true) return "new-byo";
    if (answers.hasDomain === false) return "new-domain";
    return undefined;
  }
  return undefined;
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/wizard-types.ts
git commit -m "feat: add wizard state types and path resolver"
```

---

## Task 4: recommendTier heuristic

**Files:**
- Create: `src/lib/recommend-tier.ts`
- Create: `src/lib/recommend-tier.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
import { describe, it, expect } from "vitest";
import { recommendTier, HEAVY_INDUSTRIES } from "./recommend-tier";

describe("recommendTier", () => {
  it("returns starter for the just-host path regardless of answers", () => {
    expect(recommendTier({ industry: "ecommerce" }, "just-host")).toBe("starter");
    expect(recommendTier({}, "just-host")).toBe("starter");
  });

  it("returns signature for redesign with a heavy industry", () => {
    expect(recommendTier({ industry: "ecommerce" }, "redesign")).toBe("signature");
    expect(recommendTier({ industry: "saas" }, "new-byo")).toBe("signature");
  });

  it("returns pro by default for design paths", () => {
    expect(recommendTier({ industry: "lawyer" }, "redesign")).toBe("pro");
    expect(recommendTier({ industry: "restaurant" }, "new-byo")).toBe("pro");
    expect(recommendTier({ industry: "contractor" }, "new-domain")).toBe("pro");
  });

  it("returns pro when industry is missing on a design path", () => {
    expect(recommendTier({}, "redesign")).toBe("pro");
    expect(recommendTier({}, "new-byo")).toBe("pro");
    expect(recommendTier({}, "new-domain")).toBe("pro");
  });

  it("HEAVY_INDUSTRIES contains the four expected slugs", () => {
    expect(HEAVY_INDUSTRIES).toEqual([
      "ecommerce",
      "marketplace",
      "saas",
      "real-estate-portal",
    ]);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL with "Cannot find module './recommend-tier'"

- [ ] **Step 3: Implement**

Create `src/lib/recommend-tier.ts`:

```ts
import type { TierSlug } from "./pricing-catalog";
import type { WizardAnswers, WizardPath } from "./wizard-types";

/**
 * Industries whose typical site complexity warrants the Signature tier.
 * Heuristic — customer always overrides.
 */
export const HEAVY_INDUSTRIES = [
  "ecommerce",
  "marketplace",
  "saas",
  "real-estate-portal",
] as const;

/**
 * Suggest a tier based on the customer's path and answers.
 * Pure function — the customer can always override the suggestion in the UI.
 */
export function recommendTier(
  answers: Partial<WizardAnswers>,
  path: WizardPath
): TierSlug {
  if (path === "just-host") return "starter";
  if (answers.industry && (HEAVY_INDUSTRIES as readonly string[]).includes(answers.industry)) {
    return "signature";
  }
  return "pro";
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test`
Expected: 5/5 recommend-tier tests pass + 8/8 catalog tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/lib/recommend-tier.ts src/lib/recommend-tier.test.ts
git commit -m "feat: add recommendTier heuristic for scope picker"
```

---

## Task 5: wizard_sessions migration

**Files:**
- Create: `supabase/migrations/002_wizard_sessions.sql`
- Modify: `src/lib/supabase-types.ts`

- [ ] **Step 1: Write the migration SQL**

Create `supabase/migrations/002_wizard_sessions.sql`:

```sql
-- ============================================================================
-- 002 — Wizard Sessions
-- Persists in-progress /start wizard answers per customer.
-- One active session per customer at a time (enforced by app logic + index).
-- ============================================================================

create table public.wizard_sessions (
  id                     uuid primary key default gen_random_uuid(),
  customer_id            uuid not null references public.customers(id) on delete cascade,
  path                   text check (path in ('just-host', 'redesign', 'new-byo', 'new-domain')),
  answers                jsonb not null default '{}'::jsonb,
  selected_tier          text check (selected_tier in ('starter', 'pro', 'signature')),
  recommended_tier       text check (recommended_tier in ('starter', 'pro', 'signature')),
  selected_hosting_term  text check (selected_hosting_term in ('1yr', '3yr', '5yr')),
  selected_domain        jsonb,
  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now(),
  completed_at           timestamptz
);

comment on table public.wizard_sessions is 'In-progress /start wizard answers per customer.';

create index idx_wizard_sessions_customer_id on public.wizard_sessions(customer_id);
create index idx_wizard_sessions_active on public.wizard_sessions(customer_id) where completed_at is null;

create trigger trg_wizard_sessions_updated_at
  before update on public.wizard_sessions
  for each row execute function public.set_updated_at();

-- ─── Row-Level Security ─────────────────────────────────────────────────────

alter table public.wizard_sessions enable row level security;

create policy "wizard_sessions_select_own"
  on public.wizard_sessions for select
  using (customer_id = public.current_customer_id());

create policy "wizard_sessions_insert_own"
  on public.wizard_sessions for insert
  with check (customer_id = public.current_customer_id());

create policy "wizard_sessions_update_own"
  on public.wizard_sessions for update
  using (customer_id = public.current_customer_id())
  with check (customer_id = public.current_customer_id());

create policy "wizard_sessions_delete_own"
  on public.wizard_sessions for delete
  using (customer_id = public.current_customer_id());
```

- [ ] **Step 2: Apply the migration to Supabase**

Open Supabase SQL editor (project linked in `.env.local` via `NEXT_PUBLIC_SUPABASE_URL`). Paste the contents of `002_wizard_sessions.sql` and run it.

Expected: success message, table appears under "public" schema.

- [ ] **Step 3: Verify the table exists by querying**

In the Supabase SQL editor:

```sql
select count(*) from public.wizard_sessions;
```

Expected: returns `0`.

- [ ] **Step 4: Update `supabase-types.ts`**

Open `src/lib/supabase-types.ts`. After the existing `SiteDraft` types (around line 73), add:

```ts
export interface WizardSession {
  id: string;
  customer_id: string;
  path: "just-host" | "redesign" | "new-byo" | "new-domain" | null;
  answers: Record<string, unknown>;
  selected_tier: "starter" | "pro" | "signature" | null;
  recommended_tier: "starter" | "pro" | "signature" | null;
  selected_hosting_term: "1yr" | "3yr" | "5yr" | null;
  selected_domain: { name: string; priceCents: number } | null;
  created_at: string;
  updated_at: string;
  completed_at: string | null;
}

export interface WizardSessionInsert {
  id?: string;
  customer_id: string;
  path?: "just-host" | "redesign" | "new-byo" | "new-domain" | null;
  answers?: Record<string, unknown>;
  selected_tier?: "starter" | "pro" | "signature" | null;
  recommended_tier?: "starter" | "pro" | "signature" | null;
  selected_hosting_term?: "1yr" | "3yr" | "5yr" | null;
  selected_domain?: { name: string; priceCents: number } | null;
  created_at?: string;
  updated_at?: string;
  completed_at?: string | null;
}

export type WizardSessionUpdate = Partial<Omit<WizardSession, "id">>;
```

In the same file, find the `Database` interface and add `wizard_sessions` under `Tables`:

```ts
wizard_sessions: {
  Row: WizardSession;
  Insert: WizardSessionInsert;
  Update: WizardSessionUpdate;
};
```

- [ ] **Step 5: Verify types compile**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add supabase/migrations/002_wizard_sessions.sql src/lib/supabase-types.ts
git commit -m "feat: add wizard_sessions table with RLS"
```

---

## Task 6: sites launch state migration

**Files:**
- Create: `supabase/migrations/003_sites_launch_state.sql`
- Modify: `src/lib/supabase-types.ts`

- [ ] **Step 1: Write the migration SQL**

Create `supabase/migrations/003_sites_launch_state.sql`:

```sql
-- ============================================================================
-- 003 — Sites launch state
-- Adds columns to sites for the post-build launch decision and the just-host
-- replication queue marker.
-- ============================================================================

alter table public.sites
  add column hosting_decision text check (hosting_decision in ('hosted', 'self-host')),
  add column grace_until timestamptz,
  add column replicate_from_url text;

comment on column public.sites.hosting_decision is
  'NULL = not yet decided. ''hosted'' = customer chose to host with us. ''self-host'' = customer took the code.';
comment on column public.sites.grace_until is
  'For self-host sites: editor remains accessible until this timestamp (default: 7 days post-decision).';
comment on column public.sites.replicate_from_url is
  'For just-host path: URL of the existing site that the team should replicate.';
```

- [ ] **Step 2: Apply the migration**

Open Supabase SQL editor and run the contents of `003_sites_launch_state.sql`.

Expected: success.

- [ ] **Step 3: Verify the columns exist**

```sql
select column_name from information_schema.columns
where table_name = 'sites' and column_name in ('hosting_decision', 'grace_until', 'replicate_from_url');
```

Expected: 3 rows returned.

- [ ] **Step 4: Update `supabase-types.ts`**

In `src/lib/supabase-types.ts`, update the `Site` interface (around lines 36–48). Add three optional fields:

```ts
export interface Site {
  id: string;
  customer_id: string;
  domain_id: string | null;
  name: string;
  github_repo: string | null;
  vercel_project_id: string | null;
  vercel_url: string | null;
  status: SiteStatus;
  template_prompt: string | null;
  hosting_decision: "hosted" | "self-host" | null;
  grace_until: string | null;
  replicate_from_url: string | null;
  created_at: string;
  updated_at: string;
}
```

Also update `SiteInsert` and `SiteUpdate` to include the same optional fields.

```ts
export interface SiteInsert {
  id?: string;
  customer_id: string;
  domain_id?: string | null;
  name: string;
  github_repo?: string | null;
  vercel_project_id?: string | null;
  vercel_url?: string | null;
  status?: SiteStatus;
  template_prompt?: string | null;
  hosting_decision?: "hosted" | "self-host" | null;
  grace_until?: string | null;
  replicate_from_url?: string | null;
  created_at?: string;
  updated_at?: string;
}
```

(`SiteUpdate` is `Partial<Omit<Site, "id">>` and picks up the changes automatically.)

- [ ] **Step 5: Verify**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add supabase/migrations/003_sites_launch_state.sql src/lib/supabase-types.ts
git commit -m "feat: add hosting_decision and grace_until columns to sites"
```

---

## Task 7: Wizard session API — create and fetch active

**Files:**
- Create: `src/app/api/wizard/session/route.ts`

This endpoint handles `POST /api/wizard/session` to either fetch the customer's active (un-completed) wizard session, or create a new one.

- [ ] **Step 1: Implement the route**

```ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createServiceClient } from "@/lib/supabase";

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * POST /api/wizard/session
 *
 * Returns the calling customer's active (incomplete) wizard session,
 * or creates a new one if none exists.
 *
 * Response: { session: WizardSession }
 */
export async function POST() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createServiceClient();

  // Resolve customer
  const { data: customer, error: custErr } = await (supabase
    .from("customers") as any)
    .select("id")
    .eq("clerk_id", userId)
    .single();

  if (custErr || !customer) {
    return NextResponse.json({ error: "Customer record not found" }, { status: 404 });
  }

  // Look for an existing active session
  const { data: existing } = await (supabase.from("wizard_sessions") as any)
    .select("*")
    .eq("customer_id", customer.id)
    .is("completed_at", null)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (existing) {
    return NextResponse.json({ session: existing });
  }

  // Create a fresh session
  const { data: created, error: insertErr } = await (supabase
    .from("wizard_sessions") as any)
    .insert({ customer_id: customer.id })
    .select("*")
    .single();

  if (insertErr || !created) {
    console.error("[Wizard Session] Failed to create:", insertErr);
    return NextResponse.json({ error: "Failed to create session" }, { status: 500 });
  }

  return NextResponse.json({ session: created });
}
```

- [ ] **Step 2: Manual verification with curl**

Start the dev server in another terminal: `npm run dev`

Sign in via the browser at http://localhost:3000/sign-in to obtain a Clerk session, then in the browser console at any signed-in page run:

```js
fetch("/api/wizard/session", { method: "POST" })
  .then(r => r.json())
  .then(console.log)
```

Expected: `{ session: { id: "...", customer_id: "...", answers: {}, ... } }`

Run the same call again — it should return the **same** session ID (existing-session reuse).

- [ ] **Step 3: Commit**

```bash
git add src/app/api/wizard/session/route.ts
git commit -m "feat: add POST /api/wizard/session endpoint"
```

---

## Task 8: Wizard session autosave endpoint

**Files:**
- Create: `src/app/api/wizard/session/[id]/route.ts`

Handles `PATCH /api/wizard/session/:id` to persist partial wizard state.

- [ ] **Step 1: Implement**

```ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createServiceClient } from "@/lib/supabase";
import { isTierSlug, isHostingTermSlug } from "@/lib/pricing-catalog";

/* eslint-disable @typescript-eslint/no-explicit-any */

const ALLOWED_PATHS = new Set(["just-host", "redesign", "new-byo", "new-domain"]);

/**
 * PATCH /api/wizard/session/:id
 *
 * Autosaves wizard state. Body keys are optional and are merged onto the row.
 * The caller must own the session (verified via clerk_id → customer).
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  if (!id) {
    return NextResponse.json({ error: "Missing session id" }, { status: 400 });
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const supabase = createServiceClient();

  // Resolve customer + verify ownership
  const { data: customer } = await (supabase.from("customers") as any)
    .select("id")
    .eq("clerk_id", userId)
    .single();

  if (!customer) {
    return NextResponse.json({ error: "Customer not found" }, { status: 404 });
  }

  const { data: session } = await (supabase.from("wizard_sessions") as any)
    .select("id, customer_id, completed_at")
    .eq("id", id)
    .single();

  if (!session) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }
  if (session.customer_id !== customer.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  if (session.completed_at) {
    return NextResponse.json({ error: "Session already completed" }, { status: 409 });
  }

  // Build the update payload from validated keys only
  const update: Record<string, unknown> = {};
  if (typeof body.path === "string" && ALLOWED_PATHS.has(body.path)) {
    update.path = body.path;
  }
  if (body.answers && typeof body.answers === "object") {
    update.answers = body.answers;
  }
  if (typeof body.selectedTier === "string" && isTierSlug(body.selectedTier)) {
    update.selected_tier = body.selectedTier;
  }
  if (typeof body.recommendedTier === "string" && isTierSlug(body.recommendedTier)) {
    update.recommended_tier = body.recommendedTier;
  }
  if (
    typeof body.selectedHostingTerm === "string" &&
    isHostingTermSlug(body.selectedHostingTerm)
  ) {
    update.selected_hosting_term = body.selectedHostingTerm;
  }
  if (
    body.selectedDomain &&
    typeof body.selectedDomain.name === "string" &&
    typeof body.selectedDomain.priceCents === "number"
  ) {
    update.selected_domain = {
      name: body.selectedDomain.name,
      priceCents: body.selectedDomain.priceCents,
    };
  }

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
  }

  const { data: updated, error } = await (supabase.from("wizard_sessions") as any)
    .update(update)
    .eq("id", id)
    .select("*")
    .single();

  if (error || !updated) {
    console.error("[Wizard Session PATCH] Failed:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }

  return NextResponse.json({ session: updated });
}
```

- [ ] **Step 2: Manual verification**

In a signed-in browser console (with `<sessionId>` from Task 7):

```js
fetch("/api/wizard/session/<sessionId>", {
  method: "PATCH",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    path: "redesign",
    answers: { hasSite: true, likesIt: false, siteUrl: "example.com" },
    selectedTier: "pro",
  })
}).then(r => r.json()).then(console.log)
```

Expected: response includes the updated `session` row with the new `path`, `answers`, and `selected_tier`.

- [ ] **Step 3: Commit**

```bash
git add src/app/api/wizard/session/\[id\]/route.ts
git commit -m "feat: add PATCH /api/wizard/session/:id autosave endpoint"
```

---

## Task 9: Just-host checkout endpoint

**Files:**
- Create: `src/app/api/wizard/checkout/just-host/route.ts`

Creates a Stripe Checkout Session for a Path-1 customer: bundles the $250 replication build (one-time) with the chosen hosting term (recurring) in a single subscription-mode Checkout Session.

- [ ] **Step 1: Implement**

```ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getStripe } from "@/lib/stripe";
import { createServiceClient } from "@/lib/supabase";
import { hostingTerms, replicationFlat, isHostingTermSlug } from "@/lib/pricing-catalog";

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * POST /api/wizard/checkout/just-host
 *
 * Body: { sessionId: string }
 *
 * Reads the wizard session, validates Path 1 fields, creates a Stripe Checkout
 * Session (subscription mode) with both the build and hosting line items, and
 * returns the Stripe URL for client-side redirect.
 */
export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { sessionId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { sessionId } = body;
  if (!sessionId) {
    return NextResponse.json({ error: "sessionId required" }, { status: 400 });
  }

  const supabase = createServiceClient();

  const { data: customer } = await (supabase.from("customers") as any)
    .select("id, email")
    .eq("clerk_id", userId)
    .single();
  if (!customer) {
    return NextResponse.json({ error: "Customer not found" }, { status: 404 });
  }

  const { data: session } = await (supabase.from("wizard_sessions") as any)
    .select("*")
    .eq("id", sessionId)
    .single();
  if (!session) {
    return NextResponse.json({ error: "Wizard session not found" }, { status: 404 });
  }
  if (session.customer_id !== customer.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  if (session.path !== "just-host") {
    return NextResponse.json({ error: "Wrong wizard path" }, { status: 400 });
  }

  const term = session.selected_hosting_term;
  if (!term || !isHostingTermSlug(term)) {
    return NextResponse.json({ error: "Hosting term not selected" }, { status: 400 });
  }

  const siteUrl = session.answers?.siteUrl;
  if (typeof siteUrl !== "string" || siteUrl.length === 0) {
    return NextResponse.json({ error: "Site URL missing in answers" }, { status: 400 });
  }

  const hostingTerm = hostingTerms[term];
  if (hostingTerm.monthlyCents <= 0) {
    return NextResponse.json(
      { error: "Hosting price not configured — fill the catalog first" },
      { status: 500 }
    );
  }

  const origin = req.nextUrl.origin;

  try {
    const checkout = await getStripe().checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: customer.email,
      line_items: [
        // Recurring hosting line
        {
          price_data: {
            currency: "usd",
            product_data: { name: `KPT Hosting (${hostingTerm.label})` },
            unit_amount: hostingTerm.monthlyCents,
            recurring: { interval: "month" },
          },
          quantity: 1,
        },
        // One-time build (replication) — Stripe attaches this to the first invoice
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "KPT Site Replication",
              description: `One-time rebuild of ${siteUrl} on KPT's platform.`,
            },
            unit_amount: replicationFlat.priceCents,
          },
          quantity: 1,
        },
      ],
      metadata: {
        wizardSessionId: session.id,
        customerId: customer.id,
        wizardPath: "just-host",
        hostingTerm: term,
        siteUrl,
      },
      success_url: `${origin}/dashboard?wizard=success`,
      cancel_url: `${origin}/start?step=review&session=${session.id}&cancelled=1`,
    });

    return NextResponse.json({ url: checkout.url });
  } catch (err) {
    console.error("[Wizard JustHost] Stripe error:", err);
    return NextResponse.json({ error: "Stripe error" }, { status: 500 });
  }
}
```

- [ ] **Step 2: Verify type check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/api/wizard/checkout/just-host/route.ts
git commit -m "feat: add wizard just-host checkout endpoint"
```

---

## Task 10: Build checkout endpoint

**Files:**
- Create: `src/app/api/wizard/checkout/build/route.ts`

Handles paths 2/3/4 — build-only checkout (one-time payment), with optional domain registration line item for path 4.

- [ ] **Step 1: Implement**

```ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getStripe } from "@/lib/stripe";
import { createServiceClient } from "@/lib/supabase";
import { tiers, isTierSlug } from "@/lib/pricing-catalog";

/* eslint-disable @typescript-eslint/no-explicit-any */

const DESIGN_PATHS = new Set(["redesign", "new-byo", "new-domain"]);

/**
 * POST /api/wizard/checkout/build
 *
 * Body: { sessionId: string }
 *
 * Validates a design-path wizard session and creates a Stripe Checkout
 * (mode: payment) with the build line item. Path "new-domain" adds a
 * second line item for domain registration using the priced domain
 * already saved on the session.
 */
export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { sessionId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { sessionId } = body;
  if (!sessionId) {
    return NextResponse.json({ error: "sessionId required" }, { status: 400 });
  }

  const supabase = createServiceClient();

  const { data: customer } = await (supabase.from("customers") as any)
    .select("id, email")
    .eq("clerk_id", userId)
    .single();
  if (!customer) {
    return NextResponse.json({ error: "Customer not found" }, { status: 404 });
  }

  const { data: session } = await (supabase.from("wizard_sessions") as any)
    .select("*")
    .eq("id", sessionId)
    .single();
  if (!session) {
    return NextResponse.json({ error: "Wizard session not found" }, { status: 404 });
  }
  if (session.customer_id !== customer.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  if (!session.path || !DESIGN_PATHS.has(session.path)) {
    return NextResponse.json({ error: "Wrong wizard path" }, { status: 400 });
  }

  const tierSlug = session.selected_tier;
  if (!tierSlug || !isTierSlug(tierSlug)) {
    return NextResponse.json({ error: "Tier not selected" }, { status: 400 });
  }

  const tier = tiers[tierSlug];
  if (tier.priceCents <= 0) {
    return NextResponse.json(
      { error: "Tier price not configured" },
      { status: 500 }
    );
  }

  const businessName = session.answers?.businessName ?? "Customer site";

  const lineItems: any[] = [
    {
      price_data: {
        currency: "usd",
        product_data: {
          name: `${tier.name} build`,
          description: `${tier.pages} page(s) · ${tier.turnaroundDays}-day turnaround`,
        },
        unit_amount: tier.priceCents,
      },
      quantity: 1,
    },
  ];

  if (session.path === "new-domain") {
    const dom = session.selected_domain;
    if (!dom?.name || typeof dom.priceCents !== "number" || dom.priceCents <= 0) {
      return NextResponse.json(
        { error: "Domain not selected for new-domain path" },
        { status: 400 }
      );
    }
    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: `Domain registration: ${dom.name}`,
          description: "1-year registration via KPT",
        },
        unit_amount: dom.priceCents,
      },
      quantity: 1,
    });
  }

  const origin = req.nextUrl.origin;

  try {
    const checkout = await getStripe().checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: customer.email,
      line_items: lineItems,
      metadata: {
        wizardSessionId: session.id,
        customerId: customer.id,
        wizardPath: session.path,
        tier: tierSlug,
        businessName: String(businessName),
        ...(session.path === "new-domain" && session.selected_domain
          ? { domainName: session.selected_domain.name }
          : {}),
        ...(session.path === "new-byo" && session.answers?.domainName
          ? { domainName: String(session.answers.domainName) }
          : {}),
        ...(session.answers?.siteUrl
          ? { existingSiteUrl: String(session.answers.siteUrl) }
          : {}),
      },
      success_url: `${origin}/dashboard?wizard=success`,
      cancel_url: `${origin}/start?step=review&session=${session.id}&cancelled=1`,
    });

    return NextResponse.json({ url: checkout.url });
  } catch (err) {
    console.error("[Wizard Build Checkout] Stripe error:", err);
    return NextResponse.json({ error: "Stripe error" }, { status: 500 });
  }
}
```

- [ ] **Step 2: Verify type check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/api/wizard/checkout/build/route.ts
git commit -m "feat: add wizard build checkout endpoint for design paths"
```

---

## Task 11: Wizard webhook + middleware update

**Files:**
- Create: `src/app/api/wizard/webhook/route.ts`
- Modify: `src/middleware.ts`

The webhook handles `checkout.session.completed` for both wizard checkout types: marks the wizard session complete, inserts the order(s), creates a `sites` row for build paths, and triggers `provisionSite` for design paths.

- [ ] **Step 1: Implement the webhook**

```ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { createServiceClient } from "@/lib/supabase";
import { tiers, replicationFlat, isTierSlug, isHostingTermSlug } from "@/lib/pricing-catalog";
import { provisionSite, sanitizeRepoName } from "@/lib/provision";

/* eslint-disable @typescript-eslint/no-explicit-any */

const WEBHOOK_SECRET = process.env.STRIPE_WIZARD_WEBHOOK_SECRET || process.env.STRIPE_WEBHOOK_SECRET;

/**
 * POST /api/wizard/webhook
 *
 * Stripe webhook handler for wizard-originated checkouts.
 * Discriminates by metadata.wizardPath and metadata.wizardSessionId.
 */
export async function POST(req: NextRequest) {
  const body = await req.text();
  let event: Stripe.Event;

  if (!WEBHOOK_SECRET) {
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
    }
    event = JSON.parse(body) as Stripe.Event;
  } else {
    const sig = req.headers.get("stripe-signature");
    if (!sig) return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    try {
      event = getStripe().webhooks.constructEvent(body, sig, WEBHOOK_SECRET);
    } catch (err) {
      console.error("[Wizard Webhook] Bad signature:", err);
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const meta = session.metadata ?? {};
  if (!meta.wizardSessionId || !meta.customerId || !meta.wizardPath) {
    return NextResponse.json({ received: true });
  }

  const supabase = createServiceClient();

  try {
    // Mark wizard session completed
    await (supabase.from("wizard_sessions") as any)
      .update({ completed_at: new Date().toISOString() })
      .eq("id", meta.wizardSessionId);

    if (meta.wizardPath === "just-host") {
      await handleJustHost(session, meta, supabase);
    } else {
      await handleBuild(session, meta, supabase);
    }
  } catch (err) {
    console.error("[Wizard Webhook] Handler error:", err);
    // Return 200 anyway — Stripe retries forever otherwise.
  }

  return NextResponse.json({ received: true });
}

async function handleJustHost(
  session: Stripe.Checkout.Session,
  meta: Record<string, string>,
  supabase: ReturnType<typeof createServiceClient>
) {
  const subscriptionId = typeof session.subscription === "string"
    ? session.subscription
    : (session.subscription as Stripe.Subscription | null)?.id ?? null;
  const paymentIntentId = typeof session.payment_intent === "string"
    ? session.payment_intent
    : null;

  // Build (one-time) order
  await (supabase.from("orders") as any).insert({
    customer_id: meta.customerId,
    type: "site_design",
    amount_cents: replicationFlat.priceCents,
    currency: "usd",
    stripe_payment_intent_id: paymentIntentId,
    status: "paid",
  });

  // Hosting (subscription) order — amount captured from Stripe at first invoice
  if (isHostingTermSlug(meta.hostingTerm)) {
    // Look up the actual amount from the session's line items if available;
    // fall back to 0 so we don't insert wrong numbers.
    await (supabase.from("orders") as any).insert({
      customer_id: meta.customerId,
      type: "hosting",
      amount_cents: session.amount_total ?? 0,
      currency: "usd",
      stripe_subscription_id: subscriptionId,
      stripe_payment_intent_id: paymentIntentId,
      status: "paid",
    });
  }

  // Site row (provisioning will be done manually by the team — flagged via replicate_from_url)
  const name = meta.siteUrl ? meta.siteUrl.replace(/^https?:\/\//, "") : "Replicated site";
  await (supabase.from("sites") as any).insert({
    customer_id: meta.customerId,
    name,
    status: "provisioning",
    replicate_from_url: meta.siteUrl ?? null,
    hosting_decision: "hosted", // bundled at checkout, no post-build choice
  });
}

async function handleBuild(
  session: Stripe.Checkout.Session,
  meta: Record<string, string>,
  supabase: ReturnType<typeof createServiceClient>
) {
  const paymentIntentId = typeof session.payment_intent === "string"
    ? session.payment_intent
    : null;
  const tierSlug = meta.tier;
  const tierAmount = isTierSlug(tierSlug) ? tiers[tierSlug].priceCents : 0;

  // Build order
  const { data: order } = await (supabase.from("orders") as any)
    .insert({
      customer_id: meta.customerId,
      type: "site_design",
      amount_cents: tierAmount,
      currency: "usd",
      stripe_payment_intent_id: paymentIntentId,
      status: "paid",
    })
    .select("id")
    .single();

  // Domain registration order (only for new-domain path)
  if (meta.wizardPath === "new-domain" && meta.domainName) {
    const domainAmount = (session.amount_total ?? 0) - tierAmount;
    await (supabase.from("orders") as any).insert({
      customer_id: meta.customerId,
      type: "domain",
      amount_cents: domainAmount,
      currency: "usd",
      stripe_payment_intent_id: paymentIntentId,
      status: "paid",
    });
    await (supabase.from("domains") as any).insert({
      customer_id: meta.customerId,
      domain_name: meta.domainName,
      registrar: "porkbun",
      status: "pending",
    });
  }

  // Site row
  const name = meta.businessName || "New site";
  const { data: site } = await (supabase.from("sites") as any)
    .insert({
      customer_id: meta.customerId,
      name,
      status: "provisioning",
    })
    .select("id")
    .single();

  // Kick off provisioning for design paths (existing pipeline)
  if (site?.id) {
    const domain = meta.domainName ?? sanitizeRepoName(name);
    try {
      await provisionSite({
        customerId: meta.customerId,
        domainName: domain,
        sitePrompt: meta.businessName ?? "",
        orderId: order?.id ?? "",
      });
    } catch (err) {
      console.error("[Wizard Webhook] provisionSite failed:", err);
      // Site row remains in 'provisioning' — team can investigate.
    }
  }
}
```

- [ ] **Step 2: Add webhook to public route allowlist**

Edit `src/middleware.ts`. In the `isPublicRoute` matcher array, add `"/api/wizard/webhook(.*)",` next to the other webhook entries:

```ts
const isPublicRoute = createRouteMatcher([
  "/",
  "/pricing(.*)",
  "/contact(.*)",
  "/about(.*)",
  "/sites/(.*)",
  "/domains",
  "/domains/success(.*)",
  "/api/domains",
  "/api/domains/session(.*)",
  "/api/domains/webhook(.*)",
  "/api/hosting/webhook(.*)",
  "/api/wizard/webhook(.*)",
  "/api/contact(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/complete-profile(.*)",
  "/neo(.*)",
  "/landman(.*)",
]);
```

- [ ] **Step 3: Verify type check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/api/wizard/webhook/route.ts src/middleware.ts
git commit -m "feat: add wizard Stripe webhook + public route"
```

---

## Task 12: WizardFrame shell component

**Files:**
- Create: `src/components/wizard/wizard-frame.tsx`

The outer shell: handles auth, session bootstrapping, autosave, step routing, progress bar, and framer-motion transitions.

- [ ] **Step 1: Implement**

```tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import type {
  WizardState,
  WizardStep,
  WizardAnswers,
  SelectedDomain,
} from "@/lib/wizard-types";
import { stepsForPath, resolvePath } from "@/lib/wizard-types";
import type { TierSlug, HostingTermSlug } from "@/lib/pricing-catalog";

type Patch = Partial<{
  path: WizardState["path"];
  answers: WizardAnswers;
  selectedTier: TierSlug;
  recommendedTier: TierSlug;
  selectedHostingTerm: HostingTermSlug;
  selectedDomain: SelectedDomain;
}>;

export interface WizardFrameProps {
  renderStep: (
    step: WizardStep,
    state: WizardState,
    actions: {
      patch: (p: Patch) => Promise<void>;
      goNext: () => void;
      goBack: () => void;
    }
  ) => React.ReactNode;
}

const FIRST_STEP: WizardStep = "have-site";

export function WizardFrame({ renderStep }: WizardFrameProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [state, setState] = useState<WizardState | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Bootstrap session on mount
  useEffect(() => {
    let cancelled = false;
    fetch("/api/wizard/session", { method: "POST" })
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        if (!data.session) {
          setError(data.error ?? "Failed to load session");
          return;
        }
        const s = data.session;
        setState({
          sessionId: s.id,
          path: s.path ?? undefined,
          answers: (s.answers ?? {}) as WizardAnswers,
          selectedTier: s.selected_tier ?? undefined,
          recommendedTier: s.recommended_tier ?? undefined,
          selectedHostingTerm: s.selected_hosting_term ?? undefined,
          selectedDomain: s.selected_domain ?? undefined,
          completedAt: s.completed_at ?? undefined,
        });
      })
      .catch((e) => !cancelled && setError(String(e)));
    return () => {
      cancelled = true;
    };
  }, []);

  const patch = useCallback(
    async (p: Patch) => {
      if (!state) return;
      // Optimistic local merge
      const next: WizardState = {
        ...state,
        ...p,
        answers: { ...state.answers, ...(p.answers ?? {}) },
      };
      // Path may resolve once the relevant answer arrives
      const resolved = resolvePath(next.answers);
      if (resolved && next.path !== resolved) next.path = resolved;
      setState(next);

      // Server save
      await fetch(`/api/wizard/session/${state.sessionId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...(next.path !== state.path ? { path: next.path } : {}),
          ...(p.answers ? { answers: next.answers } : {}),
          ...(p.selectedTier ? { selectedTier: p.selectedTier } : {}),
          ...(p.recommendedTier ? { recommendedTier: p.recommendedTier } : {}),
          ...(p.selectedHostingTerm ? { selectedHostingTerm: p.selectedHostingTerm } : {}),
          ...(p.selectedDomain ? { selectedDomain: p.selectedDomain } : {}),
        }),
      });
    },
    [state]
  );

  const currentStep: WizardStep = (searchParams.get("step") as WizardStep) ?? FIRST_STEP;

  const goNext = useCallback(() => {
    if (!state?.path) {
      // Path not yet known — advance one of the early branching steps
      router.push(`/start?step=${nextEarlyStep(currentStep, state)}`);
      return;
    }
    const seq = stepsForPath(state.path);
    const idx = seq.indexOf(currentStep);
    if (idx >= 0 && idx < seq.length - 1) {
      router.push(`/start?step=${seq[idx + 1]}`);
    }
  }, [state, currentStep, router]);

  const goBack = useCallback(() => {
    router.back();
  }, [router]);

  if (error) {
    return (
      <div className="max-w-md mx-auto pt-32 px-6 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }
  if (!state) {
    return (
      <div className="max-w-md mx-auto pt-32 px-6 text-center text-qwhite/60">Loading…</div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto pt-24 pb-16 px-6">
      <ProgressBar state={state} currentStep={currentStep} />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
        >
          {renderStep(currentStep, state, { patch, goNext, goBack })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/**
 * Resolves the next step when the path is not yet determined
 * (i.e., the user is still in the Q1/Q2 branching).
 */
function nextEarlyStep(step: WizardStep, state: WizardState | null): WizardStep {
  if (step === "have-site") {
    return state?.answers.hasSite ? "like-it" : "have-domain";
  }
  return "have-site";
}

function ProgressBar({ state, currentStep }: { state: WizardState; currentStep: WizardStep }) {
  if (!state.path) {
    return (
      <div className="h-1 w-full bg-qwhite/10 rounded mb-12">
        <div className="h-1 w-1/6 bg-qyellow rounded transition-all" />
      </div>
    );
  }
  const seq = stepsForPath(state.path);
  const idx = Math.max(0, seq.indexOf(currentStep));
  const pct = ((idx + 1) / seq.length) * 100;
  return (
    <div className="h-1 w-full bg-qwhite/10 rounded mb-12">
      <div
        className="h-1 bg-qyellow rounded transition-all"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
```

- [ ] **Step 2: Verify type check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/wizard/wizard-frame.tsx
git commit -m "feat: add WizardFrame shell with auth, autosave, transitions"
```

---

## Task 13: Step Q1 — have-site

**Files:**
- Create: `src/components/wizard/step-have-site.tsx`

- [ ] **Step 1: Implement**

```tsx
"use client";

import { Button } from "@/components/ui/button";
import type { WizardState } from "@/lib/wizard-types";

interface Props {
  state: WizardState;
  onAnswer: (hasSite: boolean) => void;
}

export function StepHaveSite({ state, onAnswer }: Props) {
  const current = state.answers.hasSite;
  return (
    <div>
      <p className="text-qwhite/50 text-xs uppercase tracking-wider mb-3">Step 1 of 5–6</p>
      <h1 className="font-serif text-3xl md:text-4xl text-qwhite mb-8">
        Do you have a website today?
      </h1>
      <div className="grid sm:grid-cols-2 gap-4">
        <ChoiceTile
          label="Yes, I have one"
          selected={current === true}
          onClick={() => onAnswer(true)}
        />
        <ChoiceTile
          label="No, starting from scratch"
          selected={current === false}
          onClick={() => onAnswer(false)}
        />
      </div>
    </div>
  );
}

function ChoiceTile({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left p-6 rounded-lg border transition ${
        selected
          ? "border-qyellow bg-qyellow/5 text-qwhite"
          : "border-qwhite/15 hover:border-qwhite/40 text-qwhite/80"
      }`}
    >
      <span className="text-base font-medium">{label}</span>
    </button>
  );
}
```

- [ ] **Step 2: Verify type check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/wizard/step-have-site.tsx
git commit -m "feat: add wizard step 1 (have-site)"
```

---

## Task 14: Step Q2 components — like-it & have-domain

**Files:**
- Create: `src/components/wizard/step-like-it.tsx`
- Create: `src/components/wizard/step-have-domain.tsx`

- [ ] **Step 1: Implement `step-like-it.tsx`**

```tsx
"use client";

import type { WizardState } from "@/lib/wizard-types";

interface Props {
  state: WizardState;
  onAnswer: (likesIt: boolean) => void;
}

export function StepLikeIt({ state, onAnswer }: Props) {
  const v = state.answers.likesIt;
  return (
    <div>
      <p className="text-qwhite/50 text-xs uppercase tracking-wider mb-3">Step 2</p>
      <h1 className="font-serif text-3xl md:text-4xl text-qwhite mb-3">
        Do you like it, or want to make changes?
      </h1>
      <p className="text-qwhite/60 mb-8">
        If you like it, we'll rebuild it on our platform — same look, way better infrastructure.
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        <Tile selected={v === true} onClick={() => onAnswer(true)} title="Like it" body="Just rebuild it on your platform and host it." />
        <Tile selected={v === false} onClick={() => onAnswer(false)} title="Want changes" body="Redesign it." />
      </div>
    </div>
  );
}

function Tile({ selected, onClick, title, body }: { selected: boolean; onClick: () => void; title: string; body: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left p-6 rounded-lg border transition ${
        selected ? "border-qyellow bg-qyellow/5" : "border-qwhite/15 hover:border-qwhite/40"
      }`}
    >
      <div className="text-qwhite font-medium mb-1">{title}</div>
      <div className="text-qwhite/60 text-sm">{body}</div>
    </button>
  );
}
```

- [ ] **Step 2: Implement `step-have-domain.tsx`**

```tsx
"use client";

import type { WizardState } from "@/lib/wizard-types";

interface Props {
  state: WizardState;
  onAnswer: (hasDomain: boolean) => void;
}

export function StepHaveDomain({ state, onAnswer }: Props) {
  const v = state.answers.hasDomain;
  return (
    <div>
      <p className="text-qwhite/50 text-xs uppercase tracking-wider mb-3">Step 2</p>
      <h1 className="font-serif text-3xl md:text-4xl text-qwhite mb-3">
        Do you have a domain?
      </h1>
      <p className="text-qwhite/60 mb-8">
        If not, we can sell you one — registered through us, no separate registrar account.
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        <Tile selected={v === true} onClick={() => onAnswer(true)} title="Yes" body="I already own one." />
        <Tile selected={v === false} onClick={() => onAnswer(false)} title="No" body="I need a domain." />
      </div>
    </div>
  );
}

function Tile({ selected, onClick, title, body }: { selected: boolean; onClick: () => void; title: string; body: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left p-6 rounded-lg border transition ${
        selected ? "border-qyellow bg-qyellow/5" : "border-qwhite/15 hover:border-qwhite/40"
      }`}
    >
      <div className="text-qwhite font-medium mb-1">{title}</div>
      <div className="text-qwhite/60 text-sm">{body}</div>
    </button>
  );
}
```

- [ ] **Step 3: Verify type check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/wizard/step-like-it.tsx src/components/wizard/step-have-domain.tsx
git commit -m "feat: add wizard step 2 components (like-it, have-domain)"
```

---

## Task 15: Step Q3 components — site-url, domain-input

**Files:**
- Create: `src/components/wizard/step-site-url.tsx`
- Create: `src/components/wizard/step-domain-input.tsx`

- [ ] **Step 1: Implement `step-site-url.tsx`**

```tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { WizardState } from "@/lib/wizard-types";

interface Props {
  state: WizardState;
  onSubmit: (siteUrl: string) => void;
}

export function StepSiteUrl({ state, onSubmit }: Props) {
  const [value, setValue] = useState(state.answers.siteUrl ?? "");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (value.trim()) onSubmit(value.trim());
      }}
    >
      <p className="text-qwhite/50 text-xs uppercase tracking-wider mb-3">Step 3</p>
      <h1 className="font-serif text-3xl md:text-4xl text-qwhite mb-3">
        What's your current site URL?
      </h1>
      <p className="text-qwhite/60 mb-6">So we can see what we're working with.</p>
      <Input
        type="text"
        placeholder="example.com"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="mb-6"
      />
      <Button type="submit" disabled={!value.trim()}>
        Continue
      </Button>
    </form>
  );
}
```

- [ ] **Step 2: Implement `step-domain-input.tsx`**

```tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { WizardState } from "@/lib/wizard-types";

interface Props {
  state: WizardState;
  onSubmit: (domainName: string) => void;
}

export function StepDomainInput({ state, onSubmit }: Props) {
  const [value, setValue] = useState(state.answers.domainName ?? "");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (value.trim()) onSubmit(value.trim());
      }}
    >
      <p className="text-qwhite/50 text-xs uppercase tracking-wider mb-3">Step 3</p>
      <h1 className="font-serif text-3xl md:text-4xl text-qwhite mb-3">
        What's your domain?
      </h1>
      <p className="text-qwhite/60 mb-6">We'll point it at your new site once it's built.</p>
      <Input
        type="text"
        placeholder="mybusiness.com"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="mb-6"
      />
      <Button type="submit" disabled={!value.trim()}>
        Continue
      </Button>
    </form>
  );
}
```

- [ ] **Step 3: Verify type check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/wizard/step-site-url.tsx src/components/wizard/step-domain-input.tsx
git commit -m "feat: add wizard step 3 components (site-url, domain-input)"
```

---

## Task 16: Step Q4 components — business-info & hosting-term

**Files:**
- Create: `src/components/wizard/step-business-info.tsx`
- Create: `src/components/wizard/step-hosting-term.tsx`

- [ ] **Step 1: Implement `step-business-info.tsx`**

```tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { WizardState } from "@/lib/wizard-types";

const INDUSTRY_OPTIONS = [
  { value: "lawyer", label: "Law firm" },
  { value: "restaurant", label: "Restaurant / hospitality" },
  { value: "contractor", label: "Contractor / trades" },
  { value: "real-estate", label: "Real estate" },
  { value: "real-estate-portal", label: "Real estate portal / multi-listing" },
  { value: "medical", label: "Medical / wellness" },
  { value: "nonprofit", label: "Non-profit" },
  { value: "portfolio", label: "Portfolio / personal brand" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "marketplace", label: "Marketplace" },
  { value: "saas", label: "SaaS / software" },
  { value: "other", label: "Other" },
];

interface Props {
  state: WizardState;
  onSubmit: (businessName: string, industry: string) => void;
}

export function StepBusinessInfo({ state, onSubmit }: Props) {
  const [name, setName] = useState(state.answers.businessName ?? "");
  const [industry, setIndustry] = useState(state.answers.industry ?? "");
  const valid = name.trim().length > 0 && industry.length > 0;
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (valid) onSubmit(name.trim(), industry);
      }}
    >
      <p className="text-qwhite/50 text-xs uppercase tracking-wider mb-3">Tell us about you</p>
      <h1 className="font-serif text-3xl md:text-4xl text-qwhite mb-6">
        Business name and industry
      </h1>
      <label className="block mb-4">
        <span className="text-qwhite/70 text-sm mb-1 block">Business name</span>
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Acme Co." />
      </label>
      <label className="block mb-6">
        <span className="text-qwhite/70 text-sm mb-1 block">Industry</span>
        <select
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          className="w-full bg-qblack-dark border border-qwhite/15 rounded-md px-3 py-2 text-qwhite"
        >
          <option value="">Select…</option>
          {INDUSTRY_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>
      <Button type="submit" disabled={!valid}>
        Continue
      </Button>
    </form>
  );
}
```

- [ ] **Step 2: Implement `step-hosting-term.tsx`**

```tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { hostingTerms, type HostingTermSlug } from "@/lib/pricing-catalog";
import type { WizardState } from "@/lib/wizard-types";

interface Props {
  state: WizardState;
  onSubmit: (term: HostingTermSlug) => void;
}

export function StepHostingTerm({ state, onSubmit }: Props) {
  const [selected, setSelected] = useState<HostingTermSlug | undefined>(
    state.selectedHostingTerm
  );
  return (
    <div>
      <p className="text-qwhite/50 text-xs uppercase tracking-wider mb-3">Step 4</p>
      <h1 className="font-serif text-3xl md:text-4xl text-qwhite mb-3">
        Pick your hosting term
      </h1>
      <p className="text-qwhite/60 mb-8">Multi-year saves you money up front.</p>
      <div className="grid gap-4 sm:grid-cols-3">
        {(Object.keys(hostingTerms) as HostingTermSlug[]).map((slug) => {
          const term = hostingTerms[slug];
          const monthly = term.monthlyCents > 0 ? `$${(term.monthlyCents / 100).toFixed(0)}/mo` : "—";
          return (
            <button
              key={slug}
              type="button"
              onClick={() => setSelected(slug)}
              className={`p-6 rounded-lg border text-left transition ${
                selected === slug ? "border-qyellow bg-qyellow/5" : "border-qwhite/15 hover:border-qwhite/40"
              }`}
            >
              <div className="text-qwhite font-medium mb-1">{term.label}</div>
              <div className="text-qwhite/60 text-sm">{monthly}</div>
            </button>
          );
        })}
      </div>
      <div className="mt-8">
        <Button onClick={() => selected && onSubmit(selected)} disabled={!selected}>
          Continue
        </Button>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify type check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/wizard/step-business-info.tsx src/components/wizard/step-hosting-term.tsx
git commit -m "feat: add wizard step 4 components (business-info, hosting-term)"
```

---

## Task 17: Step Q4 path-4 — domain-search

**Files:**
- Create: `src/components/wizard/step-domain-search.tsx`

This step uses your existing `/api/domains` endpoint to search Porkbun availability.

- [ ] **Step 1: Read the existing `/api/domains` route to confirm its shape**

```bash
cat src/app/api/domains/route.ts | head -80
```

Note the request/response shape — the spec assumes a search endpoint exists.

- [ ] **Step 2: Implement**

```tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { WizardState, SelectedDomain } from "@/lib/wizard-types";

interface Available {
  name: string;
  priceCents: number;
}

interface Props {
  state: WizardState;
  onSubmit: (domain: SelectedDomain) => void;
}

export function StepDomainSearch({ state, onSubmit }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Available[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chosen, setChosen] = useState<SelectedDomain | undefined>(state.selectedDomain);

  const search = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/domains?q=${encodeURIComponent(query.trim())}`);
      const data = await res.json();
      // Expected shape: { results: [{ name, priceCents }] }
      // If your /api/domains has a different shape, adapt the mapping below.
      const list: Available[] = Array.isArray(data.results) ? data.results : [];
      if (list.length === 0) {
        setError("No domains available for that search. Try another name.");
      }
      setResults(list);
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <p className="text-qwhite/50 text-xs uppercase tracking-wider mb-3">Step 4</p>
      <h1 className="font-serif text-3xl md:text-4xl text-qwhite mb-3">
        Pick a domain
      </h1>
      <p className="text-qwhite/60 mb-6">We register it for you — no separate registrar account.</p>

      <div className="flex gap-2 mb-6">
        <Input
          type="text"
          placeholder={(state.answers.businessName ?? "your-name") + ".com"}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button type="button" onClick={search} disabled={loading || !query.trim()}>
          {loading ? "Searching…" : "Search"}
        </Button>
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {results.length > 0 && (
        <ul className="space-y-2 mb-6">
          {results.map((r) => (
            <li key={r.name}>
              <button
                type="button"
                onClick={() => setChosen(r)}
                className={`w-full p-4 rounded-lg border flex items-center justify-between transition ${
                  chosen?.name === r.name
                    ? "border-qyellow bg-qyellow/5"
                    : "border-qwhite/15 hover:border-qwhite/40"
                }`}
              >
                <span className="text-qwhite">{r.name}</span>
                <span className="text-qwhite/70 text-sm">${(r.priceCents / 100).toFixed(2)}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      <Button onClick={() => chosen && onSubmit(chosen)} disabled={!chosen}>
        Continue
      </Button>
    </div>
  );
}
```

> **Note:** the response shape `{ results: [{ name, priceCents }] }` is the assumed contract. If `/api/domains` returns a different shape, adapt the `search()` mapping accordingly. If the endpoint doesn't yet exist or returns something different, raise it — do not silently change other code.

- [ ] **Step 3: Verify type check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/wizard/step-domain-search.tsx
git commit -m "feat: add wizard step 4 domain search (path 4)"
```

---

## Task 18: Step Q5 — scope-picker

**Files:**
- Create: `src/components/wizard/step-scope-picker.tsx`

- [ ] **Step 1: Implement**

```tsx
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { tiers, type TierSlug } from "@/lib/pricing-catalog";
import { recommendTier } from "@/lib/recommend-tier";
import type { WizardState } from "@/lib/wizard-types";

interface Props {
  state: WizardState;
  onSubmit: (tier: TierSlug, recommended: TierSlug) => void;
}

const TIER_SLUGS: TierSlug[] = ["starter", "pro", "signature"];

export function StepScopePicker({ state, onSubmit }: Props) {
  const recommended: TierSlug = state.path
    ? recommendTier(state.answers, state.path)
    : "pro";
  const [selected, setSelected] = useState<TierSlug>(state.selectedTier ?? recommended);

  useEffect(() => {
    if (!state.selectedTier) setSelected(recommended);
  }, [recommended, state.selectedTier]);

  const rationale = rationaleFor(recommended, state);

  return (
    <div>
      <p className="text-qwhite/50 text-xs uppercase tracking-wider mb-3">Step 5</p>
      <h1 className="font-serif text-3xl md:text-4xl text-qwhite mb-3">
        Pick your tier
      </h1>
      <p className="text-qwhite/60 mb-8">
        We recommend <strong className="text-qyellow">{tiers[recommended].name}</strong> — {rationale}. You can pick any tier.
      </p>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {TIER_SLUGS.map((slug) => {
          const t = tiers[slug];
          const isSelected = selected === slug;
          const isRecommended = slug === recommended;
          return (
            <button
              key={slug}
              type="button"
              onClick={() => setSelected(slug)}
              className={`text-left p-6 rounded-lg border transition ${
                isSelected
                  ? "border-qyellow bg-qyellow/5"
                  : "border-qwhite/15 hover:border-qwhite/40"
              }`}
            >
              {isRecommended && (
                <span className="inline-block text-[10px] uppercase tracking-wider bg-qyellow/15 text-qyellow px-2 py-1 rounded mb-2">
                  Recommended
                </span>
              )}
              <div className="text-qwhite font-medium">{t.name}</div>
              <div className="text-qwhite text-2xl font-bold my-2">
                ${(t.priceCents / 100).toFixed(0)}
              </div>
              <div className="text-qwhite/60 text-sm">{t.pages} page(s) · {t.turnaroundDays}d turnaround</div>
              <ul className="mt-3 space-y-1 text-qwhite/70 text-xs">
                {t.features.slice(0, 4).map((f) => (
                  <li key={f}>• {f}</li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>

      <Button onClick={() => onSubmit(selected, recommended)}>Continue</Button>
    </div>
  );
}

function rationaleFor(tier: TierSlug, state: WizardState): string {
  if (state.path === "just-host") return "we're replicating your existing site";
  if (tier === "signature" && state.answers.industry) {
    return `${state.answers.industry} sites typically need the deeper craft Signature includes`;
  }
  if (tier === "pro") return "fits most small-business marketing sites";
  if (tier === "starter") return "perfect for a single-page launch";
  return "matches what you described";
}
```

- [ ] **Step 2: Verify type check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/wizard/step-scope-picker.tsx
git commit -m "feat: add wizard scope picker with recommendation"
```

---

## Task 19: Step Q6 — order-review

**Files:**
- Create: `src/components/wizard/step-order-review.tsx`

- [ ] **Step 1: Implement**

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { tiers, hostingTerms, replicationFlat } from "@/lib/pricing-catalog";
import type { WizardState } from "@/lib/wizard-types";

interface Props {
  state: WizardState;
  customerEmail?: string;
}

export function StepOrderReview({ state, customerEmail }: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const url =
        state.path === "just-host"
          ? "/api/wizard/checkout/just-host"
          : "/api/wizard/checkout/build";
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: state.sessionId }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        setError(data.error ?? "Checkout failed");
        setSubmitting(false);
        return;
      }
      window.location.href = data.url;
    } catch (err) {
      setError(String(err));
      setSubmitting(false);
    }
  };

  return (
    <div>
      <p className="text-qwhite/50 text-xs uppercase tracking-wider mb-3">Review</p>
      <h1 className="font-serif text-3xl md:text-4xl text-qwhite mb-6">
        Review your order
      </h1>

      <div className="space-y-3 mb-8 p-6 rounded-lg border border-qwhite/15 bg-qblack-dark">
        {renderLineItems(state)}
      </div>

      <div className="text-qwhite/70 text-sm mb-8">
        Sending receipt to <strong className="text-qwhite">{customerEmail ?? "your email"}</strong>{" "}
        <Link href="/complete-profile" className="text-qyellow underline">
          Edit profile
        </Link>
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <Button onClick={submit} disabled={submitting}>
        {submitting ? "Redirecting to Stripe…" : "Continue to checkout"}
      </Button>
    </div>
  );
}

function renderLineItems(state: WizardState): React.ReactNode {
  const items: { label: string; cents: number }[] = [];

  if (state.path === "just-host") {
    items.push({ label: "Site replication (one-time)", cents: replicationFlat.priceCents });
    if (state.selectedHostingTerm) {
      const term = hostingTerms[state.selectedHostingTerm];
      items.push({
        label: `Hosting — ${term.label} ($${(term.monthlyCents / 100).toFixed(0)}/mo recurring)`,
        cents: term.monthlyCents,
      });
    }
  } else {
    if (state.selectedTier) {
      const t = tiers[state.selectedTier];
      items.push({ label: `${t.name} build`, cents: t.priceCents });
    }
    if (state.path === "new-domain" && state.selectedDomain) {
      items.push({
        label: `Domain — ${state.selectedDomain.name}`,
        cents: state.selectedDomain.priceCents,
      });
    }
  }

  const oneTimeTotal = items
    .filter((i) => state.path !== "just-host" || !i.label.startsWith("Hosting"))
    .reduce((sum, i) => sum + i.cents, 0);

  return (
    <>
      {items.map((i) => (
        <div key={i.label} className="flex justify-between text-qwhite">
          <span>{i.label}</span>
          <span>${(i.cents / 100).toFixed(2)}</span>
        </div>
      ))}
      <div className="border-t border-qwhite/15 pt-3 flex justify-between text-qwhite font-medium">
        <span>{state.path === "just-host" ? "Due today (one-time)" : "Total"}</span>
        <span>${(oneTimeTotal / 100).toFixed(2)}</span>
      </div>
    </>
  );
}
```

- [ ] **Step 2: Verify type check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/wizard/step-order-review.tsx
git commit -m "feat: add wizard order review with Stripe redirect"
```

---

## Task 20: /start route — wire everything together

**Files:**
- Create: `src/app/start/page.tsx`

- [ ] **Step 1: Implement**

```tsx
"use client";

import { Suspense } from "react";
import { useUser } from "@clerk/nextjs";
import { WizardFrame } from "@/components/wizard/wizard-frame";
import { StepHaveSite } from "@/components/wizard/step-have-site";
import { StepLikeIt } from "@/components/wizard/step-like-it";
import { StepHaveDomain } from "@/components/wizard/step-have-domain";
import { StepSiteUrl } from "@/components/wizard/step-site-url";
import { StepDomainInput } from "@/components/wizard/step-domain-input";
import { StepDomainSearch } from "@/components/wizard/step-domain-search";
import { StepBusinessInfo } from "@/components/wizard/step-business-info";
import { StepHostingTerm } from "@/components/wizard/step-hosting-term";
import { StepScopePicker } from "@/components/wizard/step-scope-picker";
import { StepOrderReview } from "@/components/wizard/step-order-review";
import type { WizardStep, WizardState } from "@/lib/wizard-types";

export default function StartPage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center text-qwhite/60">Loading…</div>}>
      <StartPageInner />
    </Suspense>
  );
}

function StartPageInner() {
  const { user } = useUser();

  return (
    <main className="min-h-screen bg-qblack">
      <WizardFrame
        renderStep={(step, state, actions) => {
          switch (step) {
            case "have-site":
              return (
                <StepHaveSite
                  state={state}
                  onAnswer={async (hasSite) => {
                    await actions.patch({ answers: { hasSite } });
                    actions.goNext();
                  }}
                />
              );
            case "like-it":
              return (
                <StepLikeIt
                  state={state}
                  onAnswer={async (likesIt) => {
                    await actions.patch({ answers: { likesIt } });
                    actions.goNext();
                  }}
                />
              );
            case "have-domain":
              return (
                <StepHaveDomain
                  state={state}
                  onAnswer={async (hasDomain) => {
                    await actions.patch({ answers: { hasDomain } });
                    actions.goNext();
                  }}
                />
              );
            case "site-url":
              return (
                <StepSiteUrl
                  state={state}
                  onSubmit={async (siteUrl) => {
                    await actions.patch({ answers: { siteUrl } });
                    actions.goNext();
                  }}
                />
              );
            case "domain-input":
              return (
                <StepDomainInput
                  state={state}
                  onSubmit={async (domainName) => {
                    await actions.patch({ answers: { domainName } });
                    actions.goNext();
                  }}
                />
              );
            case "domain-search":
              return (
                <StepDomainSearch
                  state={state}
                  onSubmit={async (selectedDomain) => {
                    await actions.patch({ selectedDomain });
                    actions.goNext();
                  }}
                />
              );
            case "business-info":
              return (
                <StepBusinessInfo
                  state={state}
                  onSubmit={async (businessName, industry) => {
                    await actions.patch({ answers: { businessName, industry } });
                    actions.goNext();
                  }}
                />
              );
            case "hosting-term":
              return (
                <StepHostingTerm
                  state={state}
                  onSubmit={async (term) => {
                    await actions.patch({ selectedHostingTerm: term });
                    actions.goNext();
                  }}
                />
              );
            case "scope":
              return (
                <StepScopePicker
                  state={state}
                  onSubmit={async (tier, recommended) => {
                    await actions.patch({ selectedTier: tier, recommendedTier: recommended });
                    actions.goNext();
                  }}
                />
              );
            case "review":
              return (
                <StepOrderReview
                  state={state}
                  customerEmail={user?.primaryEmailAddress?.emailAddress}
                />
              );
            default:
              return <div>Unknown step.</div>;
          }
        }}
      />
    </main>
  );
}
```

- [ ] **Step 2: Manual browser smoke test**

Run: `npm run dev`

Open http://localhost:3000/start in an incognito window. Expected: Clerk redirects to `/sign-in?redirect_url=%2Fstart`. Sign in. After redirect, the wizard's Q1 ("Do you have a website today?") renders.

- [ ] **Step 3: Verify type check + lint**

```bash
npx tsc --noEmit && npm run lint
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/start/page.tsx
git commit -m "feat: wire wizard steps in /start route"
```

---

## Task 21: Update /pricing to read from new catalog

**Files:**
- Modify: `src/app/pricing/page.tsx`
- Delete: `src/lib/hosting-plans.ts`

The current `/pricing` page hardcodes the old `$1k / $2.5k / $5k+` builds and `$49 / $99 / $199` hosting. Replace with reads from `pricing-catalog.ts`.

- [ ] **Step 1: Update imports and data sources**

Open `src/app/pricing/page.tsx`. Find the existing data definitions (around lines 22–110) — they declare `packages` and `monthlyPlans` arrays. Replace with imports + derived arrays:

```ts
import { tiers, hostingTerms } from "@/lib/pricing-catalog";

const packages = (Object.keys(tiers) as Array<keyof typeof tiers>).map((slug) => {
  const t = tiers[slug];
  return {
    name: t.name,
    price: `$${(t.priceCents / 100).toFixed(0)}`,
    tagline: `${t.pages} page(s)`,
    turnaround: `${t.turnaroundDays} days`,
    features: t.features as readonly string[],
    popular: "recommended" in t && t.recommended === true,
  };
});

const hostingTermPlans = (Object.keys(hostingTerms) as Array<keyof typeof hostingTerms>).map(
  (slug) => {
    const term = hostingTerms[slug];
    return {
      name: term.label,
      price: term.monthlyCents > 0 ? `$${(term.monthlyCents / 100).toFixed(0)}/mo` : "TBD",
      tagline: `${term.months}-month commitment`,
      features: ["Managed hosting", "SSL/HTTPS", "Daily backups", "Editor stays unlocked"],
    };
  }
);
```

- [ ] **Step 2: Replace references in JSX**

Find any usages of the old `monthlyPlans` variable in JSX. Replace with `hostingTermPlans`. Verify the rest of the file references the new shape correctly. Update the page heading copy if it still says "$49 / $99 / $199".

- [ ] **Step 3: Update primary CTA target**

If `/pricing` has a "Get started" CTA pointing to `/sign-up` or `/dashboard`, change it to `/start`.

- [ ] **Step 4: Delete `src/lib/hosting-plans.ts`**

```bash
rm src/lib/hosting-plans.ts
```

- [ ] **Step 5: Update existing imports of hosting-plans**

Find any remaining imports of `@/lib/hosting-plans`:

```bash
grep -r "hosting-plans" src/
```

Likely matches:
- `src/app/api/hosting/checkout/route.ts`
- `src/app/api/hosting/webhook/route.ts`

For each, change the import to read from `pricing-catalog`. The semantics differ (catalog has hosting *terms*, not monthly tiers), so the existing `/api/hosting/*` endpoints will stop working until they're updated. Two options:

  **(a)** Refactor `/api/hosting/*` to take a `hostingTerm` slug instead of a `plan` slug. This is the right answer long-term and roughly a half-day's work — out of scope for the wizard plan but track as a follow-up task.

  **(b)** Leave `hosting-plans.ts` in place and add `pricing-catalog.ts` alongside it. Migrate `/pricing` and the wizard to the new catalog, leave `/api/hosting/*` alone for now.

**Recommended path:** **(b)**. Don't delete `hosting-plans.ts` yet. Instead, in this step, just verify nothing in the wizard imports `hosting-plans`. Track the deletion + `/api/hosting/*` refactor as a separate cleanup task after the wizard ships.

  > **Update Step 4 above:** skip the deletion. Leave `hosting-plans.ts` in place.

- [ ] **Step 6: Verify type check + lint**

```bash
npx tsc --noEmit && npm run lint
```

Expected: no errors.

- [ ] **Step 7: Browser check**

Run: `npm run dev`

Open http://localhost:3000/pricing. Expected: page renders three packages ($250 / $500 / $1,000) and three hosting terms (1yr / 3yr / 5yr).

- [ ] **Step 8: Commit**

```bash
git add src/app/pricing/page.tsx
git commit -m "refactor: pricing page reads from pricing-catalog"
```

---

## Task 22: Update homepage CTA to /start

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Find the primary CTA(s)**

Open `src/app/page.tsx`. Search for `Link` references that look like the main "Get Started" / "Hire us" CTA. Likely targets today: `/sign-up`, `/contact`, or `/pricing`.

- [ ] **Step 2: Update target to `/start`**

Change the primary CTA's `href` to `/start`. Also update the CTA label if it currently says "Sign up" or "Hire us" — "Get started" is more honest about what the wizard is.

- [ ] **Step 3: Browser check**

`npm run dev`. Visit http://localhost:3000. Verify the hero CTA navigates to `/start`. Signed-out users should hit Clerk's sign-in flow with `redirect_url=/start`.

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: point homepage CTA to /start wizard"
```

---

## Task 23: Post-build launch panel on /dashboard

**Files:**
- Create: `src/components/dashboard/launch-panel.tsx`
- Modify: `src/app/dashboard/page.tsx`

The panel appears for any of the customer's sites where `status = 'live'` and `hosting_decision IS NULL`. The customer picks "Host with us" (redirects to existing `/api/hosting/checkout`) or "Take the code & go" (sets `hosting_decision = 'self-host'` and `grace_until = now + 7 days`).

- [ ] **Step 1: Implement `launch-panel.tsx`**

```tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export interface LaunchPanelProps {
  siteId: string;
  siteName: string;
}

export function LaunchPanel({ siteId, siteName }: LaunchPanelProps) {
  const [loading, setLoading] = useState<"hosted" | "self-host" | null>(null);
  const [error, setError] = useState<string | null>(null);

  const chooseHosted = async () => {
    setLoading("hosted");
    setError(null);
    // Send to existing hosting checkout — defaults to "essential" plan;
    // a future iteration replaces this with a hosting-term selector inline.
    const res = await fetch("/api/hosting/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ siteId, plan: "essential" }),
    });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      setError(data.error ?? "Checkout failed");
      setLoading(null);
    }
  };

  const chooseSelfHost = async () => {
    setLoading("self-host");
    setError(null);
    const res = await fetch(`/api/wizard/launch/${siteId}/self-host`, { method: "POST" });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Failed to record decision");
      setLoading(null);
      return;
    }
    // Reload the page so the panel disappears
    window.location.reload();
  };

  return (
    <div className="rounded-lg border border-qyellow/40 bg-qyellow/5 p-6 mb-8">
      <p className="text-qyellow text-xs uppercase tracking-wider mb-2">Site ready</p>
      <h2 className="text-qwhite text-xl font-serif mb-2">{siteName} is built. How do you want to launch?</h2>
      <p className="text-qwhite/60 text-sm mb-6">
        Hosting with us keeps the editor unlocked. Take the code if you want to host elsewhere — you'll have 7 days of editor access, then read-only.
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        <button
          type="button"
          onClick={chooseHosted}
          disabled={loading !== null}
          className="text-left p-4 rounded-md border border-qwhite/15 hover:border-qyellow transition disabled:opacity-50"
        >
          <div className="text-qwhite font-medium mb-1">Host with us</div>
          <div className="text-qwhite/60 text-sm">Pick a 1, 3, or 5 year plan. Editor stays unlocked.</div>
        </button>
        <button
          type="button"
          onClick={chooseSelfHost}
          disabled={loading !== null}
          className="text-left p-4 rounded-md border border-qwhite/15 hover:border-qyellow transition disabled:opacity-50"
        >
          <div className="text-qwhite font-medium mb-1">Take the code & go</div>
          <div className="text-qwhite/60 text-sm">Download repo. 7-day editor grace.</div>
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
    </div>
  );
}
```

- [ ] **Step 2: Implement the self-host endpoint**

Create `src/app/api/wizard/launch/[id]/self-host/route.ts`:

```ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createServiceClient } from "@/lib/supabase";

/* eslint-disable @typescript-eslint/no-explicit-any */

const GRACE_DAYS = 7;

/**
 * POST /api/wizard/launch/:id/self-host
 *
 * Customer chose to take the code rather than host with us. Stamps
 * hosting_decision = 'self-host' and sets grace_until = now + 7 days.
 * The repo invite email is dispatched out-of-band (TODO: sub-project #6).
 */
export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const supabase = createServiceClient();

  const { data: customer } = await (supabase.from("customers") as any)
    .select("id")
    .eq("clerk_id", userId)
    .single();
  if (!customer) return NextResponse.json({ error: "Customer not found" }, { status: 404 });

  const { data: site } = await (supabase.from("sites") as any)
    .select("id, customer_id, hosting_decision")
    .eq("id", id)
    .single();
  if (!site) return NextResponse.json({ error: "Site not found" }, { status: 404 });
  if (site.customer_id !== customer.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  if (site.hosting_decision) {
    return NextResponse.json({ error: "Decision already made" }, { status: 409 });
  }

  const graceUntil = new Date(Date.now() + GRACE_DAYS * 24 * 60 * 60 * 1000).toISOString();

  const { error } = await (supabase.from("sites") as any)
    .update({ hosting_decision: "self-host", grace_until: graceUntil })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
  return NextResponse.json({ success: true, graceUntil });
}
```

- [ ] **Step 3: Wire the panel into `/dashboard`**

Open `src/app/dashboard/page.tsx`. Near the top of the rendered content, fetch any of the user's sites that need a launch decision and render the panel. If your dashboard is a server component, it can query directly; if it's a client component, it should use `createBrowserClient` with the Clerk JWT.

For a server component pattern, after the existing auth/customer-fetch logic:

```tsx
import { LaunchPanel } from "@/components/dashboard/launch-panel";
// ...

const { data: pendingSites } = await (supabase.from("sites") as any)
  .select("id, name")
  .eq("customer_id", customer.id)
  .eq("status", "live")
  .is("hosting_decision", null)
  .order("created_at", { ascending: true })
  .limit(1);

const pending = pendingSites?.[0];

// Inside the page JSX, before the main content:
{pending && <LaunchPanel siteId={pending.id} siteName={pending.name} />}
```

If the dashboard is a client component, replace the server query with a `useEffect` that calls a new GET endpoint, or simply pass the data from the parent. The exact wiring depends on the existing structure — adapt without changing the panel's contract.

- [ ] **Step 4: Verify**

```bash
npx tsc --noEmit && npm run lint
```

Expected: no errors.

Run: `npm run dev`. To test the panel, manually mark one of your sites in Supabase as `status = 'live'` and `hosting_decision = NULL`. Visit `/dashboard`. The panel should render.

- [ ] **Step 5: Commit**

```bash
git add src/components/dashboard/launch-panel.tsx \
  src/app/api/wizard/launch/\[id\]/self-host/route.ts \
  src/app/dashboard/page.tsx
git commit -m "feat: post-build launch panel on dashboard"
```

---

## Task 24: End-to-end manual verification

**Files:** none (verification only)

This task is a checklist of browser-based smoke tests covering all four wizard paths and the post-build panel. No code changes, but **don't skip it** — UI bugs only show up under real interaction.

- [ ] **Step 1: Run all automated checks**

```bash
npm test && npx tsc --noEmit && npm run lint && npm run build
```

Expected: all four exit 0.

- [ ] **Step 2: Path 1 — Just-host smoke test**

Run: `npm run dev`. Open `/start` in an incognito window. Sign up or sign in. Walk through:

1. Q1: Yes (have a site)
2. Q2: Like it
3. Q3: Enter `https://example.com`
4. Q4: Pick `1yr`
5. Q5 (review): verify line items show "Site replication ($250)" and "Hosting — 1 year"
6. Click "Continue to checkout"
7. Stripe Checkout opens in test mode. Use card `4242 4242 4242 4242` with any future expiry / any CVC

Expected: Stripe success URL is `/dashboard?wizard=success`. Verify in Supabase that `wizard_sessions.completed_at` is set, two `orders` rows exist (one `site_design`, one `hosting`), one `sites` row exists with `replicate_from_url = 'https://example.com'` and `hosting_decision = 'hosted'`.

- [ ] **Step 3: Path 2 — Redesign smoke test**

Restart the dev server if needed. Open `/start` in another incognito window with a fresh user. Walk through:

1. Q1: Yes
2. Q2: Want changes
3. Q3: `https://existing.com`
4. Q4: Business name "Test Co" + industry "lawyer"
5. Q5 (scope): verify recommendation is "Pro" with rationale; pick Pro
6. Q6 (review): verify `Pro build $500`. Continue to checkout. Pay.

Expected: `dashboard?wizard=success`. One `orders` row (`site_design`, $500). One `sites` row (`provisioning` then progresses via existing pipeline). `wizard_sessions.completed_at` set.

- [ ] **Step 4: Path 3 — New build BYO domain**

Walk through:

1. Q1: No
2. Q2: Yes (have domain)
3. Q3: `mybiz.com`
4. Q4: business info "Test BYO" + industry "restaurant"
5. Q5: Pro (default). Continue
6. Q6: review and pay

Expected: same as Path 2 plus `metadata.domainName = 'mybiz.com'` on the Stripe session.

- [ ] **Step 5: Path 4 — New build + domain (Porkbun)**

Walk through:

1. Q1: No
2. Q2: No (need domain)
3. Q3: business info "New Brand" + industry "ecommerce"
4. Q4: Search for an available domain via Porkbun search. Select one.
5. Q5: verify recommendation is **Signature** (because industry = ecommerce). Pick any tier.
6. Q6: review shows `Signature build $1,000` + `Domain — example.shop $XX`. Pay.

Expected: success. Two orders rows (`site_design`, `domain`), `domains` row with `registrar = 'porkbun'`.

- [ ] **Step 6: Refresh-mid-flow recovery**

Start any path. Get to step 3. Refresh the browser. Verify the wizard re-loads at the correct step with previous answers preserved.

- [ ] **Step 7: Post-build launch panel**

In Supabase, take one of the design-path sites you just created and update:

```sql
update public.sites set status = 'live' where id = '<the-site-id>';
```

Visit `/dashboard`. Verify the launch panel renders with the site name. Click **Take the code & go** — verify the panel disappears, Supabase shows `hosting_decision = 'self-host'` and `grace_until` set ~7 days out.

- [ ] **Step 8: Smoke-test summary commit**

If any issues surfaced and were fixed inline, commit those fixes. If the only output was verification, no commit is needed for this task.

---

## Self-Review

After writing the plan above, I checked it against the spec section-by-section.

**Spec coverage:**
- Goals 1–5 → Tasks 1–24 cumulatively ✓
- 4 user paths → Tasks 13–20 implement all four ✓
- Auth gate at `/start` → Task 11 (middleware) + Task 12 (WizardFrame) ✓
- Pricing catalog → Task 2 ✓
- recommendTier → Task 4 ✓
- Wizard sessions table + RLS → Task 5 ✓
- Sites launch state → Task 6 ✓
- API surface (5 new endpoints) → Tasks 7, 8, 9, 10, 11 + Task 23 (self-host endpoint) ✓
- Single-page architecture with `?step=N` → Task 12 ✓
- Pricing page reads from catalog → Task 21 ✓
- Homepage CTA → Task 22 ✓
- Post-build launch panel → Task 23 ✓
- Manual end-to-end → Task 24 ✓

**Placeholder scan:** Searched for "TBD", "TODO", "later", "appropriate", "handle". Found none in plan task instructions (intentional `TBD` markers in `pricing-catalog.ts` are explicitly explained as "fill the catalog later" — not a plan placeholder).

**Type consistency check:**
- `TierSlug` defined in `pricing-catalog.ts` (Task 2), used in Tasks 4, 9, 10, 16, 18, 19 ✓
- `HostingTermSlug` defined Task 2, used Tasks 9, 16, 19 ✓
- `WizardState`, `WizardAnswers`, `WizardPath` defined Task 3, used Tasks 12–20 ✓
- `WizardStep` enum defined Task 3, all 10 step strings match between definition and switch in Task 20 ✓
- `recommendTier` signature `(answers, path) => TierSlug` matches across Tasks 4 and 18 ✓

No issues found.

---

## Execution Handoff

**Plan complete and saved to `docs/superpowers/plans/2026-04-27-onboarding-wizard.md`. Two execution options:**

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**
