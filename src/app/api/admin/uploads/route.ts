/**
 * POST /api/admin/uploads
 *
 * Multipart endpoint for admin-uploaded customer assets in the no-URL flow.
 * Files land at kptdesigns/customer-<jobId>/uploads/<sha8>.<ext> in Linode.
 *
 * Request: multipart/form-data with
 *   - jobId?: string         (optional — when omitted, a fresh UUID is generated)
 *   - files: File[]          (one or many)
 *
 * Response: { jobId: string, keys: string[] }
 *
 * Limits:
 *   - 5MB per file (Linode helper enforces)
 *   - 12 files per request (avoid one admin paralyzing the pipeline)
 *   - Only image/* mimetypes accepted in v1
 */
import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import crypto from "node:crypto";
import { isAdmin } from "@/lib/auth/admin";
import { currentUser } from "@clerk/nextjs/server";

export const runtime = "nodejs";
export const maxDuration = 60;

const MAX_FILES = 12;
const MAX_BYTES = 5 * 1024 * 1024;
const PROJECT_PREFIX = "kptdesigns";

function unq(s?: string): string | undefined {
  return s?.replace(/^"|"$/g, "");
}

function pickExt(contentType: string, fileName: string): string {
  if (contentType.includes("svg")) return ".svg";
  if (contentType.includes("png")) return ".png";
  if (contentType.includes("jpeg") || contentType.includes("jpg")) return ".jpg";
  if (contentType.includes("webp")) return ".webp";
  if (contentType.includes("gif")) return ".gif";
  if (contentType.includes("avif")) return ".avif";
  const m = fileName.match(/\.[a-z0-9]{2,5}$/i);
  return m ? m[0].toLowerCase() : ".bin";
}

function shortHash(buf: Buffer): string {
  return crypto.createHash("sha1").update(buf).digest("hex").slice(0, 10);
}

export async function POST(req: Request) {
  const user = await currentUser();
  if (!isAdmin(user)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const accessKeyId = unq(process.env.LINODE_STORAGE_ACCESS_KEY);
  const secretAccessKey = unq(process.env.LINODE_STORAGE_SECRET_KEY);
  const endpoint = unq(process.env.LINODE_STORAGE_ENDPOINT);
  const region = unq(process.env.LINODE_STORAGE_REGION) || "us-east-1";
  const bucket = unq(process.env.LINODE_STORAGE_BUCKET_NAME);
  if (!accessKeyId || !secretAccessKey || !endpoint || !bucket) {
    return NextResponse.json(
      { error: "Linode storage not configured" },
      { status: 500 },
    );
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

  const jobId =
    (form.get("jobId") as string | null)?.trim() || randomUUID();
  const files = form.getAll("files").filter((v): v is File => v instanceof File);

  if (files.length === 0) {
    return NextResponse.json({ error: "No files in request" }, { status: 400 });
  }
  if (files.length > MAX_FILES) {
    return NextResponse.json(
      { error: `Too many files (max ${MAX_FILES})` },
      { status: 400 },
    );
  }

  const client = new S3Client({
    region,
    endpoint,
    credentials: { accessKeyId, secretAccessKey },
    forcePathStyle: true,
  });

  const keys: string[] = [];
  for (const file of files) {
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: `Only image uploads supported (got ${file.type || "unknown"})` },
        { status: 400 },
      );
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: `${file.name} exceeds ${MAX_BYTES} bytes` },
        { status: 400 },
      );
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = pickExt(file.type, file.name);
    const key = `${PROJECT_PREFIX}/customer-${jobId}/uploads/${shortHash(buffer)}${ext}`;

    await client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: buffer,
        ContentType: file.type,
        CacheControl: "public, max-age=86400",
      }),
    );
    keys.push(key);
  }

  return NextResponse.json({ jobId, keys });
}
