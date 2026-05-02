/**
 * Discovery — Palette extractor (Gemini multimodal).
 *
 * Picks one or two representative customer images and asks Gemini to
 * read the dominant colors out of them. Output overrides the
 * brand-profile agent's text-only color guess when present, since this
 * is grounded in actual visual data from the customer's site.
 *
 * Falls back gracefully:
 *   - No assets uploaded → no-op (brand profile guesses from text)
 *   - Gemini call fails → no-op
 */
import { GoogleGenerativeAI } from "@google/generative-ai";
import { publicUrlFor } from "../../customer-storage";
import type { Agent } from "../types";
import type { BrandPalette } from "../../types";

const MODEL = "gemini-3-flash-preview";
const MAX_IMAGES_TO_INSPECT = 3;

let _client: GoogleGenerativeAI | null = null;
function client(): GoogleGenerativeAI {
  if (_client) return _client;
  const key = process.env.GOOGLE_API_KEY?.replace(/^"|"$/g, "");
  if (!key) throw new Error("GOOGLE_API_KEY not set");
  _client = new GoogleGenerativeAI(key);
  return _client;
}

const SYSTEM_PROMPT = `You are a brand color analyst. Given one or more sample images from a small business's existing website, extract their actual brand palette.

Output EXACTLY this JSON:
{
  "primary": "#hex",         // dominant brand color — what their CTAs SHOULD be
  "primaryStrong": "#hex",
  "primarySoft": "#hex",
  "ink": "#hex",             // primary text color (typically near-black, but match what you see)
  "canvas": "#hex",          // primary surface (typically white or near-white)
  "surface": "#hex",
  "accent1": "#hex",
  "accent2": "#hex",
  "accent3": "#hex"
}

RULES:
- All lowercase, 6-digit hex.
- "primary" should be the most distinctive non-neutral color you see — what the brand uses to draw the eye. Avoid picking off-white as primary.
- ink + canvas must hit WCAG AA (4.5:1) contrast — adjust if the source is too light/dark.
- Output ONLY the JSON.`;

export const paletteAgent: Agent = {
  stage: "palette",
  phase: "discovery",
  label: "Reading the brand colors",
  dependsOn: ["assets", "logo"],

  async run({ findings, report }) {
    const candidates: string[] = [];

    if (findings.logoUrl) candidates.push(findings.logoUrl);
    for (const key of (findings.assetKeys ?? []).slice(0, MAX_IMAGES_TO_INSPECT - candidates.length)) {
      const url = publicUrlFor(key);
      if (url) candidates.push(url);
    }

    if (candidates.length === 0) {
      await report("No images to read color from — skipping");
      return {};
    }

    await report(`Asking Gemini to read colors from ${candidates.length} image${candidates.length === 1 ? "" : "s"}`);

    const parts: ({ text: string } | { fileData: { fileUri: string; mimeType: string } } | { inlineData: { data: string; mimeType: string } })[] = [
      { text: "Sample images from the customer's site:" },
    ];
    for (const url of candidates) {
      const inline = await fetchAsInline(url);
      if (inline) parts.push({ inlineData: inline });
    }
    parts.push({ text: "Now produce the JSON palette." });

    let text: string;
    try {
      const model = client().getGenerativeModel({
        model: MODEL,
        systemInstruction: SYSTEM_PROMPT,
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.4,
          maxOutputTokens: 600,
        },
      });
      const result = await model.generateContent({
        contents: [{ role: "user", parts }],
      });
      text = result.response.text();
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      await report(`Vision call failed: ${msg}`);
      return {};
    }

    const palette = parsePalette(text);
    if (!palette) {
      await report("Gemini returned unparseable palette — skipping");
      return {};
    }

    await report(`Detected primary: ${palette.primary}`);
    return { detectedPalette: palette };
  },
};

async function fetchAsInline(
  url: string,
): Promise<{ data: string; mimeType: string } | null> {
  try {
    const res = await fetch(url, {
      headers: { Accept: "image/*" },
      // Vercel functions: keep the timeout short — vision can run with up to
      // 3 images in parallel before this point in the pipeline.
      signal: AbortSignal.timeout(8_000),
    });
    if (!res.ok) return null;
    const ct = (res.headers.get("content-type") ?? "image/png").split(";")[0];
    const ab = await res.arrayBuffer();
    if (ab.byteLength > 4 * 1024 * 1024) return null;
    return { data: Buffer.from(ab).toString("base64"), mimeType: ct };
  } catch {
    return null;
  }
}

function parsePalette(raw: string): BrandPalette | null {
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
  if (typeof o.primary !== "string" || typeof o.ink !== "string" || typeof o.canvas !== "string") {
    return null;
  }
  return o as unknown as BrandPalette;
}
