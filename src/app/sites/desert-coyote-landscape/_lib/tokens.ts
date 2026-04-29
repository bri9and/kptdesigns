// Visual tokens for Desert Coyote — Sonoran Field Guide aesthetic.
// Sand / terra / sage / rock / sky palette evokes East Valley desert.

export const fonts = {
  display: '"Playfair Display", "Iowan Old Style", Georgia, serif',
  body: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
  mono: '"JetBrains Mono", "SF Mono", Menlo, monospace',
};

export const palette = {
  sand:        "#EDE4D2",   // primary cream/paper background
  sandDeep:    "#D9CCAF",   // shadowed sand
  terra:       "#A85A3C",   // hot terracotta — accent
  terraDeep:   "#7A3E28",   // deeper terra
  sage:        "#7C8C6B",   // muted saguaro green
  saguaro:     "#2D4A2A",   // deep cactus green
  rock:        "#3F352D",   // dark earth
  sky:         "#6E8FA8",   // sonoran dusk sky
  sunGold:     "#D4A857",   // golden hour
  charcoal:    "#1A1612",
  paper:       "#F5EFDF",
  white:       "#FFFFFF",
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
