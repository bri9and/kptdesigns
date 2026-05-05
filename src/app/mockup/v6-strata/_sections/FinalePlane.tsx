"use client";

import Link from "next/link";
import { useState } from "react";
import { Fraunces, JetBrains_Mono } from "next/font/google";

const fraunces = Fraunces({ subsets: ["latin"], weight: ["400", "700"], style: ["normal", "italic"], display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], display: "swap" });

const PAPER = "#F4F1EB";
const MOLTEN = "#FF5E1A";
const MOLTEN_DEEP = "#D8430A";
const SAGE = "#7B8E6F";
const INK = "#1A1A22";
const VOID = "#0B0B0F";

const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.08 0 0 0 0 0.07 0 0 0 0 0.06 0 0 0 0.06 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

type BtnProps = { href: string; label: string; variant: "primary" | "secondary" };

function StrataButton({ href, label, variant }: BtnProps) {
  const [h, setH] = useState(false);
  const p = variant === "primary";
  const bg = p ? (h ? MOLTEN_DEEP : MOLTEN) : h ? MOLTEN : "transparent";
  const fg = p ? PAPER : h ? PAPER : MOLTEN;
  const bd = p ? (h ? MOLTEN_DEEP : MOLTEN) : MOLTEN;
  return (
    <Link
      href={href}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      className={mono.className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "22px 40px",
        background: bg,
        color: fg,
        textTransform: "uppercase",
        letterSpacing: "0.22em",
        fontSize: 11,
        fontWeight: 500,
        borderRadius: 0,
        border: `1px solid ${bd}`,
        textDecoration: "none",
        transition: "background 360ms ease, color 360ms ease, border-color 360ms ease",
        minWidth: 196,
      }}
    >
      {label}
    </Link>
  );
}

export default function FinalePlane() {
  return (
    <section
      aria-labelledby="strata-finale-title"
      className={fraunces.className}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: "100vh",
        background: PAPER,
        color: INK,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: "clamp(80px, 14vw, 180px) 32px",
      }}
    >
      <div
        aria-hidden
        style={{ position: "absolute", inset: 0, backgroundImage: GRAIN, opacity: 0.55, mixBlendMode: "multiply", pointerEvents: "none" }}
      />
      <div
        aria-hidden
        style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at center, transparent 35%, ${VOID} 130%)`, pointerEvents: "none" }}
      />

      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 1100,
          textAlign: "center",
        }}
      >
        {/* sage hairline ornament */}
        <div
          aria-hidden
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 14,
            marginBottom: "clamp(40px, 6vw, 72px)",
          }}
        >
          <span style={{ height: 1, width: "min(160px, 22vw)", background: SAGE, opacity: 0.7 }} />
          <span style={{ width: 5, height: 5, background: SAGE, transform: "rotate(45deg)", opacity: 0.85 }} />
          <span style={{ height: 1, width: "min(160px, 22vw)", background: SAGE, opacity: 0.7 }} />
        </div>

        <h2
          id="strata-finale-title"
          style={{
            margin: 0,
            fontStyle: "italic",
            fontWeight: 400,
            color: MOLTEN,
            fontSize: "clamp(100px, 18vw, 200px)",
            lineHeight: 0.84,
            letterSpacing: "-0.045em",
            fontVariationSettings: '"opsz" 144',
          }}
        >
          Begin.
        </h2>

        <p
          className={mono.className}
          style={{
            margin: "clamp(36px, 6vw, 60px) auto 0",
            maxWidth: 720,
            fontSize: 11,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: INK,
            opacity: 0.78,
            lineHeight: 1.9,
          }}
        >
          One Process &middot; One Bill &middot; One Team &middot; Owned Outright
        </p>

        <div
          style={{
            marginTop: "clamp(44px, 7vw, 72px)",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 16,
          }}
        >
          <StrataButton href="/start" label="Get Started" variant="primary" />
          <StrataButton href="/pricing" label="View Pricing" variant="secondary" />
        </div>

        <p
          className={mono.className}
          style={{
            margin: "clamp(72px, 10vw, 112px) 0 0 0",
            fontSize: 10,
            letterSpacing: "0.36em",
            textTransform: "uppercase",
            color: SAGE,
            opacity: 0.85,
          }}
        >
          Stratum 08 &middot; Terminus &middot; Est. 2004
        </p>
      </div>
    </section>
  );
}
