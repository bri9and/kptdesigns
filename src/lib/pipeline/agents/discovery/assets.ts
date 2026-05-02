/**
 * Discovery — Asset collector.
 *
 * Walks every <img> URL captured by the crawler, downloads them to
 * Linode under kptdesigns/customer-<jobId>/assets/, and accumulates
 * the resulting public URLs in findings.assetKeys + a parallel array
 * of public URLs (the curator and bind agents use those).
 *
 * Limits:
 *   - 24 unique image URLs max (across all crawled pages)
 *   - 5MB per image (enforced in customer-storage.uploadFromUrl)
 *   - Skips obviously-irrelevant assets (favicons handled by logo agent,
 *     huge background hero images deferred for now via byte cap)
 */
import { uploadFromUrl, type StoredAsset } from "../../customer-storage";
import type { Agent } from "../types";

const MAX_ASSETS = 24;
const MAX_CONCURRENCY = 6;

export const assetsAgent: Agent = {
  stage: "assets",
  phase: "discovery",
  label: "Collecting customer images",
  dependsOn: ["crawl"], // needs findings.pages

  async run({ jobId, findings, report }) {
    const pages = findings.pages ?? [];
    if (pages.length === 0) {
      await report("No pages crawled — nothing to collect");
      return {};
    }

    const seen = new Set<string>();
    const queue: string[] = [];
    for (const p of pages) {
      for (const img of p.images ?? []) {
        if (queue.length >= MAX_ASSETS) break;
        const cleaned = img.split("?")[0];
        if (!isImageLike(cleaned)) continue;
        if (seen.has(cleaned)) continue;
        seen.add(cleaned);
        queue.push(img);
      }
      if (queue.length >= MAX_ASSETS) break;
    }

    if (queue.length === 0) {
      await report("Crawl found no usable image URLs");
      return {};
    }

    await report(`Downloading ${queue.length} images`);

    const stored: StoredAsset[] = [];
    let i = 0;

    async function worker() {
      while (i < queue.length) {
        const idx = i++;
        const url = queue[idx];
        const r = await uploadFromUrl(jobId, url, { kind: "asset" });
        if (r) stored.push(r);
      }
    }
    await Promise.all(
      Array.from({ length: Math.min(MAX_CONCURRENCY, queue.length) }, () => worker()),
    );

    await report(`Stored ${stored.length} of ${queue.length}`);

    return {
      assetKeys: stored.map((s) => s.key),
      // also stash full StoredAsset records so curator can show metadata
      // (sourceUrl + bytes) — re-derived by curator from these arrays
    };
  },
};

const SKIP_HOST = /(googletagmanager|facebook\.net|gstatic|google-analytics)/i;

function isImageLike(url: string): boolean {
  try {
    const u = new URL(url);
    if (SKIP_HOST.test(u.hostname)) return false;
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/i.test(u.pathname);
  } catch {
    return false;
  }
}
