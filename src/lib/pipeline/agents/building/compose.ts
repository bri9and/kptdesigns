/**
 * Building — Page composer.
 *
 * Ports the previous one-shot site-generator.ts into the pipeline's
 * agent shape. Now uses the synthesized BrandProfile (and the multi-
 * page crawl) instead of just a raw scrape, so the generated copy
 * matches the customer's actual voice and the Stats/Quote/CtaSection
 * blocks reflect what the customer actually has on their site.
 *
 * Output is a Puck data tree compatible with src/lib/puck-config.tsx.
 */
import { GoogleGenerativeAI } from "@google/generative-ai";
import type { Data as PuckData } from "@measured/puck";

import { BLOCK_SCHEMA_FOR_AI, ICON_NAMES } from "@/lib/puck-config";
import type { Agent } from "../types";
import type { BrandProfile, CrawledPage } from "../../types";

const MODEL = "gemini-3-flash-preview";

let _client: GoogleGenerativeAI | null = null;
function client(): GoogleGenerativeAI {
  if (_client) return _client;
  const key = process.env.GOOGLE_API_KEY?.replace(/^"|"$/g, "");
  if (!key) throw new Error("GOOGLE_API_KEY not set");
  _client = new GoogleGenerativeAI(key);
  return _client;
}

export const composeAgent: Agent = {
  stage: "compose",
  phase: "building",
  label: "Composing the new site",

  async run({ findings, report }) {
    const profile = findings.brandProfile;
    if (!profile) throw new Error("No brand profile — cannot compose");
    const pages = findings.pages ?? [];

    await report("Drafting the page");

    const userPrompt = buildPrompt(profile, pages);
    const model = client().getGenerativeModel({
      model: MODEL,
      systemInstruction: buildSystemPrompt(),
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.7,
        maxOutputTokens: 8000,
      },
    });
    const result = await model.generateContent(userPrompt);
    const text = result.response.text();

    const parsed = parseTree(text);
    const puckData: PuckData = {
      content: parsed.content.map((b) => ({
        type: b.type,
        props: { ...b.props, id: `${b.type}-${rid()}` },
      })),
      root: { props: {} },
    };
    return { puckData };
  },
};

function buildSystemPrompt(): string {
  return `You are the page composer at KPT Designs — a boutique web design firm. You take a normalized brand profile and the customer's existing pages and produce a Puck content tree that, when rendered with KPT's section components, becomes a dramatically better version of their existing site.

CRITICAL: You are NOT styling the site — the theme generator already produced the customer's brand colors and fonts. Your job is the COPY and COMPOSITION. Trust the tokens.

Output EXACTLY this JSON shape — no prose, no markdown fences:
{
  "content": [ ...sequence of 5–8 blocks... ]
}

Each block: { "type": "<BlockName>", "props": { ... } }.

${BLOCK_SCHEMA_FOR_AI}

WRITING VOICE — match the customer's voice profile and voice sample. Don't drift to KPT's house style.

CONSTRAINTS:
- Hero tagline + CTAs are required.
- Quote block: ONLY include if a real testimonial appears in the source. NEVER invent quotes.
- Stats: pull from the source if present (years in business, jobs done, etc). If unknown, omit the block — don't invent stats.
- Use specific business language, not generic ("trenchless sewer repair" beats "plumbing").
- href values: use plausible internal paths ('/services', '/contact', '/about') or 'tel:'/'mailto:' when found in source.
- Output ONLY the JSON object.

Available icon names: ${ICON_NAMES.join(", ")}.`;
}

function buildPrompt(profile: BrandProfile, pages: CrawledPage[]): string {
  const lines: string[] = [];
  lines.push("Customer brand profile:");
  lines.push(JSON.stringify(profile, null, 2));
  lines.push("\nCrawled source pages (excerpts):");
  for (const p of pages.slice(0, 6)) {
    lines.push(`\n## ${p.url}`);
    if (p.title) lines.push(`Title: ${p.title}`);
    if (p.headings.length) lines.push(`Headings: ${p.headings.slice(0, 10).join(" / ")}`);
    if (p.textSummary) lines.push(p.textSummary.slice(0, 1500));
  }
  lines.push("\nNow produce the JSON tree.");
  return lines.join("\n");
}

type BlockOut = { type: string; props: Record<string, unknown> };

function parseTree(raw: string): { content: BlockOut[] } {
  const trimmed = raw.trim();
  let parsed: unknown;
  try {
    parsed = JSON.parse(trimmed);
  } catch {
    const m = trimmed.match(/\{[\s\S]*\}/);
    parsed = m ? JSON.parse(m[0]) : null;
  }
  if (!parsed || typeof parsed !== "object") return { content: [] };
  const o = parsed as { content?: unknown };
  if (!Array.isArray(o.content)) return { content: [] };
  const content: BlockOut[] = [];
  for (const b of o.content) {
    if (
      b &&
      typeof b === "object" &&
      typeof (b as { type?: unknown }).type === "string" &&
      typeof (b as { props?: unknown }).props === "object" &&
      (b as { props?: unknown }).props !== null
    ) {
      content.push(b as BlockOut);
    }
  }
  return { content };
}

function rid(): string {
  return Math.random().toString(36).slice(2, 10);
}
