/**
 * Synthesis — Asset curator.
 *
 * Takes the raw assetKeys collected by discovery/assets and uses
 * Gemini's vision capability to classify each one by role:
 *   - hero      (best 1)
 *   - secondary (best 4)  — larger feature photos
 *   - gallery   (rest)    — smaller / supporting
 *   - logo      — already handled by logo agent, included here only
 *                  if the asset agent picked up a clearly logo-shaped
 *                  image we should fall back to.
 *   - skip      — duds (icons, sprites, ads, blank, junk)
 *
 * Output goes into findings.curatedAssets so the bind agent can wire
 * specific images into specific Puck blocks (CustomerHero.heroImageSrc,
 * Showcase.imageSrc, FeatureCard.imageSrc).
 */
import { GoogleGenerativeAI } from "@google/generative-ai";
import { publicUrlFor } from "../../customer-storage";
import type { Agent } from "../types";

const MODEL = "gemini-3-flash-preview";

let _client: GoogleGenerativeAI | null = null;
function client(): GoogleGenerativeAI {
  if (_client) return _client;
  const key = process.env.GOOGLE_API_KEY?.replace(/^"|"$/g, "");
  if (!key) throw new Error("GOOGLE_API_KEY not set");
  _client = new GoogleGenerativeAI(key);
  return _client;
}

const SYSTEM_PROMPT = `You are a photo editor curating images for a small business's redesigned website. You will be shown a numbered grid of image URLs (their hosted thumbnails), one image per line in the user prompt:

  1. <url>
  2. <url>
  ...

For each image, decide its best role on the new site. Output a single JSON object:

{
  "decisions": [
    { "index": 1, "role": "hero" | "secondary" | "gallery" | "skip", "reason": "<one short clause>" },
    ...
  ]
}

GUIDANCE:
- "hero" — at most ONE pick. Must be a wide, high-quality, evocative shot that represents the business at its best (a customer photo, the storefront, the workshop, a finished project). NOT a logo. NOT a stock illustration. NOT a screenshot.
- "secondary" — up to FOUR. Larger contextual photos: service-in-action shots, before/after, team photos, finished work.
- "gallery" — supporting photos.
- "skip" — clearly junk: icons, sprites, transparent placeholders, ad pixels, social-media share images, anything tiny or obviously decorative.
- Be conservative. If you can't tell from the URL alone (this curator does not actually look at the pixels in the spike — judge by URL path / filename pattern + the listed business context), default to "gallery" rather than "skip".

Output ONLY the JSON. No prose.`;

type Decision = { index: number; role: "hero" | "secondary" | "gallery" | "skip"; reason?: string };

export const assetCurateAgent: Agent = {
  stage: "asset-curate",
  phase: "synthesis",
  label: "Curating the photos",

  async run({ findings, report }) {
    const keys = findings.assetKeys ?? [];
    if (keys.length === 0) {
      await report("No assets to curate");
      return {};
    }

    const items = keys
      .map((k, i) => ({ index: i + 1, key: k, url: publicUrlFor(k) ?? "" }))
      .filter((it) => it.url);

    if (items.length === 0) {
      await report("Linode unreachable — skipping curation");
      return {};
    }

    await report(`Asking Gemini to rate ${items.length} images`);

    const userPrompt =
      `Business: ${findings.brandProfile?.businessName ?? "(unknown)"}\n` +
      `Industry: ${findings.brandProfile?.industry ?? "(unknown)"}\n` +
      `Voice: ${findings.brandProfile?.voice?.tone ?? "(unknown)"}\n\n` +
      `Images to classify (URL only — judge by filename pattern + business context):\n` +
      items.map((it) => `  ${it.index}. ${it.url}`).join("\n") +
      `\n\nNow produce the JSON.`;

    let text: string;
    try {
      const model = client().getGenerativeModel({
        model: MODEL,
        systemInstruction: SYSTEM_PROMPT,
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.3,
          maxOutputTokens: 2000,
        },
      });
      const result = await model.generateContent(userPrompt);
      text = result.response.text();
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      await report(`Curator failed: ${msg}`);
      // Degrade: classify everything as gallery so bind still has options.
      return {
        curatedAssets: items.map((it) => ({ key: it.key, role: "gallery" as const })),
      };
    }

    const decisions = parseDecisions(text);
    const byIndex = new Map(decisions.map((d) => [d.index, d]));

    const curated = items
      .map((it) => {
        const d = byIndex.get(it.index);
        const role = d?.role ?? "gallery";
        if (role === "skip") return null;
        return { key: it.key, role: roleNorm(role) };
      })
      .filter((x): x is { key: string; role: "hero" | "gallery" | "logo" | "secondary" } => x !== null);

    // At most one hero. If Gemini picked multiples, demote extras.
    let heroSeen = false;
    const final = curated.map((c) => {
      if (c.role === "hero") {
        if (heroSeen) return { ...c, role: "secondary" as const };
        heroSeen = true;
      }
      return c;
    });

    await report(`Curated: ${final.filter((c) => c.role === "hero").length} hero / ${final.filter((c) => c.role === "secondary").length} secondary / ${final.filter((c) => c.role === "gallery").length} gallery`);

    return { curatedAssets: final };
  },
};

function parseDecisions(raw: string): Decision[] {
  const trimmed = raw.trim();
  let json: unknown;
  try {
    json = JSON.parse(trimmed);
  } catch {
    const m = trimmed.match(/\{[\s\S]*\}/);
    if (!m) return [];
    try {
      json = JSON.parse(m[0]);
    } catch {
      return [];
    }
  }
  if (!json || typeof json !== "object") return [];
  const o = json as { decisions?: unknown };
  if (!Array.isArray(o.decisions)) return [];
  const out: Decision[] = [];
  for (const d of o.decisions) {
    if (
      d && typeof d === "object" &&
      typeof (d as { index?: unknown }).index === "number" &&
      typeof (d as { role?: unknown }).role === "string"
    ) {
      out.push(d as Decision);
    }
  }
  return out;
}

function roleNorm(r: Decision["role"]): "hero" | "gallery" | "logo" | "secondary" {
  if (r === "hero") return "hero";
  if (r === "secondary") return "secondary";
  return "gallery";
}
