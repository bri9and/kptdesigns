/**
 * Discovery — Logo extractor.
 *
 * Heuristic-based for now (vision-model logo detection comes later).
 * Looks at the homepage's HTML signals in priority order:
 *   1. Image inside the page's <header> or <nav> with "logo" in its alt,
 *      class, id, or src.
 *   2. Anchor wrapping the logo image (`<a class="logo">`, brand link).
 *   3. <link rel="icon"> / favicon as last resort.
 *   4. og:image as a stand-in if everything else failed.
 *
 * Found logo URL is downloaded to Linode under
 *   `kptdesigns/customer-<jobId>/logo.<ext>`
 * and the storage key is recorded for the synthesizer / theme generator.
 *
 * For the spike we just record the URL — actual download to Linode is
 * stubbed (TODO: wire to Linode S3 PutObject once we have the customer
 * scoping settled).
 */
import * as cheerio from "cheerio";
import type { Agent } from "../types";

const USER_AGENT =
  "KPTDesignsBot/0.1 (+https://kptdesigns.com/bot - logo extract)";

export const logoAgent: Agent = {
  stage: "logo",
  phase: "discovery",
  label: "Finding the logo",

  async run({ findings, report }) {
    const home = findings.pages?.[0];
    if (!home || !home.url || home.url.startsWith("intake://")) {
      await report("No source URL — skipping logo lookup");
      return {};
    }

    await report(`Inspecting ${new URL(home.url).hostname}`);
    const html = await fetchHtml(home.url);
    if (!html) return {};

    const $ = cheerio.load(html);
    const origin = new URL(home.url).origin;

    const candidates = collectCandidates($, origin);
    const logoUrl = candidates[0];

    if (!logoUrl) {
      await report("No logo found — will fall back to wordmark");
      return {};
    }

    await report(`Logo: ${logoUrl}`);
    return { logoUrl };
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

  // 1. <img> inside header/nav with logo signal
  $("header img, nav img").each((_, el) => {
    const $el = $(el);
    const src = $el.attr("src") ?? $el.attr("data-src");
    const alt = ($el.attr("alt") ?? "").toLowerCase();
    const cls = ($el.attr("class") ?? "").toLowerCase();
    const id = ($el.attr("id") ?? "").toLowerCase();
    if (
      /logo|brand|wordmark/.test(alt + " " + cls + " " + id) ||
      /logo|brand|wordmark/.test(src ?? "")
    ) {
      push(src);
    }
  });

  // 2. anchor.logo / .brand / [class*=logo]
  $("a[class*=logo] img, a[class*=brand] img, a[class*=site-logo] img").each((_, el) => {
    push($(el).attr("src") ?? $(el).attr("data-src"));
  });

  // 3. svg-based logos: bail (vision needed). Skip for now.

  // 4. <link rel="icon">
  const iconHref =
    $("link[rel='apple-touch-icon']").attr("href") ||
    $("link[rel='icon'][sizes='192x192']").attr("href") ||
    $("link[rel='shortcut icon']").attr("href") ||
    $("link[rel='icon']").first().attr("href");
  push(iconHref);

  // 5. og:image (last resort — usually a hero, not a logo, but shows brand)
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
