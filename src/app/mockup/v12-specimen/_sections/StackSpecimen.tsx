import { Fraunces, JetBrains_Mono } from "next/font/google";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const jbMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const INK = "#0A0A0A";
const PAPER = "#FAFAFA";
const MALTED = "#7A2D26";

type Specimen = { name: string; version: string; italic: string; spec: string };

const SPECIMENS: Specimen[] = [
  { name: "Next.js", version: "16", italic: "the framework",
    spec: "WGT BOLD · OPSZ 144 · NEXT.JS_16 · APP ROUTER · RSC" },
  { name: "React", version: "19", italic: "the engine of components",
    spec: "WGT BOLD · OPSZ 144 · REACT_19 · CONCURRENT · SERVER COMP" },
  { name: "Tailwind", version: "v4", italic: "the utilitarian style",
    spec: "WGT BOLD · OPSZ 144 · TAILWIND_V4 · OXIDE · CSS-FIRST" },
  { name: "Typescript", version: "5.6", italic: "the language of types",
    spec: "WGT BOLD · OPSZ 144 · TS_5.6 · STRICT · INFERRED" },
  { name: "Vercel Edge", version: "∞", italic: "the global press",
    spec: "WGT BOLD · OPSZ 144 · VERCEL_EDGE · 119 POPS · SUB-50MS" },
  { name: "KPT Agents", version: "01", italic: "your inbound voice",
    spec: "WGT BOLD · OPSZ 144 · KPT-AGENTS_01 · INBOUND · 24/7 LIVE" },
];

export default function StackSpecimen() {
  return (
    <section
      className={fraunces.className}
      style={{
        background: PAPER, color: INK,
        padding: "clamp(96px, 14vw, 200px) clamp(24px, 6vw, 96px)",
        position: "relative", overflow: "hidden",
      }}
    >
      <header style={{
        display: "flex", alignItems: "center",
        gap: "clamp(16px, 3vw, 36px)",
        marginBottom: "clamp(64px, 9vw, 128px)",
      }}>
        <span aria-hidden style={{
          height: 1, width: "clamp(40px, 8vw, 120px)",
          background: MALTED, flexShrink: 0,
        }}/>
        <span className={jbMono.className} style={{
          color: MALTED, fontSize: "clamp(11px, 0.95vw, 13px)",
          letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 500,
        }}>§ 03 — Character Set</span>
        <span aria-hidden style={{ flex: 1, height: 1, background: "rgba(10,10,10,0.12)" }}/>
        <span className={jbMono.className} style={{
          color: "rgba(10,10,10,0.45)", fontSize: "clamp(10px, 0.8vw, 11px)",
          letterSpacing: "0.18em", textTransform: "uppercase",
        }}>KPT Type Foundry · Sheet 03 / 06</span>
      </header>

      <p style={{
        fontStyle: "italic", fontWeight: 300,
        fontSize: "clamp(22px, 2.6vw, 38px)",
        lineHeight: 1.18, letterSpacing: "-0.01em",
        color: INK, maxWidth: "28ch",
        marginBottom: "clamp(72px, 10vw, 160px)", marginTop: 0,
      }}>
        Six characters, cut by hand, set at full body. Each tool a glyph in
        our working alphabet — proofed, kerned, ready for the press.
      </p>

      <ol style={{
        listStyle: "none", margin: 0, padding: 0,
        display: "grid", gridTemplateColumns: "minmax(0,1fr)",
        rowGap: "clamp(56px, 7vw, 112px)",
      }}>
        {SPECIMENS.map((s, i) => (
          <SpecimenRow key={s.name} specimen={s} index={i} mono={jbMono.className} />
        ))}
      </ol>

      <footer style={{
        marginTop: "clamp(80px, 11vw, 160px)",
        display: "flex", alignItems: "baseline", justifyContent: "space-between",
        gap: 24, borderTop: `1px solid ${MALTED}`, paddingTop: 18,
      }}>
        <span className={jbMono.className} style={{
          color: MALTED, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase",
        }}>End of sheet · 06 of 06</span>
        <span className={jbMono.className} style={{
          color: "rgba(10,10,10,0.45)", fontSize: 10,
          letterSpacing: "0.18em", textTransform: "uppercase",
        }}>Specimen — Fraunces / JBM · KPT 2004→</span>
      </footer>

      <style>{`
        @media (min-width: 768px) {
          .specimen-row .specimen-meta {
            grid-template-columns: 1.4fr 1fr;
            align-items: end;
          }
          .specimen-row .specimen-meta[data-offset="1"] > p:first-child { order: 2; }
          .specimen-row .specimen-meta[data-offset="1"] > p:last-child { order: 1; }
        }
      `}</style>
    </section>
  );
}

function SpecimenRow({
  specimen, index, mono,
}: { specimen: Specimen; index: number; mono: string }) {
  const { name, version, italic, spec } = specimen;
  const num = String(index + 1).padStart(2, "0");
  const isOffset = index % 2 === 1;
  const align = isOffset ? "right" : "left";

  return (
    <li className="specimen-row" style={{
      display: "grid", gridTemplateColumns: "minmax(0,1fr)", rowGap: 24,
      borderTop: index === 0 ? "none" : "1px solid rgba(10,10,10,0.10)",
      paddingTop: index === 0 ? 0 : "clamp(40px, 5vw, 80px)",
    }}>
      <div style={{
        display: "grid", gridTemplateColumns: "minmax(0,1fr)",
        rowGap: "clamp(20px, 2.4vw, 36px)",
      }}>
        <div style={{
          display: "flex", alignItems: "baseline", gap: 18, flexWrap: "wrap",
          justifyContent: isOffset ? "flex-end" : "flex-start",
        }}>
          <span className={mono} style={{
            color: MALTED, fontSize: 11, letterSpacing: "0.22em",
            textTransform: "uppercase", fontWeight: 600,
          }}>№{num}</span>
          <span aria-hidden style={{
            flex: 1, minWidth: 24, height: 1,
            background: "rgba(10,10,10,0.18)", alignSelf: "center",
            order: isOffset ? -1 : 0,
          }}/>
          <span className={mono} style={{
            color: "rgba(10,10,10,0.55)", fontSize: 10,
            letterSpacing: "0.2em", textTransform: "uppercase",
          }}>Glyph proof · 144pt</span>
        </div>

        <h3 style={{
          margin: 0, textAlign: align,
          fontWeight: 900, fontStyle: "normal",
          fontSize: "clamp(56px, 13.5vw, 192px)",
          lineHeight: 0.86, letterSpacing: "-0.035em",
          color: INK, fontVariationSettings: '"opsz" 144',
        }}>
          <span style={{ display: "inline-flex", alignItems: "flex-start" }}>
            <span>{name}</span>
            <sup className={mono} style={{
              fontSize: "clamp(11px, 1vw, 14px)", fontWeight: 500,
              letterSpacing: "0.15em", color: MALTED,
              marginLeft: "clamp(8px, 1vw, 16px)", marginTop: "0.4em",
              textTransform: "uppercase", verticalAlign: "top", lineHeight: 1,
            }}>{version}</sup>
          </span>
        </h3>

        <div className="specimen-meta" data-offset={isOffset ? "1" : "0"} style={{
          display: "grid", gridTemplateColumns: "minmax(0,1fr)",
          rowGap: 16, columnGap: "clamp(24px, 4vw, 64px)",
        }}>
          <p style={{
            margin: 0, fontStyle: "italic", fontWeight: 400,
            fontSize: "clamp(20px, 2.1vw, 30px)", lineHeight: 1.2,
            letterSpacing: "-0.01em", color: INK, textAlign: align,
          }}>
            <span style={{ color: MALTED, marginRight: "0.35em" }}>“</span>
            {italic}
            <span style={{ color: MALTED, marginLeft: "0.15em" }}>”</span>
          </p>
          <p className={mono} style={{
            margin: 0, color: MALTED, fontSize: "clamp(10px, 0.85vw, 12px)",
            letterSpacing: "0.22em", textTransform: "uppercase",
            fontWeight: 500, lineHeight: 1.6, textAlign: align,
            borderTop: "1px solid rgba(122,45,38,0.35)", paddingTop: 10,
          }}>{spec}</p>
        </div>
      </div>
    </li>
  );
}
