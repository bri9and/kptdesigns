"use client";

import { Inter, Instrument_Serif } from "next/font/google";
import { Instagram, Linkedin, Twitter } from "lucide-react";

const sans = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-sans" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-serif" });

const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_120549_0cd82c36-56b3-4dd9-b190-069cfc3a623f.mp4";

const css = `
  @keyframes mlRise {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .ml-rise { opacity: 0; animation: mlRise .8s cubic-bezier(.2,.7,.2,1) forwards; }

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
`;

const platforms = [
  { name: "ChatGPT", desc: "Indexes well-structured pages with semantic HTML, clean schema, and answer-shaped copy." },
  { name: "Perplexity", desc: "Prefers cited, authoritative sources. Your site needs to BE the answer, not link to it." },
  { name: "Google AI", desc: "AI Overviews pull from sites with real expertise, fast loads, and clear topical depth." },
];

export default function V82MindloopPage() {
  return (
    <div className={`${sans.variable} ${serif.variable} relative min-h-screen w-full bg-black text-white`} style={{ fontFamily: "var(--font-sans)" }}>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* Hero */}
      <section className="relative min-h-screen w-full overflow-hidden">
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
        <div className="pointer-events-none absolute inset-0 z-[1] bg-black/40" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[2] h-64 bg-gradient-to-t from-black to-transparent" />

        <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-8 py-4 md:px-28">
          <div className="flex items-center gap-3">
            <div className="grid h-7 w-7 place-items-center rounded-full border-2 border-white/60">
              <span className="block h-3 w-3 rounded-full border border-white/60" />
            </div>
            <span className="font-bold">KPT</span>
          </div>
          <div className="hidden items-center gap-3 text-sm text-white/65 md:flex">
            {["Home", "How It Works", "Philosophy", "Use Cases"].map((l, i, arr) => (
              <span key={l} className="flex items-center gap-3">
                <a href="#" className="transition-colors hover:text-white">
                  {l}
                </a>
                {i < arr.length - 1 && <span className="opacity-50">•</span>}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2">
            {[Instagram, Linkedin, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="social"
                className="liquid-glass grid h-10 w-10 place-items-center rounded-full text-white/85 transition-colors hover:text-white"
              >
                <Icon size={16} strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </nav>

        <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 text-center">
          <div className="ml-rise mb-8 inline-flex items-center gap-3" style={{ animationDelay: "100ms" }}>
            <div className="flex -space-x-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-8 w-8 rounded-full border-2 border-black"
                  style={{
                    background: ["#3a3a3a", "#5a5a5a", "#777"][i],
                  }}
                />
              ))}
            </div>
            <span className="text-sm text-white/65">200+ founders shipping with KPT</span>
          </div>

          <h1
            className="ml-rise text-5xl font-medium leading-[1.05] tracking-tight md:text-7xl lg:text-8xl"
            style={{ animationDelay: "300ms", letterSpacing: "-2px" }}
          >
            Search has{" "}
            <em
              className="font-normal italic text-white"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              changed.
            </em>
            <br />
            Have your sites?
          </h1>

          <p
            className="ml-rise mt-8 max-w-2xl text-lg leading-relaxed"
            style={{
              animationDelay: "500ms",
              color: "hsl(210 17% 95%)",
            }}
          >
            AI search rewards real expertise, fast loads, and answer-shaped copy. Templated drag-and-drop sites can&rsquo;t keep up.
          </p>

          <div
            className="liquid-glass ml-rise mt-12 flex w-full max-w-lg items-center gap-2 rounded-full p-2"
            style={{ animationDelay: "700ms" }}
          >
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 bg-transparent px-4 py-2 text-sm text-white outline-none placeholder:text-white/45"
            />
            <button
              type="button"
              className="rounded-full bg-white px-7 py-3 text-xs font-semibold uppercase tracking-wider text-black transition-transform hover:scale-[1.03] active:scale-[0.98]"
            >
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* Search-has-changed section */}
      <section className="relative px-6 pb-12 pt-28 md:pt-40">
        <h2
          className="mx-auto max-w-4xl text-center text-5xl font-medium leading-[1.05] tracking-tight md:text-7xl lg:text-[88px]"
          style={{ letterSpacing: "-2px" }}
        >
          The questions{" "}
          <em
            className="font-normal italic"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            changed.
          </em>{" "}
          The websites must too.
        </h2>
        <p className="mx-auto mt-8 mb-20 max-w-2xl text-center text-lg text-white/65">
          Three platforms now decide whether your business shows up. Templates flunk all three.
        </p>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-2 md:grid-cols-3 md:gap-8 mb-16">
          {platforms.map((p) => (
            <div key={p.name} className="text-center">
              <div
                className="mx-auto mb-6 grid h-32 w-32 place-items-center rounded-full border border-white/10"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
                }}
              >
                <span className="text-2xl font-semibold tracking-tight">{p.name[0]}</span>
              </div>
              <h3 className="mb-2 text-base font-semibold">{p.name}</h3>
              <p className="text-sm text-white/65">{p.desc}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-white/45">
          If your site doesn&rsquo;t answer the question, the next one will.
        </p>
      </section>

      <footer className="border-t border-white/10 py-10 px-8 md:px-28">
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-white/55 md:flex-row">
          <span>© 2026 KPT Designs. Custom-coded forever.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
