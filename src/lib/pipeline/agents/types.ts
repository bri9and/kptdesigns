/**
 * Agent contract — every pipeline agent implements this single interface.
 * Owns one StageId. Receives the user's intake input + the current
 * findings accumulator. Returns a partial Findings patch that the runner
 * merges back into the job record.
 */
import type { Findings, Phase, StageId } from "../types";

export type AgentInput = {
  sourceUrl: string | null;
  businessName: string | null;
  notes: string | null;
};

export type AgentContext = {
  input: AgentInput;
  /** A snapshot of findings so far. Already-finished agents in earlier phases
   *  have populated this; concurrent peers in the same phase have NOT (the
   *  runner merges in parallel after each agent returns). */
  findings: Findings;
  /** Push a human-readable progress note. The UI shows this verbatim:
   *  "Crawling page 4 of 12…" */
  report: (note: string) => Promise<void>;
};

export type Agent = {
  stage: StageId;
  phase: Phase;
  /** Short human label for the UI: "Crawling site" */
  label: string;
  /** Returns a partial Findings patch. Throw to mark the stage failed. */
  run: (ctx: AgentContext) => Promise<Partial<Findings>>;
};
