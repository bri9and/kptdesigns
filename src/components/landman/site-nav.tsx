import { PHONE_TEL, SITE } from "@/lib/landman";

function BrandMark() {
  return (
    <svg
      aria-hidden="true"
      width="22"
      height="22"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="16" cy="16" r="14" stroke="#c8602c" strokeWidth="1" />
      <circle cx="16" cy="16" r="9" stroke="#c8602c" strokeWidth="1" strokeOpacity="0.55" />
      <circle cx="16" cy="16" r="3.4" fill="#c8602c" />
    </svg>
  );
}

const NAV_LINKS = [
  { label: "How it works", href: "#how-it-works" },
  { label: "For owners", href: "#owners" },
  { label: "For buyers", href: "#buyers" },
];

export default function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-cream/5 bg-ink/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-10">
        <a href="#top" className="flex items-center gap-3">
          <BrandMark />
          <span className="font-serif text-lg leading-none tracking-tight">
            {SITE.brandShort}
          </span>
          <span className="ml-1 hidden font-mono text-[10px] uppercase tracking-[0.22em] text-cream/45 sm:inline">
            / {SITE.product}
          </span>
        </a>

        <nav className="flex items-center gap-5 md:gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hidden font-mono text-[11px] uppercase tracking-[0.22em] text-cream/65 transition-colors hover:text-copper sm:inline"
            >
              {link.label}
            </a>
          ))}
          <a
            href={`tel:${PHONE_TEL}`}
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-copper transition-colors hover:text-cream"
          >
            Call →
          </a>
        </nav>
      </div>
    </header>
  );
}
