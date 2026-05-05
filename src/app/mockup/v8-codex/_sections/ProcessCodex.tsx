import { Crimson_Pro, UnifrakturCook } from "next/font/google";

const crimson = Crimson_Pro({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const unifraktur = UnifrakturCook({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

const VELLUM = "#F2E8D5";
const INK = "#1B1410";
const VERMILLION = "#C72A1F";
const ULTRAMARINE = "#2845A8";
const GOLD = "#D4A04A";
const MULBERRY = "#5C2D5E";

type Canticle = {
  numeral: "I" | "II" | "III" | "IV";
  roman: string;
  title: string;
  subtitle: string;
  body: string;
};

const CANTICLES: Canticle[] = [
  {
    numeral: "I",
    roman: "primus",
    title: "The Counsel",
    subtitle: "Of the first meeting and the taking of notes",
    body: "We confer briefly. You describe the matter — what your trade is, who you serve, where the present site doth fail you. We listen and take notes. The conversation is short; the notes are exceeding detailed.",
  },
  {
    numeral: "II",
    roman: "secundus",
    title: "The Works",
    subtitle: "Of the drawing and the inscribing of markup",
    body: "We design and write the markup. You see progress weekly, that no surprise be sprung upon you at the end. Revisions are without limit until the work be true to the matter at hand.",
  },
  {
    numeral: "III",
    roman: "tertius",
    title: "The Reveal",
    subtitle: "Of the private viewing before the world doth see",
    body: "We launch in private first, behind a curtain. You read every page, walk every path, mark every flaw. Approve, and we deploy in publick — analytics measured, every link verified.",
  },
  {
    numeral: "IV",
    roman: "quartus",
    title: "The Gift",
    subtitle: "Of the seal of ownership and the handing over",
    body: "The repository, the deploy, and the documentation are delivered to thee. The seal of ownership transfers to you in full — no lock, no retainer, no toll. Thy site, thy code, thy domain.",
  },
];

const noiseBg =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.106  0 0 0 0 0.078  0 0 0 0 0.063  0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

export default function ProcessCodex() {
  return (
    <section
      className={crimson.className}
      style={{
        position: "relative",
        background: VELLUM,
        color: INK,
        padding: "clamp(112px, 16vw, 208px) 0",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.5,
          backgroundImage:
            "radial-gradient(circle at 20% 18%, rgba(92,45,94,0.07), transparent 38%), radial-gradient(circle at 84% 72%, rgba(40,69,168,0.06), transparent 42%)",
        }}
      />
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.18, mixBlendMode: "multiply", backgroundImage: noiseBg }} />

      <div style={{ position: "relative", maxWidth: 980, margin: "0 auto", padding: "0 clamp(24px, 6vw, 72px)" }}>
        <header style={{ textAlign: "center", marginBottom: "clamp(72px, 10vw, 128px)" }}>
          <div style={{ fontVariant: "small-caps", letterSpacing: "0.32em", fontSize: 12, color: MULBERRY, marginBottom: 18, fontStyle: "italic", fontWeight: 500 }}>
            — folium quintum —
          </div>
          <h2 className={unifraktur.className} style={{ margin: 0, fontSize: "clamp(34px, 5.4vw, 64px)", lineHeight: 1.04, color: INK, fontWeight: 700, letterSpacing: "0.005em" }}>
            Chapter V
            <span style={{ display: "block", color: VERMILLION, fontSize: "0.62em", marginTop: 10 }}>Of Method and Order</span>
          </h2>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 28 }}>
            <span style={{ height: 1.5, width: 92, background: VERMILLION }} />
            <span style={{ color: VERMILLION, fontSize: 18, lineHeight: 1 }}>✦</span>
            <span style={{ height: 1.5, width: 92, background: VERMILLION }} />
          </div>
          <p style={{ marginTop: 26, fontStyle: "italic", color: "rgba(27,20,16,0.7)", fontSize: "clamp(15px, 1.18vw, 18px)", lineHeight: 1.55, maxWidth: 540, marginInline: "auto" }}>
            Wherein the four canticles of our craft are set down in their proper order, that the patron may know what cometh next.
          </p>
        </header>

        <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {CANTICLES.map((c, i) => (
            <li key={c.numeral} style={{ position: "relative", paddingTop: i === 0 ? 0 : "clamp(64px, 9vw, 112px)", paddingBottom: "clamp(64px, 9vw, 112px)" }}>
              {i < CANTICLES.length - 1 && (
                <div aria-hidden style={{ position: "absolute", left: "10%", right: "10%", bottom: 0, display: "flex", alignItems: "center", gap: 18 }}>
                  <span style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${GOLD} 18%, ${GOLD} 82%, transparent)` }} />
                  <span style={{ color: GOLD, fontSize: 14, lineHeight: 1, letterSpacing: "0.2em" }}>❦</span>
                  <span style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${GOLD} 18%, ${GOLD} 82%, transparent)` }} />
                </div>
              )}

              <div className="cdx-row">
                <div className="cdx-numeral-col">
                  <div className={unifraktur.className} aria-hidden style={{ color: VERMILLION, fontSize: "clamp(140px, 19vw, 220px)", lineHeight: 0.82, fontWeight: 700, letterSpacing: "-0.01em", textShadow: "0 1px 0 rgba(27,20,16,0.06)" }}>
                    {c.numeral}
                  </div>
                  <div style={{ marginTop: 14, fontVariant: "small-caps", letterSpacing: "0.3em", fontSize: 11, color: MULBERRY, fontStyle: "italic", fontWeight: 500 }}>
                    canticum {c.roman}
                  </div>
                </div>

                <div className="cdx-text-col">
                  <h3 className={unifraktur.className} style={{ margin: 0, fontSize: "clamp(34px, 4.4vw, 54px)", lineHeight: 1.02, color: INK, fontWeight: 700, letterSpacing: "0.005em" }}>
                    {c.title}
                  </h3>
                  <div style={{ marginTop: 14, fontStyle: "italic", color: ULTRAMARINE, fontSize: "clamp(15px, 1.18vw, 18px)", lineHeight: 1.4, fontWeight: 500 }}>
                    {c.subtitle}.
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 22, marginBottom: 22 }}>
                    <span style={{ height: 1, width: 36, background: GOLD }} />
                    <span style={{ color: GOLD, fontSize: 12 }}>◆</span>
                    <span style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${GOLD}, transparent)` }} />
                  </div>
                  <p className="cdx-body">{c.body}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, marginTop: "clamp(48px, 7vw, 96px)" }}>
          <span style={{ height: 1, width: 80, background: VERMILLION }} />
          <span className={unifraktur.className} style={{ color: VERMILLION, fontSize: 22, lineHeight: 1 }}>finis</span>
          <span style={{ height: 1, width: 80, background: VERMILLION }} />
        </div>
      </div>

      <style>{`
        .cdx-row { display: grid; grid-template-columns: minmax(0, 1fr); gap: clamp(20px, 3vw, 40px); align-items: start; }
        .cdx-numeral-col { text-align: left; }
        .cdx-text-col { max-width: 620px; }
        .cdx-body {
          margin: 0;
          font-size: clamp(17px, 1.28vw, 20px);
          line-height: 1.62;
          color: ${INK};
          font-weight: 400;
          hyphens: auto;
          -webkit-hyphens: auto;
        }
        .cdx-body::first-letter {
          font-family: 'UnifrakturCook', serif;
          font-weight: 700;
          color: ${VERMILLION};
          font-size: 3.6em;
          line-height: 0.84;
          float: left;
          padding: 0.04em 0.10em 0 0;
          margin-right: 0.04em;
          background: linear-gradient(180deg, ${VERMILLION} 0%, ${MULBERRY} 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 1px 0 rgba(212,160,74,0.3);
        }
        @media (min-width: 768px) {
          .cdx-row { grid-template-columns: minmax(0, 0.62fr) minmax(0, 1fr); gap: clamp(36px, 5vw, 72px); }
          .cdx-numeral-col { padding-top: 6px; }
        }
      `}</style>
    </section>
  );
}
