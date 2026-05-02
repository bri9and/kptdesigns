/**
 * Per-customer asset storage helpers (Linode S3, public-read).
 *
 * Layout inside the shared `kptdesigns/` namespace:
 *
 *   kptdesigns/customer-<jobId>/logo.<ext>
 *   kptdesigns/customer-<jobId>/assets/<sha8>.<ext>
 *
 * Public URL format (Linode path-style):
 *   https://<bucket>.<endpointHost>/<key>
 *
 * Linode endpoint env value is the regional URL (e.g.
 * https://us-southeast-1.linodeobjects.com); we drop the bucket as a
 * subdomain because Linode supports both and the subdomain form
 * generates clean URLs without a trailing /<bucket>/.
 */
import {
  S3Client,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import crypto from "node:crypto";

const PROJECT_PREFIX = "kptdesigns";

const FETCH_TIMEOUT_MS = 15_000;
const MAX_BYTES = 5 * 1024 * 1024;
const USER_AGENT =
  "KPTDesignsBot/0.1 (+https://kptdesigns.com/bot - asset collect)";

let _client: S3Client | null = null;
let _bucket: string | null = null;
let _publicHost: string | null = null;

function unq(s?: string): string | undefined {
  return s?.replace(/^"|"$/g, "");
}

function ensureClient(): { client: S3Client; bucket: string; publicHost: string } | null {
  if (_client && _bucket && _publicHost) {
    return { client: _client, bucket: _bucket, publicHost: _publicHost };
  }
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
  // Linode accepts both subdomain and path-style URLs. We use subdomain
  // form for public URLs because it produces cleaner, CDN-friendlier paths.
  const host = endpoint.replace(/^https?:\/\//, "").replace(/\/+$/, "");
  _publicHost = `${bucket}.${host}`;
  return { client: _client, bucket, publicHost: _publicHost };
}

export type StoredAsset = {
  key: string;            // S3 key inside the bucket
  publicUrl: string;      // Browser-loadable URL
  sourceUrl: string;      // Where we pulled it from
  contentType?: string;
  bytes?: number;
};

export async function uploadFromUrl(
  jobId: string,
  sourceUrl: string,
  opts: { kind: "logo" | "asset"; basename?: string } = { kind: "asset" },
): Promise<StoredAsset | null> {
  const cfg = ensureClient();
  if (!cfg) return null;

  const fetched = await fetchToBuffer(sourceUrl);
  if (!fetched) return null;
  const { buffer, contentType } = fetched;

  const ext = pickExt(contentType, sourceUrl);
  const baseKey =
    opts.kind === "logo"
      ? `${PROJECT_PREFIX}/customer-${jobId}/logo${ext}`
      : `${PROJECT_PREFIX}/customer-${jobId}/assets/${shortHash(sourceUrl)}${ext}`;

  // Linode S3 doesn't implement per-object ACLs. Public read needs to be
  // configured on the bucket itself (the kptagents-dev bucket already is).
  await cfg.client.send(
    new PutObjectCommand({
      Bucket: cfg.bucket,
      Key: baseKey,
      Body: buffer,
      ContentType: contentType ?? "application/octet-stream",
      CacheControl: "public, max-age=86400",
    }),
  );

  return {
    key: baseKey,
    publicUrl: publicUrlFor(baseKey) ?? `https://${cfg.publicHost}/${baseKey}`,
    sourceUrl,
    contentType,
    bytes: buffer.byteLength,
  };
}

/**
 * Returns a stable, browser-loadable URL for an object key. Routes through
 * /api/asset which signs a Linode GET URL on each request — preview links
 * stay valid forever even though the underlying objects are private.
 */
export function publicUrlFor(key: string): string | null {
  if (!key) return null;
  return `/api/asset/${key}`;
}

/* --------------------------- internals --------------------------- */

async function fetchToBuffer(
  url: string,
): Promise<{ buffer: Buffer; contentType?: string } | null> {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": USER_AGENT, Accept: "image/*,*/*;q=0.8" },
      signal: controller.signal,
      redirect: "follow",
    });
    if (!res.ok) return null;
    const contentType = res.headers.get("content-type") ?? undefined;
    const len = parseInt(res.headers.get("content-length") ?? "0", 10);
    if (len > MAX_BYTES) return null;
    const ab = await res.arrayBuffer();
    if (ab.byteLength > MAX_BYTES) return null;
    return { buffer: Buffer.from(ab), contentType };
  } catch {
    return null;
  } finally {
    clearTimeout(t);
  }
}

function pickExt(contentType: string | undefined, url: string): string {
  if (contentType) {
    if (contentType.includes("svg")) return ".svg";
    if (contentType.includes("png")) return ".png";
    if (contentType.includes("jpeg") || contentType.includes("jpg")) return ".jpg";
    if (contentType.includes("webp")) return ".webp";
    if (contentType.includes("gif")) return ".gif";
    if (contentType.includes("avif")) return ".avif";
    if (contentType.includes("ico")) return ".ico";
  }
  const m = new URL(url).pathname.match(/\.[a-z0-9]{2,5}$/i);
  return m ? m[0].toLowerCase() : ".bin";
}

function shortHash(s: string): string {
  return crypto.createHash("sha1").update(s).digest("hex").slice(0, 10);
}
