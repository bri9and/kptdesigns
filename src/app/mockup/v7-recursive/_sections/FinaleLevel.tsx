"use client";

import Link from "next/link";
import { Inter, JetBrains_Mono } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const OFF_WHITE = "#FCFCFA";
const INK = "#0A0A0A";
const RED = "#FF1E1E";
const GOLD = "#FFC700";
const COOL_GREY = "#9A9A9A";

// Finale never zooms out — anchor unused but exported for engine consistency.
export const ANCHOR_POINT = { x: 0.5, y: 0.5 };

export default function FinaleLevel() {
  return (
    <section
      className={inter.className}
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        background: OFF_WHITE,
        color: INK,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "calc(var(--nav-height, 80px) + 24px) 24px 96px",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(255,30,30,0.04) 0%, rgba(255,30,30,0) 60%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 920,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div
          className={mono.className}
          style={{
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: COOL_GREY,
            marginBottom: 28,
          }}
        >
          <span style={{ color: RED }}>●</span>&nbsp;&nbsp;LEVEL 8 / 8 — ATOMIC
        </div>

        <div
          aria-hidden
          style={{
            width: 160,
            height: 1,
            background: RED,
            marginBottom: 40,
            transformOrigin: "center",
          }}
        />

        <h1
          style={{
            fontFamily: inter.style.fontFamily,
            fontWeight: 900,
            fontSize: "clamp(72px, 14vw, 196px)",
            lineHeight: 0.88,
            letterSpacing: "-0.045em",
            color: RED,
            margin: 0,
          }}
        >
          Start here.
        </h1>

        <p
          style={{
            marginTop: 28,
            fontSize: "clamp(18px, 2.2vw, 24px)",
            lineHeight: 1.4,
            color: INK,
            letterSpacing: "-0.01em",
            maxWidth: 640,
            fontWeight: 500,
          }}
        >
          We zoom out from atom to launch in 47 days.
        </p>

        <div
          style={{
            display: "flex",
            gap: 14,
            marginTop: 56,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Link
            href="/start"
            className="v7-btn-primary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "18px 32px",
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: "0.02em",
              color: OFF_WHITE,
              background: RED,
              border: `2px solid ${RED}`,
              borderRadius: 0,
              textDecoration: "none",
              transition: "box-shadow 220ms ease, transform 220ms ease, border-color 220ms ease",
            }}
          >
            Get Started
            <span aria-hidden style={{ fontWeight: 400 }}>→</span>
          </Link>

          <Link
            href="/pricing"
            className="v7-btn-ghost"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "18px 32px",
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: "0.02em",
              color: RED,
              background: "transparent",
              border: `2px solid ${RED}`,
              borderRadius: 0,
              textDecoration: "none",
              transition: "background 220ms ease, color 220ms ease",
            }}
          >
            View Pricing
          </Link>
        </div>

        <div
          className={mono.className}
          style={{
            marginTop: 72,
            fontSize: 11,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: COOL_GREY,
          }}
        >
          ZOOM 2.1M× &middot; ATOMIC LAYER &middot; EST. 2004
        </div>
      </div>

      <style jsx>{`
        .v7-btn-primary:hover {
          box-shadow: 0 0 0 3px ${GOLD}, 0 0 24px 0 ${GOLD}66;
          border-color: ${GOLD};
          transform: translateY(-1px);
        }
        .v7-btn-ghost:hover {
          background: ${RED};
          color: ${OFF_WHITE};
        }
      `}</style>
    </section>
  );
}
