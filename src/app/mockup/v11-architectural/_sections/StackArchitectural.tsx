"use client";

import { Roboto, Roboto_Mono } from "next/font/google";

const mono = Roboto_Mono({ subsets: ["latin"], weight: ["400", "500"] });
const sans = Roboto({ subsets: ["latin"], weight: ["300", "400", "500"] });

type Row = {
  mark: string;
  system: string;
  mfr: string;
  model: string;
  notes: string;
  Icon: () => React.JSX.Element;
};

const stroke = "#E8EAEC";
const dim = "#3D8DBF";
const red = "#D03030";

// Isometric line-only SVGs (28x28 viewport, 0.75 stroke)
const IcoFramework = () => (
  <svg viewBox="0 0 28 28" width="28" height="28" fill="none" stroke={stroke} strokeWidth="0.75">
    <path d="M14 4 L24 9 L24 19 L14 24 L4 19 L4 9 Z" />
    <path d="M14 4 L14 14 L24 19 M14 14 L4 19" />
    <path d="M9 6.5 L19 11.5 M9 11.5 L19 16.5" stroke={dim} />
  </svg>
);
const IcoComponent = () => (
  <svg viewBox="0 0 28 28" width="28" height="28" fill="none" stroke={stroke} strokeWidth="0.75">
    <path d="M4 14 L14 9 L24 14 L14 19 Z" />
    <path d="M14 9 L14 19 M9 11.5 L9 16.5 M19 11.5 L19 16.5" />
    <circle cx="14" cy="14" r="1.4" stroke={red} />
  </svg>
);
const IcoStyling = () => (
  <svg viewBox="0 0 28 28" width="28" height="28" fill="none" stroke={stroke} strokeWidth="0.75">
    <path d="M4 18 L14 13 L24 18 L14 23 Z" />
    <path d="M4 14 L14 9 L24 14 L14 19 Z" />
    <path d="M4 10 L14 5 L24 10 L14 15 Z" stroke={dim} />
  </svg>
);
const IcoTyping = () => (
  <svg viewBox="0 0 28 28" width="28" height="28" fill="none" stroke={stroke} strokeWidth="0.75">
    <path d="M5 8 L23 8 L23 22 L5 22 Z" />
    <path d="M9 13 L19 13 M9 17 L15 17" />
    <path d="M5 8 L9 4 L27 4 L23 8 M23 22 L27 18 L27 4" stroke={dim} />
  </svg>
);
const IcoDeploy = () => (
  <svg viewBox="0 0 28 28" width="28" height="28" fill="none" stroke={stroke} strokeWidth="0.75">
    <path d="M14 3 L24 9 L14 15 L4 9 Z" />
    <path d="M4 9 L4 15 L14 21 L24 15 L24 9 M14 15 L14 21" />
    <path d="M4 15 L4 19 L14 25 L24 19 L24 15" stroke={dim} />
  </svg>
);
const IcoAgents = () => (
  <svg viewBox="0 0 28 28" width="28" height="28" fill="none" stroke={stroke} strokeWidth="0.75">
    <path d="M14 5 L22 10 L22 18 L14 23 L6 18 L6 10 Z" />
    <circle cx="14" cy="13" r="2.2" stroke={red} />
    <path d="M14 15.2 L14 19 M11 17 L17 17" stroke={red} />
    <path d="M9 8.5 L9 11 M19 8.5 L19 11" stroke={dim} />
  </svg>
);

const rows: Row[] = [
  { mark: "F-01", system: "FRAMEWORK", mfr: "NEXT.JS", model: "16.1.6", notes: "APP ROUTER · RSC · EDGE", Icon: IcoFramework },
  { mark: "C-01", system: "COMPONENT", mfr: "REACT", model: "19.2.3", notes: "HOOKS · SUSPENSE", Icon: IcoComponent },
  { mark: "S-01", system: "STYLING", mfr: "TAILWIND", model: "4.0.0", notes: "UTILITY-FIRST · JIT", Icon: IcoStyling },
  { mark: "T-01", system: "TYPING", mfr: "TYPESCRIPT", model: "5.X", notes: "STRICT · ALL-PATHS", Icon: IcoTyping },
  { mark: "D-01", system: "DEPLOYMENT", mfr: "VERCEL", model: "EDGE", notes: "194 POPS · 99.99% UPTIME", Icon: IcoDeploy },
  { mark: "A-01", system: "AGENTS", mfr: "KPT AGENTS", model: "INBOUND PHONE", notes: "24/7 · SISTER CO. INTEGRATION", Icon: IcoAgents },
];

export default function StackArchitectural() {
  return (
    <section className={sans.className} style={{ background: "#0E1E2E", color: stroke, padding: "120px 32px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Sheet header */}
        <div className={mono.className} style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 24, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", paddingBottom: 12 }}>
          <span>SHEET A-003 &nbsp;·&nbsp; SYSTEMS SCHEDULE</span>
          <span style={{ color: dim }}>SCALE 1:1 &nbsp;·&nbsp; KPT DESIGNS &nbsp;·&nbsp; EST. 2004</span>
        </div>
        <div style={{ height: 2, background: red, marginBottom: 6 }} />
        <div style={{ height: 1, background: stroke, opacity: 0.4, marginBottom: 56 }} />

        {/* Title block */}
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 320px", gap: 40, marginBottom: 56, alignItems: "end" }}>
          <h2 className={mono.className} style={{ fontSize: "clamp(34px, 4.6vw, 64px)", letterSpacing: "0.04em", lineHeight: 1, margin: 0, fontWeight: 500, textTransform: "uppercase" }}>
            Building<br />Systems<br /><span style={{ color: dim }}>Schedule</span>
          </h2>
          <div className={mono.className} style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", lineHeight: 1.7, opacity: 0.75 }}>
            <div style={{ borderTop: `1px solid ${stroke}`, paddingTop: 10, marginBottom: 10 }}>DWG. NO. &nbsp;&nbsp; A-003.06</div>
            <div>REV.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 11.0</div>
            <div>DATE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2026.04.28</div>
            <div style={{ color: red }}>STATUS&nbsp;&nbsp;&nbsp; ISSUED FOR CONSTRUCTION</div>
          </div>
        </div>

        {/* Schedule table */}
        <div style={{ border: `1px solid ${stroke}` }}>
          {/* Column header */}
          <div className={mono.className} style={{ display: "grid", gridTemplateColumns: "44px 78px 1.1fr 1.3fr 1fr 1.6fr", borderBottom: `1px solid ${stroke}`, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase" }}>
            {["", "MARK", "SYSTEM", "MFR.", "MODEL", "NOTES"].map((h, i) => (
              <div key={i} style={{ padding: "12px 14px", borderRight: i < 5 ? `1px solid ${stroke}` : undefined, opacity: 0.7 }}>{h}</div>
            ))}
          </div>

          {rows.map((r, i) => {
            const isAgent = r.mark === "A-01";
            return (
              <div key={r.mark} className={mono.className} style={{ display: "grid", gridTemplateColumns: "44px 78px 1.1fr 1.3fr 1fr 1.6fr", borderBottom: i < rows.length - 1 ? `1px solid ${stroke}` : undefined, fontSize: 13, alignItems: "center", background: isAgent ? "rgba(208,48,48,0.06)" : undefined }}>
                <div style={{ padding: "16px 8px", borderRight: `1px solid ${stroke}`, display: "flex", justifyContent: "center" }}>
                  <r.Icon />
                </div>
                <div style={{ padding: "16px 14px", borderRight: `1px solid ${stroke}`, color: isAgent ? red : stroke, letterSpacing: "0.08em" }}>{r.mark}</div>
                <div style={{ padding: "16px 14px", borderRight: `1px solid ${stroke}`, letterSpacing: "0.12em" }}>{r.system}</div>
                <div style={{ padding: "16px 14px", borderRight: `1px solid ${stroke}`, letterSpacing: "0.06em" }}>{r.mfr}</div>
                <div style={{ padding: "16px 14px", borderRight: `1px solid ${stroke}`, color: dim, letterSpacing: "0.06em" }}>{r.model}</div>
                <div style={{ padding: "16px 14px", letterSpacing: "0.08em", opacity: 0.85 }}>{r.notes}</div>
              </div>
            );
          })}
        </div>

        {/* Axonometric stack diagram */}
        <div style={{ marginTop: 72, display: "grid", gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1fr)", gap: 56, alignItems: "start" }}>
          <div>
            <div className={mono.className} style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.7, marginBottom: 10 }}>
              FIG. 03 &nbsp;·&nbsp; AXONOMETRIC ASSEMBLY
            </div>
            <div style={{ height: 1, background: stroke, opacity: 0.35, marginBottom: 18 }} />
            <svg viewBox="0 0 520 360" style={{ width: "100%", height: "auto", display: "block" }} fill="none" stroke={stroke} strokeWidth="0.9" strokeLinejoin="round">
              {/* Ground plane */}
              <path d="M40 320 L260 348 L500 320 L280 292 Z" stroke={dim} strokeOpacity="0.5" strokeDasharray="2 4" />

              {/* A-01 AGENTS — base, red highlight */}
              <g stroke={red}>
                <path d="M70 288 L260 312 L470 288 L280 264 Z" />
                <path d="M70 288 L70 268 L260 292 L260 312 M260 312 L260 292 L470 268 L470 288" />
                <path d="M280 264 L280 244 L70 268 M280 244 L470 268" />
                <text x="486" y="280" fontSize="8" fill={red} stroke="none" letterSpacing="2">A-01</text>
              </g>

              {/* D-01 DEPLOYMENT */}
              <g>
                <path d="M86 244 L260 264 L454 244 L280 224 Z" />
                <path d="M86 244 L86 230 L260 250 L260 264 M260 264 L260 250 L454 230 L454 244" />
                <path d="M280 224 L280 210 L86 230 M280 210 L454 230" />
                <text className={mono.className} x="470" y="240" fontSize="8" fill={stroke} stroke="none" letterSpacing="2">D-01</text>
              </g>

              {/* T-01 TYPING */}
              <g>
                <path d="M102 210 L260 226 L438 210 L280 194 Z" />
                <path d="M102 210 L102 198 L260 214 L260 226 M260 226 L260 214 L438 198 L438 210" />
                <path d="M280 194 L280 182 L102 198 M280 182 L438 198" />
                <text className={mono.className} x="454" y="206" fontSize="8" fill={stroke} stroke="none" letterSpacing="2">T-01</text>
              </g>

              {/* S-01 STYLING */}
              <g>
                <path d="M118 182 L260 194 L422 182 L280 170 Z" />
                <path d="M118 182 L118 172 L260 184 L260 194 M260 194 L260 184 L422 172 L422 182" />
                <path d="M280 170 L280 160 L118 172 M280 160 L422 172" />
                <text className={mono.className} x="438" y="178" fontSize="8" fill={stroke} stroke="none" letterSpacing="2">S-01</text>
              </g>

              {/* C-01 COMPONENT */}
              <g>
                <path d="M134 160 L260 168 L406 160 L280 152 Z" />
                <path d="M134 160 L134 152 L260 160 L260 168 M260 168 L260 160 L406 152 L406 160" />
                <path d="M280 152 L280 144 L134 152 M280 144 L406 152" />
                <text className={mono.className} x="422" y="156" fontSize="8" fill={stroke} stroke="none" letterSpacing="2">C-01</text>
              </g>

              {/* F-01 FRAMEWORK */}
              <g>
                <path d="M150 144 L260 148 L390 144 L280 140 Z" />
                <path d="M150 144 L150 138 L260 142 L260 148 M260 148 L260 142 L390 138 L390 144" />
                <path d="M280 140 L280 134 L150 138 M280 134 L390 138" />
                <text className={mono.className} x="406" y="140" fontSize="8" fill={stroke} stroke="none" letterSpacing="2">F-01</text>
              </g>

              {/* Vertical connector / spine */}
              <g stroke={dim} strokeDasharray="3 3">
                <path d="M260 132 L260 348" />
              </g>

              {/* Dimension callouts */}
              <g stroke={stroke} strokeWidth="0.5" opacity="0.6">
                <path d="M30 144 L30 320" />
                <path d="M26 144 L34 144 M26 320 L34 320" />
              </g>
              <text className={mono.className} x="14" y="236" fontSize="8" fill={stroke} stroke="none" letterSpacing="2" transform="rotate(-90 14 236)">6 LAYERS</text>

              {/* Top callout */}
              <g stroke={red} strokeWidth="0.6">
                <circle cx="270" cy="138" r="5" fill="none" />
                <path d="M275 138 L320 110" />
              </g>
              <text className={mono.className} x="324" y="108" fontSize="9" fill={red} stroke="none" letterSpacing="2">RUNTIME APEX</text>
            </svg>
          </div>

          {/* Legend */}
          <div className={mono.className} style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", lineHeight: 1.9 }}>
            <div style={{ fontSize: 11, marginBottom: 14, opacity: 0.7 }}>LEGEND &nbsp;/&nbsp; KEY</div>
            <div style={{ height: 1, background: stroke, opacity: 0.35, marginBottom: 18 }} />
            <div style={{ display: "grid", gap: 10 }}>
              <LegendRow swatch={stroke} label="PRIMARY LINEWORK · 0.9 PT" />
              <LegendRow swatch={dim} label="REFERENCE / GRID · 0.6 PT" />
              <LegendRow swatch={red} label="DETAIL CALLOUT · 1.0 PT" />
            </div>
            <div style={{ height: 1, background: stroke, opacity: 0.35, margin: "24px 0 18px" }} />
            <p className={sans.className} style={{ fontSize: 12, letterSpacing: "0.04em", textTransform: "none", opacity: 0.78, lineHeight: 1.65, margin: 0 }}>
              All six systems are owned and operated under one roof. Layer A-01 (KPT Agents, sister company) bonds to the deployment slab — your inbound phone agent is wired to the same stack that builds your site.
            </p>
            <div className={mono.className} style={{ marginTop: 22, color: red }}>NOTE 01 &nbsp;·&nbsp; ONE PROCESS / ONE BILL / ONE TEAM</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LegendRow({ swatch, label }: { swatch: string; label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <span style={{ width: 28, height: 0, borderTop: `2px solid ${swatch}` }} />
      <span style={{ opacity: 0.85 }}>{label}</span>
    </div>
  );
}
