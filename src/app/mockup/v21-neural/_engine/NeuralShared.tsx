"use client";

/**
 * NeuralShared — palette + sections registry shared across the engine,
 * HUD, visuals, and fallback modules.
 */

import HeroNeural from "../_sections/HeroNeural";
import PhilosophyNeural from "../_sections/PhilosophyNeural";
import StackNeural from "../_sections/StackNeural";
import TelemetryNeural from "../_sections/TelemetryNeural";
import PortfolioNeural from "../_sections/PortfolioNeural";
import ProcessNeural from "../_sections/ProcessNeural";
import FaqNeural from "../_sections/FaqNeural";
import CtaNeural from "../_sections/CtaNeural";

export const NEURAL_PALETTE = {
  void: "#02030A",
  latent: "#8B5CF6",
  cyan: "#00E5FF",
  pink: "#FF0080",
  amber: "#FFB000",
  text: "#F1F5FF",
  grey: "#9BA3C7",
  edgeDim: "rgba(139,92,246,0.18)",
};

export type Section = {
  id: string;
  name: string;
  layer: string;
  activation: string;
  Component: React.ComponentType;
};

export const SECTIONS: Section[] = [
  { id: "hero",       name: "INFERENCE",  layer: "INPUT", activation: "0.99", Component: HeroNeural },
  { id: "philosophy", name: "PHILOSOPHY", layer: "L00",   activation: "0.71", Component: PhilosophyNeural },
  { id: "stack",      name: "STACK",      layer: "L01",   activation: "0.84", Component: StackNeural },
  { id: "telemetry",  name: "TELEMETRY",  layer: "L02",   activation: "0.92", Component: TelemetryNeural },
  { id: "portfolio",  name: "PORTFOLIO",  layer: "L03",   activation: "0.78", Component: PortfolioNeural },
  { id: "process",    name: "PROCESS",    layer: "L04",   activation: "0.66", Component: ProcessNeural },
  { id: "faq",        name: "QUERIES",    layer: "L05",   activation: "0.58", Component: FaqNeural },
  { id: "cta",        name: "OUTPUT",     layer: "OUT",   activation: "1.00", Component: CtaNeural },
];
