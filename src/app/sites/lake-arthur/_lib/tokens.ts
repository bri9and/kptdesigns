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

// Photo paths.
// banner_*, btn_*, logo*, SC-1 = real Lake Arthur assets pulled from
// lakearthur.com. course-* = CC0-licensed stock from Unsplash, used as
// filler for spots where we don't yet have a no-people LA photo. Owner
// can swap the stock paths for real photography when it lands.
const ROOT = "/sites/lake-arthur/photos";
export const photos = {
  hero:           `${ROOT}/banner_1.jpg`,           // real LA banner
  course1:        `${ROOT}/banner_2.jpg`,           // real LA banner
  course2:        `${ROOT}/banner_3.jpg`,           // real LA banner
  courseFairway:  `${ROOT}/course-fairway.jpg`,     // CC0 Unsplash filler
  courseLake:     `${ROOT}/course-lake-bg.jpg`,     // CC0 Unsplash filler — no people
  courseGreen:    `${ROOT}/course-green.jpg`,       // CC0 Unsplash filler — no people
  thumbBook:      `${ROOT}/btn_1.jpg`,
  thumbCourse:    `${ROOT}/btn_2.jpg`,
  thumbEvents:    `${ROOT}/btn_3.jpg`,
  thumbContact:   `${ROOT}/btn_4.jpg`,
  scorecard:      `${ROOT}/SC-1.JPG`,
  logo:           `${ROOT}/logo.png`,
  footerLogo:     `${ROOT}/footer_logo.png`,
};
