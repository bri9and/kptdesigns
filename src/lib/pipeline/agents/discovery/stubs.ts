/**
 * Discovery — stub agents for stages we haven't fully built yet.
 * Each marks itself as "skipped" by returning an empty patch and
 * reporting a note. The pipeline then continues without them.
 *
 * Replace these with real implementations as they get built. Until
 * then, the synthesizer + builder gracefully degrade when the
 * corresponding finding is absent.
 */
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

export const stackStubAgent = stub(
  "stack",
  "discovery",
  "Detecting their tech stack",
);

export const socialStubAgent = stub(
  "social",
  "discovery",
  "Finding their social pages",
);

export const domainStubAgent = stub("domain", "discovery", "Looking up the domain");
