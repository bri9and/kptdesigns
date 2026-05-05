import { IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Serif } from "next/font/google";

const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600"] });
const plexSans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const plexSerif = IBM_Plex_Serif({ subsets: ["latin"], weight: ["400", "600"] });

// V20 — Operator Manual palette
const PAPER = "#F4EFE0";
const INK = "#1A1A1A";
const IBM_BLUE = "#1D5CB6";
const SUB_RED = "#A4262C";
const AMBER = "#C9A30D";

const SERIF_BODY = `${plexSerif.className} text-[17px] leading-[1.7] md:text-[18px]`;
const MONO_INLINE = `${plexMono.className}`;

/**
 * Chapter 1 of the operator's manual. Set as a real technical document:
 * a marginal column of spec data, a body column of prose, and numbered
 * subsections separated by IBM-blue hairline rules.
 */
export default function PhilosophyOperator() {
  return (
    <section
      aria-labelledby="ch-1-philosophy"
      style={{ background: PAPER, color: INK }}
      className="relative w-full"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(26,26,26,0.025) 0px, rgba(26,26,26,0.025) 1px, transparent 1px, transparent 4px)",
          mixBlendMode: "multiply",
          opacity: 0.5,
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
        {/* Running header */}
        <div
          className={`${plexMono.className} flex items-baseline justify-between text-[11px] uppercase tracking-[0.18em]`}
          style={{ color: INK, opacity: 0.55 }}
        >
          <span>KPT-DESIGNS / OPERATOR&apos;S MANUAL</span>
          <span>SECTION 1 · PAGE 003</span>
        </div>
        <div className="mt-3 h-px w-full" style={{ background: INK, opacity: 0.25 }} />

        {/* Chapter heading */}
        <header className="mt-10 md:mt-14">
          <div
            className={`${plexMono.className} text-[11px] uppercase tracking-[0.22em]`}
            style={{ color: IBM_BLUE }}
          >
            CHAPTER ONE
          </div>
          <h2
            id="ch-1-philosophy"
            className={`${plexSans.className} mt-2 text-[40px] font-bold leading-[1.05] md:text-[56px]`}
            style={{ color: INK, letterSpacing: "-0.01em" }}
          >
            1.0 PHILOSOPHY
          </h2>
          <div className="mt-5 h-[3px] w-full" style={{ background: IBM_BLUE }} />
          <div
            className={`${plexMono.className} mt-3 flex flex-wrap items-baseline gap-x-6 gap-y-1 text-[11px] uppercase tracking-[0.16em]`}
            style={{ color: INK, opacity: 0.7 }}
          >
            <span>DOC-ID · KPT/OM/CH1</span>
            <span>REV · 04</span>
            <span style={{ color: IBM_BLUE }}>STATUS · STABLE</span>
            <span>CLASS · OPERATING PRINCIPLES</span>
          </div>
        </header>

        <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-10 md:mt-16 md:grid-cols-[180px_1fr]">
          {/* Marginal column */}
          <aside
            className={`${plexMono.className} hidden text-[11px] leading-[1.7] md:block`}
            style={{ color: INK }}
          >
            <div className="mb-2 h-px w-full" style={{ background: INK, opacity: 0.2 }} />
            <div className="uppercase tracking-[0.16em]" style={{ opacity: 0.5 }}>REF</div>
            <div className="mt-2">§1.1 OPERATING</div>
            <div>§1.2 OWNERSHIP</div>
            <div>§1.3 EXIT</div>

            <div className="my-5 h-px w-full" style={{ background: INK, opacity: 0.2 }} />
            <div className="uppercase tracking-[0.16em]" style={{ opacity: 0.5 }}>KEY</div>
            <KeySwatch color={IBM_BLUE} label="SPEC" />
            <KeySwatch color={SUB_RED} label="NOTE" />
            <KeySwatch color={AMBER} label="CAUTION" />
          </aside>

          {/* Body column */}
          <div>
            <Subsection number="1.1" title="OPERATING PRINCIPLES">
              <p className={SERIF_BODY}>
                This system is hand-coded from raw markup.{" "}
                <span className={MONO_INLINE} style={{ color: IBM_BLUE }}>Templates are not used.</span>{" "}
                <span className={MONO_INLINE} style={{ color: IBM_BLUE }}>Page builders are not used.</span>{" "}
                The Operator&apos;s Manual emphasizes that this is for one reason: every line of
                markup is a deliberate choice, and every deliberate choice is documented in the
                source.
              </p>
              <Note>
                NOTE 1.1.a — &ldquo;Deliberate&rdquo; in this manual means an explicit,
                reviewable line of source. Generated, scaffolded, or opaque output does not
                satisfy this definition.
              </Note>
            </Subsection>

            <Subsection number="1.2" title="SOURCE OWNERSHIP">
              <p className={SERIF_BODY}>
                Upon project completion, the Operator (the client) receives the complete source
                code, deployment configuration, and documentation.{" "}
                <span className={MONO_INLINE} style={{ color: IBM_BLUE }}>No retainer is required.</span>{" "}
                <span className={MONO_INLINE} style={{ color: IBM_BLUE }}>No proprietary tooling locks the system.</span>
              </p>
              <SpecBlock
                rows={[
                  ["DELIVERABLE_01", "git repository · full history"],
                  ["DELIVERABLE_02", "deployment configuration"],
                  ["DELIVERABLE_03", "domain & DNS records"],
                  ["DELIVERABLE_04", "operator handover documentation"],
                ]}
              />
            </Subsection>

            <Subsection number="1.3" title="LOCK-IN AVOIDANCE">
              <p className={SERIF_BODY}>
                The Operator may at any point hire any developer to maintain the system. The KPT
                Designs role is{" "}
                <span className={MONO_INLINE} style={{ color: IBM_BLUE }}>consultative</span>{" "}
                once delivery is complete.
              </p>
              <Note>
                NOTE 1.3.a — Severance from the original author must not degrade system function.
                Standard tooling, standard runtime, standard repository.
              </Note>
            </Subsection>

            <div className="mt-14 flex items-center gap-3" aria-hidden>
              <div className="h-px flex-1" style={{ background: INK, opacity: 0.3 }} />
              <span
                className={`${plexMono.className} text-[11px] uppercase tracking-[0.22em]`}
                style={{ color: INK, opacity: 0.55 }}
              >
                END · CHAPTER 1
              </span>
              <div className="h-px flex-1" style={{ background: INK, opacity: 0.3 }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function KeySwatch({ color, label }: { color: string; label: string }) {
  return (
    <div className="mt-2 flex items-center gap-2">
      <span className="inline-block h-2 w-2" style={{ background: color }} />
      <span>{label}</span>
    </div>
  );
}

function Subsection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className="mb-12 last:mb-0">
      <div className="flex items-baseline gap-4">
        <span className={`${plexMono.className} text-[12px] tabular-nums`} style={{ color: IBM_BLUE }}>
          §{number}
        </span>
        <h3
          className={`${plexSans.className} text-[18px] font-bold uppercase tracking-[0.06em] md:text-[20px]`}
          style={{ color: INK }}
        >
          {number} {title}
        </h3>
      </div>
      <div className="mb-5 mt-2 h-px w-full" style={{ background: IBM_BLUE, opacity: 0.65 }} />
      <div className="pl-0 md:pl-[2.5rem]">{children}</div>
    </article>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-5 border-l-[3px] py-2 pl-4" style={{ borderColor: SUB_RED }}>
      <p className={`${plexMono.className} text-[12.5px] leading-[1.65]`} style={{ color: SUB_RED }}>
        {children}
      </p>
    </div>
  );
}

function SpecBlock({ rows }: { rows: [string, string][] }) {
  return (
    <div className="mt-5 border" style={{ borderColor: INK, background: "rgba(29,92,182,0.04)" }}>
      <div
        className={`${plexMono.className} flex items-center justify-between border-b px-3 py-1.5 text-[10.5px] uppercase tracking-[0.18em]`}
        style={{ borderColor: INK, color: PAPER, background: INK }}
      >
        <span>SPEC · §1.2 DELIVERABLES</span>
        <span style={{ color: AMBER }}>OPERATOR-OWNED</span>
      </div>
      <table className={`${plexMono.className} w-full text-[12.5px]`}>
        <tbody>
          {rows.map(([k, v], i) => (
            <tr key={k} style={{ borderTop: i === 0 ? "none" : "1px dashed rgba(26,26,26,0.25)" }}>
              <td className="w-[44%] px-3 py-2 align-top" style={{ color: IBM_BLUE }}>{k}</td>
              <td className="px-3 py-2 align-top" style={{ color: INK }}>{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
