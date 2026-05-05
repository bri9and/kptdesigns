"use client";

import { Crimson_Pro, UnifrakturCook } from "next/font/google";
import Image from "next/image";
import { portfolio } from "@/lib/portfolio";

const crimson = Crimson_Pro({ subsets: ["latin"], weight: ["400", "600"], style: ["normal", "italic"] });
const fraktur = UnifrakturCook({ subsets: ["latin"], weight: ["700"] });

const VELLUM = "#F2E8D5";
const INK = "#1B1410";
const VERM = "#C72A1F";
const GOLD = "#D4A04A";
const MULB = "#5C2D5E";
const ROMAN = ["I", "II", "III", "IV", "V", "VI"];
const OFF = [
  { mt: 0, ml: 0, mr: 0, r: -0.4 },
  { mt: 28, ml: 12, mr: 0, r: 0.3 },
  { mt: 18, ml: 0, mr: 8, r: 0.5 },
  { mt: 6, ml: 18, mr: 0, r: -0.3 },
  { mt: 22, ml: 0, mr: 14, r: 0.2 },
  { mt: 10, ml: 6, mr: 0, r: -0.5 },
];

const Corner = ({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) => {
  const rot = { tl: 0, tr: 90, br: 180, bl: 270 }[pos];
  const place = {
    tl: { top: -10, left: -10 },
    tr: { top: -10, right: -10 },
    bl: { bottom: -10, left: -10 },
    br: { bottom: -10, right: -10 },
  }[pos];
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden
      style={{ position: "absolute", transform: `rotate(${rot}deg)`, pointerEvents: "none", ...place }}>
      <g fill="none" stroke={GOLD} strokeWidth="1" strokeLinecap="round">
        <path d="M2 22 L2 2 L22 2" />
        <path d="M5 22 C5 11, 11 5, 22 5" strokeWidth="0.8" />
        <circle cx="2" cy="2" r="2.2" fill={VERM} stroke="none" />
        <circle cx="2" cy="2" r="0.8" fill={GOLD} stroke="none" />
        <path d="M10 2 q3 -3 6 0 q-3 3 -6 0 Z" fill={GOLD} stroke="none" opacity="0.85" />
        <path d="M2 10 q-3 3 0 6 q3 -3 0 -6 Z" fill={GOLD} stroke="none" opacity="0.85" />
        <path d="M14 14 l4 -4 M14 14 l-2 6 M14 14 l6 -2" strokeWidth="0.6" opacity="0.8" />
      </g>
    </svg>
  );
};

const VermRule = () => (
  <svg viewBox="0 0 600 14" width="100%" height="14" aria-hidden style={{ display: "block" }}>
    <line x1="0" y1="7" x2="600" y2="7" stroke={VERM} strokeWidth="1.1" />
    <circle cx="300" cy="7" r="3.2" fill={VERM} />
    <circle cx="300" cy="7" r="1" fill={GOLD} />
    <path d="M270 7 q15 -7 30 0 q-15 7 -30 0 Z" fill="none" stroke={GOLD} strokeWidth="0.6" />
    <path d="M300 7 q15 -7 30 0 q-15 7 -30 0 Z" fill="none" stroke={GOLD} strokeWidth="0.6" />
  </svg>
);

const GoldRule = () => (
  <svg viewBox="0 0 600 8" width="100%" height="8" aria-hidden style={{ display: "block", opacity: 0.75 }}>
    <line x1="0" y1="4" x2="600" y2="4" stroke={GOLD} strokeWidth="0.5" />
    <circle cx="300" cy="4" r="1.6" fill={GOLD} />
  </svg>
);

export default function PortfolioCodex() {
  const plates = portfolio.slice(0, 6);
  return (
    <section className={crimson.className} style={{
      position: "relative", background: VELLUM, color: INK,
      padding: "96px clamp(20px, 6vw, 88px) 120px", overflow: "hidden",
    }}>
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(rgba(27,20,16,0.08) 1px, transparent 1px), radial-gradient(rgba(92,45,94,0.05) 1px, transparent 1px)",
        backgroundSize: "3px 3px, 7px 7px", backgroundPosition: "0 0, 1px 2px",
        opacity: 0.55, mixBlendMode: "multiply",
      }} />
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(circle at 0% 0%, rgba(27,20,16,0.18), transparent 12%), radial-gradient(circle at 100% 0%, rgba(27,20,16,0.18), transparent 12%), radial-gradient(circle at 0% 100%, rgba(27,20,16,0.22), transparent 14%), radial-gradient(circle at 100% 100%, rgba(27,20,16,0.22), transparent 14%)",
      }} />

      <div style={{ position: "relative", maxWidth: 1180, margin: "0 auto" }}>
        <header style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ fontFamily: "ui-monospace, monospace", fontSize: 11, letterSpacing: "0.42em", color: MULB, textTransform: "uppercase", marginBottom: 14 }}>
            Folio IV &middot; recto
          </div>
          <h2 className={fraktur.className} style={{ fontSize: "clamp(38px, 5.8vw, 76px)", lineHeight: 1.02, color: INK, margin: 0, fontWeight: 700 }}>
            Chapter <span style={{ color: VERM }}>IV</span>
            <span style={{ color: GOLD, padding: "0 0.35em", fontSize: "0.6em", verticalAlign: "0.2em" }}>&#10086;</span>
            Of Miniatures
          </h2>
          <p style={{ maxWidth: 640, margin: "18px auto 22px", fontStyle: "italic", fontSize: 17, color: "#3a2a22", lineHeight: 1.55 }}>
            &mdash; Herein are illuminated the works of our hand: registrar, host, designer &amp; builder
            entwined; rendered in plate &amp; gold for the patron&apos;s perusal.
          </p>
          <div style={{ maxWidth: 600, margin: "0 auto" }}><VermRule /></div>
        </header>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))",
          gap: "56px clamp(28px, 5vw, 80px)", alignItems: "start",
        }}>
          {plates.map((p, i) => {
            const o = OFF[i];
            const link = p.href ?? `https://${p.url}`;
            const ext = !p.href;
            return (
              <a key={p.url} href={link}
                {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                style={{
                  display: "block", textDecoration: "none", color: "inherit",
                  marginTop: o.mt, marginLeft: o.ml, marginRight: o.mr,
                  transform: `rotate(${o.r}deg)`,
                  transition: "transform 600ms cubic-bezier(.2,.7,.2,1), filter 600ms",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "rotate(0deg) translateY(-2px)";
                  e.currentTarget.style.filter = "drop-shadow(0 14px 18px rgba(27,20,16,0.18))";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = `rotate(${o.r}deg)`;
                  e.currentTarget.style.filter = "none";
                }}>
                <figure style={{ margin: 0, position: "relative" }}>
                  <div style={{
                    position: "relative", padding: 10, border: `1px solid ${GOLD}`,
                    outline: `1px solid ${VERM}`, outlineOffset: 4,
                    background: "linear-gradient(135deg, rgba(212,160,74,0.12), rgba(199,42,31,0.06) 50%, rgba(92,45,94,0.10))",
                    boxShadow: "inset 0 0 0 1px rgba(212,160,74,0.55)",
                  }}>
                    <Corner pos="tl" /><Corner pos="tr" /><Corner pos="bl" /><Corner pos="br" />
                    <div style={{
                      position: "relative", aspectRatio: "4 / 3", overflow: "hidden",
                      background: "#1B1410", border: `1px solid ${INK}`,
                    }}>
                      {p.image ? (
                        <Image src={p.image} alt={p.name} fill
                          sizes="(min-width: 768px) 50vw, 100vw"
                          style={{ objectFit: "cover", filter: "sepia(0.18) saturate(0.92) contrast(1.05)" }} />
                      ) : (
                        <div className={fraktur.className} style={{
                          position: "absolute", inset: 0, display: "flex",
                          alignItems: "center", justifyContent: "center", color: GOLD, fontSize: 64,
                        }}>{ROMAN[i]}</div>
                      )}
                      <div aria-hidden style={{
                        position: "absolute", inset: 0,
                        boxShadow: `inset 0 0 0 2px ${GOLD}, inset 0 0 24px rgba(212,160,74,0.35)`,
                        mixBlendMode: "screen",
                      }} />
                    </div>
                  </div>
                  <figcaption style={{ paddingTop: 18, position: "relative" }}>
                    <div style={{ fontVariant: "small-caps", letterSpacing: "0.18em", fontSize: 12, color: VERM, marginBottom: 4 }}>
                      Folio &middot; Mn.{ROMAN[i]}
                    </div>
                    <h3 className={fraktur.className} style={{
                      fontSize: "clamp(22px, 2.4vw, 28px)", margin: "0 0 6px",
                      color: INK, lineHeight: 1.05, fontWeight: 700,
                    }}>{p.name}</h3>
                    <div style={{ fontStyle: "italic", color: MULB, fontSize: 15, marginBottom: 8 }}>{p.category}</div>
                    <p style={{ margin: "0 0 14px", fontSize: 16, lineHeight: 1.5, color: "#2a1f19", maxWidth: "46ch" }}>
                      {p.desc}
                    </p>
                    <div style={{
                      display: "flex", justifyContent: "flex-end",
                      fontVariant: "small-caps", letterSpacing: "0.12em",
                      fontSize: 11, fontStyle: "italic", color: MULB, opacity: 0.85,
                    }}>&mdash;&thinsp;{p.url}</div>
                  </figcaption>
                </figure>
                {i < plates.length - 2 && (
                  <div style={{ marginTop: 36, opacity: i % 2 === 1 ? 1 : 0 }}><GoldRule /></div>
                )}
              </a>
            );
          })}
        </div>

        <div style={{ marginTop: 72, maxWidth: 520, marginInline: "auto" }}>
          <VermRule />
          <div className={fraktur.className} style={{ textAlign: "center", marginTop: 18, color: MULB, fontSize: 22 }}>
            Explicit capitulum quartum
          </div>
        </div>
      </div>
    </section>
  );
}
