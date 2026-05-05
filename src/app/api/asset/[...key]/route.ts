/**
 * GET /api/asset/<key...>
 *
 * Proxies a Linode-stored object via a freshly-signed GET URL.
 * Pattern matches kptagents' storage model: objects stay private,
 * each request through this route gets a short-lived presigned URL.
 *
 * We 302-redirect the browser to the signed URL rather than streaming
 * the bytes through our function — saves bandwidth + lets the browser
 * cache the redirect target normally.
 *
 * Path scoping: only objects under `kptdesigns/` are reachable. This
 * keeps preview viewers from probing other prefixes inside the shared
 * bucket (e.g. kptagents' invoices).
 */
import { NextResponse } from "next/server";
import {
  S3Client,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const runtime = "nodejs";

const PROJECT_PREFIX = "kptdesigns/";
const SIGN_TTL_SECONDS = 300;       // 5 minutes — browser will refetch on next page load

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

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ key: string[] }> },
) {
  const { key } = await ctx.params;
  if (!Array.isArray(key) || key.length === 0) {
    return NextResponse.json({ error: "missing key" }, { status: 400 });
  }
  const fullKey = key.join("/");

  // Only kptdesigns/ prefix is reachable through this route.
  if (!fullKey.startsWith(PROJECT_PREFIX)) {
    return NextResponse.json({ error: "out of scope" }, { status: 403 });
  }

  const cfg = ensureClient();
  if (!cfg) {
    return NextResponse.json({ error: "storage not configured" }, { status: 503 });
  }

  try {
    const signed = await getSignedUrl(
      cfg.client,
      new GetObjectCommand({ Bucket: cfg.bucket, Key: fullKey }),
      { expiresIn: SIGN_TTL_SECONDS },
    );
    // 302 to the signed URL with a short cache so the browser doesn't
    // re-hit our route for every <img> on every page render.
    return NextResponse.redirect(signed, {
      status: 302,
      headers: { "Cache-Control": "private, max-age=240" },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 502 });
  }
}
