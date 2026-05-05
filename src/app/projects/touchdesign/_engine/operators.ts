/**
 * Typed catalog of operators in the KPT_WEB network.
 *
 * Every node in the network is declared here with:
 *  - id (used by wires.ts)
 *  - type (drives header color + viewport renderer)
 *  - name (mono caps label)
 *  - position (x,y in canvas coords; canvas origin = (0,0))
 *  - ports (count of input + output anchors on left/right edges)
 *  - params (TouchDesigner-style parameter rows for the side panel)
 *  - deep (rich content shown when node is double-clicked — portfolio cards,
 *    FAQ accordion, philosophy table, etc.)
 *
 * Positions are tuned so the layout reads left→right roughly:
 *   stack & content on the left,
 *   the four flagship service ops down the spine,
 *   data/output ops on the right,
 *   and the // RUN exec at the far right.
 */

import type { OpType } from "./palette";
import { portfolio } from "@/lib/portfolio";

/* ---------- types ---------- */

export type ParamKind = "pulse" | "toggle" | "float" | "int" | "string" | "menu";

export interface Param {
  key: string;
  kind: ParamKind;
  label: string;
  /** Display value — mono caps. For toggles, "ON" | "OFF". */
  value: string;
  /** Optional menu choices (kind === "menu"). */
  options?: string[];
  /** Read-only — show but cannot edit. */
  ro?: boolean;
}

export interface OpDeep {
  blurb: string;
  rows?: Array<{ k: string; v: string }>;
  list?: string[];
  faq?: Array<{ q: string; a: string }>;
  /** When set, the deep panel renders portfolio cards from /lib/portfolio. */
  portfolio?: boolean;
  /** Telemetry metric definitions for CHOP deep view. */
  channels?: Array<{ label: string; unit: string; value: string; sub: string }>;
  /** Process steps for process_chop. */
  steps?: Array<{ n: string; name: string; desc: string }>;
  /** Optional cta link. */
  cta?: { label: string; href: string };
}

export interface Operator {
  id: string;
  type: OpType;
  name: string;
  /** "Comment" line above the name, like TD's display label. */
  comment?: string;
  x: number;
  y: number;
  /** Number of input ports rendered down the left edge. */
  inputs: number;
  /** Number of output ports rendered down the right edge. */
  outputs: number;
  /** Render hint for the small live viewport thumbnail. */
  vp:
    | "tex_gradient"     // generative gradient
    | "tex_grid"         // tailwind-y grid checker
    | "tex_portfolio"    // tiny grid of project tiles
    | "tex_logo"         // KPT mark
    | "chop_wave"        // animated waveform
    | "chop_multi"       // 4 stacked waveforms
    | "chop_steps"       // 4-stage stairstep
    | "chop_uptime"      // flat 99.99% line w/ hairline jitter
    | "sop_wire"         // rotating wireframe
    | "mat_sphere"       // shaded sphere
    | "dat_table"        // scrolling text rows
    | "dat_calls"        // inbound phone log
    | "dat_domains"      // domain table (.com/.io/.dev)
    | "dat_kv"           // key:value pairs
    | "dat_faq"          // Q/A rows
    | "comp_subnet"      // tiny subnetwork mini-graph
    | "comp_logo"        // logo lockup, "kpt_web" root
    | "exec_run";        // // RUN button
  params: Param[];
  deep?: OpDeep;
  /** Visual emphasis ring (kpt_agents flagship). */
  flagship?: boolean;
}

/* ---------- data ---------- */

const portfolioFaq = [
  { q: "How long does a website take to build?", a: "Most projects take 1-4 weeks depending on complexity. A simple 3-5 page site can be done in a week. Larger projects with ecommerce or custom features take 2-4 weeks." },
  { q: "Do I own the code when it's done?", a: "Yes, 100%. When your site is finished, we deliver the complete source code. It's yours — no lock-in, no proprietary platforms, no monthly fees unless you want hosting and support." },
  { q: "What if I already have a website?", a: "We handle the full migration. We'll redesign and rebuild your site, move your content, and set up redirects so you don't lose any search engine rankings." },
  { q: "Do you work with businesses outside your area?", a: "We work with businesses nationwide. Everything is done remotely — from the initial call to final delivery. Location is never a barrier." },
  { q: "What technologies do you use?", a: "We use modern frameworks like Next.js, React, and Tailwind CSS. Your site will be fast, secure, and built with the same tools used by top tech companies." },
  { q: "Can you help with SEO?", a: "Every site we build includes foundational SEO — proper meta tags, fast load times, mobile responsiveness, and clean code structure. We also offer ongoing SEO optimization as part of our Growth Plan." },
];

export const OPERATORS: Operator[] = [
  /* -------------------- ROOT COMP -------------------- */
  {
    id: "kpt_web",
    type: "COMP",
    name: "kpt_web",
    comment: "/project1",
    x: 60, y: 40,
    inputs: 0, outputs: 1, vp: "comp_logo",
    params: [
      { key: "name", kind: "string", label: "Name", value: "kpt_web", ro: true },
      { key: "type", kind: "string", label: "Type", value: "Component", ro: true },
      { key: "external", kind: "toggle", label: "External", value: "OFF" },
      { key: "cooktime", kind: "float", label: "Cook Time", value: "0.42 ms", ro: true },
    ],
    deep: {
      blurb: "Root component — the entire KPT Designs network. Every service, signal, and surface lives inside. Est. 2004.",
      rows: [
        { k: "founded", v: "2004" },
        { k: "operators", v: "16" },
        { k: "wires", v: "20" },
        { k: "build", v: "47" },
      ],
    },
  },

  /* -------------------- STACK COLUMN (left) -------------------- */
  {
    id: "nextjs_16",
    type: "COMP",
    name: "nextjs_16",
    comment: "framework",
    x: 60, y: 200,
    inputs: 1, outputs: 1, vp: "comp_subnet",
    params: [
      { key: "version", kind: "string", label: "Version", value: "16.1.6", ro: true },
      { key: "router", kind: "menu", label: "Router", value: "App", options: ["App", "Pages"] },
      { key: "rsc", kind: "toggle", label: "RSC", value: "ON" },
      { key: "edge", kind: "toggle", label: "Edge Runtime", value: "ON" },
    ],
    deep: {
      blurb: "Server-side rendering, static generation, and edge functions. Pages load instantly with built-in SEO optimization.",
      rows: [
        { k: "pattern", v: "App Router" },
        { k: "RSC", v: "ENABLED" },
        { k: "edge", v: "194 PoPs" },
      ],
    },
  },
  {
    id: "react_19",
    type: "COMP",
    name: "react_19",
    comment: "ui_runtime",
    x: 60, y: 360,
    inputs: 1, outputs: 1, vp: "comp_subnet",
    params: [
      { key: "version", kind: "string", label: "Version", value: "19.2.3", ro: true },
      { key: "concurrent", kind: "toggle", label: "Concurrent", value: "ON" },
      { key: "suspense", kind: "toggle", label: "Suspense", value: "ON" },
    ],
    deep: {
      blurb: "Component architecture built for scale. Hooks, Suspense, Server Components.",
      list: ["Hooks", "Suspense", "Server Components", "Concurrent rendering"],
    },
  },
  {
    id: "tailwind_4",
    type: "TOP",
    name: "tailwind_4",
    comment: "style_engine",
    x: 60, y: 520,
    inputs: 1, outputs: 1, vp: "tex_grid",
    params: [
      { key: "version", kind: "string", label: "Version", value: "4.0", ro: true },
      { key: "jit", kind: "toggle", label: "JIT", value: "ON" },
      { key: "treeShake", kind: "toggle", label: "Tree-shake", value: "ON" },
      { key: "size", kind: "string", label: "Output", value: "<10 KB", ro: true },
    ],
    deep: {
      blurb: "Utility-first styling with zero dead CSS. Pixel-perfect responsive designs that look great on every device.",
      rows: [
        { k: "JIT", v: "ENABLED" },
        { k: "tree-shake", v: "TRUE" },
        { k: "ship size", v: "<10 KB" },
      ],
    },
  },
  {
    id: "typescript",
    type: "DAT",
    name: "typescript",
    comment: "type_system",
    x: 60, y: 680,
    inputs: 1, outputs: 1, vp: "dat_kv",
    params: [
      { key: "strict", kind: "toggle", label: "Strict", value: "ON" },
      { key: "target", kind: "menu", label: "Target", value: "ES2022", options: ["ES2020","ES2022","ESNext"] },
      { key: "errors", kind: "int", label: "Errors", value: "0", ro: true },
    ],
    deep: {
      blurb: "Full type safety from database to DOM. Bugs caught at build time, not by your customers.",
      list: ["Strict mode", "End-to-end types", "Zero `any`"],
    },
  },

  /* -------------------- KPT SERVICES (spine, center) -------------------- */
  {
    id: "kpt_registrar",
    type: "DAT",
    name: "kpt_registrar",
    comment: "domain_registry",
    x: 380, y: 120,
    inputs: 1, outputs: 1, vp: "dat_domains",
    params: [
      { key: "available", kind: "string", label: "Available", value: "2,847,392", ro: true },
      { key: "tlds", kind: "string", label: "TLDs", value: ".com .io .dev .ai", ro: true },
      { key: "auto_renew", kind: "toggle", label: "Auto Renew", value: "ON" },
      { key: "whois", kind: "menu", label: "WHOIS", value: "Private", options: ["Public","Private"] },
      { key: "transfer_lock", kind: "toggle", label: "Transfer Lock", value: "ON" },
    ],
    deep: {
      blurb: "Search and register your domain in seconds. .com, .io, .dev, .ai — owned outright, transferrable, no markup.",
      rows: [
        { k: "available", v: "2,847,392 names" },
        { k: "renewal", v: "AT-COST" },
        { k: "transfer_lock", v: "ON" },
        { k: "whois_privacy", v: "FREE" },
      ],
    },
  },
  {
    id: "kpt_host",
    type: "CHOP",
    name: "kpt_host",
    comment: "edge_uptime",
    x: 380, y: 290,
    inputs: 1, outputs: 1, vp: "chop_uptime",
    params: [
      { key: "uptime", kind: "string", label: "Uptime", value: "99.99 %", ro: true },
      { key: "cdn", kind: "menu", label: "CDN", value: "Vercel Edge", options: ["Vercel Edge", "Cloudflare", "Fastly"] },
      { key: "ssl", kind: "toggle", label: "SSL", value: "ON" },
      { key: "ddos", kind: "toggle", label: "DDoS Shield", value: "ON" },
      { key: "regions", kind: "int", label: "Regions", value: "194", ro: true },
    ],
    deep: {
      blurb: "Managed hosting with automatic SSL, DDoS protection, and 194 global edge locations. Your site stays up.",
      channels: [
        { label: "uptime",   unit: "%",  value: "99.99", sub: "rolling 90d" },
        { label: "TTFB",     unit: "ms", value: "118",   sub: "p50" },
        { label: "regions",  unit: "",   value: "194",   sub: "PoPs" },
        { label: "ssl_renew",unit: "d",  value: "auto",  sub: "Let's Encrypt" },
      ],
    },
  },
  {
    id: "kpt_design",
    type: "TOP",
    name: "kpt_design",
    comment: "visual_output",
    x: 380, y: 460,
    inputs: 3, outputs: 1, vp: "tex_gradient",
    params: [
      { key: "resolution", kind: "string", label: "Resolution", value: "1920×1080", ro: true },
      { key: "format", kind: "menu", label: "Format", value: "RGBA", options: ["RGB","RGBA","HDR"] },
      { key: "bypass", kind: "toggle", label: "Bypass", value: "OFF" },
      { key: "cook", kind: "pulse", label: "Cook", value: "//" },
      { key: "fps", kind: "float", label: "FPS", value: "60.0", ro: true },
    ],
    deep: {
      blurb: "Hand-coded designs that convert. Every pixel is intentional. No templates. No page builders. No WordPress.",
      rows: [
        { k: "templates", v: "ZERO" },
        { k: "page_builders", v: "ZERO" },
        { k: "WordPress", v: "ZERO" },
        { k: "ownership", v: "100%" },
      ],
    },
  },
  {
    id: "kpt_agents",
    type: "DAT",
    name: "kpt_agents",
    comment: "ai_inbound_phone",
    x: 380, y: 620,
    inputs: 2, outputs: 2, vp: "dat_calls",
    flagship: true,
    params: [
      { key: "lines", kind: "int", label: "Lines", value: "8", ro: false },
      { key: "ringtone", kind: "menu", label: "Ringtone", value: "Bell-04", options: ["Bell-04","Pulse","Soft"] },
      { key: "voice", kind: "menu", label: "Voice", value: "Maya · warm", options: ["Maya · warm","Atlas · steady","Echo · neutral"] },
      { key: "transfer_to", kind: "string", label: "Transfer", value: "+1.412.555.0001" },
      { key: "qualify", kind: "toggle", label: "Qualify", value: "ON" },
      { key: "log", kind: "toggle", label: "Log Calls", value: "ON" },
      { key: "active", kind: "int", label: "Calls Today", value: "47", ro: true },
    ],
    deep: {
      blurb: "Sister product. AI phone agents that answer your business line, qualify leads, take messages, and route hot calls — 24/7.",
      rows: [
        { k: "answer_rate", v: "100%" },
        { k: "avg_handle", v: "47 s" },
        { k: "qualified_today", v: "12 / 47" },
        { k: "after_hours", v: "31 / 47" },
        { k: "transferred", v: "5 / 47" },
      ],
      list: [
        "[2026-04-28 14:32:01]  +1.412.555.0042  ·  47s  ·  QUALIFIED",
        "[2026-04-28 14:18:55]  +1.602.555.0119  ·  1m12  ·  MESSAGE",
        "[2026-04-28 13:54:11]  +1.215.555.0207  ·  22s  ·  ROUTED",
        "[2026-04-28 13:31:47]  +1.412.555.0098  ·  3m08  ·  QUALIFIED",
        "[2026-04-28 13:02:19]  +1.928.555.0033  ·  41s  ·  AFTER-HRS",
        "[2026-04-28 12:48:02]  +1.412.555.0142  ·  56s  ·  SPAM",
        "[2026-04-28 12:15:27]  +1.602.555.0072  ·  2m04  ·  QUALIFIED",
      ],
      cta: { label: "// learn more", href: "/start" },
    },
  },

  /* -------------------- CONTENT (right) -------------------- */
  {
    id: "philosophy_dat",
    type: "DAT",
    name: "philosophy_dat",
    comment: "doctrine",
    x: 700, y: 60,
    inputs: 1, outputs: 1, vp: "dat_kv",
    params: [
      { key: "rows", kind: "int", label: "Rows", value: "5", ro: true },
      { key: "scroll", kind: "toggle", label: "Scroll", value: "OFF" },
    ],
    deep: {
      blurb: "We build modern, lightning-fast websites that actually convert. Every site is hand-coded from scratch — no templates, no page builders, no WordPress.",
      rows: [
        { k: "no_templates", v: "TRUE" },
        { k: "owned_outright", v: "TRUE" },
        { k: "lock_in", v: "FALSE" },
        { k: "page_builders", v: "FALSE" },
        { k: "source_delivered", v: "TRUE" },
      ],
    },
  },
  {
    id: "telemetry_chop",
    type: "CHOP",
    name: "telemetry_chop",
    comment: "live_metrics",
    x: 700, y: 220,
    inputs: 2, outputs: 1, vp: "chop_multi",
    params: [
      { key: "channels", kind: "int", label: "Channels", value: "4", ro: true },
      { key: "rate", kind: "float", label: "Rate", value: "60 Hz", ro: true },
      { key: "exp", kind: "float", label: "experience", value: "20+ yrs" },
      { key: "load", kind: "float", label: "load_time", value: "<1 s" },
      { key: "own", kind: "float", label: "ownership", value: "100 %" },
      { key: "ps", kind: "float", label: "pagespeed", value: "95+ pts" },
    ],
    deep: {
      blurb: "Live telemetry from real projects. No fluff.",
      channels: [
        { label: "experience", unit: "yrs", value: "20+", sub: "Since 2004" },
        { label: "load_time",  unit: "s",   value: "<1",  sub: "Target < 1.0s" },
        { label: "ownership",  unit: "%",   value: "100", sub: "Your code, forever" },
        { label: "pagespeed",  unit: "pts", value: "95+", sub: "Google Lighthouse" },
      ],
    },
  },
  {
    id: "portfolio_top",
    type: "TOP",
    name: "portfolio_top",
    comment: "archive_47",
    x: 700, y: 380,
    inputs: 1, outputs: 1, vp: "tex_portfolio",
    params: [
      { key: "specimens", kind: "int", label: "Specimens", value: "47", ro: true },
      { key: "format", kind: "menu", label: "Format", value: "Grid 3×N", options: ["Grid 3×N","Grid 2×N","List"] },
      { key: "filter", kind: "menu", label: "Filter", value: "All", options: ["All","Law","Real Estate","Health","Trades"] },
    ],
    deep: {
      blurb: "47 hand-coded specimens. Real businesses, real owners, no two alike.",
      portfolio: true,
    },
  },
  {
    id: "process_chop",
    type: "CHOP",
    name: "process_chop",
    comment: "path_of_four",
    x: 700, y: 530,
    inputs: 1, outputs: 1, vp: "chop_steps",
    params: [
      { key: "steps", kind: "int", label: "Steps", value: "4", ro: true },
      { key: "play", kind: "pulse", label: "Play", value: "//" },
    ],
    deep: {
      blurb: "Four steps from idea to live site.",
      steps: [
        { n: "01", name: "Discovery Call", desc: "A focused conversation about your goals, audience, and timeline. No drawn-out meetings — just clarity." },
        { n: "02", name: "Design & Build", desc: "We design and code your site from scratch. You see progress early and often. Revisions included." },
        { n: "03", name: "Review & Launch", desc: "We iterate until you love it. Then deploy, configure analytics, and verify everything runs clean." },
        { n: "04", name: "Delivery & Ownership", desc: "Complete source code and repository delivered. No lock-in. No proprietary platforms. It's yours." },
      ],
    },
  },
  {
    id: "faq_dat",
    type: "DAT",
    name: "faq_dat",
    comment: "known_queries",
    x: 700, y: 680,
    inputs: 0, outputs: 1, vp: "dat_faq",
    params: [
      { key: "rows", kind: "int", label: "Rows", value: "6", ro: true },
      { key: "expand_all", kind: "toggle", label: "Expand All", value: "OFF" },
    ],
    deep: {
      blurb: "Common questions. Real answers.",
      faq: portfolioFaq,
    },
  },
  {
    id: "vercel_edge",
    type: "CHOP",
    name: "vercel_edge",
    comment: "global_deploy",
    x: 1010, y: 220,
    inputs: 2, outputs: 1, vp: "chop_wave",
    params: [
      { key: "regions", kind: "int", label: "Regions", value: "194", ro: true },
      { key: "ssl", kind: "toggle", label: "SSL", value: "ON" },
      { key: "p50", kind: "string", label: "TTFB p50", value: "118 ms", ro: true },
      { key: "p95", kind: "string", label: "TTFB p95", value: "342 ms", ro: true },
    ],
    deep: {
      blurb: "Global edge deployment so your site loads fast no matter where your visitors are. Built-in SSL and DDoS protection.",
      rows: [
        { k: "PoPs", v: "194" },
        { k: "uptime", v: "99.99%" },
        { k: "TTFB", v: "118 ms p50" },
      ],
    },
  },

  /* -------------------- EXEC: // RUN -------------------- */
  {
    id: "cta_exec",
    type: "EXEC",
    name: "cta_exec",
    comment: "// run network",
    x: 1010, y: 460,
    inputs: 3, outputs: 0, vp: "exec_run",
    params: [
      { key: "target", kind: "string", label: "Target", value: "/start", ro: true },
      { key: "method", kind: "menu", label: "Method", value: "wizard", options: ["wizard","contact","call"] },
      { key: "run", kind: "pulse", label: "// RUN", value: "RUN" },
    ],
    deep: {
      blurb: "Cook the network. This pulses the build pipeline and routes you to the project wizard.",
      rows: [
        { k: "target", v: "/start" },
        { k: "method", v: "wizard" },
        { k: "lock_in", v: "FALSE" },
      ],
      cta: { label: "// run network", href: "/start" },
    },
  },
];

/** Lookup helper. */
export const opMap: Map<string, Operator> = new Map(
  OPERATORS.map((o) => [o.id, o])
);

/** Re-export so deep panel can use the full portfolio list. */
export { portfolio };
