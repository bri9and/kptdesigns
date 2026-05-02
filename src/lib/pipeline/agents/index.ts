/**
 * Agent registry. The runner reads from this to know what to call,
 * in what phase, in what order.
 *
 * Order within a phase matters only for synthesis (sequential). For
 * discovery and building, agents run in parallel.
 */
import type { Agent } from "./types";
import type { Phase } from "../types";

import { crawlerAgent } from "./discovery/crawler";
import { logoAgent } from "./discovery/logo";
import { voiceAgent } from "./discovery/voice";
import {
  assetsStubAgent,
  paletteStubAgent,
  stackStubAgent,
  socialStubAgent,
  domainStubAgent,
} from "./discovery/stubs";

import { brandProfileAgent } from "./synthesis/brand-profile";
import {
  sitePlanStubAgent,
  contentNormalizeStubAgent,
  assetCurateStubAgent,
} from "./synthesis/stubs";

import { themeAgent } from "./building/theme";
import { composeAgent } from "./building/compose";
import { criticStubAgent, bindStubAgent } from "./building/stubs";

/**
 * IMPORTANT — `crawl` must be the only agent in discovery that runs
 * synchronously before the others, because logo / voice / stack / etc.
 * read findings.pages. For now we let everything race because the
 * other agents read input.sourceUrl directly when possible, and skip
 * gracefully if pages is empty.
 *
 * The cleanest fix is a per-agent `dependsOn` field — TODO once we
 * have more agents that consume findings from same-phase peers.
 */
export const allAgents: Agent[] = [
  // discovery
  crawlerAgent,
  logoAgent,
  voiceAgent,
  assetsStubAgent,
  paletteStubAgent,
  stackStubAgent,
  socialStubAgent,
  domainStubAgent,
  // synthesis
  brandProfileAgent,
  sitePlanStubAgent,
  contentNormalizeStubAgent,
  assetCurateStubAgent,
  // building
  themeAgent,
  composeAgent,
  criticStubAgent,
  bindStubAgent,
];

export const AGENTS_BY_PHASE: Record<Phase, Agent[]> = {
  discovery: allAgents.filter((a) => a.phase === "discovery"),
  synthesis: allAgents.filter((a) => a.phase === "synthesis"),
  building: allAgents.filter((a) => a.phase === "building"),
  ready: [],
  failed: [],
};

export type { Agent };
