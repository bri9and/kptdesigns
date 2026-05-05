"use client";

import { JetBrains_Mono } from "next/font/google";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const jbm = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "700"] });

const PHOSPHOR = "#33FF66";
const AMBER = "#FFB000";
const MAGENTA = "#FF00FF";
const OFFWHITE = "#E0E0E0";
const DIM = "#444";
const HAIRLINE = "#2A2A2A";
const PANEL = "#1a1a1a";
const PANEL_DARK = "#0a0a0a";

const KPT_ASCII = String.raw` ██╗  ██╗ ██████╗  ████████╗
 ██║ ██╔╝ ██╔══██╗ ╚══██╔══╝
 █████╔╝  ██████╔╝    ██║
 ██╔═██╗  ██╔═══╝     ██║
 ██║  ██╗ ██║         ██║
 ╚═╝  ╚═╝ ╚═╝         ╚═╝`;

const KPT_ASCII_SM = String.raw` _  __ ____ _____
| |/ /|  _ \\_   _|
| ' / | |_) || |
| . \\ |  __/ | |
|_|\\_\\|_|    |_|`;

const OVERLAY: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
};
const OVERLAYS: React.CSSProperties[] = [
  {
    ...OVERLAY,
    background:
      "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.55) 85%, rgba(0,0,0,0.95) 100%)",
    zIndex: 4,
  },
  { ...OVERLAY, animation: "kpt-flicker 6s steps(1) infinite", zIndex: 3 },
  {
    ...OVERLAY,
    backgroundImage:
      "repeating-linear-gradient(0deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 4px)",
    mixBlendMode: "screen",
    zIndex: 5,
    opacity: 0.7,
  },
  {
    ...OVERLAY,
    background: `linear-gradient(${MAGENTA}11, #00FFFF11)`,
    mixBlendMode: "screen",
    zIndex: 6,
    animation: "kpt-glitch 220ms ease-out 1 forwards",
    opacity: 0,
  },
];

const S = {
  section: { position: "relative", minHeight: "100vh", background: "#000", color: PHOSPHOR, overflow: "hidden", paddingTop: 88, paddingBottom: 56, display: "flex", flexDirection: "column", fontSize: 13 },
  tabBar: { position: "relative", zIndex: 2, borderBottom: `1px solid ${HAIRLINE}`, padding: "8px 16px", display: "flex", alignItems: "center", gap: "1.2ch", flexWrap: "wrap", fontSize: 12 },
  main: { position: "relative", zIndex: 2, flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 16px", gap: 36 },
  termBox: { width: "min(720px, 92vw)", border: `1px solid ${HAIRLINE}`, background: "rgba(10,12,10,0.6)", padding: "14px 18px 16px" },
  termHead: { display: "flex", alignItems: "center", gap: "1ch", fontSize: 11, color: DIM, borderBottom: `1px dashed ${DIM}`, paddingBottom: 8, marginBottom: 10 },
  status: { position: "relative", zIndex: 2, marginTop: "auto", display: "flex", alignItems: "stretch", height: 28, fontSize: 11, fontWeight: 500, background: PANEL_DARK, borderTop: `1px solid ${HAIRLINE}`, overflow: "hidden", whiteSpace: "nowrap" },
} satisfies Record<string, React.CSSProperties>;

type Line = { p?: string; t: string; c?: string; d: number; cur?: boolean };

const LINES: Line[] = [
  { p: "$", t: "kpt --version", c: OFFWHITE, d: 0.2 },
  { t: "KPT DESIGNS v4.0.1 (2004-2026)", c: PHOSPHOR, d: 0.9 },
  { p: "$", t: "kpt status", c: OFFWHITE, d: 1.8 },
  { p: ">", t: "47 sites deployed · 0 templates used · 100% client retention", c: AMBER, d: 2.5 },
  { p: "$", t: "kpt build --modern", c: OFFWHITE, d: 3.6 },
  { p: ">", t: "", c: PHOSPHOR, d: 4.4, cur: true },
];

const CHAR = 0.04;

function TermLine({ line }: { line: Line }) {
  const chars = Array.from(line.t);
  return (
    <div style={{ display: "flex", gap: "0.6ch", lineHeight: 1.55, whiteSpace: "pre" }}>
      {line.p && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.05, delay: line.d - 0.05 }}
          style={{ color: line.p === ">" ? PHOSPHOR : MAGENTA, fontWeight: 700 }}
        >
          {line.p}
        </motion.span>
      )}
      <span style={{ color: line.c ?? PHOSPHOR }}>
        {chars.map((c, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.001, delay: line.d + i * CHAR }}
          >
            {c}
          </motion.span>
        ))}
        {line.cur && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.001, delay: line.d + chars.length * CHAR }}
            style={{
              display: "inline-block",
              width: "0.7ch",
              height: "1.05em",
              background: PHOSPHOR,
              marginLeft: "0.15ch",
              transform: "translateY(0.15em)",
              animation: "kpt-blink 1s steps(1) infinite",
              boxShadow: `0 0 8px ${PHOSPHOR}`,
            }}
          />
        )}
      </span>
    </div>
  );
}

const tabBase: React.CSSProperties = { padding: "0 0.6ch" };
function Tab({ label, active }: { label: string; active?: boolean }) {
  return (
    <span
      style={{
        ...tabBase,
        background: active ? PHOSPHOR : "transparent",
        color: active ? "#000" : PHOSPHOR,
        fontWeight: active ? 700 : 400,
      }}
    >
      [{label}]
    </span>
  );
}

const segBase: React.CSSProperties = {
  padding: "0 1.1ch",
  fontWeight: 700,
  letterSpacing: "0.02em",
  display: "inline-flex",
  alignItems: "center",
};
const arrowBase: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  paddingRight: "0.1ch",
  fontSize: "1.1em",
  lineHeight: 1,
};

function Seg({
  bg,
  fg,
  next,
  end,
  children,
}: {
  bg: string;
  fg: string;
  next?: string;
  end?: boolean;
  children: React.ReactNode;
}) {
  return (
    <span style={{ display: "inline-flex", alignItems: "stretch", height: "100%" }}>
      <span style={{ ...segBase, background: bg, color: fg }}>{children}</span>
      {!end && (
        <span aria-hidden style={{ ...arrowBase, color: bg, background: next ?? "transparent" }}>
          {""}
        </span>
      )}
    </span>
  );
}

export default function HeroTerminal() {
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTime(`${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`);
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className={jbm.className} style={S.section}>
      <style>{`
        @keyframes kpt-blink { 0%,49%{opacity:1} 50%,100%{opacity:0} }
        @keyframes kpt-glitch {
          0%{transform:translate(0,0);filter:none;opacity:0}
          10%{opacity:1;transform:translate(-2px,1px);filter:hue-rotate(20deg) drop-shadow(2px 0 0 ${MAGENTA}) drop-shadow(-2px 0 0 #00FFFF)}
          25%{transform:translate(1px,-1px);filter:hue-rotate(-15deg)}
          40%{transform:translate(-1px,0);filter:drop-shadow(1px 0 0 ${MAGENTA}) drop-shadow(-1px 0 0 #00FFFF)}
          70%{transform:translate(0,0);filter:none}
          100%{transform:translate(0,0);filter:none;opacity:0;pointer-events:none}
        }
        @keyframes kpt-flicker { 0%,100%{opacity:.96} 47%{opacity:.94} 48%{opacity:.7} 49%{opacity:.96} 73%{opacity:.92} }
        @keyframes kpt-glow {
          0%,100%{text-shadow:0 0 6px ${PHOSPHOR}55,0 0 14px ${PHOSPHOR}22}
          50%{text-shadow:0 0 8px ${PHOSPHOR}77,0 0 18px ${PHOSPHOR}33}
        }
        .kpt-lg{display:block}.kpt-sm{display:none}
        @media (max-width:640px){.kpt-lg{display:none}.kpt-sm{display:block}}
      `}</style>

      {OVERLAYS.map((s, i) => (
        <div key={i} aria-hidden style={s} />
      ))}

      <div style={S.tabBar}>
        <Tab label="home" active />
        <Tab label="work" />
        <Tab label="process" />
        <Tab label="contact" />
        <span style={{ flex: 1 }} />
        <span style={{ color: AMBER, fontWeight: 700, letterSpacing: "0.05em" }}>
          -- INSERT --
        </span>
      </div>

      <div style={S.main}>
        <motion.div
          initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
          style={{ textAlign: "center" }}
        >
          <pre
            className="kpt-lg"
            style={{
              color: PHOSPHOR,
              fontWeight: 700,
              fontSize: "clamp(10px, 2.1vw, 22px)",
              lineHeight: 1.05,
              margin: 0,
              animation: "kpt-glow 3.4s ease-in-out infinite",
              textShadow: `0 0 6px ${PHOSPHOR}55, 0 0 14px ${PHOSPHOR}22`,
            }}
          >
{KPT_ASCII}
          </pre>
          <pre
            className="kpt-sm"
            style={{
              color: PHOSPHOR,
              fontWeight: 700,
              fontSize: 16,
              lineHeight: 1.1,
              margin: 0,
              textShadow: `0 0 6px ${PHOSPHOR}55`,
            }}
          >
{KPT_ASCII_SM}
          </pre>
          <div
            style={{
              marginTop: 18,
              fontSize: 11,
              letterSpacing: "0.4em",
              color: DIM,
              textTransform: "uppercase",
            }}
          >
            <span style={{ color: AMBER }}>{"//"}</span> hand-built websites since 2004{" "}
            <span style={{ color: AMBER }}>{"//"}</span>
          </div>
        </motion.div>

        <div style={S.termBox}>
          <div style={S.termHead}>
            <span style={{ color: PHOSPHOR }}>~/kpt</span>
            <span>$</span>
            <span style={{ color: AMBER }}>zsh</span>
            <span style={{ flex: 1 }} />
            <span>80x24</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 13 }}>
            {LINES.map((l, i) => (
              <TermLine key={i} line={l} />
            ))}
          </div>
        </div>
      </div>

      <div style={S.status}>
        <Seg bg={PHOSPHOR} fg="#000" next={PANEL}>NORMAL</Seg>
        <Seg bg={PANEL} fg={PHOSPHOR} next={PANEL_DARK}>
          BRANCH:&nbsp;<span style={{ color: AMBER }}>main</span>
        </Seg>
        <Seg bg={PANEL_DARK} fg={PHOSPHOR} next={PANEL}>
          <span style={{ color: PHOSPHOR }}>{"✓"}</span>&nbsp;DEPLOYS
        </Seg>
        <Seg bg={PANEL} fg={AMBER} next={PANEL_DARK}>CLIENTS:&nbsp;47</Seg>
        <span style={{ flex: 1, background: PANEL_DARK }} />
        <Seg bg={PANEL_DARK} fg={PHOSPHOR} next={AMBER}>UPTIME:&nbsp;99.99%</Seg>
        <Seg bg={AMBER} fg="#000" end>{time}</Seg>
      </div>
    </section>
  );
}
