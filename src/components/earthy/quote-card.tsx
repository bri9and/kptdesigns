type QuoteCardProps = {
  quote: string;
  author: string;
  meta: string;
  initials: string;
  /** Optional photo of the customer who gave the testimonial. */
  avatarSrc?: string;
};

export function QuoteCard({ quote, author, meta, initials, avatarSrc }: QuoteCardProps) {
  return (
    <section className="bg-brand-canvas py-25 text-center">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative mx-auto max-w-[700px] rounded-3xl bg-brand-surface p-12">
          <span
            aria-hidden
            className="pointer-events-none absolute left-8 top-4 font-[Georgia,serif] text-[5rem] leading-none text-brand-primary-soft"
          >
            &ldquo;
          </span>

          <p className="mb-6 font-[family-name:var(--brand-display-font)] text-[1.35rem] font-normal leading-[1.6] text-brand-ink">
            {quote}
          </p>

          <div className="flex items-center justify-center gap-3.5">
            {avatarSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={avatarSrc}
                alt={author}
                className="h-12 w-12 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-primary to-brand-accent-3 font-[family-name:var(--brand-display-font)] text-[18px] font-semibold text-brand-canvas">
                {initials}
              </div>
            )}
            <div className="text-left">
              <strong className="block font-[family-name:var(--brand-display-font)] text-sm text-brand-ink">
                {author}
              </strong>
              <span className="text-xs text-brand-text-strong">{meta}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
