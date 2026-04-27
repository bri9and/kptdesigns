import { SITE } from "@/lib/landman";

export default function SiteFooter() {
  return (
    <footer className="border-t border-cream/10 px-6 py-12 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.22em] text-cream/55 md:flex-row md:items-center">
        <p>© 2026 {SITE.brand}</p>
        <p>
          {SITE.region} · {SITE.city}
        </p>
        <a
          href={`mailto:${SITE.email}`}
          className="transition-colors hover:text-copper"
        >
          {SITE.email}
        </a>
      </div>
    </footer>
  );
}
