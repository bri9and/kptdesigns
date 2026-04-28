"use client";

import { Roboto, Roboto_Mono } from "next/font/google";
import { motion } from "framer-motion";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});
const mono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

// V11 Architectural palette
const BLUEPRINT = "#0E1E2E";
const DRAFTING = "#E8EAEC";
const CYAN_DIM = "#3D8DBF";
const RED_DETAIL = "#D03030";
const HAIRLINE = "rgba(232,234,236,0.18)";
const HAIRLINE_SOFT = "rgba(232,234,236,0.08)";

const view = { once: true, margin: "-10% 0px" } as const;

// 10% opacity faint grid background
const grid = `
  linear-gradient(${HAIRLINE_SOFT} 1px, transparent 1px) 0 0 / 32px 32px,
  linear-gradient(90deg, ${HAIRLINE_SOFT} 1px, transparent 1px) 0 0 / 32px 32px,
  linear-gradient(${HAIRLINE_SOFT} 1px, transparent 1px) 0 0 / 160px 160px,
  linear-gradient(90deg, ${HAIRLINE_SOFT} 1px, transparent 1px) 0 0 / 160px 160px
`;

type Spec = {
  num: string;
  title: string;
  body: string;
  notes: string[];
  callout?: string;
};

const SPECS: Spec[] = [
  {
    num: "1.0",
    title: "PROJECT BASIS",
    body: "All sites are hand-coded from raw markup. No templates, page builders, or proprietary platforms. Every line is authored, reviewed, and owned.",
    notes: ["REF · ISO 9001:2015", "DRAWN BY KPT", "REV. 04"],
    callout: "NO BUILDERS",
  },
  {
    num: "2.0",
    title: "SCOPE",
    body: "Includes domain registration, hosting provisioning, design, build, and inbound AI phone agent (KPT Agents). Excludes third-party SaaS subscriptions unless noted in addendum A-1.",
    notes: ["INCL. DOMAIN", "INCL. HOSTING", "INCL. AGENT"],
    callout: "FULL STACK",
  },
  {
    num: "3.0",
    title: "STANDARDS",
    body: "TypeScript strict mode. Lighthouse performance, accessibility, and SEO scores above 95. Mobile-first responsive grid. WCAG 2.1 AA contrast minimums on all surfaces.",
    notes: ["TS · STRICT", "LH > 95", "WCAG 2.1 AA"],
    callout: "≥ 95",
  },
  {
    num: "4.0",
    title: "OWNERSHIP & DELIVERY",
    body: "All source code, deployment credentials, DNS records, and infrastructure access transferred to client upon project completion. No platform lock-in. No recurring license.",
    notes: ["REPO · CLIENT", "DNS · CLIENT", "DEPLOY · CLIENT"],
    callout: "100% TRANSFER",
  },
];

const MARGINALIA = [
  "DWG · A-002",
  "SCALE · 1:1",
  "DATE · 2026.04",
  "SHEET 02 / 06",
];

export default function PhilosophyArchitectural() {
  return (
    <section
      className={roboto.className}
      style={{
        position: "relative",
        background: BLUEPRINT,
        color: DRAFTING,
        padding: "120px 0 160px",
        overflow: "hidden",
        isolation: "isolate",
      }}
    >
      {/* faint grid 10% */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: grid,
          opacity: 0.1,
          pointerEvents: "none",
        }}
      />

      {/* SHEET HEADER BAR */}
      <header
        style={{
          position: "relative",
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 48px",
        }}
      >
        <div
          className={mono.className}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
            padding: "14px 18px",
            border: `1px solid ${HAIRLINE}`,
            borderBottom: `1px solid ${HAIRLINE}`,
            color: DRAFTING,
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            background: "rgba(14,30,46,0.6)",
          }}
        >
          <span>SHEET A-002 · DESIGN INTENT</span>
          <span style={{ color: CYAN_DIM }}>KPT DESIGNS / NORTH ELEVATION</span>
          <span style={{ color: CYAN_DIM }}>REV · 04</span>
        </div>
        {/* thin red rule */}
        <div
          aria-hidden
          style={{
            height: 2,
            background: RED_DETAIL,
            width: "100%",
            boxShadow: `0 0 0 0.5px ${RED_DETAIL}`,
          }}
        />
        <div
          aria-hidden
          style={{
            height: 1,
            background: HAIRLINE,
            marginTop: 6,
          }}
        />
      </header>

      {/* MAIN GRID */}
      <div
        style={{
          position: "relative",
          maxWidth: 1280,
          margin: "56px auto 0",
          padding: "0 48px",
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) 180px",
          gap: 56,
        }}
      >
        {/* SPEC LIST */}
        <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 56 }}>
          {SPECS.map((s, i) => (
            <motion.li
              key={s.num}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={view}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 0.61, 0.36, 1] }}
              style={{
                display: "grid",
                gridTemplateColumns: "92px 1fr",
                gap: 32,
                paddingTop: 18,
                borderTop: `1px solid ${HAIRLINE}`,
                position: "relative",
              }}
            >
              {/* corner ticks */}
              <span aria-hidden style={cornerTickStyle("tl")} />
              <span aria-hidden style={cornerTickStyle("tr")} />

              {/* number column */}
              <div
                className={mono.className}
                style={{
                  fontSize: 13,
                  letterSpacing: "0.18em",
                  color: CYAN_DIM,
                  textTransform: "uppercase",
                  paddingTop: 4,
                }}
              >
                <div style={{ color: DRAFTING, fontSize: 28, letterSpacing: "0.04em" }}>
                  {s.num}
                </div>
                <div style={{ marginTop: 8 }}>SEC.</div>
              </div>

              {/* content column */}
              <div>
                <h3
                  style={{
                    margin: 0,
                    fontFamily: mono.style.fontFamily,
                    fontSize: 14,
                    letterSpacing: "0.32em",
                    textTransform: "uppercase",
                    color: DRAFTING,
                    fontWeight: 500,
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    margin: "16px 0 0",
                    fontSize: 17,
                    lineHeight: 1.55,
                    color: DRAFTING,
                    maxWidth: 640,
                    fontWeight: 300,
                  }}
                >
                  {s.body}
                </p>

                {/* notes row */}
                <div
                  className={mono.className}
                  style={{
                    marginTop: 22,
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 18,
                    alignItems: "center",
                  }}
                >
                  {s.notes.map((n) => (
                    <span
                      key={n}
                      style={{
                        fontSize: 10,
                        letterSpacing: "0.24em",
                        color: CYAN_DIM,
                        textTransform: "uppercase",
                        padding: "4px 8px",
                        border: `1px solid ${HAIRLINE_SOFT}`,
                      }}
                    >
                      {n}
                    </span>
                  ))}
                  {s.callout && (
                    <span
                      style={{
                        fontSize: 10,
                        letterSpacing: "0.24em",
                        color: RED_DETAIL,
                        textTransform: "uppercase",
                        padding: "4px 10px",
                        border: `1px solid ${RED_DETAIL}`,
                        position: "relative",
                      }}
                    >
                      ◆ {s.callout}
                    </span>
                  )}
                </div>
              </div>
            </motion.li>
          ))}
        </ol>

        {/* MARGINALIA */}
        <aside
          className={mono.className}
          style={{
            borderLeft: `1px dashed ${HAIRLINE}`,
            paddingLeft: 24,
            display: "flex",
            flexDirection: "column",
            gap: 22,
            color: CYAN_DIM,
            fontSize: 10,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            paddingTop: 8,
          }}
        >
          {MARGINALIA.map((m) => (
            <div key={m}>{m}</div>
          ))}
          <div style={{ height: 1, background: HAIRLINE, margin: "6px 0" }} />
          <div style={{ color: RED_DETAIL }}>◆ KEY NOTE</div>
          <div style={{ color: DRAFTING, lineHeight: 1.6, letterSpacing: "0.18em" }}>
            HAND-DRAFTED. NO AUTOGEN. NO LOCK-IN.
          </div>
        </aside>
      </div>

      {/* TITLE BLOCK FOOTER */}
      <footer
        className={mono.className}
        style={{
          position: "relative",
          maxWidth: 1280,
          margin: "80px auto 0",
          padding: "0 48px",
        }}
      >
        <div style={{ height: 1, background: HAIRLINE }} />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            borderBottom: `1px solid ${HAIRLINE}`,
            borderLeft: `1px solid ${HAIRLINE}`,
            color: DRAFTING,
            fontSize: 10,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
          }}
        >
          {[
            ["DRAWN", "KPT"],
            ["CHECKED", "S.K."],
            ["DATE", "2026.04.28"],
            ["SHEET", "A-002 / 06"],
          ].map(([k, v]) => (
            <div
              key={k}
              style={{
                padding: "14px 16px",
                borderRight: `1px solid ${HAIRLINE}`,
                borderTop: `1px solid ${HAIRLINE}`,
              }}
            >
              <div style={{ color: CYAN_DIM, fontSize: 9 }}>{k}</div>
              <div style={{ marginTop: 6, fontSize: 13, letterSpacing: "0.16em" }}>{v}</div>
            </div>
          ))}
        </div>
      </footer>
    </section>
  );
}

function cornerTickStyle(corner: "tl" | "tr"): React.CSSProperties {
  const base: React.CSSProperties = {
    position: "absolute",
    width: 10,
    height: 10,
    borderColor: CYAN_DIM,
    borderStyle: "solid",
    top: -1,
  };
  if (corner === "tl") return { ...base, left: -1, borderWidth: "1px 0 0 1px" };
  return { ...base, right: -1, borderWidth: "1px 1px 0 0" };
}
