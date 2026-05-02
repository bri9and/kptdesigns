/**
 * Pipeline runner — orchestrates the three-phase flow:
 *
 *   discovery (parallel agents) → synthesis (sequential) → building (parallel)
 *
 * Each agent owns one StageId. The runner:
 *   1. Initializes every stage to "pending" on the IntakeJob.
 *   2. Runs phase 1's agents in parallel; updates each stage to running →
 *      done|failed; merges each agent's findings into the job record.
 *   3. Runs phase 2's agents sequentially with the accumulated findings.
 *   4. Runs phase 3's agents in parallel.
 *   5. Marks the whole job ready (or failed) at the end.
 *
 * Errors don't kill the pipeline. A discovery agent that fails (e.g.
 * Facebook scrape blocked) is allowed to leave its stage `failed` while
 * the rest continues with whatever it does have.
 *
 * For now the runner runs in-process (good enough for a single-tenant
 * dev demo + small Vercel function calls). When we have multiple
 * concurrent customers we'll move agents to Vercel Sandbox / Queues.
 */
import { readIntakeJob, updateIntakeJob, type IntakeJob } from "@/lib/intake-store";
import type { Findings, Phase, StageId, StageMap, StageStatus } from "./types";
import { allAgents, AGENTS_BY_PHASE, type Agent } from "./agents";

const ALL_STAGES: StageId[] = allAgents.map((a) => a.stage);

export type RunOptions = {
  /** When true, runs the pipeline synchronously and resolves with the
   *  finished job. When false (default), kicks off in the background
   *  and returns immediately. */
  awaitCompletion?: boolean;
};

export async function runPipeline(jobId: string, opts: RunOptions = {}): Promise<void> {
  const job = await readIntakeJob(jobId);
  if (!job) throw new Error(`Intake job not found: ${jobId}`);

  // Initialize stages
  await updateIntakeJob(jobId, {
    status: "running",
    phase: "discovery",
    stages: Object.fromEntries(
      ALL_STAGES.map((id) => [id, { state: "pending" } as StageStatus]),
    ) as StageMap,
    findings: job.findings ?? {},
  });

  if (opts.awaitCompletion) {
    await runPhases(jobId);
  } else {
    // Fire and forget. In Vercel we'd wrap with `waitUntil` from
    // @vercel/functions; here we let the JS event loop keep it alive
    // until the route handler's response has flushed.
    void runPhases(jobId).catch(async (err) => {
      const msg = err instanceof Error ? err.message : String(err);
      await updateIntakeJob(jobId, {
        status: "failed",
        phase: "failed",
        error: msg,
      });
    });
  }
}

async function runPhases(jobId: string): Promise<void> {
  await runPhase(jobId, "discovery");
  await readJobOrThrow(jobId).then((j) => assertNotFailed(j));

  await updateIntakeJob(jobId, { phase: "synthesis" });
  await runPhase(jobId, "synthesis");
  await readJobOrThrow(jobId).then((j) => assertNotFailed(j));

  await updateIntakeJob(jobId, { phase: "building" });
  await runPhase(jobId, "building");

  const final = await readJobOrThrow(jobId);
  // Pipeline succeeds even if some non-critical stages failed — as long
  // as we have a puckData to render, the customer sees a preview.
  if (final.findings?.puckData) {
    await updateIntakeJob(jobId, {
      status: "ready",
      phase: "ready",
      puck_data: final.findings.puckData,
      business_summary: final.findings.brandProfile?.oneLiner ?? null,
    });
  } else {
    await updateIntakeJob(jobId, {
      status: "failed",
      phase: "failed",
      error: "Building phase produced no puckData",
    });
  }
}

async function runPhase(jobId: string, phase: Phase): Promise<void> {
  const agents = AGENTS_BY_PHASE[phase] ?? [];
  if (agents.length === 0) return;

  // Discovery + building run agents in parallel. Synthesis runs sequentially
  // because each step depends on the previous one's output.
  const parallel = phase !== "synthesis";

  if (parallel) {
    await Promise.all(agents.map((a) => runAgent(jobId, a)));
  } else {
    for (const a of agents) await runAgent(jobId, a);
  }
}

async function runAgent(jobId: string, agent: Agent): Promise<void> {
  const startedAt = new Date().toISOString();
  await patchStage(jobId, agent.stage, { state: "running", startedAt });

  try {
    const job = await readJobOrThrow(jobId);
    const result = await agent.run({
      input: {
        sourceUrl: job.source_url ?? null,
        businessName: job.business_name ?? null,
        notes: job.notes ?? null,
      },
      findings: job.findings ?? {},
      report: (note) => patchStage(jobId, agent.stage, { note }),
    });
    // Merge findings shallowly. Agents are responsible for not stomping
    // each other's keys.
    const job2 = await readJobOrThrow(jobId);
    await updateIntakeJob(jobId, {
      findings: { ...(job2.findings ?? {}), ...result },
    });
    await patchStage(jobId, agent.stage, {
      state: "done",
      finishedAt: new Date().toISOString(),
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    await patchStage(jobId, agent.stage, {
      state: "failed",
      finishedAt: new Date().toISOString(),
      error: msg,
    });
  }
}

async function patchStage(
  jobId: string,
  stage: StageId,
  patch: Partial<StageStatus>,
): Promise<void> {
  const job = await readIntakeJob(jobId);
  if (!job) return;
  const stages: StageMap = { ...(job.stages ?? {}) };
  stages[stage] = { ...(stages[stage] ?? { state: "pending" }), ...patch };
  await updateIntakeJob(jobId, { stages });
}

async function readJobOrThrow(jobId: string): Promise<IntakeJob> {
  const j = await readIntakeJob(jobId);
  if (!j) throw new Error(`Intake job vanished mid-pipeline: ${jobId}`);
  return j;
}

function assertNotFailed(job: IntakeJob): void {
  if (job.status === "failed") {
    throw new Error(job.error ?? "Pipeline marked failed by an agent");
  }
}

/** Aggregate phase progress as a 0..1 fraction. */
export function phaseProgress(stages: StageMap | undefined): number {
  if (!stages) return 0;
  const states = Object.values(stages);
  if (states.length === 0) return 0;
  const done = states.filter((s) => s.state === "done" || s.state === "skipped").length;
  return done / states.length;
}
