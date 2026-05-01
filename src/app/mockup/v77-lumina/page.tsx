"use client";

import { Inter } from "next/font/google";
import { Music2, Facebook, Twitter, Youtube, Instagram } from "lucide-react";

const sans = Inter({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-sans" });

const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260429_114316_1c7889ad-2885-410e-b493-98119fee0ddb.mp4";

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

  @keyframes lumRise {
    from { opacity: 0; transform: translateY(40px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .lum-rise { opacity: 0; animation: lumRise 1s ease-out .4s forwards; }
`;

const linkGroups: { heading: string; items: string[] }[] = [
  { heading: "Work", items: ["Active Sites", "Case Studies", "Process", "Tooling", "Roadmap"] },
  { heading: "Studio", items: ["Origin", "The Operators", "Field Notes", "Hire Us"] },
  { heading: "Concierge", items: ["Inquire", "Privacy", "Terms", "Report"] },
];

export default function V77LuminaPage() {
  return (
    <main
      className={`${sans.variable} relative flex w-full min-h-[115vh] flex-col items-center overflow-x-hidden bg-black text-white selection:bg-white/20 selection:text-white`}
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="fixed inset-0 z-0 h-full w-full object-cover"
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-6 pt-32 md:pt-40">
        <div className="lum-rise w-full text-center">
          <p className="mb-4 text-[11px] uppercase tracking-[0.5em] text-white/60">
            KPT — Premium pages, made right
          </p>
          <h1 className="mx-auto max-w-3xl text-5xl font-light tracking-tight text-white md:text-7xl">
            Pure performance. <span className="italic text-white/70">Zero noise.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-sm text-white/65 md:text-base">
            Bespoke landing pages for businesses that have outgrown templates. Hand-coded, blazing-fast, and yours forever.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#"
              className="rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition-transform hover:scale-[1.02]"
            >
              Start your build
            </a>
            <a
              href="#"
              className="liquid-glass rounded-full px-7 py-3 text-sm font-medium text-white"
            >
              View work
            </a>
          </div>
        </div>

        <footer className="liquid-glass mt-32 mb-12 w-full rounded-3xl p-6 text-white/70 md:mt-64 md:p-10">
          <div className="mb-10 grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-5">
              <div className="mb-4 inline-flex items-center gap-2 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 256 256"
                  fill="currentColor"
                >
                  <path d="M 4.688 136 C 68.373 136 120 187.627 120 251.312 C 120 252.883 119.967 254.445 119.905 256 L 0 256 L 0 136.096 C 1.555 136.034 3.117 136 4.688 136 Z M 251.312 136 C 252.883 136 254.445 136.034 256 136.096 L 256 256 L 136.095 256 C 136.032 254.438 136.001 252.875 136 251.312 C 136 187.627 187.627 136 251.312 136 Z M 119.905 0 C 119.967 1.555 120 3.117 120 4.688 C 120 68.373 68.373 120 4.687 120 C 3.117 120 1.555 119.967 0 119.905 L 0 0 Z M 256 119.905 C 254.445 119.967 252.883 120 251.312 120 C 187.627 120 136 68.373 136 4.687 C 136 3.117 136.033 1.555 136.095 0 L 256 0 Z" />
                </svg>
                <span className="text-xl font-medium">KPT</span>
              </div>
              <p className="max-w-sm text-sm leading-relaxed">
                KPT Designs builds premium, custom-coded sites for businesses that need to feel inevitable on first scroll.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 md:col-span-7">
              {linkGroups.map((g) => (
                <div key={g.heading}>
                  <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-white">
                    {g.heading}
                  </h3>
                  <ul className="space-y-2 text-xs">
                    {g.items.map((it) => (
                      <li key={it}>
                        <a href="#" className="transition-colors hover:text-white">
                          {it}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-6 md:flex-row md:gap-4">
            <p className="text-[10px] uppercase tracking-widest opacity-50">
              Studio of @kptdesigns
            </p>
            <div className="flex items-center gap-3">
              <span className="text-[10px] uppercase tracking-widest opacity-50">Join the Journey:</span>
              {[Music2, Facebook, Twitter, Youtube, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="opacity-70 transition-colors hover:opacity-100 hover:text-white"
                >
                  <Icon size={16} strokeWidth={1.6} />
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
