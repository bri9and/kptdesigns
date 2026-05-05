import { Playfair_Display, Source_Serif_4, Bodoni_Moda, IBM_Plex_Mono } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["900"], display: "swap" });
const sourceSerif = Source_Serif_4({ subsets: ["latin"], weight: ["400", "600"], style: ["normal", "italic"], display: "swap" });
const bodoni = Bodoni_Moda({ subsets: ["latin"], weight: ["500", "700", "900"], style: ["normal", "italic"], display: "swap" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], display: "swap" });

const CREAM = "#F5F0E1";
const INK = "#1A1A1A";
const RED = "#A4262C";
const HALFTONE = "#999";
const HAIRLINE = "rgba(26,26,26,0.18)";

// Newsprint pulp grain — multiplied dark speckle.
const grain =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='260' height='260'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.10 0 0 0 0 0.10 0 0 0 0 0.10 0 0 0 0.10 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

const halftoneDots = "radial-gradient(circle, #1A1A1A 1.1px, transparent 1.4px)";

const monoMicro = { fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase" as const, fontWeight: 500 };

export default function PhilosophyBroadsheet() {
  return (
    <section
      className={sourceSerif.className}
      style={{
        position: "relative",
        background: CREAM,
        color: INK,
        padding: "clamp(72px,10vw,128px) 0 clamp(64px,9vw,112px)",
        overflow: "hidden",
        borderTop: `1px solid ${HAIRLINE}`,
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: grain,
          backgroundSize: "260px 260px",
          opacity: 0.42,
          mixBlendMode: "multiply",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto", padding: "0 clamp(20px,5vw,56px)" }}>
        {/* Section header + headline-red rule */}
        <header style={{ marginBottom: "clamp(28px,3.6vw,44px)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
            <span className={plexMono.className} style={{ ...monoMicro, color: INK }}>
              Editorial · Page 02
            </span>
            <span style={{ flex: 1, height: 1, background: HAIRLINE }} />
            <span className={plexMono.className} style={{ ...monoMicro, color: HALFTONE }}>
              Vol. XXII · No. 04
            </span>
          </div>
          <div
            aria-hidden
            style={{ height: 3, width: "100%", background: RED, boxShadow: `0 4px 0 ${CREAM}, 0 5px 0 ${RED}` }}
          />
        </header>

        {/* Headline — Bodoni Moda heavy */}
        <h2
          className={bodoni.className}
          style={{
            margin: "clamp(20px,2.6vw,32px) 0 clamp(14px,1.6vw,20px)",
            fontWeight: 900,
            fontSize: "clamp(36px,6.4vw,72px)",
            lineHeight: 0.98,
            letterSpacing: "-0.018em",
            color: INK,
            maxWidth: "18ch",
          }}
        >
          On Hand-Coded Sites, Source Code, and the Lock-In Problem
        </h2>

        {/* Sub-deck — Bodoni italic medium */}
        <p
          className={bodoni.className}
          style={{
            margin: "0 0 clamp(14px,1.4vw,18px)",
            fontStyle: "italic",
            fontWeight: 500,
            fontSize: "clamp(18px,2vw,26px)",
            lineHeight: 1.28,
            color: "#3A3530",
            maxWidth: "44ch",
          }}
        >
          A defense of bespoke web in an era of automated builders.
        </p>

        {/* Byline */}
        <div
          className={plexMono.className}
          style={{
            ...monoMicro,
            color: RED,
            marginBottom: "clamp(28px,3.4vw,44px)",
            paddingBottom: 14,
            borderBottom: `1px solid ${HAIRLINE}`,
          }}
        >
          By the Editor · 2026-04-28 · Filed from the Studio
        </div>

        {/* Body — 2-column on md+, justified, drop cap on first paragraph */}
        <div
          className="bs-body"
          style={{
            columnGap: "clamp(28px,3.6vw,56px)",
            columnRule: `1px solid ${HAIRLINE}`,
            fontSize: "clamp(18px,1.32vw,20px)",
            lineHeight: 1.58,
            textAlign: "justify",
            hyphens: "auto",
            WebkitHyphens: "auto",
            color: INK,
          }}
        >
          <p style={{ margin: 0 }}>
            <span
              aria-hidden
              className={playfair.className}
              style={{
                float: "left",
                fontWeight: 900,
                color: RED,
                fontSize: "clamp(78px,9.6vw,124px)",
                lineHeight: 0.82,
                paddingRight: 12,
                paddingTop: 8,
                letterSpacing: "-0.04em",
              }}
            >
              T
            </span>
            emplates are economy. They are also debt. Every site built atop a template ships with the
            template&apos;s choices, the template&apos;s bugs, and the template&apos;s lock-in.
          </p>
          <p style={{ margin: "1.05em 0 0", textIndent: "1.6em" }}>
            We do not build atop. We build from raw markup, every layout decision considered, every byte
            intentional. The cursor blinks in an empty file, and the work begins there — not in a wizard,
            not in someone else&apos;s opinion of what your business should look like.
          </p>
          <p style={{ margin: "1.05em 0 0", textIndent: "1.6em" }}>
            When the site ships, the source code is delivered to you in full — repository, deployment,
            documentation. There is no key we keep. The lock is yours. Should we one day part ways, you
            walk out with everything you paid for, running on infrastructure you control.
          </p>
          <p style={{ margin: "1.05em 0 0", textIndent: "1.6em" }}>
            That is not a feature. It is the bare minimum of an honest trade.
          </p>
        </div>

        {/* Pull quote — Bodoni italic, headline red */}
        <figure
          style={{
            margin: "clamp(40px,5vw,64px) auto 0",
            maxWidth: 980,
            padding: "clamp(22px,2.6vw,34px) 0",
            borderTop: `2px solid ${INK}`,
            borderBottom: `2px solid ${INK}`,
            position: "relative",
            textAlign: "center",
          }}
        >
          <span
            aria-hidden
            className={bodoni.className}
            style={{
              position: "absolute",
              left: "clamp(12px,2vw,28px)",
              top: -8,
              fontStyle: "italic",
              color: RED,
              fontSize: "clamp(64px,9vw,112px)",
              lineHeight: 1,
              userSelect: "none",
              fontWeight: 700,
            }}
          >
            &ldquo;
          </span>
          <blockquote
            className={bodoni.className}
            style={{
              margin: 0,
              fontStyle: "italic",
              fontWeight: 700,
              color: RED,
              fontSize: "clamp(30px,4.4vw,60px)",
              lineHeight: 1.04,
              letterSpacing: "-0.012em",
            }}
          >
            Convenience is rented. Code is owned.
          </blockquote>
          <figcaption className={plexMono.className} style={{ marginTop: 14, ...monoMicro, fontSize: 10.5, color: INK }}>
            — KPT Designs · House Position
          </figcaption>
        </figure>

        {/* Halftone divider rule */}
        <div
          aria-hidden
          style={{ marginTop: "clamp(40px,5vw,64px)", display: "flex", alignItems: "center", gap: 14 }}
        >
          <span style={{ flex: 1, height: 1, background: INK }} />
          <span
            style={{
              height: 14,
              flex: "0 0 240px",
              maxWidth: "55%",
              backgroundImage: halftoneDots,
              backgroundSize: "6px 6px",
              backgroundPosition: "center",
              opacity: 0.7,
            }}
          />
          <span style={{ flex: 1, height: 1, background: INK }} />
        </div>
      </div>

      <style>{`
        .bs-body { column-count: 1; }
        .bs-body p { orphans: 3; widows: 3; }
        @media (min-width: 768px) {
          .bs-body { column-count: 2; }
        }
      `}</style>
    </section>
  );
}
