import Link from "next/link";
import { Crimson_Pro, UnifrakturCook, Cormorant_Garamond } from "next/font/google";

const fraktur = UnifrakturCook({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

const crimson = Crimson_Pro({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["italic"],
  display: "swap",
});

const VELLUM = "#F2E8D5";
const INK = "#1B1410";
const VERMILLION = "#C72A1F";
const ULTRAMARINE = "#2845A8";
const GOLD = "#D4A04A";
const MULBERRY = "#5C2D5E";

export default function CtaCodex() {
  return (
    <section
      style={{
        background: VELLUM,
        color: INK,
        position: "relative",
        overflow: "hidden",
        padding: "9rem 1.5rem 7rem",
      }}
    >
      {/* Vellum grain + soft mottle */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at 18% 22%, rgba(180,140,80,0.10), transparent 55%), radial-gradient(ellipse at 82% 78%, rgba(120,70,40,0.10), transparent 55%), radial-gradient(circle at 50% 40%, rgba(255,245,220,0.35), transparent 65%)",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.18,
          mixBlendMode: "multiply",
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' seed='7'/><feColorMatrix values='0 0 0 0 0.18 0 0 0 0 0.13 0 0 0 0 0.08 0 0 0 0.55 0'/></filter><rect width='240' height='240' filter='url(%23n)'/></svg>\")",
        }}
      />

      <div
        style={{
          position: "relative",
          maxWidth: "44rem",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        {/* Top vermillion + gold ornament rule */}
        <div
          aria-hidden
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.25rem",
            marginBottom: "1.25rem",
          }}
        >
          <svg width="120" height="14" viewBox="0 0 120 14" fill="none">
            <line x1="0" y1="7" x2="92" y2="7" stroke={VERMILLION} strokeWidth="1.25" />
            <circle cx="100" cy="7" r="3" fill={GOLD} stroke={VERMILLION} strokeWidth="1" />
            <circle cx="112" cy="7" r="2" fill={VERMILLION} />
          </svg>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path
              d="M11 1l2.5 6.5L20 11l-6.5 2.5L11 21l-2.5-7.5L2 11l6.5-3.5L11 1z"
              fill={GOLD}
              stroke={VERMILLION}
              strokeWidth="0.7"
            />
          </svg>
          <svg width="120" height="14" viewBox="0 0 120 14" fill="none">
            <circle cx="8" cy="7" r="2" fill={VERMILLION} />
            <circle cx="20" cy="7" r="3" fill={GOLD} stroke={VERMILLION} strokeWidth="1" />
            <line x1="28" y1="7" x2="120" y2="7" stroke={VERMILLION} strokeWidth="1.25" />
          </svg>
        </div>

        <p
          className={crimson.className}
          style={{
            color: VERMILLION,
            fontSize: "0.7rem",
            letterSpacing: "0.42em",
            textTransform: "uppercase",
            marginBottom: "2rem",
            fontWeight: 600,
          }}
        >
          Explicit &middot; Chapter VI
        </p>

        <h2
          className={fraktur.className}
          style={{
            color: INK,
            fontSize: "clamp(3rem, 7vw, 5.5rem)",
            lineHeight: 1.05,
            margin: "0 0 1.75rem",
            letterSpacing: "0.005em",
          }}
        >
          Begin thy book.
        </h2>

        <p
          className={crimson.className}
          style={{
            fontStyle: "italic",
            fontSize: "clamp(1.1rem, 1.5vw, 1.3rem)",
            lineHeight: 1.6,
            color: INK,
            opacity: 0.82,
            margin: "0 auto 2.75rem",
            maxWidth: "32rem",
          }}
        >
          We are reachable by post and inbox. We answer within a day.
        </p>

        {/* Wax-seal buttons */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1.25rem",
            justifyContent: "center",
            marginBottom: "3rem",
          }}
        >
          <Link
            href="/start"
            className={crimson.className}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              background: `radial-gradient(circle at 30% 25%, #E04A3F, ${VERMILLION} 60%, #8E1A12)`,
              color: VELLUM,
              border: `2px solid ${GOLD}`,
              boxShadow: `inset 0 0 0 1px rgba(255,230,180,0.35), 0 6px 14px -6px rgba(120,30,20,0.55), 0 1px 0 rgba(255,255,255,0.18) inset`,
              padding: "0.95rem 2.1rem",
              borderRadius: "999px",
              textDecoration: "none",
              fontSize: "1rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 600,
              fontVariant: "small-caps",
            }}
          >
            <span aria-hidden>&#10070;</span>
            Get Started
          </Link>
          <Link
            href="/pricing"
            className={crimson.className}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              background: "transparent",
              color: VERMILLION,
              border: `2px solid ${ULTRAMARINE}`,
              boxShadow: `inset 0 0 0 1px rgba(40,69,168,0.18), 0 4px 12px -8px rgba(40,69,168,0.45)`,
              padding: "0.95rem 2.1rem",
              borderRadius: "999px",
              textDecoration: "none",
              fontSize: "1rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 600,
              fontVariant: "small-caps",
            }}
          >
            View Pricing
            <span aria-hidden style={{ color: ULTRAMARINE }}>&#10070;</span>
          </Link>
        </div>

        <p
          className={cormorant.className}
          style={{
            fontStyle: "italic",
            fontSize: "1.05rem",
            color: MULBERRY,
            opacity: 0.85,
            margin: "0 0 3.5rem",
            letterSpacing: "0.04em",
          }}
        >
          Made at Pittsburgh &middot; MMIV — MMXXVI &middot; Deo Gratias
        </p>

        {/* Bottom ornate flourish */}
        <svg
          aria-hidden
          width="280"
          height="56"
          viewBox="0 0 280 56"
          fill="none"
          style={{ display: "block", margin: "0 auto" }}
        >
          <path
            d="M2 28 C 40 28, 60 8, 100 28 C 120 38, 130 18, 140 28 C 150 38, 160 18, 180 28 C 220 48, 240 28, 278 28"
            stroke={VERMILLION}
            strokeWidth="1.25"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M70 28 C 80 22, 88 22, 98 28"
            stroke={GOLD}
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M182 28 C 192 34, 200 34, 210 28"
            stroke={GOLD}
            strokeWidth="1"
            fill="none"
          />
          <circle cx="140" cy="28" r="4.5" fill={GOLD} stroke={VERMILLION} strokeWidth="0.8" />
          <circle cx="140" cy="28" r="1.5" fill={VERMILLION} />
          <path
            d="M140 12 L 142 22 L 140 24 L 138 22 Z"
            fill={ULTRAMARINE}
          />
          <path
            d="M140 44 L 142 34 L 140 32 L 138 34 Z"
            fill={ULTRAMARINE}
          />
          <circle cx="20" cy="28" r="2" fill={GOLD} />
          <circle cx="260" cy="28" r="2" fill={GOLD} />
        </svg>
      </div>
    </section>
  );
}
