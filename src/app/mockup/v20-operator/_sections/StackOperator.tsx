import { IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Serif } from "next/font/google";

const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], display: "swap" });
const plexSans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap" });
const plexSerif = IBM_Plex_Serif({ subsets: ["latin"], weight: ["400", "500", "600"], display: "swap", style: ["normal", "italic"] });

const PAPER = "#F4EFE0";
const INK = "#1A1A1A";
const IBM_BLUE = "#1D5CB6";
const SUB_RED = "#A4262C";
const AMBER = "#C9A30D";
const RULE = "#1A1A1A";

type Param = { key: string; value: string };
type Tool = {
  num: string;
  name: string;
  tagline: string;
  body: string;
  params: Param[];
  warning?: string;
  subsystem?: boolean;
};

const TOOLS: Tool[] = [
  {
    num: "2.1",
    name: "NEXT.JS 16",
    tagline: "Server-rendered React framework with edge runtime support.",
    body: "Operates as the primary delivery layer. Routes are resolved through the App Router; server components stream over the wire and hydrate progressively. Static fragments are pre-compiled at build time, while dynamic surfaces are deferred to request-time and rendered on either Node or the V8 isolate edge runtime.",
    params: [
      { key: "Version", value: "16.1.6" },
      { key: "Runtime", value: "Node.js / Edge" },
      { key: "Spec", value: "APP_ROUTER · RSC · STREAMING" },
    ],
  },
  {
    num: "2.2",
    name: "REACT 19",
    tagline: "Concurrent UI library with native server component support.",
    body: "Provides the component model and reconciliation pipeline. The concurrent renderer permits non-blocking updates; useTransition and Suspense boundaries are employed to keep the main thread responsive during data revalidation. Form actions execute on the server without client-side state plumbing.",
    params: [
      { key: "Version", value: "19.0.0" },
      { key: "Renderer", value: "Concurrent / Fiber" },
      { key: "Spec", value: "RSC · ACTIONS · USE_HOOK" },
    ],
  },
  {
    num: "2.3",
    name: "TAILWIND 4",
    tagline: "Utility-first CSS engine with native cascade layers.",
    body: "Drives the visual layer. The v4 engine is written in Rust and compiles atomic class declarations into a flat stylesheet on each request to the dev server. Design tokens are declared as CSS custom properties, allowing runtime theming without rebuilds.",
    params: [
      { key: "Version", value: "4.0.x" },
      { key: "Engine", value: "Oxide (Rust)" },
      { key: "Spec", value: "JIT · CSS_VARS · @theme" },
    ],
    warning:
      "CAUTION: Class names are not interpolated. Dynamic strings must be enumerated in source or whitelisted via safelist.",
  },
  {
    num: "2.4",
    name: "TYPESCRIPT",
    tagline: "Statically typed superset of JavaScript with strict null checks.",
    body: "Enforced project-wide under strict mode. Public API surfaces are typed at the boundary; database rows are inferred from generated Supabase schema; external responses are validated with Zod before crossing into application code. No implicit any.",
    params: [
      { key: "Version", value: "5.6.x" },
      { key: "Mode", value: "strict · noUncheckedIndexedAccess" },
      { key: "Spec", value: "ESM · MODULE_RESOLUTION:bundler" },
    ],
  },
  {
    num: "2.5",
    name: "VERCEL EDGE",
    tagline: "Globally distributed serverless platform on V8 isolates.",
    body: "Hosts the production deployment. Static assets are served from the global CDN; server functions execute in the region nearest to the request. Preview deployments are provisioned per branch and torn down on merge. Observability and log retention are handled at the platform level.",
    params: [
      { key: "Region", value: "iad1 (primary)" },
      { key: "Cold start", value: "≤ 30 ms (edge isolate)" },
      { key: "Spec", value: "FLUID · STREAMING · KV" },
    ],
  },
  {
    num: "2.6",
    name: "KPT AGENTS",
    tagline:
      "Inbound AI phone agent integration through sister company KPT Agents.",
    body: "Subsystem module. Routes inbound voice traffic to a Claude-powered agent which qualifies the caller, captures intake, and forwards structured leads back to the studio queue. Operates over a SIP trunk with a fallback to human escalation. Treated as an external bus on the architecture diagram; not bundled with the website runtime.",
    params: [
      { key: "Provider", value: "KPT Agents (sister co.)" },
      { key: "Transport", value: "SIP / Webhook" },
      { key: "Spec", value: "INBOUND · LLM_QUALIFY · ESCALATE" },
    ],
    warning:
      "NOTE: KPT Agents is a labeled subsystem, not a hard dependency. Site renders nominally with the bus offline.",
    subsystem: true,
  },
];

function ParamTable({ rows }: { rows: Param[] }) {
  return (
    <div
      className={`${plexMono.className} mt-4 border border-[var(--ink)]/35 bg-white/40 text-[12.5px] leading-tight`}
      style={{ ["--ink" as string]: INK }}
    >
      <div
        className="flex items-center justify-between border-b border-[var(--ink)]/35 px-3 py-1.5 text-[10.5px] uppercase tracking-[0.22em]"
        style={{ ["--ink" as string]: INK, color: INK }}
      >
        <span>PARAMETERS</span>
        <span style={{ color: SUB_RED }}>TBL.{rows.length.toString().padStart(2, "0")}</span>
      </div>
      <dl className="divide-y divide-[var(--ink)]/20" style={{ ["--ink" as string]: INK }}>
        {rows.map((r) => (
          <div key={r.key} className="grid grid-cols-[140px_1fr] gap-3 px-3 py-1.5 md:grid-cols-[180px_1fr]">
            <dt className="uppercase tracking-[0.14em] text-[var(--ink)]/65" style={{ ["--ink" as string]: INK }}>
              {r.key}
            </dt>
            <dd className="break-words font-medium text-[color:var(--ink)]" style={{ ["--ink" as string]: INK }}>
              {r.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function WarningCallout({ text }: { text: string }) {
  return (
    <div
      className={`${plexMono.className} mt-4 flex items-start gap-3 border-l-[3px] bg-[color:var(--amber)]/10 px-3 py-2 text-[12px] leading-snug tracking-[0.04em]`}
      style={{ borderColor: AMBER, ["--amber" as string]: AMBER, color: INK }}
    >
      <span className="mt-[1px] inline-block h-3 w-3 shrink-0 rotate-45 border-[1.5px]" style={{ borderColor: AMBER, background: AMBER }} aria-hidden />
      <span><span style={{ color: AMBER, fontWeight: 600 }}>WARN&nbsp;·&nbsp;</span>{text}</span>
    </div>
  );
}

function Subsection({ tool, last }: { tool: Tool; last: boolean }) {
  return (
    <article id={`sec-${tool.num}`} className={`relative ${last ? "" : "pb-10 md:pb-12"}`}>
      <header className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span className={`${plexMono.className} text-[12px] tracking-[0.22em]`} style={{ color: SUB_RED }}>
          §{tool.num}
        </span>
        <h3 className={`${plexSans.className} text-[20px] font-bold leading-tight tracking-[0.02em] md:text-[22px]`} style={{ color: IBM_BLUE }}>
          {tool.name}
          {tool.subsystem ? (
            <span className={`${plexMono.className} ml-3 align-middle text-[10.5px] font-medium uppercase tracking-[0.22em]`} style={{ color: SUB_RED }}>
              [SUBSYSTEM]
            </span>
          ) : null}
        </h3>
      </header>

      <p className={`${plexSerif.className} mt-1 text-[14.5px] italic leading-snug`} style={{ color: INK }}>
        {tool.tagline}
      </p>

      <p className={`${plexSerif.className} mt-3 max-w-[68ch] text-[15px] leading-[1.55]`} style={{ color: INK }}>
        <span className={`${plexSerif.className} float-left mr-2 mt-1 text-[28px] font-semibold leading-[0.8]`} style={{ color: IBM_BLUE }}>
          {tool.name.charAt(0)}
        </span>
        {tool.body.slice(1)}
      </p>

      <ParamTable rows={tool.params} />
      {tool.warning ? <WarningCallout text={tool.warning} /> : null}
    </article>
  );
}

export default function StackOperator() {
  return (
    <section
      className={`${plexSerif.className} relative px-6 py-20 md:px-10 md:py-28`}
      style={{ background: PAPER, color: INK }}
    >
      {/* paper grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-multiply"
        style={{
          backgroundImage:
            "radial-gradient(rgba(26,26,26,0.5) 0.5px, transparent 0.5px)",
          backgroundSize: "3px 3px",
        }}
      />

      <div className="relative mx-auto max-w-3xl">
        {/* running header */}
        <div
          className={`${plexMono.className} mb-3 flex items-center justify-between text-[10.5px] uppercase tracking-[0.28em]`}
          style={{ color: INK, opacity: 0.7 }}
        >
          <span>KPT&nbsp;DESIGNS · OPERATOR MANUAL</span>
          <span>CH.&nbsp;2 · PG.&nbsp;002-007</span>
        </div>

        {/* section header */}
        <header className="border-b-[3px]" style={{ borderColor: IBM_BLUE }}>
          <div className={`${plexSans.className} text-[12px] font-medium uppercase tracking-[0.32em]`} style={{ color: SUB_RED }}>
            CHAPTER 2
          </div>
          <h2 className={`${plexSans.className} mt-1 pb-2 text-[30px] font-bold leading-tight tracking-[-0.005em] md:text-[40px]`} style={{ color: INK }}>
            2.0&nbsp;&nbsp;SYSTEM&nbsp;SPECIFICATIONS
          </h2>
        </header>

        {/* preamble */}
        <p className={`${plexSerif.className} mt-5 max-w-[68ch] text-[15px] leading-[1.55]`} style={{ color: INK }}>
          The following enumerates the standard build configuration shipped with every KPT Designs deployment. Each subsection
          documents a single component of the runtime stack, its operating parameters, and any caveats the operator should observe
          before authorizing release. Subsystems are clearly labeled; refer to <span style={{ color: IBM_BLUE }}>§2.6</span> for the
          KPT Agents voice integration.
        </p>

        {/* legend */}
        <div className={`${plexMono.className} mt-5 grid grid-cols-1 gap-2 border border-dashed border-[var(--ink)]/40 px-3 py-2 text-[11px] uppercase tracking-[0.18em] sm:grid-cols-3`}
          style={{ ["--ink" as string]: INK, color: INK }}>
          <span><span style={{ color: IBM_BLUE, fontWeight: 600 }}>■</span>&nbsp;&nbsp;blue · subsection header</span>
          <span><span style={{ color: SUB_RED, fontWeight: 600 }}>■</span>&nbsp;&nbsp;red · reference index</span>
          <span><span style={{ color: AMBER, fontWeight: 600 }}>■</span>&nbsp;&nbsp;amber · operator warning</span>
        </div>

        {/* subsections */}
        <div className="mt-10 space-y-10 md:space-y-12 [&>article+article]:border-t [&>article+article]:border-[color:#1A1A1A]/15 [&>article+article]:pt-10 md:[&>article+article]:pt-12">
          {TOOLS.map((t, i) => (
            <Subsection key={t.num} tool={t} last={i === TOOLS.length - 1} />
          ))}
        </div>

        {/* page footer */}
        <div
          className={`${plexMono.className} mt-14 flex items-center justify-between border-t border-[var(--ink)]/40 pt-3 text-[10.5px] uppercase tracking-[0.28em]`}
          style={{ ["--ink" as string]: INK, color: INK, opacity: 0.75 }}
        >
          <span>END&nbsp;OF&nbsp;CHAPTER&nbsp;2</span>
          <span>FORM KPT-OPS-002 · REV.&nbsp;A</span>
        </div>
      </div>
    </section>
  );
}
