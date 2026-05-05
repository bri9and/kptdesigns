import Link from "next/link";
import { Playfair_Display, Source_Serif_4, IBM_Plex_Mono } from "next/font/google";

const masthead = Playfair_Display({ subsets: ["latin"], weight: ["900"], style: ["normal", "italic"], variable: "--font-masthead" });
const body = Source_Serif_4({ subsets: ["latin"], weight: ["400", "600", "700"], style: ["normal", "italic"], variable: "--font-body" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-mono" });

const INK = "#1A1A1A";
const NEWSPRINT = "#F5F0E1";
const HALFTONE = "#999999";
const RED = "#A4262C";
const YEL = "#F4E97D";
const HL = { background: `linear-gradient(transparent 55%, ${YEL} 55%, ${YEL} 92%, transparent 92%)`, padding: "0 2px" };

const SERVICES = [
  { t: "Registrar", b: "Domain held in your name from day one. No middlemen, no held hostages." },
  { t: "Host", b: "Production hosting under one roof. One ticket queue. One throat to choke." },
  { t: "Designer & Builder", b: "Hand-coded design and engineering — no template, no page-builder grime." },
  { t: "AI Phone Agents", b: "Inbound voice agents via sister brand KPT Agents — answering after hours." },
];
const STATS = [
  { l: "Sites Shipped", v: "47" },
  { l: "Templates Used", v: "00" },
  { l: "Clients Retained", v: "100%" },
  { l: "Years Operating", v: "XXII" },
];
const TICKER: { s: string; p: string; d: string; u: boolean }[] = [
  { s: "KPT", p: "204.04", d: "+2.22", u: true },
  { s: "DSGN", p: "081.50", d: "+0.75", u: true },
  { s: "TMPL", p: "012.10", d: "-3.40", u: false },
  { s: "BSPK", p: "311.88", d: "+1.04", u: true },
  { s: "AGNT", p: "099.00", d: "+4.12", u: true },
];

const Ornament = () => (
  <div className="my-1 flex items-center justify-center gap-3" aria-hidden>
    <span className="h-px flex-1" style={{ background: INK }} />
    <span style={{ fontFamily: "var(--font-masthead)", fontStyle: "italic", fontSize: 18 }}>❦ ❦ ❦</span>
    <span className="h-px flex-1" style={{ background: INK }} />
  </div>
);
const Rule = ({ s }: { s?: boolean }) => (
  <div aria-hidden className={s ? "my-1" : "my-2"} style={{ height: s ? 3 : 5, borderTop: `1px solid ${INK}`, borderBottom: `1px solid ${INK}` }} />
);

export default function HeroBroadsheet() {
  return (
    <section
      className={`${masthead.variable} ${body.variable} ${mono.variable} relative w-full overflow-hidden`}
      style={{ background: NEWSPRINT, color: INK, paddingTop: "calc(var(--nav-height, 80px) + 24px)", paddingBottom: 64 }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          mixBlendMode: "multiply", opacity: 0.35,
          backgroundImage: "radial-gradient(rgba(26,26,26,0.08) 0.7px, transparent 0.7px), radial-gradient(rgba(26,26,26,0.05) 1.2px, transparent 1.2px)",
          backgroundSize: "3px 3px, 7px 7px", backgroundPosition: "0 0, 1px 2px",
        }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-1/2 hidden md:block"
        style={{ width: 1, background: "linear-gradient(to bottom, transparent 0%, rgba(26,26,26,0.07) 8%, rgba(26,26,26,0.07) 92%, transparent 100%)" }} />

      <div className="relative mx-auto w-full max-w-[1320px] px-5 md:px-8">
        {/* Edition bar */}
        <div className="flex items-end justify-between border-b pb-2" style={{ borderColor: INK, fontFamily: "var(--font-mono)" }}>
          <span className="text-[10px] uppercase tracking-[0.2em]">Late City Edition · Wire Copy</span>
          <span className="hidden text-[10px] uppercase tracking-[0.2em] sm:inline">Established MMIV · Pittsburgh, PA</span>
          <span className="text-[10px] uppercase tracking-[0.2em]">Weather: Overcast · 54°</span>
        </div>

        {/* Masthead */}
        <header className="relative mt-4 text-center">
          <Ornament />
          <h1 className="mx-auto leading-[0.85]"
            style={{ fontFamily: "var(--font-masthead)", fontWeight: 900, fontSize: "clamp(56px, 13vw, 160px)", letterSpacing: "-0.01em", textShadow: "0 0 1px rgba(26,26,26,0.4)" }}>
            The KPT Gazette
          </h1>
          <Ornament />
          <div className="mt-2 flex flex-col items-center justify-between gap-1 text-[10px] uppercase tracking-[0.18em] sm:flex-row sm:text-[11px]"
            style={{ fontFamily: "var(--font-mono)" }}>
            <span>Vol. XXII · No. 04</span>
            <span className="font-semibold">Tuesday, April 28, 2026 · Pittsburgh</span>
            <span>Price <span style={{ color: RED }}>25¢</span></span>
          </div>
          <div className="mt-2 italic" style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#3a3a3a" }}>
            “One process · One bill · One team · Owned outright” — est. 2004
          </div>
          <Rule />
        </header>

        <p className="mt-5 text-center text-[10px] uppercase tracking-[0.35em]" style={{ fontFamily: "var(--font-mono)", color: RED }}>
          ★ Special Report · Industry & Craft ★
        </p>

        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-5">
          {/* COL 1 — Lead */}
          <article className="md:col-span-5 md:border-r md:pr-5" style={{ borderColor: HALFTONE }}>
            <p className="mb-1 text-[10px] uppercase tracking-[0.25em]" style={{ fontFamily: "var(--font-mono)", color: RED }}>Lead Story · From the Editors</p>
            <h2 className="font-black leading-[0.95]"
              style={{ fontFamily: "var(--font-masthead)", fontSize: "clamp(34px, 4.2vw, 54px)", letterSpacing: "-0.01em" }}>
              Hand-Coded Web Builds <span style={HL}>Persist</span> In Age of Templates
            </h2>
            <p className="mt-2 italic" style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "#3a3a3a" }}>
              Pittsburgh studio marks twenty-second year of operation; clients say bespoke beats boilerplate.
            </p>
            <div className="mt-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em]" style={{ fontFamily: "var(--font-mono)", color: "#3a3a3a" }}>
              <span>By the Editorial Desk</span><span style={{ color: HALFTONE }}>·</span><span>Filed 04:21 EDT</span>
            </div>
            <div className="mt-3 text-justify"
              style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.55, hyphens: "auto", WebkitHyphens: "auto" }}>
              <p>
                <span className="float-left mr-2 mt-1 leading-[0.8]"
                  style={{ fontFamily: "var(--font-masthead)", fontSize: 78, fontWeight: 900, paddingRight: 4 }}>P</span>
                ITTSBURGH — In an industry hurried by drag-and-drop builders, AI scaffolds, and a thousand interchangeable templates, a small studio on the city’s North Side has quietly hand-coded its way through twenty-two consecutive years of business. KPT Designs ships sites the old way: written by people, owned by clients, hosted under one roof.
              </p>
              <p className="mt-2">
                Founder-led and fiercely vertical, the firm acts as registrar, host, designer and builder in a single engagement — and now folds in inbound AI phone agents under sister brand <em>KPT Agents</em>. The result, partners say, is fewer vendors, fewer invoices, and one number to call when something breaks at 2 a.m.
              </p>
              <p className="mt-2">“Templates promise speed,” said one long-running client, “but they also promise sameness. We don’t want sameness.”</p>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <Link href="/start" className="inline-block border px-4 py-2 text-[11px] uppercase tracking-[0.22em]"
                style={{ borderColor: INK, background: INK, color: NEWSPRINT, fontFamily: "var(--font-mono)", fontWeight: 700 }}>
                Begin a Project →
              </Link>
              <Link href="/pricing" className="text-[11px] uppercase tracking-[0.22em] underline underline-offset-4"
                style={{ fontFamily: "var(--font-mono)", color: INK }}>See Rate Card</Link>
            </div>
            <p className="mt-3 text-[10px] uppercase tracking-[0.2em]" style={{ fontFamily: "var(--font-mono)", color: HALFTONE }}>Continued on Page A-3 →</p>
          </article>

          {/* COL 2 — Feature box */}
          <aside className="md:col-span-4 md:border-r md:pr-5" style={{ borderColor: HALFTONE }}>
            <p className="mb-1 text-[10px] uppercase tracking-[0.25em]" style={{ fontFamily: "var(--font-mono)", color: RED }}>Feature · The Stack</p>
            <div className="border-2 p-4" style={{ borderColor: INK, background: "rgba(255,255,255,0.35)", boxShadow: "3px 3px 0 0 rgba(26,26,26,0.85)" }}>
              <h3 className="leading-[0.95]"
                style={{ fontFamily: "var(--font-masthead)", fontWeight: 900, fontSize: "clamp(28px, 3vw, 40px)", letterSpacing: "-0.01em" }}>
                Four <span style={HL}>Services</span> In One House
              </h3>
              <p className="mt-1 italic" style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#3a3a3a" }}>
                A vertically integrated dispatch from the KPT bullpen.
              </p>
              <ul className="mt-3" style={{ fontFamily: "var(--font-body)", fontSize: 14 }}>
                {SERVICES.map((s, i) => (
                  <li key={s.t} className="flex items-start gap-3 py-2"
                    style={{ borderTop: i === 0 ? "none" : `1px dashed ${HALFTONE}` }}>
                    <span className="mt-[2px] inline-flex h-5 w-5 shrink-0 items-center justify-center border"
                      style={{ borderColor: INK, fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700, background: NEWSPRINT }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <div className="text-[13px] uppercase tracking-[0.16em]" style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}>{s.t}</div>
                      <div className="text-[13.5px] leading-snug" style={{ color: "#2a2a2a" }}>{s.b}</div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-3 border-t pt-2 text-[10px] uppercase tracking-[0.22em]"
                style={{ borderColor: INK, fontFamily: "var(--font-mono)", color: "#2a2a2a" }}>
                One Process · One Bill · One Team · Owned Outright
              </div>
            </div>
            <div className="mt-4">
              <p className="text-[10px] uppercase tracking-[0.25em]" style={{ fontFamily: "var(--font-mono)", color: RED }}>Editorial · Opinion</p>
              <h4 className="mt-1 leading-tight" style={{ fontFamily: "var(--font-masthead)", fontWeight: 900, fontSize: 22 }}>
                Why a Studio Should Answer Its Own Phone
              </h4>
              <p className="mt-1 italic" style={{ fontFamily: "var(--font-body)", fontSize: 13.5, lineHeight: 1.5, color: "#2a2a2a" }}>
                On accountability, ownership, and the slow virtue of maintaining what you ship — a note from the desk of the managing partner.
              </p>
            </div>
          </aside>

          {/* COL 3 — Sidebar */}
          <aside className="md:col-span-3">
            <p className="mb-1 text-[10px] uppercase tracking-[0.25em]" style={{ fontFamily: "var(--font-mono)", color: RED }}>By the Numbers</p>
            <div className="border p-3" style={{ borderColor: INK, background: "rgba(255,255,255,0.4)" }}>
              <div className="text-[10px] uppercase tracking-[0.22em]" style={{ fontFamily: "var(--font-mono)", color: "#2a2a2a" }}>Studio Box Score</div>
              <Rule s />
              <ul className="mt-1 space-y-2" style={{ fontFamily: "var(--font-mono)" }}>
                {STATS.map((x) => (
                  <li key={x.l} className="flex items-baseline justify-between gap-2 border-b pb-1"
                    style={{ borderColor: HALFTONE, borderBottomStyle: "dotted" }}>
                    <span className="text-[10px] uppercase tracking-[0.18em]">{x.l}</span>
                    <span className="font-bold" style={{ fontFamily: "var(--font-masthead)", fontSize: 22 }}>{x.v}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-[9.5px] uppercase tracking-[0.2em]" style={{ fontFamily: "var(--font-mono)", color: HALFTONE }}>Source: Internal · Audited Q1 2026</p>
            </div>

            <div className="mt-3 border" style={{ borderColor: INK }}>
              <div className="flex items-center justify-between border-b px-2 py-1 text-[9.5px] uppercase tracking-[0.22em]"
                style={{ borderColor: INK, background: INK, color: NEWSPRINT, fontFamily: "var(--font-mono)" }}>
                <span>KPT Tape · Closing Bell</span><span>04/28</span>
              </div>
              <ul className="text-[11px]" style={{ fontFamily: "var(--font-mono)" }}>
                {TICKER.map((t, i) => (
                  <li key={t.s} className="flex items-center justify-between px-2 py-1"
                    style={{ borderTop: i === 0 ? "none" : `1px dashed ${HALFTONE}` }}>
                    <span className="font-bold tracking-widest">{t.s}</span>
                    <span>{t.p}</span>
                    <span style={{ color: t.u ? "#1c5e2a" : RED, fontWeight: 700 }}>{t.u ? "▲" : "▼"} {t.d}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-3">
              <p className="text-[10px] uppercase tracking-[0.25em]" style={{ fontFamily: "var(--font-mono)", color: RED }}>Classifieds</p>
              <p className="mt-1 text-[12.5px] leading-snug" style={{ fontFamily: "var(--font-body)" }}>
                <strong>WANTED —</strong> Owners who want their websites back. Inquire within. Reply Box 2004,{" "}
                <Link href="/start" className="underline underline-offset-2">/start</Link>.
              </p>
            </div>
          </aside>
        </div>

        <Rule />
        <div className="mt-2 flex flex-col items-center justify-between gap-1 text-[10px] uppercase tracking-[0.22em] sm:flex-row"
          style={{ fontFamily: "var(--font-mono)", color: "#2a2a2a" }}>
          <span>Section A · Page 1</span>
          <span>Printed in Pittsburgh on recycled bits</span>
          <span>kptdesigns.com</span>
        </div>
      </div>
    </section>
  );
}
