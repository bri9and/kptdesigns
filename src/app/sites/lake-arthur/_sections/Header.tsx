"use client";

import { useEffect, useState } from "react";
import { meta, navLinks } from "../_lib/content";
import { palette, fonts } from "../_lib/tokens";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 32);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`la-hd${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`}>
      <a href="#hero" className="la-hd__brand" aria-label="Lake Arthur Golf Club">
        <span className="la-hd__brand-mark">{meta.short ?? "Lake Arthur"}</span>
        <span className="la-hd__brand-sub">Golf Club · Butler, PA</span>
      </a>
      <nav className="la-hd__nav" aria-label="Primary">
        {navLinks.map((l) => (
          <a key={l.href} href={l.href} className="la-hd__link">{l.label}</a>
        ))}
      </nav>
      <div className="la-hd__cta">
        <a href={`tel:${meta.phone.value.replace(/\D/g, "")}`} className="la-hd__phone">{meta.phone.value}</a>
        <a href="#book" className="la-hd__book">Book a tee time</a>
      </div>
      <button
        type="button"
        className="la-hd__toggle"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="Open navigation"
      >
        <span /><span /><span />
      </button>
      {open && (
        <div className="la-hd__sheet" role="dialog" aria-label="Mobile navigation">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="la-hd__sheet-link">{l.label}</a>
          ))}
          <a href="#book" onClick={() => setOpen(false)} className="la-hd__sheet-cta">Book a tee time →</a>
        </div>
      )}
      <style>{css}</style>
    </header>
  );
}

const css = `
.la-hd {
  position: sticky; top: 0; z-index: 30;
  display: grid; grid-template-columns: auto 1fr auto auto; align-items: center; gap: 2rem;
  padding: 1.1rem 2.5rem;
  background: rgba(242,235,219,0.0);
  backdrop-filter: blur(0px);
  transition: background 240ms ease, backdrop-filter 240ms ease, padding 240ms ease, border-color 240ms ease;
  border-bottom: 1px solid transparent;
  font-family: ${fonts.body};
  color: ${palette.ink};
}
.la-hd.is-scrolled {
  background: ${palette.paper};
  border-bottom-color: rgba(22,20,15,0.08);
  padding: 0.7rem 2.5rem;
}
.la-hd__brand { display: flex; flex-direction: column; align-items: flex-start; text-decoration: none; color: inherit; gap: 1px; }
.la-hd__brand-mark { font-family: ${fonts.display}; font-weight: 500; font-size: 1.45rem; letter-spacing: -0.01em; line-height: 1; }
.la-hd__brand-sub { font-family: ${fonts.mono}; font-size: 0.62rem; letter-spacing: 0.22em; text-transform: uppercase; color: ${palette.ash}; }
.la-hd__nav { display: flex; gap: 2rem; justify-content: center; }
.la-hd__link {
  font-family: ${fonts.mono}; font-size: 0.7rem; letter-spacing: 0.22em; text-transform: uppercase;
  color: ${palette.ink}; text-decoration: none; padding: 0.5rem 0;
  border-bottom: 1px solid transparent; transition: border-color 180ms, color 180ms;
}
.la-hd__link:hover, .la-hd__link:focus-visible { border-bottom-color: ${palette.brick}; color: ${palette.moss}; outline: none; }
.la-hd__cta { display: flex; align-items: center; gap: 1rem; }
.la-hd__phone { font-family: ${fonts.mono}; font-size: 0.78rem; letter-spacing: 0.08em; color: ${palette.moss}; text-decoration: none; }
.la-hd__phone:hover { color: ${palette.ink}; }
.la-hd__book {
  font-family: ${fonts.mono}; font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase;
  color: ${palette.bone}; background: ${palette.moss}; padding: 0.7rem 1.15rem; border-radius: 999px;
  text-decoration: none; transition: background 180ms, transform 180ms;
}
.la-hd__book:hover { background: ${palette.mossDeep}; transform: translateY(-1px); }
.la-hd__book:focus-visible { outline: 2px solid ${palette.brick}; outline-offset: 2px; }
.la-hd__toggle { display: none; background: transparent; border: none; padding: 0.5rem; cursor: pointer; flex-direction: column; gap: 4px; }
.la-hd__toggle span { display: block; width: 22px; height: 1.5px; background: ${palette.ink}; transition: transform 200ms, opacity 200ms; }
.la-hd.is-open .la-hd__toggle span:nth-child(1) { transform: translateY(5.5px) rotate(45deg); }
.la-hd.is-open .la-hd__toggle span:nth-child(2) { opacity: 0; }
.la-hd.is-open .la-hd__toggle span:nth-child(3) { transform: translateY(-5.5px) rotate(-45deg); }
.la-hd__sheet { position: absolute; top: 100%; left: 0; right: 0; background: ${palette.paper}; padding: 1.5rem; display: flex; flex-direction: column; gap: 0.4rem; border-bottom: 1px solid rgba(22,20,15,0.1); }
.la-hd__sheet-link, .la-hd__sheet-cta { font-family: ${fonts.mono}; font-size: 0.85rem; letter-spacing: 0.2em; text-transform: uppercase; color: ${palette.ink}; text-decoration: none; padding: 0.75rem 0; border-bottom: 1px solid rgba(22,20,15,0.06); }
.la-hd__sheet-cta { color: ${palette.moss}; border-bottom: none; padding-top: 1rem; }
@media (prefers-reduced-motion: reduce) { .la-hd, .la-hd__link, .la-hd__book, .la-hd__toggle span { transition: none; } }
@media (max-width: 920px) {
  .la-hd { grid-template-columns: 1fr auto; padding: 0.85rem 1.25rem; gap: 1rem; }
  .la-hd__nav { display: none; }
  .la-hd__cta { display: none; }
  .la-hd__toggle { display: flex; }
}
`;
