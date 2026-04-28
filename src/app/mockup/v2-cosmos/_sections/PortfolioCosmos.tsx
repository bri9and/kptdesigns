"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { portfolio } from "@/lib/portfolio";

const VOID = "#02030A";
const STAR = "#F8F8FF";
const PLASMA = "#7B5BFF";
const GREY = "#9BA3C7";
const EASE = [0.16, 1, 0.3, 1] as const;
const MONO = "'JetBrains Mono', ui-monospace, monospace";

const STAR_FIELD =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='800'>` +
      `<rect width='100%' height='100%' fill='${VOID}'/>` +
      Array.from({ length: 140 })
        .map(() => {
          const x = Math.floor(Math.random() * 800);
          const y = Math.floor(Math.random() * 800);
          const r = (Math.random() * 1.1 + 0.2).toFixed(2);
          const o = (Math.random() * 0.55 + 0.1).toFixed(2);
          return `<circle cx='${x}' cy='${y}' r='${r}' fill='white' opacity='${o}'/>`;
        })
        .join("") +
      `</svg>`,
  );

const TICK_BASE: React.CSSProperties = {
  position: "absolute", width: 14, height: 14,
  borderColor: "rgba(248,248,255,0.55)", borderStyle: "solid", pointerEvents: "none",
};
const TICK_POS: Record<string, React.CSSProperties> = {
  tl: { top: 8, left: 8, borderWidth: "1px 0 0 1px" },
  tr: { top: 8, right: 8, borderWidth: "1px 1px 0 0" },
  bl: { bottom: 8, left: 8, borderWidth: "0 0 1px 1px" },
  br: { bottom: 8, right: 8, borderWidth: "0 1px 1px 0" },
};

const SECTION: React.CSSProperties = {
  position: "relative", background: VOID, color: STAR,
  padding: "140px 24px 160px", overflow: "hidden",
  fontFamily: "Inter, system-ui, sans-serif",
};
const STAR_LAYER: React.CSSProperties = {
  position: "absolute", inset: 0,
  backgroundImage: `url("${STAR_FIELD}")`, backgroundSize: "800px 800px",
  opacity: 0.5, pointerEvents: "none",
};
const NEBULA_LAYER: React.CSSProperties = {
  position: "absolute", inset: 0, pointerEvents: "none",
  background:
    "radial-gradient(circle at 15% 0%, rgba(123,91,255,0.10), transparent 55%)," +
    "radial-gradient(circle at 90% 100%, rgba(255,107,193,0.06), transparent 50%)",
};
const HEADER_RULE: React.CSSProperties = {
  display: "flex", alignItems: "center", gap: 18,
  fontFamily: MONO, fontSize: 11, letterSpacing: "0.32em",
  textTransform: "uppercase", color: PLASMA,
};
const RULE_LINE: React.CSSProperties = {
  flex: 1, height: 1,
  background: "linear-gradient(90deg, rgba(123,91,255,0.7), rgba(123,91,255,0))",
};
const HEADING: React.CSSProperties = {
  marginTop: 28, fontSize: "clamp(36px, 5.4vw, 68px)",
  fontWeight: 200, letterSpacing: "-0.01em", lineHeight: 1.05,
};
const SUBLABEL: React.CSSProperties = {
  marginTop: 18, fontFamily: MONO, fontSize: 12,
  letterSpacing: "0.18em", textTransform: "uppercase", color: GREY,
};
const GRID: React.CSSProperties = {
  display: "grid", gap: 22,
  gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
  perspective: 1400,
};
const META_ROW: React.CSSProperties = {
  display: "flex", justifyContent: "space-between", alignItems: "center",
  fontFamily: MONO, fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase",
};
const CAT_TAG: React.CSSProperties = {
  color: PLASMA, padding: "3px 8px", border: "1px solid rgba(123,91,255,0.45)",
};
const DESC: React.CSSProperties = {
  marginTop: 10, color: "rgba(248,248,255,0.72)", fontSize: 13.5, lineHeight: 1.55,
  display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
};
const FOOT_ROW: React.CSSProperties = {
  marginTop: 14, display: "flex", alignItems: "center", justifyContent: "space-between",
  fontFamily: MONO, fontSize: 11, letterSpacing: "0.12em", color: GREY,
};
const CARD_BODY: React.CSSProperties = {
  position: "relative", height: "100%", minHeight: 360,
  padding: "20px 22px 22px", display: "flex", flexDirection: "column",
  justifyContent: "space-between", gap: 16,
};

export default function PortfolioCosmos() {
  const items = portfolio.slice(0, 6);

  return (
    <section style={SECTION}>
      <div aria-hidden style={STAR_LAYER} />
      <div aria-hidden style={NEBULA_LAYER} />

      <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto" }}>
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.6, ease: EASE }}
          style={{ marginBottom: 72 }}
        >
          <div style={HEADER_RULE}>
            <span>§ 04 / SPECIMENS</span>
            <span style={RULE_LINE} />
          </div>
          <h2 style={HEADING}>
            Field catalog of
            <br />
            <span style={{ color: GREY, fontStyle: "italic" }}>shipped objects.</span>
          </h2>
          <p style={SUBLABEL}>observed and documented · 47 catalogued</p>
        </motion.header>

        <div style={GRID}>
          {items.map((p, i) => {
            const tilt = (i % 3) - 1;
            const href = p.href ?? `https://${p.url}`;
            const external = !p.href;
            const code = String(i + 1).padStart(3, "0");
            const cardStyle: React.CSSProperties = {
              position: "relative", display: "block", textDecoration: "none",
              color: STAR, minHeight: 360,
              border: "1px solid rgba(248,248,255,0.10)", background: VOID,
              transform: `rotateY(${tilt * 1.2}deg)`, transformStyle: "preserve-3d",
              transition: "border-color 700ms cubic-bezier(0.16,1,0.3,1), box-shadow 700ms cubic-bezier(0.16,1,0.3,1)",
              overflow: "hidden", isolation: "isolate",
            };
            const bgStyle: React.CSSProperties = {
              position: "absolute", inset: 0,
              backgroundImage: p.image ? `url("${p.image}")` : "linear-gradient(135deg, #1A2148 0%, #0A0E27 60%, #02030A 100%)",
              backgroundSize: "cover", backgroundPosition: "center",
              transition: "transform 1400ms cubic-bezier(0.16,1,0.3,1)",
            };
            const overlayStyle: React.CSSProperties = {
              position: "absolute", inset: 0,
              background: p.image
                ? "linear-gradient(180deg, rgba(2,3,10,0.45) 0%, rgba(2,3,10,0.78) 80%)"
                : "linear-gradient(180deg, rgba(2,3,10,0.30) 0%, rgba(2,3,10,0.70) 100%)",
              transition: "background 700ms cubic-bezier(0.16,1,0.3,1)",
            };
            const ringStyle: React.CSSProperties = {
              position: "absolute", inset: 0,
              boxShadow: "inset 0 0 0 1px rgba(123,91,255,0)",
              transition: "box-shadow 600ms cubic-bezier(0.16,1,0.3,1)",
              pointerEvents: "none",
            };

            return (
              <motion.a
                key={p.url}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1.4, ease: EASE, delay: 0.08 * i }}
                whileHover={{ y: -2 }}
                className="cosmos-specimen"
                style={cardStyle}
              >
                <div className="cosmos-bg" style={bgStyle} />
                <div className="cosmos-overlay" aria-hidden style={overlayStyle} />
                <span className="cosmos-ring" aria-hidden style={ringStyle} />
                {(["tl", "tr", "bl", "br"] as const).map((k) => (
                  <span key={k} style={{ ...TICK_BASE, ...TICK_POS[k] }} />
                ))}

                <div style={CARD_BODY}>
                  <div style={META_ROW}>
                    <span style={CAT_TAG}>{p.category}</span>
                    <span style={{ color: GREY }}>SPC-{code}</span>
                  </div>

                  <div>
                    <h3 style={{ fontSize: 22, lineHeight: 1.18, fontWeight: 400, margin: 0 }}>
                      {p.name}
                    </h3>
                    <p style={DESC}>{p.desc}</p>
                    <div style={FOOT_ROW}>
                      <span>{p.url}</span>
                      <ArrowUpRight size={14} style={{ color: STAR }} />
                    </div>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>

      <style>{`
        .cosmos-specimen:hover { border-color: rgba(248,248,255,0.22) !important; }
        .cosmos-specimen:hover .cosmos-ring { box-shadow: inset 0 0 0 1px rgba(123,91,255,0.75), 0 0 32px rgba(123,91,255,0.18); }
        .cosmos-specimen:hover .cosmos-overlay { background: linear-gradient(180deg, rgba(2,3,10,0.30) 0%, rgba(2,3,10,0.66) 80%) !important; }
        .cosmos-specimen:hover .cosmos-bg { transform: scale(1.04); }
        .cosmos-specimen:focus-visible { outline: 1px solid ${PLASMA}; outline-offset: 2px; }
        @media (max-width: 720px) { .cosmos-specimen { transform: none !important; } }
      `}</style>
    </section>
  );
}
