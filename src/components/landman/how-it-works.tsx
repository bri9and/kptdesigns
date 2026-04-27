import SectionHeader from "./section-header";

const STEPS = [
  {
    number: "01",
    label: "Call",
    title: "The agent picks up.",
    body: "Warm, plainspoken, never a script. Collects name, county, acreage, lease status, and the reason for the call. One question at a time.",
  },
  {
    number: "02",
    label: "Enrich",
    title: "Cross-reference, in real time.",
    body: "Behind the conversation, we pull state DEP filings, county records, operator data, and recent royalty activity to ground every value.",
  },
  {
    number: "03",
    label: "Value",
    title: "A range, not a guess.",
    body: "Built from a comp model trained on closed transactions in the same play, county, and operator footprint. Honest about uncertainty.",
  },
  {
    number: "04",
    label: "Match",
    title: "Route to the right buyer.",
    body: "If the tract fits an active buy box, we route warm with the data attached. Prioritized by check size, basin focus, and current pipeline.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative border-t border-cream/10 px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          number="02"
          eyebrow="How it works"
          title={
            <>
              One conversation,{" "}
              <em className="italic text-copper">four moving parts.</em>
            </>
          }
        />

        <ol className="mt-16 divide-y divide-cream/10 border-y border-cream/10">
          {STEPS.map((step) => (
            <li
              key={step.number}
              className="group grid grid-cols-[64px_1fr] gap-6 py-8 transition-colors duration-300 hover:bg-cream/[0.02] md:grid-cols-[120px_minmax(0,260px)_1fr] md:gap-10 md:py-10"
            >
              <span className="font-mono text-xl text-copper md:text-2xl">
                {step.number}
              </span>
              <h3 className="font-serif text-2xl leading-tight md:col-start-2 md:text-3xl">
                <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-cream/45">
                  {step.label}
                </span>
                <span className="mt-2 block">{step.title}</span>
              </h3>
              <p className="col-span-2 max-w-xl text-sm leading-relaxed text-cream/70 md:col-span-1 md:col-start-3 md:text-base">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
