// Visual tokens for Lake Arthur Field Guide. Imported anywhere palette / type
// is needed so changes propagate from one place. Kept minimal — most styling
// remains inline per catalog convention.

export const fonts = {
  display: '"Playfair Display", "Iowan Old Style", Georgia, serif',
  body: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
  mono: '"JetBrains Mono", "SF Mono", Menlo, monospace',
};

export const palette = {
  water:        "#0E2A3F",
  waterDeep:    "#08182A",
  fairway:      "#2C5530",
  fairwayDeep:  "#1A3A1F",
  cream:        "#F4EFDF",
  paper:        "#FBF8F0",
  dawn:         "#C9A96E",
  charcoal:     "#1A1A1A",
  smoke:        "#2A2A2A",
  fog:          "#E8E2CE",
  white:        "#FFFFFF",
} as const;

export const easing = {
  editorial: "cubic-bezier(0.22, 0.96, 0.32, 1)",
  swift: "cubic-bezier(0.4, 0, 0.2, 1)",
  curtain: "cubic-bezier(0.6, 0, 0.4, 1)",
};

export const z = {
  base: 0,
  hover: 10,
  fixed: 30,
  drawer: 50,
  intro: 70,
  toast: 80,
};
