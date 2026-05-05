import { IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Serif } from "next/font/google";

const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-plex-mono" });
const plexSans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-plex-sans" });
const plexSerif = IBM_Plex_Serif({ subsets: ["latin"], weight: ["400"], style: ["normal", "italic"], variable: "--font-plex-serif" });

const PAPER = "#F4EFE0";
const INK = "#1A1A1A";
const IBM_BLUE = "#1D5CB6";
const SUB_RED = "#A4262C";
const AMBER = "#C9A30D";

type Procedure = {
  id: string;
  title: string;
  abstract: string;
  steps: { n: string; text: string }[];
  warning?: string;
};

const PROCEDURES: Procedure[] = [
  {
    id: "4.1",
    title: "PROCEDURE: INITIATE PROJECT",
    abstract: "Establishes a binding scope of work between Operator (client) and Vendor (KPT Designs). All downstream procedures depend on the artefacts produced herein.",
    steps: [
      { n: "STEP 1", text: "Schedule discovery call." },
      { n: "STEP 2", text: "Document scope, timeline, budget." },
      { n: "STEP 3", text: "Sign agreement." },
    ],
    warning: "Do not proceed to §4.2 without a counter-signed agreement on file. Verbal scope is non-binding.",
  },
  {
    id: "4.2",
    title: "PROCEDURE: BUILD AND REVIEW",
    abstract: "Iterative construction of the deliverable against the signed scope. Review check-ins are mandatory and recorded.",
    steps: [
      { n: "STEP 1", text: "Design phase commences." },
      { n: "STEP 2", text: "Weekly review check-ins." },
      { n: "STEP 3", text: "Iterate until specifications met." },
    ],
  },
  {
    id: "4.3",
    title: "PROCEDURE: LAUNCH",
    abstract: "Promotion of the deliverable from staging to public production. Requires Operator sign-off prior to execution.",
    steps: [
      { n: "STEP 1", text: "Deploy to private staging." },
      { n: "STEP 2", text: "Operator (client) approval." },
      { n: "STEP 3", text: "Public deployment." },
    ],
    warning: "Public deployment is irreversible without rollback procedure §6.2. Confirm DNS, SSL, and analytics before issuing the launch token.",
  },
  {
    id: "4.4",
    title: "PROCEDURE: HANDOVER",
    abstract: "Transfers full operational ownership to the Operator. Vendor retains no production credentials post-handover.",
    steps: [
      { n: "STEP 1", text: "Source code repository transferred." },
      { n: "STEP 2", text: "Deployment credentials transferred." },
      { n: "STEP 3", text: "Documentation transferred." },
      { n: "STEP 4", text: "KPT Agent (optional) connected." },
    ],
  },
];

const mono = "var(--font-plex-mono), monospace";
const sans = "var(--font-plex-sans), sans-serif";
const serif = "var(--font-plex-serif), serif";

const smallCaps: React.CSSProperties = {
  fontFamily: mono,
  fontVariantCaps: "all-small-caps",
  textTransform: "lowercase",
  letterSpacing: "0.08em",
};

function Warning({ text }: { text: string }) {
  return (
    <div
      style={{
        marginTop: "1.25rem",
        border: `1px solid ${AMBER}`,
        background: "rgba(201, 163, 13, 0.08)",
        padding: "0.85rem 1rem",
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        columnGap: "0.9rem",
        alignItems: "start",
      }}
    >
      <span style={{ fontFamily: sans, fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.18em", color: AMBER, background: INK, padding: "0.18rem 0.55rem", lineHeight: 1.4 }}>
        ! WARNING
      </span>
      <span style={{ fontFamily: mono, fontSize: "0.78rem", letterSpacing: "0.04em", lineHeight: 1.6, color: INK }}>
        {text}
      </span>
    </div>
  );
}

function ProcedureBlock({ proc }: { proc: Procedure }) {
  return (
    <article style={{ paddingTop: "2.25rem", paddingBottom: "2.25rem" }}>
      <header style={{ display: "flex", gap: "1rem", alignItems: "baseline" }}>
        <span style={{ fontFamily: mono, fontSize: "0.85rem", color: SUB_RED, fontWeight: 500, letterSpacing: "0.05em" }}>
          §{proc.id}
        </span>
        <h3 style={{ fontFamily: sans, fontWeight: 700, fontSize: "clamp(1.05rem, 1.6vw, 1.25rem)", color: IBM_BLUE, letterSpacing: "0.02em", margin: 0 }}>
          {proc.title}
        </h3>
      </header>

      <p style={{ fontFamily: serif, fontSize: "0.95rem", lineHeight: 1.65, color: INK, maxWidth: "62ch", margin: "0.85rem 0 1.25rem" }}>
        {proc.abstract}
      </p>

      <ol style={{ listStyle: "none", padding: 0, margin: 0, borderTop: `1px dashed ${INK}33` }}>
        {proc.steps.map((s) => (
          <li
            key={s.n}
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(5.5rem, auto) 1fr",
              columnGap: "1.25rem",
              padding: "0.7rem 0",
              borderBottom: `1px dashed ${INK}33`,
              alignItems: "baseline",
            }}
          >
            <span style={{ ...smallCaps, fontSize: "0.82rem", letterSpacing: "0.16em", color: IBM_BLUE, fontWeight: 600 }}>
              {s.n}
            </span>
            <span style={{ ...smallCaps, fontSize: "0.92rem", color: INK, lineHeight: 1.55 }}>
              {s.text}
            </span>
          </li>
        ))}
      </ol>

      {proc.warning && <Warning text={proc.warning} />}
    </article>
  );
}

export default function ProcessOperator() {
  return (
    <section
      id="ch-4"
      className={`${plexMono.variable} ${plexSans.variable} ${plexSerif.variable}`}
      style={{
        background: PAPER,
        color: INK,
        padding: "clamp(3rem, 7vw, 6rem) clamp(1.25rem, 5vw, 4rem)",
        borderTop: `1px solid ${INK}22`,
      }}
    >
      <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: "1rem",
            fontFamily: mono,
            fontSize: "0.72rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: `${INK}99`,
            paddingBottom: "0.6rem",
            borderBottom: `1px solid ${INK}33`,
          }}
        >
          <span>KPT-DESIGNS / OPERATOR MANUAL / REV. 2026.04</span>
          <span>CH. 4 — PG. 047</span>
        </div>

        <header style={{ paddingTop: "1.6rem", paddingBottom: "1.4rem" }}>
          <div style={{ fontFamily: mono, fontSize: "0.78rem", letterSpacing: "0.18em", color: SUB_RED, textTransform: "uppercase", marginBottom: "0.5rem" }}>
            Chapter 4 · Procedures
          </div>
          <h2 style={{ fontFamily: sans, fontWeight: 700, fontSize: "clamp(1.6rem, 3.4vw, 2.4rem)", color: INK, margin: 0, letterSpacing: "0.005em", lineHeight: 1.1 }}>
            4.0 OPERATING PROCEDURES
          </h2>
          <div style={{ marginTop: "0.9rem", height: "3px", width: "100%", background: IBM_BLUE }} />
          <div style={{ marginTop: "0.35rem", height: "1px", width: "100%", background: IBM_BLUE, opacity: 0.5 }} />
          <p style={{ fontFamily: serif, fontStyle: "italic", fontSize: "0.95rem", lineHeight: 1.65, color: `${INK}CC`, maxWidth: "64ch", marginTop: "1.1rem" }}>
            The following procedures govern the lifecycle of a standard engagement — from initial contact through final handover. Each subsection is to be executed in sequence. Deviations require written variance from the Vendor.
          </p>
        </header>

        {PROCEDURES.map((proc, i) => (
          <div key={proc.id}>
            {i > 0 && (
              <div
                aria-hidden
                style={{ height: "1px", background: IBM_BLUE, opacity: 0.35, margin: "0.25rem 0" }}
              />
            )}
            <ProcedureBlock proc={proc} />
          </div>
        ))}

        <footer
          style={{
            marginTop: "2.5rem",
            paddingTop: "0.8rem",
            borderTop: `1px solid ${INK}33`,
            display: "flex",
            justifyContent: "space-between",
            fontFamily: mono,
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
            color: `${INK}88`,
            textTransform: "uppercase",
          }}
        >
          <span>END OF CHAPTER 4</span>
          <span>CONT. §5.0 — MAINTENANCE →</span>
        </footer>
      </div>
    </section>
  );
}
