"use client";

import { useState } from "react";
import { Inter } from "next/font/google";
import {
  Search,
  User,
  Menu,
  X,
  Star,
  Clock,
  Calendar,
  Play,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const navLinks = [
  "Work",
  "Studio",
  "Process",
  "Pricing",
  "Journal",
] as const;

const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_094145_4a271a6c-3869-4f1c-8aa7-aeb0cb227994.mp4";

const css = `
  @keyframes blurFadeUp {
    from { opacity: 0; filter: blur(20px); transform: translateY(40px); }
    to   { opacity: 1; filter: blur(0);   transform: translateY(0); }
  }
  .v73-fade {
    opacity: 0;
    animation: blurFadeUp 1s ease-out forwards;
  }

  .v73-bottom-blur {
    -webkit-mask-image: linear-gradient(to top, black 0%, transparent 45%);
    mask-image: linear-gradient(to top, black 0%, transparent 45%);
  }

  .liquid-glass {
    background: rgba(255, 255, 255, 0.01);
    background-blend-mode: luminosity;
    -webkit-backdrop-filter: blur(4px);
    backdrop-filter: blur(4px);
    border: none;
    box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
    position: relative;
    overflow: hidden;
    color: #fff;
    transition: background-color 200ms ease-out, transform 200ms ease-out;
  }
  .liquid-glass:hover {
    background: rgba(255, 255, 255, 0.04);
  }
  .liquid-glass:active {
    transform: scale(0.98);
  }
  .liquid-glass::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1.4px;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.45) 0%,
      rgba(255, 255, 255, 0.15) 20%,
      rgba(255, 255, 255, 0) 40%,
      rgba(255, 255, 255, 0) 60%,
      rgba(255, 255, 255, 0.15) 80%,
      rgba(255, 255, 255, 0.45) 100%
    );
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
`;

export default function V73MarqueePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className={`${inter.className} relative min-h-screen w-full overflow-hidden bg-black text-white`}
    >
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* Background video — full viewport, fixed, behind everything */}
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

      {/* Bottom-blur overlay — blur only at bottom 55%, fades to transparent
          toward middle. No darkening gradient; pointer-events disabled so it
          never blocks interactions. */}
      <div
        aria-hidden
        className="v73-bottom-blur pointer-events-none fixed inset-0 z-[1] backdrop-blur-xl"
      />

      {/* Foreground container */}
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Navbar */}
        <nav className="relative z-50 flex items-center justify-between px-4 py-4 sm:px-6 md:px-12 md:py-6">
          {/* Logo */}
          <a
            href="#"
            className="v73-fade text-xl font-semibold tracking-[0.2em] sm:text-2xl"
            style={{ animationDelay: "0ms" }}
          >
            KPT
          </a>

          {/* Center nav (desktop) */}
          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((label, i) => (
              <a
                key={label}
                href="#"
                className="v73-fade text-sm transition-colors hover:text-gray-300"
                style={{ animationDelay: `${100 + i * 50}ms` }}
              >
                {label}
              </a>
            ))}
          </div>

          {/* Right cluster */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search button (sm+) */}
            <button
              type="button"
              className="liquid-glass v73-fade hidden items-center gap-2 rounded-full px-4 py-2 text-sm sm:flex md:px-6"
              style={{ animationDelay: "350ms" }}
            >
              <Search size={18} strokeWidth={1.75} />
              <span>Search</span>
            </button>

            {/* User avatar (sm+) */}
            <button
              type="button"
              aria-label="Account"
              className="liquid-glass v73-fade hidden h-10 w-10 items-center justify-center rounded-full sm:inline-flex"
              style={{ animationDelay: "400ms" }}
            >
              <User size={18} strokeWidth={1.75} />
            </button>

            {/* Hamburger (below lg) */}
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="liquid-glass v73-fade relative inline-flex h-10 w-10 items-center justify-center rounded-full lg:hidden"
              style={{ animationDelay: "350ms" }}
            >
              <Menu
                size={18}
                strokeWidth={1.75}
                className={`absolute transition-all duration-500 ease-out ${
                  menuOpen
                    ? "rotate-180 scale-50 opacity-0"
                    : "rotate-0 scale-100 opacity-100"
                }`}
              />
              <X
                size={18}
                strokeWidth={1.75}
                className={`absolute transition-all duration-500 ease-out ${
                  menuOpen
                    ? "rotate-0 scale-100 opacity-100"
                    : "rotate-180 scale-50 opacity-0"
                }`}
              />
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <div
          className={`absolute left-0 right-0 top-[72px] z-40 border-t border-b border-gray-800 bg-gray-900/95 shadow-2xl backdrop-blur-lg transition-all duration-500 ease-out lg:hidden ${
            menuOpen
              ? "translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-4 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-1 px-4 py-4 sm:px-6">
            {navLinks.map((label, i) => (
              <a
                key={label}
                href="#"
                className={`rounded-lg px-3 py-3 text-sm transition-all duration-500 ease-out hover:bg-gray-800/50 ${
                  menuOpen
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-4 opacity-0"
                }`}
                style={{ transitionDelay: menuOpen ? `${i * 50}ms` : "0ms" }}
              >
                {label}
              </a>
            ))}

            {/* Below-sm secondary actions */}
            <div className="mt-3 flex items-center gap-2 border-t border-gray-800 pt-4 sm:hidden">
              <button
                type="button"
                className="liquid-glass flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2 text-sm"
              >
                <Search size={18} strokeWidth={1.75} />
                <span>Search</span>
              </button>
              <button
                type="button"
                aria-label="Account"
                className="liquid-glass inline-flex h-10 w-10 items-center justify-center rounded-full"
              >
                <User size={18} strokeWidth={1.75} />
              </button>
            </div>
          </div>
        </div>

        {/* Hero content — pinned to bottom */}
        <div className="relative z-10 flex flex-1 flex-col justify-end px-4 pb-8 sm:px-6 md:px-12 md:pb-16">
          <div className="flex flex-col items-stretch gap-8 md:flex-row md:items-end">
            {/* Left side */}
            <div className="flex-1">
              {/* Metadata pills */}
              <div
                className="v73-fade mb-6 flex flex-wrap items-center gap-3 text-xs sm:gap-6 sm:text-sm md:mb-8"
                style={{ animationDelay: "300ms" }}
              >
                <span className="inline-flex items-center gap-1.5">
                  <Star
                    size={16}
                    className="fill-white sm:h-5 sm:w-5"
                    strokeWidth={1.5}
                  />
                  <span className="font-medium">200+ Sites Live</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={16} strokeWidth={1.5} className="sm:h-5 sm:w-5" />
                  <span>&lt;1s LCP</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar
                    size={16}
                    strokeWidth={1.5}
                    className="sm:h-5 sm:w-5"
                  />
                  <span>Studio est. 2024</span>
                </span>
              </div>

              {/* Title */}
              <h1
                className="v73-fade mb-4 text-3xl font-normal sm:text-5xl md:mb-6 md:text-6xl lg:text-7xl"
                style={{
                  animationDelay: "400ms",
                  letterSpacing: "-0.04em",
                }}
              >
                Step Through. Work Smarter.
              </h1>

              {/* Description */}
              <p
                className="v73-fade mb-6 max-w-2xl text-base text-gray-400 sm:text-lg md:mb-12 md:text-xl"
                style={{ animationDelay: "500ms" }}
              >
                Custom-coded sites that feel inevitable. No templates, no
                compromises — you own every line of what your customers see.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <button
                  type="button"
                  className="v73-fade inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-medium text-black transition-colors hover:bg-gray-200 sm:px-8 sm:py-3 sm:text-base"
                  style={{ animationDelay: "600ms" }}
                >
                  <Play size={18} className="fill-black" strokeWidth={0} />
                  <span>Get Started</span>
                </button>
                <button
                  type="button"
                  className="liquid-glass v73-fade inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium sm:px-8 sm:py-3 sm:text-base"
                  style={{ animationDelay: "700ms" }}
                >
                  <span>See Our Work</span>
                </button>
              </div>
            </div>

            {/* Right side — prev/next pills */}
            <div className="flex items-center gap-2 sm:gap-3 md:flex-col md:items-end">
              <button
                type="button"
                aria-label="Previous"
                className="liquid-glass v73-fade inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium sm:px-6 sm:py-3"
                style={{ animationDelay: "800ms" }}
              >
                <ChevronLeft size={18} strokeWidth={1.75} />
                <span>Previous</span>
              </button>
              <button
                type="button"
                aria-label="Next"
                className="liquid-glass v73-fade inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium sm:px-6 sm:py-3"
                style={{ animationDelay: "900ms" }}
              >
                <span>Next</span>
                <ChevronRight size={18} strokeWidth={1.75} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
