"use client";

import { VT323 } from "next/font/google";
import { portfolio } from "@/lib/portfolio";

const vt = VT323({ subsets: ["latin"], weight: "400" });

const PAPER = "#FBFBFB";
const INK = "#1A1A1A";
const CARBON = "#B53D3D";
const FAINT_BLUE = "#3D5A8A";

const START_RCPT = 47;
const YEARS = ["2024", "2024", "2023", "2023", "2023", "2022"];

const slug = (u: string) =>
  u.replace(/^https?:\/\//, "").replace(/\.[a-z]{2,}$/i, "").replace(/\./g, "-").toUpperCase();
const pad = (n: number) => String(n).padStart(3, "0");

export default function PortfolioReceipt() {
  const rows = portfolio.slice(0, 6).map((p, i) => ({
    p,
    slug: slug(p.url),
    rcpt: pad(START_RCPT - i),
    year: YEARS[i] ?? "2023",
    href: p.href ?? `https://${p.url}`,
    ext: !p.href,
  }));

  return (
    <section
      aria-label="Purchase History"
      className={vt.className}
      style={{ background: PAPER, padding: "64px 16px 88px", position: "relative", overflow: "hidden" }}
    >
      <div aria-hidden style={fadeStyle} />
      <div aria-hidden style={grainStyle} />

      <div style={stripStyle}>
        <div aria-hidden style={perfTop} />

        <header style={{ textAlign: "center", marginBottom: 18 }}>
          <div style={{ fontSize: 22, letterSpacing: "0.08em", lineHeight: 1 }}>
            *** PURCHASE HISTORY ***
          </div>
          <div style={{ fontSize: 16, letterSpacing: "0.18em", color: "#555", marginTop: 6 }}>
            KPT DESIGNS &nbsp;·&nbsp; EST. 2004
          </div>
          <div aria-hidden style={dashRule} />
          <div style={headerRow}>
            <span>RCPT#</span>
            <span>PROJECT</span>
            <span>YR</span>
          </div>
          <div aria-hidden style={{ ...dashRule, marginTop: 8 }} />
        </header>

        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {rows.map((r, i) => (
            <li key={r.p.url} style={{ marginBottom: 10, animation: "inkBleed 0.7s ease-out both", animationDelay: `${i * 90}ms` }}>
              <a
                href={r.href}
                {...(r.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="rcpt-row"
                style={rowLink}
              >
                <div style={lineMain}>
                  <span style={{ flex: "0 0 auto" }}>RCPT #{r.rcpt}</span>
                  <span aria-hidden style={dotFill} />
                  <span style={projectCell}>{r.slug}</span>
                  <span aria-hidden style={dotFill} />
                  <span style={{ flex: "0 0 auto" }}>{r.year}</span>
                </div>
                <div style={lineSub}>
                  &gt; {r.p.category.toUpperCase()} — {r.p.desc}
                </div>
              </a>
            </li>
          ))}
        </ul>

        <div aria-hidden style={{ ...dashRule, marginTop: 18 }} />
        <div style={footerRow}>
          <span>SUBTOTAL ITEMS</span>
          <span>{rows.length} OF 39</span>
        </div>
        <div style={{ ...footerRow, padding: "2px 2px 0" }}>
          <span>PMT METHOD</span>
          <span>OWNED · OUTRIGHT</span>
        </div>
        <div style={{ textAlign: "center", marginTop: 16, fontSize: 18, color: FAINT_BLUE, letterSpacing: "0.22em" }}>
          ~~~ THANK YOU ~~~
        </div>
        <div style={{ textAlign: "center", fontSize: 14, color: "#777", marginTop: 4, letterSpacing: "0.18em" }}>
          KEEP RECEIPT FOR YR RECORDS
        </div>

        <div aria-hidden style={perfBottom} />
      </div>

      <style>{`
        @keyframes rollerJitter {
          0%, 100% { transform: translate3d(0,0,0); }
          25% { transform: translate3d(-0.4px, 0.3px, 0); }
          50% { transform: translate3d(0.5px, -0.2px, 0); }
          75% { transform: translate3d(-0.2px, 0.5px, 0); }
        }
        @keyframes inkBleed {
          0% { opacity: 0; filter: blur(1.4px); transform: translateY(4px); }
          100% { opacity: 1; filter: blur(0); transform: translateY(0); }
        }
        .rcpt-row:hover { background: ${INK}; color: ${PAPER} !important; }
        .rcpt-row:hover * { color: ${PAPER} !important; }
      `}</style>
    </section>
  );
}

const fadeStyle: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  background:
    "linear-gradient(180deg, rgba(251,251,251,0) 0%, rgba(232,228,220,0.35) 35%, rgba(232,228,220,0.4) 65%, rgba(251,251,251,0) 100%)",
  pointerEvents: "none",
};

const grainStyle: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.025) 0 1px, transparent 1px 3px)",
  mixBlendMode: "multiply",
  pointerEvents: "none",
};

const stripStyle: React.CSSProperties = {
  position: "relative",
  width: "100%",
  maxWidth: 520,
  margin: "0 auto",
  background: PAPER,
  padding: "28px 22px 40px",
  boxShadow: "0 0 0 1px rgba(0,0,0,0.04), 0 18px 40px -22px rgba(0,0,0,0.25)",
  color: INK,
  animation: "rollerJitter 1.6s steps(8) infinite",
};

const perfTop: React.CSSProperties = {
  position: "absolute",
  top: -1,
  left: 0,
  right: 0,
  height: 8,
  backgroundImage: "radial-gradient(circle at 6px 4px, #FBFBFB 3px, transparent 3.5px)",
  backgroundSize: "12px 8px",
};

const perfBottom: React.CSSProperties = { ...perfTop, top: "auto", bottom: -1, transform: "rotate(180deg)" };

const dashRule: React.CSSProperties = {
  marginTop: 14,
  borderTop: `1px dashed ${INK}`,
  opacity: 0.55,
};

const headerRow: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: 16,
  letterSpacing: "0.06em",
  color: "#444",
  padding: "8px 2px 0",
};

const rowLink: React.CSSProperties = {
  display: "block",
  padding: "6px 8px 7px",
  textDecoration: "none",
  color: INK,
  borderRadius: 2,
  transition: "background 80ms ease, color 80ms ease",
};

const lineMain: React.CSSProperties = {
  display: "flex",
  alignItems: "baseline",
  gap: 10,
  fontSize: 22,
  lineHeight: 1.05,
  letterSpacing: "0.04em",
};

const dotFill: React.CSSProperties = {
  flex: "1 1 auto",
  borderBottom: `1px dotted currentColor`,
  opacity: 0.45,
  transform: "translateY(-4px)",
};

const projectCell: React.CSSProperties = {
  flex: "0 0 auto",
  whiteSpace: "nowrap",
  maxWidth: 240,
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const lineSub: React.CSSProperties = {
  fontSize: 15,
  color: CARBON,
  marginTop: 1,
  paddingLeft: 2,
  letterSpacing: "0.02em",
  opacity: 0.78,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  fontStyle: "italic",
  transform: "translateY(-1px) skewX(-3deg)",
};

const footerRow: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: 18,
  color: "#333",
  padding: "10px 2px 0",
  letterSpacing: "0.06em",
};
