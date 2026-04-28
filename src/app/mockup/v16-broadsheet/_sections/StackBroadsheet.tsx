import { Playfair_Display, Source_Serif_4, Bodoni_Moda, IBM_Plex_Mono } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"] });
const sourceSerif = Source_Serif_4({ subsets: ["latin"], weight: ["400", "600"], style: ["normal", "italic"] });
const bodoni = Bodoni_Moda({ subsets: ["latin"], weight: ["500", "700", "900"], style: ["normal", "italic"] });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "700"] });

const NEWSPRINT = "#F5F0E1";
const INK = "#1A1A1A";
const HALFTONE = "#999";
const HEADLINE_RED = "#A4262C";
const FADED_YELLOW = "#F4E97D";

type Tool = { id: string; name: string; body: string; spec: string };

const TOOLS: Tool[] = [
  {
    id: "SYS-01",
    name: "Next.js 16",
    body: "Vercel's React framework, sixteenth incarnation. Servers and edge in one — a single mental model from request to render. Routing, streaming, and revalidation arrive as primitives, not afterthoughts. Every route is a deployment.",
    spec: "RUNTIME · NODE + EDGE",
  },
  {
    id: "SYS-02",
    name: "React 19",
    body: "The composable component library, the de facto standard for interactive UI. Server Components compile away. Actions replace boilerplate. The reconciler treats async as a first-class citizen — concurrency without ceremony.",
    spec: "VERSION · 19.0 STABLE",
  },
  {
    id: "SYS-03",
    name: "Tailwind 4",
    body: "Utility-first CSS, JIT-compiled, tree-shaken to a sub-10KB payload on the wire. Tokens live in CSS variables; design intent is legible inside the markup. No runtime, no cascade nightmares — just classes and constraints.",
    spec: "PAYLOAD · ≤ 10KB GZIP",
  },
  {
    id: "SYS-04",
    name: "TypeScript",
    body: "Static typing for JavaScript, strict throughout the project. Every API contract, every prop, every database row is checked at the door. The compiler is the first reviewer; production failures are crowded out before they ship.",
    spec: "MODE · STRICT · NO ANY",
  },
  {
    id: "SYS-05",
    name: "Vercel Edge",
    body: "One hundred and ninety-four global points of presence, with SSL provisioning and DDoS mitigation bundled at the platform layer. Builds promote atomically; rollbacks are instant; preview URLs ship with every commit.",
    spec: "POPS · 194 GLOBAL",
  },
  {
    id: "SYS-06",
    name: "KPT Agents",
    body: "Inbound AI phone agents through KPT's sister company. Twenty-four-hour lead qualification with natural-voice handling, calendar handoff, and CRM write-back. The website becomes a switchboard — every form, every call, captured.",
    spec: "UPTIME · 24 / 7 / 365",
  },
];

const mono: React.CSSProperties = { fontSize: 10.5, letterSpacing: "0.22em", textTransform: "uppercase" };

export default function StackBroadsheet() {
  return (
    <section
      className={sourceSerif.className}
      style={{
        background: NEWSPRINT,
        color: INK,
        padding: "clamp(48px, 8vw, 112px) clamp(20px, 5vw, 64px)",
        borderTop: `1px solid ${INK}`,
        borderBottom: `1px solid ${INK}`,
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div
          className={plexMono.className}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            ...mono,
            fontSize: 11,
            letterSpacing: "0.18em",
            paddingBottom: 8,
          }}
        >
          <span>BUSINESS &middot; TECHNOLOGY &middot; PAGE 03</span>
          <span style={{ color: HALFTONE }}>THE KPT BROADSHEET &mdash; FOLIO III</span>
        </div>
        <div style={{ height: 4, background: HEADLINE_RED, marginBottom: 6 }} />
        <div style={{ height: 1, background: INK, marginBottom: 28 }} />

        <h2
          className={bodoni.className}
          style={{
            fontWeight: 900,
            fontSize: "clamp(40px, 6.4vw, 84px)",
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
            margin: 0,
            maxWidth: "18ch",
          }}
        >
          Tools of the Trade:{" "}
          <span
            style={{
              backgroundImage: `linear-gradient(${FADED_YELLOW}, ${FADED_YELLOW})`,
              backgroundSize: "100% 38%",
              backgroundPosition: "0 78%",
              backgroundRepeat: "no-repeat",
              padding: "0 0.05em",
            }}
          >
            Six Systems
          </span>{" "}
          Powering KPT Builds
        </h2>

        <p
          className={playfair.className}
          style={{
            fontStyle: "italic",
            fontSize: "clamp(18px, 1.7vw, 22px)",
            lineHeight: 1.4,
            marginTop: 18,
            maxWidth: "60ch",
            borderBottom: `1px solid ${INK}`,
            paddingBottom: 18,
          }}
        >
          Foundational stack from framework to inbound AI agents &mdash; a survey of the six systems
          that quietly carry every site we ship.
        </p>

        <div
          className={plexMono.className}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 18,
            color: HALFTONE,
            paddingTop: 10,
            paddingBottom: 28,
            borderBottom: `1px solid ${HALFTONE}`,
            ...mono,
            letterSpacing: "0.16em",
          }}
        >
          <span>BY THE ENGINEERING DESK</span>
          <span>FILED FROM THE WORKSHOP</span>
          <span>EST. 2004</span>
          <span style={{ marginLeft: "auto", color: HEADLINE_RED }}>SIX SYSTEMS &middot; ONE BILL</span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            columnGap: 32,
            paddingTop: 28,
          }}
        >
          {TOOLS.map((t, i) => (
            <Entry key={t.id} tool={t} isLastRow={i >= TOOLS.length - 3} />
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 48 }}>
          <div style={{ flex: 1, height: 1, background: INK }} />
          <span className={plexMono.className} style={{ ...mono, color: HALFTONE }}>
            &mdash; CONTINUED ON PAGE 04 &mdash;
          </span>
          <div style={{ flex: 1, height: 1, background: INK }} />
        </div>
      </div>
    </section>
  );
}

function Entry({ tool, isLastRow }: { tool: Tool; isLastRow: boolean }) {
  return (
    <article
      style={{
        position: "relative",
        padding: "20px 16px 28px",
        borderTop: `1px solid ${INK}`,
        borderBottom: isLastRow ? `1px solid ${INK}` : "none",
      }}
    >
      <div
        aria-hidden
        className="hidden md:block"
        style={{
          position: "absolute",
          left: -16,
          top: 12,
          bottom: 12,
          width: 1,
          backgroundImage: `repeating-linear-gradient(0deg, ${HALFTONE} 0 2px, transparent 2px 5px)`,
          opacity: 0.6,
        }}
      />
      <div className={plexMono.className} style={{ ...mono, color: HEADLINE_RED, fontWeight: 700 }}>
        {tool.id}
      </div>
      <h3
        className={bodoni.className}
        style={{
          fontWeight: 500,
          fontSize: "clamp(22px, 2.1vw, 28px)",
          lineHeight: 1.05,
          letterSpacing: "-0.01em",
          margin: "6px 0 10px",
        }}
      >
        {tool.name}
      </h3>
      <p
        style={{
          fontSize: "clamp(14px, 1.05vw, 16px)",
          lineHeight: 1.5,
          margin: "0 0 14px",
          textAlign: "justify",
          hyphens: "auto",
        }}
      >
        {tool.body}
      </p>
      <div
        className={plexMono.className}
        style={{
          ...mono,
          color: HEADLINE_RED,
          fontWeight: 500,
          paddingTop: 10,
          borderTop: `1px dashed ${HALFTONE}`,
        }}
      >
        {tool.spec}
      </div>
    </article>
  );
}
