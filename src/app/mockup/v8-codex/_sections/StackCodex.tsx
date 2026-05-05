import { Crimson_Pro, UnifrakturCook, Cormorant_SC } from "next/font/google";

const crimson = Crimson_Pro({ subsets: ["latin"], weight: ["400", "600"], style: ["normal", "italic"], display: "swap" });
const fraktur = UnifrakturCook({ subsets: ["latin"], weight: ["700"], display: "swap" });
const cormorantSC = Cormorant_SC({ subsets: ["latin"], weight: ["400", "500", "600"], display: "swap" });

const VELLUM = "#F2E8D5";
const INK = "#1B1410";
const VERMILLION = "#C72A1F";
const ULTRAMARINE = "#2845A8";
const GOLD = "#D4A04A";
const MULBERRY = "#5C2D5E";

type Tool = { numeral: string; name: string; latin: string; body: string; spec: string; marginalia: string };

const TOOLS: Tool[] = [
  {
    numeral: "I", name: "Next.js",
    latin: "the framework, sixteenth in its line, of server and edge —",
    body: "the scaffolding upon which every folio is hung. Routes, rendering, and streaming, all measured in millimetres of latency.",
    spec: "v. xvi · app router · turbopack",
    marginalia: "vide capitulum de routing",
  },
  {
    numeral: "II", name: "React",
    latin: "the engine of components, nineteenth iteration —",
    body: "small declarative parts, composed and recomposed, until the whole machine renders itself without complaint.",
    spec: "v. xix · server components · suspense",
    marginalia: "ex compositione, totum",
  },
  {
    numeral: "III", name: "Tailwind",
    latin: "the utilitarian style, fourth incarnation —",
    body: "atomic classes inscribed directly upon the markup. No stylesheet wandering, no specificity wars. Discipline by constraint.",
    spec: "v. iv · oxide engine · zero runtime",
    marginalia: "brevitas est anima styli",
  },
  {
    numeral: "IV", name: "TypeScript",
    latin: "the language of types, strict in its discipline —",
    body: "every variable confessed, every contract honoured. Errors caught at the writing desk, not the printing press.",
    spec: "strict mode · no implicit any · exhaustive",
    marginalia: "veritas in typis",
  },
  {
    numeral: "V", name: "Vercel Edge",
    latin: "the global manor, one hundred and ninety-four prefects worldwide —",
    body: "your folio served from the nearest holding to your visitor. Cold starts a relic; the page is already in their county.",
    spec: "194 pop · fluid compute · streaming",
    marginalia: "ubique terrarum",
  },
  {
    numeral: "VI", name: "The KPT Agent",
    latin: "an AI familiar that answers your inbound calls —",
    body: "from sister house KPT Agents. A patient voice on the line at every hour, taking bookings and triaging enquiries while you sleep.",
    spec: "kpt agents · 24h · transcribed",
    marginalia: "vox machinae · die ac nocte",
  },
];

function Ornament({ accent = GOLD }: { accent?: string }) {
  return (
    <svg width="44" height="14" viewBox="0 0 44 14" aria-hidden style={{ display: "block" }}>
      <path d="M0 7 H14 M30 7 H44" stroke={accent} strokeWidth="0.6" />
      <circle cx="22" cy="7" r="2.4" fill="none" stroke={accent} strokeWidth="0.7" />
      <circle cx="22" cy="7" r="0.9" fill={accent} />
      <path d="M16 7 Q19 3 22 7 Q25 11 28 7" fill="none" stroke={accent} strokeWidth="0.6" />
    </svg>
  );
}

export default function StackCodex() {
  return (
    <section
      className={crimson.className}
      style={{
        background: VELLUM,
        color: INK,
        padding: "clamp(72px, 9vw, 144px) clamp(20px, 5vw, 72px)",
        position: "relative",
        backgroundImage:
          "radial-gradient(circle at 18% 22%, rgba(92,45,94,0.06), transparent 55%), radial-gradient(circle at 82% 78%, rgba(212,160,74,0.10), transparent 55%)",
      }}
    >
      <header style={{ maxWidth: 1240, margin: "0 auto", textAlign: "center", paddingBottom: "clamp(40px, 5vw, 72px)", borderBottom: `1px solid ${INK}22` }}>
        <div className={cormorantSC.className} style={{ color: ULTRAMARINE, letterSpacing: "0.32em", fontSize: 13 }}>
          folio iii
        </div>
        <h2 className={fraktur.className} style={{ margin: "16px 0 10px", color: INK, fontSize: "clamp(40px, 6.4vw, 88px)", lineHeight: 0.95 }}>
          Chapter III<span style={{ color: VERMILLION }}> · </span>Of Instruments
        </h2>
        <div style={{ display: "flex", justifyContent: "center", margin: "10px 0 14px" }}>
          <Ornament accent={GOLD} />
        </div>
        <div style={{ height: 2, background: `linear-gradient(90deg, transparent, ${VERMILLION} 18%, ${VERMILLION} 82%, transparent)`, maxWidth: 520, margin: "0 auto" }} />
        <p style={{ marginTop: 22, fontStyle: "italic", color: `${INK}cc`, fontSize: "clamp(15px, 1.25vw, 19px)", maxWidth: 640, margin: "22px auto 0" }}>
          Herein are catalogued the six instruments by which the workshop of KPT Designs &amp; her sister house KPT Agents render the modern web.
        </p>
      </header>

      <div style={{ maxWidth: 1240, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", columnGap: "clamp(32px, 5vw, 80px)", paddingTop: 24 }}>
        {TOOLS.map((t, i) => (
          <article
            key={t.numeral}
            style={{
              padding: "36px 8px 40px",
              borderBottom: `1px solid ${INK}22`,
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              columnGap: 22,
              alignItems: "start",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
              <span
                className={fraktur.className}
                style={{
                  color: VERMILLION,
                  fontSize: "clamp(96px, 12vw, 180px)",
                  lineHeight: 0.78,
                  textShadow: `0 1px 0 rgba(199,42,31,0.18)`,
                  letterSpacing: "-0.02em",
                }}
              >
                {t.numeral}
              </span>
              <div aria-hidden style={{ width: 1, height: 28, background: `${GOLD}88` }} />
              <div className={cormorantSC.className} style={{ color: MULBERRY, fontSize: 11, letterSpacing: "0.3em" }}>
                tool · {String(i + 1).padStart(2, "0")}
              </div>
            </div>

            <div>
              <h3 className={fraktur.className} style={{ margin: 0, color: INK, fontSize: "clamp(28px, 2.6vw, 40px)", lineHeight: 1 }}>
                {t.name}
              </h3>
              <div style={{ marginTop: 8 }}>
                <Ornament accent={GOLD} />
              </div>
              <p style={{ marginTop: 14, fontSize: "clamp(16px, 1.15vw, 18px)", lineHeight: 1.55, color: INK }}>
                <span style={{ fontStyle: "italic", color: `${INK}cc` }}>{t.latin} </span>
                {t.body}
              </p>
              <div
                className={cormorantSC.className}
                style={{ marginTop: 16, fontSize: 12.5, letterSpacing: "0.18em", color: ULTRAMARINE, display: "flex", alignItems: "center", gap: 10 }}
              >
                <span style={{ width: 18, height: 1, background: ULTRAMARINE }} />
                <span>{t.spec}</span>
              </div>
              <aside
                aria-label="marginalia"
                style={{
                  marginTop: 14,
                  fontSize: 12.5,
                  fontStyle: "italic",
                  color: MULBERRY,
                  borderLeft: `2px solid ${MULBERRY}55`,
                  paddingLeft: 10,
                  lineHeight: 1.4,
                  maxWidth: 360,
                }}
              >
                {t.marginalia}
              </aside>
            </div>
          </article>
        ))}
      </div>

      <footer style={{ maxWidth: 1240, margin: "clamp(36px, 4vw, 56px) auto 0", textAlign: "center", paddingTop: 28, borderTop: `1px solid ${INK}22` }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
          <Ornament accent={GOLD} />
        </div>
        <p className={cormorantSC.className} style={{ color: `${INK}99`, letterSpacing: "0.28em", fontSize: 12, margin: 0 }}>
          finis capituli iii &nbsp;·&nbsp; sequitur folium portfolii
        </p>
      </footer>
    </section>
  );
}
