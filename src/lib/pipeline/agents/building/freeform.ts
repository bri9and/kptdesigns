/**
 * Building — Freeform site generator.
 *
 * Replaces the templated Puck building phase (theme + compose + bind)
 * with a single agent that asks Gemini to produce a COMPLETE bespoke
 * HTML page for THIS customer. Inspired by the original
 * src/app/api/ai/generate route + src/lib/ai-prompts.ts that the
 * codebase shipped before the Puck refactor.
 *
 * Why freeform: every customer site should look unique. A templated
 * block library forces sameness no matter how good the inputs are.
 * Freeform HTML lets Claude/Gemini compose a layout that fits the
 * specific business, with the specific assets, in the specific voice
 * we extracted in discovery.
 *
 * Output: a single HTML string (body content only — no <html>, <head>,
 * <body> wrapper) injected into the preview page via
 * dangerouslySetInnerHTML. Brand fonts come in via a Google Fonts
 * link the preview page also injects.
 *
 * Constraints we DON'T relax:
 *   - The model may ONLY use customer-supplied photo URLs (the
 *     /api/asset proxy URLs we hand it). It is forbidden from inventing
 *     image URLs or referencing stock photo services.
 */
import { GoogleGenerativeAI } from "@google/generative-ai";

import type { Agent } from "../types";
import type {
  BrandProfile,
  CrawledPage,
  Findings,
} from "../../types";
import { publicUrlFor } from "../../customer-storage";

const MODEL = "gemini-3-flash-preview";
const MAX_OUTPUT_TOKENS = 16000;

let _client: GoogleGenerativeAI | null = null;
function client(): GoogleGenerativeAI {
  if (_client) return _client;
  const key = process.env.GOOGLE_API_KEY?.replace(/^"|"$/g, "");
  if (!key) throw new Error("GOOGLE_API_KEY not set");
  _client = new GoogleGenerativeAI(key);
  return _client;
}

export const freeformAgent: Agent = {
  stage: "freeform",
  phase: "building",
  label: "Designing the unique site",

  async run({ findings, report }) {
    const profile = findings.brandProfile;
    if (!profile) throw new Error("No brand profile — cannot design");

    await report("Asking Gemini to design THE specific site for this customer");

    const userPrompt = buildUserPrompt(profile, findings);

    const model = client().getGenerativeModel({
      model: MODEL,
      systemInstruction: SYSTEM_PROMPT,
      generationConfig: {
        // Ask for plain text — we want raw HTML, not JSON-wrapped HTML.
        temperature: 0.85,
        maxOutputTokens: MAX_OUTPUT_TOKENS,
      },
    });

    let raw: string;
    try {
      const result = await model.generateContent(userPrompt);
      raw = result.response.text();
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      throw new Error(`Gemini call failed: ${msg}`);
    }

    const html = stripFences(raw);
    if (!html || html.length < 500) {
      throw new Error(`Generator returned suspiciously short output (${html.length} chars)`);
    }

    // Extract a one-line summary from the HTML's first heading-ish text
    // for the preview page's metadata.
    const summary =
      profile.oneLiner ??
      html.match(/<h1[^>]*>(.*?)<\/h1>/i)?.[1]?.trim().slice(0, 200) ??
      profile.businessName;

    await report(`Generated ${html.length} chars of bespoke HTML`);

    return {
      generatedHtml: html,
      generatedSummary: summary,
    };
  },
};

/* ------------------------------------------------------------------ */
/* System prompt                                                       */
/* ------------------------------------------------------------------ */

const SYSTEM_PROMPT = `You are a senior front-end designer at KPT Designs, a boutique web design firm. Your job is to design and code a COMPLETE, UNIQUE, BESPOKE single-page website for ONE specific small business — not a template, not a remix of the same blocks every customer gets.

Your output MUST be valid HTML5 body content. NO <!DOCTYPE>, NO <html>, NO <head>, NO <body> tags — only the contents that would go INSIDE <body>. The preview page wraps your output in a complete HTML document and injects the brand fonts + a CSS reset.

OUTPUT FORMAT — strict:
- Start with a <style> block containing your custom CSS (use modern CSS — flexbox, grid, custom properties, clamp(), aspect-ratio). Scope every selector with the customer slug from the user prompt (e.g. ".CUSTOMER_SLUG-hero h1") so styles don't leak.
- Then your HTML markup.
- NO <script> tags unless absolutely necessary for an interaction the brand requires (e.g. mobile nav). Default to no JS.
- NO frameworks. NO React. Plain HTML + CSS.
- NO markdown fences (\`\`\`html). Output the raw HTML directly.

UNIQUENESS — non-negotiable:
- Every customer site you produce must look DIFFERENT from every other customer site you've produced. Different layouts, different rhythms, different typography hierarchies, different hero treatments.
- DO NOT default to a "Hero → Features → Showcase → Stats → Quote → CTA" stack. That's KPT's house template; we are not building KPT's site.
- Choose a structure that fits THIS business. A plumber needs a phone number prominent + service area + emergency CTA. A restaurant needs the menu. A boutique needs the brand story + product photos. A B2B firm needs case studies + credentials. A wedding photographer needs a gallery. Match the form to the function.
- Reference the customer's existing site structure (provided as scraped pages in the user prompt) — IMPROVE on it, don't replace it with a generic template.

VOICE:
- Match the brand voice profile (tone + formality + verbatim sample). The voice sample IS the customer talking. Mirror their cadence and word choice.
- Use specific business language ("trenchless sewer repair") not generic ("plumbing services").
- Don't invent testimonials, stats, or credentials. Use only what's in the source pages provided.

ASSETS — strict:
- The user prompt lists every photo URL available for this customer. You may use ONLY those URLs in <img src="…"> tags. Do NOT invent URLs, do NOT reference stock photo services, do NOT use placeholder URLs like "image.jpg".
- The customer's logo URL is provided separately. Use it in the header.
- If you have no relevant photo for a section, prefer text-only or use abstract CSS-painted backgrounds (gradients, patterns) — never a fake image URL.
- All images: use loading="lazy" except the hero image; use object-fit: cover for crops; use width + height attributes when known.

BRAND:
- The brand palette and fonts are provided in the user prompt. Use them as CSS custom properties at the top of your <style> block. Do not invent your own colors except for sensible neutrals + WCAG-compliant text contrast.
- Pick ONE display font for headings, one body font. Both come from Google Fonts (the preview page injects them — you just reference them by name).

ACCESSIBILITY + RESPONSIVE:
- Mobile-first. Every layout must work at 360px width.
- Body text minimum 16px. Headings scale with clamp(). Touch targets minimum 44×44px.
- Sufficient contrast (WCAG AA): body text 4.5:1, large text 3:1.
- Semantic HTML: <header>, <nav>, <main>, <section>, <article>, <footer>.
- All <a> with href="tel:" or href="mailto:" when contact info is in the source.

CALLS-TO-ACTION:
- The customer's main desired action is implied by their existing site. Plumber → "Call now". Restaurant → "View menu" or "Book a table". Lawyer → "Free consultation". Make the primary CTA prominent in the hero AND in a sticky/strong CTA section near the bottom.

LENGTH:
- Aim for 4-8 distinct sections, sized to what the business actually has. Don't pad. Don't include a Stats section just to fill space if the customer has no real stats.

You are designing FOR the customer, not stamping them with KPT's pattern. Show your craft.`;

/* ------------------------------------------------------------------ */
/* User prompt builder                                                 */
/* ------------------------------------------------------------------ */

function buildUserPrompt(profile: BrandProfile, findings: Findings): string {
  const lines: string[] = [];

  // Slug for CSS scoping — keeps the customer's styles from bleeding.
  const slug = sluggify(profile.businessName);
  lines.push(`# Customer site to design`);
  lines.push("");
  lines.push(`Business: ${profile.businessName}`);
  lines.push(`One-liner: ${profile.oneLiner}`);
  if (profile.industry) lines.push(`Industry: ${profile.industry}`);
  if (profile.serviceArea) lines.push(`Service area: ${profile.serviceArea}`);
  lines.push("");
  lines.push(`CSS slug (use this to scope all selectors — e.g. \`.${slug}-hero\`): \`${slug}\``);
  lines.push("");

  // Brand
  lines.push(`## Brand`);
  lines.push("");
  lines.push("```json");
  lines.push(
    JSON.stringify(
      {
        palette: profile.palette,
        fonts: profile.fonts,
        voice: profile.voice,
      },
      null,
      2,
    ),
  );
  lines.push("```");
  lines.push("");

  // Available assets — strictly enumerated
  const logoUrl = findings.logoUrl;
  const curated = findings.curatedAssets ?? [];
  const allKeys = curated.map((c) => ({ url: publicUrlFor(c.key) ?? "", role: c.role }));
  const heroAsset = allKeys.find((a) => a.role === "hero")?.url;
  const secondary = allKeys.filter((a) => a.role === "secondary").map((a) => a.url);
  const gallery = allKeys.filter((a) => a.role === "gallery").map((a) => a.url);

  lines.push(`## Available assets — use ONLY these URLs in <img src="…">`);
  lines.push("");
  if (logoUrl) lines.push(`Logo (use in header): ${logoUrl}`);
  if (heroAsset) lines.push(`Hero photo (use as a wide hero image): ${heroAsset}`);
  if (secondary.length) {
    lines.push(`Secondary photos (use as larger feature/section imagery):`);
    secondary.forEach((u) => lines.push(`  - ${u}`));
  }
  if (gallery.length) {
    lines.push(`Gallery photos (use for grids, supporting imagery, or skip):`);
    gallery.forEach((u) => lines.push(`  - ${u}`));
  }
  if (!logoUrl && !heroAsset && secondary.length === 0 && gallery.length === 0) {
    lines.push(`(none — design with text + abstract CSS only)`);
  }
  lines.push("");

  // Source content
  const pages = findings.pages ?? [];
  if (pages.length > 0) {
    lines.push(`## Customer's existing site (${pages.length} page${pages.length === 1 ? "" : "s"} — improve on this, don't copy)`);
    lines.push("");
    for (const p of pages.slice(0, 8)) {
      lines.push(`### ${p.url}`);
      if (p.title) lines.push(`Title: ${p.title}`);
      if (p.description) lines.push(`Meta: ${p.description}`);
      if (p.headings.length) lines.push(`Headings: ${p.headings.slice(0, 12).join(" / ")}`);
      if (p.textSummary) {
        lines.push(`Content excerpt:`);
        lines.push(p.textSummary.slice(0, 1800));
      }
      lines.push("");
    }
  }

  lines.push(`## Now design the site`);
  lines.push("");
  lines.push(
    `Output ONLY the HTML body content (a <style> block followed by markup). No code fences, no preamble, no commentary. Make this site look unmistakably like ${profile.businessName}, not like KPT.`,
  );

  return lines.join("\n");
}

function stripFences(text: string): string {
  let s = text.trim();
  if (s.startsWith("```")) {
    s = s.replace(/^```[a-z]*\n?/i, "").replace(/\n?```\s*$/i, "");
  }
  return s.trim();
}

function sluggify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 24);
}
