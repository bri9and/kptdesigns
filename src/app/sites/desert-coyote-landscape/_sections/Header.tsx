"use client";

import { useEffect, useState } from "react";
import { palette, fonts, z } from "../_lib/tokens";

// Sticky nav for Desert Coyote v2. Logo wordmark left, three text links
// center-right, terracotta phone CTA pill far right. Mobile collapses
// the links into a sheet.

const NAV = [
  { href: "#services",  label: "Services" },
  { href: "#estimates", label: "Estimates" },
  { href: "#contact",   label: "Contact" },
];

const PHONE = "(480) 936-0187";
const PHONE_HREF = "tel:+14809360187";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 8); }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`dc2-header ${scrolled ? "is-scrolled" : ""}`}>
      <a href="#top" className="dc2-header__brand" aria-label="Desert Coyote Landscape — home">
        <span className="dc2-header__brand-word">Desert Coyote</span>
        <span className="dc2-header__brand-sub">Landscape · East Valley AZ</span>
      </a>

      <nav className="dc2-header__nav" aria-label="Primary">
        {NAV.map((item) => (
          <a key={item.href} href={item.href} className="dc2-header__link">
            {item.label}
          </a>
        ))}
      </nav>

      <a href={PHONE_HREF} className="dc2-header__phone" aria-label={`Call ${PHONE}`}>
        {PHONE}
      </a>

      <button
        type="button"
        className="dc2-header__burger"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span /><span /><span />
      </button>

      {open && (
        <div className="dc2-header__sheet" role="dialog" aria-label="Menu">
          <button
            type="button"
            className="dc2-header__sheet-close"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            ×
          </button>
          <ul>
            {NAV.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={() => setOpen(false)}>{item.label}</a>
              </li>
            ))}
            <li>
              <a href={PHONE_HREF} onClick={() => setOpen(false)} className="dc2-header__sheet-phone">
                {PHONE}
              </a>
            </li>
          </ul>
        </div>
      )}

      <style>{css}</style>
    </header>
  );
}

const css = `
.dc2-header {
  position: sticky; top: 0; z-index: ${z.fixed};
  display: flex; align-items: center; gap: 1.5rem;
  padding: 1rem 1.5rem;
  background: rgba(233, 226, 212, 0.86);
  backdrop-filter: saturate(140%) blur(10px);
  -webkit-backdrop-filter: saturate(140%) blur(10px);
  border-bottom: 1px solid transparent;
  transition: border-color 200ms ease, background 200ms ease;
  font-family: ${fonts.body};
}
.dc2-header.is-scrolled {
  background: rgba(233, 226, 212, 0.95);
  border-bottom-color: rgba(27, 26, 23, 0.08);
}
.dc2-header__brand {
  display: flex; flex-direction: column; gap: 0.05rem;
  text-decoration: none; color: ${palette.ink};
  margin-right: auto;
}
.dc2-header__brand-word {
  font-family: ${fonts.display};
  font-weight: 700;
  font-stretch: 80%;
  font-size: 1.55rem;
  letter-spacing: -0.01em;
  line-height: 1;
}
.dc2-header__brand-sub {
  font-family: ${fonts.mono};
  font-size: 0.62rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${palette.dust};
}
.dc2-header__nav {
  display: flex; gap: 1.75rem;
}
.dc2-header__link {
  font-family: ${fonts.mono};
  font-size: 0.72rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${palette.ink};
  text-decoration: none;
  padding: 0.4rem 0;
  border-bottom: 1px solid transparent;
  transition: border-color 160ms ease, color 160ms ease;
}
.dc2-header__link:hover { border-bottom-color: ${palette.terra}; color: ${palette.terra}; }
.dc2-header__link:focus-visible { outline: 2px solid ${palette.terra}; outline-offset: 4px; }
.dc2-header__phone {
  background: ${palette.terra};
  color: ${palette.paper};
  text-decoration: none;
  font-family: ${fonts.display};
  font-weight: 600;
  font-stretch: 85%;
  font-size: 1rem;
  letter-spacing: 0.01em;
  padding: 0.7rem 1.2rem;
  border-radius: 999px;
  transition: transform 160ms ease, box-shadow 160ms ease;
  white-space: nowrap;
}
.dc2-header__phone:hover { transform: translateY(-1px); box-shadow: 0 8px 22px rgba(156, 74, 42, 0.35); }
.dc2-header__phone:focus-visible { outline: 2px solid ${palette.ink}; outline-offset: 3px; }
.dc2-header__burger {
  display: none;
  background: transparent; border: none; cursor: pointer;
  width: 36px; height: 36px;
  flex-direction: column; justify-content: center; gap: 5px;
  padding: 6px;
}
.dc2-header__burger span {
  display: block; height: 2px; width: 100%;
  background: ${palette.ink}; border-radius: 1px;
}
.dc2-header__sheet {
  position: fixed; inset: 0; z-index: ${z.drawer};
  background: ${palette.bg};
  display: flex; flex-direction: column;
  padding: 4rem 2rem 2rem;
}
.dc2-header__sheet-close {
  position: absolute; top: 1rem; right: 1.25rem;
  background: transparent; border: none; font-size: 2rem; line-height: 1;
  color: ${palette.ink}; cursor: pointer;
  font-family: ${fonts.display};
}
.dc2-header__sheet ul {
  list-style: none; padding: 0; margin: 0;
  display: flex; flex-direction: column; gap: 1.25rem;
}
.dc2-header__sheet a {
  font-family: ${fonts.display};
  font-weight: 600;
  font-stretch: 80%;
  font-size: 2rem;
  color: ${palette.ink};
  text-decoration: none;
  letter-spacing: -0.01em;
}
.dc2-header__sheet-phone {
  color: ${palette.terra} !important;
}
@media (max-width: 760px) {
  .dc2-header__nav, .dc2-header__phone { display: none; }
  .dc2-header__burger { display: flex; }
  .dc2-header__brand-word { font-size: 1.3rem; }
  .dc2-header { padding: 0.75rem 1.1rem; }
}
`;
