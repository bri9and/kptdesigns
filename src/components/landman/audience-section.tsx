import SectionHeader from "./section-header";

type Card = {
  id: string;
  tag: string;
  headline: string;
  paragraph: string;
  bullets: string[];
};

const CARDS: Card[] = [
  {
    id: "owners",
    tag: "For mineral owners",
    headline: "Get a real number, not a postcard.",
    paragraph:
      "If you've been getting offer letters, or you're wondering what your tract is actually worth, the agent will walk you through a short conversation. We come back with a grounded value, usually within one business day.",
    bullets: [
      "No fees, no obligation, no pressure",
      "Surface plus mineral, or mineral only",
      "Coverage in Pennsylvania, Ohio, West Virginia",
      "You stay in control of the lease",
    ],
  },
  {
    id: "buyers",
    tag: "For active buyers",
    headline: "First call to first offer in a day.",
    paragraph:
      "We screen, qualify, and structure intake on every call. If a tract fits your buy box, we route it warm with the data already attached. No more chasing voicemails or paying for cold lists.",
    bullets: [
      "Pre-qualified leads with structured intake",
      "Filter by county, play, operator, acreage",
      "Comp data attached to every record",
      "Pay only on closed deals",
    ],
  },
];

export default function AudienceSection() {
  return (
    <section className="relative border-t border-cream/10 px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          number="03"
          eyebrow="Two sides of the same call"
          title={
            <>
              Two sides of the call,{" "}
              <em className="italic text-copper">one set of numbers.</em>
            </>
          }
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {CARDS.map((card) => (
            <article
              key={card.id}
              id={card.id}
              className="group relative flex scroll-mt-28 flex-col gap-6 overflow-hidden rounded-xl border border-cream/12 bg-cream/[0.025] p-8 transition-[border-color,background-color,transform] duration-300 hover:-translate-y-0.5 hover:border-copper/45 hover:bg-cream/[0.04] md:p-10"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-copper/30 to-transparent opacity-50 transition-opacity duration-300 group-hover:opacity-100" />

              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-copper">
                {card.tag}
              </span>
              <h3 className="font-serif text-3xl leading-[1.08] tracking-tight md:text-4xl">
                {card.headline}
              </h3>
              <p className="text-sm leading-relaxed text-cream/75 md:text-base">
                {card.paragraph}
              </p>
              <ul className="mt-2 flex flex-col gap-3 border-t border-cream/10 pt-6">
                {card.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-3 text-sm text-cream/80"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 inline-block h-px w-4 shrink-0 bg-copper"
                    />
                    {bullet}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
