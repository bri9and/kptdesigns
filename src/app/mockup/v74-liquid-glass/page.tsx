"use client";

import { Instrument_Serif, Barlow } from "next/font/google";
import { ArrowUpRight, Play } from "lucide-react";

const heading = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-heading" });
const body = Barlow({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--font-body" });

const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4";

const partners = ["Stripe", "Vercel", "Linear", "Notion", "Figma"];

const css = `
  .liquid-glass {
    background: rgba(255,255,255,0.01);
    background-blend-mode: luminosity;
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border: none;
    box-shadow: inset 0 1px 1px rgba(255,255,255,0.1);
    position: relative;
    overflow: hidden;
  }
  .liquid-glass::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1.4px;
    background: linear-gradient(180deg,
      rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.15) 20%,
      rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%,
      rgba(255,255,255,0.15) 80%, rgba(255,255,255,0.45) 100%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
  .liquid-glass-strong {
    background: rgba(255,255,255,0.01);
    background-blend-mode: luminosity;
    backdrop-filter: blur(50px);
    -webkit-backdrop-filter: blur(50px);
    border: none;
    box-shadow: 4px 4px 4px rgba(0,0,0,0.05), inset 0 1px 1px rgba(255,255,255,0.15);
    position: relative;
    overflow: hidden;
  }
  .liquid-glass-strong::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1.4px;
    background: linear-gradient(180deg,
      rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.2) 20%,
      rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%,
      rgba(255,255,255,0.2) 80%, rgba(255,255,255,0.5) 100%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  @keyframes lgRise {
    from { opacity: 0; transform: translateY(40px); filter: blur(10px); }
    to   { opacity: 1; transform: translateY(0);    filter: blur(0); }
  }
  @keyframes lgFade {
    from { opacity: 0; filter: blur(8px); }
    to   { opacity: 1; filter: blur(0); }
  }
  .lg-rise { opacity: 0; animation: lgRise 1s cubic-bezier(.2,.7,.2,1) forwards; }
  .lg-fade { opacity: 0; animation: lgFade .9s ease-out forwards; }
`;

export default function V74LiquidGlassPage() {
  return (
    <div
      className={`${heading.variable} ${body.variable} relative min-h-screen w-full overflow-hidden text-white`}
      style={{ background: "#000", fontFamily: "var(--font-body)" }}
    >
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* Floating navbar */}
      <div className="fixed left-0 right-0 top-4 z-50 flex items-center justify-between px-8 py-3 lg:px-16">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-white/10 text-base font-semibold text-white" style={{ fontFamily: "var(--font-heading)" }}>
          K
        </span>

        <div className="liquid-glass hidden items-center gap-1 rounded-full px-1.5 py-1 md:flex">
          {["Home", "Services", "Work", "Process", "Pricing"].map((l) => (
            <a
              key={l}
              href="#"
              className="rounded-full px-3 py-2 text-sm font-medium text-white/90 transition-colors hover:text-white"
            >
              {l}
            </a>
          ))}
          <a
            href="#"
            className="ml-1 inline-flex items-center gap-1 rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-black"
          >
            Get Started
            <ArrowUpRight size={14} strokeWidth={2} />
          </a>
        </div>

        <a
          href="#"
          className="liquid-glass-strong rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em] text-white md:hidden"
        >
          Menu
        </a>
      </div>

      {/* Hero */}
      <section className="relative" style={{ minHeight: 1000 }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-x-0 z-0 h-auto w-full object-contain"
          style={{ top: "20%" }}
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        <div className="absolute inset-0 z-0 bg-black/5" />
        <div
          aria-hidden
          className="absolute bottom-0 left-0 right-0 z-[1] h-72"
          style={{
            background: "linear-gradient(to bottom, transparent, #000)",
          }}
        />

        <div
          className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 text-center"
          style={{ paddingTop: 150 }}
        >
          <div className="lg-fade liquid-glass mb-8 inline-flex items-center gap-3 rounded-full px-1 py-1 pr-4">
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-black">New</span>
            <span className="text-xs text-white/85 md:text-sm">Introducing custom-coded landing pages.</span>
          </div>

          <h1
            className="lg-rise max-w-3xl text-6xl italic leading-[0.85] text-white md:text-7xl lg:text-[5.5rem]"
            style={{ fontFamily: "var(--font-heading)", letterSpacing: "-4px" }}
          >
            The Website Your Brand Deserves
          </h1>

          <p
            className="lg-fade mt-8 max-w-xl text-sm font-light leading-tight text-white md:text-base"
            style={{ animationDelay: "800ms" }}
          >
            Stunning design. Blazing performance. Built by hand, refined by humans. This is web design, wildly reimagined.
          </p>

          <div className="lg-fade mt-10 flex flex-wrap items-center justify-center gap-4" style={{ animationDelay: "1100ms" }}>
            <a
              href="#"
              className="liquid-glass-strong inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white"
            >
              Get Started
              <ArrowUpRight size={16} strokeWidth={2} />
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              <Play size={14} strokeWidth={0} className="fill-white" />
              Watch the Film
            </a>
          </div>
        </div>

        {/* Partners */}
        <div className="absolute bottom-16 left-0 right-0 z-10 mx-auto flex max-w-6xl flex-col items-center gap-8 px-6">
          <div className="liquid-glass rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-white/70">
            Trusted by teams shipping
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 italic text-white md:gap-16">
            {partners.map((p) => (
              <span
                key={p}
                className="text-2xl md:text-3xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
