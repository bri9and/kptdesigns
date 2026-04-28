import type { CSSProperties } from "react";
import { Fraunces, JetBrains_Mono } from "next/font/google";

const fraunces = Fraunces({ subsets: ["latin"], axes: ["opsz"], display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], display: "swap" });

const PAPER = "#FAFAFA";
const INK = "#0A0A0A";
const RED = "#7A2D26";
const HAIRLINE = "rgba(10,10,10,0.10)";
const HAIRLINE_SOFT = "rgba(10,10,10,0.06)";
const GRAPHITE = "rgba(10,10,10,0.55)";

const monoBase: CSSProperties = {
  fontSize: 10,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: INK,
};

const WATERFALL: { px: number; weight: number; opsz: number; label: string; tracking: string }[] = [
  { px: 200, weight: 800, opsz: 144, label: "Display · 200", tracking: "-0.04em" },
  { px: 144, weight: 700, opsz: 144, label: "Banner · 144", tracking: "-0.035em" },
  { px: 96,  weight: 600, opsz: 96,  label: "Headline · 96", tracking: "-0.03em" },
  { px: 64,  weight: 500, opsz: 72,  label: "Title · 64", tracking: "-0.025em" },
  { px: 48,  weight: 500, opsz: 48,  label: "Deck · 48", tracking: "-0.02em" },
  { px: 32,  weight: 500, opsz: 36,  label: "Subhead · 32", tracking: "-0.012em" },
  { px: 24,  weight: 500, opsz: 24,  label: "Lede · 24", tracking: "-0.005em" },
  { px: 18,  weight: 500, opsz: 18,  label: "Body · 18", tracking: "0" },
  { px: 14,  weight: 500, opsz: 14,  label: "Caption · 14", tracking: "0.005em" },
  { px: 11,  weight: 500, opsz: 11,  label: "Footnote · 11", tracking: "0.02em" },
  { px: 8,   weight: 500, opsz: 9,   label: "Micro · 8", tracking: "0.06em" },
];

// Each service uses the same "AAAAA" but with different axis settings to *demonstrate* the spec.
const SERVICES: { name: string; weight: number; tracking: string; italic?: boolean }[] = [
  { name: "registrar", weight: 300, tracking: "0.42em" },                 // light + airy
  { name: "host",      weight: 500, tracking: "0.22em" },                 // medium
  { name: "designer",  weight: 700, tracking: "-0.01em", italic: true },  // bold italic
  { name: "agents",    weight: 900, tracking: "0.08em" },                 // black
];

export default function HeroSpecimen() {
  return (
    <section
      className={fraunces.className}
      style={{
        position: "relative",
        background: PAPER,
        color: INK,
        padding: "clamp(28px,3.4vh,52px) clamp(20px,4vw,72px) clamp(56px,8vh,112px)",
        overflow: "hidden",
        isolation: "isolate",
        fontFeatureSettings: '"kern" 1, "liga" 1, "calt" 1, "ss01" 1',
        textRendering: "geometricPrecision",
      }}
    >
      {/* Top edge: thin malted-red rule + masthead */}
      <div
        className={mono.className}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          paddingTop: 12,
          borderTop: `1px solid ${RED}`,
          color: INK,
          ...monoBase,
        }}
      >
        <span style={{ color: RED, fontWeight: 500 }}>KPT</span>
        <span style={{ color: HAIRLINE }}>·</span>
        <span>Specimen</span>
        <span style={{ color: HAIRLINE }}>·</span>
        <span style={{ color: GRAPHITE }}>WGT 100&ndash;900</span>
        <span style={{ color: HAIRLINE }}>·</span>
        <span style={{ color: GRAPHITE }}>OPSZ 9&ndash;144</span>
        <span aria-hidden style={{ flex: 1, height: 1, background: HAIRLINE_SOFT, marginInline: 4 }} />
        <span style={{ color: GRAPHITE }}>Folio</span>
        <span style={{ color: RED, fontWeight: 500 }}>No. 001</span>
      </div>

      {/* Centerpiece: the giant Aa pair */}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "clamp(40px,7vh,96px)",
          paddingBottom: "clamp(20px,3vh,40px)",
        }}
      >
        <span
          className={mono.className}
          style={{
            ...monoBase,
            color: GRAPHITE,
            marginBottom: "clamp(14px,2vh,26px)",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span aria-hidden style={{ width: 28, height: 1, background: HAIRLINE }} />
          <span>The&nbsp;Specimen</span>
          <span style={{ color: RED }}>—</span>
          <span>Glyph&nbsp;Pair</span>
          <span aria-hidden style={{ width: 28, height: 1, background: HAIRLINE }} />
        </span>

        <h1
          aria-label="Aa"
          style={{
            margin: 0,
            color: INK,
            fontSize: "clamp(360px, 52vw, 720px)",
            fontWeight: 700,
            lineHeight: 0.78,
            letterSpacing: "-0.06em",
            fontVariationSettings: '"opsz" 144',
            display: "flex",
            alignItems: "baseline",
            gap: "0.02em",
            position: "relative",
          }}
        >
          {/* tiny baseline tick markers in red */}
          <span aria-hidden style={{ position: "absolute", left: "-0.04em", right: "-0.04em", bottom: "0.18em", height: 1, background: RED, opacity: 0.55 }} />
          <span aria-hidden>A</span>
          <span aria-hidden style={{ fontStyle: "italic", fontVariationSettings: '"opsz" 144', marginLeft: "-0.02em" }}>a</span>
        </h1>

        {/* tiny mono caption under the pair */}
        <span
          className={mono.className}
          style={{
            ...monoBase,
            color: GRAPHITE,
            marginTop: "clamp(14px,2vh,26px)",
            letterSpacing: "0.32em",
          }}
        >
          Fraunces&nbsp;&nbsp;·&nbsp;&nbsp;2020&nbsp;&nbsp;·&nbsp;&nbsp;Weaver&nbsp;+&nbsp;Pauth
        </span>
      </div>

      {/* Section rule + waterfall heading */}
      <div
        className={mono.className}
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr auto auto",
          alignItems: "center",
          gap: 14,
          marginTop: "clamp(56px,9vh,120px)",
          paddingTop: 12,
          borderTop: `1px solid ${HAIRLINE}`,
          ...monoBase,
        }}
      >
        <span><span style={{ color: RED }}>§</span>&nbsp;&nbsp;Plate&nbsp;II</span>
        <span aria-hidden style={{ height: 1, background: HAIRLINE_SOFT }} />
        <span style={{ color: GRAPHITE }}>Waterfall&nbsp;—&nbsp;same&nbsp;wordmark,&nbsp;decreasing&nbsp;sizes</span>
        <span style={{ color: RED }}>200 → 8&nbsp;PX</span>
      </div>

      {/* The waterfall */}
      <ol
        style={{
          listStyle: "none",
          margin: "clamp(20px,3vh,36px) 0 0",
          padding: 0,
          display: "flex",
          flexDirection: "column",
          gap: "clamp(2px,0.4vh,6px)",
        }}
      >
        {WATERFALL.map((row) => (
          <li
            key={row.px}
            className="wf-row"
            style={{
              display: "grid",
              gridTemplateColumns: "56px minmax(0,1fr) auto",
              alignItems: "baseline",
              gap: 18,
              padding: "clamp(2px,0.5vh,8px) 0",
              borderBottom: `1px solid ${HAIRLINE_SOFT}`,
            }}
          >
            <span
              className={mono.className}
              style={{
                ...monoBase,
                color: RED,
                fontSize: 10,
                letterSpacing: "0.18em",
                whiteSpace: "nowrap",
              }}
            >
              {String(row.px).padStart(3, "0")}
            </span>

            <span
              aria-label="KPT Designs"
              style={{
                fontSize: `clamp(${Math.max(row.px * 0.5, 8)}px, ${row.px / 14}vw, ${row.px}px)`,
                fontWeight: row.weight,
                lineHeight: 1,
                letterSpacing: row.tracking,
                color: INK,
                fontVariationSettings: `"opsz" ${row.opsz}`,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "clip",
                minWidth: 0,
              }}
            >
              KPT Designs<span style={{ color: RED }}>.</span>
            </span>

            <span
              className={mono.className}
              style={{
                ...monoBase,
                color: GRAPHITE,
                whiteSpace: "nowrap",
                fontSize: 10,
                letterSpacing: "0.2em",
              }}
            >
              {row.label}
            </span>
          </li>
        ))}
      </ol>

      {/* Services as typographic specimen */}
      <div style={{ marginTop: "clamp(56px,9vh,120px)" }}>
        <div
          className={mono.className}
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr auto",
            alignItems: "center",
            gap: 14,
            paddingTop: 12,
            borderTop: `1px solid ${HAIRLINE}`,
            ...monoBase,
          }}
        >
          <span><span style={{ color: RED }}>§</span>&nbsp;&nbsp;Plate&nbsp;III</span>
          <span aria-hidden style={{ height: 1, background: HAIRLINE_SOFT }} />
          <span style={{ color: GRAPHITE }}>Services&nbsp;—&nbsp;each&nbsp;A&nbsp;demonstrates&nbsp;its&nbsp;axis</span>
        </div>

        <p
          className="services-line"
          style={{
            margin: "clamp(20px,3vh,36px) 0 0",
            padding: 0,
            fontSize: "clamp(13px,1.05vw,16px)",
            color: INK,
            display: "flex",
            flexWrap: "wrap",
            gap: "clamp(10px,1.6vw,28px)",
            alignItems: "baseline",
            fontVariationSettings: '"opsz" 14',
          }}
        >
          {SERVICES.map((s, i) => (
            <span key={s.name} style={{ display: "inline-flex", alignItems: "baseline", gap: 8 }}>
              <span
                aria-hidden
                style={{
                  fontWeight: s.weight,
                  fontStyle: s.italic ? "italic" : "normal",
                  letterSpacing: s.tracking,
                  fontVariationSettings: '"opsz" 96',
                  color: INK,
                  fontSize: "clamp(15px,1.3vw,20px)",
                }}
              >
                AAAAA
              </span>
              <span
                className={mono.className}
                style={{
                  ...monoBase,
                  color: GRAPHITE,
                  fontSize: 10,
                  letterSpacing: "0.22em",
                }}
              >
                {s.name}
              </span>
              {i < SERVICES.length - 1 && (
                <span style={{ color: RED, marginLeft: "clamp(2px,0.6vw,10px)" }}>·</span>
              )}
            </span>
          ))}
        </p>
      </div>

      {/* Footer rule — page number */}
      <div
        className={mono.className}
        style={{
          marginTop: "clamp(64px,11vh,140px)",
          paddingTop: 12,
          borderTop: `1px solid ${HAIRLINE_SOFT}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          ...monoBase,
        }}
      >
        <span style={{ color: GRAPHITE }}>
          <span style={{ color: RED }}>§</span>&nbsp;&nbsp;Folio&nbsp;I&nbsp;—&nbsp;Hero&nbsp;Spread&nbsp;·&nbsp;Set&nbsp;in&nbsp;Fraunces&nbsp;&amp;&nbsp;JetBrains&nbsp;Mono
        </span>
        <span style={{ color: INK, letterSpacing: "0.28em" }}>
          001&nbsp;<span style={{ color: RED }}>/</span>&nbsp;KPT
        </span>
      </div>

      <style>{`
        @media (max-width: 760px) {
          .wf-row { grid-template-columns: 40px minmax(0,1fr) !important; }
          .wf-row > :last-child { display: none !important; }
          .services-line { gap: 10px !important; }
        }
      `}</style>
    </section>
  );
}
