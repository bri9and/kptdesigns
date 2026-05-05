"use client";

import { Instrument_Serif, Inter } from "next/font/google";
import { ArrowUpRight } from "lucide-react";

const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-serif" });
const sans = Inter({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-sans" });

const HERO_VIDEO =
  "https://res.cloudinary.com/dfonotyfb/video/upload/v1775585556/dds3_1_rqhg7x.mp4";

const css = `
  @keyframes celRise {
    from { opacity: 0; transform: translateY(28px); filter: blur(6px); }
    to   { opacity: 1; transform: translateY(0);    filter: blur(0); }
  }
  .cel-rise { opacity: 0; animation: celRise 1.2s cubic-bezier(.2,.7,.2,1) forwards; }

  .cel-vignette {
    background:
      radial-gradient(ellipse 80% 60% at 50% 40%, transparent 0%, rgba(0,0,0,0.55) 80%, rgba(0,0,0,0.85) 100%),
      linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.65) 100%);
  }
`;

export default function V78CelestiaPage() {
  return (
    <div className={`${sans.variable} ${serif.variable} relative min-h-screen w-full overflow-hidden bg-black text-white`}>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>

      <div aria-hidden className="cel-vignette pointer-events-none absolute inset-0 z-[1]" />

      <div className="relative z-10 flex min-h-screen flex-col">
        <nav className="flex items-center justify-between px-6 py-6 sm:px-10 md:py-8">
          <span
            className="cel-rise text-sm uppercase tracking-[0.4em] text-white/85"
            style={{ animationDelay: "100ms", fontFamily: "var(--font-sans)" }}
          >
            KPT
          </span>
          <div className="hidden items-center gap-8 text-sm text-white/65 md:flex">
            {["Studio", "Work", "Process", "Journal"].map((item, i) => (
              <a
                key={item}
                href="#"
                className="cel-rise transition-colors hover:text-white"
                style={{ animationDelay: `${150 + i * 40}ms`, fontFamily: "var(--font-sans)" }}
              >
                {item}
              </a>
            ))}
          </div>
          <a
            href="#"
            className="cel-rise inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-white/85 backdrop-blur-md transition-colors hover:bg-white/10"
            style={{ animationDelay: "350ms", fontFamily: "var(--font-sans)" }}
          >
            Inquire
            <ArrowUpRight size={14} strokeWidth={1.5} />
          </a>
        </nav>

        <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
          <p
            className="cel-rise mb-8 text-[11px] uppercase tracking-[0.5em] text-white/60"
            style={{ animationDelay: "300ms", fontFamily: "var(--font-sans)" }}
          >
            Studio est. 2024 — Pittsburgh
          </p>

          <h1
            className="cel-rise mx-auto max-w-5xl text-5xl leading-[0.95] tracking-tight text-white sm:text-7xl md:text-[110px]"
            style={{
              animationDelay: "500ms",
              fontFamily: "var(--font-serif)",
              letterSpacing: "-0.04em",
            }}
          >
            Built once.
            <br />
            <em className="font-normal italic text-white/70">Evolved forever.</em>
          </h1>

          <p
            className="cel-rise mt-10 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg"
            style={{ animationDelay: "750ms", fontFamily: "var(--font-sans)" }}
          >
            We craft cinematic, custom-coded landing pages for businesses who refuse to look like everyone else online.
          </p>

          <div className="cel-rise mt-12 flex flex-wrap items-center justify-center gap-3" style={{ animationDelay: "950ms" }}>
            <a
              href="#"
              className="rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition-transform hover:scale-[1.02]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Start your build
            </a>
            <a
              href="#"
              className="rounded-full border border-white/25 bg-white/5 px-7 py-3 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-white/10"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              See the work
            </a>
          </div>
        </div>

        <div
          className="cel-rise flex items-center justify-between px-6 pb-8 text-[10px] uppercase tracking-[0.4em] text-white/45 sm:px-10"
          style={{ animationDelay: "1200ms", fontFamily: "var(--font-sans)" }}
        >
          <span>v78 — Celestia</span>
          <span>scroll ↓</span>
          <span>kptdesigns.com</span>
        </div>
      </div>
    </div>
  );
}
