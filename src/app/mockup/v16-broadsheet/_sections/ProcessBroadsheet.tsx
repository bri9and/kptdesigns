"use client";

import { Playfair_Display, Source_Serif_4, Bodoni_Moda, IBM_Plex_Mono } from "next/font/google";
import type { CSSProperties, ReactNode } from "react";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500"], style: ["normal", "italic"], variable: "--font-playfair-bs", display: "swap" });
const sourceSerif = Source_Serif_4({ subsets: ["latin"], weight: ["400", "600"], style: ["normal", "italic"], variable: "--font-source-bs", display: "swap" });
const bodoni = Bodoni_Moda({ subsets: ["latin"], weight: ["400", "700", "900"], variable: "--font-bodoni-bs", display: "swap" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-bs", display: "swap" });

const DECK = "var(--font-bodoni-bs), 'Bodoni 72', serif";
const HEAD = "var(--font-playfair-bs), 'Old Standard TT', serif";
const BODY = "var(--font-source-bs), 'Source Serif Pro', serif";
const MONO = "var(--font-plex-bs), ui-monospace, monospace";
const CREAM = "#F5F0E1", INK = "#1A1A1A", GREY = "#999", RED = "#A4262C", YELLOW = "#F4E97D";

const HALFTONE: CSSProperties = {
  height: 14,
  backgroundImage: `radial-gradient(${INK} 28%, transparent 30%)`,
  backgroundSize: "6px 6px",
  backgroundRepeat: "repeat-x",
  backgroundPosition: "0 50%",
  opacity: 0.55,
};

const sw = 2.2;
type Step = { num: string; title: string; body: string; svg: ReactNode };
const STEPS: Step[] = [
  {
    num: "01",
    title: "The Call",
    body: "A 30-minute conversation. We listen, take notes, scope the project. No slide decks, no sales theatre — just the facts of what you need built and why.",
    svg: (
      <svg viewBox="0 0 200 140" aria-hidden role="img">
        <path d="M40 96 C 40 60, 64 36, 100 36 C 136 36, 160 60, 160 96" fill="none" stroke={INK} strokeWidth={sw} />
        <rect x="34" y="92" width="28" height="34" rx="4" fill="none" stroke={INK} strokeWidth={sw} />
        <rect x="138" y="92" width="28" height="34" rx="4" fill="none" stroke={INK} strokeWidth={sw} />
        <path d="M62 110 q 38 22, 76 0" fill="none" stroke={RED} strokeWidth="2" strokeDasharray="3 4" />
        <circle cx="100" cy="110" r="3" fill={RED} />
        <text x="100" y="22" textAnchor="middle" fontFamily={MONO} fontSize="9" fill={INK} letterSpacing="2">INBOUND · 00:30</text>
      </svg>
    ),
  },
  {
    num: "02",
    title: "The Build",
    body: "Design and code, hand-fitted. Weekly review meetings keep the work honest. Revisions until the page holds together — typography, structure, and copy correct.",
    svg: (
      <svg viewBox="0 0 200 140" aria-hidden role="img">
        <rect x="22" y="22" width="156" height="100" rx="3" fill="none" stroke={INK} strokeWidth={sw} />
        <line x1="22" y1="40" x2="178" y2="40" stroke={INK} strokeWidth="2" />
        <circle cx="32" cy="31" r="2.2" fill={INK} /><circle cx="40" cy="31" r="2.2" fill={INK} /><circle cx="48" cy="31" r="2.2" fill={INK} />
        <line x1="34" y1="56" x2="92" y2="56" stroke={INK} strokeWidth="2" />
        <line x1="34" y1="68" x2="120" y2="68" stroke={INK} strokeWidth="2" />
        <line x1="34" y1="80" x2="74" y2="80" stroke={RED} strokeWidth={sw} />
        <line x1="84" y1="80" x2="138" y2="80" stroke={INK} strokeWidth="2" />
        <line x1="34" y1="92" x2="160" y2="92" stroke={INK} strokeWidth="2" />
        <line x1="34" y1="104" x2="100" y2="104" stroke={INK} strokeWidth="2" />
        <path d="M148 102 l8 -8 6 6 -8 8 z" fill={YELLOW} stroke={INK} strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "The Review",
    body: "Private staging URL. Client walkthrough, side-by-side with the brief. Approval is a signature, not a guess. Then a clean public deploy with cache primed.",
    svg: (
      <svg viewBox="0 0 200 140" aria-hidden role="img">
        <ellipse cx="100" cy="76" rx="78" ry="34" fill="none" stroke={INK} strokeWidth={sw} />
        <ellipse cx="100" cy="76" rx="46" ry="20" fill="none" stroke={INK} strokeWidth="2" />
        <circle cx="100" cy="76" r="12" fill={CREAM} stroke={INK} strokeWidth={sw} />
        <circle cx="100" cy="76" r="5" fill={RED} />
        <line x1="100" y1="42" x2="100" y2="34" stroke={INK} strokeWidth="2" />
        <line x1="100" y1="118" x2="100" y2="110" stroke={INK} strokeWidth="2" />
        <text x="100" y="128" textAnchor="middle" fontFamily={MONO} fontSize="9" fill={INK} letterSpacing="2">STAGING · APPROVED</text>
      </svg>
    ),
  },
  {
    num: "04",
    title: "The Delivery",
    body: "Repository, deployment, and documentation transferred to your accounts. Optional KPT Agents integration for inbound AI phone handling. You own all of it, outright.",
    svg: (
      <svg viewBox="0 0 200 140" aria-hidden role="img">
        <path d="M30 110 L30 56 L100 28 L170 56 L170 110 Z" fill="none" stroke={INK} strokeWidth={sw} />
        <path d="M30 56 L100 84 L170 56" fill="none" stroke={INK} strokeWidth={sw} />
        <line x1="100" y1="84" x2="100" y2="120" stroke={INK} strokeWidth={sw} />
        <rect x="80" y="92" width="40" height="22" fill={CREAM} stroke={INK} strokeWidth="2" />
        <line x1="100" y1="92" x2="100" y2="114" stroke={INK} strokeWidth="2" />
        <circle cx="156" cy="36" r="9" fill={YELLOW} stroke={INK} strokeWidth="1.8" />
        <path d="M152 36 l3 3 6 -7" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" />
        <text x="100" y="22" textAnchor="middle" fontFamily={MONO} fontSize="9" fill={RED} letterSpacing="2">DEED · TRANSFERRED</text>
      </svg>
    ),
  },
];

const KICKER: CSSProperties = { fontFamily: MONO, fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: INK };

export default function ProcessBroadsheet() {
  return (
    <section
      className={`${playfair.variable} ${sourceSerif.variable} ${bodoni.variable} ${plexMono.variable}`}
      style={{ background: CREAM, color: INK, padding: "88px clamp(20px, 4vw, 56px) 96px", borderTop: `1px solid ${INK}`, borderBottom: `1px solid ${INK}` }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
          <span style={KICKER}>Feature</span>
          <span style={{ ...KICKER, color: GREY }}>·</span>
          <span style={KICKER}>Lifestyle</span>
          <span style={{ ...KICKER, color: GREY }}>·</span>
          <span style={{ ...KICKER, color: GREY }}>Page 05</span>
          <span style={{ flex: 1, height: 3, background: RED, marginLeft: 6, marginBottom: 2 }} />
        </div>

        <h2
          style={{
            fontFamily: DECK, fontWeight: 900,
            fontSize: "clamp(34px, 5.4vw, 68px)", lineHeight: 0.98, letterSpacing: "-0.012em",
            margin: "22px 0 10px", textTransform: "uppercase", maxWidth: "18ch",
          }}
        >
          From Call to Code: a Four-Step Guide to Commissioning Work from KPT
        </h2>
        <p style={{ fontFamily: HEAD, fontStyle: "italic", fontSize: "clamp(15px, 1.4vw, 18px)", color: "#3a3a3a", margin: "0 0 28px", maxWidth: "62ch" }}>
          A how-to feature, filed from the desk of the proprietor. Plain English, in four parts, on the path a new project takes from first phone call to handed-over keys.
        </p>

        <div style={HALFTONE} />

        <ol
          style={{
            listStyle: "none", padding: 0, margin: "26px 0 0",
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            columnGap: 56, rowGap: 0,
          }}
        >
          {STEPS.map((s, i) => (
            <li key={s.num} style={{ paddingBlock: 28, borderTop: i > 1 ? `1px dotted ${GREY}` : undefined }}>
              <div style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
                <div style={{ flex: "0 0 96px" }}>
                  <div style={{ width: 96, height: 70, border: `1px solid ${INK}`, background: CREAM, display: "grid", placeItems: "center", overflow: "hidden" }}>
                    <div style={{ width: 84, height: 60 }}>{s.svg}</div>
                  </div>
                  <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: "0.2em", color: GREY, marginTop: 4, textAlign: "center" }}>FIG. {s.num}</div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: DECK, fontWeight: 900, fontSize: 13, letterSpacing: "0.22em", textTransform: "uppercase", color: RED, marginBottom: 4 }}>
                    Step {s.num}
                  </div>
                  <h3 style={{ fontFamily: HEAD, fontWeight: 500, fontSize: "clamp(24px, 2.4vw, 32px)", lineHeight: 1.05, letterSpacing: "-0.005em", margin: "0 0 10px" }}>
                    {s.title}
                  </h3>
                  <p style={{ fontFamily: BODY, fontSize: "clamp(16px, 1.18vw, 18px)", lineHeight: 1.55, color: INK, margin: 0, maxWidth: "38ch" }}>
                    {s.body}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div style={{ ...HALFTONE, marginTop: 28 }} />

        <div style={{ ...KICKER, color: GREY, marginTop: 18, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
          <span>Filed by the Editor · Continued on Page 06</span>
          <span>KPT Designs · Est. 2004</span>
        </div>
      </div>
    </section>
  );
}
