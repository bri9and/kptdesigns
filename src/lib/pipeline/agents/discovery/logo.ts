/**
 * Discovery — Logo extractor.
 *
 * 1. Heuristically finds candidate logo URLs in the homepage HTML
 *    (header/nav <img> tagged "logo", brand anchor, link[rel=icon],
 *     og:image as last resort).
 * 2. Downloads the first viable candidate to Linode under
 *      kptdesigns/customer-<jobId>/logo.<ext>
 * 3. Returns both the storage key and the public URL so downstream
 *    blocks (CustomerHero.logoSrc) can use it.
 */
import * as cheerio from "cheerio";
import { uploadFromUrl } from "../../customer-storage";
import { normalizeUrl } from "@/lib/scraper";
import type { Agent } from "../types";

const USER_AGENT =
  "KPTDesignsBot/0.1 (+https://kptdesigns.com/bot - logo extract)";

export const logoAgent: Agent = {
  stage: "logo",
  phase: "discovery",
  label: "Finding the logo",
  // No deps — fetches the homepage independently of the crawler.

  async run({ jobId, input, report }) {
    if (!input.sourceUrl) {
      await report("No source URL — skipping logo lookup");
      return {};
    }

    const startUrl = normalizeUrl(input.sourceUrl);
    await report(`Inspecting ${new URL(startUrl).hostname}`);

    const html = await fetchHtml(startUrl);
    if (!html) {
      await report("Couldn't fetch homepage — no logo");
      return {};
    }

    const $ = cheerio.load(html);
    const origin = new URL(startUrl).origin;

    const candidates = collectCandidates($, origin);
    if (candidates.length === 0) {
      await report("No candidate logo found");
      return {};
    }

    // Try each candidate until one uploads successfully.
    for (const url of candidates) {
      await report(`Trying ${url.slice(0, 80)}`);
      const stored = await uploadFromUrl(jobId, url, { kind: "logo" });
      if (stored) {
        await report(`Logo stored at ${stored.publicUrl.slice(-60)}`);
        return { logoUrl: stored.publicUrl, logoKey: stored.key };
      }
    }

    await report("All logo candidates failed to upload");
    return {};
  },
};

async function fetchHtml(url: string): Promise<string | null> {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), 12_000);
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": USER_AGENT, Accept: "text/html" },
      signal: controller.signal,
      redirect: "follow",
    });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  } finally {
    clearTimeout(t);
  }
}

function collectCandidates($: cheerio.CheerioAPI, origin: string): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  const push = (raw?: string | null) => {
    if (!raw) return;
    const abs = absolutize(raw, origin);
    if (abs && !seen.has(abs)) {
      seen.add(abs);
      out.push(abs);
    }
  };

  $("header img, nav img").each((_, el) => {
    const $el = $(el);
    const src = $el.attr("src") ?? $el.attr("data-src");
    const alt = ($el.attr("alt") ?? "").toLowerCase();
    const cls = ($el.attr("class") ?? "").toLowerCase();
    const id = ($el.attr("id") ?? "").toLowerCase();
    if (
      /logo|brand|wordmark/.test(`${alt} ${cls} ${id}`) ||
      /logo|brand|wordmark/.test(src ?? "")
    ) {
      push(src);
    }
  });

  $("a[class*=logo] img, a[class*=brand] img, a[class*=site-logo] img").each((_, el) => {
    push($(el).attr("src") ?? $(el).attr("data-src"));
  });

  // Apple-touch-icon usually highest-resolution favicon.
  const iconHref =
    $("link[rel='apple-touch-icon']").attr("href") ||
    $("link[rel='icon'][sizes='192x192']").attr("href") ||
    $("link[rel='shortcut icon']").attr("href") ||
    $("link[rel='icon']").first().attr("href");
  push(iconHref);

  push($("meta[property='og:image']").attr("content"));

  return out;
}

function absolutize(href: string, origin: string): string | undefined {
  if (!href) return undefined;
  if (/^(data|javascript|mailto|tel):/i.test(href)) return undefined;
  try {
    return new URL(href, origin).toString();
  } catch {
    return undefined;
  }
}
