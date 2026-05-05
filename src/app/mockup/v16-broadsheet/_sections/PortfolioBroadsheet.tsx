"use client";

import {
  Playfair_Display,
  Source_Serif_4,
  Bodoni_Moda,
  IBM_Plex_Mono,
} from "next/font/google";
import { portfolio, type PortfolioItem } from "@/lib/portfolio";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "900"],
  display: "swap",
});
const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  display: "swap",
});
const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

// Wire-service style city datelines — fictional but consistent
const DATELINES = [
  "PITTSBURGH (KPT) — 2024",
  "SOUTH HILLS (KPT) — 2023",
  "BLOOMFIELD (KPT) — 2024",
  "TEMPE WIRE (KPT) — 2024",
  "PHOENIX (KPT) — 2023",
  "TEMPE (KPT) — 2024",
] as const;

const FILED_AT = ["06:14 EST", "11:02 EST", "14:47 EST", "08:33 MST", "16:21 MST", "09:58 MST"] as const;

const CSS = `
  .v16port { position: relative; background: #F5F0E1; color: #1A1A1A; padding: 96px 0 120px; overflow: hidden; }
  .v16port::before { content: ""; position: absolute; inset: 0; pointer-events: none; background-image: radial-gradient(circle at 20% 30%, rgba(26,26,26,0.04) 0.5px, transparent 1px), radial-gradient(circle at 70% 65%, rgba(26,26,26,0.03) 0.5px, transparent 1px), radial-gradient(circle at 45% 80%, rgba(26,26,26,0.035) 0.5px, transparent 1px); background-size: 4px 4px, 6px 6px, 5px 5px; mix-blend-mode: multiply; opacity: 0.7; }
  .v16port-wrap { max-width: 1240px; margin: 0 auto; padding: 0 28px; position: relative; }
  .v16port-head { display: flex; align-items: baseline; justify-content: space-between; gap: 24px; padding-bottom: 14px; border-bottom: 4px double #1A1A1A; }
  .v16port-eyebrow { font-size: 11px; letter-spacing: 0.28em; text-transform: uppercase; color: #1A1A1A; }
  .v16port-eyebrow .red { color: #A4262C; font-weight: 500; }
  .v16port-folio { font-size: 10.5px; letter-spacing: 0.22em; text-transform: uppercase; color: #555; }
  .v16port-rule-red { height: 3px; background: #A4262C; margin-top: 6px; }
  .v16port-rule-thin { height: 1px; background: #1A1A1A; margin-top: 3px; opacity: 0.55; }
  .v16port-title { margin: 28px 0 6px; font-size: clamp(38px, 5.6vw, 68px); line-height: 0.98; letter-spacing: -0.012em; font-weight: 900; }
  .v16port-deck { font-size: 17px; line-height: 1.45; color: #2A2A2A; max-width: 64ch; font-style: italic; font-weight: 500; }
  .v16port-mast { display: flex; gap: 28px; flex-wrap: wrap; align-items: center; margin-top: 18px; padding: 10px 0; border-top: 1px solid #1A1A1A; border-bottom: 1px solid #1A1A1A; font-size: 10.5px; letter-spacing: 0.2em; text-transform: uppercase; color: #1A1A1A; }
  .v16port-mast span.dot { color: #A4262C; }
  .v16port-grid { margin-top: 44px; display: grid; grid-template-columns: 1fr; gap: 0; position: relative; }
  @media (min-width: 768px) { .v16port-grid { grid-template-columns: 1fr 1fr; column-gap: 48px; } .v16port-grid::before { content: ""; pointer-events: none; position: absolute; top: 0; bottom: 0; left: 50%; width: 1px; background-image: linear-gradient(to bottom, #1A1A1A 50%, transparent 0); background-size: 1px 6px; opacity: 0.35; transform: translateX(-0.5px); } }
  .v16port-brief { display: grid; grid-template-columns: 88px 1fr; gap: 18px; padding: 28px 0; position: relative; color: inherit; text-decoration: none; border-top: 1px solid rgba(26,26,26,0.18); }
  .v16port-brief:first-child, .v16port-brief:nth-child(2) { border-top: none; padding-top: 8px; }
  .v16port-brief::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 4px; background-image: radial-gradient(circle, #1A1A1A 0.9px, transparent 1.2px); background-size: 5px 4px; background-repeat: repeat-x; opacity: 0.45; }
  .v16port-brief:last-child::after { display: none; }
  @media (min-width: 768px) { .v16port-brief:nth-last-child(2):nth-child(odd)::after { display: none; } }
  .v16port-thumb { width: 88px; height: 88px; position: relative; flex-shrink: 0; background: #E8E0CC; }
  .v16port-thumb-inner { position: absolute; inset: 4px; background-size: cover; background-position: center; filter: grayscale(1) contrast(1.55) brightness(1.05); }
  .v16port-thumb-inner::after { content: ""; position: absolute; inset: 0; background-image: radial-gradient(circle, rgba(26,26,26,0.85) 0.7px, transparent 1.1px); background-size: 3px 3px; mix-blend-mode: multiply; opacity: 0.65; }
  .v16port-thumb-inner::before { content: ""; position: absolute; inset: 0; background-image: radial-gradient(circle, rgba(245,240,225,0.7) 0.5px, transparent 1px); background-size: 2.5px 2.5px; mix-blend-mode: screen; opacity: 0.5; }
  .v16port-thumb::before { content: ""; position: absolute; inset: 0; pointer-events: none; background: linear-gradient(#1A1A1A,#1A1A1A) top left / 100% 4px no-repeat, linear-gradient(#1A1A1A,#1A1A1A) bottom left / 100% 4px no-repeat, linear-gradient(#1A1A1A,#1A1A1A) top left / 4px 100% no-repeat, linear-gradient(#1A1A1A,#1A1A1A) top right / 4px 100% no-repeat; -webkit-mask-image: radial-gradient(circle, #000 0.7px, transparent 1.1px); mask-image: radial-gradient(circle, #000 0.7px, transparent 1.1px); -webkit-mask-size: 3px 3px; mask-size: 3px 3px; }
  .v16port-thumb-fallback { position: absolute; inset: 4px; background: repeating-linear-gradient(45deg,#C9C0A8 0 3px,#9F9577 3px 6px); }
  .v16port-body { min-width: 0; }
  .v16port-dateline { font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; color: #1A1A1A; margin-bottom: 6px; }
  .v16port-dateline .em { color: #A4262C; font-weight: 500; }
  .v16port-headline { font-size: clamp(20px, 2.1vw, 26px); line-height: 1.08; letter-spacing: -0.005em; font-weight: 600; margin: 2px 0 4px; color: #1A1A1A; }
  .v16port-deckline { font-size: 13.5px; line-height: 1.3; color: #4A4A4A; font-style: italic; margin-bottom: 8px; }
  .v16port-text { font-size: 15px; line-height: 1.5; color: #1A1A1A; margin: 0; }
  .v16port-foot { margin-top: 8px; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: #555; display: flex; justify-content: space-between; gap: 12px; }
  .v16port-foot .more { color: #A4262C; }
  .v16port-brief:hover .v16port-headline { text-decoration: underline; text-decoration-thickness: 1.5px; text-underline-offset: 3px; }
  .v16port-brief:hover .v16port-thumb-inner { filter: grayscale(1) contrast(1.7) brightness(0.95); }
  .v16port-tail { margin-top: 56px; padding-top: 12px; border-top: 4px double #1A1A1A; display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap; font-size: 10.5px; letter-spacing: 0.22em; text-transform: uppercase; color: #1A1A1A; }
  .v16port-tail .red { color: #A4262C; }
  .v16port-tail .end { font-weight: 600; }
`;

function briefHref(p: PortfolioItem) {
  return p.href ? { href: p.href, external: false } : { href: `https://${p.url}`, external: true };
}

export default function PortfolioBroadsheet() {
  const briefs = portfolio.slice(0, 6);
  return (
    <section id="roster" className={`${sourceSerif.className} v16port`}>
      <style>{CSS}</style>
      <div className="v16port-wrap">
        <div className="v16port-head">
          <div className={`${mono.className} v16port-eyebrow`}>
            <span className="red">█</span>&nbsp;CLIENT ROSTER · PAGE 04
          </div>
          <div className={`${mono.className} v16port-folio`}>SECTION D · WIRE BUREAU</div>
        </div>
        <div className="v16port-rule-red" />
        <div className="v16port-rule-thin" />

        <h2 className={`${playfair.className} v16port-title`}>
          Wire Briefs from the Roster
        </h2>
        <p className={`${bodoni.className} v16port-deck`}>
          Filed dispatches from the bureau — six clients in active rotation, datelines below.
          Compiled from staff reporting and on-site visits.
        </p>

        <div className={`${mono.className} v16port-mast`}>
          <span>VOL. XII</span>
          <span className="dot">·</span>
          <span>NO. 04</span>
          <span className="dot">·</span>
          <span>WIRE EDITION</span>
          <span className="dot">·</span>
          <span>FILED FROM TWO COASTS</span>
        </div>

        <div className="v16port-grid">
          {briefs.map((p, i) => {
            const link = briefHref(p);
            const filed = FILED_AT[i % FILED_AT.length];
            const dateline = DATELINES[i % DATELINES.length];
            return (
              <a
                key={p.url}
                href={link.href}
                {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="v16port-brief"
              >
                <div className="v16port-thumb" aria-hidden="true">
                  {p.image ? (
                    <div
                      className="v16port-thumb-inner"
                      style={{ backgroundImage: `url(${p.image})` }}
                    />
                  ) : (
                    <div className="v16port-thumb-fallback" />
                  )}
                </div>
                <div className="v16port-body">
                  <div className={`${mono.className} v16port-dateline`}>
                    <span className="em">▲</span>&nbsp;{dateline}
                  </div>
                  <h3 className={`${bodoni.className} v16port-headline`}>{p.name}</h3>
                  <div className={`${bodoni.className} v16port-deckline`}>
                    — {p.category} dispatch —
                  </div>
                  <p className="v16port-text">{p.desc}</p>
                  <div className={`${mono.className} v16port-foot`}>
                    <span>FILED {filed}</span>
                    <span className="more">CONT&apos;D ▸ {p.url.toUpperCase()}</span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        <div className={`${mono.className} v16port-tail`}>
          <span>— END OF WIRE COPY —</span>
          <span className="red">▼ SEE PAGE 05 FOR PROCESS</span>
          <span className="end">— 30 —</span>
        </div>
      </div>
    </section>
  );
}
