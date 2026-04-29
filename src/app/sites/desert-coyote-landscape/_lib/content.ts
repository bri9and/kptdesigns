// Single source of truth for Desert Coyote Landscape copy & data.
// Placeholder values are wrapped in P() so the proposal annotation rail
// can surface flagged values to the customer.

export type Field<T> = { value: T; isPlaceholder: boolean };
const P = <T>(value: T): Field<T> => ({ value, isPlaceholder: true });
const C = <T>(value: T): Field<T> => ({ value, isPlaceholder: false });

export const meta = {
  name: "Desert Coyote Landscape",
  short: "Desert Coyote",
  tagline: "Landscapes built for the Sonoran sun.",
  serviceArea: C("Arizona's East Valley · Mesa, Gilbert, Chandler, Queen Creek"),
  yearsExperience: C(14),
  phone: C("(480) 936-0187"),
  phoneRaw: C("4809360187"),
  email: C("sales@desertcoyotelandscape.com"),
  facebook: C("https://www.facebook.com/desertcoyotelandscape"),
  hoursLine: P("Mon–Sat · 7 AM – 6 PM · Free estimates by appointment"),
  pitch: "Free estimates. Family-run. Fourteen years building East Valley yards that handle the sun and stay handsome doing it.",
};

// Service categories — replaces "holes" from Lake Arthur. Each rendered as
// a chapter in the field guide.
export type Service = {
  number: number;
  slug: string;
  title: string;
  category: "Hardscape" | "Softscape" | "Systems" | "Yard Care";
  note: string;
  tip?: string;
};

export const services: Service[] = [
  { number: 1, slug: "pavers-travertine", title: "Pavers, travertine & tile", category: "Hardscape", note: "Patios, courtyards, pool surrounds. Natural stone where the eye wants weight; pavers where the budget wants forgiveness. Cut crisp, set on a base that won't move when monsoon hits.", tip: "Travertine for pool decks; pavers for driveways." },
  { number: 2, slug: "walkways-driveways", title: "Walkways, sidewalks & driveways", category: "Hardscape", note: "From the curb to the front door is the first impression a guest gets. We design walks that feel inevitable — not slapped on — and driveways that survive a decade of summer.", tip: "Mind the grade — Sonoran rain dumps fast." },
  { number: 3, slug: "block-walls", title: "Block walls", category: "Hardscape", note: "Property walls, retaining walls, garden separators. Stuccoed and color-matched to the house, or left raw with capstones for a desert-modern read.", tip: "8-foot max without a permit; we handle the engineering." },
  { number: 4, slug: "curbing", title: "Concrete curbing", category: "Hardscape", note: "Continuous-pour curb defines a yard the way a frame defines a painting. Stamped patterns, custom colors, integrated drip lines hidden inside.", tip: "We cut control joints every 4 ft to prevent cracking." },
  { number: 5, slug: "sod-lawns", title: "Sod & live lawns", category: "Softscape", note: "If you need real grass — kids, dogs, a baseball — we install Tifway hybrid Bermuda for the sun belt and overseed with rye for winter green. Soil amended for clay or caliche.", tip: "Plan on 60% more water than a turf yard." },
  { number: 6, slug: "artificial-turf", title: "Artificial turf & pet turf", category: "Softscape", note: "We install only premium pet-friendly turf with antimicrobial backing and proper drainage. Looks like a manicured lawn in February heat. Putting greens optional — we've built a few.", tip: "Pet turf needs deeper base + flushable infill." },
  { number: 7, slug: "rock-gravel", title: "Rock & gravel", category: "Softscape", note: "Decomposed granite, river rock, rip-rap. Color-matched to the architecture. We grade, weed-barrier, and edge so the look holds for years, not seasons.", tip: "Avoid white rock unless you love glare." },
  { number: 8, slug: "irrigation", title: "Irrigation systems", category: "Systems", note: "Drip, bubbler, rotor, smart controllers. We design zones around water needs, not yard geometry — saves up to 40% over old systems. Wi-Fi controllers tied to weather feeds.", tip: "Annual valve check beats a busted line in August." },
  { number: 9, slug: "tree-service", title: "Tree planting & service", category: "Yard Care", note: "Mesquite, palo verde, ironwood, citrus. Planted right, staked right, watered right for the first 18 months — when failure usually happens. Pruning by ISA-certified arborists.", tip: "Plant trees in October, not April." },
  { number: 10, slug: "yard-service", title: "Yard service & cleanup", category: "Yard Care", note: "Weekly, biweekly, monthly, or one-time deep cleanups. Junk removal, brush hauling, weed knock-downs. Trailer at the curb when you need it gone now.", tip: "Annual deep cleanup before monsoon = no surprises." },
];

export const stats = [
  { label: "Years in the East Valley", value: C("14"), accent: false },
  { label: "Yards completed", value: P("1,200+"), accent: false },
  { label: "Free estimates · always", value: C("$0"), accent: true },
  { label: "Family run · since 2012", value: C("Yes"), accent: false },
];

// "How we work" — 4 steps replacing leagues
export const process = [
  {
    slug: "estimate",
    n: 1,
    title: "Free estimate",
    body: "We come out, walk the yard, listen to what you want. You get a written estimate within 48 hours — no pressure, no upsell theater.",
  },
  {
    slug: "design",
    n: 2,
    title: "Design",
    body: "If you want it, we'll sketch a plan with material samples, plant palette, and a phased build option for bigger projects.",
  },
  {
    slug: "build",
    n: 3,
    title: "Build",
    body: "Crews on-site daily. Cleanup nightly. We don't disappear for two weeks in the middle. Job photos texted at every stage.",
  },
  {
    slug: "care",
    n: 4,
    title: "Care",
    body: "Optional ongoing maintenance once the install is done — irrigation tuning, tree pruning, refresh of rock and bark mulch.",
  },
];

// Material library — replaces pro shop. Visual showcase of available finishes.
export const materials = [
  { slug: "travertine-noce",   title: "Travertine · Noce",     tag: "Stone",  notes: "Warm walnut tones; pool-deck favorite." },
  { slug: "travertine-silver", title: "Travertine · Silver",   tag: "Stone",  notes: "Cool grey; reads modern." },
  { slug: "paver-belgard",     title: "Belgard pavers",        tag: "Paver",  notes: "Eight color blends; lifetime warranty." },
  { slug: "turf-elite",        title: "Tour Elite turf",       tag: "Turf",   notes: "Pet-rated; 10-year UV warranty." },
  { slug: "turf-putting",      title: "Putting-green turf",    tag: "Turf",   notes: "True roll; nylon top, sand-infilled." },
  { slug: "dg-madison",        title: "Madison Gold DG",       tag: "Rock",   notes: "Decomposed granite; warm yellow-tan." },
  { slug: "river-rock-2-4",    title: "2–4″ river rock",       tag: "Rock",   notes: "Mixed earth tones; great for swales." },
  { slug: "block-slumpstone",  title: "Slumpstone block",      tag: "Wall",   notes: "Adobe feel; goes with stucco." },
];

// Trailer rental — separate revenue line. Replaces tournaments.
export const trailerRental = {
  title: "Trailer rental",
  pitch: "When you need to move it yourself.",
  rates: [
    { row: "Half day · 4 hrs",  price: P("$60") },
    { row: "Full day · 8 hrs",  price: P("$95") },
    { row: "Weekend · Fri–Mon", price: P("$220") },
    { row: "Per-week",          price: P("$420") },
  ],
  inclusions: [
    "16-ft enclosed or 12-ft open utility (your pick at booking)",
    "Hitch + lights tested before pickup",
    "Mileage and fuel on you; no surprise add-ons",
    "Damage deposit refunded at return",
  ],
};

// Gallery placeholder cards — six representative project types for the
// before/after gallery. Each card shows tag + brief.
export const gallery = [
  { slug: "courtyard-paver",   title: "Front courtyard refresh", tag: "Hardscape", brief: "Travertine pavers replace cracked concrete; lighting integrated into the wall." },
  { slug: "backyard-pet-turf", title: "Backyard pet turf install", tag: "Softscape", brief: "Pet-rated artificial turf, paver border, drip-zone retrofit for shade trees." },
  { slug: "pool-deck",         title: "Pool deck travertine",     tag: "Hardscape", brief: "Cool-touch travertine on a 1,800 sf pool deck; cap cuts and step risers handcrafted." },
  { slug: "drought-yard",      title: "Drought-tolerant front yard", tag: "Softscape", brief: "Removed sod, regraded for runoff, planted Sonoran natives, decomposed-granite paths." },
  { slug: "drive-pavers",      title: "Driveway re-pave",         tag: "Hardscape", brief: "Removed failing concrete; installed Belgard interlocking pavers with reinforced base." },
  { slug: "outdoor-room",      title: "Outdoor room with fire feature", tag: "Hardscape", brief: "Stamped-concrete patio, slumpstone half-wall, gas fire pit, low-voltage lighting." },
];

export type SectionAnchor =
  | "desert-hero"
  | "about-at-a-glance"
  | "service-guide"
  | "quote"
  | "gallery"
  | "trailer"
  | "process"
  | "materials"
  | "visit"
  | "footer";
