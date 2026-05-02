/**
 * Building — Asset binder.
 *
 * Reads the composer's puckData, walks every block, and fills any
 * empty image slots with curated assets from findings.curatedAssets.
 *
 * Mapping rule:
 *   - First "hero" asset → CustomerHero.logoSrc (preferred from
 *     findings.logoUrl) and CustomerHero.heroImageSrc.
 *   - "secondary" + "gallery" assets distributed to:
 *       Showcase.imageSrc (one per Showcase block in order)
 *       Features[].imageSrc (one per feature card, in order)
 *
 * If the composer already populated an imageSrc field with a real URL,
 * we leave it. Empty strings and missing fields get filled.
 */
import { publicUrlFor } from "../../customer-storage";
import type { Agent } from "../types";
import type { Findings } from "../../types";
import type { Data as PuckData } from "@measured/puck";

export const bindAgent: Agent = {
  stage: "bind",
  phase: "building",
  label: "Wiring photos into the page",
  dependsOn: ["compose"],

  async run({ findings, report }) {
    const data = findings.puckData;
    if (!data || !Array.isArray(data.content)) {
      await report("No puckData to bind — skipping");
      return {};
    }

    const heroAsset = pickRole(findings, "hero");
    const secondaryAssets = pickAllRole(findings, "secondary");
    const galleryAssets = pickAllRole(findings, "gallery");
    const supportingPool = [...secondaryAssets, ...galleryAssets];

    const logoUrl = findings.logoUrl ?? null;
    const businessName = findings.brandProfile?.businessName ?? null;

    let supportingIdx = 0;
    const nextSupporting = (): string | undefined =>
      supportingIdx < supportingPool.length ? supportingPool[supportingIdx++] : undefined;

    const updated: PuckData = {
      ...data,
      content: data.content.map((block) => {
        const t = block.type;
        const props = { ...block.props } as Record<string, unknown>;
        if (t === "CustomerHero") {
          if (!props.logoSrc && logoUrl) props.logoSrc = logoUrl;
          if (!props.heroImageSrc && heroAsset) props.heroImageSrc = heroAsset;
          if (!props.businessName && businessName) props.businessName = businessName;
        } else if (t === "Showcase") {
          if (!props.imageSrc) {
            const next = nextSupporting();
            if (next) props.imageSrc = next;
          }
        } else if (t === "Features") {
          const features = (props.features as Array<Record<string, unknown>> | undefined) ?? [];
          props.features = features.map((f) => {
            if (f.imageSrc && typeof f.imageSrc === "string" && f.imageSrc.length > 0) return f;
            const next = nextSupporting();
            return next ? { ...f, imageSrc: next } : f;
          });
        }
        return { ...block, props };
      }),
    };

    const filled = countFilledImages(updated);
    await report(`Wired ${filled} image slots`);

    return { puckData: updated };
  },
};

function pickRole(findings: Findings, role: "hero"): string | undefined {
  const items = findings.curatedAssets ?? [];
  const found = items.find((c) => c.role === role);
  if (!found) return undefined;
  return publicUrlFor(found.key) ?? undefined;
}

function pickAllRole(findings: Findings, role: "secondary" | "gallery"): string[] {
  const items = findings.curatedAssets ?? [];
  return items
    .filter((c) => c.role === role)
    .map((c) => publicUrlFor(c.key))
    .filter((u): u is string => !!u);
}

function countFilledImages(data: PuckData): number {
  let n = 0;
  for (const block of data.content) {
    const props = block.props as Record<string, unknown>;
    if (typeof props.heroImageSrc === "string" && props.heroImageSrc) n++;
    if (typeof props.logoSrc === "string" && props.logoSrc) n++;
    if (typeof props.imageSrc === "string" && props.imageSrc) n++;
    if (typeof props.avatarSrc === "string" && props.avatarSrc) n++;
    const features = props.features as Array<Record<string, unknown>> | undefined;
    if (Array.isArray(features)) {
      for (const f of features) {
        if (typeof f.imageSrc === "string" && f.imageSrc) n++;
      }
    }
  }
  return n;
}
