"use client";

import Link from "next/link";
import { IBM_Plex_Mono } from "next/font/google";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const plex = IBM_Plex_Mono({ subsets: ["latin"], weight: ["300", "400", "600", "700"] });

const C = {
  green: "#00FF41",
  amber: "#FFA500",
  red: "#FF3030",
  grid: "#222",
  data: "#E8E8E8",
  dim: "#7A7A7A",
};

const FIELDS = [
  { l: "ACCT", v: "KPT-DSGN-2004", h: "VERIFIED" },
  { l: "QTY", v: "1.000", h: "FULL STACK" },
  { l: "TYPE", v: "MKT / OWN-OUTRIGHT", h: "NO LEASE" },
  { l: "TIF", v: "GTC · FOREVER", h: "GOOD TILL CANCELLED" },
];

const BOOK: { s: "B" | "S"; n: string; q: string }[] = [
  { s: "B", n: "REGISTRAR", q: "01" },
  { s: "B", n: "HOSTING", q: "01" },
  { s: "B", n: "DESIGN", q: "01" },
  { s: "B", n: "BUILD", q: "01" },
  { s: "S", n: "AGENCY MARKUP", q: "00" },
  { s: "S", n: "HIDDEN FEES", q: "00" },
];

export default function CtaTicker() {
  const [tick, setTick] = useState(0);
  const [time, setTime] = useState("");
  useEffect(() => {
    const a = setInterval(() => setTick((n) => (n + 1) % 1000), 1200);
    const b = setInterval(() => {
      const d = new Date();
      const p = (n: number) => String(n).padStart(2, "0");
      setTime(`${p(d.getUTCHours())}:${p(d.getUTCMinutes())}:${p(d.getUTCSeconds())} UTC`);
    }, 1000);
    return () => { clearInterval(a); clearInterval(b); };
  }, []);

  const last = (97.42 + Math.sin(tick / 3) * 0.06).toFixed(2);
  const bid = (97.41 + Math.sin(tick / 3) * 0.05).toFixed(2);
  const ask = (97.44 + Math.cos(tick / 3) * 0.05).toFixed(2);
  const cell: React.CSSProperties = { borderRight: `1px solid ${C.grid}`, borderBottom: `1px solid ${C.grid}`, padding: "10px 12px" };
  const btn: React.CSSProperties = { padding: "14px 16px", textAlign: "center", fontSize: 13, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", borderRadius: 0, textDecoration: "none", display: "block", transition: "background 120ms linear, color 120ms linear" };

  return (
    <section id="cta" className={plex.className} style={{ background: "#000", color: C.data, borderTop: `1px solid ${C.grid}` }}>
      <div style={{ borderBottom: `1px solid ${C.grid}`, padding: "8px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase" }}>
        <span style={{ color: C.green }}>▌ TICKET ENTRY · NEW PROJECT</span>
        <span style={{ color: C.dim }}>F4 · ORDER · {time || "--:--:-- UTC"}</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.6fr) minmax(0, 1fr)" }}>
        <div style={{ padding: "28px 24px 20px", borderRight: `1px solid ${C.grid}` }}>
          <div style={{ fontSize: 11, color: C.dim, letterSpacing: "0.18em" }}>&gt; ENTER ORDER_</div>
          <h2 style={{ fontWeight: 700, fontSize: "clamp(44px, 8vw, 92px)", lineHeight: 0.95, letterSpacing: "-0.02em", margin: "6px 0 4px" }}>
            BUY <span style={{ color: C.green }}>KPT.DSGN</span>
            <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} style={{ color: C.green, marginLeft: 6 }}>▌</motion.span>
          </h2>
          <div style={{ fontSize: 12, color: C.dim, marginBottom: 22 }}>
            ISIN US-KPT-2004-DSGN · PRIMARY LISTING · VOL 24H {(tick * 7) % 9999}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", borderTop: `1px solid ${C.grid}`, borderLeft: `1px solid ${C.grid}` }}>
            {FIELDS.map((f) => (
              <div key={f.l} style={cell}>
                <div style={{ fontSize: 10, letterSpacing: "0.2em", color: C.amber, marginBottom: 4 }}>{f.l}</div>
                <div style={{ fontSize: 14, color: C.dim }}>{f.v}</div>
                <div style={{ fontSize: 9, color: C.green, marginTop: 2, letterSpacing: "0.15em" }}>✓ {f.h}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 18, border: `1px solid ${C.green}`, padding: 14, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, background: "rgba(0,255,65,0.03)" }}>
            <Link href="/start" className="kpt-cta-primary" style={{ ...btn, background: C.green, color: "#000" }}>
              ▶ EXECUTE · GET STARTED
            </Link>
            <Link href="/pricing" className="kpt-cta-secondary" style={{ ...btn, background: "transparent", color: C.green, border: `1px solid ${C.green}` }}>
              ◇ VIEW PRICING
            </Link>
          </div>

          <div style={{ marginTop: 10, fontSize: 10, color: C.dim, letterSpacing: "0.18em", textTransform: "uppercase" }}>
            ORDER VALID UNTIL CLOSE · EST. 2004 · 0 ERRORS
          </div>
        </div>

        <div style={{ padding: "28px 20px 20px" }}>
          <div style={{ fontSize: 10, color: C.dim, letterSpacing: "0.2em" }}>LAST · BID · ASK</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 14, margin: "4px 0 10px" }}>
            <span style={{ fontSize: 38, color: C.green, fontWeight: 600, letterSpacing: "-0.02em" }}>{last}</span>
            <span style={{ fontSize: 11, color: C.green }}>+0.04 · +0.04%</span>
          </div>
          <div style={{ display: "flex", gap: 16, fontSize: 11, color: C.dim, marginBottom: 16 }}>
            <span>BID <span style={{ color: C.green }}>{bid}</span></span>
            <span>ASK <span style={{ color: C.amber }}>{ask}</span></span>
            <span>SPRD <span style={{ color: C.data }}>0.03</span></span>
          </div>

          <div style={{ fontSize: 10, color: C.amber, letterSpacing: "0.2em", borderTop: `1px solid ${C.grid}`, borderBottom: `1px solid ${C.grid}`, padding: "6px 0", display: "grid", gridTemplateColumns: "32px 1fr 60px" }}>
            <span>SIDE</span><span>BOOK</span><span style={{ textAlign: "right" }}>QTY</span>
          </div>
          {BOOK.map((r) => (
            <div key={r.n} style={{ display: "grid", gridTemplateColumns: "32px 1fr 60px", fontSize: 12, padding: "5px 0", borderBottom: `1px solid ${C.grid}`, color: r.s === "B" ? C.green : C.red }}>
              <span>{r.s}</span>
              <span style={{ color: C.data, letterSpacing: "0.08em" }}>{r.n}</span>
              <span style={{ textAlign: "right", color: C.dim }}>{r.q}</span>
            </div>
          ))}
          <div style={{ marginTop: 12, fontSize: 10, color: C.dim, letterSpacing: "0.16em" }}>
            DEPTH · 6 LEVELS · 1 PROCESS · 1 BILL · 1 TEAM
          </div>
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${C.grid}`, borderBottom: `1px solid ${C.grid}`, overflow: "hidden", whiteSpace: "nowrap", background: "#050505" }}>
        <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 38, ease: "linear", repeat: Infinity }} style={{ display: "inline-block", padding: "6px 0", fontSize: 11, letterSpacing: "0.16em" }}>
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k}>
              <span style={{ color: C.green }}>KPT ▲ {last}</span>
              <span style={{ color: C.dim, margin: "0 18px" }}>·</span>
              <span style={{ color: C.amber }}>REGISTRAR · HOST · DESIGN · BUILD</span>
              <span style={{ color: C.dim, margin: "0 18px" }}>·</span>
              <span style={{ color: C.data }}>SISTER CO. KPT AGENTS · INBOUND AI PHONE</span>
              <span style={{ color: C.dim, margin: "0 18px" }}>·</span>
              <span style={{ color: C.green }}>EST 2004</span>
              <span style={{ color: C.dim, margin: "0 18px" }}>·</span>
              <span style={{ color: C.red }}>0 AGENCIES INVOLVED</span>
              <span style={{ color: C.dim, margin: "0 18px" }}>·</span>
            </span>
          ))}
        </motion.div>
      </div>

      <style>{`
        .kpt-cta-primary:hover { background: ${C.amber} !important; color: #000 !important; }
        .kpt-cta-secondary:hover { background: ${C.green} !important; color: #000 !important; }
      `}</style>
    </section>
  );
}
