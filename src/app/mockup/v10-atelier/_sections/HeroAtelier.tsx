"use client";

import type { CSSProperties } from "react";
import { Playfair_Display, Inter } from "next/font/google";
import { motion } from "framer-motion";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

// Couture palette
const CHAMPAGNE = "#F4E4DC";
const CHAMPAGNE_DEEP = "#EAD3C7";
const INK = "#1A1612";
const GOLD = "#C9A861";
const GOLD_SOFT = "rgba(201,168,97,0.55)";
const GOLD_HAIR = "rgba(201,168,97,0.42)";
const OXBLOOD = "#5E1A1A";
const CHARCOAL = "#3A3530";
const CREAM = "#F8F2EA";

// Inter all-caps, wide tracking — used for foundry-style labels
const labelGold: CSSProperties = {
  fontSize: 11,
  letterSpacing: "0.42em",
  textTransform: "uppercase",
  color: GOLD,
  fontWeight: 400,
};

const labelInk: CSSProperties = {
  ...labelGold,
  color: CHARCOAL,
  letterSpacing: "0.36em",
};

const ATELIERS = [
  { name: "Registrar", roman: "I" },
  { name: "Host", roman: "II" },
  { name: "Atelier", roman: "III" },
  { name: "Agents", roman: "IV" },
] as const;

export default function HeroAtelier() {
  return (
    <section
      className={playfair.className}
      style={{
        position: "relative",
        background: CHAMPAGNE,
        color: INK,
        padding:
          "clamp(28px,4vh,56px) clamp(28px,5vw,80px) clamp(48px,8vh,112px)",
        overflow: "hidden",
        isolation: "isolate",
        minHeight: "100vh",
      }}
    >
      <RadialBlush />
      <Grain />

      {/* TOP COLOPHON BAR — gold hairline + masthead */}
      <div
        className={inter.className}
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: "clamp(12px,1.5vw,24px)",
          paddingTop: 18,
          paddingBottom: 22,
          borderTop: `0.5px solid ${GOLD_SOFT}`,
        }}
      >
        <span style={{ ...labelGold, fontWeight: 500 }}>
          KPT &nbsp;·&nbsp; Atelier &nbsp;·&nbsp; Collection 26
        </span>
        <span aria-hidden style={{ flex: 1, height: 0.5, background: GOLD_HAIR }} />
        <span style={{ ...labelInk, fontStyle: "normal" }}>Spring &nbsp;/&nbsp; Summer</span>
        <span aria-hidden style={{ width: 26, height: 0.5, background: GOLD_HAIR }} />
        <span style={{ ...labelInk }}>Folio Nº 01</span>
      </div>

      {/* ASYMMETRIC COVER SPREAD */}
      <div
        className="atelier-spread"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0,7fr) minmax(0,5fr)",
          columnGap: "clamp(28px,4.5vw,84px)",
          alignItems: "end",
          marginTop: "clamp(36px,7vh,96px)",
          position: "relative",
        }}
      >
        {/* LEFT — wordmark column */}
        <div style={{ position: "relative", minWidth: 0, paddingBottom: 24 }}>
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.2, 0.7, 0.2, 1] }}
            className={inter.className}
            style={{
              ...labelGold,
              display: "block",
              marginBottom: "clamp(20px,3.6vh,40px)",
              paddingLeft: 2,
            }}
          >
            <span style={{ color: OXBLOOD, marginRight: 10 }}>—</span>
            The House of KPT &nbsp;·&nbsp; Established MMIV
          </motion.span>

          {/* MASSIVE KPT — Playfair ultra-thin */}
          <motion.h1
            aria-label="KPT"
            initial={{ opacity: 0, y: 18, letterSpacing: "0.04em" }}
            animate={{ opacity: 1, y: 0, letterSpacing: "-0.04em" }}
            transition={{ duration: 1.6, ease: [0.16, 0.8, 0.2, 1], delay: 0.1 }}
            style={{
              margin: 0,
              color: INK,
              fontSize: "clamp(240px,32vw,440px)",
              fontWeight: 200,
              lineHeight: 0.84,
              letterSpacing: "-0.04em",
              fontFeatureSettings: '"kern" 1, "liga" 1, "dlig" 1',
              textRendering: "geometricPrecision",
              marginLeft: "-0.045em",
              fontStyle: "normal",
            }}
          >
            <span style={{ display: "inline-block" }}>K</span>
            <span style={{ display: "inline-block", marginLeft: "-0.018em" }}>P</span>
            <span style={{ display: "inline-block", marginLeft: "-0.012em" }}>T</span>
          </motion.h1>

          {/* GOLD HAIRLINE ORNAMENT */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.6, ease: [0.2, 0.7, 0.2, 1], delay: 0.7 }}
            style={{
              transformOrigin: "left center",
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginTop: "clamp(22px,3vh,36px)",
              marginLeft: 4,
              maxWidth: "min(640px,90%)",
            }}
            aria-hidden
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: GOLD, boxShadow: `0 0 0 1px ${GOLD_SOFT}` }} />
            <span style={{ flex: 1, height: 0.5, background: `linear-gradient(90deg, ${GOLD} 0%, ${GOLD_SOFT} 60%, transparent 100%)` }} />
            <span
              className={inter.className}
              style={{ ...labelGold, fontSize: 9.5, letterSpacing: "0.5em" }}
            >
              ✦
            </span>
            <span style={{ flex: 1, height: 0.5, background: `linear-gradient(90deg, transparent 0%, ${GOLD_SOFT} 40%, ${GOLD} 100%)` }} />
          </motion.div>

          {/* TAGLINE — Playfair italic medium */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.2, 0.7, 0.2, 1], delay: 0.85 }}
            style={{
              margin: "clamp(20px,3vh,32px) 0 0",
              fontStyle: "italic",
              fontWeight: 500,
              color: CHARCOAL,
              fontSize: "clamp(28px,3.4vw,52px)",
              lineHeight: 1.05,
              letterSpacing: "-0.012em",
              maxWidth: "20ch",
              paddingLeft: 4,
            }}
          >
            Designs for the modern web
            <span style={{ color: GOLD, fontStyle: "normal" }}>.</span>
          </motion.p>
        </div>

        {/* RIGHT — model-shoot photography placeholder, framed in gold */}
        <motion.figure
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, ease: [0.16, 0.8, 0.2, 1], delay: 0.35 }}
          className="atelier-plate"
          style={{
            position: "relative",
            margin: 0,
            paddingBottom: 12,
            transform: "translateY(-2vh)",
          }}
        >
          {/* gold corner index */}
          <span
            className={inter.className}
            aria-hidden
            style={{
              ...labelGold,
              position: "absolute",
              top: -22,
              right: 0,
              fontSize: 9.5,
              letterSpacing: "0.5em",
            }}
          >
            Plate 01 &nbsp;/&nbsp; IV
          </span>

          {/* gold frame */}
          <div
            style={{
              position: "relative",
              padding: 1, // gold rule
              background: `linear-gradient(155deg, ${GOLD} 0%, ${GOLD_SOFT} 35%, rgba(201,168,97,0.18) 65%, ${GOLD} 100%)`,
              boxShadow:
                "0 30px 60px -28px rgba(40,20,10,0.28), 0 8px 22px -16px rgba(40,20,10,0.18)",
            }}
          >
            <div
              className="atelier-portrait"
              style={{
                position: "relative",
                aspectRatio: "3 / 4",
                width: "100%",
                overflow: "hidden",
                background: `
                  radial-gradient(120% 80% at 30% 18%, rgba(248,242,234,0.95) 0%, rgba(234,211,199,0.75) 35%, rgba(94,26,26,0.18) 78%, rgba(26,22,18,0.7) 100%),
                  linear-gradient(180deg, ${CREAM} 0%, ${CHAMPAGNE_DEEP} 55%, ${OXBLOOD} 130%)
                `,
              }}
            >
              {/* silhouette of a treated portrait — abstract figure */}
              <svg
                viewBox="0 0 300 400"
                preserveAspectRatio="xMidYMid slice"
                aria-hidden
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", mixBlendMode: "multiply", opacity: 0.78 }}
              >
                <defs>
                  <linearGradient id="silhouette" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3A3530" stopOpacity="0.05" />
                    <stop offset="40%" stopColor="#3A3530" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#1A1612" stopOpacity="0.85" />
                  </linearGradient>
                  <radialGradient id="halo" cx="50%" cy="22%" r="50%">
                    <stop offset="0%" stopColor="#F8F2EA" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#F8F2EA" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <rect x="0" y="0" width="300" height="400" fill="url(#halo)" />
                {/* Abstracted couture figure */}
                <path
                  d="M150 96 C 132 96 122 110 122 130 C 122 148 134 158 150 158 C 166 158 178 148 178 130 C 178 110 168 96 150 96 Z
                     M 102 196 C 110 174 128 162 150 162 C 172 162 190 174 198 196 L 214 320 C 218 340 210 360 192 372 L 178 392 L 122 392 L 108 372 C 90 360 82 340 86 320 Z"
                  fill="url(#silhouette)"
                />
              </svg>

              {/* fine grain inside the plate */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  opacity: 0.32,
                  mixBlendMode: "multiply",
                  backgroundImage:
                    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.1' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.1   0 0 0 0 0.08   0 0 0 0 0.06   0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
                  backgroundSize: "220px 220px",
                }}
              />

              {/* corner ticks */}
              <CornerTick top left />
              <CornerTick top right />
              <CornerTick bottom left />
              <CornerTick bottom right />

              {/* hand-stitched plate caption */}
              <div
                className={inter.className}
                style={{
                  position: "absolute",
                  left: 18,
                  bottom: 16,
                  color: CREAM,
                  fontSize: 10,
                  letterSpacing: "0.42em",
                  textTransform: "uppercase",
                  textShadow: "0 1px 6px rgba(0,0,0,0.35)",
                }}
              >
                <span style={{ color: GOLD }}>✦</span> &nbsp; The Couturier
              </div>
            </div>
          </div>

          {/* caption beneath plate — italic, small */}
          <figcaption
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 14,
              marginTop: 14,
              paddingLeft: 2,
            }}
          >
            <span
              className={inter.className}
              style={{ ...labelGold, fontSize: 9.5, whiteSpace: "nowrap" }}
            >
              Nº 01
            </span>
            <span
              style={{
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(13px,1vw,15px)",
                color: CHARCOAL,
                lineHeight: 1.4,
                letterSpacing: "-0.005em",
              }}
            >
              Photographed in the studio · hand-stitched & set by the couturier
            </span>
          </figcaption>
        </motion.figure>
      </div>

      {/* BELOW THE FOLD — the four ateliers */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: [0.2, 0.7, 0.2, 1], delay: 1.05 }}
        className="atelier-houses"
        style={{
          marginTop: "clamp(64px,12vh,140px)",
          position: "relative",
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          alignItems: "center",
          columnGap: "clamp(18px,3vw,40px)",
          rowGap: 14,
          paddingTop: 24,
          borderTop: `0.5px solid ${GOLD_HAIR}`,
        }}
      >
        <span
          className={inter.className}
          style={{ ...labelGold, fontSize: 10, letterSpacing: "0.46em" }}
        >
          The Houses
        </span>

        <div
          className={inter.className}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            flexWrap: "wrap",
            gap: "clamp(14px,2vw,28px)",
            ...labelGold,
            fontSize: 11.5,
            letterSpacing: "0.5em",
          }}
        >
          {ATELIERS.map((a, i) => (
            <span key={a.name} style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
              <span style={{ color: OXBLOOD, fontSize: 9, letterSpacing: "0.2em" }}>{a.roman}</span>
              <span style={{ color: GOLD, fontWeight: 500 }}>{a.name}</span>
              {i < ATELIERS.length - 1 && (
                <span aria-hidden style={{ color: GOLD_SOFT, marginLeft: 4 }}>·</span>
              )}
            </span>
          ))}
        </div>
      </motion.div>

      {/* foot — page number, edition */}
      <div
        className={inter.className}
        style={{
          marginTop: "clamp(36px,5vh,72px)",
          paddingTop: 14,
          borderTop: `0.5px solid ${GOLD_HAIR}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          ...labelInk,
          fontSize: 10,
          letterSpacing: "0.4em",
        }}
      >
        <span>
          <span style={{ color: GOLD, marginRight: 10 }}>✦</span>
          Couture &nbsp;·&nbsp; By Appointment
        </span>
        <span style={{ color: CHARCOAL }}>
          Folio I &nbsp;<span style={{ color: GOLD }}>/</span>&nbsp; Plate 01
        </span>
      </div>

      <style>{`
        .atelier-plate:hover .atelier-portrait { transform: scale(1.02); }
        .atelier-portrait { transition: transform 1.2s cubic-bezier(0.2,0.7,0.2,1); will-change: transform; }
        @media (max-width: 960px) {
          .atelier-spread { grid-template-columns: minmax(0,1fr) !important; row-gap: 32px; align-items: start !important; }
          .atelier-plate { transform: none !important; max-width: 480px; }
          .atelier-houses { grid-template-columns: minmax(0,1fr) !important; }
          .atelier-houses > div { justify-content: flex-start !important; }
        }
        @media (max-width: 640px) {
          .atelier-spread h1 { font-size: clamp(140px, 38vw, 240px) !important; }
        }
      `}</style>
    </section>
  );
}

function CornerTick({
  top,
  bottom,
  left,
  right,
}: {
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
}) {
  const size = 14;
  const style: CSSProperties = {
    position: "absolute",
    width: size,
    height: size,
    pointerEvents: "none",
    ...(top ? { top: 10 } : {}),
    ...(bottom ? { bottom: 10 } : {}),
    ...(left ? { left: 10 } : {}),
    ...(right ? { right: 10 } : {}),
  };
  return (
    <svg viewBox="0 0 14 14" style={style} aria-hidden>
      <path
        d={
          top && left
            ? "M0 6 L0 0 L6 0"
            : top && right
              ? "M14 6 L14 0 L8 0"
              : bottom && left
                ? "M0 8 L0 14 L6 14"
                : "M14 8 L14 14 L8 14"
        }
        fill="none"
        stroke={GOLD}
        strokeWidth="0.75"
        opacity="0.85"
      />
    </svg>
  );
}

function RadialBlush() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        background: `
          radial-gradient(60% 50% at 28% 18%, ${CREAM} 0%, rgba(248,242,234,0) 70%),
          radial-gradient(70% 60% at 82% 82%, rgba(94,26,26,0.08) 0%, rgba(94,26,26,0) 70%)
        `,
      }}
    />
  );
}

function Grain() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        opacity: 0.35,
        mixBlendMode: "multiply",
        zIndex: 0,
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='260' height='260'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.09   0 0 0 0 0.07   0 0 0 0 0.05   0 0 0 0.14 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        backgroundSize: "260px 260px",
      }}
    />
  );
}
