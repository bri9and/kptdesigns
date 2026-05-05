import Image from "next/image";
import { Roboto, Roboto_Mono } from "next/font/google";
import { portfolio } from "@/lib/portfolio";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

// Architectural drafting palette
const PAPER = "#0E1E2E";
const INK = "#E8EAEC";
const CYAN = "#3D8DBF";
const RED = "#D03030";
const FAINT = "rgba(232,234,236,0.18)";

const BLUEPRINT_FILTER = "brightness(0.55) contrast(1.45) hue-rotate(180deg) saturate(1.1)";

function plateHref(item: { href?: string; url: string }) {
  return item.href ?? `https://${item.url}`;
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export default function PortfolioArchitectural() {
  const elevations = portfolio.slice(0, 6);

  return (
    <section
      id="elevations"
      className={`${roboto.className} relative overflow-hidden`}
      style={{ background: PAPER, color: INK, padding: "8rem 0 10rem" }}
    >
      {/* Faint drafting grid that runs through the whole section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(${FAINT} 1px, transparent 1px),
            linear-gradient(90deg, ${FAINT} 1px, transparent 1px),
            linear-gradient(rgba(61,141,191,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(61,141,191,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "120px 120px, 120px 120px, 24px 24px, 24px 24px",
          opacity: 0.6,
        }}
      />

      {/* Sheet header */}
      <header className="relative z-10 mx-auto max-w-[1400px] px-8 md:px-16">
        <div className="flex items-end justify-between gap-8 border-b pb-6" style={{ borderColor: INK }}>
          <div>
            <div className={`${robotoMono.className} text-[11px] tracking-[0.3em] uppercase`} style={{ color: CYAN }}>
              Drawing Set · Vol. III
            </div>
            <h2
              className={`${robotoMono.className} mt-3 text-[clamp(1.5rem,2.6vw,2.4rem)] tracking-[0.18em] uppercase font-medium`}
              style={{ color: INK }}
            >
              Sheet A-004 <span style={{ color: RED }}>·</span> Elevations{" "}
              <span style={{ color: RED }}>·</span> Completed Projects
            </h2>
          </div>
          <div className={`${robotoMono.className} hidden md:block text-right text-[10px] tracking-[0.25em] uppercase`} style={{ color: "rgba(232,234,236,0.55)" }}>
            <div>Scale 1 : 100</div>
            <div>Rev. 04 / 26</div>
            <div style={{ color: RED }}>06 of {portfolio.length} shown</div>
          </div>
        </div>
        {/* Red rule */}
        <div className="mt-[-1px] h-[3px] w-32" style={{ background: RED }} />
      </header>

      {/* Plates */}
      <div className="relative z-10 mx-auto mt-16 grid max-w-[1400px] grid-cols-1 gap-x-12 gap-y-20 px-8 md:grid-cols-2 md:px-16">
        {elevations.map((p, i) => {
          const num = `ELEV. ${pad(i + 1)}`;
          const dimW = `${18 + ((i * 7) % 12)}m`;
          const dimH = `${4 + ((i * 3) % 6)}m`;

          return (
            <a
              key={p.url}
              href={plateHref(p)}
              target={p.href ? undefined : "_blank"}
              rel={p.href ? undefined : "noopener noreferrer"}
              className="group relative block focus:outline-none"
            >
              {/* Plate label row */}
              <div className={`${robotoMono.className} flex items-center justify-between text-[10px] tracking-[0.3em] uppercase`}>
                <span style={{ color: CYAN }}>{num}</span>
                <span style={{ color: "rgba(232,234,236,0.45)" }}>
                  KPT-{pad(i + 1)} / A-004
                </span>
              </div>

              {/* Plate frame */}
              <div
                className="relative mt-3 aspect-[4/3] w-full overflow-hidden border transition-all duration-700"
                style={{ borderColor: INK, background: "#0A1622" }}
              >
                {/* Corner ticks */}
                {(["tl", "tr", "bl", "br"] as const).map((c) => (
                  <span
                    key={c}
                    aria-hidden
                    className="absolute z-20 h-3 w-3"
                    style={{
                      borderColor: RED,
                      borderStyle: "solid",
                      borderWidth: 0,
                      ...(c === "tl" && { top: -1, left: -1, borderTopWidth: 2, borderLeftWidth: 2 }),
                      ...(c === "tr" && { top: -1, right: -1, borderTopWidth: 2, borderRightWidth: 2 }),
                      ...(c === "bl" && { bottom: -1, left: -1, borderBottomWidth: 2, borderLeftWidth: 2 }),
                      ...(c === "br" && { bottom: -1, right: -1, borderBottomWidth: 2, borderRightWidth: 2 }),
                    }}
                  />
                ))}

                {/* Blueprint image */}
                {p.image && (
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1200ms] group-hover:scale-[1.02]"
                    style={{ filter: BLUEPRINT_FILTER }}
                  />
                )}

                {/* Cyan blueprint wash */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(14,30,46,0.45) 0%, rgba(61,141,191,0.25) 50%, rgba(14,30,46,0.55) 100%)",
                    mixBlendMode: "multiply",
                  }}
                />
                {/* Inner grid overlay continuing through plate */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(61,141,191,0.18) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(61,141,191,0.18) 1px, transparent 1px)
                    `,
                    backgroundSize: "24px 24px",
                  }}
                />

                {/* Hover dimension callouts */}
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  {/* Horizontal width dimension at top */}
                  <div className="absolute left-6 right-6 top-3 flex items-center gap-2">
                    <span className="block h-px flex-1" style={{ background: RED }} />
                    <span
                      className={`${robotoMono.className} text-[10px] tracking-[0.25em] uppercase px-2`}
                      style={{ color: RED, background: PAPER }}
                    >
                      {dimW}
                    </span>
                    <span className="block h-px flex-1" style={{ background: RED }} />
                  </div>
                  {/* Vertical height dimension at right */}
                  <div className="absolute right-3 bottom-6 top-10 flex flex-col items-center gap-2">
                    <span className="block w-px flex-1" style={{ background: RED }} />
                    <span
                      className={`${robotoMono.className} text-[10px] tracking-[0.25em] uppercase py-1`}
                      style={{ color: RED, background: PAPER, writingMode: "vertical-rl" }}
                    >
                      {dimH}
                    </span>
                    <span className="block w-px flex-1" style={{ background: RED }} />
                  </div>
                  {/* Section reference bubble */}
                  <div
                    className={`${robotoMono.className} absolute bottom-3 left-3 flex h-8 w-8 items-center justify-center rounded-full text-[9px] tracking-[0.15em]`}
                    style={{ border: `1.5px solid ${RED}`, color: RED, background: PAPER }}
                  >
                    A{i + 1}
                  </div>
                </div>
              </div>

              {/* Title block (drafting cartouche) */}
              <div className="mt-4 grid grid-cols-[1fr_auto] gap-4 border-t pt-3" style={{ borderColor: "rgba(232,234,236,0.4)" }}>
                <div className="min-w-0">
                  <div className="flex items-baseline gap-3">
                    <h3 className="truncate text-[1.15rem] font-bold leading-tight" style={{ color: INK }}>
                      {p.name}
                    </h3>
                  </div>
                  <div className={`${robotoMono.className} mt-1 text-[10px] tracking-[0.25em] uppercase`} style={{ color: CYAN }}>
                    {p.category} <span style={{ color: "rgba(232,234,236,0.4)" }}>/</span> {p.url}
                  </div>
                  <p className={`${roboto.className} mt-2 line-clamp-1 text-[0.85rem] leading-snug`} style={{ color: "rgba(232,234,236,0.7)" }}>
                    {p.desc}
                  </p>
                </div>
                {/* Mini dimension callout (always visible) */}
                <div className={`${robotoMono.className} flex flex-col items-end justify-between text-[9px] tracking-[0.25em] uppercase`} style={{ color: "rgba(232,234,236,0.55)" }}>
                  <span style={{ color: CYAN }}>{dimW} × {dimH}</span>
                  <span>SHT {pad(i + 1)}/06</span>
                </div>
              </div>
            </a>
          );
        })}
      </div>

      {/* Footer drafting strip */}
      <div className="relative z-10 mx-auto mt-20 max-w-[1400px] px-8 md:px-16">
        <div className={`${robotoMono.className} flex items-center justify-between border-t pt-4 text-[10px] tracking-[0.3em] uppercase`} style={{ borderColor: "rgba(232,234,236,0.3)", color: "rgba(232,234,236,0.5)" }}>
          <span>KPT Designs · Architectural Drawings</span>
          <span style={{ color: RED }}>End of Sheet A-004</span>
        </div>
      </div>
    </section>
  );
}
