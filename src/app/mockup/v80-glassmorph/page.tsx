"use client";

import { Inter } from "next/font/google";
import { Zap, ArrowUpRight } from "lucide-react";

const sans = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-sans" });

const css = `
  @keyframes gmRise {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .gm-rise { opacity: 0; animation: gmRise 1s cubic-bezier(.2,.7,.2,1) forwards; }

  .gm-headline-fill {
    background: linear-gradient(180deg, #ffffff 0%, #ffffff 35%, #FA93FA 65%, #983AD6 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  @keyframes gmMarquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  .gm-marquee {
    animation: gmMarquee 28s linear infinite;
  }
`;

const logos = [
  "Stripe",
  "Vercel",
  "Linear",
  "Notion",
  "Figma",
  "Framer",
  "Anthropic",
  "OpenAI",
];

export default function V80GlassmorphPage() {
  return (
    <div
      className={`${sans.variable} relative min-h-screen w-full overflow-hidden text-white`}
      style={{ background: "#010101", fontFamily: "var(--font-sans)" }}
    >
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* Ambient gradient blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 z-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(250,147,250,0.55) 0%, rgba(152,58,214,0.25) 45%, rgba(0,0,0,0) 70%)",
        }}
      />

      <nav className="relative z-20 mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <span className="text-base font-semibold tracking-tight">KPT</span>
        <div className="hidden items-center gap-7 text-sm text-white/65 md:flex">
          {["Work", "Process", "Pricing", "Studio"].map((l) => (
            <a key={l} href="#" className="transition-colors hover:text-white">
              {l}
            </a>
          ))}
        </div>
        <a
          href="#"
          className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-md transition-colors hover:bg-white/10"
        >
          Book a call
        </a>
      </nav>

      <main className="relative z-20 mx-auto flex max-w-5xl flex-col items-center px-6 pt-16 text-center md:pt-24">
        {/* Announcement pill */}
        <div
          className="gm-rise mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/75 backdrop-blur-md"
          style={{ background: "rgba(28,27,36,0.35)", animationDelay: "100ms" }}
        >
          <span
            className="grid h-5 w-5 place-items-center rounded-md"
            style={{
              background: "linear-gradient(135deg, #FA93FA, #C967E8, #983AD6)",
              boxShadow: "0 0 14px rgba(201, 103, 232, 0.7)",
            }}
          >
            <Zap size={12} className="fill-white text-white" strokeWidth={2} />
          </span>
          <span>Used by founders. Loved by ops.</span>
        </div>

        {/* Headline */}
        <h1
          className="gm-rise text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl"
          style={{ animationDelay: "300ms" }}
        >
          <span className="gm-headline-fill block">Your Vision.</span>
          <span className="gm-headline-fill block">Our Digital Reality.</span>
        </h1>

        <p
          className="gm-rise mx-auto mt-6 max-w-xl text-base text-white/80 md:text-lg"
          style={{ animationDelay: "500ms" }}
        >
          We turn bold ideas into modern, custom-coded landing pages that don&rsquo;t just look amazing — they grow your business fast.
        </p>

        {/* CTA */}
        <div className="gm-rise mt-10" style={{ animationDelay: "700ms" }}>
          <div
            className="inline-block rounded-full p-[1.5px]"
            style={{ background: "linear-gradient(135deg, #FA93FA, #C967E8, #983AD6)" }}
          >
            <a
              href="#"
              className="inline-flex items-center gap-3 rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition-transform hover:scale-[1.02]"
            >
              <span>Book a 15-min call</span>
              <span
                className="grid h-7 w-7 place-items-center rounded-full text-white"
                style={{ background: "linear-gradient(135deg, #FA93FA, #C967E8, #983AD6)" }}
              >
                <ArrowUpRight size={14} strokeWidth={2.2} />
              </span>
            </a>
          </div>
        </div>

        {/* Spacer for the visual product mock area */}
        <div className="gm-rise relative mt-16 w-full" style={{ animationDelay: "900ms" }}>
          <div
            className="mx-auto h-72 w-full max-w-4xl rounded-3xl border border-white/10"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(250,147,250,0.18) 0%, rgba(0,0,0,0) 60%), linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.08), 0 30px 60px -20px rgba(152,58,214,0.4)",
            }}
          />
        </div>
      </main>

      {/* Logo cloud */}
      <section
        className="relative z-20 mt-16 overflow-hidden border-t border-white/5 bg-black/30 py-6 backdrop-blur-sm"
      >
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 md:flex-row md:gap-10">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">
            Powering the best teams
          </p>
          <div className="hidden h-6 w-px bg-white/10 md:block" />
          <div className="relative w-full overflow-hidden">
            <div
              className="gm-marquee flex w-max items-center gap-12 whitespace-nowrap text-sm font-medium text-white/55"
            >
              {[...logos, ...logos].map((l, i) => (
                <span key={i} className="tracking-wide">
                  {l}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
