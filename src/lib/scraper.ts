/**
 * URL scraper — fetches a page, extracts the structured signals an AI
 * needs to generate a real KPT-style site rebuild.
 *
 * MVP uses fetch + Cheerio (cheap, fast, fails on JS-rendered SPAs).
 * Future fallback: Vercel Sandbox + Playwright when Cheerio returns
 * thin content. Out of scope tonight.
 */
import * as cheerio from "cheerio";
import type { ScrapedSnapshot } from "./intake-store";

const USER_AGENT =
  "KPTDesignsBot/0.1 (+https://kptdesigns.com/bot — site rebuild preview)";

const FETCH_TIMEOUT_MS = 15_000;
const MAX_TEXT_CHARS = 8_000; // cap so we don't pay Claude to read 40-page sites
const MAX_LINKS = 30;
const MAX_IMAGES = 12;
const MAX_HEADINGS = 40;

export class ScrapeError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
  ) {
    super(message);
    this.name = "ScrapeError";
  }
}

/**
 * Normalize a user-pasted URL into a real one we can fetch.
 * Accepts "ciriglianoplumbing.com", "https://...", "http://...", "www.x.com".
 */
export function normalizeUrl(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) throw new ScrapeError("Please paste a URL.");
  const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const u = new URL(withScheme);
    return u.toString();
  } catch {
    throw new ScrapeError("That doesn't look like a valid URL.");
  }
}

export async function scrape(rawUrl: string): Promise<ScrapedSnapshot> {
  const url = normalizeUrl(rawUrl);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  let res: Response;
  try {
    res = await fetch(url, {
      headers: { "User-Agent": USER_AGENT, Accept: "text/html,*/*;q=0.8" },
      signal: controller.signal,
      redirect: "follow",
    });
  } catch (err) {
    clearTimeout(timer);
    const msg = err instanceof Error ? err.message : "fetch failed";
    throw new ScrapeError(`Couldn't reach ${url}: ${msg}`);
  } finally {
    clearTimeout(timer);
  }

  if (!res.ok) {
    throw new ScrapeError(
      `${url} returned ${res.status} — can't read it.`,
      res.status,
    );
  }

  const html = await res.text();
  const $ = cheerio.load(html);
  const finalUrl = res.url || url;
  const origin = new URL(finalUrl).origin;

  // Strip the noise so the visible-text summary is actually readable
  $("script, style, noscript, svg, iframe, link, meta").remove();

  const title =
    $("meta[property='og:title']").attr("content") ||
    $("title").text().trim() ||
    undefined;

  const description =
    $("meta[name='description']").attr("content") ||
    $("meta[property='og:description']").attr("content") ||
    undefined;

  const ogImage =
    absolutize($("meta[property='og:image']").attr("content"), origin) || undefined;

  const headings: string[] = [];
  $("h1, h2, h3").each((_, el) => {
    const t = $(el).text().replace(/\s+/g, " ").trim();
    if (t && headings.length < MAX_HEADINGS) headings.push(t);
  });

  const links: { href: string; text: string }[] = [];
  $("a[href]").each((_, el) => {
    if (links.length >= MAX_LINKS) return;
    const href = absolutize($(el).attr("href") ?? "", origin);
    const text = $(el).text().replace(/\s+/g, " ").trim();
    if (href && text) links.push({ href, text });
  });

  const images: string[] = [];
  $("img[src]").each((_, el) => {
    if (images.length >= MAX_IMAGES) return;
    const src = absolutize($(el).attr("src") ?? "", origin);
    if (src) images.push(src);
  });

  // Visible text — paragraphs + list items, condensed
  const textChunks: string[] = [];
  let totalLen = 0;
  $("p, li, blockquote, h1, h2, h3, h4").each((_, el) => {
    const t = $(el).text().replace(/\s+/g, " ").trim();
    if (!t) return;
    if (totalLen + t.length > MAX_TEXT_CHARS) return;
    textChunks.push(t);
    totalLen += t.length;
  });

  const textSummary = textChunks.join("\n").slice(0, MAX_TEXT_CHARS);

  return {
    url,
    finalUrl,
    status: res.status,
    title,
    description,
    ogImage,
    textSummary,
    headings,
    links,
    images,
  };
}

function absolutize(href: string | undefined, origin: string): string | undefined {
  if (!href) return undefined;
  if (/^(data|javascript|mailto|tel):/i.test(href)) return undefined;
  try {
    return new URL(href, origin).toString();
  } catch {
    return undefined;
  }
}
