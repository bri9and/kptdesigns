type QuoteCardProps = {
  quote: string;
  author: string;
  meta: string;
  initials: string;
};

export function QuoteCard({ quote, author, meta, initials }: QuoteCardProps) {
  return (
    <section className="bg-earthy-cream py-25 text-center">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative mx-auto max-w-[700px] rounded-3xl bg-earthy-sand p-12">
          <span
            aria-hidden
            className="pointer-events-none absolute left-8 top-4 font-[Georgia,serif] text-[5rem] leading-none text-earthy-orange-light"
          >
            &ldquo;
          </span>

          <p className="mb-6 font-[family-name:var(--font-earthy-display)] text-[1.35rem] font-normal leading-[1.6] text-earthy-ink">
            {quote}
          </p>

          <div className="flex items-center justify-center gap-3.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-earthy-orange to-earthy-sage font-[family-name:var(--font-earthy-display)] text-[18px] font-semibold text-earthy-cream">
              {initials}
            </div>
            <div className="text-left">
              <strong className="block font-[family-name:var(--font-earthy-display)] text-sm text-earthy-ink">
                {author}
              </strong>
              <span className="text-xs text-earthy-stone-500">{meta}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
