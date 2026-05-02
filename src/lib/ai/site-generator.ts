/**
 * AI site generator — turns a scraped snapshot into a Puck content tree.
 *
 * Uses Google Gemini (the same provider kptagents uses, sharing the
 * GOOGLE_API_KEY env var). The system instruction teaches Gemini the
 * earthy block schema (from src/lib/puck-config.tsx), the user message
 * carries the scraped page content, and we ask for a JSON tree it could
 * legally drop into Puck's <Render>.
 *
 * If Gemini returns invalid JSON or the call fails entirely, we fall
 * back to a deterministic templated tree built from the scraped data —
 * the customer still sees a real-looking preview, just less polished.
 */
import { GoogleGenerativeAI } from "@google/generative-ai";
import type { Data as PuckData } from "@measured/puck";

import { BLOCK_SCHEMA_FOR_AI, ICON_NAMES } from "@/lib/puck-config";
import type { ScrapedSnapshot } from "@/lib/intake-store";

const MODEL = "gemini-3-flash-preview";

let _client: GoogleGenerativeAI | null = null;
function client(): GoogleGenerativeAI {
  if (_client) return _client;
  const key = process.env.GOOGLE_API_KEY?.replace(/^"|"$/g, "");
  if (!key) {
    throw new Error("GOOGLE_API_KEY not set in env");
  }
  _client = new GoogleGenerativeAI(key);
  return _client;
}

export type GenerationResult = {
  puckData: PuckData;
  businessSummary: string;
  raw: unknown;
};

export async function generateSite(
  scraped: ScrapedSnapshot,
  opts: { businessName?: string; notes?: string } = {},
): Promise<GenerationResult> {
  const userPrompt = buildUserPrompt(scraped, opts);

  let text: string;
  try {
    const model = client().getGenerativeModel({
      model: MODEL,
      systemInstruction: SYSTEM_PROMPT,
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.7,
        maxOutputTokens: 8000,
      },
    });
    const result = await model.generateContent(userPrompt);
    text = result.response.text();
  } catch (err) {
    // Auth, rate-limit, network, model unavailable — anything. Surface
    // a templated preview built from the scraped snapshot so the
    // customer still sees something believable and the spike isn't
    // blocked.
    const msg = err instanceof Error ? err.message : String(err);
    console.warn("[site-generator] Gemini call failed, using templated preview:", msg);
    return {
      puckData: templatedTree(scraped, opts),
      businessSummary:
        scraped.description ?? scraped.title ?? "A business that needs a great website.",
      raw: { error: msg, fallback: "templated" },
    };
  }

  const parsed = parseJsonFromGeminiText(text);
  if (!parsed) {
    return {
      puckData: templatedTree(scraped, opts),
      businessSummary:
        scraped.description ?? scraped.title ?? "A business that needs a great website.",
      raw: text,
    };
  }

  if (!parsed.content || !Array.isArray(parsed.content)) {
    return {
      puckData: templatedTree(scraped, opts),
      businessSummary:
        typeof parsed.businessSummary === "string" ? parsed.businessSummary : "",
      raw: parsed,
    };
  }

  // Coerce into Puck shape (each item needs { type, props })
  const content = parsed.content
    .filter(
      (b: unknown): b is { type: string; props: Record<string, unknown> } =>
        typeof b === "object" && b !== null &&
        typeof (b as { type?: unknown }).type === "string" &&
        typeof (b as { props?: unknown }).props === "object",
    )
    .map((b) => ({
      type: b.type,
      props: { ...b.props, id: `${b.type}-${cryptoRandomId()}` },
    }));

  if (content.length === 0) {
    return {
      puckData: templatedTree(scraped, opts),
      businessSummary:
        typeof parsed.businessSummary === "string" ? parsed.businessSummary : "",
      raw: parsed,
    };
  }

  const puckData: PuckData = {
    content,
    root: { props: {} },
  };

  return {
    puckData,
    businessSummary:
      typeof parsed.businessSummary === "string" ? parsed.businessSummary : "",
    raw: parsed,
  };
}

/* ------------------------------------------------------------------ */
/* Prompts                                                             */
/* ------------------------------------------------------------------ */

const SYSTEM_PROMPT = `You are the AI heart of KPT Designs — a boutique web design firm that ships modern, custom-coded websites for small businesses.

Your job: take the raw text + structure of a small business's existing website, understand what the business actually does, and produce a JSON content tree that — when rendered with KPT's section components — becomes a dramatically better version of their site. Same business, much better website.

Your output must be a single valid JSON object with EXACTLY these keys:
{
  "businessSummary": "<one-paragraph summary of what this business does, who they serve, and what makes them distinct. Written for KPT's internal use.>",
  "content": [ ...sequence of 5-8 blocks... ]
}

Each block in "content" is { "type": "<BlockName>", "props": { ... } } where BlockName is one of the registered earthy components.

${BLOCK_SCHEMA_FOR_AI}

WRITING VOICE GUIDELINES:
- Boutique-confident. Specific over generic. "We've rewired thousand-square-foot service trucks" beats "We do plumbing right."
- Match the small-business owner's actual voice when you can hear it in the source. If they say "the South Hills" rather than "the Pittsburgh area," keep that.
- Always include the business's specialty in the hero. Don't bury what they actually do.
- Avoid corporate-speak: "leverage," "synergize," "best-in-class," "solutions," "empower."
- Avoid hyperbole: "amazing," "incredible," "world-class," "the leading."

CONSTRAINTS:
- Distribute the four colors (orange/blue/amber/sage) across blocks/items so adjacent ones don't share a color.
- Every Hero must have non-empty primaryCtaLabel/Href and secondaryCtaLabel/Href.
- Use real, plausible href values: "/contact", "/services", "/about", "tel:+1...", "mailto:...". Never invent URLs to other sites.
- For Stats blocks, the numbers must be defensible — pull from the source if available, otherwise use modest, plausible figures (e.g. years in business, # of customers, response time).
- For Quote blocks, only use a real testimonial from the scraped source. If none is in the source, OMIT the Quote block entirely — never invent quotes from fake customers.
- Output ONLY the JSON object. No prose, no markdown fences, no explanation.

Available icon names (must use exactly one of these for any "icon" field):
${ICON_NAMES.join(", ")}.`;

function buildUserPrompt(
  scraped: ScrapedSnapshot,
  opts: { businessName?: string; notes?: string },
): string {
  const lines: string[] = [];

  lines.push(`Here is the existing website I want you to study and reimagine.`);
  lines.push("");
  lines.push(`URL: ${scraped.finalUrl}`);
  if (scraped.title) lines.push(`Page title: ${scraped.title}`);
  if (scraped.description) lines.push(`Meta description: ${scraped.description}`);
  if (opts.businessName) lines.push(`Business name (provided by user): ${opts.businessName}`);
  if (opts.notes) {
    lines.push("");
    lines.push("Extra context the customer provided:");
    lines.push(opts.notes);
  }

  if (scraped.headings.length) {
    lines.push("");
    lines.push("Headings on the existing site:");
    scraped.headings.slice(0, 30).forEach((h) => lines.push(`- ${h}`));
  }

  if (scraped.textSummary) {
    lines.push("");
    lines.push("Visible text content (excerpt):");
    lines.push(scraped.textSummary);
  }

  if (scraped.links.length) {
    lines.push("");
    lines.push("Internal nav links seen (use to infer structure):");
    scraped.links.slice(0, 20).forEach((l) => lines.push(`- ${l.text}: ${l.href}`));
  }

  lines.push("");
  lines.push(
    `Now produce the JSON content tree. Reply with ONLY the JSON object — no markdown, no explanation.`,
  );

  return lines.join("\n");
}

/* ------------------------------------------------------------------ */
/* Helpers                                                              */
/* ------------------------------------------------------------------ */

function parseJsonFromGeminiText(text: string): {
  businessSummary?: string;
  content?: unknown[];
} | null {
  const trimmed = text.trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    // Try to find a JSON object inside the text (in case Gemini added ```json fences)
    const match = trimmed.match(/\{[\s\S]*\}/);
    if (!match) return null;
    try {
      return JSON.parse(match[0]);
    } catch {
      return null;
    }
  }
}

function cryptoRandomId(): string {
  return Math.random().toString(36).slice(2, 10);
}

/**
 * Smarter fallback used when the Gemini call fails entirely (auth,
 * rate-limit, network). Composes a real-feeling multi-section preview
 * from the scraped snapshot alone — uses the page title/description as
 * the hero, headings as feature titles.
 *
 * This is intentionally generic but cohesive — the customer sees a
 * believable preview even when the AI engine is down.
 */
function templatedTree(
  scraped: ScrapedSnapshot,
  opts: { businessName?: string; notes?: string } = {},
): PuckData {
  const businessName = opts.businessName ?? scraped.title ?? "Your business";
  const tagline =
    scraped.description ??
    scraped.headings[0] ??
    `${businessName} — made beautiful, made yours.`;

  const seen = new Set<string>();
  const featureHeadings = scraped.headings
    .map((h) => h.replace(/\s+/g, " ").trim())
    .filter((h) => h.length > 4 && h.length < 80)
    .filter((h) => {
      const k = h.toLowerCase();
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    })
    .slice(0, 6);

  const ICONS = ["RefreshCcw", "Sparkles", "ShieldCheck", "Code2", "Globe2", "FileText"];
  const COLORS = ["orange", "blue", "amber", "sage", "orange", "blue"] as const;

  const features = featureHeadings.length
    ? featureHeadings.map((title, i) => ({
        icon: ICONS[i % ICONS.length],
        color: COLORS[i % COLORS.length],
        title,
        body: `Modernized version of "${title}" — same content, dramatically better experience.`,
      }))
    : [
        { icon: "RefreshCcw", color: "orange" as const, title: "What you do today", body: "We pull every service and offering from your existing site, presented clearly." },
        { icon: "Sparkles", color: "blue" as const, title: "How you want to grow", body: "Room for the things you've been meaning to add — booking, pricing, photos." },
        { icon: "ShieldCheck", color: "sage" as const, title: "Built to last", body: "Custom-coded. Mobile-first. Fast. Yours forever." },
      ];

  return {
    content: [
      {
        type: "Hero",
        props: {
          id: `Hero-${cryptoRandomId()}`,
          tagline,
          searchPlaceholder: "Want a different preview? Paste another URL.",
          primaryCtaLabel: "Make this mine — $500",
          primaryCtaHref: "/contact",
          secondaryCtaLabel: "Try a different URL",
          secondaryCtaHref: "/start",
        },
      },
      {
        type: "Features",
        props: {
          id: `Features-${cryptoRandomId()}`,
          label: "What we'd build",
          title: `A modern home for ${businessName}`,
          body:
            scraped.description ??
            "We took what's on your existing site and reimagined it as a boutique-grade build. Below is the structure we'd ship.",
          features,
        },
      },
      {
        type: "Showcase",
        props: {
          id: `Showcase-${cryptoRandomId()}`,
          label: "How it would feel",
          title: "Fast, considered, and built around your customers",
          body:
            "Every section is hand-crafted around how your customers actually buy from you. Mobile-first. Page loads under a second. Built around the one or two actions that matter.",
          ctaLabel: "Talk to us",
          ctaHref: "/contact",
          ctaVariant: "primary",
          visualUrl: scraped.finalUrl ?? "kptdesigns.com",
          visualKind: "barChart",
          reverse: false,
        },
      },
      {
        type: "Cta",
        props: {
          id: `Cta-${cryptoRandomId()}`,
          label: "Make it real",
          title: "Like what you see?",
          body:
            "$500 to claim this preview, unlock the editor, register your domain, and ship to production. No subscription required.",
          primaryLabel: "Claim this preview",
          primaryHref: "/contact",
          secondaryLabel: "See pricing",
          secondaryHref: "/pricing",
        },
      },
    ],
    root: { props: {} },
  };
}
