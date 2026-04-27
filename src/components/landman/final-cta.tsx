export default function FinalCta() {
  return (
    <section className="relative overflow-hidden border-t border-cream/10 px-6 py-32 md:px-10 md:py-44">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[680px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-copper/[0.18] blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-copper/[0.25] blur-[80px]"
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <p className="flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-copper">
          <span className="relative inline-flex h-1.5 w-1.5 items-center justify-center">
            <span className="pulse-ring absolute inset-0 rounded-full bg-copper/40" />
            <span className="pulse-dot relative inline-block h-1.5 w-1.5 rounded-full bg-copper" />
          </span>
          Public beta · Appalachian basin
        </p>

        <h2 className="mt-8 font-serif text-[2.5rem] leading-[1.05] tracking-tight md:text-[5rem]">
          Built for the basin,{" "}
          <em className="italic text-copper">one conversation at a time.</em>
        </h2>

        <p className="mx-auto mt-10 max-w-xl text-base leading-relaxed text-cream/70 md:text-lg">
          Voice Landman is in quiet beta across Pennsylvania, Ohio, and West
          Virginia. We listen, we ground every value in real data, and we
          take the work seriously.
        </p>

        <p className="mt-12 font-mono text-[11px] uppercase tracking-[0.22em] text-cream/50">
          Pittsburgh, PA · Appalachian basin · Marcellus and Utica
        </p>
      </div>
    </section>
  );
}
