import Link from "next/link";

// ─────────────────────────────────────────────────────────────────────────────
// Unified concept catalog. Surfaces every direction the studio has explored:
//   • V-numbered Next.js mockups (the design directions)
//   • Brand-language studies served as static HTML from /public/concepts/
// One picker. Pick one to polish, mash up, or treat as a dead-drop.
//
// Organised by BUSINESS TYPE so a sales rep walking into a plumber, a
// real-estate office, a SaaS team, or a boutique hotel can find the
// directions and brand languages most likely to land for that customer.
// ─────────────────────────────────────────────────────────────────────────────

export const metadata = {
  title: "KPT Ideas — Concept Catalog",
};

type Risk = "Low Risk" | "Medium Risk" | "High Risk" | "Experimental";
type Appeal =
  | "Premium"
  | "Edgy"
  | "Mainstream"
  | "Bold"
  | "Restrained"
  | "Novel"
  | "Epic"
  | "Futuristic";

type Concept = {
  slug: string;
  name: string;
  emoji: string;
  descriptor: string;
  risk: Risk;
  appeal: Appeal;
  // When true the card links to a static HTML brand study at /concepts/<slug>.html
  // and opens in a new tab. Otherwise links to the V-numbered mockup at /mockup/<slug>.
  external?: boolean;
};

type Category = {
  id: string;
  title: string;
  blurb: string;
  concepts: Concept[];
};

// ─── Brand Concepts (parsed from /public/concepts/index.html) ──────────────
// These are static-HTML brand-language explorations served from
// /concepts/<slug>.html.
type BrandConcept = {
  slug: string;
  name: string;
  emoji: string;
  descriptor: string;
  tags: [string, string];
};

type BrandCategory = {
  id: string;
  title: string;
  blurb: string;
  concepts: BrandConcept[];
};

const catalog: Category[] = [
  {
    id: "trades-service",
    title: "Trades & Service Industries",
    blurb: "For plumbers, electricians, roofers, carpenters, landscapers, HVAC, paving, pest control, cleaning. The vocabulary of the jobsite — chalk lines, packouts, pipe stacks, breaker panels, dispatch radios. Show up speaking their language.",
    concepts: [
      {
        slug: "v33-shock-line",
        name: "V33 — Shock Line",
        emoji: "⚡",
        descriptor: "Klein-handle orange and Brady-label white. Heat-shrink sleeve type. NEC code-book layout.",
        risk: "Medium Risk",
        appeal: "Premium",
      },
      {
        slug: "v31-pipe-stack",
        name: "V31 — Pipe Stack",
        emoji: "🚰",
        descriptor: "Isometric copper-and-PVC stack diagram, vent up, drain down, sections route through pipes.",
        risk: "High Risk",
        appeal: "Bold",
      },
      {
        slug: "v30-saw-line",
        name: "V30 — Saw Line",
        emoji: "🪚",
        descriptor: "Snapped chalk-line geometry, kerf-width type, pencil-tick measurements, plywood-tone field.",
        risk: "Low Risk",
        appeal: "Restrained",
      },
      {
        slug: "v34-bubble-level",
        name: "V34 — Bubble Level",
        emoji: "📏",
        descriptor: "Torpedo-level vial bands as the page rail; bubble glides plumb/level as user scrolls; brass-end caps mark sections.",
        risk: "Medium Risk",
        appeal: "Premium",
      },
      {
        slug: "v44-snap-line",
        name: "V44 — Snap Line",
        emoji: "📐",
        descriptor: "Chalk-blue-on-black ridge composition, course-by-course content reveal, magnetic-sweeper trail.",
        risk: "Low Risk",
        appeal: "Restrained",
      },
      {
        slug: "v50-panel-directory",
        name: "V50 — Panel Directory",
        emoji: "🔌",
        descriptor: "Handwritten breaker-panel directory — tight all-caps draftsman's hand, ruled grid, ink-stamped circuit numbers, paper aged inside the dead-front.",
        risk: "Medium Risk",
        appeal: "Restrained",
      },
      {
        slug: "v55-pegboard-stack",
        name: "V55 — Packout",
        emoji: "📦",
        descriptor: "Milwaukee Packout-style stacked modular boxes; sections clip onto each other, red-and-black hard cases.",
        risk: "Medium Risk",
        appeal: "Bold",
      },
      {
        slug: "v49-channellock",
        name: "V49 — Channellock",
        emoji: "🧰",
        descriptor: "Vintage turquoise pegboard with tool-outline silhouettes, Sharpie hand-lettering, 5-in-1 red accent.",
        risk: "Medium Risk",
        appeal: "Bold",
      },
      {
        slug: "v42-flightcase",
        name: "V42 — Flight Case",
        emoji: "🧰",
        descriptor: "Anvil-style road case panels, butterfly latches, foam cutouts house the section icons.",
        risk: "Medium Risk",
        appeal: "Novel",
      },
      {
        slug: "v36-tag-stamp",
        name: "V36 — Tag Stamp",
        emoji: "🪪",
        descriptor: "Aluminum tree-tag debossing, numbered slightly off-axis, weathered wire loops, register grid.",
        risk: "Medium Risk",
        appeal: "Premium",
      },
      {
        slug: "v39-storypole",
        name: "V39 — Story Pole",
        emoji: "📏",
        descriptor: "Vertical 1x4 with burned Roman numerals as the page rail, cabinet-shop typography.",
        risk: "Medium Risk",
        appeal: "Premium",
      },
      {
        slug: "v40-lightboard",
        name: "V40 — Lightboard",
        emoji: "💡",
        descriptor: "Backlit acrylic schematic — circuit traces glow, components sit as page sections, voltage labels.",
        risk: "High Risk",
        appeal: "Bold",
      },
      {
        slug: "v45-canopy-lift",
        name: "V45 — Canopy Lift",
        emoji: "🌳",
        descriptor: "Layered canopy silhouettes parallax-lifting; rope-and-saddle iconography in margins; bark-grain ground.",
        risk: "Medium Risk",
        appeal: "Premium",
      },
      {
        slug: "v46-bench-grain",
        name: "V46 — Bench Grain",
        emoji: "🪵",
        descriptor: "Scanned hardwood end-grain hero, layout follows growth rings, wood-burn section headers.",
        risk: "Medium Risk",
        appeal: "Premium",
      },
      {
        slug: "v67-knot-fluency",
        name: "V67 — Knot Fluency",
        emoji: "🪢",
        descriptor: "Hand-drawn climbing-knot diagrams as section markers, arborist saddle palette, rope-trace nav.",
        risk: "Medium Risk",
        appeal: "Premium",
      },
      {
        slug: "v57-soldering",
        name: "V57 — Solder Joint",
        emoji: "🔥",
        descriptor: "Macro-photographic copper-and-solder hero, fillet-shine highlights, propane-blue accent on burnt-flux ground.",
        risk: "Medium Risk",
        appeal: "Premium",
      },
      {
        slug: "v71-zinc-roof",
        name: "V71 — Zinc Roof",
        emoji: "🏠",
        descriptor: "Standing-seam zinc panels run vertically as the page substrate, weathered patina at edges, rivet rhythm.",
        risk: "Medium Risk",
        appeal: "Premium",
      },
      {
        slug: "v35-tarpaper",
        name: "V35 — Tarpaper",
        emoji: "🧱",
        descriptor: "Black 30# felt as the page substrate, chalk snap-line dividers, shingle-bundle accents.",
        risk: "Medium Risk",
        appeal: "Bold",
      },
      {
        slug: "v38-anvil",
        name: "V38 — Anvil",
        emoji: "⚒️",
        descriptor: "Forged-iron headings, hammer-mark texture, slag-orange accents on raw-iron field.",
        risk: "Medium Risk",
        appeal: "Bold",
      },
      {
        slug: "v58-group-text",
        name: "V58 — Group Text",
        emoji: "📻",
        descriptor: "Fleet-dispatch terminal — channel-labelled crew log on charcoal panel, monospace timecodes, amber RX / green TX indicators, magnetic-strip channel tabs.",
        risk: "Medium Risk",
        appeal: "Bold",
      },
      {
        slug: "v68-honey-do",
        name: "V68 — Honey-Do",
        emoji: "📝",
        descriptor: "Refrigerator-magnet checklist hero — items checked in real time as user scrolls, ballpoint check-mark.",
        risk: "Medium Risk",
        appeal: "Novel",
      },
      {
        slug: "v32-permit-board",
        name: "V32 — Permit Board",
        emoji: "🪧",
        descriptor: "Coroplast jobsite sign — project big, GC medium, subs small, rivets at corners, weather-faded.",
        risk: "Low Risk",
        appeal: "Restrained",
      },
      {
        slug: "v43-stencil-yard",
        name: "V43 — Stencil Yard",
        emoji: "🚧",
        descriptor: "DOT-stencil typography, hi-vis-orange / safety-yellow / cone-stripe accents on dust-gray ground.",
        risk: "Medium Risk",
        appeal: "Bold",
      },
      {
        slug: "v66-paint-stripe",
        name: "V66 — Stripe Day",
        emoji: "🛞",
        descriptor: "Fresh parking-lot striping yellow on black-asphalt ground, lot-pattern grid, line-paint accents.",
        risk: "Medium Risk",
        appeal: "Bold",
      },
      {
        slug: "v41-windrow",
        name: "V41 — Windrow",
        emoji: "🌡️",
        descriptor: "Heat-haze shimmer over a fresh asphalt mat, temperature labels as accent type, gradient ground.",
        risk: "High Risk",
        appeal: "Bold",
      },
      {
        slug: "v47-bucket-truck",
        name: "V47 — Bucket Truck",
        emoji: "🚜",
        descriptor: "Cab-eye-view perspective, boom rises with scroll, chip-truck orange and bar-oil amber accents.",
        risk: "High Risk",
        appeal: "Novel",
      },
      {
        slug: "v56-pipe-cam",
        name: "V56 — Pipe Cam",
        emoji: "📹",
        descriptor: "Sewer-cam viewport hero, fish-eye distortion, tight HUD with depth/distance, brushed-stainless chrome.",
        risk: "High Risk",
        appeal: "Novel",
      },
      {
        slug: "v64-iso-icons",
        name: "V64 — ISO Icons",
        emoji: "🚸",
        descriptor: "ISO-7010 / ANSI-Z535 safety pictogram system as full identity language; warning-yellow accent, icon-led nav.",
        risk: "Medium Risk",
        appeal: "Bold",
      },
      {
        slug: "v72-sticker-pack",
        name: "V72 — Sticker Pack",
        emoji: "🏷",
        descriptor: "Layered die-cut stickers — hardware brands, union locals, contractor stickers — tilted stack hero.",
        risk: "High Risk",
        appeal: "Edgy",
      },
      {
        slug: "v24-paint-chip",
        name: "V24 — Paint Chip",
        emoji: "🎨",
        descriptor: "Hardware-store paint deck as nav system. Sections deal as chips fanning across the viewport.",
        risk: "Medium Risk",
        appeal: "Novel",
      },
    ],
  },
  {
    id: "professional-services",
    title: "Professional Services",
    blurb: "For legal, accounting, consulting, mediation, real estate, insurance, architecture. Quiet authority — drafting-board precision, RFP rigor, museum-grade restraint. The page reads like a well-prepared brief.",
    concepts: [
      {
        slug: "v11-architectural",
        name: "V11 — Architectural",
        emoji: "📐",
        descriptor: "Blueprint blue-black + drafting white + cyan dim. Elevations, dimension callouts, isometric.",
        risk: "Low Risk",
        appeal: "Premium",
      },
      {
        slug: "v48-titleblock",
        name: "V48 — Titleblock",
        emoji: "📋",
        descriptor: "Architectural sheet titleblock as global frame, sheet-number nav, revision triangles for updates.",
        risk: "Low Risk",
        appeal: "Restrained",
      },
      {
        slug: "v70-rfp-binder",
        name: "V70 — RFP Binder",
        emoji: "📁",
        descriptor: "Three-ring binder with tabbed dividers, AIA contract typography, redline annotations, sticky-flag nav.",
        risk: "Low Risk",
        appeal: "Restrained",
      },
      {
        slug: "v20-operator",
        name: "V20 — Operator Manual",
        emoji: "📘",
        descriptor: "Manual cream + IBM blue + warning amber. 1970s mainframe handbook / RFC document.",
        risk: "Low Risk",
        appeal: "Restrained",
      },
      {
        slug: "v59-isotype",
        name: "V59 — Isotype",
        emoji: "📊",
        descriptor: "Otto-Neurath-style pictographic statistics; quantities of trades, projects, calls drawn as repeating icons.",
        risk: "Medium Risk",
        appeal: "Premium",
      },
      {
        slug: "v62-zoning-overlay",
        name: "V62 — Zoning Overlay",
        emoji: "🗂️",
        descriptor: "Municipal GIS zoning-map composition, R-1/M-2/I-3 hatched fields, parcel-line nav, jurisdictional palette.",
        risk: "Medium Risk",
        appeal: "Premium",
      },
      {
        slug: "v65-shadowbox",
        name: "V65 — Shadowbox",
        emoji: "🖼️",
        descriptor: "Museum-quality shadowbox with mounted artifacts, brass labels, raking-light shadows, archival linen.",
        risk: "Low Risk",
        appeal: "Premium",
      },
      {
        slug: "amex",
        name: "American Express",
        emoji: "💳",
        descriptor: "Don't Leave Home Without It. Membership Has Its Privileges — premium charge-card identity.",
        risk: "Medium Risk",
        appeal: "Premium",
        external: true,
      },
      {
        slug: "goldman-sachs",
        name: "Goldman Sachs",
        emoji: "🏛️",
        descriptor: "Precision Technology. Institutional Standards. Same rigor as global capital markets, applied to tech.",
        risk: "Medium Risk",
        appeal: "Premium",
        external: true,
      },
      {
        slug: "visa",
        name: "Visa",
        emoji: "💳",
        descriptor: "Everywhere You Want to Be. Visa-blue + gold foil, payment-rails dependability, global scale.",
        risk: "Medium Risk",
        appeal: "Premium",
        external: true,
      },
      {
        slug: "linkedin",
        name: "LinkedIn",
        emoji: "💼",
        descriptor: "In It Together. Professional-network blue, network-effect typography, careers-grade copy.",
        risk: "Medium Risk",
        appeal: "Premium",
        external: true,
      },
    ],
  },
  {
    id: "tech-saas",
    title: "Tech & SaaS",
    blurb: "For software, dev tools, AI, fintech, B2B platforms. Terminals, tickers, glassmorphism, agent chat, live data systems — the visual languages product-led teams already trust.",
    concepts: [
      {
        slug: "v4-terminal",
        name: "V4 — Terminal",
        emoji: "🟢",
        descriptor: "Pitch black + phosphor green. Senior dev's dotfiles. Scanlines, ASCII, neofetch.",
        risk: "Low Risk",
        appeal: "Edgy",
      },
      {
        slug: "v9-ticker",
        name: "V9 — Ticker",
        emoji: "📈",
        descriptor: "Phosphor green + amber + alert red. Bloomberg terminal, live tickers, market depth.",
        risk: "High Risk",
        appeal: "Bold",
      },
      {
        slug: "v13-conversation",
        name: "V13 — Conversation",
        emoji: "💬",
        descriptor: "Soft white + agent navy + accent purple. Chat-as-site, ties to KPT Agents brand.",
        risk: "Experimental",
        appeal: "Novel",
      },
      {
        slug: "v17-nostromo",
        name: "V17 — Nostromo",
        emoji: "🛸",
        descriptor: "Cockpit black + CRT amber + cyan readout. 1979 spaceship instrument panel.",
        risk: "High Risk",
        appeal: "Edgy",
      },
      {
        slug: "v69-pellucid",
        name: "V69 — Pellucid",
        emoji: "🫧",
        descriptor: "Frosted-glass layered cards, depth-of-field blur behind each, soft pastel glow, prism-edge highlights.",
        risk: "Medium Risk",
        appeal: "Premium",
      },
      {
        slug: "v52-mat-temperature",
        name: "V52 — Mat Temperature",
        emoji: "🌡️",
        descriptor: "Live thermal-gradient accent system tied to user's local NOAA temperature; gradient drives palette.",
        risk: "Experimental",
        appeal: "Novel",
      },
      {
        slug: "vercel",
        name: "Vercel",
        emoji: "▲",
        descriptor: "Develop. Preview. Ship. Pure black-on-white minimalism, Geist typeface, frontend-cloud restraint.",
        risk: "Medium Risk",
        appeal: "Premium",
        external: true,
      },
      {
        slug: "stripe",
        name: "Stripe",
        emoji: "💳",
        descriptor: "Financial Infrastructure for the Internet. Indigo gradient hero, dev-grade typography, payments primitives.",
        risk: "Medium Risk",
        appeal: "Premium",
        external: true,
      },
      {
        slug: "github",
        name: "GitHub",
        emoji: "🐙",
        descriptor: "Where the world builds software. Copilot, Actions, Codespaces — the whole supply chain in one home.",
        risk: "Medium Risk",
        appeal: "Premium",
        external: true,
      },
      {
        slug: "linear",
        name: "Linear",
        emoji: "📐",
        descriptor: "A Better Way to Build Software. Keyboard-first, opinionated, designed for teams who ship.",
        risk: "Medium Risk",
        appeal: "Premium",
        external: true,
      },
      {
        slug: "figma",
        name: "Figma",
        emoji: "🎨",
        descriptor: "Design together, ship faster. Multiplayer canvas — now with AI-powered design.",
        risk: "Medium Risk",
        appeal: "Premium",
        external: true,
      },
      {
        slug: "notion",
        name: "Notion",
        emoji: "📝",
        descriptor: "The Connected Workspace. Soft monochrome paper, blocks-and-pages composition, calm productivity.",
        risk: "Medium Risk",
        appeal: "Premium",
        external: true,
      },
      {
        slug: "earthy",
        name: "Earthy",
        emoji: "🌍",
        descriptor: "Modern Websites That Convert. Built to help everyone — search that understands you, trusted at global scale.",
        risk: "Medium Risk",
        appeal: "Premium",
        external: true,
      },
    ],
  },
  {
    id: "hospitality-recreation",
    title: "Hospitality & Recreation",
    blurb: "For hotels, restaurants, golf clubs, fitness, resorts, cafés, members' clubs. Hushed luxury, hand-lettered chalkboards, herbarium atlases, conservatory glass — pages that feel like an experience instead of a sales pitch.",
    concepts: [
      {
        slug: "v54-sandwich-board",
        name: "V54 — Sandwich Board",
        emoji: "🪧",
        descriptor: "Sidewalk A-frame chalkboard — slate ground, hand-lettered chalk type, smudge ghosts where last week was erased, terracotta sandbag at the foot.",
        risk: "Medium Risk",
        appeal: "Premium",
      },
      {
        slug: "v61-greenhouse",
        name: "V61 — Greenhouse",
        emoji: "🪴",
        descriptor: "Glass-house structure, condensation on glass, terracotta pots as section markers, soft sun-through-grid light.",
        risk: "Medium Risk",
        appeal: "Premium",
      },
      {
        slug: "v28-herbarium",
        name: "V28 — Herbarium",
        emoji: "🌿",
        descriptor: "Pressed-plant specimen sheets, Latin nomenclature, archival linen tape, museum register.",
        risk: "Low Risk",
        appeal: "Premium",
      },
      {
        slug: "v37-zonemap",
        name: "V37 — Zone Map",
        emoji: "🗺️",
        descriptor: "USDA Hardiness Zone map as full-bleed background, banded gradients, Zone 6b body type.",
        risk: "Medium Risk",
        appeal: "Novel",
      },
      {
        slug: "v15-atlas",
        name: "V15 — Atlas",
        emoji: "🗺️",
        descriptor: "Cartographer's white + contour brown + forest green. Topographic map, portfolio as pins.",
        risk: "Low Risk",
        appeal: "Premium",
      },
      {
        slug: "airbnb",
        name: "Airbnb",
        emoji: "🏠",
        descriptor: "Where ideas belong. Warm, human, built for community — Belong Anywhere applied to web + voice.",
        risk: "Medium Risk",
        appeal: "Premium",
        external: true,
      },
      {
        slug: "marriott",
        name: "Marriott",
        emoji: "🏨",
        descriptor: "Premium yet accessible — every journey finds its home. World-class hospitality with global scale.",
        risk: "Medium Risk",
        appeal: "Premium",
        external: true,
      },
      {
        slug: "ritz-carlton",
        name: "Ritz-Carlton",
        emoji: "🛎️",
        descriptor: "Ladies and Gentlemen serving Ladies and Gentlemen. Ultra-Luxury Orchestration in pixels.",
        risk: "Medium Risk",
        appeal: "Premium",
        external: true,
      },
      {
        slug: "four-seasons",
        name: "Four Seasons",
        emoji: "🛎️",
        descriptor: "The measure of true quality is not in what you see. Hospitality-grade restraint, hushed confidence.",
        risk: "Medium Risk",
        appeal: "Premium",
        external: true,
      },
      {
        slug: "w-hotels",
        name: "W Hotels",
        emoji: "🏨",
        descriptor: "Whatever/Whenever. Boutique-luxe nightlife energy, neon-meets-marble palette, design-forward hospitality.",
        risk: "Medium Risk",
        appeal: "Premium",
        external: true,
      },
      {
        slug: "starbucks",
        name: "Starbucks",
        emoji: "☕",
        descriptor: "Crafted with Care. Siren-green hospitality, warm cream paper, third-place ritual.",
        risk: "Medium Risk",
        appeal: "Premium",
        external: true,
      },
      {
        slug: "chick-fil-a",
        name: "Chick-fil-A",
        emoji: "🍗",
        descriptor: "It's Our Pleasure to Serve You. Built on \"My Pleasure\" — warm hospitality at scale.",
        risk: "Medium Risk",
        appeal: "Premium",
        external: true,
      },
      {
        slug: "mcdonalds",
        name: "McDonald's",
        emoji: "🍟",
        descriptor: "Billions of tasks served. Golden-arches energy applied to web + voice — lovin' it scale.",
        risk: "Medium Risk",
        appeal: "Premium",
        external: true,
      },
      {
        slug: "delta",
        name: "Delta",
        emoji: "✈️",
        descriptor: "Keep Climbing. Premium reliability at every altitude — every tier earns more.",
        risk: "Medium Risk",
        appeal: "Premium",
        external: true,
      },
      {
        slug: "emirates",
        name: "Emirates",
        emoji: "🛫",
        descriptor: "Fly Beyond Limits. Where timeless elegance meets uncompromising engineering — first class only.",
        risk: "Medium Risk",
        appeal: "Premium",
        external: true,
      },
      {
        slug: "jal",
        name: "Japan Airlines",
        emoji: "🕊️",
        descriptor: "Japanese Precision. Where zen meets precision — engineered with the spirit of the tsurumaru crane.",
        risk: "Medium Risk",
        appeal: "Premium",
        external: true,
      },
      {
        slug: "lufthansa",
        name: "Lufthansa",
        emoji: "🛩️",
        descriptor: "Nonstop You. Nonstop Precision. German engineering hospitality — yellow crane on dark navy.",
        risk: "Medium Risk",
        appeal: "Premium",
        external: true,
      },
      {
        slug: "singapore-airlines",
        name: "Singapore Airlines",
        emoji: "✈️",
        descriptor: "A Great Way to Build. Precision Engineering, Refined Experience, Uncompromising Standards.",
        risk: "Medium Risk",
        appeal: "Premium",
        external: true,
      },
      {
        slug: "f1",
        name: "Formula One",
        emoji: "🏎️",
        descriptor: "Engineered at the limit. Where milliseconds define everything — lights out and away we go.",
        risk: "Medium Risk",
        appeal: "Premium",
        external: true,
      },
      {
        slug: "fifa",
        name: "FIFA",
        emoji: "⚽",
        descriptor: "The Beautiful Game of Building. Pitch-and-trophy palette, tournament-grade typography.",
        risk: "Medium Risk",
        appeal: "Premium",
        external: true,
      },
      {
        slug: "nba",
        name: "NBA",
        emoji: "🏀",
        descriptor: "Where Amazing Happens. Hardwood-court palette, broadcast-grade typography, highlight-reel motion.",
        risk: "Medium Risk",
        appeal: "Premium",
        external: true,
      },
      {
        slug: "nfl",
        name: "NFL",
        emoji: "🏈",
        descriptor: "Built with the power, precision, and championship drive of the NFL. Stadium-grade identity.",
        risk: "Medium Risk",
        appeal: "Premium",
        external: true,
      },
      {
        slug: "ufc",
        name: "UFC",
        emoji: "🥊",
        descriptor: "The Octagon. Combat-sport intensity, fight-night palette, broadcast-graphics typography.",
        risk: "Medium Risk",
        appeal: "Premium",
        external: true,
      },
      {
        slug: "red-bull",
        name: "Red Bull",
        emoji: "🐂",
        descriptor: "No Limits. Gives You Wings. Energy-drink intensity — silver, blue, red, yellow at full saturation.",
        risk: "Medium Risk",
        appeal: "Premium",
        external: true,
      },
      {
        slug: "guinness",
        name: "Guinness",
        emoji: "🍺",
        descriptor: "Crafted with patience. Poured with precision. Dublin to Digital — heritage stout in pixels.",
        risk: "Medium Risk",
        appeal: "Premium",
        external: true,
      },
      {
        slug: "patagonia",
        name: "Patagonia",
        emoji: "🏔️",
        descriptor: "Don't Buy This Software (Unless You Mean It). Outdoor-canvas earth tones, principled brand.",
        risk: "Medium Risk",
        appeal: "Premium",
        external: true,
      },
    ],
  },
  {
    id: "consumer-retail",
    title: "Consumer & Retail Brands",
    blurb: "For storefront, e-commerce, fashion, lifestyle, music, gaming. Box-logo intensity, sunset gradients, listening-grid composition, FYP energy. Where loyalty is built in pixels.",
    concepts: [
      {
        slug: "supreme",
        name: "Supreme",
        emoji: "🧢",
        descriptor: "Limited Drop. Unlimited Power. Box-logo intensity — red Futura Heavy on white, scarcity-first.",
        risk: "Medium Risk",
        appeal: "Premium",
        external: true,
      },
      {
        slug: "chanel",
        name: "Chanel",
        emoji: "👗",
        descriptor: "The Art of Less. Ultra-minimal Parisian luxury — to be irreplaceable, one must always be different.",
        risk: "Medium Risk",
        appeal: "Premium",
        external: true,
      },
      {
        slug: "gucci",
        name: "Gucci",
        emoji: "👜",
        descriptor: "Eclectic Excellence. Maximalist Italian luxury — heritage motifs, jewel-tone palette.",
        risk: "Medium Risk",
        appeal: "Premium",
        external: true,
      },
      {
        slug: "hermes",
        name: "Hermès",
        emoji: "🧣",
        descriptor: "French Artisanal Engineering. Uncompromising Quality. Heritage saddler-luxe palette in pixels.",
        risk: "Medium Risk",
        appeal: "Premium",
        external: true,
      },
      {
        slug: "instagram",
        name: "Instagram",
        emoji: "📸",
        descriptor: "Share Your Moment. Sunset-gradient identity, story-first composition, visual-first content.",
        risk: "Medium Risk",
        appeal: "Premium",
        external: true,
      },
      {
        slug: "tiktok",
        name: "TikTok",
        emoji: "🎬",
        descriptor: "Make Your Day. Cyan-magenta-black neon glitch, vertical-first composition, FYP-energy.",
        risk: "Medium Risk",
        appeal: "Premium",
        external: true,
      },
      {
        slug: "x-twitter",
        name: "X (Twitter)",
        emoji: "✖️",
        descriptor: "What is happening?! Pure black + white, condensed grotesk, real-time feed energy.",
        risk: "Medium Risk",
        appeal: "Premium",
        external: true,
      },
      {
        slug: "reddit",
        name: "Reddit",
        emoji: "👽",
        descriptor: "The Front Page of the Internet. Snoo-orange and upvote energy, communities-first composition.",
        risk: "Medium Risk",
        appeal: "Premium",
        external: true,
      },
      {
        slug: "spotify",
        name: "Spotify",
        emoji: "🎵",
        descriptor: "Music for Everyone. Spotify-green on black, playlist-grid composition, audio-first identity.",
        risk: "Medium Risk",
        appeal: "Premium",
        external: true,
      },
      {
        slug: "soundcloud",
        name: "SoundCloud",
        emoji: "🎧",
        descriptor: "Hear the World's Sounds. Orange waveform, indie-music energy, share-first listening culture.",
        risk: "Medium Risk",
        appeal: "Premium",
        external: true,
      },
      {
        slug: "tidal",
        name: "Tidal",
        emoji: "🎼",
        descriptor: "Master Quality Sound. Audiophile black + chrome, lossless-first identity, artist-owned tone.",
        risk: "Medium Risk",
        appeal: "Premium",
        external: true,
      },
      {
        slug: "bandcamp",
        name: "Bandcamp",
        emoji: "🎶",
        descriptor: "Discover amazing new music. Built for independent music — three steps, zero friction.",
        risk: "Medium Risk",
        appeal: "Premium",
        external: true,
      },
      {
        slug: "playstation",
        name: "PlayStation",
        emoji: "🎮",
        descriptor: "Play Has No Limits. Symbol-button identity, dark-mode void, console-launch energy.",
        risk: "Medium Risk",
        appeal: "Premium",
        external: true,
      },
      {
        slug: "xbox",
        name: "Xbox",
        emoji: "🎮",
        descriptor: "Power Your Dreams. Built for gamers, creators, and dreamers — speed, precision, community.",
        risk: "Medium Risk",
        appeal: "Premium",
        external: true,
      },
      {
        slug: "nintendo",
        name: "Nintendo",
        emoji: "🎮",
        descriptor: "Level up your workflow. Game on. Red-and-white playful, 8-bit warmth, family-arcade tone.",
        risk: "Medium Risk",
        appeal: "Premium",
        external: true,
      },
      {
        slug: "steam",
        name: "Steam",
        emoji: "🎮",
        descriptor: "Steam Library. Valve-blue dark UI, library-grid composition, gamer-storefront density.",
        risk: "Medium Risk",
        appeal: "Premium",
        external: true,
      },
      {
        slug: "epic-games",
        name: "Epic Games",
        emoji: "🎮",
        descriptor: "Powered by Unreal ambition. Game store meets game engine — built for creators who ship worlds.",
        risk: "Medium Risk",
        appeal: "Premium",
        external: true,
      },
    ],
  },
  {
    id: "editorial-print",
    title: "Editorial & Print-led",
    blurb: "Typography first. Suits any premium brand — manuscript, magazine, specimen book, broadsheet. The reverence and gravitas of a print object you'd want to keep.",
    concepts: [
      {
        slug: "v3-editorial",
        name: "V3 — Editorial",
        emoji: "📰",
        descriptor: "Cream + terracotta. Fraunces, asymmetric magazine grid, monograph weight.",
        risk: "Low Risk",
        appeal: "Premium",
      },
      {
        slug: "v51-broadsheet",
        name: "V51 — Broadsheet",
        emoji: "📰",
        descriptor: "Tabloid newsprint front page — 96pt black banner, halftone-dot single-color photos on pulp, 6pt agate classifieds at the right rail.",
        risk: "Medium Risk",
        appeal: "Bold",
      },
      {
        slug: "v16-broadsheet",
        name: "V16 — Broadsheet",
        emoji: "🗞️",
        descriptor: "Newsprint cream + ink + headline red. Multi-column, wire-copy energy, ugly-pretty.",
        risk: "Low Risk",
        appeal: "Restrained",
      },
      {
        slug: "v8-codex",
        name: "V8 — Codex",
        emoji: "📜",
        descriptor: "Aged vellum + gold leaf + vermillion. Illuminated manuscript with drop caps and marginalia.",
        risk: "High Risk",
        appeal: "Premium",
      },
      {
        slug: "v12-specimen",
        name: "V12 — Specimen",
        emoji: "🔠",
        descriptor: "Specimen white + malted red. Pure typography. KPT as the typeface being shown.",
        risk: "Low Risk",
        appeal: "Restrained",
      },
      {
        slug: "v26-pulpit",
        name: "V26 — Pulpit",
        emoji: "📖",
        descriptor: "Lectern-scale display type, hymnal red rule, single phrase per fold, deliberate silence.",
        risk: "Medium Risk",
        appeal: "Premium",
      },
      {
        slug: "v53-color-block",
        name: "V53 — Color Block",
        emoji: "🟧",
        descriptor: "Hard-edged poster blocks of saturated color, Swiss grid, single typeface throughout, no images.",
        risk: "Low Risk",
        appeal: "Restrained",
      },
      {
        slug: "v60-letterpress",
        name: "V60 — Letterpress",
        emoji: "🖨",
        descriptor: "Visible bite, ink halos, 100% cotton paper texture, deep impression letterforms, register marks.",
        risk: "Low Risk",
        appeal: "Premium",
      },
      {
        slug: "v18-receipt",
        name: "V18 — Receipt",
        emoji: "🧾",
        descriptor: "Receipt white + ink fade + carbon red. One continuous thermal-printer strip.",
        risk: "Experimental",
        appeal: "Novel",
      },
      {
        slug: "v19-risograph",
        name: "V19 — Risograph",
        emoji: "🖨️",
        descriptor: "Fluorescent pink + teal + yellow. Misregistered duotone, concert-poster DIY.",
        risk: "High Risk",
        appeal: "Edgy",
      },
    ],
  },
  {
    id: "tactile-brand-led",
    title: "Tactile & Brand-led",
    blurb: "Surfaces you want to touch — kraft paper, deckle edges, walnut veneer, gold foil, couture cardstock, paint-deck cards. Material-forward direction for any boutique brand willing to be remembered.",
    concepts: [
      {
        slug: "v23-fieldnotes",
        name: "V23 — Field Notes",
        emoji: "📓",
        descriptor: "Pocket-notebook composition on kraft, ink-stamped section heads, hand-written nav in graphite.",
        risk: "Low Risk",
        appeal: "Restrained",
      },
      {
        slug: "v10-atelier",
        name: "V10 — Atelier",
        emoji: "✂️",
        descriptor: "Champagne pink + gold foil + oxblood. Couture lookbook, ultra-thin Saol display.",
        risk: "Low Risk",
        appeal: "Premium",
      },
      {
        slug: "v29-paper-mache",
        name: "V29 — Paper Mâché",
        emoji: "🧻",
        descriptor: "Deckle-edge layered paper, torn collage, tape-down accents, shadow under each layer.",
        risk: "Medium Risk",
        appeal: "Novel",
      },
      {
        slug: "v14-cassette",
        name: "V14 — Cassette",
        emoji: "📼",
        descriptor: "Walnut + brushed aluminum + LED red. Skeuomorphic tape deck, Side A / Side B.",
        risk: "High Risk",
        appeal: "Novel",
      },
      {
        slug: "v63-flipbook",
        name: "V63 — Flipbook",
        emoji: "📖",
        descriptor: "Paper-page-flip transitions corner-to-corner, pencil-margin doodle nav, scroll = page-turn.",
        risk: "High Risk",
        appeal: "Novel",
      },
    ],
  },
  {
    id: "cinematic-experimental",
    title: "Cinematic & Experimental",
    blurb: "High-risk visual statements — depth-zoom entrances, scroll-bound camera moves, 3D fields, narrative storytelling. The flag-planted explorations. Use sparingly, but use them as the first impression.",
    concepts: [
      {
        slug: "v25-roadside-neon",
        name: "V25 — Roadside Neon",
        emoji: "🛣️",
        descriptor: "Tube-bent neon signage on dusk asphalt, reflective text, scroll lit by passing headlights.",
        risk: "High Risk",
        appeal: "Bold",
      },
      {
        slug: "v27-rivetwork",
        name: "V27 — Rivetwork",
        emoji: "🔩",
        descriptor: "Riveted plate steel, weld seams as dividers, exposed bolt-pattern grid, oxide patina.",
        risk: "Medium Risk",
        appeal: "Bold",
      },
      {
        slug: "v2-cosmos",
        name: "V2 — Cosmos",
        emoji: "🌌",
        descriptor: "Plasma violet + deep space. Three.js starfield hero, HUD chrome, exploratory.",
        risk: "High Risk",
        appeal: "Bold",
      },
      {
        slug: "v6-strata",
        name: "V6 — Strata",
        emoji: "🪨",
        descriptor: "Molten orange on paper. Sections as 2D planes stacked at Z-depth, sliding past camera.",
        risk: "High Risk",
        appeal: "Bold",
      },
      {
        slug: "v5-tunnel",
        name: "V5 — Tunnel",
        emoji: "🛰️",
        descriptor: "Cyan + electric blue void. Camera advances through a living tunnel of checkpoints.",
        risk: "Experimental",
        appeal: "Novel",
      },
      {
        slug: "v7-recursive",
        name: "V7 — Recursive Zoom",
        emoji: "🔁",
        descriptor: "Off-white + electric red. Powers-of-Ten — every section is a detail inside the previous.",
        risk: "Experimental",
        appeal: "Novel",
      },
    ],
  },
];

const brandConcepts: BrandCategory[] = [
  {
    id: "concepts-tech",
    title: "Tech & Software brands",
    blurb: "For software, dev tools, AI, and product teams. Apple-grade restraint, Material precision, fintech confidence — the languages product-led customers already trust.",
    concepts: [
      { slug: "apple", name: "Apple", emoji: "🍎", descriptor: "Minimalist perfection. Pure white + near-black + blue accent. Less is more.", tags: ["Low Risk", "Premium"] },
      { slug: "google", name: "Google", emoji: "🔍", descriptor: "Playful precision. 4-color palette + Material Design. Organize everything.", tags: ["Low Risk", "Playful"] },
      { slug: "microsoft", name: "Microsoft", emoji: "🪟", descriptor: "Fluent Design. 4-color grid + acrylic glass. Empower everyone.", tags: ["Low Risk", "Enterprise"] },
      { slug: "samsung", name: "Samsung", emoji: "📱", descriptor: "Galaxy aesthetic. AMOLED black + Samsung blue. Do what you can't.", tags: ["Medium Risk", "Premium"] },
      { slug: "tesla", name: "Tesla", emoji: "⚡", descriptor: "Electric future. Void black + crimson red. Accelerate the transition.", tags: ["Medium Risk", "Futuristic"] },
      { slug: "robinhood", name: "Robinhood", emoji: "🪶", descriptor: "Fintech green + dark. Investing for everyone. Democratized finance.", tags: ["Medium Risk", "Fintech"] },
      { slug: "apple-music", name: "Apple Music", emoji: "🎵", descriptor: "Premium listening. Pink-to-red-to-purple gradient, lossless audio, spatial waves.", tags: ["Medium Risk", "Premium"] },
    ],
  },
  {
    id: "concepts-service",
    title: "Service & Hospitality brands",
    blurb: "For logistics, insurance, food service, hotels, airlines, retail experience. The languages customers already associate with trust, ritual, and on-time delivery.",
    concepts: [
      { slug: "disney", name: "Disney", emoji: "🏰", descriptor: "Pure magic. Castle blue + stardust gold. Where dreams come true.", tags: ["Low Risk", "Magical"] },
      { slug: "coca-cola", name: "Coca-Cola", emoji: "🥤", descriptor: "Classic Americana. Iconic red + white ribbon. Open happiness.", tags: ["Low Risk", "Iconic"] },
      { slug: "louis-vuitton", name: "Louis Vuitton", emoji: "👜", descriptor: "Ultra-luxury. Monogram brown + gold. The art of travel.", tags: ["Low Risk", "Luxury"] },
      { slug: "amazon", name: "Amazon", emoji: "📦", descriptor: "Everything store. Orange smile + dark navy. From A to Z.", tags: ["Low Risk", "Scale"] },
    ],
  },
  {
    id: "concepts-retail",
    title: "Retail & Consumer brands",
    blurb: "For storefront, e-commerce, lifestyle, and consumer-direct. Big-box scale, neighborhood quirk, athletic intensity — the storefront vocabularies that move product.",
    concepts: [
      { slug: "target", name: "Target", emoji: "🎯", descriptor: "Bullseye red + white. Expect more. Pay less.", tags: ["Low Risk", "Friendly"] },
      { slug: "walmart", name: "Walmart", emoji: "⭐", descriptor: "Blue + yellow spark. Save money. Live better.", tags: ["Low Risk", "Scale"] },
      { slug: "costco", name: "Costco", emoji: "🏪", descriptor: "Red + blue warehouse. Members-only wholesale intelligence.", tags: ["Low Risk", "Value"] },
      { slug: "ikea", name: "IKEA", emoji: "🔧", descriptor: "Blue + yellow. Swedish flat-pack. The wonderful everyday.", tags: ["Medium Risk", "Playful"] },
      { slug: "home-depot", name: "Home Depot", emoji: "🔨", descriptor: "Orange + black. How doers get more done.", tags: ["Medium Risk", "Builder"] },
      { slug: "whole-foods", name: "Whole Foods", emoji: "🌿", descriptor: "Organic green + cream. Farm-to-table quality.", tags: ["Low Risk", "Natural"] },
      { slug: "nordstrom", name: "Nordstrom", emoji: "👔", descriptor: "Black + blush. Luxury editorial. In pursuit of the best.", tags: ["Low Risk", "Luxury"] },
      { slug: "sephora", name: "Sephora", emoji: "💄", descriptor: "Black + white + red. We belong to something beautiful.", tags: ["Medium Risk", "Chic"] },
      { slug: "rei", name: "REI", emoji: "⛰️", descriptor: "Forest green + earth tones. A life outdoors, well lived.", tags: ["Low Risk", "Adventure"] },
      { slug: "trader-joes", name: "Trader Joe's", emoji: "🌺", descriptor: "Red + cream + tiki vibes. Your neighborhood tech store.", tags: ["High Risk", "Quirky"] },
      { slug: "nike", name: "Nike", emoji: "✔️", descriptor: "Athletic intensity. Pure black + white + volt. Just do it.", tags: ["Medium Risk", "Bold"] },
    ],
  },
  {
    id: "concepts-automotive",
    title: "Automotive brands",
    blurb: "Performance and luxury automotive identities. Rosso Corsa, Papaya orange, British Racing Green — the colorways that mean speed, heritage, or both.",
    concepts: [
      { slug: "ferrari", name: "Ferrari", emoji: "🏎️", descriptor: "Rosso Corsa red + Prancing Horse gold. Born to race.", tags: ["High Impact", "Racing"] },
      { slug: "lamborghini", name: "Lamborghini", emoji: "🐂", descriptor: "Giallo Orion yellow + angular black. Expect the unexpected.", tags: ["High Impact", "Aggressive"] },
      { slug: "porsche", name: "Porsche", emoji: "🏁", descriptor: "Racing red + silver precision. There is no substitute.", tags: ["Medium Risk", "Precision"] },
      { slug: "bmw", name: "BMW", emoji: "🔵", descriptor: "M-Sport stripes + kidney grille. The ultimate machine.", tags: ["Medium Risk", "Athletic"] },
      { slug: "mercedes", name: "Mercedes-Benz", emoji: "⭐", descriptor: "Silver Arrow + AMG red. The best or nothing.", tags: ["Low Risk", "Luxury"] },
      { slug: "ford", name: "Ford", emoji: "🦅", descriptor: "Blue Oval + American muscle. Built tough.", tags: ["Low Risk", "Rugged"] },
      { slug: "aston-martin", name: "Aston Martin", emoji: "🇬🇧", descriptor: "British Racing Green + gold. Power, beauty, soul.", tags: ["Low Risk", "Bespoke"] },
      { slug: "rolls-royce", name: "Rolls-Royce", emoji: "👑", descriptor: "Starlight headliner + silver Spirit. Inspiring greatness.", tags: ["Low Risk", "Ultra-Luxury"] },
      { slug: "bugatti", name: "Bugatti", emoji: "🏆", descriptor: "French blue + Art Deco. Art, forme, technique.", tags: ["High Impact", "Exclusive"] },
      { slug: "mclaren", name: "McLaren", emoji: "🧡", descriptor: "Papaya orange + carbon fiber. Fearlessly forward.", tags: ["Medium Risk", "Technical"] },
    ],
  },
  {
    id: "concepts-communication",
    title: "Media & Communication brands",
    blurb: "For messaging, social, broadcast, and developer tools. Where a single color (Slack aubergine, Twilio red, Discord blurple) instantly signals a use-case.",
    concepts: [
      { slug: "slack", name: "Slack", emoji: "💬", descriptor: "Aubergine + multicolor. Where work happens.", tags: ["Low Risk", "Playful"] },
      { slug: "zoom", name: "Zoom", emoji: "📹", descriptor: "Blue + white. One platform to connect.", tags: ["Low Risk", "Clean"] },
      { slug: "discord", name: "Discord", emoji: "🎮", descriptor: "Blurple + dark mode. Your place to talk.", tags: ["Medium Risk", "Community"] },
      { slug: "whatsapp", name: "WhatsApp", emoji: "📱", descriptor: "Green + teal. Simple. Secure. Reliable.", tags: ["Low Risk", "Global"] },
      { slug: "twilio", name: "Twilio", emoji: "🔴", descriptor: "Red + dark navy. Ask your developer.", tags: ["Medium Risk", "Developer"] },
    ],
  },
  {
    id: "concepts-film",
    title: "Film & Entertainment brands",
    blurb: "Cinematic palette borrows — Blade Runner, Dune, Drive, Wes Anderson, Spider-Verse. Mood-first colorways for brands that lead with atmosphere.",
    concepts: [
      { slug: "blade-runner", name: "Blade Runner 2049", emoji: "🌧️", descriptor: "Cyberpunk noir. Teal fog + amber glow + holographic pink.", tags: ["High Impact", "Sci-Fi"] },
      { slug: "tron", name: "Tron: Legacy", emoji: "⚡", descriptor: "Digital grid. Neon blue circuits + orange accents on void black.", tags: ["High Impact", "Digital"] },
      { slug: "drive", name: "Drive", emoji: "🏎️", descriptor: "Neon noir. Hot pink + cyan on black. 80s synthwave revival.", tags: ["Medium Risk", "Retro"] },
      { slug: "inception", name: "Inception", emoji: "🌀", descriptor: "Dreamscape layers. Ice blue + bronze. Sophisticated depth.", tags: ["Low Risk", "Premium"] },
      { slug: "batman", name: "The Batman", emoji: "🦇", descriptor: "Gotham noir. True black + deep crimson + rain-soaked neon.", tags: ["High Impact", "Dark"] },
      { slug: "dune", name: "Dune", emoji: "🏜️", descriptor: "Desert minimalism. Sand gold + muted blue. Vast and serene.", tags: ["Low Risk", "Premium"] },
      { slug: "interstellar", name: "Interstellar", emoji: "🕳️", descriptor: "Cosmic void. Deep space black + warm amber + cool steel.", tags: ["Medium Risk", "Epic"] },
      { slug: "mad-max", name: "Mad Max: Fury Road", emoji: "🔥", descriptor: "Apocalyptic energy. Burnt orange + electric teal. War paint.", tags: ["High Risk", "Aggressive"] },
      { slug: "black-panther", name: "Black Panther", emoji: "🐆", descriptor: "Afrofuturism. Vibranium purple + kinetic blue + gold accents.", tags: ["Medium Risk", "Regal"] },
      { slug: "avatar", name: "Avatar", emoji: "🌿", descriptor: "Bioluminescent. Deep forest + cyan glow + organic light.", tags: ["Medium Risk", "Organic"] },
      { slug: "oppenheimer", name: "Oppenheimer", emoji: "💥", descriptor: "Scientific gravity. B&W + fire orange. Analog film warmth.", tags: ["Low Risk", "Serious"] },
      { slug: "barbie", name: "Barbie", emoji: "👠", descriptor: "Pop art maximalism. Hot pink + pastels. Unapologetically bold.", tags: ["High Risk", "Fun"] },
      { slug: "grand-budapest", name: "Grand Budapest Hotel", emoji: "🏨", descriptor: "Wes Anderson. Dusty pink + regal purple. Symmetrical whimsy.", tags: ["Medium Risk", "Artistic"] },
      { slug: "spider-verse", name: "Spider-Verse", emoji: "🕷️", descriptor: "Comic glitch. Multicolor halftone + chromatic aberration.", tags: ["High Risk", "Dynamic"] },
      { slug: "john-wick", name: "John Wick", emoji: "🪙", descriptor: "Continental noir. Gold + blood red + black. Lethal elegance.", tags: ["Medium Risk", "Premium"] },
      { slug: "fortnite", name: "Fortnite", emoji: "🎮", descriptor: "Battle Royale energy. Purple + gold + electric blue. Victory Royale.", tags: ["High Risk", "Gen-Z"] },
      { slug: "fantastic-mr-fox", name: "Fantastic Mr. Fox", emoji: "🦊", descriptor: "Stop-motion warmth. Autumn orange + parchment. Wes Anderson woodland.", tags: ["Medium Risk", "Charming"] },
      { slug: "gladiator", name: "Gladiator", emoji: "🏛️", descriptor: "Roman grandeur. Imperial gold + purple + colosseum sand.", tags: ["High Impact", "Regal"] },
      { slug: "goonies", name: "Goonies", emoji: "🗺️", descriptor: "80s adventure. Treasure gold + pirate parchment. Never say die.", tags: ["Medium Risk", "Nostalgic"] },
      { slug: "star-trek", name: "Star Trek", emoji: "🖖", descriptor: "LCARS interface. Command gold + science blue. Make it so.", tags: ["Medium Risk", "Utopian"] },
      { slug: "rundown", name: "The Rundown", emoji: "🌴", descriptor: "Jungle action. Green canopy + treasure gold. Two options.", tags: ["Medium Risk", "Action"] },
      { slug: "21-jump-street", name: "21 Jump Street", emoji: "🚔", descriptor: "Buddy cop comedy. Police blue + badge gold. Undercover excellence.", tags: ["Medium Risk", "Comedy"] },
    ],
  },
  {
    id: "concepts-original",
    title: "Original / Custom concepts",
    blurb: "In-house brand explorations — palette and identity studies that don't borrow from a real company. Catch-all for original directions that don't fit a real-brand bucket.",
    concepts: [
      { slug: "signal", name: "Signal", emoji: "📡", descriptor: "Electric Teal + Charcoal. Premium infrastructure feel.", tags: ["Low Risk", "Broad Appeal"] },
      { slug: "obsidian", name: "Obsidian", emoji: "🪨", descriptor: "Deep Ink + Amber Gold. Dark luxury. Anthropic meets Linear.", tags: ["Medium Risk", "Premium"] },
      { slug: "matrix", name: "Matrix", emoji: "💊", descriptor: "True Black + Matrix Green. Digital rain. Terminal aesthetic.", tags: ["High Risk", "Iconic"] },
      { slug: "forge", name: "Forge", emoji: "⚒️", descriptor: "Graphite + Electric Blue. Industrial precision.", tags: ["Low Risk", "Enterprise"] },
      { slug: "aurora", name: "Aurora", emoji: "🌌", descriptor: "Midnight Navy + Dual Neon. Bold futuristic.", tags: ["High Risk", "Bold"] },
      { slug: "whatsapp", name: "WhatsApp", emoji: "💬", descriptor: "Chat green + dark teal. Simple, secure, no-nonsense messaging.", tags: ["Low Risk", "Privacy"] },
    ],
  },
];

// ─── derived counts ─────────────────────────────────────────────────────────
const totalDirections = catalog.reduce((n, c) => n + c.concepts.length, 0);
const totalCategories = catalog.length;
const totalBrandConcepts = brandConcepts.reduce((n, c) => n + c.concepts.length, 0);
const totalConcepts = totalDirections + totalBrandConcepts;

// ─── tag styling ────────────────────────────────────────────────────────────
const riskStyles: Record<Risk, string> = {
  "Low Risk": "border-white/15 text-white/70 bg-white/[0.02]",
  "Medium Risk": "border-qyellow/25 text-qyellow/80 bg-qyellow/[0.03]",
  "High Risk": "border-qyellow/40 text-qyellow bg-qyellow/[0.06]",
  "Experimental": "border-[#7B5BFF]/40 text-[#A893FF] bg-[#7B5BFF]/[0.06]",
};

const appealStyles: Record<Appeal, string> = {
  Premium: "border-white/15 text-white/80 bg-white/[0.03]",
  Edgy: "border-[#33FF66]/30 text-[#7CFF9D] bg-[#33FF66]/[0.04]",
  Mainstream: "border-white/15 text-white/60 bg-white/[0.02]",
  Bold: "border-qyellow/40 text-qyellow bg-qyellow/[0.05]",
  Restrained: "border-white/12 text-white/55 bg-transparent",
  Novel: "border-[#7B5BFF]/40 text-[#A893FF] bg-[#7B5BFF]/[0.05]",
  Epic: "border-[#E1A84F]/40 text-[#E1A84F] bg-[#E1A84F]/[0.05]",
  Futuristic: "border-[#6CC8E5]/40 text-[#6CC8E5] bg-[#6CC8E5]/[0.05]",
};

// ─────────────────────────────────────────────────────────────────────────────

export default function IdeasIndex() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pt-[var(--nav-height)]">
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <header className="px-6 md:px-10 pt-16 md:pt-24 pb-10 md:pb-16 max-w-[1320px] mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono text-[10px] tracking-[3px] text-qyellow uppercase opacity-80">
            /ideas
          </span>
          <span className="h-px flex-1 bg-white/10 max-w-[120px]" />
          <span className="font-mono text-[10px] tracking-[3px] text-white/35 uppercase">
            Concept Catalog
          </span>
        </div>

        <h1 className="text-[clamp(40px,6vw,84px)] font-semibold tracking-[-1px] leading-[0.95] max-w-[1100px]">
          All the ideas.
          <br />
          <span className="text-white/40">One identity to choose.</span>
        </h1>

        <p className="text-[15px] md:text-[16px] text-white/55 mt-8 max-w-[640px] leading-[1.7] font-light">
          Every concept across the catalog — full marketing builds, brand
          studies, and direction explorations. Pick one to polish, mash up the
          best parts, or treat them as dead-drops for further iteration.
        </p>

        {/* stat strip */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-5 gap-px bg-white/[0.06] border border-white/[0.06]">
          {[
            { k: "Total", v: String(totalConcepts) },
            { k: "Directions", v: String(totalDirections) },
            { k: "Brand studies", v: String(totalBrandConcepts) },
            { k: "Categories", v: String(totalCategories) },
          ].map((s) => (
            <div key={s.k} className="bg-[#0A0A0A] px-5 py-4">
              <div className="font-mono text-[10px] tracking-[2.5px] text-white/40 uppercase">
                {s.k}
              </div>
              <div className="font-semibold text-[28px] md:text-[34px] text-white tracking-[-0.5px] mt-1 tabular-nums">
                {s.v}
              </div>
            </div>
          ))}
        </div>

        <div className="w-12 h-[2px] bg-qyellow mt-10 opacity-80" />
      </header>

      {/* ── Categories ──────────────────────────────────────────────────── */}
      <main className="px-6 md:px-10 pb-24 max-w-[1320px] mx-auto">
        {catalog.map((cat, idx) => (
          <section key={cat.id} className="mb-20 md:mb-28">
            {/* category header */}
            <div className="flex items-baseline gap-4 mb-2">
              <span className="font-mono text-[11px] tracking-[3px] text-qyellow uppercase tabular-nums">
                {String(idx + 1).padStart(2, "0")} ·
              </span>
              <h2 className="text-[22px] md:text-[28px] font-semibold tracking-[-0.3px] text-white">
                {cat.title}
              </h2>
              <span className="font-mono text-[11px] text-white/30 tracking-[2px] tabular-nums">
                ({cat.concepts.length})
              </span>
            </div>
            <p className="text-[14px] text-white/45 font-light leading-[1.7] max-w-[720px] mb-8">
              {cat.blurb}
            </p>
            <div className="h-px bg-white/[0.07] mb-8" />

            {/* card grid — gap-px on a tinted bg gives us hairline dividers.
                auto-rows-fr forces every row to share the tallest card's height
                so cards across categories all line up regardless of descriptor
                length. */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06] border border-white/[0.06] auto-rows-fr">
              {cat.concepts.map((c) => {
                const cardBody = (
                  <>
                    {/* slug label */}
                    <div className="font-mono text-[10px] tracking-[2.5px] text-white/30 uppercase mb-6">
                      /{c.slug}
                    </div>

                    {/* emoji sigil — locked to a single size + line-height across
                        the whole catalog so descriptors aren't pushed by glyph
                        metrics. */}
                    <div
                      className="select-none transition-transform duration-500 group-hover:scale-[1.08] group-hover:-rotate-[2deg] origin-bottom-left mb-5"
                      style={{ fontSize: "48px", lineHeight: 1 }}
                      aria-hidden
                    >
                      {c.emoji}
                    </div>

                    {/* name */}
                    <h3 className="text-[19px] md:text-[20px] font-semibold tracking-[-0.2px] text-white group-hover:text-qyellow transition-colors mb-2">
                      {c.name}
                    </h3>

                    {/* descriptor — clamp at 3 lines so a long descriptor cannot
                        inflate the card past its neighbors; ellipsis on overflow. */}
                    <p
                      className="text-[13px] text-white/55 font-light leading-[1.65] overflow-hidden"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {c.descriptor}
                    </p>

                    {/* tag row — pinned to the bottom of every card via mt-auto */}
                    <div className="flex flex-wrap gap-2 mt-auto pt-5">
                      <span
                        className={`font-mono text-[10px] tracking-[1.5px] uppercase px-2 py-1 border rounded-[2px] ${riskStyles[c.risk]}`}
                      >
                        {c.risk}
                      </span>
                      <span
                        className={`font-mono text-[10px] tracking-[1.5px] uppercase px-2 py-1 border rounded-[2px] ${appealStyles[c.appeal]}`}
                      >
                        {c.appeal}
                      </span>
                    </div>

                    {/* hover accent rail */}
                    <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-qyellow opacity-0 group-hover:opacity-80 transition-opacity" />

                    {/* hover arrow */}
                    <span className="absolute top-6 right-6 font-mono text-[14px] text-white/20 group-hover:text-qyellow group-hover:translate-x-1 group-hover:-translate-y-1 transition-all">
                      ↗
                    </span>
                  </>
                );

                // identical padding / border / radius / hover treatment for every
                // card regardless of category; height equalised by auto-rows-fr.
                const cls =
                  "group relative bg-[#0A0A0A] hover:bg-[#111] transition-colors p-7 flex flex-col h-full min-h-[260px]";

                return c.external ? (
                  <a
                    key={c.slug}
                    href={`/concepts/${c.slug}.html`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cls}
                  >
                    {cardBody}
                  </a>
                ) : (
                  <Link key={c.slug} href={`/mockup/${c.slug}`} className={cls}>
                    {cardBody}
                  </Link>
                );
              })}
            </div>
          </section>
        ))}

        {/* ── Brand Concepts divider ──────────────────────────────────── */}
        <div className="mt-4 mb-16 md:mb-20">
          <div className="h-px bg-white/[0.12]" />
          <div className="flex items-baseline gap-4 mt-12 mb-3">
            <span className="font-mono text-[10px] tracking-[3px] text-qyellow uppercase">
              /brand-concepts
            </span>
            <span className="h-px flex-1 bg-white/10 max-w-[120px]" />
            <span className="font-mono text-[10px] tracking-[3px] text-white/35 uppercase tabular-nums">
              {totalBrandConcepts} explorations
            </span>
          </div>
          <h2 className="text-[clamp(28px,4vw,56px)] font-semibold tracking-[-0.5px] leading-[1] max-w-[1000px]">
            Brand Concepts.
            <br />
            <span className="text-white/40">
              Palette and identity studies — opens in a new tab.
            </span>
          </h2>
          <p className="text-[14px] md:text-[15px] text-white/55 mt-6 max-w-[640px] leading-[1.7] font-light">
            Single-page brand-language studies served as static HTML. Each one
            is a self-contained palette + typography + voice exploration.
            Useful as palette references when polishing a direction above.
          </p>
          <div className="w-12 h-[2px] bg-qyellow mt-8 opacity-80" />
        </div>

        {/* ── Brand Concepts categories ───────────────────────────────── */}
        {brandConcepts.map((cat, idx) => (
          <section key={cat.id} className="mb-16 md:mb-20">
            <div className="flex items-baseline gap-4 mb-2">
              <span className="font-mono text-[11px] tracking-[3px] text-[#C8704D] uppercase tabular-nums">
                B{String(idx + 1).padStart(2, "0")} ·
              </span>
              <h2 className="text-[20px] md:text-[24px] font-semibold tracking-[-0.3px] text-white">
                {cat.title}
              </h2>
              <span className="font-mono text-[11px] text-white/30 tracking-[2px] tabular-nums">
                ({cat.concepts.length})
              </span>
            </div>
            <p className="text-[13px] text-white/45 font-light leading-[1.7] max-w-[720px] mb-6">
              {cat.blurb}
            </p>
            <div className="h-px bg-white/[0.07] mb-6" />

            {/* compact 4-col grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-px bg-white/[0.06] border border-white/[0.06]">
              {cat.concepts.map((bc) => (
                <a
                  key={`${cat.id}-${bc.slug}`}
                  href={`/concepts/${bc.slug}.html`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-[#0A0A0A] hover:bg-[#111] transition-colors p-4 md:p-5 flex flex-col min-h-[150px]"
                >
                  {/* slug label */}
                  <div className="font-mono text-[9px] tracking-[2px] text-white/25 uppercase mb-3 truncate">
                    /{bc.slug}
                  </div>

                  {/* emoji + name row */}
                  <div className="flex items-start gap-3 mb-2">
                    <div
                      className="text-[28px] md:text-[30px] leading-none select-none transition-transform duration-300 group-hover:scale-[1.1] origin-bottom-left"
                      aria-hidden
                    >
                      {bc.emoji}
                    </div>
                    <h3 className="text-[14px] md:text-[15px] font-semibold tracking-[-0.1px] text-white group-hover:text-qyellow transition-colors leading-[1.25] pt-[3px]">
                      {bc.name}
                    </h3>
                  </div>

                  {/* descriptor — 1 line clamp via line-clamp-2 fallback */}
                  <p className="text-[12px] text-white/50 font-light leading-[1.5] flex-1 line-clamp-2">
                    {bc.descriptor}
                  </p>

                  {/* tag pair */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    <span className="font-mono text-[9px] tracking-[1.2px] uppercase px-1.5 py-0.5 border border-white/12 text-white/55 rounded-[2px]">
                      {bc.tags[0]}
                    </span>
                    <span className="font-mono text-[9px] tracking-[1.2px] uppercase px-1.5 py-0.5 border border-[#C8704D]/35 text-[#E89875] bg-[#C8704D]/[0.05] rounded-[2px]">
                      {bc.tags[1]}
                    </span>
                  </div>

                  {/* hover left rail — alternates yellow/terracotta by index */}
                  <span
                    className={`absolute left-0 top-0 bottom-0 w-[2px] opacity-0 group-hover:opacity-90 transition-opacity ${
                      idx % 2 === 0 ? "bg-qyellow" : "bg-[#C8704D]"
                    }`}
                  />

                  {/* external arrow */}
                  <span className="absolute top-3 right-3 font-mono text-[11px] text-white/15 group-hover:text-qyellow group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </section>
        ))}

        {/* ── Footer ──────────────────────────────────────────────────── */}
        <footer className="mt-16 pt-10 border-t border-white/[0.08] grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="font-mono text-[10px] tracking-[3px] text-qyellow uppercase mb-3">
              Reference
            </div>
            <ul className="space-y-2 text-[13px] font-light">
              <li>
                <Link
                  href="/mockup/_lib/design-library.md"
                  className="text-white/70 hover:text-qyellow transition-colors"
                >
                  _lib/design-library.md
                  <span className="text-white/25 ml-2 font-mono text-[10px]">
                    canonical briefs
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/mockup/INSPIRATION.md"
                  className="text-white/70 hover:text-qyellow transition-colors"
                >
                  INSPIRATION.md
                  <span className="text-white/25 ml-2 font-mono text-[10px]">
                    visual references
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/mockup/POLISH_NOTES.md"
                  className="text-white/70 hover:text-qyellow transition-colors"
                >
                  POLISH_NOTES.md
                  <span className="text-white/25 ml-2 font-mono text-[10px]">
                    sweat-the-details list
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="font-mono text-[10px] tracking-[3px] text-qyellow uppercase mb-3">
              Tag legend
            </div>
            <ul className="space-y-1.5 text-[12px] text-white/55 font-light leading-[1.6]">
              <li>
                <span className="text-white/80">Risk</span> — Low / High /
                Experimental. How far from the safe lane.
              </li>
              <li>
                <span className="text-white/80">Appeal</span> — Premium, Edgy,
                Mainstream, Bold, Restrained, Novel. Who it lands with.
              </li>
            </ul>
          </div>

          <div>
            <div className="font-mono text-[10px] tracking-[3px] text-qyellow uppercase mb-3">
              Brief
            </div>
            <p className="text-[12px] text-white/55 font-light leading-[1.7]">
              KPT Designs is a registrar + host + designer + builder, plus
              inbound AI phone agents through KPT Agents. One process. One
              bill. One team. Owned outright. Est. 2004.
            </p>
          </div>
        </footer>

        <div className="mt-12 font-mono text-[10px] tracking-[2.5px] text-white/25 uppercase flex items-center gap-3">
          <span className="h-px flex-1 bg-white/[0.07]" />
          <span>
            End of catalog · {totalConcepts} concepts · {totalDirections} directions · {totalBrandConcepts} brand studies
          </span>
          <span className="h-px flex-1 bg-white/[0.07]" />
        </div>
      </main>
    </div>
  );
}
