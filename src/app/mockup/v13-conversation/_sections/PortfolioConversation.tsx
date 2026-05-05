"use client";

import { Inter } from "next/font/google";
import { portfolio } from "@/lib/portfolio";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const ACCENT = "#6B4EE6";
const AGENT_SURFACE = "#1A1A2E";

export default function PortfolioConversation() {
  const items = portfolio.slice(0, 6);

  return (
    <section
      className={`${inter.className} relative w-full bg-[#FAFAFA] px-4 py-20 md:px-8 md:py-28`}
      style={{ paddingTop: "max(5rem, calc(var(--nav-height, 80px) + 2rem))" }}
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-5">
        {/* USER bubble */}
        <div className="flex w-full justify-end">
          <div className="flex max-w-[80%] flex-col items-end gap-1.5">
            <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-400">
              You
            </span>
            <div
              className="rounded-2xl rounded-tr-sm px-5 py-3.5 text-[15px] font-normal leading-relaxed text-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(107,78,230,0.45)]"
              style={{ backgroundColor: ACCENT }}
            >
              Show me some recent work.
            </div>
          </div>
        </div>

        {/* AGENT bubble */}
        <div className="flex w-full flex-col gap-3">
          <div className="flex max-w-full items-start gap-3 md:max-w-[88%]">
            <div
              className="mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-full text-[13px] font-semibold text-white shadow-sm"
              style={{ backgroundColor: AGENT_SURFACE }}
              aria-hidden
            >
              <span
                className="block h-2 w-2 rounded-full"
                style={{ backgroundColor: "#00C896" }}
              />
            </div>

            <div className="flex flex-1 flex-col gap-1.5">
              <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-500">
                KPT Agent
              </span>
              <div
                className="rounded-2xl rounded-tl-sm px-5 py-3.5 text-[15px] font-normal leading-relaxed text-neutral-100 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-12px_rgba(26,26,46,0.35)]"
                style={{ backgroundColor: AGENT_SURFACE }}
              >
                Here are 6 recent client sites. Click any to view.
              </div>
            </div>
          </div>

          {/* Card strip — sits under the agent bubble, indented to align with text column */}
          <div className="md:pl-12">
            <div
              className="
                -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 pt-2
                md:mx-0 md:px-0
                [scrollbar-width:thin]
                [&::-webkit-scrollbar]:h-1.5
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-neutral-300
                [&::-webkit-scrollbar-track]:bg-transparent
              "
            >
              {items.map((p) => {
                const dest = p.href ? p.href : `https://${p.url}`;
                const isExternal = !p.href;
                return (
                  <a
                    key={p.name}
                    href={dest}
                    {...(isExternal
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="
                      group relative flex w-[78%] flex-none snap-start flex-col
                      overflow-hidden rounded-xl bg-white
                      shadow-[0_1px_2px_rgba(20,20,30,0.06),0_12px_28px_-16px_rgba(20,20,30,0.18)]
                      ring-1 ring-black/5
                      transition-all duration-300 ease-out
                      hover:-translate-y-1
                      hover:shadow-[0_2px_4px_rgba(20,20,30,0.08),0_24px_44px_-20px_rgba(107,78,230,0.35)]
                      sm:w-[58%] md:w-[300px]
                    "
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                      {p.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={p.image}
                          alt={p.name}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                        />
                      ) : (
                        <div
                          className="h-full w-full"
                          style={{
                            background:
                              "linear-gradient(135deg, #1A1A2E 0%, #6B4EE6 100%)",
                          }}
                        />
                      )}
                      {/* subtle dark overlay */}
                      <div
                        className="pointer-events-none absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(10,10,20,0.05) 0%, rgba(10,10,20,0.25) 100%)",
                        }}
                      />
                    </div>

                    {/* Body */}
                    <div className="flex flex-1 flex-col gap-2 p-4">
                      <span
                        className="font-mono text-[10px] uppercase tracking-[0.18em]"
                        style={{ color: ACCENT }}
                      >
                        {p.category}
                      </span>
                      <h3 className="text-[15px] font-medium leading-snug text-neutral-900">
                        {p.name}
                      </h3>
                      <p className="line-clamp-1 text-[13px] leading-relaxed text-neutral-500">
                        {p.desc}
                      </p>
                      <div className="mt-2 flex items-center gap-1.5 text-[12px] font-medium text-neutral-700 transition-colors group-hover:text-[color:var(--kpt-accent)]"
                        style={{ ["--kpt-accent" as string]: ACCENT }}
                      >
                        <span
                          className="transition-transform duration-300 group-hover:translate-x-0.5"
                          aria-hidden
                        >
                          →
                        </span>
                        <span>Visit</span>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
