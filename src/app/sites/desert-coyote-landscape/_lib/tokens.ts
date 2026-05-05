// Visual tokens for Desert Coyote v2 — concrete + dust aesthetic.
// Working-class warmth, not Sonoran field-guide editorial. Big block
// headlines, terracotta signal accent used SPARINGLY.

export const fonts = {
  display:
    '"DM Serif Display", "Iowan Old Style", "Hoefler Text", Georgia, serif',
  body:
    '"Inter Tight", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
  mono: '"JetBrains Mono", "SF Mono", Menlo, monospace',
};

export const palette = {
  bg:      "#E9E2D4", // concrete cream
  bgDeep:  "#D8CFB9", // sand shadow
  ink:     "#1B1A17", // deep charcoal
  terra:   "#9C4A2A", // signal terracotta — sparingly
  clay:    "#C68B4E", // warm tan, secondary accent
  dust:    "#7A7569", // muted brown-grey for captions
  paper:   "#F4EFE3", // elevated surface
  dark:    "#101012", // footer / inverted sections
  white:   "#FFFFFF",

  // Legacy aliases — the proposal chrome (AnnotationRail, BeforeAfter,
  // Intro, ScopeDrawer) was written against v1 token names. Mapping to
  // the v2 palette keeps the chrome rendering without rewriting it.
  charcoal:  "#1B1A17", // → ink
  saguaro:   "#3A4A36", // → muted desert green stand-in
  rock:      "#3F352D", // → dark earth
  sand:      "#E9E2D4", // → bg
  sandDeep:  "#D8CFB9", // → bgDeep
  sunGold:   "#C68B4E", // → clay
  sage:      "#7C8C6B", // → sage stand-in
  sky:       "#6E8FA8", // → desert sky stand-in
  terraDeep: "#7A3E28", // → deeper terra
} as const;

export const easing = {
  editorial: "cubic-bezier(0.22, 0.96, 0.32, 1)",
  swift: "cubic-bezier(0.4, 0, 0.2, 1)",
};

export const z = {
  base: 0,
  hover: 10,
  fixed: 30,
  drawer: 50,
  intro: 70,
};

// Real photos pulled from desertcoyotelandscape.com — their actual project
// shots, before/after composite, Iron Bull trailer, and logos.
const ROOT = "/sites/desert-coyote-landscape/photos";
export const photos = {
  hero:           `${ROOT}/project-02.png`,
  project02:      `${ROOT}/project-02.png`,
  project03:      `${ROOT}/project-03.png`,
  project04:      `${ROOT}/project-04.png`,
  project05:      `${ROOT}/project-05.jpg`,
  project06:      `${ROOT}/project-06.png`,
  project07:      `${ROOT}/project-07.png`,
  project08:      `${ROOT}/project-08.png`,
  beforeAfter:    `${ROOT}/project-before-after.png`,
  trailer1:       `${ROOT}/trailer-1.jpg`,
  trailer2:       `${ROOT}/trailer-2.jpg`,
  trailer3:       `${ROOT}/trailer-3.jpg`,
  trailerLogo:    `${ROOT}/trailer-logo.jpg`,
  logo:           `${ROOT}/logo.png`,
} as const;
