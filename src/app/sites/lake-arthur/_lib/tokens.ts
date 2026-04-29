// Lake Arthur visual tokens — Newport-club photographic editorial.
// Fraunces + DM Sans + DM Mono for distinctive typography; warm paper +
// deep moss + lake-water + aged-brick palette for grown-up restraint.

export const fonts = {
  // Display: Fraunces (variable serif with soft "SOFT" axis). Loaded via
  // <link> in the page head — see LakeArthurSite.tsx font preload.
  display: '"Fraunces", "Iowan Old Style", "Hoefler Text", Georgia, serif',
  body: '"DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, sans-serif',
  mono: '"DM Mono", "SF Mono", Menlo, monospace',
};

export const palette = {
  paper:        "#F2EBDB",   // warm cream — primary background
  paperDeep:    "#E7DEC9",   // shadowed cream
  ink:          "#16140F",   // charcoal text
  moss:         "#1F3725",   // primary brand green (instead of fairway)
  mossDeep:     "#0E1F14",
  lake:         "#38576B",   // water blue, less saturated
  lakeDeep:     "#1F3949",
  brick:        "#B86F5C",   // warm brick accent (instead of dawn-gold)
  brickPale:    "#E5C7B6",
  ash:          "#87807A",   // muted grey for captions / borders
  bone:         "#FAF6EA",   // very-light cream for elevated surfaces

  // Legacy aliases (don't break older sections still importing these names
  // during the transition). These map to the new palette so the old
  // components render in the new aesthetic without rewrites:
  water:        "#38576B",
  waterDeep:    "#1F3949",
  fairway:      "#1F3725",
  fairwayDeep:  "#0E1F14",
  cream:        "#F2EBDB",
  dawn:         "#B86F5C",
  charcoal:     "#16140F",
  smoke:        "#3A332D",
  fog:          "#E7DEC9",
  white:        "#FFFFFF",
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

// Photo paths — pulled from lakearthur.com directly into /public.
export const photos = {
  hero:           "/sites/lake-arthur/photos/banner_1.jpg",
  course1:        "/sites/lake-arthur/photos/banner_2.jpg",
  course2:        "/sites/lake-arthur/photos/banner_3.jpg",
  thumbBook:      "/sites/lake-arthur/photos/btn_1.jpg",
  thumbCourse:    "/sites/lake-arthur/photos/btn_2.jpg",
  thumbEvents:    "/sites/lake-arthur/photos/btn_3.jpg",
  thumbContact:   "/sites/lake-arthur/photos/btn_4.jpg",
  logo:           "/sites/lake-arthur/photos/logo.png",
  footerLogo:     "/sites/lake-arthur/photos/footer_logo.png",
};
