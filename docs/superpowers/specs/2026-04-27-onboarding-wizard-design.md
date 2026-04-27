# Onboarding Wizard — Design Spec

**Date:** 2026-04-27
**Status:** Draft, awaiting user review
**Sub-project of:** the broader KPT Designs platform vision (decomposition: pricing reposition, onboarding wizard, migrate-and-host, registrar abstraction, WYSIWYG editor, editor access policy)
**This spec covers:** the **onboarding wizard** only.

## Summary

Build the customer's front door at `/start` — a guided, auth-gated wizard that triages every visitor into one of four paths (just-host, redesign, new-build-with-existing-domain, new-build-with-new-domain) and ends in a self-serve checkout. No sales calls. No human quoting. The wizard collects 5–6 answers, recommends a build tier ($250 / $500 / $1,000) based on those answers, and routes to checkout. Hosting commitment is bundled in checkout for the just-host path; for design paths, hosting is decided after the build is delivered, on a separate launch screen.

The wizard is the **only entrypoint** for becoming a paying customer. The `/pricing` page stays public and informational.

## Goals

1. Replace the current pricing-page-as-funnel with a guided self-serve wizard.
2. Triage customers into the right product (just-host vs. redesign vs. new build) without a human in the loop.
3. Capture enough information at checkout that the existing provision pipeline (`/api/provision/{github,vercel,dns}`) can run with no further input.
4. Make the pricing structure flexible — numbers can change without code changes elsewhere.
5. Persist mid-flow state so customers can leave and come back.

## Non-goals

The following are deliberately out of scope and tracked as separate sub-projects:

- **WYSIWYG editor** for hosted sites (sub-project #5)
- **Editor access policy** + 7-day grace window enforcement for code-and-go customers (sub-project #6)
- **Final pricing numbers.** The catalog ships with placeholder values; numbers are filled in by a separate "fill catalog" task whenever the user is ready.
- **Migrate-and-host technical onboarding beyond rebuilding on our platform.** We do not host arbitrary stacks (no WordPress, no PHP). Just-host customers get a fresh build that visually replicates their existing site.
- **Registrar abstraction polish.** The existing `/api/domains/*` Porkbun integration is sufficient.
- **Wizard internationalization, A/B testing infrastructure, or analytics dashboards.**

## Locked decisions (input to this design)

| # | Decision | Choice |
|---|----------|--------|
| 1 | Entry point | Dedicated `/start` page, accessed from a single "Get Started" CTA |
| 2 | Auth gate | Required at `/start`; `/pricing` remains public |
| 3 | Branching shape | Yes/no chain, four terminal paths |
| 4 | Just-host technical model | Rebuild on our platform (no foreign tech stacks) |
| 5 | Build pricing | Three tiers — $250 Starter / $500 Pro / $1,000 Signature, three axes (scope × custom-vs-template × craft signals) |
| 6 | Addons philosophy | Reading 1 — clean tiers (no surprise upcharges) + à la carte expansions ($50/page, ecommerce, multi-language, logo, maintenance) |
| 7 | Hosting purchase timing | Hybrid — just-host bundles at checkout; design paths defer to a post-build launch screen with 1/3/5 yr or take-the-code options |
| 8 | Scope picker UX | Show all three tiers, pre-highlight recommended one with a one-line rationale; customer can override |
| 9 | Architecture | Single-page client wizard at `/start?step=N`, framer-motion transitions, Supabase autosave keyed to `clerk_id` |

## User journey

The wizard has one universal Q1 and branches twice. Every path lands at a tier-or-checkout step, then Stripe Checkout, then a confirmation screen.

### Q1 — universal

> *"Do you have a website today?"* — **Yes** / **No**

### YES branch

**Q2:** *"Do you like it, or want to make changes?"* — **Like it** / **Want changes**

#### Path 1: Just-host (Like it)

1. Q3: site URL
2. Q4: pick hosting term — **1yr / 3yr / 5yr** (multi-year unlocks lower monthly)
3. Q5: order review (read-only summary: build line item, hosting term + total, contact email pulled from Clerk; "Edit profile" link to `/complete-profile` if email/name needs to change)
4. **Checkout:** Stripe Checkout Session with two line items:
   - Build (replication, $250 fixed)
   - Hosting term (subscription)
5. **Outcome:** order created → manual replication queued for KPT team → site live → customer notified

> The wizard does not auto-generate the replication. The team manually rebuilds the site visually using the customer's existing site as reference. This is the simplest viable v1; automation can come later.

#### Path 2: Redesign (Want changes)

1. Q3: current site URL (so we can see what they have)
2. Q4: business name + industry
3. Q5: scope picker — three tiers shown, recommended one highlighted (`recommendTier`)
4. Q6: order review (read-only summary: tier + price, contact email; "Edit profile" link)
5. **Checkout:** Stripe Checkout Session with one line item — build only
6. **Outcome:** order paid → existing `/api/provision/*` pipeline kicks off → site enters `provisioning` → eventually `live` → **post-build launch screen** appears in dashboard

### NO branch

**Q2:** *"Do you have a domain?"* — **Yes** / **No**

#### Path 3: New build, BYO domain

1. Q3: domain
2. Q4: business name + industry
3. Q5: scope picker
4. Q6: order review
5. **Checkout:** Stripe Checkout Session — build only
6. **Outcome:** same as Path 2; DNS instructions sent for BYO-domain customer

#### Path 4: New build + domain (Porkbun)

1. Q3: business name + industry
2. Q4: pick a domain — Porkbun search via existing `/api/domains/*` integration, white-labeled
3. Q5: scope picker
4. Q6: order review (build + domain reservation summary)
5. **Checkout:** Stripe Checkout Session with two line items:
   - Build
   - Domain registration (Porkbun reseller, with KPT's existing markup)
6. **Outcome:** domain reserved → provisioning runs → site live with domain attached

## Architecture

### Page structure

```
src/app/start/
  page.tsx              ← single client component, holds wizard state
  layout.tsx            ← optional, may inherit root layout

src/components/wizard/
  wizard-frame.tsx      ← outer shell, progress bar, auth check
  step-have-site.tsx    ← Q1
  step-like-it.tsx      ← Q2 yes branch
  step-have-domain.tsx  ← Q2 no branch
  step-site-url.tsx     ← Q3 paths 1/2
  step-domain-input.tsx ← Q3 path 3
  step-domain-search.tsx← Q4 path 4 (Porkbun)
  step-business-info.tsx← business name + industry, paths 2/3/4
  step-hosting-term.tsx ← Q4 path 1
  step-scope-picker.tsx ← Q5 paths 2/3/4 — three-tier card UI with recommendation
  step-confirm.tsx      ← contact-info confirmation, all paths
  step-checkout.tsx     ← Stripe redirect
```

The outer `WizardFrame` reads `?step=N` from URL searchParams, hydrates state from Supabase on mount, and renders the appropriate child step. Each step submits via a callback that updates local state, autosaves to Supabase, and advances the URL. Back button works because `?step=N` is a real URL change.

### State management

A single `WizardState` object lives in client React state. Shape:

```ts
type WizardState = {
  sessionId: string;          // uuid, server-generated on first save
  path?: WizardPath;          // resolved once Q2 is answered
  answers: Partial<Answers>;  // all collected fields
  selectedTier?: TierSlug;    // null until scope step
  recommendedTier?: TierSlug; // computed from answers
  selectedHostingTerm?: HostingTermSlug;
  selectedDomain?: { name: string; priceCents: number };
};

type WizardPath = "just-host" | "redesign" | "new-byo" | "new-domain";
type TierSlug = "starter" | "pro" | "signature";
type HostingTermSlug = "1yr" | "3yr" | "5yr";

type Answers = {
  hasSite: boolean;
  likesIt?: boolean;
  hasDomain?: boolean;
  siteUrl?: string;
  domainName?: string;
  businessName?: string;
  industry?: string;
};
```

Autosave uses a debounced (~500ms) effect that writes to `wizard_sessions` whenever `answers` changes.

### Auth flow

1. `/start` is **not** in the middleware public-route list → Clerk redirects unauthenticated users to `/sign-in?redirect_url=/start`
2. After auth, `WizardFrame` looks up the customer record (or creates one if first visit)
3. Looks up the in-progress wizard session for this `clerk_id` (one active session per user). If found, hydrates state. If none, creates a new row.

### Checkout flow

The wizard does not handle payment directly. At the final step it POSTs to a path-specific server route which creates a Stripe Checkout Session and returns the URL:

- **Path 1 (just-host):** new endpoint `POST /api/wizard/checkout/just-host`
- **Paths 2 / 3 / 4 (design):** new endpoint `POST /api/wizard/checkout/build`

Both endpoints:
1. Read the session from Supabase (verify it matches the calling user)
2. Validate inputs
3. Create a Stripe Checkout Session with appropriate line items
4. Insert a pending row in `orders`
5. Return the Stripe URL → client redirects

Stripe webhooks (existing `/api/hosting/webhook`, plus a new `/api/wizard/webhook` or extension of existing) handle `checkout.session.completed`:
- Mark order paid
- Mark wizard session `completed_at`
- For design paths, kick off `provisionSite` from `src/lib/provision.ts`
- For just-host, queue replication work (mechanism: a row in a `replication_queue` table or simply a `sites` row with a flag — TBD in implementation)

## Data model

### New table: `wizard_sessions`

```sql
create table public.wizard_sessions (
  id              uuid primary key default gen_random_uuid(),
  customer_id     uuid not null references public.customers(id) on delete cascade,
  path            text check (path in ('just-host', 'redesign', 'new-byo', 'new-domain')),
  answers         jsonb not null default '{}',
  selected_tier   text check (selected_tier in ('starter', 'pro', 'signature')),
  recommended_tier text check (recommended_tier in ('starter', 'pro', 'signature')),
  selected_hosting_term text check (selected_hosting_term in ('1yr', '3yr', '5yr')),
  selected_domain jsonb,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  completed_at    timestamptz
);

create index idx_wizard_sessions_customer_id on public.wizard_sessions(customer_id);
create index idx_wizard_sessions_active on public.wizard_sessions(customer_id) where completed_at is null;
```

Migration filename: `supabase/migrations/002_wizard_sessions.sql`.

RLS policy: a user can read/write only rows where `customer_id` matches their Clerk-derived customer.

### Reused tables

- `customers` — wizard creates/updates this on first visit
- `sites` — created by the provision pipeline after checkout; `wizard_session_id` is **not** added (loose coupling via `orders`)
- `orders` — one row per Stripe transaction. `order_type` enum already supports `domain | site_design | hosting`; the just-host path creates two `orders` rows linked by Stripe session, OR a single `site_design` order with a comment explaining bundle. **Decision deferred to implementation.**
- `domains` — created by Porkbun integration after path-4 checkout
- `site_drafts` — unused by the wizard; reserved for the AI build flow which is a separate concern

## Pricing catalog

A single TypeScript module replaces the current `src/lib/hosting-plans.ts`. All prices live here. The wizard, `/pricing`, and `recommendTier` import from this file.

```ts
// src/lib/pricing-catalog.ts

export const tiers = {
  starter: {
    slug: "starter",
    name: "Starter",
    priceCents: 25000, // $250 — placeholder, confirm with stakeholder
    pages: "1",
    revisions: 1,
    turnaroundDays: 5,
    custom: "template-skinned",
    craftSignals: [],
    features: [
      "Single landing page",
      "Brand colors + fonts applied",
      "Mobile responsive",
      "Basic contact form",
      "Stock imagery",
    ],
  },
  pro: {
    slug: "pro",
    name: "Pro",
    priceCents: 50000,
    pages: "up to 5",
    revisions: 2,
    turnaroundDays: 7,
    custom: "semi-custom",
    craftSignals: ["light-motion", "lead-capture"],
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
    slug: "signature",
    name: "Signature",
    priceCents: 100000,
    pages: "up to 10",
    revisions: 3,
    turnaroundDays: 30,
    custom: "fully-custom",
    craftSignals: ["advanced-motion", "custom-graphics", "performance", "copy-polish", "cms"],
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
  "1yr": { slug: "1yr", months: 12, monthlyCents: 0, label: "1 year" }, // numbers TBD
  "3yr": { slug: "3yr", months: 36, monthlyCents: 0, label: "3 years (best value)" },
  "5yr": { slug: "5yr", months: 60, monthlyCents: 0, label: "5 years" },
} as const;

export const aLaCarte = {
  extraPage: { slug: "extra-page", priceCents: 5000, label: "Extra page" },
  logo: { slug: "logo", priceCents: 0, label: "Logo / brand work" },        // TBD
  maintenance: { slug: "maintenance", priceCents: 0, label: "Monthly maintenance" }, // TBD
  ecommerce: { slug: "ecommerce", priceCents: 0, label: "E-commerce" },     // TBD
  multilang: { slug: "multilang", priceCents: 0, label: "Multi-language" }, // TBD
} as const;

export const replicationFlat = {
  priceCents: 25000, // just-host build line item — pegged to Starter for now
};

export type TierSlug = keyof typeof tiers;
export type HostingTermSlug = keyof typeof hostingTerms;
```

The "fill in the catalog" task — separate from this spec — replaces every `0` and confirms every value.

## Recommended-tier heuristic

A pure function, no side effects:

```ts
// src/lib/recommend-tier.ts
export function recommendTier(answers: Partial<Answers>, path: WizardPath): TierSlug {
  if (path === "just-host") return "starter"; // always for replication
  // Industry hints — high-complexity industries → Signature
  const heavyIndustries = ["ecommerce", "marketplace", "saas", "real-estate-portal"];
  if (answers.industry && heavyIndustries.includes(answers.industry)) return "signature";
  // Existing-site-page-count hints (Path 2 only) — not collected today, future
  // Default for design paths
  return "pro";
}
```

The heuristic is intentionally simple in v1. The customer can always override. A more sophisticated version can come later (analyzing the existing site URL, asking page-count, etc.); not in scope.

## Post-build launch screen

This screen lives at the top of `/dashboard` as a dismissible panel. It appears for any site owned by the customer where `sites.status = 'live'` AND `sites.hosting_decision IS NULL`. Once the customer picks an outcome, the panel goes away. Only one panel renders at a time, even if multiple sites need a decision (FIFO by `sites.created_at`).

UI: two large cards.

| Card | Action |
|------|--------|
| **Host with us** — pick 1/3/5 yr, see total | redirects to existing `/api/hosting/checkout` |
| **Take the code & go** — download repo, 7-day grace | sets a flag (`hosting_decision = "self-host"`, `grace_until = now + 7d`) and triggers a transactional email with the GitHub repo invite |

The flag (`grace_until`) is set but **enforcement is out of scope** for this spec — it's owned by sub-project #6 (editor access policy).

A new column will be needed on `sites` to track this state:

```sql
alter table public.sites
  add column hosting_decision text check (hosting_decision in ('hosted', 'self-host', null)),
  add column grace_until timestamptz;
```

Migration: `supabase/migrations/003_sites_launch_state.sql`.

## API surface

### New endpoints

- `POST /api/wizard/session` — create or fetch the active wizard session for the calling user. Returns `{ sessionId, state }`.
- `PATCH /api/wizard/session/:id` — autosave. Body is partial state. Server validates ownership, writes to Supabase.
- `POST /api/wizard/checkout/just-host` — finalize Path 1 → Stripe Checkout Session
- `POST /api/wizard/checkout/build` — finalize Paths 2/3/4 → Stripe Checkout Session
- `POST /api/wizard/webhook` — Stripe webhook handler for wizard-originated checkouts (or fold into existing `/api/hosting/webhook` — implementation choice)

### Reused endpoints

- `/api/domains/checkout` — for domain purchase (called inline during Path 4 step 4)
- `/api/provision/{github,vercel,dns}` — orchestrated by `provisionSite` post-checkout
- `/api/hosting/checkout` — used by post-build launch screen for design-path "host with us" decision

### Middleware updates

In `src/middleware.ts`, add to the public-route allowlist:

- `/api/wizard/webhook(.*)` (Stripe webhook needs unauthed access)

Everything else under `/api/wizard/*` is auth-required.

## Pages affected

| Path | Change |
|------|--------|
| `/` (homepage) | Replace existing primary CTA target with `/start`. No layout change. |
| `/pricing` | Update to reflect new $250/$500/$1,000 ladder + à la carte items + 1/3/5 yr hosting. Reads from `pricing-catalog.ts`. |
| `/start` (new) | The wizard. |
| `/dashboard` | Add post-build launch panel for design-path orders that have completed but not yet chosen hosting. |
| `/dashboard/orders` | Show wizard-originated orders in the existing list (no schema change needed). |

## Telemetry / abandon recovery

Out of scope for this spec, but the data model supports it:

- A row in `wizard_sessions` with `completed_at IS NULL` for more than 24 hours is an abandon candidate
- A future cron / background job can email those customers via Resend ("Finish your KPT Designs quote")
- The infrastructure for this lands free with the autosave design

## Error handling

- **Network failure during autosave:** show a small toast, retry on next field change. Don't block the user from continuing.
- **Stripe Checkout Session creation fails:** show an inline error on the confirm step with a retry button. Do not lose collected answers.
- **Webhook arrives for an order whose wizard session no longer exists:** log and continue (the order is still legitimate; we just lost the session reference).
- **User reaches a step out of order via URL manipulation (e.g., `?step=5` without `?step=1`):** `WizardFrame` validates that all preceding required fields are present. If not, redirect to the first incomplete step.
- **Domain search (Path 4) returns no available domains for the requested name:** standard error message with retry, plus a fallback to "skip and add domain later" that sends the customer through Path 3 instead.

## Testing

Per the global CLAUDE.md verification standard:

- **Type check:** `tsc --noEmit` must pass.
- **Lint:** `eslint` must pass.
- **Unit tests:** `recommendTier` (pure function), pricing catalog accessors, autosave debounce logic.
- **Integration test:** simulate a full Path 2 flow end-to-end against a Supabase test schema, including Stripe webhook handling.
- **Browser check (manual):** start dev server, click through each of the four paths, verify each lands at a Stripe Checkout URL with the correct line items, verify abandon-and-resume works (refresh mid-step → state restored).

## Open questions / things to decide during implementation

1. **`orders` table modeling for the just-host bundle.** Options: (a) one `site_design` order + one `hosting` order, both linked to the same Stripe session via `stripe_payment_intent_id`; (b) extend `order_type` enum with a `bundle` value. Recommend (a) — no schema change, accurate accounting.
2. **Replication queue mechanism.** For the just-host path, KPT's team needs to know which sites need manual replication. Options: a new `replication_queue` table; a flag on `sites` (e.g., `needs_replication boolean`); or just reuse `sites.status = 'provisioning'` plus a comment field. Recommend a flag (`sites.replicate_from_url text`); minimum surface area.
3. **Industry list.** The wizard asks for "industry" in paths 2/3/4. Should this be a free-text field or a curated dropdown? Free text gives the customer flexibility; a dropdown drives the recommendTier heuristic. **Recommend dropdown with ~12 entries plus an "other" option.**
4. **`/dashboard/orders` display for in-progress wizard sessions.** Show them or not? If yes, how do we render an incomplete order? Recommend: don't show until `completed_at IS NOT NULL`; show "Resume your quote" CTA on the dashboard home for active sessions.

## Risks

- **Just-host replication is manual labor.** Until we automate the rebuild from a customer's existing site, the just-host path puts manual work on the team for every signup. Volume risk if the funnel converts well. Mitigation: tight Starter scope, hard cap on revisions, monitor team load.
- **Recommended-tier mis-recommendation.** The heuristic is crude in v1 (industry-based). Some customers will see "Pro recommended" when they're really a Signature, or vice-versa. Override is the safety valve, but if customers feel the recommendation is bad they may distrust the whole funnel. Mitigation: surface the rationale clearly ("we recommended Pro because you said you have 5 pages"), make it easy to override, log overrides for tuning the heuristic.
- **Pricing catalog placeholder values.** If the catalog ships with `0` cents anywhere, customers could see broken UIs or, worse, accidentally check out at $0. Mitigation: a runtime guard in checkout endpoints that refuses any line item below a configurable floor (e.g., $50). Sanity-check during the "fill in the catalog" task before launch.
- **Auth gate at Q1 reduces top-of-funnel.** Some price-curious visitors will bounce rather than create an account. Mitigation: `/pricing` stays public and informative; the homepage hero clearly previews what the wizard does before asking for auth.

## Implementation order (preview, not part of this spec)

The implementation plan will detail this; the order is roughly:

1. Pricing catalog module (replaces `hosting-plans.ts`)
2. `wizard_sessions` migration + RLS
3. `WizardFrame` shell + `/start` route + auth wiring
4. Step components (Q1 → Q6 for each path)
5. Scope picker with `recommendTier`
6. Checkout endpoints (just-host + build)
7. Stripe webhook handling for wizard orders
8. Update `/pricing` to read from new catalog
9. Update homepage CTA target
10. Post-build launch screen (`/dashboard`)
11. Manual end-to-end test through each of the four paths

## Glossary

| Term | Meaning |
|------|---------|
| Just-host path | Customer has a site they like; we rebuild it on our platform and host it. Bundled checkout. |
| Design paths | Redesign + new builds. Build paid first; hosting decided post-delivery. |
| Replication | Manually rebuilding a customer's existing site visually on the KPT template. v1 has no automation. |
| Tier | Build package: Starter ($250) / Pro ($500) / Signature ($1,000). |
| Hosting term | 1yr / 3yr / 5yr commitment for hosted customers. |
| À la carte | Optional scope expansion priced separately from the tier. Not addons; honest line items. |
| Recommendation | The auto-suggested tier shown highlighted in the scope picker. Customer overrides freely. |
| Take-the-code-and-go | Design-path customer chooses to self-host. Gets the GitHub repo and a 7-day editor grace window. |
| Post-build launch screen | Dashboard panel where design-path customers pick "host with us" or "take the code." |
