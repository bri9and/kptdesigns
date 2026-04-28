"use client";

import { Inter, JetBrains_Mono } from "next/font/google";
import { motion } from "framer-motion";
import { portfolio, type PortfolioItem } from "@/lib/portfolio";

const inter = Inter({ subsets: ["latin"], weight: ["200", "400", "500", "700"] });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "700"] });

const C = {
  void: "#000812",
  cyan: "#00E5FF",
  cyanDim: "rgba(0,229,255,0.45)",
  cyanFaint: "rgba(0,229,255,0.18)",
  blue: "#0066FF",
  white: "#E8F1FF",
  amber: "#FFB000",
  grey: "#9BA3C7",
} as const;

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Specimen = PortfolioItem & { code: string; link: string; external: boolean };

const SPECIMENS: Specimen[] = portfolio.slice(0, 6).map((p, i) => ({
  ...p,
  code: `SPC_${String(i + 1).padStart(2, "0")}`,
  link: p.href ?? `https://${p.url}`,
  external: !p.href,
}));

type Corner = {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  borderTop?: number;
  borderBottom?: number;
  borderLeft?: number;
  borderRight?: number;
};

const CORNERS: Corner[] = [
  { top: -1, left: -1, borderTop: 2, borderLeft: 2 },
  { top: -1, right: -1, borderTop: 2, borderRight: 2 },
  { bottom: -1, left: -1, borderBottom: 2, borderLeft: 2 },
  { bottom: -1, right: -1, borderBottom: 2, borderRight: 2 },
];

function firstLine(d: string) {
  const stop = d.search(/[.!]/);
  const p = (stop > 0 ? d.slice(0, stop) : d).trim();
  return p.length > 80 ? p.slice(0, 77) + "..." : p;
}

/**
 * PortfolioCheckpoint — checkpoint 05 of 08
 *
 * 6 specimen cards as a tight HUD grid. Plain HTML overlay; sits on the
 * frosted plate so images stay sharp against the tunnel.
 */
export default function PortfolioCheckpoint() {
  return (
    <div
      className={inter.className}
      style={{
        position: "relative",
        width: "min(1180px, 94vw)",
        margin: "0 auto",
        padding: "clamp(20px, 3vw, 36px)",
        background: "rgba(0,8,18,0.62)",
        backdropFilter: "blur(14px) saturate(120%)",
        WebkitBackdropFilter: "blur(14px) saturate(120%)",
        border: `1px solid ${C.cyan}33`,
        boxShadow: `inset 0 0 0 1px rgba(0,229,255,0.06), 0 0 60px rgba(0,8,18,0.55)`,
        color: C.white,
      }}
    >
      <div
        className={mono.className}
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: 12,
          fontSize: 11,
          letterSpacing: "0.26em",
          color: C.cyan,
          textTransform: "uppercase",
          marginBottom: 14,
        }}
      >
        <span>{"//"} CHECKPOINT 05 · ARCHIVE_SCAN</span>
        <span style={{ color: C.amber, display: "inline-flex", gap: 8, alignItems: "center" }}>
          <span
            aria-hidden
            style={{
              width: 7, height: 7, borderRadius: 999, background: C.amber,
              boxShadow: `0 0 8px ${C.amber}`, animation: "kpt-blink 1.4s ease-in-out infinite",
            }}
          />
          SCAN ACTIVE
        </span>
      </div>

      <h2
        className={mono.className}
        style={{
          margin: 0,
          fontSize: "clamp(14px, 2vw, 20px)",
          fontWeight: 500,
          letterSpacing: "0.22em",
          color: C.white,
          textTransform: "uppercase",
        }}
      >
        DEPLOYED <span style={{ color: C.cyanDim }}>·</span>{" "}
        <span style={{ color: C.cyan }}>47 SPECIMENS</span>{" "}
        <span style={{ color: C.cyanDim }}>·</span> 6 SHOWN
      </h2>

      <div
        aria-hidden
        style={{
          height: 1,
          marginTop: 16,
          marginBottom: 24,
          background: `linear-gradient(90deg, ${C.cyan} 0%, ${C.cyanDim} 40%, transparent 100%)`,
        }}
      />

      <ul
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: 14,
        }}
        className="kpt-port-grid"
      >
        {SPECIMENS.map((s, i) => (
          <motion.li
            key={s.code}
            initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.1 + i * 0.06 }}
          >
            <SpecimenCard s={s} />
          </motion.li>
        ))}
      </ul>

      <div
        className={mono.className}
        style={{
          marginTop: 22,
          display: "flex",
          flexWrap: "wrap",
          gap: 14,
          fontSize: 10,
          letterSpacing: "0.22em",
          color: C.cyanDim,
          textTransform: "uppercase",
        }}
      >
        <span>SCAN_OK</span>
        <span style={{ color: C.cyanFaint }}>·</span>
        <span>FRAME 06/47</span>
        <span style={{ color: C.cyanFaint }}>·</span>
        <span style={{ color: C.amber }}>NEXT_CHECKPOINT_LOCKED</span>
      </div>

      <style>{`
        @keyframes kpt-blink { 0%,100% { opacity:1 } 50% { opacity:0.35 } }
        @media (max-width: 920px) {
          .kpt-port-grid { grid-template-columns: repeat(2, minmax(0,1fr)) !important; }
        }
        @media (max-width: 520px) {
          .kpt-port-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function SpecimenCard({ s }: { s: Specimen }) {
  return (
    <a
      href={s.link}
      target={s.external ? "_blank" : undefined}
      rel={s.external ? "noopener noreferrer" : undefined}
      style={{
        position: "relative",
        display: "block",
        aspectRatio: "5 / 6",
        overflow: "hidden",
        background: C.void,
        border: `1px solid ${C.cyanFaint}`,
        textDecoration: "none",
      }}
      className="kpt-spec"
    >
      {s.image ? (
        <div
          aria-hidden
          className="kpt-spec-bg"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${s.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "saturate(0.85) contrast(1.05)",
            transition: "transform 1.2s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
      ) : (
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(135deg, ${C.void}, ${C.blue}33)`,
          }}
        />
      )}

      {/* dark overlay */}
      <div
        aria-hidden
        className="kpt-spec-shade"
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,8,18,0.7)",
          transition: "opacity 0.6s ease",
        }}
      />

      {/* scanlines */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          mixBlendMode: "screen",
          backgroundImage:
            "repeating-linear-gradient(180deg, rgba(0,229,255,0.05) 0 1px, transparent 1px 3px)",
        }}
      />

      {/* corner brackets */}
      {CORNERS.map((c, i) => (
        <span
          key={i}
          aria-hidden
          style={{
            position: "absolute",
            width: 12,
            height: 12,
            borderColor: C.cyan,
            borderStyle: "solid",
            borderWidth: 0,
            borderTopWidth: c.borderTop,
            borderLeftWidth: c.borderLeft,
            borderBottomWidth: c.borderBottom,
            borderRightWidth: c.borderRight,
            top: c.top,
            bottom: c.bottom,
            left: c.left,
            right: c.right,
            opacity: 0.85,
          }}
        />
      ))}

      <div
        style={{
          position: "absolute",
          inset: 0,
          padding: "12px 14px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span
            className={mono.className}
            style={{ color: C.cyanDim, fontSize: 10, letterSpacing: "0.22em" }}
          >
            {s.code}
          </span>
          <span
            className={mono.className}
            style={{
              color: C.cyanDim,
              fontSize: 9,
              letterSpacing: "0.2em",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span
              aria-hidden
              style={{
                width: 5, height: 5, borderRadius: 999, background: C.cyan,
                boxShadow: `0 0 6px ${C.cyan}`, display: "inline-block",
              }}
            />
            LIVE
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span
            className={mono.className}
            style={{
              color: C.cyan,
              fontSize: 9,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
            }}
          >
            {s.category}
          </span>
          <h3
            style={{
              margin: 0,
              color: C.white,
              fontWeight: 500,
              fontSize: "clamp(13px, 1.4vw, 17px)",
              letterSpacing: "-0.005em",
              lineHeight: 1.25,
            }}
          >
            {s.name}
          </h3>
          <p
            style={{
              margin: 0,
              color: "rgba(232,241,255,0.75)",
              fontSize: 11,
              fontWeight: 300,
              lineHeight: 1.4,
            }}
          >
            {firstLine(s.desc)}
          </p>
          <span
            className={mono.className}
            style={{
              marginTop: 2,
              color: C.cyan,
              fontSize: 9,
              letterSpacing: "0.22em",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              opacity: 0.6,
            }}
          >
            OPEN_TRANSMISSION <span aria-hidden>→</span>
          </span>
        </div>
      </div>

      <style>{`
        .kpt-spec:hover .kpt-spec-bg { transform: scale(1.04); }
        .kpt-spec:hover .kpt-spec-shade { opacity: 0.55; }
      `}</style>
    </a>
  );
}
