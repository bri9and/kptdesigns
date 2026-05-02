/**
 * Anonymous intake-job persistence using Supabase Storage.
 *
 * Why Storage instead of a Postgres table:
 *   - No migration step required (bucket is created lazily on first write).
 *   - Each job is a small JSON blob; we never query across them, only by id.
 *   - Public read URLs make sharing previews trivial.
 *
 * When we wire this to real customer accounts (post-payment), we'll move
 * the canonical record to a Postgres table (sites_drafts / customers) and
 * keep Storage only for raw scraped HTML and uploaded user assets.
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Data as PuckData } from "@measured/puck";

const BUCKET = "intake-jobs";

export type IntakeJobStatus =
  | "pending"
  | "scraping"
  | "generating"
  | "ready"
  | "failed";

export type ScrapedSnapshot = {
  url: string;
  finalUrl: string;
  status: number;
  title?: string;
  description?: string;
  ogImage?: string;
  textSummary: string; // cleaned, condensed visible text — what the AI reads
  headings: string[];
  links: { href: string; text: string }[];
  images: string[];
};

export type IntakeJob = {
  id: string;
  status: IntakeJobStatus;
  error?: string | null;

  source_url?: string | null;
  business_name?: string | null;
  notes?: string | null;

  scraped?: ScrapedSnapshot | null;
  puck_data?: PuckData | null;
  business_summary?: string | null;
  brand_palette?: { primary?: string; accent?: string } | null;
  raw_ai?: unknown;

  created_at: string;
  updated_at: string;
};

let _client: SupabaseClient | null = null;
function client(): SupabaseClient {
  if (_client) return _client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "Supabase env missing — need NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY",
    );
  }
  _client = createClient(url, key, { auth: { persistSession: false } });
  return _client;
}

let _bucketReady = false;
async function ensureBucket(): Promise<void> {
  if (_bucketReady) return;
  const sb = client();
  const { data: list } = await sb.storage.listBuckets();
  const exists = list?.some((b) => b.name === BUCKET);
  if (!exists) {
    const { error } = await sb.storage.createBucket(BUCKET, {
      public: true, // preview URLs are shareable
      fileSizeLimit: 5 * 1024 * 1024, // 5MB cap per job
    });
    if (error && !/already exists/i.test(error.message)) {
      throw new Error(`Failed to create bucket: ${error.message}`);
    }
  }
  _bucketReady = true;
}

function jobPath(id: string): string {
  return `${id}.json`;
}

export async function createIntakeJob(input: {
  source_url?: string;
  business_name?: string;
  notes?: string;
}): Promise<IntakeJob> {
  await ensureBucket();
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  const job: IntakeJob = {
    id,
    status: "pending",
    source_url: input.source_url ?? null,
    business_name: input.business_name ?? null,
    notes: input.notes ?? null,
    created_at: now,
    updated_at: now,
  };
  await writeJob(job);
  return job;
}

export async function readIntakeJob(id: string): Promise<IntakeJob | null> {
  await ensureBucket();
  const sb = client();
  const { data, error } = await sb.storage.from(BUCKET).download(jobPath(id));
  if (error || !data) return null;
  const text = await data.text();
  try {
    return JSON.parse(text) as IntakeJob;
  } catch {
    return null;
  }
}

export async function updateIntakeJob(
  id: string,
  patch: Partial<IntakeJob>,
): Promise<IntakeJob> {
  const existing = await readIntakeJob(id);
  if (!existing) {
    throw new Error(`Intake job not found: ${id}`);
  }
  const next: IntakeJob = {
    ...existing,
    ...patch,
    id: existing.id,
    created_at: existing.created_at,
    updated_at: new Date().toISOString(),
  };
  await writeJob(next);
  return next;
}

async function writeJob(job: IntakeJob): Promise<void> {
  const sb = client();
  const blob = new Blob([JSON.stringify(job)], { type: "application/json" });
  const { error } = await sb.storage
    .from(BUCKET)
    .upload(jobPath(job.id), blob, { upsert: true, contentType: "application/json" });
  if (error) {
    throw new Error(`Failed to persist intake job: ${error.message}`);
  }
}
