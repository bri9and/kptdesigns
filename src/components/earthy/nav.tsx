"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { UserMenu } from "@/components/user-menu";
import { cn } from "@/lib/utils";

const links = [
  { href: "/#features", label: "Services" },
  { href: "/#showcase", label: "How it works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function EarthyLogo() {
  return (
    <Link
      href="/"
      className="flex items-end gap-[3px] font-[family-name:var(--font-earthy-display)] text-[24px] font-bold leading-none tracking-[-0.5px]"
    >
      <span className="text-earthy-orange">K</span>
      <span className="text-earthy-blue">P</span>
      <span className="text-earthy-amber">T</span>
      <span className="ml-2 mb-[2px] text-[0.62em] font-medium uppercase tracking-[0.18em] text-earthy-stone-700">
        Designs
      </span>
    </Link>
  );
}

export function EarthyNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { isSignedIn } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 h-16 bg-[rgba(251,248,241,0.92)] backdrop-blur-xl backdrop-saturate-[180%] border-b border-earthy-stone-200 transition-shadow duration-300",
        scrolled && "shadow-[var(--earthy-shadow-sm)]"
      )}
    >
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
        <EarthyLogo />

        <nav className="hidden md:flex items-center gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-[family-name:var(--font-earthy-display)] text-sm font-medium text-earthy-stone-600 px-4 py-2 rounded-full transition-colors duration-200 hover:text-earthy-ink hover:bg-earthy-stone-100"
            >
              {link.label}
            </Link>
          ))}
          {!isSignedIn ? (
            <Link
              href="/sign-up"
              className="font-[family-name:var(--font-earthy-display)] text-sm font-medium text-white bg-earthy-orange hover:bg-earthy-orange-dark px-5 py-2 rounded-full ml-2 transition-colors duration-200"
            >
              Get Started
            </Link>
          ) : (
            <>
              <Link
                href="/dashboard"
                className="font-[family-name:var(--font-earthy-display)] text-sm font-medium text-earthy-stone-600 px-4 py-2 rounded-full transition-colors duration-200 hover:text-earthy-ink hover:bg-earthy-stone-100"
              >
                Dashboard
              </Link>
              <div className="ml-2">
                <UserMenu size="sm" />
              </div>
            </>
          )}
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center p-2 rounded-full text-earthy-stone-700 hover:bg-earthy-stone-100 transition-colors"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-[rgba(251,248,241,0.98)] backdrop-blur-xl border-b border-earthy-stone-200 shadow-[var(--earthy-shadow-sm)]">
          <nav className="flex flex-col p-4 gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-[family-name:var(--font-earthy-display)] text-base font-medium text-earthy-stone-700 px-4 py-3 rounded-lg hover:bg-earthy-stone-100 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {!isSignedIn ? (
              <Link
                href="/sign-up"
                onClick={() => setOpen(false)}
                className="mt-2 font-[family-name:var(--font-earthy-display)] text-base font-medium text-white bg-earthy-orange hover:bg-earthy-orange-dark px-4 py-3 rounded-full text-center transition-colors"
              >
                Get Started
              </Link>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="font-[family-name:var(--font-earthy-display)] text-base font-medium text-earthy-stone-700 px-4 py-3 rounded-lg hover:bg-earthy-stone-100 transition-colors"
                >
                  Dashboard
                </Link>
                <div className="mt-2 px-4">
                  <UserMenu size="md" />
                </div>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
