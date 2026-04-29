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

// Photo paths — files don't exist yet. The placeholder gradient component
// inside each section provides the visual stand-in. When real photos drop
// into /public/sites/desert-coyote-landscape/photos/ swap is one paste.
export const photos = {
  hero:    "/sites/desert-coyote-landscape/photos/hero.jpg",
  project01: "/sites/desert-coyote-landscape/photos/project-01.jpg",
  project02: "/sites/desert-coyote-landscape/photos/project-02.jpg",
  project03: "/sites/desert-coyote-landscape/photos/project-03.jpg",
  project04: "/sites/desert-coyote-landscape/photos/project-04.jpg",
} as const;
