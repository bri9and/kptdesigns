"use client";

import { Inter, JetBrains_Mono } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["200", "400", "700", "900"] });
const jbm = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "700"] });

const CYAN = "#00E5FF";
const BLUE = "#0066FF";
const MAGENTA = "#FF00AA";
const SOFT = "#E8F1FF";
const AMBER = "#FFB000";

const PILLS = ["REGISTRAR", "HOST", "BUILDER", "AGENTS"];

/* Pure-CSS entry animations — keyframes always fire on mount, no observer
 * dance with framer-motion's whileInView in nested motion contexts. */

const S = {
  wrap: {
    position: "relative",
    width: "min(1200px, 92vw)",
    margin: "0 auto",
    padding: "0 16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 28,
    textAlign: "center",
    pointerEvents: "none",
  },
  fade: {
    position: "absolute",
    inset: "-12% -8%",
    background:
      "radial-gradient(ellipse at center, rgba(0,8,18,0) 0%, rgba(0,8,18,0) 38%, rgba(0,8,18,0.55) 72%, rgba(0,8,18,0.92) 100%)",
    pointerEvents: "none",
    zIndex: 0,
  },
  hudRow: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "1.4ch",
    fontSize: 11,
    letterSpacing: "0.32em",
    color: `${CYAN}99`,
    textTransform: "uppercase" as const,
    opacity: 0,
    animation: "kpt-hero-up 1.4s cubic-bezier(0.16,1,0.3,1) 0.1s forwards",
  },
  hudDot: {
    width: 6,
    height: 6,
    borderRadius: 999,
    background: CYAN,
    boxShadow: `0 0 10px ${CYAN}, 0 0 22px ${CYAN}66`,
    animation: "kpt-pulse 1.6s ease-in-out infinite",
  },
  wordmark: {
    position: "relative",
    zIndex: 1,
    fontWeight: 900,
    letterSpacing: "0.08em",
    lineHeight: 0.95,
    fontSize: "clamp(44px, 10vw, 152px)",
    margin: 0,
    backgroundImage: `linear-gradient(92deg, ${CYAN} 0%, ${SOFT} 38%, ${BLUE} 64%, ${MAGENTA} 100%)`,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    WebkitTextFillColor: "transparent",
    filter: `drop-shadow(0 0 24px ${CYAN}33) drop-shadow(0 0 48px ${MAGENTA}22)`,
    opacity: 0,
    animation: "kpt-hero-wm 1.8s cubic-bezier(0.16,1,0.3,1) 0.2s forwards, kpt-scan 9s linear 2s infinite",
  },
  underline: {
    position: "relative",
    zIndex: 1,
    height: 2,
    width: "min(680px, 78vw)",
    background: `linear-gradient(90deg, transparent 0%, ${CYAN} 18%, ${BLUE} 50%, ${MAGENTA} 82%, transparent 100%)`,
    boxShadow: `0 0 14px ${CYAN}55, 0 0 28px ${MAGENTA}33`,
    transformOrigin: "center",
    transform: "scaleX(0)",
    opacity: 0,
    animation: "kpt-hero-line 1.6s cubic-bezier(0.16,1,0.3,1) 0.6s forwards",
  },
  subhead: {
    position: "relative",
    zIndex: 1,
    fontWeight: 200,
    fontSize: "clamp(20px, 3vw, 36px)",
    color: SOFT,
    margin: 0,
    letterSpacing: "-0.01em",
    opacity: 0,
    animation: "kpt-hero-up 1.6s cubic-bezier(0.16,1,0.3,1) 0.9s forwards",
  },
  subheadAccent: {
    fontWeight: 700,
    color: CYAN,
    fontStyle: "italic",
    backgroundImage: `linear-gradient(92deg, ${CYAN} 0%, ${MAGENTA} 100%)`,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  pillRow: {
    position: "relative",
    zIndex: 1,
    display: "inline-flex",
    alignItems: "stretch",
    border: `1px solid ${CYAN}44`,
    borderRadius: 999,
    padding: 0,
    background: "rgba(0,8,18,0.42)",
    backdropFilter: "blur(6px)",
    WebkitBackdropFilter: "blur(6px)",
    boxShadow: `inset 0 0 0 1px ${CYAN}11, 0 0 32px ${CYAN}1A`,
    overflow: "hidden",
    opacity: 0,
    animation: "kpt-hero-up 1.6s cubic-bezier(0.16,1,0.3,1) 1.15s forwards",
  },
  pill: {
    padding: "10px 18px",
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: "0.28em",
    color: SOFT,
    textTransform: "uppercase" as const,
    display: "inline-flex",
    alignItems: "center",
    whiteSpace: "nowrap" as const,
  },
  divider: {
    width: 1,
    background: `linear-gradient(180deg, transparent 0%, ${CYAN}88 50%, transparent 100%)`,
    alignSelf: "stretch",
  },
  hudFoot: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "2ch",
    fontSize: 10,
    letterSpacing: "0.36em",
    color: `${CYAN}80`,
    textTransform: "uppercase" as const,
    marginTop: 6,
    opacity: 0,
    animation: "kpt-hero-fade 1.4s cubic-bezier(0.16,1,0.3,1) 1.4s forwards",
  },
  bracket: { color: AMBER, fontWeight: 700 },
  vector: { color: SOFT },
} satisfies Record<string, React.CSSProperties>;

export default function HeroCheckpoint() {
  return (
    <div className={inter.className} style={S.wrap}>
      <style>{`
        @keyframes kpt-pulse { 0%,100% { opacity: 1; transform: scale(1) } 50% { opacity: 0.4; transform: scale(0.7) } }
        @keyframes kpt-scan {
          0%   { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes kpt-hero-up {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes kpt-hero-fade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes kpt-hero-wm {
          from { opacity: 0; letter-spacing: 0.32em; filter: blur(18px) drop-shadow(0 0 24px rgba(0,229,255,0.2)) drop-shadow(0 0 48px rgba(255,0,170,0.13)); }
          to   { opacity: 1; letter-spacing: 0.08em; filter: blur(0) drop-shadow(0 0 24px rgba(0,229,255,0.2)) drop-shadow(0 0 48px rgba(255,0,170,0.13)); }
        }
        @keyframes kpt-hero-line {
          from { opacity: 0; transform: scaleX(0); }
          to   { opacity: 1; transform: scaleX(1); }
        }
        .kpt-wm { background-size: 200% 100%; }
        @media (prefers-reduced-motion: reduce) {
          [class] { animation-duration: 0.001ms !important; animation-delay: 0s !important; }
        }
      `}</style>

      <div aria-hidden style={S.fade} />

      <div className={jbm.className} style={S.hudRow}>
        <span style={S.hudDot} />
        <span>CHECKPOINT 01 / 08</span>
        <span style={{ color: `${CYAN}33` }}>—</span>
        <span style={{ color: AMBER }}>ENTRY VECTOR LOCKED</span>
      </div>

      <h1 className={`kpt-wm ${inter.className}`} style={S.wordmark}>
        KPT&nbsp;DESIGNS
      </h1>

      <div aria-hidden style={S.underline} />

      <p style={S.subhead}>
        We bring you <span style={S.subheadAccent}>in.</span>
      </p>

      <div className={jbm.className} style={S.pillRow}>
        {PILLS.map((label, i) => (
          <span key={label} style={{ display: "inline-flex", alignItems: "stretch" }}>
            <span style={S.pill}>{label}</span>
            {i < PILLS.length - 1 && <span aria-hidden style={S.divider} />}
          </span>
        ))}
      </div>

      <div className={jbm.className} style={S.hudFoot}>
        <span>
          <span style={S.bracket}>[</span>VECTOR <span style={S.vector}>1.0 / 8.0</span>
          <span style={S.bracket}>]</span>
        </span>
        <span>
          <span style={S.bracket}>[</span>DEPTH <span style={S.vector}>ENTRY</span>
          <span style={S.bracket}>]</span>
        </span>
        <span>
          <span style={S.bracket}>[</span>FOV <span style={S.vector}>72°</span>
          <span style={S.bracket}>]</span>
        </span>
      </div>
    </div>
  );
}
