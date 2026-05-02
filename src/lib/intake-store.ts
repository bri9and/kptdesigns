/**
 * Anonymous intake-job persistence.
 *
 * Two backends, transparently chosen:
 *   1. Supabase Storage when NEXT_PUBLIC_SUPABASE_URL is reachable.
 *      Bucket "intake-jobs" is created lazily on first write.
 *      Each job is one JSON blob keyed by id; public-read so preview
 *      links are shareable.
 *   2. Local filesystem fallback at /tmp/kpt-intake/<id>.json when
 *      Supabase is missing or unreachable. Lets the spike run offline
 *      and on dev machines without infra. Logs a one-time warning.
 *
 * When we later promote intake jobs to a real Postgres row (during the
 * checkout/payment step), the canonical record moves to a `sites_drafts`
 * table and Storage is used only for raw scraped HTML and uploaded
 * customer assets.
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Data as PuckData } from "@measured/puck";
import { promises as fs } from "node:fs";
import path from "node:path";
import os from "node:os";

const BUCKET = "intake-jobs";
const FALLBACK_DIR = path.join(os.tmpdir(), "kpt-intake");

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
  textSummary: string;
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

/* ------------------------------------------------------------------ */
/* Backend selection                                                   */
/* ------------------------------------------------------------------ */

type Backend = "supabase" | "fs";
let _backend: Backend | null = null;
let _client: SupabaseClient | null = null;
let _bucketReady = false;
let _warnedFallback = false;

async function pickBackend(): Promise<Backend> {
  if (_backend) return _backend;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/^"|"$/g, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.replace(/^"|"$/g, "");

  if (!url || !key) {
    _backend = "fs";
    if (!_warnedFallback) {
      _warnedFallback = true;
      console.warn(
        "[intake-store] Supabase env missing — using local filesystem fallback at",
        FALLBACK_DIR,
      );
    }
    return _backend;
  }

  // Probe DNS quickly via a HEAD request with a tight timeout — if the
  // host doesn't resolve we don't want every storage call to wait 30s.
  try {
    const probe = new AbortController();
    const t = setTimeout(() => probe.abort(), 1500);
    await fetch(url, { method: "HEAD", signal: probe.signal }).catch(() => {
      throw new Error("unreachable");
    });
    clearTimeout(t);
    _client = createClient(url, key, { auth: { persistSession: false } });
    _backend = "supabase";
  } catch {
    _backend = "fs";
    if (!_warnedFallback) {
      _warnedFallback = true;
      console.warn(
        "[intake-store] Supabase unreachable at",
        url,
        "— using local filesystem fallback at",
        FALLBACK_DIR,
      );
    }
  }

  return _backend;
}

/* ------------------------------------------------------------------ */
/* FS backend                                                          */
/* ------------------------------------------------------------------ */

async function fsEnsureDir(): Promise<void> {
  await fs.mkdir(FALLBACK_DIR, { recursive: true });
}

function fsPath(id: string): string {
  return path.join(FALLBACK_DIR, `${id}.json`);
}

async function fsWriteJob(job: IntakeJob): Promise<void> {
  await fsEnsureDir();
  await fs.writeFile(fsPath(job.id), JSON.stringify(job, null, 2), "utf8");
}

async function fsReadJob(id: string): Promise<IntakeJob | null> {
  try {
    const text = await fs.readFile(fsPath(id), "utf8");
    return JSON.parse(text) as IntakeJob;
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------ */
/* Supabase backend                                                    */
/* ------------------------------------------------------------------ */

async function supabaseEnsureBucket(): Promise<void> {
  if (_bucketReady || !_client) return;
  const { data: list } = await _client.storage.listBuckets();
  const exists = list?.some((b) => b.name === BUCKET);
  if (!exists) {
    const { error } = await _client.storage.createBucket(BUCKET, {
      public: true,
      fileSizeLimit: 5 * 1024 * 1024,
    });
    if (error && !/already exists/i.test(error.message)) {
      throw new Error(`Failed to create bucket: ${error.message}`);
    }
  }
  _bucketReady = true;
}

function supabasePath(id: string): string {
  return `${id}.json`;
}

async function supabaseWriteJob(job: IntakeJob): Promise<void> {
  if (!_client) throw new Error("Supabase client not initialized");
  await supabaseEnsureBucket();
  const blob = new Blob([JSON.stringify(job)], { type: "application/json" });
  const { error } = await _client.storage
    .from(BUCKET)
    .upload(supabasePath(job.id), blob, {
      upsert: true,
      contentType: "application/json",
    });
  if (error) {
    throw new Error(`Failed to persist intake job: ${error.message}`);
  }
}

async function supabaseReadJob(id: string): Promise<IntakeJob | null> {
  if (!_client) return null;
  await supabaseEnsureBucket();
  const { data } = await _client.storage.from(BUCKET).download(supabasePath(id));
  if (!data) return null;
  const text = await data.text();
  try {
    return JSON.parse(text) as IntakeJob;
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------ */
/* Public API                                                          */
/* ------------------------------------------------------------------ */

export async function createIntakeJob(input: {
  source_url?: string;
  business_name?: string;
  notes?: string;
}): Promise<IntakeJob> {
  const backend = await pickBackend();
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
  if (backend === "supabase") await supabaseWriteJob(job);
  else await fsWriteJob(job);
  return job;
}

export async function readIntakeJob(id: string): Promise<IntakeJob | null> {
  const backend = await pickBackend();
  if (backend === "supabase") return supabaseReadJob(id);
  return fsReadJob(id);
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
  const backend = await pickBackend();
  if (backend === "supabase") await supabaseWriteJob(next);
  else await fsWriteJob(next);
  return next;
}

/** For diagnostics. Returns the active backend ('supabase' | 'fs'). */
export async function intakeStoreBackend(): Promise<Backend> {
  return pickBackend();
}
