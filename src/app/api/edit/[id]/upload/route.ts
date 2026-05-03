/**
 * POST /api/edit/[id]/upload
 *
 * Multipart file upload — receives a single image, pushes it to
 * Linode under the customer's per-job prefix, returns the proxy URL
 * the studio can drop into a swapped <img src=…>.
 *
 * Body: multipart/form-data with a "file" field.
 * Response: { url: "/api/asset/kptdesigns/customer-<jobId>/assets/<hash>.<ext>" }
 */
import { NextResponse } from "next/server";
import {
  S3Client,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import crypto from "node:crypto";
import { readIntakeJob } from "@/lib/intake-store";
import { publicUrlFor } from "@/lib/pipeline/customer-storage";

export const runtime = "nodejs";

const PROJECT_PREFIX = "kptdesigns";
const MAX_BYTES = 8 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "image/avif",
]);

let _client: S3Client | null = null;
let _bucket: string | null = null;

function unq(s?: string): string | undefined {
  return s?.replace(/^"|"$/g, "");
}

function ensureClient(): { client: S3Client; bucket: string } | null {
  if (_client && _bucket) return { client: _client, bucket: _bucket };
  const accessKeyId = unq(process.env.LINODE_STORAGE_ACCESS_KEY);
  const secretAccessKey = unq(process.env.LINODE_STORAGE_SECRET_KEY);
  const endpoint = unq(process.env.LINODE_STORAGE_ENDPOINT);
  const region = unq(process.env.LINODE_STORAGE_REGION) || "us-east-1";
  const bucket = unq(process.env.LINODE_STORAGE_BUCKET_NAME);
  if (!accessKeyId || !secretAccessKey || !endpoint || !bucket) return null;
  _client = new S3Client({
    region,
    endpoint,
    credentials: { accessKeyId, secretAccessKey },
    forcePathStyle: true,
  });
  _bucket = bucket;
  return { client: _client, bucket };
}

export async function POST(
  req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const { id } = await ctx.params;

  const job = await readIntakeJob(id);
  if (!job) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json(
      { error: "Expected multipart/form-data" },
      { status: 400 },
    );
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing 'file' field" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: `File too large (${file.size} > ${MAX_BYTES})` },
      { status: 413 },
    );
  }
  const contentType = file.type || "application/octet-stream";
  if (!ALLOWED_TYPES.has(contentType) && !contentType.startsWith("image/")) {
    return NextResponse.json(
      { error: `Content-Type ${contentType} not allowed` },
      { status: 415 },
    );
  }

  const cfg = ensureClient();
  if (!cfg) {
    return NextResponse.json(
      { error: "Storage not configured" },
      { status: 503 },
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const hash = crypto.createHash("sha1").update(buffer).digest("hex").slice(0, 10);
  const ext = pickExt(contentType, file.name);
  const key = `${PROJECT_PREFIX}/customer-${id}/assets/upload-${hash}${ext}`;

  await cfg.client.send(
    new PutObjectCommand({
      Bucket: cfg.bucket,
      Key: key,
      Body: buffer,
      ContentType: contentType,
      CacheControl: "public, max-age=86400",
    }),
  );

  return NextResponse.json({
    url: publicUrlFor(key),
    key,
    bytes: buffer.byteLength,
  });
}

function pickExt(contentType: string, filename: string): string {
  if (contentType.includes("svg")) return ".svg";
  if (contentType.includes("png")) return ".png";
  if (contentType.includes("jpeg") || contentType.includes("jpg")) return ".jpg";
  if (contentType.includes("webp")) return ".webp";
  if (contentType.includes("gif")) return ".gif";
  if (contentType.includes("avif")) return ".avif";
  const m = filename.match(/\.[a-z0-9]{2,5}$/i);
  return m ? m[0].toLowerCase() : ".bin";
}
