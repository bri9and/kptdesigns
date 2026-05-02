/**
 * Agent registry. The runner reads from this to know what to call,
 * in what phase, and (for parallel phases) what intra-phase deps to
 * respect.
 */
import type { Agent } from "./types";
import type { Phase } from "../types";

import { crawlerAgent } from "./discovery/crawler";
import { logoAgent } from "./discovery/logo";
import { assetsAgent } from "./discovery/assets";
import { paletteAgent } from "./discovery/palette";
import { voiceAgent } from "./discovery/voice";
import {
  stackStubAgent,
  socialStubAgent,
  domainStubAgent,
} from "./discovery/stubs";

import { brandProfileAgent } from "./synthesis/brand-profile";
import { assetCurateAgent } from "./synthesis/asset-curate";
import {
  sitePlanStubAgent,
  contentNormalizeStubAgent,
} from "./synthesis/stubs";

import { freeformAgent } from "./building/freeform";
// Legacy templated agents — code retained but not registered. The
// freeform agent is the active building path; these may come back if/
// when we reintroduce a structured-block editor.
// import { themeAgent } from "./building/theme";
// import { composeAgent } from "./building/compose";
// import { bindAgent } from "./building/bind";
// import { criticStubAgent } from "./building/stubs";

export const allAgents: Agent[] = [
  // discovery
  crawlerAgent,
  logoAgent,
  assetsAgent,
  paletteAgent,
  voiceAgent,
  stackStubAgent,
  socialStubAgent,
  domainStubAgent,
  // synthesis
  brandProfileAgent,
  assetCurateAgent,
  sitePlanStubAgent,
  contentNormalizeStubAgent,
  // building (freeform — one agent, one bespoke HTML page per customer)
  freeformAgent,
];

export const AGENTS_BY_PHASE: Record<Phase, Agent[]> = {
  discovery: allAgents.filter((a) => a.phase === "discovery"),
  synthesis: allAgents.filter((a) => a.phase === "synthesis"),
  building: allAgents.filter((a) => a.phase === "building"),
  ready: [],
  failed: [],
};

export type { Agent };
