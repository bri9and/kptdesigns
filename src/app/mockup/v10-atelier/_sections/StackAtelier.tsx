import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500"], display: "swap" });

const CHAMPAGNE = "#F4E4DC";
const INK = "#1A1612";
const GOLD = "#C9A861";
const OXBLOOD = "#5E1A1A";
const CHARCOAL = "#3A3530";

type Atelier = {
  index: string;
  name: string;
  maison: string;
  tagline: string;
  body: string;
  ornament: "monogram" | "shears" | "thread" | "compass" | "globe" | "bell";
  align: "left" | "right";
};

const ATELIERS: Atelier[] = [
  {
    index: "I", name: "ATELIER NEXT.JS", maison: "Maison du Cadre",
    tagline: "framework, sixteenth collection",
    body: "The pattern table where every silhouette is drafted. Routes laid like seam allowances, edges streamed before the visitor has finished their first breath at the boutique.",
    ornament: "monogram", align: "left",
  },
  {
    index: "II", name: "ATELIER REACT", maison: "Maison des Composants",
    tagline: "engine of construction",
    body: "Small declarative pieces, hand-stitched and recomposed. The looms run at server and client both, weaving interface from pure intention.",
    ornament: "shears", align: "right",
  },
  {
    index: "III", name: "ATELIER TAILWIND", maison: "Maison du Style",
    tagline: "utility couture, no waste",
    body: "Every utility a thread already cut to size. Style placed directly upon the garment of markup — discipline by constraint, beauty by economy.",
    ornament: "thread", align: "left",
  },
  {
    index: "IV", name: "ATELIER TYPESCRIPT", maison: "Maison de Précision",
    tagline: "every type checked, every fit measured",
    body: "The fitting room of the house. Each variable confessed, each contract honoured. Errors caught at the writing desk, never at the runway.",
    ornament: "compass", align: "right",
  },
  {
    index: "V", name: "ATELIER VERCEL", maison: "Maison Globale",
    tagline: "194 boutiques worldwide",
    body: "The vitrine on every avenue at once. Your collection served from the nearest holding to your visitor — cold starts retired, the page already in their arrondissement.",
    ornament: "globe", align: "left",
  },
  {
    index: "VI", name: "MAISON KPT AGENTS", maison: "Maison de Réception",
    tagline: "votre standardiste IA, available 24h",
    body: "The front-of-house. A patient voice on the line at every hour from sister house KPT Agents — taking bookings, triaging enquiries, never losing composure while you sleep.",
    ornament: "bell", align: "right",
  },
];

function Ornament({ kind, color = GOLD }: { kind: Atelier["ornament"]; color?: string }) {
  const s = { stroke: color, strokeWidth: 0.7, fill: "none" as const };
  const paths: Record<Atelier["ornament"], React.ReactNode> = {
    monogram: (<>
      <path d="M14 30 L14 14 L22 24 L30 14 L30 30" {...s} />
      <circle cx="22" cy="22" r="1.4" fill={color} />
    </>),
    shears: (<>
      <circle cx="16" cy="28" r="3" {...s} />
      <circle cx="28" cy="28" r="3" {...s} />
      <path d="M18 26 L30 12 M26 26 L14 12" {...s} />
    </>),
    thread: (<>
      <path d="M10 22 Q16 14 22 22 T34 22" {...s} />
      <path d="M10 26 Q16 18 22 26 T34 26" {...s} />
      <circle cx="22" cy="22" r="1" fill={color} />
    </>),
    compass: (<>
      <path d="M22 8 L22 36 M8 22 L36 22" {...s} />
      <path d="M22 14 L26 22 L22 30 L18 22 Z" {...s} />
      <circle cx="22" cy="22" r="1.2" fill={color} />
    </>),
    globe: (<>
      <ellipse cx="22" cy="22" rx="8" ry="18" {...s} />
      <path d="M4 22 H40" {...s} />
      <path d="M8 14 H36 M8 30 H36" {...s} strokeOpacity="0.55" />
    </>),
    bell: (<>
      <path d="M22 12 C16 12 14 18 14 24 L14 28 L30 28 L30 24 C30 18 28 12 22 12 Z" {...s} />
      <path d="M20 28 Q22 32 24 28" {...s} />
      <circle cx="22" cy="11" r="1" fill={color} />
    </>),
  };
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden>
      <circle cx="22" cy="22" r="18" {...s} />
      {paths[kind]}
    </svg>
  );
}

const NOISE = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.10  0 0 0 0 0.08  0 0 0 0 0.07  0 0 0 0.05 0'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.55'/></svg>\")";

export default function StackAtelier() {
  return (
    <section
      className={inter.className}
      style={{
        background: CHAMPAGNE,
        color: INK,
        padding: "clamp(80px, 9vw, 144px) clamp(20px, 5vw, 88px)",
        position: "relative",
        backgroundImage: `radial-gradient(circle at 14% 12%, rgba(94,26,26,0.05), transparent 55%), radial-gradient(circle at 86% 90%, rgba(201,168,97,0.10), transparent 60%), ${NOISE}`,
      }}
    >
      <header style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", gap: "clamp(20px, 3vw, 48px)", paddingBottom: "clamp(40px, 5vw, 72px)" }}>
        <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${GOLD})` }} />
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 11, letterSpacing: "0.42em", color: CHARCOAL, fontWeight: 500 }}>
            ATELIERS &nbsp;·&nbsp; LES MAISONS
          </div>
          <div className={playfair.className} style={{ marginTop: 14, fontSize: "clamp(34px, 5vw, 64px)", lineHeight: 1.02, fontWeight: 400, letterSpacing: "-0.01em", color: INK }}>
            <span style={{ fontStyle: "italic", color: OXBLOOD }}>les six</span> maisons
            <span style={{ color: GOLD }}> &mdash; </span>
            <span style={{ fontStyle: "italic" }}>printemps</span>
          </div>
          <p style={{ marginTop: 18, fontSize: 14, color: `${INK}aa`, letterSpacing: "0.04em", maxWidth: 520, margin: "18px auto 0", lineHeight: 1.55 }}>
            The instruments of the house, presented as ateliers — six departments behind every garment KPT Designs and her sister Maison KPT Agents send out to the world.
          </p>
        </div>
        <div style={{ height: 1, background: `linear-gradient(270deg, transparent, ${GOLD})` }} />
      </header>

      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        {ATELIERS.map((a, i) => (
          <article
            key={a.index}
            className={`atelier-row ${a.align === "left" ? "atelier-left" : "atelier-right"}`}
            style={{
              padding: "clamp(36px, 4.5vw, 72px) 0",
              borderTop: i === 0 ? "none" : `1px solid ${GOLD}66`,
            }}
          >
            <div className="atelier-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr)", alignItems: "start", gap: "clamp(24px, 3vw, 48px)" }}>
              <aside className="atelier-aside" style={{ display: "flex", flexDirection: "column", gap: 18, alignItems: "flex-start", paddingTop: 6 }}>
                <div className="atelier-meta" style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span className={playfair.className} style={{ fontStyle: "italic", color: GOLD, fontSize: 22, letterSpacing: "0.08em" }}>{a.index}</span>
                  <span style={{ width: 28, height: 1, background: GOLD }} />
                  <span style={{ fontSize: 10, letterSpacing: "0.32em", color: CHARCOAL }}>ATELIER · {String(i + 1).padStart(2, "0")}</span>
                </div>
                <Ornament kind={a.ornament} />
                <div style={{ fontSize: 10, letterSpacing: "0.34em", color: `${INK}88` }}>EST. MMIV &nbsp;·&nbsp; PARIS / WEB</div>
              </aside>

              <div style={{ minWidth: 0 }}>
                <h3 className={inter.className} style={{ margin: 0, fontSize: 11, letterSpacing: "0.42em", color: CHARCOAL, fontWeight: 500 }}>
                  {a.name}
                </h3>
                <div className={playfair.className} style={{ marginTop: 10, fontSize: "clamp(28px, 3.4vw, 36px)", lineHeight: 1.05, fontWeight: 500, color: INK, letterSpacing: "-0.005em" }}>
                  {a.maison}
                </div>
                <div className={playfair.className} style={{ marginTop: 8, fontStyle: "italic", color: GOLD, fontSize: "clamp(16px, 1.4vw, 19px)", letterSpacing: "0.01em" }}>
                  &mdash; {a.tagline}
                </div>
                <p style={{ marginTop: 18, fontSize: 16, lineHeight: 1.65, color: `${INK}d8`, maxWidth: 580, fontWeight: 400 }}>
                  {a.body}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <footer style={{ maxWidth: 1240, margin: "clamp(40px, 5vw, 72px) auto 0", display: "flex", alignItems: "center", justifyContent: "center", gap: 18 }}>
        <div style={{ height: 1, width: 80, background: GOLD, opacity: 0.7 }} />
        <span className={playfair.className} style={{ fontStyle: "italic", color: `${INK}99`, fontSize: 14, letterSpacing: "0.18em" }}>fin des maisons</span>
        <div style={{ height: 1, width: 80, background: GOLD, opacity: 0.7 }} />
      </footer>

      <style>{`
        @media (min-width: 768px) {
          .atelier-grid { grid-template-columns: 220px 1fr !important; }
          .atelier-right .atelier-grid { grid-template-columns: 1fr 220px !important; }
          .atelier-right .atelier-aside { order: 2; align-items: flex-end !important; text-align: right; }
          .atelier-right .atelier-aside .atelier-meta { flex-direction: row-reverse; }
          .atelier-right .atelier-grid > div:last-child { order: 1; padding-right: clamp(0px, 4vw, 56px); }
          .atelier-left .atelier-grid > div:last-child { padding-left: clamp(0px, 2vw, 24px); }
          .atelier-row:nth-child(odd) { padding-left: clamp(0px, 3vw, 48px); }
          .atelier-row:nth-child(even) { padding-right: clamp(0px, 3vw, 48px); }
        }
      `}</style>
    </section>
  );
}
