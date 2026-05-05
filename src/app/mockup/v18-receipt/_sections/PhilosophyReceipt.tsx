"use client";

import { VT323 } from "next/font/google";

const vt323 = VT323({ subsets: ["latin"], weight: ["400"] });

const PAPER = "#FBFBFB";
const INK = "#1A1A1A";
const CARBON_RED = "#B53D3D";

// Faint vertical thermal-fade gradient + subtle paper grain so this strip
// reads as a *continuation* of the same receipt scroll the hero printed.
const thermalPaper = `
  repeating-linear-gradient(
    0deg,
    rgba(0,0,0,0.012) 0px,
    rgba(0,0,0,0.012) 1px,
    transparent 1px,
    transparent 3px
  ),
  radial-gradient(ellipse at 50% 0%, rgba(0,0,0,0.05), transparent 60%),
  radial-gradient(ellipse at 50% 100%, rgba(0,0,0,0.06), transparent 65%),
  linear-gradient(180deg,
    #F4F1EA 0%,
    ${PAPER} 18%,
    ${PAPER} 82%,
    #F1ECE2 100%
  )
`;

// Tiny "barcode" fragment built from variable-width vertical bars.
function Barcode({ seed = 0 }: { seed?: number }) {
  // Deterministic pseudo-random pattern; no Math.random so SSR is stable.
  const bars: number[] = [];
  let x = seed * 7 + 3;
  for (let i = 0; i < 42; i++) {
    x = (x * 9301 + 49297) % 233280;
    bars.push(1 + (x % 4));
  }
  let cursor = 0;
  return (
    <svg
      viewBox="0 0 220 38"
      width="220"
      height="38"
      role="img"
      aria-label="barcode"
      style={{ display: "block", margin: "0 auto", opacity: 0.86 }}
    >
      {bars.map((w, i) => {
        const rect = (
          <rect
            key={i}
            x={cursor}
            y={i % 11 === 0 ? 0 : 4}
            width={w}
            height={i % 11 === 0 ? 38 : 30}
            fill={INK}
          />
        );
        cursor += w + 1;
        return rect;
      })}
    </svg>
  );
}

// Each receipt body line carries a tiny rotational/translational jitter
// to fake roller-feed misalignment. Values are deterministic per index.
function jitterFor(i: number): React.CSSProperties {
  const offsets = [0, -0.6, 0.4, -0.3, 0.8, -0.5, 0.2, -0.7, 0.5];
  const skews = [0, 0.15, -0.1, 0, 0.2, -0.18, 0, 0.1, -0.12];
  return {
    transform: `translateX(${offsets[i % offsets.length]}px) skewX(${
      skews[i % skews.length]
    }deg)`,
  };
}

export default function PhilosophyReceipt() {
  const lines: { text: string; tone?: "ink" | "carbon" }[] = [
    { text: "HAND-CODED. NO TEMPLATES." },
    { text: "NO PAGE BUILDERS." },
    { text: "" },
    { text: "YOUR SOURCE IS YOURS." },
    { text: "WE KEEP NO COPY." },
  ];

  const closing: { text: string; tone?: "ink" | "carbon" }[] = [
    { text: "THANK YOU FOR YOUR", tone: "carbon" },
    { text: "BUSINESS.", tone: "carbon" },
  ];

  return (
    <section
      aria-label="Philosophy"
      className={vt323.className}
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        background: PAPER,
        color: INK,
        // No top/bottom padding — the strip is vertically continuous with hero.
        padding: 0,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "520px",
          position: "relative",
          background: thermalPaper,
          backgroundColor: PAPER,
          padding: "44px 38px 56px",
          // Soft side shadows so the paper appears to drape off-edge.
          boxShadow:
            "inset 14px 0 22px -14px rgba(0,0,0,0.18), inset -14px 0 22px -14px rgba(0,0,0,0.18)",
          fontFeatureSettings: '"liga" 0',
        }}
      >
        {/* Section header */}
        <h2
          style={{
            margin: 0,
            fontSize: "26px",
            lineHeight: 1.1,
            letterSpacing: "0.04em",
            textAlign: "center",
            color: INK,
            transform: "translateX(-0.4px) skewX(0.12deg)",
          }}
        >
          *** PHILOSOPHY ***
        </h2>

        {/* Dotted receipt rule */}
        <div
          aria-hidden
          style={{
            marginTop: "18px",
            borderTop: `1px dashed ${INK}`,
            opacity: 0.55,
          }}
        />

        {/* Body lines */}
        <div
          style={{
            marginTop: "26px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: "24px",
            lineHeight: 1.35,
            letterSpacing: "0.02em",
            textAlign: "center",
            color: INK,
          }}
        >
          {lines.map((l, i) =>
            l.text === "" ? (
              <div key={i} style={{ height: "14px" }} aria-hidden />
            ) : (
              <p
                key={i}
                style={{
                  margin: 0,
                  ...jitterFor(i),
                }}
              >
                {l.text}
              </p>
            )
          )}
        </div>

        {/* Barcode separator between paragraphs */}
        <div style={{ marginTop: "30px", marginBottom: "30px" }}>
          <Barcode seed={3} />
          <p
            style={{
              margin: "8px 0 0",
              textAlign: "center",
              fontSize: "14px",
              letterSpacing: "0.18em",
              color: INK,
              opacity: 0.7,
            }}
          >
            0042 7711 KPT 2004
          </p>
        </div>

        {/* "Thank you" closing — faded carbon-copy red */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: "26px",
            lineHeight: 1.25,
            letterSpacing: "0.03em",
            textAlign: "center",
            color: CARBON_RED,
            // Carbon-paper offset ghost behind the red ink.
            textShadow: `0.6px 0.4px 0 rgba(181,61,61,0.25), -0.4px 0 0 rgba(61,90,138,0.16)`,
            opacity: 0.92,
          }}
        >
          {closing.map((l, i) => (
            <p
              key={i}
              style={{
                margin: 0,
                ...jitterFor(i + 5),
                // Slight ink-bleed using filter to feel less crisp than the body ink.
                filter: "blur(0.25px)",
              }}
            >
              {l.text}
            </p>
          ))}
        </div>

        {/* Trailing dotted rule + tiny barcode tail */}
        <div
          aria-hidden
          style={{
            marginTop: "30px",
            borderTop: `1px dashed ${INK}`,
            opacity: 0.4,
          }}
        />
        <div style={{ marginTop: "18px" }}>
          <Barcode seed={11} />
        </div>
      </div>
    </section>
  );
}
