/**
 * Anonymous intake-job persistence.
 *
 * Storage layout (Linode Object Storage, S3-compatible — same bucket as
 * kptagents, namespaced under `kptdesigns/` so the two products' data
 * does not collide):
 *
 *   kptdesigns/intake-jobs/<id>.json    — one JSON blob per job
 *
 * Two backends, transparently chosen:
 *   1. Linode S3 when the LINODE_STORAGE_* env vars are present and
 *      reachable. Default in production.
 *   2. Local filesystem fallback at /tmp/kpt-intake/<id>.json when
 *      Linode env is missing or the endpoint is unreachable. Lets the
 *      spike run offline and on dev machines without infra.
 *
 * When we promote intake jobs to a real DB row (post-payment customer
 * record), the canonical record moves to Postgres / MySQL with a
 * `project='kptdesigns'` discriminator and storage is used only for
 * raw scraped HTML and uploaded customer assets.
 */
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import type { Data as PuckData } from "@measured/puck";
import { promises as fs } from "node:fs";
import path from "node:path";
import os from "node:os";
import { Readable } from "node:stream";

const PROJECT_PREFIX = "kptdesigns/intake-jobs";
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

type Backend = "linode" | "fs";
let _backend: Backend | null = null;
let _client: S3Client | null = null;
let _bucket: string | null = null;
let _warnedFallback = false;

function unquote(s?: string): string | undefined {
  if (s === undefined) return undefined;
  return s.replace(/^"|"$/g, "");
}

async function pickBackend(): Promise<Backend> {
  if (_backend) return _backend;

  const accessKeyId = unquote(process.env.LINODE_STORAGE_ACCESS_KEY);
  const secretAccessKey = unquote(process.env.LINODE_STORAGE_SECRET_KEY);
  const endpoint = unquote(process.env.LINODE_STORAGE_ENDPOINT);
  const region = unquote(process.env.LINODE_STORAGE_REGION) || "us-east-1";
  const bucket = unquote(process.env.LINODE_STORAGE_BUCKET_NAME);

  if (!accessKeyId || !secretAccessKey || !endpoint || !bucket) {
    _backend = "fs";
    if (!_warnedFallback) {
      _warnedFallback = true;
      console.warn(
        "[intake-store] Linode env missing — using local filesystem fallback at",
        FALLBACK_DIR,
      );
    }
    return _backend;
  }

  try {
    _client = new S3Client({
      region,
      endpoint,
      credentials: { accessKeyId, secretAccessKey },
      forcePathStyle: true,
    });
    _bucket = bucket;
    _backend = "linode";
  } catch (err) {
    _backend = "fs";
    if (!_warnedFallback) {
      _warnedFallback = true;
      const msg = err instanceof Error ? err.message : String(err);
      console.warn(
        "[intake-store] Linode client init failed — falling back to FS:",
        msg,
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
/* Linode S3 backend                                                   */
/* ------------------------------------------------------------------ */

function linodeKey(id: string): string {
  return `${PROJECT_PREFIX}/${id}.json`;
}

async function linodeWriteJob(job: IntakeJob): Promise<void> {
  if (!_client || !_bucket) throw new Error("Linode client not initialized");
  await _client.send(
    new PutObjectCommand({
      Bucket: _bucket,
      Key: linodeKey(job.id),
      Body: JSON.stringify(job),
      ContentType: "application/json",
      // Short cache so we can read-after-write for status polling.
      CacheControl: "no-store",
    }),
  );
}

async function linodeReadJob(id: string): Promise<IntakeJob | null> {
  if (!_client || !_bucket) return null;
  try {
    const out = await _client.send(
      new GetObjectCommand({ Bucket: _bucket, Key: linodeKey(id) }),
    );
    if (!out.Body) return null;
    const text = await streamToString(out.Body as Readable);
    return JSON.parse(text) as IntakeJob;
  } catch (err: unknown) {
    const e = err as {
      name?: string;
      $metadata?: { httpStatusCode?: number };
    };
    if (e?.name === "NoSuchKey" || e?.$metadata?.httpStatusCode === 404) {
      return null;
    }
    throw err;
  }
}

async function streamToString(stream: Readable): Promise<string> {
  const chunks: Buffer[] = [];
  for await (const chunk of stream) chunks.push(Buffer.from(chunk));
  return Buffer.concat(chunks).toString("utf8");
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
  if (backend === "linode") await linodeWriteJob(job);
  else await fsWriteJob(job);
  return job;
}

export async function readIntakeJob(id: string): Promise<IntakeJob | null> {
  const backend = await pickBackend();
  if (backend === "linode") return linodeReadJob(id);
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
  if (backend === "linode") await linodeWriteJob(next);
  else await fsWriteJob(next);
  return next;
}

/** For diagnostics. Returns the active backend ('linode' | 'fs'). */
export async function intakeStoreBackend(): Promise<Backend> {
  return pickBackend();
}
