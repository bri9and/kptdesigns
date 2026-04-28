"use client";

import Link from "next/link";
import { Fraunces, JetBrains_Mono } from "next/font/google";
import { motion } from "framer-motion";
import { useState } from "react";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], display: "swap" });

const PAPER = "#F5F1EA";
const TERRACOTTA = "#C56738";
const OXBLOOD = "#6B1F1F";
const GRAPHITE = "#5C5852";
const HAIRLINE = "rgba(15,15,15,0.08)";

// Subtle film grain (SVG noise, no extra deps).
const grainBg =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.06 0 0 0 0 0.06 0 0 0 0 0.06 0 0 0 0.05 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

type CtaProps = { href: string; label: string; variant: "primary" | "secondary" };

function CtaButton({ href, label, variant }: CtaProps) {
  const [h, setH] = useState(false);
  const primary = variant === "primary";
  const bg = primary ? (h ? OXBLOOD : TERRACOTTA) : h ? TERRACOTTA : "transparent";
  const color = primary ? PAPER : h ? PAPER : TERRACOTTA;
  const border = primary ? (h ? OXBLOOD : TERRACOTTA) : TERRACOTTA;
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
        padding: "20px 36px",
        background: bg,
        color,
        textTransform: "uppercase",
        letterSpacing: "0.18em",
        fontSize: 11,
        fontWeight: 500,
        borderRadius: 2,
        border: `1px solid ${border}`,
        textDecoration: "none",
        transition: "background 320ms ease, color 320ms ease, border-color 320ms ease",
        minWidth: 180,
      }}
    >
      {label}
    </Link>
  );
}

export default function CtaEditorial() {
  return (
    <section
      className={fraunces.className}
      style={{
        position: "relative",
        background: PAPER,
        color: "#0F0F0F",
        paddingTop: "clamp(120px, 18vw, 200px)",
        paddingBottom: "clamp(120px, 18vw, 200px)",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: grainBg,
          opacity: 0.5,
          mixBlendMode: "multiply",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "relative",
          maxWidth: 960,
          margin: "0 auto",
          padding: "0 32px",
          textAlign: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.2, ease: [0.22, 0.61, 0.36, 1] }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 18,
            marginBottom: "clamp(48px, 8vw, 88px)",
          }}
        >
          <span style={{ height: 1, width: "min(180px, 22vw)", background: TERRACOTTA }} />
          <span
            className={mono.className}
            style={{
              fontSize: 10,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: TERRACOTTA,
              whiteSpace: "nowrap",
            }}
          >
            § 07 — To Begin
          </span>
          <span style={{ height: 1, width: "min(180px, 22vw)", background: TERRACOTTA }} />
        </motion.div>

        <h2
          style={{
            margin: 0,
            fontStyle: "italic",
            fontWeight: 400,
            color: TERRACOTTA,
            fontSize: "clamp(120px, 22vw, 260px)",
            lineHeight: 0.86,
            letterSpacing: "-0.04em",
            fontVariationSettings: '"opsz" 144',
          }}
        >
          Begin.
        </h2>

        <p
          className={mono.className}
          style={{
            margin: "clamp(40px, 6vw, 64px) 0 0 0",
            fontSize: 11,
            letterSpacing: "0.26em",
            textTransform: "uppercase",
            color: GRAPHITE,
            lineHeight: 1.7,
          }}
        >
          We read every message. We reply within a day.
        </p>

        <div
          style={{
            marginTop: "clamp(48px, 7vw, 72px)",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 16,
          }}
        >
          <CtaButton href="/start" label="Get Started" variant="primary" />
          <CtaButton href="/pricing" label="View Pricing" variant="secondary" />
        </div>

        <p
          className={mono.className}
          style={{
            margin: "clamp(64px, 9vw, 96px) 0 0 0",
            fontSize: 10,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: GRAPHITE,
            opacity: 0.75,
          }}
        >
          Est. 2004 · Made in Pittsburgh
        </p>

        <div
          aria-hidden
          style={{
            marginTop: "clamp(48px, 7vw, 80px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
          }}
        >
          <span style={{ height: 1, width: 80, background: HAIRLINE }} />
          <span style={{ width: 4, height: 4, background: TERRACOTTA, borderRadius: 999, opacity: 0.7 }} />
          <span style={{ height: 1, width: 80, background: HAIRLINE }} />
        </div>
      </div>
    </section>
  );
}
