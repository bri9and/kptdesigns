import type { Agent } from "../types";

const stub = (
  stage: Agent["stage"],
  phase: Agent["phase"],
  label: string,
  reason = "Not implemented yet — stage skipped",
): Agent => ({
  stage,
  phase,
  label,
  async run({ report }) {
    await report(reason);
    return {};
  },
});

export const sitePlanStubAgent = stub(
  "site-plan",
  "synthesis",
  "Planning the site",
  "Site planner — uses brand profile + crawled pages to decide page list. Stub for now.",
);

export const contentNormalizeStubAgent = stub(
  "content-normalize",
  "synthesis",
  "Normalizing content",
);
