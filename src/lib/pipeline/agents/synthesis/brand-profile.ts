/**
 * Synthesis — Brand profile assembler.
 *
 * Reads everything the discovery phase gathered (pages, voice, logo,
 * detected palette/fonts) and asks Gemini to produce a single
 * canonical BrandProfile that the building phase will use to compose
 * the new site in the customer's voice + brand.
 *
 * If the discovery phase produced no detected palette (the vision-based
 * extractor is still stubbed), Gemini is asked to *infer* a palette
 * from the business type + content + the source's URL/title — better
 * than defaulting to KPT earthy colors.
 */
import { GoogleGenerativeAI } from "@google/generative-ai";
import type { Agent } from "../types";
import type { BrandProfile } from "../../types";

const MODEL = "gemini-3-flash-preview";

let _client: GoogleGenerativeAI | null = null;
function client(): GoogleGenerativeAI {
  if (_client) return _client;
  const key = process.env.GOOGLE_API_KEY?.replace(/^"|"$/g, "");
  if (!key) throw new Error("GOOGLE_API_KEY not set");
  _client = new GoogleGenerativeAI(key);
  return _client;
}

const SYSTEM_PROMPT = `You are a senior brand strategist at a boutique web design firm. Take everything we know about a small business — pages from their existing site, their detected voice, their logo URL — and produce a single canonical brand profile that captures who they are visually and editorially.

Output EXACTLY this JSON shape — no prose, no markdown:
{
  "businessName": "<their name>",
  "oneLiner": "<one sentence: who they are, what they do, who they serve>",
  "industry": "<plain-language industry: 'plumbing', 'family law', 'golf course', etc>",
  "serviceArea": "<geographic area, if discoverable; null if not>",
  "palette": {
    "primary": "#hex",         // CTA color — bold, on-brand, accessible on cream
    "primaryStrong": "#hex",   // hover state, ~10% darker
    "primarySoft": "#hex",     // light wash, ~85% lighter, for backgrounds
    "ink": "#hex",             // primary text — must hit AAA on canvas
    "canvas": "#hex",          // primary surface (often white or near-white)
    "surface": "#hex",         // secondary surface (slightly off canvas)
    "accent1": "#hex",
    "accent2": "#hex",
    "accent3": "#hex"
  },
  "fonts": {
    "display": "<Google Font name for headings>",
    "body": "<Google Font name for body>",
    "mono": "<Google Font name for mono>",
    "inferred": true
  },
  "voice": {
    "tone": "formal" | "casual" | "warm" | "technical" | "playful" | "rugged",
    "formality": 1 | 2 | 3 | 4 | 5,
    "voiceSample": "<verbatim line from source that nails the voice>",
    "notes": "<freeform: regional quirks, slogans, things to avoid>"
  }
}

PALETTE RULES:
- Pick colors the business would actually use, not boutique-cream defaults. Plumber → strong blue + safety yellow. Lawyer → navy + bone white. Bakery → warm peach + chocolate. Auto detail → glossy black + chrome.
- Avoid the KPT default palette unless the business is itself an editorial / boutique brand. Specifically AVOID #C56738 terracotta + cream unless it's truly fitting.
- All hex values lowercase, 6-digit format.
- ink + canvas must pass WCAG AA contrast (4.5:1 minimum).
- accent1/2/3 should be visually distinct from primary AND from each other.

FONT RULES:
- Pick real Google Fonts that match the business and the voice.
- Heavy industrial → Oswald, Bebas Neue, Anton.
- Boutique editorial → Fraunces, Playfair Display, EB Garamond.
- Friendly small business → Inter, Plus Jakarta Sans, DM Sans.
- Tech/precise → Geist, JetBrains Mono.
- Body should be a humanist sans unless the brand voice screams editorial → then a serif.

Output ONLY the JSON object.`;

export const brandProfileAgent: Agent = {
  stage: "brand-profile",
  phase: "synthesis",
  label: "Building the brand profile",

  async run({ findings, input, report }) {
    const pages = findings.pages ?? [];
    if (pages.length === 0) {
      throw new Error("No pages crawled — cannot build a brand profile");
    }

    const userPrompt = buildPrompt(findings, input);

    await report("Asking Gemini to assemble the brand");

    const model = client().getGenerativeModel({
      model: MODEL,
      systemInstruction: SYSTEM_PROMPT,
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.6,
        maxOutputTokens: 2000,
      },
    });
    const result = await model.generateContent(userPrompt);
    const text = result.response.text();

    const profile = parse(text);
    if (!profile) {
      throw new Error("Brand profile assembler returned unparseable JSON");
    }

    // If discovery's vision-based palette agent already extracted real
    // colors from the customer's images, those override Gemini's text-
    // based guess. Same for detectedFonts (logo OCR / vision could feed
    // this in the future; for now stays empty).
    const finalPalette = findings.detectedPalette ?? profile.palette;
    const finalFonts = findings.detectedFonts ?? profile.fonts;

    return {
      brandProfile: { ...profile, palette: finalPalette, fonts: finalFonts },
    };
  },
};

function buildPrompt(
  findings: import("../../types").Findings,
  input: { sourceUrl: string | null; businessName: string | null; notes: string | null },
): string {
  const lines: string[] = [];
  lines.push(`Source URL: ${input.sourceUrl ?? "(none)"}`);
  if (input.businessName) lines.push(`Business name (provided): ${input.businessName}`);
  if (input.notes) lines.push(`Customer notes: ${input.notes}`);

  if (findings.logoUrl) lines.push(`\nLogo URL: ${findings.logoUrl}`);
  if (findings.detectedVoice) {
    lines.push(`\nDetected voice signal:`);
    lines.push(JSON.stringify(findings.detectedVoice, null, 2));
  }

  if (findings.googlePlace) {
    const gp = findings.googlePlace;
    lines.push(`\nGoogle Place data:`);
    lines.push(`  Name: ${gp.name}`);
    if (gp.primaryType) lines.push(`  Type: ${gp.primaryType}`);
    if (gp.formattedAddress) lines.push(`  Address: ${gp.formattedAddress}`);
    if (gp.phone) lines.push(`  Phone: ${gp.phone}`);
    if (gp.hours?.length) {
      lines.push(`  Hours:`);
      gp.hours.forEach((h) => lines.push(`    ${h}`));
    }
    if (gp.rating) lines.push(`  Rating: ${gp.rating} (${gp.userRatingCount ?? 0} reviews)`);
    if (gp.editorialSummary) lines.push(`  Editorial summary: ${gp.editorialSummary}`);
  }

  if (findings.socials) {
    const s = findings.socials;
    const lines2: string[] = [];
    if (s.facebook) lines2.push(`Facebook: ${s.facebook}`);
    if (s.instagram) lines2.push(`Instagram: ${s.instagram}`);
    if (s.yelp) lines2.push(`Yelp: ${s.yelp}`);
    if (s.linkedin) lines2.push(`LinkedIn: ${s.linkedin}`);
    if (lines2.length > 0) {
      lines.push(`\nSocial profiles (URLs only, content not yet scraped):`);
      lines2.forEach((l) => lines.push(`  ${l}`));
    }
  }

  const pages = findings.pages ?? [];
  lines.push(`\nCrawled pages (${pages.length}):`);
  for (const p of pages.slice(0, 8)) {
    lines.push(`\n--- ${p.url} ---`);
    if (p.title) lines.push(`Title: ${p.title}`);
    if (p.description) lines.push(`Description: ${p.description}`);
    if (p.headings.length) lines.push(`Headings: ${p.headings.slice(0, 8).join(" / ")}`);
    if (p.textSummary) lines.push(`Text:\n${p.textSummary.slice(0, 1500)}`);
  }

  lines.push(`\nNow produce the JSON brand profile.`);
  return lines.join("\n");
}

function parse(raw: string): BrandProfile | null {
  const trimmed = raw.trim();
  let json: unknown;
  try {
    json = JSON.parse(trimmed);
  } catch {
    const m = trimmed.match(/\{[\s\S]*\}/);
    if (!m) return null;
    try {
      json = JSON.parse(m[0]);
    } catch {
      return null;
    }
  }
  if (!json || typeof json !== "object") return null;
  const o = json as Record<string, unknown>;
  if (
    typeof o.businessName !== "string" ||
    typeof o.oneLiner !== "string" ||
    typeof o.palette !== "object" ||
    typeof o.fonts !== "object" ||
    typeof o.voice !== "object"
  ) {
    return null;
  }
  return o as unknown as BrandProfile;
}
