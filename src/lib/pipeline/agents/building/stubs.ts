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

export const criticStubAgent = stub(
  "critic",
  "building",
  "Reviewing the draft",
  "Critic agent — second AI pass that compares the draft to the brand profile and rejects drift. Stub for now.",
);

export const bindStubAgent = stub(
  "bind",
  "building",
  "Wiring assets",
  "Asset binder — moves curated images into the right Puck blocks. Stub for now.",
);
