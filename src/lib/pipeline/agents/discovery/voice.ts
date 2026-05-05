/**
 * Discovery — Voice extractor.
 *
 * Reads the crawled pages' visible text and asks Gemini to characterize
 * how the business *sounds* — formality, tone, regional quirks, taboos.
 * The downstream content composer uses this to mimic the customer's
 * voice instead of defaulting to KPT's house style.
 */
import { GoogleGenerativeAI } from "@google/generative-ai";
import type { Agent } from "../types";
import type { VoiceProfile } from "../../types";

const MODEL = "gemini-3-flash-preview";

let _client: GoogleGenerativeAI | null = null;
function client(): GoogleGenerativeAI {
  if (_client) return _client;
  const key = process.env.GOOGLE_API_KEY?.replace(/^"|"$/g, "");
  if (!key) throw new Error("GOOGLE_API_KEY not set");
  _client = new GoogleGenerativeAI(key);
  return _client;
}

const SYSTEM_PROMPT = `You are a brand-voice analyst. Read the visible text from a small business's existing website and produce a JSON object describing how this business sounds.

Output EXACTLY this shape — no prose, no markdown:
{
  "tone": "formal" | "casual" | "warm" | "technical" | "playful" | "rugged",
  "formality": 1 | 2 | 3 | 4 | 5,           // 1=very casual, 5=very formal
  "voiceSample": "<one ~140-char excerpt from the source that nails the voice>",
  "notes": "<freeform: regional quirks, slogans, things they call themselves, things to avoid>"
}

Rules:
- "tone" picks the SINGLE best fit. If multiple fit, pick the loudest signal.
- "voiceSample" must be a verbatim excerpt from the input — don't paraphrase.
- "notes" should call out specific quirks: "uses 'the South Hills' not 'south Pittsburgh'", "founder Tony in first person", "claims '24/7 emergency'", etc.
- Output ONLY the JSON object.`;

export const voiceAgent: Agent = {
  stage: "voice",
  phase: "discovery",
  label: "Listening to their voice",
  dependsOn: ["crawl"],

  async run({ findings, input, report }) {
    const pages = findings.pages ?? [];
    if (pages.length === 0) {
      await report("No content to read — voice profile skipped");
      return {};
    }

    const blob = pages
      .slice(0, 6)
      .map((p) => `# ${p.title ?? "(untitled)"}\n${p.textSummary}`)
      .join("\n\n---\n\n")
      .slice(0, 12_000);

    const userPrompt = `Business: ${input.businessName ?? "(unknown)"}
Source URL: ${input.sourceUrl ?? "(no URL)"}

Visible text from up to 6 pages of the existing site:

${blob}

Now produce the JSON voice profile.`;

    await report("Asking Gemini to characterize the voice");

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
      const result = await model.generateContent(userPrompt);
      text = result.response.text();
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      await report(`Gemini call failed: ${msg}`);
      throw err;
    }

    const parsed = parseVoice(text);
    if (!parsed) {
      // Don't kill the pipeline. The brand-profile agent will fall back to
      // inferring voice from raw text if detectedVoice is missing.
      await report("Couldn't parse voice JSON — synthesis will infer instead");
      return {};
    }
    return { detectedVoice: parsed };
  },
};

function parseVoice(raw: string): VoiceProfile | null {
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
  const tone = o.tone as VoiceProfile["tone"] | undefined;
  const formality = o.formality as VoiceProfile["formality"] | undefined;
  if (!tone || !formality) return null;
  return {
    tone,
    formality,
    voiceSample: typeof o.voiceSample === "string" ? o.voiceSample : undefined,
    notes: typeof o.notes === "string" ? o.notes : undefined,
  };
}
