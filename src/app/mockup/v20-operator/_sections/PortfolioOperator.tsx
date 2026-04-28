import { IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Serif } from "next/font/google";
import { portfolio } from "@/lib/portfolio";

const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600"] });
const sans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "700"] });
const serif = IBM_Plex_Serif({ subsets: ["latin"], weight: ["400", "500"] });

const PAPER = "#F4EFE0";
const INK = "#1A1A1A";
const IBM_BLUE = "#1D5CB6";
const SUB_RED = "#A4262C";
const AMBER = "#C9A30D";

const DEPLOYED = ["2024-03-11", "2023-08-22", "2023-05-04", "2022-11-09", "2022-06-17", "2024-01-29"];
const REV = ["REV-A", "REV-B", "REV-A", "REV-C", "REV-B", "REV-A"];

const IMPL: Record<string, string> = {
  "Pittsburgh North Golf Club": "Tee-time integration, membership portal, course conditions feed.",
  "Cirigliano Plumbing": "24/7 dispatch routing, trenchless service catalog, transparent pricing matrix.",
  "Nicholas Electric Co.": "Knob-and-tube intake forms, EV charger configurator, emergency dispatch line.",
  "Zeke & Son Roofing": "Three-generation lineage, slate/flat/shingle service tree, awards ledger surface.",
  "Patriot Pest Control": "Termite and bed-bug intake, humane wildlife dispatch, BBB record surface.",
  "Grand View Golf Club": "Public 18-hole booking, Italian steakhouse reservations, skyline gallery module.",
};

const labelStyle: React.CSSProperties = { color: "#6a6a6a" };
const ddStyle: React.CSSProperties = { margin: 0 };

export default function PortfolioOperator() {
  const rows = portfolio.slice(0, 6);

  return (
    <section
      aria-label="Reference Implementations"
      className={serif.className}
      style={{ background: PAPER, color: INK, padding: "72px 16px 96px", position: "relative", overflow: "hidden" }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "repeating-linear-gradient(0deg, transparent 0 27px, rgba(29,92,182,0.07) 27px 28px)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(rgba(26,26,26,0.05) 1px, transparent 1px)",
          backgroundSize: "3px 3px",
          mixBlendMode: "multiply",
          opacity: 0.5,
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", maxWidth: 760, margin: "0 auto" }}>
        <div
          className={mono.className}
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 11,
            letterSpacing: "0.14em",
            color: "#5a5a5a",
            textTransform: "uppercase",
            paddingBottom: 6,
            borderBottom: "1px solid rgba(26,26,26,0.25)",
          }}
        >
          <span>KPT-OPS / OPERATOR MANUAL</span>
          <span>CHAPTER 3 · PAGE 18 OF 42</span>
        </div>

        <header style={{ marginTop: 28, marginBottom: 8 }}>
          <div className={mono.className} style={{ fontSize: 11, letterSpacing: "0.2em", color: SUB_RED, marginBottom: 6 }}>
            § REFERENCE / CASE-STUDY APPENDIX
          </div>
          <h2
            className={sans.className}
            style={{
              fontSize: "clamp(28px, 4.4vw, 44px)",
              fontWeight: 700,
              letterSpacing: "-0.01em",
              lineHeight: 1.05,
              margin: 0,
              color: INK,
            }}
          >
            <span style={{ color: IBM_BLUE }}>3.0</span> REFERENCE IMPLEMENTATIONS
          </h2>
          <div aria-hidden style={{ marginTop: 12, height: 3, background: IBM_BLUE, width: "100%" }} />
          <p style={{ fontSize: 15, lineHeight: 1.55, marginTop: 18, maxWidth: 640, color: "#2a2a2a" }}>
            The following six (6) entries document deployed reference implementations commissioned of the
            KPT design and engineering practice between calendar years 2022 and 2024. Each subsection
            describes scope, category, and implementation surface area. Cross-references are issued in RFC style.
          </p>
        </header>

        <ol style={{ listStyle: "none", padding: 0, margin: "32px 0 0" }}>
          {rows.map((p, i) => {
            const num = `3.${i + 1}`;
            const href = p.href ?? `https://${p.url}`;
            const ext = !p.href;
            const impl = IMPL[p.name] ?? p.desc;
            const host = p.url.replace(/^https?:\/\//, "").toUpperCase();
            return (
              <li
                key={p.url}
                style={{
                  marginBottom: 44,
                  paddingBottom: 32,
                  borderBottom: i === rows.length - 1 ? "none" : "1px dashed rgba(26,26,26,0.22)",
                }}
              >
                <div style={{ display: "flex", alignItems: "baseline", gap: 14, flexWrap: "wrap" }}>
                  <span
                    className={sans.className}
                    style={{ fontWeight: 700, fontSize: 22, color: IBM_BLUE, letterSpacing: "-0.005em" }}
                  >
                    {num}
                  </span>
                  <a
                    href={href}
                    {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className={sans.className}
                    style={{
                      fontWeight: 700,
                      fontSize: 22,
                      color: INK,
                      letterSpacing: "-0.005em",
                      textDecoration: "underline",
                      textDecorationColor: IBM_BLUE,
                      textDecorationThickness: "1.5px",
                      textUnderlineOffset: "4px",
                    }}
                  >
                    {p.name}
                    <sup
                      className={mono.className}
                      style={{ fontSize: 10, color: SUB_RED, marginLeft: 4, fontWeight: 500, letterSpacing: "0.05em" }}
                    >
                      [{i + 1}]
                    </sup>
                  </a>
                </div>

                <dl
                  className={mono.className}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "120px 1fr",
                    rowGap: 3,
                    columnGap: 12,
                    margin: "12px 0 14px",
                    fontSize: 12,
                    letterSpacing: "0.05em",
                    color: "#2a2a2a",
                  }}
                >
                  <dt style={labelStyle}>DEPLOYED</dt>
                  <dd style={ddStyle}>{DEPLOYED[i]}</dd>
                  <dt style={labelStyle}>CATEGORY</dt>
                  <dd style={ddStyle}>{p.category.toUpperCase()}</dd>
                  <dt style={labelStyle}>HOSTNAME</dt>
                  <dd style={ddStyle}>{host}</dd>
                  <dt style={labelStyle}>STATUS</dt>
                  <dd style={{ ...ddStyle, color: AMBER }}>ACTIVE · {REV[i]}</dd>
                  <dt style={labelStyle}>IMPLEMENTATION</dt>
                  <dd className={serif.className} style={{ margin: 0, fontSize: 14.5, lineHeight: 1.55, color: INK }}>
                    {impl}
                  </dd>
                </dl>

                {p.image ? (
                  <figure
                    style={{
                      margin: "10px 0 0",
                      padding: "10px 12px 12px",
                      background: "rgba(29,92,182,0.04)",
                      borderLeft: `2px solid ${IBM_BLUE}`,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                      <div
                        aria-hidden
                        style={{
                          width: 96,
                          height: 64,
                          background: `url(${p.image}) center/cover, #d8d2bf`,
                          backgroundBlendMode: "multiply",
                          filter: "grayscale(0.35) contrast(0.95)",
                          border: "1px solid rgba(26,26,26,0.25)",
                          flex: "0 0 auto",
                        }}
                      />
                      <figcaption
                        className={mono.className}
                        style={{ fontSize: 11, letterSpacing: "0.1em", color: "#3a3a3a", flex: "1 1 200px" }}
                      >
                        <span style={{ color: SUB_RED, fontWeight: 600 }}>FIGURE {num}</span>
                        <span style={{ margin: "0 8px", color: "#9a9a9a" }}>—</span>
                        <span>{p.name.toUpperCase()}, deployment surface (capture).</span>
                      </figcaption>
                    </div>
                  </figure>
                ) : null}

                <div
                  className={mono.className}
                  style={{ marginTop: 12, fontSize: 11, color: "#6a6a6a", letterSpacing: "0.05em" }}
                >
                  ↳ See also: §{num}.A operator notes ·{" "}
                  <a
                    href={href}
                    {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    style={{ color: IBM_BLUE, textDecoration: "underline", textUnderlineOffset: "3px" }}
                  >
                    [REF-{String(i + 1).padStart(2, "0")}]
                  </a>
                </div>
              </li>
            );
          })}
        </ol>

        <div
          className={mono.className}
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 11,
            letterSpacing: "0.14em",
            color: "#5a5a5a",
            textTransform: "uppercase",
            paddingTop: 10,
            borderTop: "1px solid rgba(26,26,26,0.25)",
            marginTop: 8,
          }}
        >
          <span>END OF SECTION 3.0</span>
          <span>CONTINUED → 4.0 PROCESS</span>
        </div>
      </div>
    </section>
  );
}
