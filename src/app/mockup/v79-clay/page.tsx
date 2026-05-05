"use client";

import { Kanit } from "next/font/google";
import { ArrowUpRight } from "lucide-react";

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-kanit",
});

const css = `
  .hero-heading {
    background: linear-gradient(180deg, #646973 0%, #BBCCD7 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @keyframes clayRise {
    from { opacity: 0; transform: translateY(40px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes clayDown {
    from { opacity: 0; transform: translateY(-20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes clayPortrait {
    from { opacity: 0; transform: translateY(30px) scale(0.94); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  .clay-down     { opacity: 0; animation: clayDown   .8s ease-out forwards; }
  .clay-rise     { opacity: 0; animation: clayRise   .9s ease-out forwards; }
  .clay-portrait { opacity: 0; animation: clayPortrait 1.2s cubic-bezier(.2,.7,.2,1) .6s forwards; }
`;

const PORTRAIT =
  "https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png";

export default function V79ClayPage() {
  return (
    <div
      className={`${kanit.variable} relative min-h-screen w-full overflow-x-clip text-white`}
      style={{ background: "#0C0C0C", fontFamily: "var(--font-kanit)" }}
    >
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <section className="relative flex h-screen flex-col overflow-x-clip">
        <nav
          className="clay-down flex items-center justify-between px-6 pt-6 text-sm font-medium uppercase tracking-wider text-[#D7E2EA] md:px-10 md:pt-8 md:text-lg lg:text-[1.4rem]"
          style={{ animationDelay: "0ms" }}
        >
          {["About", "Pricing", "Projects", "Contact"].map((l) => (
            <a key={l} href="#" className="transition-opacity hover:opacity-70">
              {l}
            </a>
          ))}
        </nav>

        <div className="flex-1 overflow-hidden">
          <h1
            className="hero-heading clay-rise mt-6 w-full whitespace-nowrap text-center font-black uppercase leading-none tracking-tight sm:mt-4 md:-mt-5"
            style={{ animationDelay: "150ms", fontSize: "clamp(120px, 17.5vw, 17.5vw)" }}
          >
            Hi, I&apos;m KPT
          </h1>
        </div>

        <div className="absolute left-1/2 top-1/2 z-10 w-[280px] -translate-x-1/2 -translate-y-1/2 sm:bottom-0 sm:top-auto sm:translate-y-0 sm:w-[360px] md:w-[440px] lg:w-[520px]">
          <img
            src={PORTRAIT}
            alt="KPT 3D portrait"
            className="clay-portrait h-auto w-full select-none"
            draggable={false}
          />
        </div>

        <div className="relative z-20 flex items-end justify-between px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
          <p
            className="clay-rise max-w-[160px] font-light uppercase leading-snug tracking-wide text-[#D7E2EA] sm:max-w-[220px] md:max-w-[260px]"
            style={{
              animationDelay: "350ms",
              fontSize: "clamp(0.75rem, 1.4vw, 1.5rem)",
            }}
          >
            A studio crafting striking, custom-coded sites that ship in days, not months.
          </p>
          <a
            href="#"
            className="clay-rise inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium uppercase tracking-wider text-black transition-transform hover:scale-[1.03] md:text-base"
            style={{ animationDelay: "500ms" }}
          >
            <span>Contact</span>
            <span className="grid h-7 w-7 place-items-center rounded-full bg-black text-white">
              <ArrowUpRight size={14} strokeWidth={2} />
            </span>
          </a>
        </div>
      </section>
    </div>
  );
}
