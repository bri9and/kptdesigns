/**
 * Discovery — Crawler agent.
 *
 * Fetches the customer's site (Cheerio for now; Playwright in Vercel
 * Sandbox is the next iteration). Walks internal links breadth-first
 * up to MAX_PAGES so we have enough content for the synthesis phase to
 * understand what the business actually does.
 *
 * Per page we keep: title, description, condensed visible text, headings,
 * link list, image URLs. Original raw HTML is dropped — too big to keep,
 * not useful downstream.
 */
import * as cheerio from "cheerio";
import { normalizeUrl } from "@/lib/scraper";
import type { Agent } from "../types";
import type { CrawledPage } from "../../types";

const USER_AGENT =
  "KPTDesignsBot/0.1 (+https://kptdesigns.com/bot - site rebuild preview)";
const FETCH_TIMEOUT_MS = 15_000;
const MAX_PAGES = 8;
const MAX_TEXT_PER_PAGE = 4_000;
const MAX_LINKS_PER_PAGE = 30;
const MAX_IMAGES_PER_PAGE = 12;
const MAX_HEADINGS_PER_PAGE = 30;

export const crawlerAgent: Agent = {
  stage: "crawl",
  phase: "discovery",
  label: "Crawling site",

  async run({ input, report }) {
    if (!input.sourceUrl) {
      // From-scratch path: nothing to crawl. Fabricate a minimal "page"
      // out of the user-provided notes so downstream agents have something
      // to work with.
      return {
        pages: input.notes
          ? [
              {
                url: "intake://notes",
                finalUrl: "intake://notes",
                title: input.businessName ?? "From scratch",
                textSummary: input.notes,
                headings: [],
                links: [],
                images: [],
                html: "",
              } as CrawledPage,
            ]
          : [],
      };
    }

    const startUrl = normalizeUrl(input.sourceUrl);
    const origin = new URL(startUrl).origin;
    await report(`Fetching ${new URL(startUrl).hostname}`);

    const pages: CrawledPage[] = [];
    const queue: string[] = [startUrl];
    const seen = new Set<string>();

    while (queue.length > 0 && pages.length < MAX_PAGES) {
      const url = queue.shift()!;
      if (seen.has(url)) continue;
      seen.add(url);

      try {
        const page = await fetchOne(url, origin);
        pages.push(page);
        await report(`Read page ${pages.length} of up to ${MAX_PAGES}`);

        // Enqueue same-origin links that look like content pages, not
        // login/cart/etc.
        for (const link of page.links) {
          if (queue.length + pages.length >= MAX_PAGES) break;
          if (!sameOrigin(link.href, origin)) continue;
          if (looksLikeContentPath(link.href, origin)) {
            const normalized = stripFragment(link.href);
            if (!seen.has(normalized)) queue.push(normalized);
          }
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        await report(`Skipped ${url}: ${msg}`);
      }
    }

    if (pages.length === 0) {
      throw new Error(`Could not fetch any pages from ${startUrl}`);
    }

    return { pages };
  },
};

/* ------------------------------------------------------------------ */
/* Internals                                                           */
/* ------------------------------------------------------------------ */

async function fetchOne(url: string, origin: string): Promise<CrawledPage> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(url, {
      headers: { "User-Agent": USER_AGENT, Accept: "text/html,*/*;q=0.8" },
      signal: controller.signal,
      redirect: "follow",
    });
  } finally {
    clearTimeout(timer);
  }
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const html = await res.text();
  const $ = cheerio.load(html);

  $("script, style, noscript, svg, iframe, link, meta").remove();

  const title =
    $("meta[property='og:title']").attr("content") ||
    $("title").text().trim() ||
    undefined;
  const description =
    $("meta[name='description']").attr("content") ||
    $("meta[property='og:description']").attr("content") ||
    undefined;

  const headings: string[] = [];
  $("h1, h2, h3").each((_, el) => {
    if (headings.length >= MAX_HEADINGS_PER_PAGE) return;
    const t = $(el).text().replace(/\s+/g, " ").trim();
    if (t) headings.push(t);
  });

  const links: { href: string; text: string }[] = [];
  $("a[href]").each((_, el) => {
    if (links.length >= MAX_LINKS_PER_PAGE) return;
    const href = absolutize($(el).attr("href") ?? "", origin);
    const text = $(el).text().replace(/\s+/g, " ").trim();
    if (href && text) links.push({ href, text });
  });

  const images: string[] = [];
  $("img[src]").each((_, el) => {
    if (images.length >= MAX_IMAGES_PER_PAGE) return;
    const src = absolutize($(el).attr("src") ?? "", origin);
    if (src) images.push(src);
  });

  const chunks: string[] = [];
  let total = 0;
  $("p, li, blockquote, h1, h2, h3, h4").each((_, el) => {
    const t = $(el).text().replace(/\s+/g, " ").trim();
    if (!t) return;
    if (total + t.length > MAX_TEXT_PER_PAGE) return;
    chunks.push(t);
    total += t.length;
  });

  return {
    url,
    finalUrl: res.url || url,
    status: res.status,
    title,
    description,
    textSummary: chunks.join("\n").slice(0, MAX_TEXT_PER_PAGE),
    headings,
    links,
    images,
    html: "", // intentionally empty — we keep the structured slices instead
  } as CrawledPage;
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

function sameOrigin(href: string, origin: string): boolean {
  try {
    return new URL(href).origin === origin;
  } catch {
    return false;
  }
}

function stripFragment(href: string): string {
  const i = href.indexOf("#");
  return i === -1 ? href : href.slice(0, i);
}

const SKIP_PATH_REGEX =
  /\/(login|signin|signup|register|cart|checkout|account|admin|wp-admin|wp-login|password|search|tag|category|page\/|comment-page|feed|rss|sitemap)/i;
const SKIP_EXT_REGEX = /\.(pdf|jpg|jpeg|png|gif|webp|svg|zip|mp4|mp3|webm)(\?|$)/i;

function looksLikeContentPath(href: string, origin: string): boolean {
  try {
    const u = new URL(href);
    if (u.origin !== origin) return false;
    const p = u.pathname;
    if (SKIP_PATH_REGEX.test(p)) return false;
    if (SKIP_EXT_REGEX.test(p)) return false;
    if (p.length > 120) return false; // dynamic URLs with long query-style paths
    return true;
  } catch {
    return false;
  }
}
