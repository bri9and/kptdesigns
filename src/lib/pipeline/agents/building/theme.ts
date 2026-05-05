/**
 * Building — Theme generator.
 *
 * Deterministic (no LLM): takes the BrandProfile's palette + fonts and
 * emits a CSS string that overrides --brand-* variables on a wrapper
 * element. The Puck-rendered preview wraps its output in a div with
 * `style={{ ...themeVars }}` and the existing earthy components — which
 * now consume var(--brand-*) — render in the customer's brand instead
 * of KPT's.
 *
 * Also picks Google Font URLs to inject so the customer's fonts
 * actually load on the preview.
 */
import type { Agent } from "../types";
import type { BrandPalette, BrandFonts } from "../../types";

export const themeAgent: Agent = {
  stage: "theme",
  phase: "building",
  label: "Generating the theme",

  async run({ findings, report }) {
    const profile = findings.brandProfile;
    if (!profile) {
      throw new Error("No brand profile — cannot generate theme");
    }
    const css = buildThemeCss(profile.palette, profile.fonts);
    await report("Theme ready");
    return { themeCss: css };
  },
};

/**
 * Returns a CSS string that, when set as the `style` attribute on a
 * wrapper element, overrides the brand-* CSS variables for everything
 * inside. Also returns the @import for the Google Fonts so the
 * preview can append it to <head>.
 */
export function buildThemeVars(palette: BrandPalette, fonts: BrandFonts): Record<string, string> {
  const vars: Record<string, string> = {
    "--brand-primary": palette.primary,
    "--brand-primary-strong": palette.primaryStrong ?? darken(palette.primary, 0.18),
    "--brand-primary-soft": palette.primarySoft ?? lighten(palette.primary, 0.78),
    "--brand-on-primary": readableOn(palette.primary),
    "--brand-ink": palette.ink,
    "--brand-canvas": palette.canvas,
    "--brand-surface": palette.surface ?? mix(palette.canvas, palette.ink, 0.05),
    "--brand-surface-2": mix(palette.canvas, palette.ink, 0.1),
    "--brand-text-strong": mix(palette.ink, palette.canvas, 0.1),
    "--brand-text": mix(palette.ink, palette.canvas, 0.32),
    "--brand-text-muted": mix(palette.ink, palette.canvas, 0.5),
    "--brand-divider": mix(palette.ink, palette.canvas, 0.85),
    "--brand-divider-soft": mix(palette.ink, palette.canvas, 0.92),
    "--brand-display-font": `"${fonts.display}", system-ui, sans-serif`,
    "--brand-body-font": `"${fonts.body}", system-ui, sans-serif`,
    "--brand-mono-font": `"${fonts.mono ?? "JetBrains Mono"}", ui-monospace, monospace`,
    "--brand-serif-font": `"${fonts.display}", Georgia, serif`,
  };
  if (palette.accent1) vars["--brand-accent-1"] = palette.accent1;
  if (palette.accent2) vars["--brand-accent-2"] = palette.accent2;
  if (palette.accent3) vars["--brand-accent-3"] = palette.accent3;
  return vars;
}

function buildThemeCss(palette: BrandPalette, fonts: BrandFonts): string {
  const vars = buildThemeVars(palette, fonts);
  const decls = Object.entries(vars)
    .map(([k, v]) => `  ${k}: ${v};`)
    .join("\n");
  return `:root {\n${decls}\n}`;
}

/** Returns the Google Fonts CSS link href for the chosen brand fonts. */
export function buildGoogleFontsHref(fonts: BrandFonts): string {
  const families = new Set<string>();
  families.add(`${urlSafe(fonts.display)}:wght@400;500;600;700`);
  if (fonts.body && fonts.body !== fonts.display) {
    families.add(`${urlSafe(fonts.body)}:wght@300;400;500;700`);
  }
  if (fonts.mono) families.add(`${urlSafe(fonts.mono)}:wght@400;500`);
  return `https://fonts.googleapis.com/css2?family=${[...families].join("&family=")}&display=swap`;
}

function urlSafe(family: string): string {
  return family.trim().replace(/\s+/g, "+");
}

/* ---------------- color helpers (sRGB linear-ish) ---------------- */

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const v = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  return [
    parseInt(v.slice(0, 2), 16),
    parseInt(v.slice(2, 4), 16),
    parseInt(v.slice(4, 6), 16),
  ];
}

function rgbToHex(r: number, g: number, b: number): string {
  const c = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0");
  return `#${c(r)}${c(g)}${c(b)}`;
}

function mix(aHex: string, bHex: string, t: number): string {
  const [ar, ag, ab] = hexToRgb(aHex);
  const [br, bg, bb] = hexToRgb(bHex);
  return rgbToHex(ar + (br - ar) * t, ag + (bg - ag) * t, ab + (bb - ab) * t);
}

function darken(hex: string, t: number): string {
  return mix(hex, "#000000", t);
}

function lighten(hex: string, t: number): string {
  return mix(hex, "#ffffff", t);
}

/** Pick white or black based on which has more contrast with the input. */
function readableOn(hex: string): string {
  const [r, g, b] = hexToRgb(hex);
  // Relative luminance per WCAG.
  const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return lum > 0.55 ? "#1a1a1a" : "#ffffff";
}
