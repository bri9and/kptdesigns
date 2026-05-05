import Link from "next/link";
import { EB_Garamond, JetBrains_Mono } from "next/font/google";

const garamond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  style: ["normal", "italic"],
});
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "700"] });

const PAPER = "#F4EFE3";
const INK = "#3D2817";
const FOREST = "#2D5A3F";
const OCEAN = "#3D6E94";
const RUST = "#A0432A";

export default function CtaAtlas() {
  return (
    <section
      className={`${garamond.className} relative overflow-hidden`}
      style={{ background: PAPER, color: INK, padding: "180px 24px 140px" }}
    >
      {/* Faint contour pattern */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ opacity: 0.18 }}
      >
        <defs>
          <pattern id="atlas-cta-contours" x="0" y="0" width="540" height="540" patternUnits="userSpaceOnUse">
            <path
              d="M0,260 C90,200 180,300 270,250 C360,200 450,310 540,260 M0,330 C100,290 200,380 300,330 C400,280 480,360 540,330 M0,180 C120,140 230,220 340,180 C440,150 500,210 540,180 M0,400 C110,360 220,440 330,400 C430,360 520,420 540,400"
              fill="none"
              stroke={INK}
              strokeWidth="0.6"
            />
          </pattern>
          <radialGradient id="atlas-cta-vignette" cx="50%" cy="50%" r="65%">
            <stop offset="60%" stopColor={PAPER} stopOpacity="0" />
            <stop offset="100%" stopColor={INK} stopOpacity="0.18" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#atlas-cta-contours)" />
        <rect width="100%" height="100%" fill="url(#atlas-cta-vignette)" />
      </svg>

      {/* Map case stamp container */}
      <div className="relative mx-auto" style={{ maxWidth: 1100 }}>
        {/* Top contour rule + departure label */}
        <div className="flex items-center justify-center gap-5">
          <span style={{ height: 1, flex: 1, background: INK, opacity: 0.45 }} />
          <span
            className={`${mono.className}`}
            style={{
              fontSize: 11,
              letterSpacing: "0.34em",
              textTransform: "uppercase",
              color: INK,
              whiteSpace: "nowrap",
            }}
          >
            § DEPARTURE · BEGIN THE TRAVERSE
          </span>
          <span style={{ height: 1, flex: 1, background: INK, opacity: 0.45 }} />
        </div>

        {/* Headline */}
        <h2
          className="text-center"
          style={{
            fontStyle: "italic",
            fontWeight: 800,
            fontSize: "clamp(100px, 18vw, 200px)",
            lineHeight: 0.92,
            letterSpacing: "-0.035em",
            color: INK,
            margin: "56px 0 28px",
          }}
        >
          Plot a route.
        </h2>

        {/* Subcopy */}
        <p
          className={`${mono.className} text-center mx-auto`}
          style={{
            fontSize: 13,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: FOREST,
            maxWidth: 720,
            lineHeight: 1.9,
          }}
        >
          We scout with you. We walk it together. We deliver the map.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap items-stretch justify-center gap-4" style={{ marginTop: 56 }}>
          <Link
            href="/start"
            className={`${mono.className} group inline-flex items-center justify-center transition-colors`}
            style={{
              background: INK,
              color: PAPER,
              padding: "20px 42px",
              fontSize: 12,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              borderRadius: 0,
              border: `1px solid ${INK}`,
            }}
          >
            <span style={{ marginRight: 14, color: RUST }}>▲</span>
            Get Started
            <span style={{ marginLeft: 14 }}>→</span>
          </Link>
          <Link
            href="/pricing"
            className={`${mono.className} inline-flex items-center justify-center transition-colors hover:text-[#F4EFE3]`}
            style={{
              background: "transparent",
              color: INK,
              padding: "20px 42px",
              fontSize: 12,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              borderRadius: 0,
              border: `1px solid ${OCEAN}`,
            }}
          >
            View Pricing
            <span style={{ marginLeft: 14, color: OCEAN }}>◇</span>
          </Link>
        </div>

        {/* Coordinates strip */}
        <p
          className={`${mono.className} text-center`}
          style={{
            marginTop: 44,
            fontSize: 10,
            letterSpacing: "0.42em",
            textTransform: "uppercase",
            color: INK,
            opacity: 0.55,
          }}
        >
          EST. 2004 · PITTSBURGH PA · 40°26′N 80°W
        </p>

        {/* Compass-rose ornament */}
        <div className="flex justify-center" style={{ marginTop: 56 }}>
          <svg width="86" height="86" viewBox="0 0 100 100" aria-hidden>
            <g fill="none" stroke={INK} strokeWidth="0.9" strokeLinecap="round">
              <circle cx="50" cy="50" r="34" opacity="0.35" />
              <circle cx="50" cy="50" r="22" opacity="0.5" />
              <circle cx="50" cy="50" r="2.4" fill={INK} stroke="none" />
              {/* Cardinal points (N filled) */}
              <polygon points="50,8 54,50 50,46 46,50" fill={RUST} stroke={RUST} />
              <polygon points="50,92 54,50 50,54 46,50" fill={INK} />
              <polygon points="8,50 50,46 46,50 50,54" fill={INK} />
              <polygon points="92,50 50,46 54,50 50,54" fill={INK} />
              {/* Inter-cardinal hairlines */}
              <line x1="22" y1="22" x2="78" y2="78" opacity="0.35" />
              <line x1="78" y1="22" x2="22" y2="78" opacity="0.35" />
              {/* Tick marks around outer ring */}
              {Array.from({ length: 24 }).map((_, i) => {
                const a = (i * Math.PI) / 12;
                const x1 = 50 + Math.cos(a) * 40;
                const y1 = 50 + Math.sin(a) * 40;
                const x2 = 50 + Math.cos(a) * (i % 3 === 0 ? 44 : 42);
                const y2 = 50 + Math.sin(a) * (i % 3 === 0 ? 44 : 42);
                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} opacity="0.5" />;
              })}
            </g>
            <text
              x="50"
              y="6.5"
              textAnchor="middle"
              fontSize="6"
              fill={INK}
              className={mono.className}
              style={{ letterSpacing: "0.2em" }}
            >
              N
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
}
