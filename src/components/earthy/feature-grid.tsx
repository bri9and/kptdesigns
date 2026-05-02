import { FeatureCard, type FeatureCardProps } from "@/components/earthy/feature-card";
import { Reveal } from "@/components/earthy/reveal";

type FeatureGridProps = {
  features: FeatureCardProps[];
};

export function FeatureGrid({ features }: FeatureGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {features.map((feature, index) => {
        const stagger = ((index % 3) + 1) as 1 | 2 | 3;
        return (
          <Reveal key={`${feature.title}-${index}`} stagger={stagger}>
            <FeatureCard {...feature} />
          </Reveal>
        );
      })}
    </div>
  );
}
