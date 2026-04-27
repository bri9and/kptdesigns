import SectionHeader from "./section-header";

const ITEMS = [
  {
    tag: "Voicemail",
    title: "The first call gets a recording.",
    body: "Most intake lines miss the moment a mineral owner is finally ready to talk. They hang up. The next caller wins.",
  },
  {
    tag: "Cold leads",
    title: "Follow-up arrives days late.",
    body: "By the time a real landman calls back, the offer letter is in the trash and another buyer has already quoted a number.",
  },
  {
    tag: "Scattered records",
    title: "The data lives in ten places.",
    body: "DEP filings, county deeds, royalty statements, operator data. Building a real picture of one tract takes hours of human research.",
  },
];

export default function ProblemSection() {
  return (
    <section className="relative border-t border-cream/10 px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          number="01"
          eyebrow="The opportunity"
          title={
            <>
              The first call is{" "}
              <em className="italic text-copper">where deals are won.</em>
            </>
          }
        />

        <div className="mt-16 grid gap-px overflow-hidden rounded-xl border border-cream/10 bg-cream/[0.04] md:grid-cols-3">
          {ITEMS.map((item) => (
            <article
              key={item.title}
              className="group flex flex-col gap-5 bg-ink/95 p-8 transition-colors duration-300 hover:bg-ink-2 md:p-10"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-copper">
                {item.tag}
              </span>
              <h3 className="font-serif text-2xl leading-tight md:text-3xl">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-cream/70 md:text-base">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
