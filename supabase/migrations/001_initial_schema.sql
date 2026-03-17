-- ============================================================================
-- EWD Initial Schema
-- Run against a fresh Supabase project to create all tables + RLS policies.
-- ============================================================================

-- Enable UUID generation
create extension if not exists "pgcrypto";

-- ─── customers ──────────────────────────────────────────────────────────────

create table public.customers (
  id          uuid primary key default gen_random_uuid(),
  clerk_id    text unique not null,
  email       text not null,
  full_name   text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

comment on table public.customers is 'Customer records synced from Clerk authentication.';

-- ─── domains ────────────────────────────────────────────────────────────────

create table public.domains (
  id                uuid primary key default gen_random_uuid(),
  customer_id       uuid not null references public.customers(id) on delete cascade,
  domain_name       text unique not null,
  registrar         text not null default 'namesilo',
  status            text not null default 'pending'
                    check (status in ('pending', 'active', 'expired', 'transferred')),
  purchased_at      timestamptz,
  expires_at        timestamptz,
  namesilo_order_id text,
  created_at        timestamptz not null default now()
);

comment on table public.domains is 'Purchased domains tracked per customer.';

create index idx_domains_customer_id on public.domains(customer_id);

-- ─── sites ──────────────────────────────────────────────────────────────────

create table public.sites (
  id                 uuid primary key default gen_random_uuid(),
  customer_id        uuid not null references public.customers(id) on delete cascade,
  domain_id          uuid references public.domains(id) on delete set null,
  name               text not null,
  github_repo        text,
  vercel_project_id  text,
  vercel_url         text,
  status             text not null default 'provisioning'
                     check (status in ('provisioning', 'building', 'live', 'suspended')),
  template_prompt    text,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

comment on table public.sites is 'Customer websites — one site per domain.';

create index idx_sites_customer_id on public.sites(customer_id);
create index idx_sites_domain_id on public.sites(domain_id);

-- ─── orders ─────────────────────────────────────────────────────────────────

create table public.orders (
  id                        uuid primary key default gen_random_uuid(),
  customer_id               uuid not null references public.customers(id) on delete cascade,
  domain_id                 uuid references public.domains(id) on delete set null,
  site_id                   uuid references public.sites(id) on delete set null,
  type                      text not null
                            check (type in ('domain', 'site_design', 'hosting')),
  amount_cents              integer not null,
  currency                  text not null default 'usd',
  stripe_payment_intent_id  text,
  stripe_subscription_id    text,
  status                    text not null default 'pending'
                            check (status in ('pending', 'paid', 'failed', 'refunded')),
  created_at                timestamptz not null default now()
);

comment on table public.orders is 'Payment history linked to domains and sites.';

create index idx_orders_customer_id on public.orders(customer_id);

-- ─── site_drafts ────────────────────────────────────────────────────────────

create table public.site_drafts (
  id              uuid primary key default gen_random_uuid(),
  site_id         uuid not null references public.sites(id) on delete cascade,
  customer_id     uuid not null references public.customers(id) on delete cascade,
  prompt          text not null,
  generated_code  text,
  status          text not null default 'generating'
                  check (status in ('generating', 'ready', 'approved', 'rejected')),
  created_at      timestamptz not null default now(),
  approved_at     timestamptz
);

comment on table public.site_drafts is 'AI-generated site drafts pending customer approval.';

create index idx_site_drafts_site_id on public.site_drafts(site_id);
create index idx_site_drafts_customer_id on public.site_drafts(customer_id);

-- ─── updated_at trigger ─────────────────────────────────────────────────────

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_customers_updated_at
  before update on public.customers
  for each row execute function public.set_updated_at();

create trigger trg_sites_updated_at
  before update on public.sites
  for each row execute function public.set_updated_at();

-- ============================================================================
-- Row-Level Security
-- ============================================================================
--
-- Strategy:
--   - Every table has RLS enabled.
--   - Authenticated users can only access rows where the customer's clerk_id
--     matches their JWT claim: auth.jwt() ->> 'sub' (Clerk user ID).
--   - The service_role key bypasses RLS entirely for backend operations.
-- ============================================================================

-- Helper: resolve the current Clerk user's customer UUID.
-- Returns NULL if no matching customer exists (denying access by default).
create or replace function public.current_customer_id()
returns uuid as $$
  select id from public.customers
  where clerk_id = (auth.jwt() ->> 'sub')
  limit 1;
$$ language sql stable security definer;

-- ─── customers RLS ──────────────────────────────────────────────────────────

alter table public.customers enable row level security;

create policy "customers_select_own"
  on public.customers for select
  using (clerk_id = (auth.jwt() ->> 'sub'));

create policy "customers_update_own"
  on public.customers for update
  using (clerk_id = (auth.jwt() ->> 'sub'))
  with check (clerk_id = (auth.jwt() ->> 'sub'));

-- Insert/delete handled by service role only (Clerk webhook sync).

-- ─── domains RLS ────────────────────────────────────────────────────────────

alter table public.domains enable row level security;

create policy "domains_select_own"
  on public.domains for select
  using (customer_id = public.current_customer_id());

create policy "domains_insert_own"
  on public.domains for insert
  with check (customer_id = public.current_customer_id());

create policy "domains_update_own"
  on public.domains for update
  using (customer_id = public.current_customer_id())
  with check (customer_id = public.current_customer_id());

create policy "domains_delete_own"
  on public.domains for delete
  using (customer_id = public.current_customer_id());

-- ─── sites RLS ──────────────────────────────────────────────────────────────

alter table public.sites enable row level security;

create policy "sites_select_own"
  on public.sites for select
  using (customer_id = public.current_customer_id());

create policy "sites_insert_own"
  on public.sites for insert
  with check (customer_id = public.current_customer_id());

create policy "sites_update_own"
  on public.sites for update
  using (customer_id = public.current_customer_id())
  with check (customer_id = public.current_customer_id());

create policy "sites_delete_own"
  on public.sites for delete
  using (customer_id = public.current_customer_id());

-- ─── orders RLS ─────────────────────────────────────────────────────────────

alter table public.orders enable row level security;

create policy "orders_select_own"
  on public.orders for select
  using (customer_id = public.current_customer_id());

create policy "orders_insert_own"
  on public.orders for insert
  with check (customer_id = public.current_customer_id());

-- Orders are immutable from the client — no update/delete policies.
-- Refunds and status changes are handled by the service role via webhooks.

-- ─── site_drafts RLS ────────────────────────────────────────────────────────

alter table public.site_drafts enable row level security;

create policy "site_drafts_select_own"
  on public.site_drafts for select
  using (customer_id = public.current_customer_id());

create policy "site_drafts_insert_own"
  on public.site_drafts for insert
  with check (customer_id = public.current_customer_id());

create policy "site_drafts_update_own"
  on public.site_drafts for update
  using (customer_id = public.current_customer_id())
  with check (customer_id = public.current_customer_id());

-- No delete — drafts are kept for audit trail.
