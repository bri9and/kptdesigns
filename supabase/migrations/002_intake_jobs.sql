-- ============================================================================
-- Intake jobs — anonymous preview generation pipeline
-- A user pastes a URL on /start, we scrape it + ask Claude to generate a
-- Puck-compatible content tree, then they view the result at /preview/[id].
-- No account needed for the preview; ownership is claimed when they pay.
-- ============================================================================

create table if not exists public.intake_jobs (
  id          uuid primary key default gen_random_uuid(),

  -- Inputs the user provided
  source_url  text,                  -- URL they pasted (rebuild path)
  business_name text,                -- optional: what to call them
  notes       text,                  -- free-text intake (from-scratch path)

  -- Pipeline state
  status      text not null default 'pending'
              check (status in ('pending','scraping','generating','ready','failed')),
  error       text,                  -- non-null only when status='failed'

  -- Intermediate artifacts
  scraped     jsonb,                 -- { html, title, description, og_image, links, ... }
  raw_ai      jsonb,                 -- full Claude response for debugging

  -- Final artifact: the Puck content tree the renderer reads
  puck_data   jsonb,                 -- { content: [...blocks], root: {} }

  -- Optional extras
  business_summary text,             -- one-paragraph AI summary of the business
  brand_palette jsonb,               -- { primary, accent, ... } extracted hints

  -- Provenance
  ip          text,                  -- crude rate-limit signal (hash later)
  user_agent  text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

comment on table public.intake_jobs is
  'Anonymous URL → AI-generated site preview pipeline. Public-readable by id.';

create index if not exists idx_intake_jobs_status     on public.intake_jobs(status);
create index if not exists idx_intake_jobs_created_at on public.intake_jobs(created_at desc);
create index if not exists idx_intake_jobs_ip         on public.intake_jobs(ip);

-- Auto-bump updated_at on UPDATE
create or replace function public.intake_jobs_touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists trg_intake_jobs_updated_at on public.intake_jobs;
create trigger trg_intake_jobs_updated_at
  before update on public.intake_jobs
  for each row execute function public.intake_jobs_touch_updated_at();

-- ── RLS ───────────────────────────────────────────────────────────────────
-- Anyone can read a job by id (so a preview link is shareable).
-- Only the service role (server-side) can insert/update.

alter table public.intake_jobs enable row level security;

drop policy if exists "intake_jobs read all" on public.intake_jobs;
create policy "intake_jobs read all"
  on public.intake_jobs for select
  using (true);

-- No public insert/update/delete policies → all writes must use the service-role key.
