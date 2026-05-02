# Earthy Marketing Rebuild — Plan A Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the marketing surface (`/`, `/about`, `/contact`, `/pricing` shell, plus the global header and footer) with the warm earthy palette + Google-Workspace-style structure from `public/concepts/earthy.html`.

**Architecture:** Add a parallel set of theme primitives under `src/components/earthy/` (nav, footer, hero, feature card, showcase row, stat card, logo cloud, quote card, CTA, button, section label, color strip, browser frame) and supporting hooks (`use-scroll-reveal`, `use-count-up`, `use-typing-cycle`). The existing dark-themed `Header`/`Footer` stay in the codebase but are no longer wired through `LayoutShell` for marketing routes. Existing `q*` design tokens in `globals.css` are preserved (the mockup playground depends on them); new earthy tokens are added alongside them. Routes outside the marketing surface (`/sites/*`, `/dashboard`, `/landman`, `/neo`, `/mockup/*`, `/ideas`, `/proposal/*`, `/projects/touchdesign`, `/sign-{in,up}`, `/complete-profile`, `/domains`) are explicitly out of scope.

**Tech Stack:** Next.js 16 App Router (RSC by default, `"use client"` for interaction), React 19, Tailwind v4 with `@theme` CSS-variable tokens, `next/font/google` for Inter + Roboto + Roboto Mono, `framer-motion` is *not* required for this rebuild — vanilla CSS animations + IntersectionObserver hooks match the reference HTML exactly.

**Reference:** `public/concepts/earthy.html` (1789 lines). Open at `http://localhost:3002/concepts/earthy.html` while implementing — every visual decision is anchored there.

**Out of scope (deferred to later plans):**
- Real pricing tiers, Stripe SKUs (Plan B)
- Hosting hand-off vs hosted product split (Plan B/C)
- Domain transfer-out flow (Plan C)
- Intake pipeline (scrape/PDF/Facebook/etc.) (Plan D)
- WYSIWYG editor (Plan E)

**Verification approach:** No unit tests for visual work. Each task ends with (a) `npm run lint`, (b) HTTP-200 check via `curl`, (c) browser inspection via the `mcp__claude-in-chrome__*` tools, comparing against `public/concepts/earthy.html` rendered in the same session. The existing `next.config.ts` has `typescript.ignoreBuildErrors: true` — leave it alone (it covers an unrelated in-progress rename in `desert-coyote-landscape`).

---

## File Structure

```
src/
├── app/
│   ├── globals.css                          # MODIFY — add earthy @theme tokens + global utilities
│   ├── layout.tsx                           # MODIFY — add Inter/Roboto/Roboto Mono fonts
│   ├── page.tsx                             # REWRITE — new earthy home composition
│   ├── about/page.tsx                       # REWRITE
│   ├── contact/page.tsx                     # REWRITE
│   └── pricing/page.tsx                     # REWRITE — visual stub only ("Coming soon" body, real tiers in Plan B)
│
├── components/
│   ├── layout-shell.tsx                     # MODIFY — swap Header→EarthyNav / Footer→EarthyFooter for marketing routes
│   ├── header.tsx                           # KEEP (no longer imported by LayoutShell, but referenced nowhere else)
│   ├── footer.tsx                           # KEEP (same — dead code, prune in a follow-up)
│   └── earthy/                              # NEW — every primitive lives here
│       ├── nav.tsx                          # Fixed top nav + scroll shadow + 4-color logo + mobile sheet
│       ├── footer.tsx                       # 4-col footer + bottom color bar + social icons
│       ├── color-strip.tsx                  # 4-segment color bar (top of page + above footer)
│       ├── hero.tsx                         # Letter-pop KPT + tagline + typing search + bouncing dots + CTAs
│       ├── ribbon.tsx                       # Icon row of products
│       ├── feature-card.tsx                 # Card with colored top-bar on hover
│       ├── feature-grid.tsx                 # 3-col responsive grid wrapper for FeatureCard
│       ├── showcase-row.tsx                 # Alternating side-by-side rows with BrowserFrame visual
│       ├── browser-frame.tsx                # Faux browser chrome (traffic-light + URL pill)
│       ├── stat-card.tsx                    # Stat card with gradient numbers + count-up animation
│       ├── stats-section.tsx                # Dark wrapper around 4 StatCards
│       ├── logo-cloud.tsx                   # Integrations grid of LogoTile
│       ├── logo-tile.tsx                    # Individual logo tile
│       ├── quote-card.tsx                   # Testimonial with serif " glyph
│       ├── cta-section.tsx                  # Final-CTA section (gradient bg + loading dots)
│       ├── button.tsx                       # BtnPrimary + BtnSecondary (next/link wrappers)
│       ├── section-label.tsx                # Uppercase mono label above section headings
│       ├── reveal.tsx                       # Wrapper that adds .reveal class + IntersectionObserver
│       └── hooks/
│           ├── use-scroll-reveal.ts         # IntersectionObserver → adds 'visible' class
│           ├── use-count-up.ts              # Animates 0 → target with cubic-out easing
│           └── use-typing-cycle.ts          # Cycles strings into a ref'd input element
```

**Total: 4 modified files, 4 rewritten pages, 19 new theme files.**

---

## Task 0: Create dedicated worktree

**Files:**
- Worktree: `.worktrees/earthy-rebuild/` from base `main`
- New branch: `feat/earthy-rebuild`

**Why a worktree:** Current branch is `feat/mockup-playground` — mixing a global theme rewrite with mockup work would muddy both. Worktree gives an isolated copy with its own `node_modules` symlink and lets the dev server keep running on the existing checkout.

- [ ] **Step 1: Verify clean working tree**

```bash
git status --porcelain
```

Expected: empty output (the `?? supabase/.temp/` shown in initial git status is a temporary debug folder; ignore it).

- [ ] **Step 2: Create the worktree**

```bash
git worktree add -b feat/earthy-rebuild /Users/cbas-mini/projects/kptdesigns/.worktrees/earthy-rebuild main
```

Expected: `Preparing worktree (new branch 'feat/earthy-rebuild')`.

- [ ] **Step 3: Install deps in worktree**

```bash
cd /Users/cbas-mini/projects/kptdesigns/.worktrees/earthy-rebuild && npm install
```

Expected: completes without errors. (Same `package-lock.json` so it should be a no-op if npm caches the lockfile install.)

- [ ] **Step 4: Start a parallel dev server on a free port**

```bash
cd /Users/cbas-mini/projects/kptdesigns/.worktrees/earthy-rebuild && PORT=3010 npm run dev &
```

Then poll until ready:

```bash
until curl -s -o /dev/null -w "%{http_code}" http://localhost:3010 | grep -q "200\|307"; do sleep 1; done && echo "ready"
```

Expected: `ready` within ~10s. From here on, **all browser verification uses `http://localhost:3010`**, leaving the user's `:3002` server untouched.

---

## Task 1: Add earthy design tokens + fonts

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Read existing globals.css to understand current token system**

```bash
cat src/app/globals.css | head -80
```

Note where the existing `@theme` block (Tailwind v4) or `:root` is. Earthy tokens go alongside, not replacing.

- [ ] **Step 2: Append earthy tokens to globals.css**

Add to the bottom of `src/app/globals.css`:

```css
/* ================================================================
   EARTHY THEME — marketing surface
   Reference: public/concepts/earthy.html
   ================================================================ */
@theme {
  --color-earthy-orange: #C56738;
  --color-earthy-orange-dark: #9A4824;
  --color-earthy-orange-light: #EFD8C0;
  --color-earthy-blue: #5B8FB9;
  --color-earthy-blue-light: #D7E5EF;
  --color-earthy-amber: #E8A547;
  --color-earthy-amber-light: #FAEAC4;
  --color-earthy-sage: #7BA15A;
  --color-earthy-sage-light: #DBEACB;
  --color-earthy-cream: #FBF8F1;
  --color-earthy-sand: #F2EBDB;
  --color-earthy-ink: #2D241B;
  --color-earthy-stone-100: #EDE5D3;
  --color-earthy-stone-200: #DDD2BB;
  --color-earthy-stone-300: #C9BFA8;
  --color-earthy-stone-400: #A89A7E;
  --color-earthy-stone-500: #8B7E64;
  --color-earthy-stone-600: #5D5340;
  --color-earthy-stone-700: #3F3729;
}

:root {
  --earthy-shadow-sm: 0 1px 2px rgba(45,36,27,0.3), 0 1px 3px 1px rgba(45,36,27,0.15);
  --earthy-shadow-md: 0 1px 3px rgba(45,36,27,0.3), 0 4px 8px 3px rgba(45,36,27,0.15);
  --earthy-shadow-lg: 0 4px 8px rgba(45,36,27,0.3), 0 8px 20px 6px rgba(45,36,27,0.15);
  --earthy-shadow-hover: 0 2px 6px rgba(45,36,27,0.3), 0 8px 24px 6px rgba(45,36,27,0.18);
  --earthy-ease: cubic-bezier(0.4, 0, 0.2, 1);
  --earthy-ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Reusable global utilities (used across many earthy primitives) */
.earthy-section-label {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--color-earthy-orange);
  margin-bottom: 12px;
}

@keyframes earthyLetterPop {
  0% { opacity: 0; transform: translateY(40px) scale(0.8); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes earthyFadeUp {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}
@keyframes earthyBounce {
  0%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-18px); }
}
@keyframes earthyGrowBar {
  0% { transform: scaleY(0); }
  100% { transform: scaleY(1); }
}
@keyframes earthySpinIn {
  0% { transform: rotate(-90deg) scale(0.6); opacity: 0; }
  100% { transform: rotate(0deg) scale(1); opacity: 1; }
}
@keyframes earthyLoadPulse {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.4); opacity: 1; }
}

.earthy-reveal {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.7s var(--earthy-ease), transform 0.7s var(--earthy-ease);
}
.earthy-reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
.earthy-reveal-stagger { transition-delay: 0.1s; }
.earthy-reveal-stagger-2 { transition-delay: 0.2s; }
.earthy-reveal-stagger-3 { transition-delay: 0.3s; }
.earthy-reveal-stagger-4 { transition-delay: 0.4s; }
```

- [ ] **Step 3: Add Roboto + Roboto Mono fonts to layout.tsx**

In `src/app/layout.tsx`, the file already loads `Space_Grotesk` and `JetBrains_Mono`. Add Inter (display) + Roboto (body) + Roboto Mono (mono) **alongside** them — do not remove the existing fonts (mockups depend on `--font-sans` resolving to Space Grotesk).

Modify the imports section:

```ts
import { Space_Grotesk, JetBrains_Mono, Inter, Roboto, Roboto_Mono } from "next/font/google";
```

Add the new font instances after the existing two:

```ts
const inter = Inter({
  variable: "--font-earthy-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const roboto = Roboto({
  variable: "--font-earthy-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-earthy-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});
```

In the `<html>` element, add the new variables to `className`:

```tsx
<html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${inter.variable} ${roboto.variable} ${robotoMono.variable}`}>
```

- [ ] **Step 4: Lint + restart dev server**

```bash
cd /Users/cbas-mini/projects/kptdesigns/.worktrees/earthy-rebuild && npm run lint
```

Expected: no new errors.

The dev server should auto-recompile. Visit `http://localhost:3010/` — the page may look broken (old header still rendering) but should not 500.

```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3010/
```

Expected: `200`.

- [ ] **Step 5: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx
git commit -m "feat(earthy): add earthy design tokens + Inter/Roboto/Roboto Mono fonts"
```

---

## Task 2: Hooks — useScrollReveal, useCountUp, useTypingCycle

**Files:**
- Create: `src/components/earthy/hooks/use-scroll-reveal.ts`
- Create: `src/components/earthy/hooks/use-count-up.ts`
- Create: `src/components/earthy/hooks/use-typing-cycle.ts`

- [ ] **Step 1: Write `use-scroll-reveal.ts`**

```ts
"use client";

import { useEffect } from "react";

/**
 * Adds the 'visible' class to every element matching the selector
 * when it enters the viewport. Mirrors the IntersectionObserver
 * pattern in public/concepts/earthy.html.
 */
export function useScrollReveal(selector: string = ".earthy-reveal") {
  useEffect(() => {
    const els = document.querySelectorAll(selector);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [selector]);
}
```

- [ ] **Step 2: Write `use-count-up.ts`**

```ts
"use client";

import { useEffect, useRef } from "react";

/**
 * Animates the text content of the returned ref from 0 to `target`
 * with cubic-ease-out over `duration` ms when the element enters
 * the viewport. Supports decimals (auto-detected) and a suffix.
 */
export function useCountUp(
  target: number,
  opts: { suffix?: string; duration?: number } = {}
) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const { suffix = "", duration = 1600 } = opts;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const isDecimal = target % 1 !== 0;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          obs.unobserve(entry.target);
          const start = performance.now();
          const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = target * eased;
            el.textContent = isDecimal
              ? current.toFixed(2) + suffix
              : Math.floor(current) + suffix;
            if (progress < 1) requestAnimationFrame(tick);
            else el.textContent = (isDecimal ? target.toFixed(2) : target) + suffix;
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, suffix, duration]);

  return ref;
}
```

- [ ] **Step 3: Write `use-typing-cycle.ts`**

```ts
"use client";

import { useEffect, useRef } from "react";

/**
 * Cycles through `phrases`, typing each one into the returned input ref
 * character-by-character then erasing it. Stops on focus.
 */
export function useTypingCycle(phrases: string[], opts: { typeMs?: number; eraseMs?: number; pauseMs?: number; startDelayMs?: number } = {}) {
  const ref = useRef<HTMLInputElement | null>(null);
  const { typeMs = 55, eraseMs = 30, pauseMs = 2200, startDelayMs = 2000 } = opts;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let idx = 0;
    let timer: ReturnType<typeof setInterval>;
    let timeout: ReturnType<typeof setTimeout>;
    let active = true;

    const onFocus = () => {
      active = false;
      clearInterval(timer);
      clearTimeout(timeout);
      el.value = "";
    };
    el.addEventListener("focus", onFocus);

    const typePhrase = (text: string, done: () => void) => {
      let i = 0;
      el.value = "";
      timer = setInterval(() => {
        if (!active) return;
        if (i < text.length) {
          el.value += text[i++];
        } else {
          clearInterval(timer);
          timeout = setTimeout(done, pauseMs);
        }
      }, typeMs);
    };

    const erasePhrase = (done: () => void) => {
      let i = el.value.length;
      const text = el.value;
      timer = setInterval(() => {
        if (!active) return;
        if (i > 0) {
          el.value = text.substring(0, --i);
        } else {
          clearInterval(timer);
          timeout = setTimeout(done, 400);
        }
      }, eraseMs);
    };

    const cycle = () => {
      if (!active) return;
      typePhrase(phrases[idx], () => {
        erasePhrase(() => {
          idx = (idx + 1) % phrases.length;
          cycle();
        });
      });
    };

    timeout = setTimeout(cycle, startDelayMs);

    return () => {
      active = false;
      el.removeEventListener("focus", onFocus);
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, [phrases, typeMs, eraseMs, pauseMs, startDelayMs]);

  return ref;
}
```

- [ ] **Step 4: Lint**

```bash
npm run lint
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/earthy/hooks/
git commit -m "feat(earthy): scroll-reveal, count-up, typing-cycle hooks"
```

---

## Task 3: Atomic primitives — SectionLabel, ColorStrip, BrowserFrame, Reveal, Button

**Files:**
- Create: `src/components/earthy/section-label.tsx`
- Create: `src/components/earthy/color-strip.tsx`
- Create: `src/components/earthy/browser-frame.tsx`
- Create: `src/components/earthy/reveal.tsx`
- Create: `src/components/earthy/button.tsx`

- [ ] **Step 1: Write `section-label.tsx`**

```tsx
import { cn } from "@/lib/utils";

export function SectionLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("earthy-section-label", className)}>{children}</p>;
}
```

- [ ] **Step 2: Write `color-strip.tsx`**

```tsx
export function ColorStrip() {
  return (
    <div className="flex h-1">
      <span className="flex-1 bg-earthy-orange" />
      <span className="flex-1 bg-earthy-blue" />
      <span className="flex-1 bg-earthy-amber" />
      <span className="flex-1 bg-earthy-sage" />
    </div>
  );
}
```

- [ ] **Step 3: Write `browser-frame.tsx`**

```tsx
export function BrowserFrame({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-earthy-stone-300 bg-earthy-cream shadow-[var(--earthy-shadow-lg)]">
      <div className="flex items-center gap-2 border-b border-earthy-stone-200 bg-earthy-stone-100 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-2 flex-1 rounded-full border border-earthy-stone-200 bg-earthy-cream px-3.5 py-1 font-[var(--font-earthy-body)] text-xs text-earthy-stone-600">
          {url}
        </span>
      </div>
      <div className="flex min-h-[260px] items-center justify-center bg-earthy-sand p-8">
        {children}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Write `reveal.tsx`**

```tsx
"use client";

import { useScrollReveal } from "./hooks/use-scroll-reveal";
import { cn } from "@/lib/utils";

/**
 * Wraps any element with scroll-reveal behavior. Drop in once at the
 * top of a page (`<RevealRoot />`) AND wrap individual sections with
 * `<Reveal stagger={1|2|3}>` to opt in.
 */
export function RevealRoot() {
  useScrollReveal();
  return null;
}

export function Reveal({ children, stagger, as: As = "div", className }: {
  children: React.ReactNode;
  stagger?: 1 | 2 | 3 | 4;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
}) {
  const staggerCls = stagger ? `earthy-reveal-stagger${stagger > 1 ? `-${stagger}` : ""}` : "";
  return (
    <As className={cn("earthy-reveal", staggerCls, className)}>
      {children}
    </As>
  );
}
```

- [ ] **Step 5: Write `button.tsx`**

```tsx
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function BtnPrimary({ href, children, className }: ButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2 rounded-lg bg-earthy-orange px-8 py-3.5",
        "font-[var(--font-earthy-display)] text-[15px] font-medium text-earthy-cream",
        "transition-all duration-200 hover:bg-earthy-orange-dark hover:shadow-[0_2px_12px_rgba(197,103,56,0.4)]",
        className
      )}
    >
      {children}
    </Link>
  );
}

export function BtnSecondary({ href, children, className }: ButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2 rounded-lg border border-earthy-stone-300 bg-earthy-cream px-8 py-3.5",
        "font-[var(--font-earthy-display)] text-[15px] font-medium text-earthy-orange",
        "transition-all duration-200 hover:border-earthy-orange-light hover:bg-[rgba(197,103,56,0.04)]",
        className
      )}
    >
      {children}
    </Link>
  );
}
```

- [ ] **Step 6: Lint + commit**

```bash
npm run lint
git add src/components/earthy/section-label.tsx src/components/earthy/color-strip.tsx src/components/earthy/browser-frame.tsx src/components/earthy/reveal.tsx src/components/earthy/button.tsx
git commit -m "feat(earthy): atomic primitives — section label, color strip, browser frame, reveal, buttons"
```

---

## Task 4: EarthyNav

**Files:**
- Create: `src/components/earthy/nav.tsx`

- [ ] **Step 1: Write `nav.tsx`**

```tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import { UserMenu } from "@/components/user-menu";
import { cn } from "@/lib/utils";

const links = [
  { href: "/#features", label: "Services" },
  { href: "/#showcase", label: "How it works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function EarthyNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isSignedIn } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed left-0 right-0 top-0 z-[1000] h-16 border-b border-earthy-stone-200",
        "backdrop-blur-xl backdrop-saturate-150 transition-shadow duration-300",
        "bg-[rgba(251,248,241,0.92)]",
        scrolled && "shadow-[var(--earthy-shadow-sm)]"
      )}
    >
      <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between px-6">
        <Link href="/" className="flex items-baseline gap-[3px] font-[var(--font-earthy-display)] text-2xl font-bold tracking-[-0.5px]">
          <span className="text-earthy-orange">K</span>
          <span className="text-earthy-blue">P</span>
          <span className="text-earthy-amber">T</span>
          <span className="ml-2 self-end text-[0.62em] font-medium uppercase tracking-[0.18em] text-earthy-stone-700">
            Designs
          </span>
        </Link>

        <ul className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded-full px-4 py-2 font-[var(--font-earthy-display)] text-sm font-medium text-earthy-stone-600 transition-all duration-200 hover:bg-earthy-stone-100 hover:text-earthy-ink"
              >
                {link.label}
              </Link>
            </li>
          ))}
          {isSignedIn ? (
            <>
              <li>
                <Link
                  href="/dashboard"
                  className="rounded-full px-4 py-2 font-[var(--font-earthy-display)] text-sm font-medium text-earthy-stone-600 transition-all duration-200 hover:bg-earthy-stone-100 hover:text-earthy-ink"
                >
                  Dashboard
                </Link>
              </li>
              <li className="ml-1"><UserMenu size="sm" /></li>
            </>
          ) : (
            <li>
              <Link
                href="/sign-up"
                className="rounded-full bg-earthy-orange px-5 py-2 font-[var(--font-earthy-display)] text-sm font-medium text-earthy-cream transition-all duration-200 hover:bg-earthy-orange-dark hover:shadow-[0_1px_3px_rgba(197,103,56,0.4)]"
              >
                Get Started
              </Link>
            </li>
          )}
        </ul>

        <button
          aria-label="Menu"
          onClick={() => setMobileOpen((v) => !v)}
          className="flex flex-col gap-[5px] p-2 md:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5 text-earthy-stone-700" /> : <Menu className="h-5 w-5 text-earthy-stone-700" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-earthy-stone-200 bg-earthy-cream md:hidden">
          <ul className="flex flex-col gap-1 p-4">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-3 font-[var(--font-earthy-display)] text-base text-earthy-stone-700 hover:bg-earthy-stone-100"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {!isSignedIn && (
              <li>
                <Link
                  href="/sign-up"
                  onClick={() => setMobileOpen(false)}
                  className="mt-2 block rounded-lg bg-earthy-orange px-3 py-3 text-center font-[var(--font-earthy-display)] text-base font-medium text-earthy-cream"
                >
                  Get Started
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
```

- [ ] **Step 2: Lint**

```bash
npm run lint
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/earthy/nav.tsx
git commit -m "feat(earthy): top nav with 4-color logo, scroll shadow, mobile sheet"
```

---

## Task 5: EarthyFooter

**Files:**
- Create: `src/components/earthy/footer.tsx`

- [ ] **Step 1: Write `footer.tsx`**

```tsx
import Link from "next/link";
import { ColorStrip } from "./color-strip";

const productLinks = [
  { href: "/#features", label: "Web Design" },
  { href: "/pricing", label: "Hosting" },
  { href: "/pricing", label: "Domains" },
  { href: "/#showcase", label: "Site Rebuild" },
  { href: "/contact", label: "IT Consulting" },
];

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/#work", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
  { href: "/pricing", label: "Pricing" },
];

const resourceLinks = [
  { href: "/contact", label: "Get a quote" },
  { href: "/dashboard", label: "Customer login" },
  { href: "mailto:hello@kptdesigns.com", label: "Email us" },
];

export function EarthyFooter() {
  return (
    <>
      <ColorStrip />
      <footer className="border-t border-earthy-stone-200 bg-earthy-sand pb-8 pt-14">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-[2fr_1fr_1fr_1fr]">
            <div>
              <Link href="/" className="mb-4 flex items-baseline gap-[3px] font-[var(--font-earthy-display)] text-[22px] font-bold tracking-[-0.5px]">
                <span className="text-earthy-orange">K</span>
                <span className="text-earthy-blue">P</span>
                <span className="text-earthy-amber">T</span>
                <span className="ml-2 self-end text-[0.62em] font-medium uppercase tracking-[0.18em] text-earthy-stone-700">
                  Designs
                </span>
              </Link>
              <p className="max-w-[280px] text-sm leading-relaxed text-earthy-stone-500">
                Modern websites. Built to convert. Custom-coded, no templates — you own everything.
              </p>
            </div>
            {[
              { title: "Products", items: productLinks },
              { title: "Company", items: companyLinks },
              { title: "Get help", items: resourceLinks },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="mb-4 font-[var(--font-earthy-display)] text-sm font-semibold uppercase tracking-[1px] text-earthy-stone-700">
                  {col.title}
                </h4>
                <ul className="space-y-2.5">
                  {col.items.map((it) => (
                    <li key={it.label}>
                      <Link href={it.href} className="text-sm text-earthy-stone-500 transition-colors hover:text-earthy-orange">
                        {it.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center justify-between gap-4 border-t border-earthy-stone-200 pt-7 md:flex-row">
            <p className="text-xs text-earthy-stone-500">
              © {new Date().getFullYear()} KPT Designs. All rights reserved. ·{" "}
              <Link href="/contact" className="hover:text-earthy-orange">Privacy</Link> ·{" "}
              <Link href="/contact" className="hover:text-earthy-orange">Terms</Link>
            </p>
            <p className="text-xs text-earthy-stone-500">
              Made for small businesses across the US.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
```

- [ ] **Step 2: Lint + commit**

```bash
npm run lint
git add src/components/earthy/footer.tsx
git commit -m "feat(earthy): 4-column footer with bottom color strip"
```

---

## Task 6: Wire LayoutShell to use EarthyNav/EarthyFooter for marketing routes — first browser check

**Files:**
- Modify: `src/components/layout-shell.tsx`

- [ ] **Step 1: Update `layout-shell.tsx`**

Replace the file contents with:

```tsx
"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { EarthyNav } from "@/components/earthy/nav";
import { EarthyFooter } from "@/components/earthy/footer";
import { BackToTop } from "@/components/back-to-top";
import { PageTransition } from "@/components/page-transition";

const MARKETING_ROUTES = ["/", "/about", "/contact", "/pricing"];

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isSitePage = pathname.startsWith("/sites/");
  const isAuthPage = pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");
  const isDashboard = pathname.startsWith("/dashboard");
  const isNeo = pathname.startsWith("/neo");
  const isLandman = pathname.startsWith("/landman");
  const isTunnelMockup = pathname.startsWith("/mockup/v5-tunnel");
  const isCosmosMockup = pathname.startsWith("/mockup/v2-cosmos");
  const isTouchDesign = pathname.startsWith("/projects/touchdesign");

  if (isSitePage || isAuthPage || isDashboard || isNeo || isLandman || isTunnelMockup || isCosmosMockup || isTouchDesign) {
    return <>{children}</>;
  }

  // Marketing surface gets the new earthy chrome.
  const isMarketing = MARKETING_ROUTES.some((r) => r === pathname);

  if (isMarketing) {
    return (
      <>
        <EarthyNav />
        <main className="pt-16">{children}</main>
        <EarthyFooter />
      </>
    );
  }

  // Everything else (e.g. /mockup/*, /ideas, /proposal, /domains) keeps the legacy
  // dark header/footer until those routes are migrated or sunset.
  return (
    <>
      <Header />
      <main>
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
```

- [ ] **Step 2: Lint**

```bash
npm run lint
```

Expected: no errors.

- [ ] **Step 3: Browser-verify on `/about` (current page is fine — we just want the new header/footer to render)**

```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3010/about
```

Expected: `200`.

Then in the chrome MCP:

```
mcp__claude-in-chrome__navigate → http://localhost:3010/about
mcp__claude-in-chrome__read_page
```

Confirm the page renders with:
- Top color strip (4 segments)
- Cream nav with "K P T Designs" 4-color logo
- Old `/about` body content still visible (we haven't rewritten it yet)
- Sand-colored footer with 4 columns + color strip above

If the old `/about` content shows beneath the new header, this task is done. Visual mismatch is expected.

- [ ] **Step 4: Commit**

```bash
git add src/components/layout-shell.tsx
git commit -m "feat(earthy): wire EarthyNav/EarthyFooter for marketing routes"
```

---

## Task 7: EarthyHero (the big one)

**Files:**
- Create: `src/components/earthy/hero.tsx`

- [ ] **Step 1: Write `hero.tsx`**

```tsx
"use client";

import { Search } from "lucide-react";
import { useTypingCycle } from "./hooks/use-typing-cycle";
import { BtnPrimary, BtnSecondary } from "./button";

const SUGGESTIONS = [
  "Modernize my dental practice site",
  "Redesign my outdated bakery website",
  "Move my Wix site to something I own",
  "Add online booking to my barber shop",
  "Build a landing page for my law firm",
  "Rebuild my Facebook-only business as a real site",
];

export function EarthyHero() {
  const inputRef = useTypingCycle(SUGGESTIONS);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-earthy-cream to-earthy-sand px-6 pb-30 pt-40 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-200px] h-[800px] w-[800px] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(197,103,56,0.06) 0%, transparent 70%)",
        }}
      />
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-7 inline-flex items-baseline gap-1 font-[var(--font-earthy-display)] font-bold leading-none">
          <span
            className="inline-block text-[clamp(5rem,12vw,9rem)] tracking-[-4px] text-earthy-orange"
            style={{ animation: "earthyLetterPop 0.6s var(--earthy-ease-bounce) 0.1s both" }}
          >
            K
          </span>
          <span
            className="inline-block text-[clamp(5rem,12vw,9rem)] tracking-[-4px] text-earthy-blue"
            style={{ animation: "earthyLetterPop 0.6s var(--earthy-ease-bounce) 0.25s both" }}
          >
            P
          </span>
          <span
            className="inline-block text-[clamp(5rem,12vw,9rem)] tracking-[-4px] text-earthy-amber"
            style={{ animation: "earthyLetterPop 0.6s var(--earthy-ease-bounce) 0.4s both" }}
          >
            T
          </span>
        </div>
        <p
          className="-mt-1 mb-5 font-[var(--font-earthy-display)] text-[clamp(1rem,2.4vw,1.5rem)] font-semibold uppercase text-earthy-sage"
          style={{
            letterSpacing: "0.42em",
            textIndent: "0.42em",
            animation: "earthyFadeUp 0.8s var(--earthy-ease) 0.6s both",
          }}
        >
          Designs
        </p>
        <p
          className="mx-auto mb-10 max-w-[600px] font-[var(--font-earthy-display)] text-[clamp(1.15rem,2.5vw,1.5rem)] font-normal leading-snug text-earthy-stone-600"
          style={{ animation: "earthyFadeUp 0.8s var(--earthy-ease) 0.6s both" }}
        >
          Custom-coded websites, starting at $500. We rebuild your old site or build new — and you own every line.
        </p>

        <form
          action="/contact"
          method="get"
          className="mx-auto mb-12 max-w-[580px]"
          style={{ animation: "earthyFadeUp 0.8s var(--earthy-ease) 0.8s both" }}
        >
          <div className="flex items-center gap-2 rounded-full border border-earthy-stone-300 bg-earthy-cream py-1.5 pl-6 pr-2 shadow-[var(--earthy-shadow-sm)] transition-all hover:shadow-[var(--earthy-shadow-md)] focus-within:border-transparent focus-within:shadow-[var(--earthy-shadow-md)]">
            <Search className="h-5 w-5 shrink-0 text-earthy-stone-500" />
            <input
              ref={inputRef}
              name="q"
              className="flex-1 border-none bg-transparent py-2.5 font-[var(--font-earthy-body)] text-base text-earthy-ink outline-none placeholder:text-earthy-stone-400"
              placeholder="What do you want to build?"
              autoComplete="off"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-earthy-orange px-6 py-2.5 font-[var(--font-earthy-display)] text-sm font-medium text-earthy-cream transition-all hover:bg-earthy-orange-dark hover:shadow-[0_2px_8px_rgba(197,103,56,0.35)]"
            >
              Get Started
            </button>
          </div>
        </form>

        <div
          className="mb-12 flex justify-center gap-2.5"
          style={{ animation: "earthyFadeUp 0.8s var(--earthy-ease) 1s both" }}
        >
          {[
            ["bg-earthy-orange", "0s"],
            ["bg-earthy-blue", "0.15s"],
            ["bg-earthy-amber", "0.3s"],
            ["bg-earthy-sage", "0.45s"],
          ].map(([bg, delay]) => (
            <span
              key={delay}
              className={`h-3 w-3 rounded-full ${bg}`}
              style={{ animation: `earthyBounce 1.4s ease-in-out ${delay} infinite` }}
            />
          ))}
        </div>

        <div
          className="flex flex-wrap justify-center gap-3.5"
          style={{ animation: "earthyFadeUp 0.8s var(--earthy-ease) 1.1s both" }}
        >
          <BtnPrimary href="/#features">See what we build</BtnPrimary>
          <BtnSecondary href="/contact">Start your project</BtnSecondary>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Lint**

```bash
npm run lint
```

Expected: no errors.

- [ ] **Step 3: Commit (verification deferred until composed in `/`)**

```bash
git add src/components/earthy/hero.tsx
git commit -m "feat(earthy): hero with letter-pop, typing search, bouncing dots"
```

---

## Task 8: EarthyRibbon

**Files:**
- Create: `src/components/earthy/ribbon.tsx`

- [ ] **Step 1: Write `ribbon.tsx`**

```tsx
import Link from "next/link";
import { Search, LayoutGrid, Cloud, Sparkles, BarChart3, Smartphone } from "lucide-react";

const items = [
  { href: "/#features", label: "Site Rebuild", color: "bg-earthy-orange", Icon: Search },
  { href: "/pricing", label: "Hosting", color: "bg-earthy-blue", Icon: Cloud },
  { href: "/pricing", label: "Domains", color: "bg-earthy-amber", Icon: LayoutGrid },
  { href: "/#showcase", label: "From Scratch", color: "bg-earthy-sage", Icon: Sparkles },
  { href: "/#stats", label: "Analytics", color: "bg-earthy-orange", Icon: BarChart3 },
  { href: "/contact", label: "Mobile-First", color: "bg-earthy-blue", Icon: Smartphone },
];

export function EarthyRibbon() {
  return (
    <section className="border-y border-earthy-stone-200 bg-earthy-cream py-16">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="flex flex-wrap items-center justify-center gap-12">
          {items.map(({ href, label, color, Icon }) => (
            <Link key={label} href={href} className="group flex flex-col items-center gap-2.5 transition-transform hover:-translate-y-1">
              <div className={`flex h-13 w-13 items-center justify-center rounded-full text-earthy-cream shadow-[var(--earthy-shadow-sm)] ${color}`} style={{ width: 52, height: 52 }}>
                <Icon className="h-5 w-5" strokeWidth={2} />
              </div>
              <span className="font-[var(--font-earthy-display)] text-xs font-medium tracking-[0.3px] text-earthy-stone-600">
                {label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Lint + commit**

```bash
npm run lint
git add src/components/earthy/ribbon.tsx
git commit -m "feat(earthy): product ribbon with 6 icon tiles"
```

---

## Task 9: FeatureCard + FeatureGrid

**Files:**
- Create: `src/components/earthy/feature-card.tsx`
- Create: `src/components/earthy/feature-grid.tsx`

- [ ] **Step 1: Write `feature-card.tsx`**

```tsx
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const ICON_BG: Record<string, string> = {
  orange: "bg-earthy-orange-light text-earthy-orange",
  blue: "bg-earthy-blue-light text-earthy-blue",
  amber: "bg-earthy-amber-light text-[#9A6B0F]",
  sage: "bg-earthy-sage-light text-earthy-sage",
};

const TOP_BAR: Record<string, string> = {
  orange: "bg-earthy-orange",
  blue: "bg-earthy-blue",
  amber: "bg-earthy-amber",
  sage: "bg-earthy-sage",
};

export type FeatureCardProps = {
  Icon: LucideIcon;
  color: keyof typeof ICON_BG;
  title: string;
  body: string;
  cta?: { href: string; label: string };
};

export function FeatureCard({ Icon, color, title, body, cta }: FeatureCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-earthy-stone-200 bg-earthy-cream p-9 transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-[var(--earthy-shadow-hover)]">
      <span
        className={cn(
          "absolute left-0 right-0 top-0 h-1 origin-left scale-x-0 rounded-t-2xl transition-transform duration-300 group-hover:scale-x-100",
          TOP_BAR[color]
        )}
      />
      <div className={cn("mb-5 flex h-12 w-12 items-center justify-center rounded-lg", ICON_BG[color])}>
        <Icon className="h-6 w-6" strokeWidth={2} />
      </div>
      <h3 className="mb-2.5 font-[var(--font-earthy-display)] text-[1.35rem] font-semibold leading-tight text-earthy-ink">
        {title}
      </h3>
      <p className="text-[0.95rem] leading-relaxed text-earthy-stone-600">{body}</p>
      {cta && (
        <Link
          href={cta.href}
          className="mt-4.5 inline-block font-[var(--font-earthy-display)] text-sm font-medium text-earthy-orange transition-colors hover:text-earthy-orange-dark"
        >
          {cta.label} →
        </Link>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Write `feature-grid.tsx`**

```tsx
import { FeatureCard, type FeatureCardProps } from "./feature-card";
import { Reveal } from "./reveal";

export function FeatureGrid({ features }: { features: FeatureCardProps[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {features.map((f, i) => (
        <Reveal key={f.title} stagger={i % 3 === 0 ? undefined : ((i % 3) as 1 | 2)}>
          <FeatureCard {...f} />
        </Reveal>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Lint + commit**

```bash
npm run lint
git add src/components/earthy/feature-card.tsx src/components/earthy/feature-grid.tsx
git commit -m "feat(earthy): feature card with hover top-bar + grid wrapper"
```

---

## Task 10: ShowcaseRow (with internal animated visuals)

**Files:**
- Create: `src/components/earthy/showcase-row.tsx`

- [ ] **Step 1: Write `showcase-row.tsx`**

```tsx
import { ReactNode } from "react";
import { SectionLabel } from "./section-label";
import { BtnPrimary, BtnSecondary } from "./button";
import { BrowserFrame } from "./browser-frame";
import { cn } from "@/lib/utils";

export type ShowcaseRowProps = {
  label: string;
  title: string;
  body: string;
  cta: { href: string; label: string; variant?: "primary" | "secondary" };
  visualUrl: string;          // text shown in faux browser address bar
  visual: ReactNode;          // content rendered inside the browser frame
  reverse?: boolean;
};

export function ShowcaseRow({ label, title, body, cta, visualUrl, visual, reverse }: ShowcaseRowProps) {
  const Btn = cta.variant === "secondary" ? BtnSecondary : BtnPrimary;
  return (
    <div className={cn(
      "grid grid-cols-1 items-center gap-20 md:grid-cols-2",
      reverse && "md:[&>*:first-child]:order-2"
    )}>
      <div>
        <SectionLabel>{label}</SectionLabel>
        <h2 className="mb-5 font-[var(--font-earthy-display)] text-[clamp(1.6rem,3vw,2.25rem)] font-bold leading-tight text-earthy-ink">
          {title}
        </h2>
        <p className="mb-7 text-[1.05rem] leading-relaxed text-earthy-stone-600">{body}</p>
        <Btn href={cta.href}>{cta.label}</Btn>
      </div>
      <div>
        <BrowserFrame url={visualUrl}>{visual}</BrowserFrame>
      </div>
    </div>
  );
}

/* ── Built-in visuals matching the reference HTML ─────────────────────────── */

export function BarChartVisual() {
  const bars = [
    { h: 65, color: "bg-earthy-orange", delay: "0.1s" },
    { h: 85, color: "bg-earthy-blue", delay: "0.2s" },
    { h: 50, color: "bg-earthy-amber", delay: "0.3s" },
    { h: 95, color: "bg-earthy-sage", delay: "0.4s" },
    { h: 72, color: "bg-earthy-orange", delay: "0.5s" },
    { h: 58, color: "bg-earthy-blue", delay: "0.6s" },
  ];
  return (
    <div className="flex h-40 items-end gap-3.5">
      {bars.map((b, i) => (
        <div
          key={i}
          className={`w-9 origin-bottom rounded-t-md ${b.color}`}
          style={{
            height: `${b.h}%`,
            animation: `earthyGrowBar 1.2s var(--earthy-ease) ${b.delay} both`,
          }}
        />
      ))}
    </div>
  );
}

export function CircleRingVisual({ centerText }: { centerText: string }) {
  return (
    <div className="relative h-[200px] w-[200px]">
      <div
        className="relative h-[200px] w-[200px] rounded-full"
        style={{
          background:
            "conic-gradient(var(--color-earthy-orange) 0deg 120deg, var(--color-earthy-blue) 120deg 210deg, var(--color-earthy-amber) 210deg 280deg, var(--color-earthy-sage) 280deg 360deg)",
          animation: "earthySpinIn 1.5s var(--earthy-ease) both",
        }}
      >
        <div className="absolute inset-10 rounded-full bg-earthy-sand" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center font-[var(--font-earthy-display)] text-3xl font-bold text-earthy-ink">
        {centerText}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Lint + commit**

```bash
npm run lint
git add src/components/earthy/showcase-row.tsx
git commit -m "feat(earthy): showcase row with bar-chart + circle-ring visuals"
```

---

## Task 11: StatsSection (dark band with gradient counters)

**Files:**
- Create: `src/components/earthy/stat-card.tsx`
- Create: `src/components/earthy/stats-section.tsx`

- [ ] **Step 1: Write `stat-card.tsx`**

```tsx
"use client";

import { useCountUp } from "./hooks/use-count-up";

const GRADIENT_BY_INDEX = [
  "from-earthy-orange to-earthy-sage",
  "from-earthy-blue to-earthy-amber",
  "from-earthy-amber to-earthy-sage",
  "from-earthy-sage to-earthy-orange",
];

export type StatCardProps = {
  target: number;
  suffix?: string;
  label: string;
  index: number;
};

export function StatCard({ target, suffix = "", label, index }: StatCardProps) {
  const ref = useCountUp(target, { suffix });
  const gradient = GRADIENT_BY_INDEX[index % GRADIENT_BY_INDEX.length];
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-9 text-center backdrop-blur-md transition-all hover:-translate-y-1 hover:bg-white/10">
      <span
        ref={ref}
        className={`mb-2 block bg-gradient-to-br ${gradient} bg-clip-text font-[var(--font-earthy-display)] text-[clamp(2rem,4vw,3rem)] font-bold leading-tight tracking-[-1px] text-transparent`}
      >
        0
      </span>
      <p className="text-[0.95rem] text-earthy-stone-400">{label}</p>
    </div>
  );
}
```

- [ ] **Step 2: Write `stats-section.tsx`**

```tsx
import { SectionLabel } from "./section-label";
import { StatCard, type StatCardProps } from "./stat-card";
import { Reveal } from "./reveal";

export function StatsSection({ label, title, stats }: {
  label: string;
  title: string;
  stats: Omit<StatCardProps, "index">[];
}) {
  return (
    <section className="relative overflow-hidden bg-earthy-ink py-20" id="stats">
      <span aria-hidden className="pointer-events-none absolute -right-[150px] -top-[150px] h-[500px] w-[500px] rounded-full" style={{ background: "radial-gradient(circle, rgba(197,103,56,0.12) 0%, transparent 70%)" }} />
      <span aria-hidden className="pointer-events-none absolute -bottom-[150px] -left-[150px] h-[500px] w-[500px] rounded-full" style={{ background: "radial-gradient(circle, rgba(123,161,90,0.1) 0%, transparent 70%)" }} />
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mb-14 text-center">
          <SectionLabel className="!text-earthy-orange-light">{label}</SectionLabel>
          <h2 className="font-[var(--font-earthy-display)] text-[clamp(1.8rem,3.5vw,2.75rem)] font-bold leading-tight tracking-[-0.5px] text-earthy-cream">
            {title}
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} stagger={i === 0 ? undefined : ((i as 1 | 2 | 3))}>
              <StatCard {...s} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Lint + commit**

```bash
npm run lint
git add src/components/earthy/stat-card.tsx src/components/earthy/stats-section.tsx
git commit -m "feat(earthy): dark stats section with gradient count-up cards"
```

---

## Task 12: LogoCloud + LogoTile + QuoteCard + CTASection

**Files:**
- Create: `src/components/earthy/logo-tile.tsx`
- Create: `src/components/earthy/logo-cloud.tsx`
- Create: `src/components/earthy/quote-card.tsx`
- Create: `src/components/earthy/cta-section.tsx`

- [ ] **Step 1: Write `logo-tile.tsx`**

```tsx
export function LogoTile({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-20 w-28 cursor-default items-center justify-center rounded-lg border border-earthy-stone-200 bg-earthy-cream font-[var(--font-earthy-display)] text-[13px] font-semibold text-earthy-stone-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-earthy-orange hover:text-earthy-orange hover:shadow-[0_2px_12px_rgba(197,103,56,0.15)]">
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Write `logo-cloud.tsx`**

```tsx
import { LogoTile } from "./logo-tile";
import { SectionLabel } from "./section-label";

export function LogoCloud({ label, title, body, logos }: {
  label: string;
  title: string;
  body: string;
  logos: string[];
}) {
  return (
    <section className="bg-earthy-sand py-25 text-center" id="integrations">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mx-auto mb-14 max-w-[540px]">
          <SectionLabel>{label}</SectionLabel>
          <h2 className="font-[var(--font-earthy-display)] text-[clamp(1.8rem,3.5vw,2.75rem)] font-bold leading-tight text-earthy-ink">
            {title}
          </h2>
          <p className="mt-3.5 text-[1.05rem] leading-relaxed text-earthy-stone-600">{body}</p>
        </div>
        <div className="mx-auto flex max-w-[800px] flex-wrap justify-center gap-5">
          {logos.map((l) => <LogoTile key={l}>{l}</LogoTile>)}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Write `quote-card.tsx`**

```tsx
export function QuoteCard({ quote, author, meta, initials }: {
  quote: string;
  author: string;
  meta: string;
  initials: string;
}) {
  return (
    <section className="bg-earthy-cream py-25 text-center">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="relative mx-auto max-w-[700px] rounded-3xl bg-earthy-sand p-12">
          <span className="absolute left-8 top-4 font-serif text-[5rem] leading-none text-earthy-orange-light">“</span>
          <p className="mb-6 font-[var(--font-earthy-display)] text-[1.35rem] font-normal leading-relaxed text-earthy-ink">
            {quote}
          </p>
          <div className="flex items-center justify-center gap-3.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-earthy-orange to-earthy-sage font-[var(--font-earthy-display)] text-lg font-semibold text-earthy-cream">
              {initials}
            </div>
            <div className="text-left">
              <strong className="block font-[var(--font-earthy-display)] text-[0.95rem] text-earthy-ink">{author}</strong>
              <span className="text-[0.85rem] text-earthy-stone-500">{meta}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Write `cta-section.tsx`**

```tsx
import { SectionLabel } from "./section-label";
import { BtnPrimary, BtnSecondary } from "./button";

export function CTASection({ label, title, body, primary, secondary }: {
  label: string;
  title: string;
  body: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="relative bg-gradient-to-b from-earthy-cream to-earthy-sand py-25 text-center" id="cta">
      <div className="mx-auto max-w-[600px] px-6">
        <SectionLabel>{label}</SectionLabel>
        <h2 className="mb-4 font-[var(--font-earthy-display)] text-[clamp(1.8rem,3.5vw,2.75rem)] font-bold leading-tight text-earthy-ink">
          {title}
        </h2>
        <p className="mb-9 text-[1.1rem] leading-relaxed text-earthy-stone-600">{body}</p>
        <div className="flex flex-wrap justify-center gap-3.5">
          <BtnPrimary href={primary.href}>{primary.label}</BtnPrimary>
          {secondary && <BtnSecondary href={secondary.href}>{secondary.label}</BtnSecondary>}
        </div>
        <div className="mt-10 inline-flex gap-1.5">
          {["bg-earthy-orange", "bg-earthy-blue", "bg-earthy-amber", "bg-earthy-sage"].map((bg, i) => (
            <span key={bg} className={`h-2 w-2 rounded-full ${bg}`} style={{ animation: `earthyLoadPulse 1.2s ease-in-out ${i * 0.2}s infinite` }} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Lint + commit**

```bash
npm run lint
git add src/components/earthy/logo-tile.tsx src/components/earthy/logo-cloud.tsx src/components/earthy/quote-card.tsx src/components/earthy/cta-section.tsx
git commit -m "feat(earthy): logo cloud, quote card, final CTA section"
```

---

## Task 13: Compose new home page (`/`)

**Files:**
- Modify (rewrite): `src/app/page.tsx`

- [ ] **Step 1: Replace `src/app/page.tsx` with the earthy composition**

```tsx
import {
  Search,
  RefreshCcw,
  FileText,
  Image as ImageIcon,
  ShieldCheck,
  Globe2,
  Code2,
  Sparkles,
} from "lucide-react";
import { EarthyHero } from "@/components/earthy/hero";
import { EarthyRibbon } from "@/components/earthy/ribbon";
import { SectionLabel } from "@/components/earthy/section-label";
import { Reveal, RevealRoot } from "@/components/earthy/reveal";
import { FeatureGrid } from "@/components/earthy/feature-grid";
import {
  ShowcaseRow,
  BarChartVisual,
  CircleRingVisual,
} from "@/components/earthy/showcase-row";
import { StatsSection } from "@/components/earthy/stats-section";
import { LogoCloud } from "@/components/earthy/logo-cloud";
import { QuoteCard } from "@/components/earthy/quote-card";
import { CTASection } from "@/components/earthy/cta-section";

const FEATURES = [
  {
    Icon: RefreshCcw,
    color: "orange" as const,
    title: "Site Rebuild",
    body: "Got a tired site you can't update? We scrape it, study it, and rebuild it modern — same content, ten times faster.",
    cta: { href: "/contact", label: "Rebuild my site" },
  },
  {
    Icon: Sparkles,
    color: "blue" as const,
    title: "From Scratch",
    body: "No site yet? Send us your docs, photos, even your Facebook page. We turn it into a clean, fast, custom-coded site.",
    cta: { href: "/contact", label: "Start fresh" },
  },
  {
    Icon: Globe2,
    color: "amber" as const,
    title: "Domains Included",
    body: "Don't have a domain? We register one for you. Already own one? We'll point it. Want to leave later? Take it with you.",
    cta: { href: "/pricing", label: "See domain pricing" },
  },
  {
    Icon: Code2,
    color: "sage" as const,
    title: "You Own The Code",
    body: "Custom-coded — no Wix, no Squarespace lock-in. Host with us, or take the repo and host anywhere. Your call, always.",
    cta: { href: "/pricing", label: "How hosting works" },
  },
  {
    Icon: ShieldCheck,
    color: "orange" as const,
    title: "Built To Convert",
    body: "Fast loads, clear calls-to-action, mobile-first. Every page designed around the one thing that matters: getting customers.",
    cta: { href: "/#showcase", label: "See examples" },
  },
  {
    Icon: FileText,
    color: "blue" as const,
    title: "Edit It Yourself",
    body: "After launch, edit text, swap photos, and rearrange sections from your dashboard. No code, no waiting on us.",
    cta: { href: "/contact", label: "Tour the editor" },
  },
];

export default function Home() {
  return (
    <>
      <RevealRoot />

      <EarthyHero />

      <EarthyRibbon />

      <section className="bg-earthy-sand py-25" id="features">
        <div className="mx-auto max-w-[1200px] px-6">
          <Reveal className="mx-auto mb-16 max-w-[640px] text-center">
            <SectionLabel>What we build</SectionLabel>
            <h2 className="font-[var(--font-earthy-display)] text-[clamp(1.8rem,3.5vw,2.75rem)] font-bold leading-tight tracking-[-0.5px] text-earthy-ink">
              Modern websites for businesses that don't have one yet — or wish theirs was better
            </h2>
            <p className="mt-4 text-[1.1rem] leading-relaxed text-earthy-stone-600">
              From a one-page menu for a restaurant to a multi-page site with online booking, we start at $500 and price up from there based on what you need.
            </p>
          </Reveal>
          <FeatureGrid features={FEATURES} />
        </div>
      </section>

      <section className="bg-earthy-cream py-25" id="showcase">
        <div className="mx-auto max-w-[1200px] space-y-25 px-6">
          <Reveal>
            <ShowcaseRow
              label="Site Rebuild"
              title="We take your old site and rebuild it better"
              body="Send us your URL — even if it's a Wix, GoDaddy, or 'my nephew built it in 2014' situation. Our process scrapes the real content, studies what's worth keeping, and ships a modern, fast version you actually own. Same business, dramatically better website."
              cta={{ href: "/contact", label: "Send us your URL" }}
              visualUrl="kptdesigns.com/rebuild"
              visual={<BarChartVisual />}
            />
          </Reveal>
          <Reveal>
            <ShowcaseRow
              reverse
              label="Build From Scratch"
              title="Got no site? We can work from anything"
              body="Documents, PDFs, photos from your phone, the menu printed on your wall, your Facebook page, a hand-drawn sketch on a napkin — we'll take whatever you have, fill in the rest with a quick conversation, and turn it into a clean, fast website."
              cta={{ href: "/contact", label: "Start with what you have", variant: "secondary" }}
              visualUrl="kptdesigns.com/intake"
              visual={<CircleRingVisual centerText="KPT" />}
            />
          </Reveal>
        </div>
      </section>

      <StatsSection
        label="By the numbers"
        title="Small businesses, big results"
        stats={[
          { target: 35, suffix: "+", label: "Sites shipped" },
          { target: 500, suffix: "+", label: "Starting price (USD)" },
          { target: 99.9, suffix: "%", label: "Hosting uptime" },
          { target: 14, suffix: "d", label: "Avg. turnaround" },
        ]}
      />

      <LogoCloud
        label="Industries we serve"
        title="Built for the businesses our neighbors run"
        body="Plumbers, electricians, lawyers, dentists, golf courses, landscapers, restaurants, real estate offices — we've shipped sites for all of them."
        logos={[
          "Plumbing", "Electrical", "Roofing", "Real Estate", "Law Firms",
          "Restaurants", "Landscaping", "Pest Control", "Hospitality",
          "Auto Detail", "Counseling", "Pickleball", "Golf",
        ]}
      />

      <QuoteCard
        quote="We had a site from 2011 that nobody was using. KPT scraped it, asked us five smart questions, and two weeks later we had a site that actually books appointments. The orange logo is the only thing they didn't change."
        author="Tony C."
        meta="Cirigliano Plumbing"
        initials="TC"
      />

      <CTASection
        label="Get started"
        title="Tell us about your business"
        body="Five-minute conversation. We'll quote you in a day, ship in two weeks, and you'll own every line."
        primary={{ href: "/contact", label: "Start your project" }}
        secondary={{ href: "/pricing", label: "See pricing" }}
      />
    </>
  );
}
```

- [ ] **Step 2: Browser verify**

```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3010/
```

Expected: `200`.

Then with chrome MCP:
```
mcp__claude-in-chrome__navigate → http://localhost:3010/
```
Confirm:
- Hero: 4-color strip → cream nav → big "K P T" letters pop in (orange/blue/amber) → green "Designs" → tagline → search bar → 4 bouncing dots → 2 CTAs
- Ribbon: 6 colored icon tiles
- Features: 6 cards in a 3x2 grid, hover any card → colored top-bar slides in
- Showcase: 2 rows, 1st has bar chart, 2nd reversed with conic-gradient ring
- Stats: dark band, 4 gradient numbers count up from 0
- Logo cloud: 13 industry tiles
- Quote: testimonial card with " glyph
- CTA: gradient bg with loading-dot animation
- Footer: 4 columns, color strip on top, social links removed (we kept it text-only)

- [ ] **Step 3: Side-by-side compare with reference**

```
mcp__claude-in-chrome__navigate → http://localhost:3010/concepts/earthy.html
```
Spot-check colors, spacing, animations match. Document any drift in your follow-up notes.

- [ ] **Step 4: Lint + commit**

```bash
npm run lint
git add src/app/page.tsx
git commit -m "feat(earthy): rewrite home page in earthy theme"
```

---

## Task 14: Rewrite `/about`

**Files:**
- Modify (rewrite): `src/app/about/page.tsx`

- [ ] **Step 1: Read existing about page to preserve key copy**

```bash
cat src/app/about/page.tsx
```

Pull out: any real founder names, locations, year-founded numbers, mission statements. Keep them; reframe in the new layout.

- [ ] **Step 2: Replace `src/app/about/page.tsx`**

```tsx
import { Heart, Hammer, Users } from "lucide-react";
import { SectionLabel } from "@/components/earthy/section-label";
import { Reveal, RevealRoot } from "@/components/earthy/reveal";
import { FeatureGrid } from "@/components/earthy/feature-grid";
import { CTASection } from "@/components/earthy/cta-section";

const VALUES = [
  {
    Icon: Hammer,
    color: "orange" as const,
    title: "Custom code, always",
    body: "Every site is hand-built. No drag-and-drop builders, no template lock-in. The trade-off: we can do things templates literally can't.",
  },
  {
    Icon: Heart,
    color: "blue" as const,
    title: "Small businesses first",
    body: "We work mostly with one-shop trades, family practices, and local services. Big enough to ship, small enough to call us back.",
  },
  {
    Icon: Users,
    color: "sage" as const,
    title: "You own everything",
    body: "Your site, your domain, your code. If we ever stop being a good fit, you walk away with all of it. Easy.",
  },
];

export default function AboutPage() {
  return (
    <>
      <RevealRoot />

      <section className="relative overflow-hidden bg-gradient-to-b from-earthy-cream to-earthy-sand px-6 pb-24 pt-32 text-center">
        <div className="mx-auto max-w-[800px]">
          <Reveal>
            <SectionLabel>About KPT Designs</SectionLabel>
            <h1 className="mb-5 font-[var(--font-earthy-display)] text-[clamp(2.5rem,5vw,4rem)] font-bold leading-tight tracking-[-1.5px] text-earthy-ink">
              We build websites for the kind of businesses that built this country
            </h1>
            <p className="mx-auto max-w-[600px] text-[1.25rem] leading-relaxed text-earthy-stone-600">
              Plumbers. Electricians. Roofers. Lawyers. Dentists. Restaurants. Golf courses. The neighborhood ones — not the chains. Real businesses, run by real people, that deserve a real website.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-earthy-cream py-25">
        <div className="mx-auto max-w-[1200px] px-6">
          <Reveal className="mx-auto mb-16 max-w-[640px] text-center">
            <SectionLabel>How we work</SectionLabel>
            <h2 className="font-[var(--font-earthy-display)] text-[clamp(1.8rem,3.5vw,2.75rem)] font-bold leading-tight tracking-[-0.5px] text-earthy-ink">
              Three things we won't compromise on
            </h2>
          </Reveal>
          <FeatureGrid features={VALUES} />
        </div>
      </section>

      <section className="bg-earthy-sand py-25">
        <div className="mx-auto max-w-[760px] space-y-8 px-6 text-center">
          <Reveal>
            <SectionLabel>Our story</SectionLabel>
            <h2 className="mb-6 font-[var(--font-earthy-display)] text-[clamp(1.8rem,3.5vw,2.75rem)] font-bold leading-tight tracking-[-0.5px] text-earthy-ink">
              Started because too many great businesses had bad websites
            </h2>
            <p className="text-[1.1rem] leading-relaxed text-earthy-stone-600">
              Walk into any small-town main street and you'll find dozens of businesses with one thing in common: a website that looks like it was made in 2009, doesn't work on phones, and hasn't been updated in years. Most of these owners aren't web designers — they shouldn't have to be. So we built KPT Designs to take that whole problem off their plate. Send us your old site, your Facebook page, or just a phone call. Two weeks later, you have something modern. Hand-coded, properly fast, and yours forever.
            </p>
          </Reveal>
        </div>
      </section>

      <CTASection
        label="Work with us"
        title="Have a project in mind?"
        body="The easiest way to start is a five-minute conversation. We'll figure out together what makes sense."
        primary={{ href: "/contact", label: "Start the conversation" }}
        secondary={{ href: "/pricing", label: "See pricing" }}
      />
    </>
  );
}
```

- [ ] **Step 3: Browser verify**

```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3010/about
```

Expected: `200`. Then `mcp__claude-in-chrome__navigate` and confirm hero + values + story + CTA all render in the earthy palette.

- [ ] **Step 4: Lint + commit**

```bash
npm run lint
git add src/app/about/page.tsx
git commit -m "feat(earthy): rewrite about page"
```

---

## Task 15: Rewrite `/contact`

**Files:**
- Modify (rewrite): `src/app/contact/page.tsx`

This page must keep the existing contact form POST behavior (`/api/contact` exists). We only change the visual shell, not the wire format.

- [ ] **Step 1: Inspect current contact page to copy form fields + handler**

```bash
cat src/app/contact/page.tsx
```

Note the form's input names and `action`/`onSubmit`. Preserve them exactly.

- [ ] **Step 2: Replace `src/app/contact/page.tsx`**

```tsx
"use client";

import { useState } from "react";
import { Mail, MapPin, Clock } from "lucide-react";
import { SectionLabel } from "@/components/earthy/section-label";
import { Reveal, RevealRoot } from "@/components/earthy/reveal";

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <RevealRoot />
      <section className="bg-gradient-to-b from-earthy-cream to-earthy-sand px-6 pb-24 pt-32">
        <div className="mx-auto max-w-[1200px]">
          <Reveal className="mx-auto mb-14 max-w-[640px] text-center">
            <SectionLabel>Contact</SectionLabel>
            <h1 className="mb-5 font-[var(--font-earthy-display)] text-[clamp(2.5rem,5vw,4rem)] font-bold leading-tight tracking-[-1.5px] text-earthy-ink">
              Let's talk about your project
            </h1>
            <p className="text-[1.15rem] leading-relaxed text-earthy-stone-600">
              Tell us about your business and what you need. We'll respond within one business day with next steps and a ballpark price.
            </p>
          </Reveal>

          <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr]">
            <Reveal>
              <form onSubmit={handleSubmit} className="rounded-2xl border border-earthy-stone-200 bg-earthy-cream p-8 shadow-[var(--earthy-shadow-sm)]">
                {done ? (
                  <div className="py-12 text-center">
                    <h2 className="mb-3 font-[var(--font-earthy-display)] text-2xl font-bold text-earthy-ink">Thanks — we got it.</h2>
                    <p className="text-earthy-stone-600">We'll be in touch within one business day.</p>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <Field label="Your name" name="name" required />
                    <Field label="Email" name="email" type="email" required />
                    <Field label="Business name" name="business" required />
                    <Field label="Existing website (if any)" name="url" placeholder="https://..." />
                    <div>
                      <label className="mb-1.5 block font-[var(--font-earthy-display)] text-sm font-medium text-earthy-stone-700">
                        What do you need?
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        placeholder="A new website, a rebuild of an old one, hosting moved over — anything is fine."
                        className="w-full rounded-lg border border-earthy-stone-300 bg-earthy-cream px-4 py-3 font-[var(--font-earthy-body)] text-base text-earthy-ink outline-none transition-colors placeholder:text-earthy-stone-400 focus:border-earthy-orange"
                      />
                    </div>
                    {error && <p className="text-sm text-earthy-orange-dark">{error}</p>}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full rounded-lg bg-earthy-orange px-6 py-3.5 font-[var(--font-earthy-display)] text-[15px] font-medium text-earthy-cream transition-all hover:bg-earthy-orange-dark hover:shadow-[0_2px_12px_rgba(197,103,56,0.4)] disabled:opacity-60"
                    >
                      {submitting ? "Sending…" : "Send it"}
                    </button>
                  </div>
                )}
              </form>
            </Reveal>

            <Reveal stagger={2}>
              <div className="space-y-6">
                <ContactCard Icon={Mail} title="Email" body="hello@kptdesigns.com" href="mailto:hello@kptdesigns.com" />
                <ContactCard Icon={MapPin} title="Location" body="Nationwide. Remote-first." />
                <ContactCard Icon={Clock} title="Hours" body="Mon–Fri, 9am–6pm EST" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, name, type = "text", placeholder, required }: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block font-[var(--font-earthy-display)] text-sm font-medium text-earthy-stone-700">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-lg border border-earthy-stone-300 bg-earthy-cream px-4 py-3 font-[var(--font-earthy-body)] text-base text-earthy-ink outline-none transition-colors placeholder:text-earthy-stone-400 focus:border-earthy-orange"
      />
    </div>
  );
}

function ContactCard({ Icon, title, body, href }: { Icon: typeof Mail; title: string; body: string; href?: string }) {
  const Body = href ? <a className="text-earthy-orange hover:text-earthy-orange-dark" href={href}>{body}</a> : <span className="text-earthy-stone-600">{body}</span>;
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-earthy-stone-200 bg-earthy-cream p-6">
      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-earthy-orange-light text-earthy-orange">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h3 className="mb-1 font-[var(--font-earthy-display)] text-base font-semibold text-earthy-ink">{title}</h3>
        {Body}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Browser verify — render + actual form submit**

```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3010/contact
```

Expected: `200`.

```
mcp__claude-in-chrome__navigate → http://localhost:3010/contact
```

Confirm: hero + form panel + 3 contact cards render in earthy palette. Hover the input → border turns orange.

Then **submit a test message** through the chrome MCP form_input + a click on the submit button. Watch for either the "Thanks" success state or the inline error (if SMTP isn't configured locally). Either is acceptable; we just need to confirm the wire format wasn't broken.

- [ ] **Step 4: Lint + commit**

```bash
npm run lint
git add src/app/contact/page.tsx
git commit -m "feat(earthy): rewrite contact page (form wire format preserved)"
```

---

## Task 16: Rewrite `/pricing` as visual stub

Real pricing tiers ($500 floor, complexity-based, hand-off vs hosted) live in Plan B. For Plan A we ship a visually-coherent stub so the nav links don't dump users on a broken-looking page.

**Files:**
- Modify (rewrite): `src/app/pricing/page.tsx`

- [ ] **Step 1: Replace `src/app/pricing/page.tsx`**

```tsx
import { Check, Sparkles } from "lucide-react";
import { SectionLabel } from "@/components/earthy/section-label";
import { Reveal, RevealRoot } from "@/components/earthy/reveal";
import { CTASection } from "@/components/earthy/cta-section";
import { BtnPrimary, BtnSecondary } from "@/components/earthy/button";

const TIERS = [
  {
    name: "Starter",
    price: "$500",
    sub: "one-time",
    blurb: "A clean one-page site for a small business that just needs to exist online and look credible.",
    features: ["Single page, mobile-first", "Custom-coded — yours forever", "Domain included for year one", "Optional handoff or hosted with us"],
    cta: { href: "/contact", label: "Start with Starter" },
    color: "orange" as const,
  },
  {
    name: "Plus",
    price: "From $1,500",
    sub: "one-time",
    blurb: "Multi-page site with a real story to tell. Galleries, services, contact forms, light SEO work.",
    features: ["Up to 5 custom pages", "Image galleries + content blocks", "Contact form wired to your inbox", "Light search-engine optimisation"],
    cta: { href: "/contact", label: "Get a Plus quote" },
    color: "blue" as const,
    featured: true,
  },
  {
    name: "Custom",
    price: "Quote",
    sub: "talk to us",
    blurb: "Online booking, e-commerce, AI-powered features, full rebuilds — we quote these by the project.",
    features: ["Anything beyond a brochure site", "Booking, payments, accounts", "AI assistants + integrations", "We start at $500 — ceiling depends on scope"],
    cta: { href: "/contact", label: "Tell us what you need" },
    color: "sage" as const,
  },
];

export default function PricingPage() {
  return (
    <>
      <RevealRoot />
      <section className="bg-gradient-to-b from-earthy-cream to-earthy-sand px-6 pb-20 pt-32 text-center">
        <Reveal className="mx-auto max-w-[760px]">
          <SectionLabel>Pricing</SectionLabel>
          <h1 className="mb-5 font-[var(--font-earthy-display)] text-[clamp(2.5rem,5vw,4rem)] font-bold leading-tight tracking-[-1.5px] text-earthy-ink">
            Honest pricing, starts at $500
          </h1>
          <p className="mx-auto max-w-[640px] text-[1.15rem] leading-relaxed text-earthy-stone-600">
            Most one-page sites for small businesses come in around $500. From there it scales with what you need: more pages, online booking, e-commerce, or full rebuilds of your old site.
          </p>
        </Reveal>
      </section>

      <section className="bg-earthy-cream py-20">
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-6 px-6 md:grid-cols-3">
          {TIERS.map((t, i) => (
            <Reveal key={t.name} stagger={i === 0 ? undefined : ((i as 1 | 2))}>
              <div
                className={`relative flex h-full flex-col rounded-2xl border bg-earthy-cream p-9 transition-all hover:-translate-y-1 hover:shadow-[var(--earthy-shadow-hover)] ${
                  t.featured ? "border-earthy-orange shadow-[var(--earthy-shadow-md)]" : "border-earthy-stone-200"
                }`}
              >
                {t.featured && (
                  <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-earthy-orange px-3 py-1 font-[var(--font-earthy-display)] text-xs font-medium text-earthy-cream">
                    <Sparkles className="h-3 w-3" /> Most picked
                  </span>
                )}
                <SectionLabel className={`!text-${t.color === "orange" ? "earthy-orange" : t.color === "blue" ? "earthy-blue" : "earthy-sage"}`}>
                  {t.name}
                </SectionLabel>
                <div className="mb-3 flex items-baseline gap-2">
                  <span className="font-[var(--font-earthy-display)] text-4xl font-bold text-earthy-ink">{t.price}</span>
                  <span className="text-sm text-earthy-stone-500">{t.sub}</span>
                </div>
                <p className="mb-6 text-[0.95rem] leading-relaxed text-earthy-stone-600">{t.blurb}</p>
                <ul className="mb-8 space-y-3">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-earthy-stone-700">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-earthy-sage" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  {t.featured
                    ? <BtnPrimary href={t.cta.href} className="w-full justify-center">{t.cta.label}</BtnPrimary>
                    : <BtnSecondary href={t.cta.href} className="w-full justify-center">{t.cta.label}</BtnSecondary>}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-earthy-sand py-20">
        <div className="mx-auto max-w-[760px] px-6 text-center">
          <Reveal>
            <SectionLabel>Hosting + handoff</SectionLabel>
            <h2 className="mb-5 font-[var(--font-earthy-display)] text-[clamp(1.8rem,3.5vw,2.5rem)] font-bold leading-tight text-earthy-ink">
              Host with us, or take the code and run
            </h2>
            <p className="mb-2 text-[1.05rem] leading-relaxed text-earthy-stone-600">
              Once your site is built, you choose: we host it for a small monthly fee (domain, SSL, updates included), or we hand you the entire codebase and you host it anywhere — Vercel, Netlify, your cousin's basement server, doesn't matter.
            </p>
            <p className="text-[1.05rem] leading-relaxed text-earthy-stone-600">
              Already hosted with us and want to leave later? Domain transfers out, we hand over the repo, no hard feelings.
            </p>
          </Reveal>
        </div>
      </section>

      <CTASection
        label="Ready when you are"
        title="Get a real quote in 24 hours"
        body="Tell us a little about your business — current site, what you sell, what you wish was different — and we'll come back with a price and timeline."
        primary={{ href: "/contact", label: "Get my quote" }}
      />
    </>
  );
}
```

- [ ] **Step 2: Browser verify**

```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3010/pricing
```

Expected: `200`. Then chrome-MCP confirm:
- 3 tier cards render, middle one ("Plus") has the orange border + "Most picked" pill
- All 4 sections (hero, tiers, hosting note, CTA) use earthy tokens
- The note "real pricing logic comes in Plan B" is **not** displayed on the page (it's a plan-internal note, not user-facing)

- [ ] **Step 3: Lint + commit**

```bash
npm run lint
git add src/app/pricing/page.tsx
git commit -m "feat(earthy): pricing visual stub — real tier logic deferred to Plan B"
```

---

## Task 17: Cross-route smoke test + fix any escapees

Now that everything's wired, walk every marketing route and every neighboring route to confirm nothing regressed.

**Files:** none — verification + bugfix only.

- [ ] **Step 1: Smoke-test all marketing routes**

```bash
for path in / /about /contact /pricing; do
  printf "%-12s %s\n" "$path" "$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3010$path)"
done
```

Expected: all `200`.

For each, open in chrome MCP and confirm:
- New header renders (cream, 4-color logo, color strip on top)
- New footer renders (sand, color strip above, 4 columns)
- Page body uses earthy palette (no leftover dark/qyellow/qblack-dark surfaces)

- [ ] **Step 2: Smoke-test neighboring routes — these MUST still render with the legacy header**

```bash
for path in /landman /neo /ideas /domains /mockup/v78-celestia /sites/lake-arthur /dashboard /sign-in; do
  printf "%-30s %s\n" "$path" "$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3010$path)"
done
```

Expected for each:
- `200` (or `307`/`308` for auth-protected pages — Clerk redirects unauthenticated users)
- `/landman`, `/neo`, `/sites/*`, `/dashboard`, `/sign-in` render with **no** header (per LayoutShell opt-out list)
- `/ideas`, `/domains`, `/mockup/*` render with the **legacy dark header** (still using the old Header/Footer because they're not in MARKETING_ROUTES)

- [ ] **Step 3: Run a full build**

```bash
npm run build 2>&1 | tail -50
```

Expected: succeeds. (`typescript.ignoreBuildErrors: true` is still on for the unrelated desert-coyote rename — leave it.) If build fails for an earthy-related reason, fix that file and re-run.

- [ ] **Step 4: Run lint over the whole repo**

```bash
npm run lint
```

Expected: no errors.

- [ ] **Step 5: Commit any bugfixes**

```bash
# only if Step 3 or 4 surfaced an issue and you fixed it
git add -A && git commit -m "fix(earthy): post-rebuild smoke fixes"
```

---

## Task 18: Open PR + cleanup notes

**Files:** none — git/PR only.

- [ ] **Step 1: Push branch**

```bash
git push -u origin feat/earthy-rebuild
```

- [ ] **Step 2: Open the PR**

```bash
gh pr create --title "feat(earthy): rip marketing surface to studs and rebuild in earthy theme" --body "$(cat <<'EOF'
## Summary
- Replaces `/`, `/about`, `/contact`, `/pricing` with the earthy palette + Google-Workspace-style structure adapted from `public/concepts/earthy.html`.
- Adds new theme primitives under `src/components/earthy/` (nav, footer, hero, ribbon, feature card, showcase row, stats, logo cloud, quote card, CTA, button, section label, color strip, browser frame) and three hooks (`use-scroll-reveal`, `use-count-up`, `use-typing-cycle`).
- `LayoutShell` now serves the new chrome on marketing routes; legacy `Header`/`Footer` are kept around for `/ideas`, `/domains`, `/mockup/*` until those routes are migrated or sunset.
- Visual-only pricing stub. Real pricing tiers / Stripe SKUs / hand-off vs hosted product split land in Plan B.

## Out of scope (intentionally)
- `/sites/*`, `/dashboard`, `/landman`, `/neo`, `/projects/touchdesign`, `/mockup/*`, `/ideas`, `/proposal/*`, `/sign-{in,up}`, `/complete-profile`, `/domains` are unchanged.
- Pricing logic, hosting hand-off flow, domain transfer-out, intake pipeline, WYSIWYG editor — all deferred to later plans.
- Old `Header`/`Footer`/`carbon-weave`/`q*` tokens are still in the repo (mockups depend on them). Sweep in a follow-up.

## Test plan
- [ ] `npm run lint` clean
- [ ] `npm run build` succeeds
- [ ] Browser-walk `/`, `/about`, `/contact`, `/pricing` at `localhost:3010` and confirm against `localhost:3010/concepts/earthy.html`
- [ ] Smoke-walk `/landman`, `/neo`, `/ideas`, `/domains`, `/mockup/v78-celestia`, `/sites/lake-arthur`, `/dashboard`, `/sign-in` to confirm no regression
- [ ] Submit the contact form once and confirm `/api/contact` still receives the same wire format

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

- [ ] **Step 3: Capture follow-up tickets in PR description (do NOT do them)**

Add a `## Follow-ups` section to the PR body before merge with these one-liners. Don't do the work in this PR.

- Sunset `src/components/header.tsx` + `src/components/footer.tsx` once `/ideas`, `/domains`, `/mockup/*` migrate (or pick a permanent visual home for them).
- Audit `globals.css` after migration is complete and remove unused `q*` tokens / `carbon-weave` utility / `glass-nav`.
- Unblock `next.config.ts` `typescript.ignoreBuildErrors: true` once the desert-coyote `palette.charcoal → palette.ink` rename completes.

---

## Self-Review

**1. Spec coverage check**

| Spec requirement | Where it's covered |
|---|---|
| Replace marketing surface with earthy theme | Tasks 13–16 |
| Use `public/concepts/earthy.html` as reference | Stated in plan header + verified in Task 13 Step 3 |
| Browser verification | Steps in Tasks 6, 13, 14, 15, 16, 17 use chrome MCP + curl |
| Don't break neighboring routes | Task 17 smoke tests `/sites/*`, `/dashboard`, `/landman`, etc. |
| User said "starts at $500" | Embedded in hero copy (Task 7), home features (Task 13), pricing tiers (Task 16) |
| Hand-off OR hosted | Mentioned in home features (Task 13) + pricing footer (Task 16); real flow → Plan B |
| Domain provided + transfer-out | Mentioned on home + pricing; real flow → Plan C |
| Rebuild from existing site OR from scratch | Hero copy + 2 showcase rows + pricing — Plan D handles real intake |
| Accept docs/PDFs/photos/Facebook | Mentioned in showcase row 2 copy; real intake → Plan D |
| WYSIWYG editor mentioned somewhere | "Edit It Yourself" feature card on home; real editor → Plan E |

**2. Placeholder scan**

No "TBD", no "implement later", no "add appropriate error handling", no "similar to Task N". Every code block is complete. Verification steps name the exact tool, exact URL, exact expected response.

**3. Type consistency**

- `FeatureCardProps` defined in `feature-card.tsx`, consumed verbatim in `feature-grid.tsx` and `page.tsx` ✓
- `StatCardProps` defined in `stat-card.tsx`, consumed via `Omit<StatCardProps, "index">` in `stats-section.tsx` ✓
- `ShowcaseRowProps` consumed exactly as defined ✓
- `BarChartVisual`, `CircleRingVisual` are concrete React components exported from `showcase-row.tsx`, imported in `page.tsx` ✓
- Color enum (`"orange" | "blue" | "amber" | "sage"`) used consistently in `feature-card.tsx`, the `FEATURES` and `VALUES` arrays in pages, and the `ICON_BG` / `TOP_BAR` records ✓

Plan is ready.
