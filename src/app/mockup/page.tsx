import Link from "next/link";

// ─────────────────────────────────────────────────────────────────────────────
// Concept catalog. Twenty design directions (V1 baseline + V2–V20) grouped
// into thematic families. Each card carries an emoji "sigil" for instant
// visual recognition, a one-line palette/feel hint, and a dual-tag positioning
// system: { risk, appeal }.
// ─────────────────────────────────────────────────────────────────────────────

type Risk = "Low Risk" | "High Risk" | "Experimental";
type Appeal =
  | "Premium"
  | "Edgy"
  | "Mainstream"
  | "Bold"
  | "Restrained"
  | "Novel";

type Concept = {
  slug: string;
  name: string;
  emoji: string;
  descriptor: string;
  risk: Risk;
  appeal: Appeal;
};

type Category = {
  id: string;
  title: string;
  blurb: string;
  concepts: Concept[];
};

// ─── Brand Concepts (parsed from /public/concepts/index.html) ──────────────
// These are static-HTML brand-language explorations served from
// /concepts/<slug>.html. They live alongside the 20 design directions above
// so the mockup index is a single hub for everything we've explored.
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
    id: "baseline",
    title: "Baseline",
    blurb: "The control group. Verbatim clone of the live site for A/B against every other direction.",
    concepts: [
      {
        slug: "v1-current",
        name: "V1 — Current Site",
        emoji: "🏁",
        descriptor: "F1 wind-tunnel aesthetic. Charcoal + terracotta. The benchmark we beat.",
        risk: "Low Risk",
        appeal: "Restrained",
      },
    ],
  },
  {
    id: "cosmic",
    title: "Cosmic / Futuristic",
    blurb: "Spatial depth, scroll-bound camera moves, infrastructure-as-spectacle. The web as a place you fly through.",
    concepts: [
      {
        slug: "v2-cosmos",
        name: "V2 — Cosmos",
        emoji: "🌌",
        descriptor: "Plasma violet + deep space. Three.js starfield hero, HUD chrome, exploratory.",
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
        slug: "v6-strata",
        name: "V6 — Strata",
        emoji: "🪨",
        descriptor: "Molten orange on paper. Sections as 2D planes stacked at Z-depth, sliding past camera.",
        risk: "High Risk",
        appeal: "Bold",
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
  {
    id: "editorial",
    title: "Editorial / Print",
    blurb: "Typography first. The reverence and gravitas of a print object — manuscript, magazine, specimen book, broadsheet.",
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
        slug: "v16-broadsheet",
        name: "V16 — Broadsheet",
        emoji: "🗞️",
        descriptor: "Newsprint cream + ink + headline red. Multi-column, wire-copy energy, ugly-pretty.",
        risk: "Low Risk",
        appeal: "Restrained",
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
    id: "technical",
    title: "Technical / Terminal",
    blurb: "Information density as the visual. CRT phosphor, blueprints, instrument panels, mainframe documentation.",
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
        slug: "v11-architectural",
        name: "V11 — Architectural",
        emoji: "📐",
        descriptor: "Blueprint blue-black + drafting white + cyan dim. Elevations, dimension callouts, isometric.",
        risk: "Low Risk",
        appeal: "Premium",
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
        slug: "v20-operator",
        name: "V20 — Operator Manual",
        emoji: "📘",
        descriptor: "Manual cream + IBM blue + warning amber. 1970s mainframe handbook / RFC document.",
        risk: "Low Risk",
        appeal: "Restrained",
      },
    ],
  },
  {
    id: "luxury",
    title: "Luxury / Tactile",
    blurb: "Slow, expensive-feeling. Hand-stitched detail, warm wood and chrome, the patina of objects you keep.",
    concepts: [
      {
        slug: "v10-atelier",
        name: "V10 — Atelier",
        emoji: "✂️",
        descriptor: "Champagne pink + gold foil + oxblood. Couture lookbook, ultra-thin Saol display.",
        risk: "Low Risk",
        appeal: "Premium",
      },
      {
        slug: "v14-cassette",
        name: "V14 — Cassette",
        emoji: "📼",
        descriptor: "Walnut + brushed aluminum + LED red. Skeuomorphic tape deck, Side A / Side B.",
        risk: "High Risk",
        appeal: "Novel",
      },
    ],
  },
  {
    id: "physical",
    title: "Physical-World",
    blurb: "Borrowed metaphors from objects you can hold. Paper, ink, contour lines, thermal-printer scrolls.",
    concepts: [
      {
        slug: "v15-atlas",
        name: "V15 — Atlas",
        emoji: "🗺️",
        descriptor: "Cartographer's white + contour brown + forest green. Topographic map, portfolio as pins.",
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
    ],
  },
  {
    id: "conversational",
    title: "Conversational",
    blurb: "AI-native. The whole site is a dialogue with KPT's agent — content arrives as responses.",
    concepts: [
      {
        slug: "v13-conversation",
        name: "V13 — Conversation",
        emoji: "💬",
        descriptor: "Soft white + agent navy + accent purple. Chat-as-site, ties to KPT Agents brand.",
        risk: "Experimental",
        appeal: "Novel",
      },
    ],
  },
];

const brandConcepts: BrandCategory[] = [
  {
    id: "concepts-original",
    title: "Original Concepts",
    blurb: "In-house brand explorations — palette and identity studies.",
    concepts: [
      { slug: "signal", name: "Signal", emoji: "📡", descriptor: "Electric Teal + Charcoal. Premium infrastructure feel.", tags: ["Low Risk", "Broad Appeal"] },
      { slug: "obsidian", name: "Obsidian", emoji: "🪨", descriptor: "Deep Ink + Amber Gold. Dark luxury. Anthropic meets Linear.", tags: ["Medium Risk", "Premium"] },
      { slug: "matrix", name: "Matrix", emoji: "💊", descriptor: "True Black + Matrix Green. Digital rain. Terminal aesthetic.", tags: ["High Risk", "Iconic"] },
      { slug: "forge", name: "Forge", emoji: "⚒️", descriptor: "Graphite + Electric Blue. Industrial precision.", tags: ["Low Risk", "Enterprise"] },
      { slug: "aurora", name: "Aurora", emoji: "🌌", descriptor: "Midnight Navy + Dual Neon. Bold futuristic.", tags: ["High Risk", "Bold"] },
    ],
  },
  {
    id: "concepts-film",
    title: "Film Concepts",
    blurb: "Cinematic palette borrows — Blade Runner, Dune, Drive.",
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
    id: "concepts-company",
    title: "Company Concepts",
    blurb: "Iconic brand language tributes — Apple, Google, Tesla.",
    concepts: [
      { slug: "apple", name: "Apple", emoji: "🍎", descriptor: "Minimalist perfection. Pure white + near-black + blue accent. Less is more.", tags: ["Low Risk", "Premium"] },
      { slug: "apple-music", name: "Apple Music", emoji: "🎵", descriptor: "Premium listening. Pink-to-red-to-purple gradient, lossless audio, spatial waves.", tags: ["Medium Risk", "Premium"] },
      { slug: "google", name: "Google", emoji: "🔍", descriptor: "Playful precision. 4-color palette + Material Design. Organize everything.", tags: ["Low Risk", "Playful"] },
      { slug: "nike", name: "Nike", emoji: "✔️", descriptor: "Athletic intensity. Pure black + white + volt. Just do it.", tags: ["Medium Risk", "Bold"] },
      { slug: "tesla", name: "Tesla", emoji: "⚡", descriptor: "Electric future. Void black + crimson red. Accelerate the transition.", tags: ["Medium Risk", "Futuristic"] },
      { slug: "coca-cola", name: "Coca-Cola", emoji: "🥤", descriptor: "Classic Americana. Iconic red + white ribbon. Open happiness.", tags: ["Low Risk", "Iconic"] },
      { slug: "amazon", name: "Amazon", emoji: "📦", descriptor: "Everything store. Orange smile + dark navy. From A to Z.", tags: ["Low Risk", "Scale"] },
      { slug: "microsoft", name: "Microsoft", emoji: "🪟", descriptor: "Fluent Design. 4-color grid + acrylic glass. Empower everyone.", tags: ["Low Risk", "Enterprise"] },
      { slug: "samsung", name: "Samsung", emoji: "📱", descriptor: "Galaxy aesthetic. AMOLED black + Samsung blue. Do what you can't.", tags: ["Medium Risk", "Premium"] },
      { slug: "louis-vuitton", name: "Louis Vuitton", emoji: "👜", descriptor: "Ultra-luxury. Monogram brown + gold. The art of travel.", tags: ["Low Risk", "Luxury"] },
      { slug: "disney", name: "Disney", emoji: "🏰", descriptor: "Pure magic. Castle blue + stardust gold. Where dreams come true.", tags: ["Low Risk", "Magical"] },
      { slug: "whatsapp", name: "WhatsApp", emoji: "💬", descriptor: "Chat green + dark teal. Simple, secure, no-nonsense messaging.", tags: ["Low Risk", "Privacy"] },
      { slug: "robinhood", name: "Robinhood", emoji: "🪶", descriptor: "Fintech green + dark. Investing for everyone. Democratized finance.", tags: ["Medium Risk", "Fintech"] },
    ],
  },
  {
    id: "concepts-car",
    title: "Car Concepts",
    blurb: "Performance and luxury automotive identities.",
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
    id: "concepts-retail",
    title: "Retail Concepts",
    blurb: "Storefront and consumer brand languages.",
    concepts: [
      { slug: "target", name: "Target", emoji: "🎯", descriptor: "Bullseye red + white. Expect more. Pay less.", tags: ["Low Risk", "Friendly"] },
      { slug: "walmart", name: "Walmart", emoji: "⭐", descriptor: "Blue + yellow spark. Save money. Live better.", tags: ["Low Risk", "Scale"] },
      { slug: "ikea", name: "IKEA", emoji: "🔧", descriptor: "Blue + yellow. Swedish flat-pack. The wonderful everyday.", tags: ["Medium Risk", "Playful"] },
      { slug: "costco", name: "Costco", emoji: "🏪", descriptor: "Red + blue warehouse. Members-only wholesale intelligence.", tags: ["Low Risk", "Value"] },
      { slug: "whole-foods", name: "Whole Foods", emoji: "🌿", descriptor: "Organic green + cream. Farm-to-table quality.", tags: ["Low Risk", "Natural"] },
      { slug: "nordstrom", name: "Nordstrom", emoji: "👔", descriptor: "Black + blush. Luxury editorial. In pursuit of the best.", tags: ["Low Risk", "Luxury"] },
      { slug: "home-depot", name: "Home Depot", emoji: "🔨", descriptor: "Orange + black. How doers get more done.", tags: ["Medium Risk", "Builder"] },
      { slug: "sephora", name: "Sephora", emoji: "💄", descriptor: "Black + white + red. We belong to something beautiful.", tags: ["Medium Risk", "Chic"] },
      { slug: "trader-joes", name: "Trader Joe's", emoji: "🌺", descriptor: "Red + cream + tiki vibes. Your neighborhood tech store.", tags: ["High Risk", "Quirky"] },
      { slug: "rei", name: "REI", emoji: "⛰️", descriptor: "Forest green + earth tones. A life outdoors, well lived.", tags: ["Low Risk", "Adventure"] },
    ],
  },
  {
    id: "concepts-communication",
    title: "Communication Concepts",
    blurb: "Messaging, social, and media brand systems.",
    concepts: [
      { slug: "slack", name: "Slack", emoji: "💬", descriptor: "Aubergine + multicolor. Where work happens.", tags: ["Low Risk", "Playful"] },
      { slug: "zoom", name: "Zoom", emoji: "📹", descriptor: "Blue + white. One platform to connect.", tags: ["Low Risk", "Clean"] },
      { slug: "discord", name: "Discord", emoji: "🎮", descriptor: "Blurple + dark mode. Your place to talk.", tags: ["Medium Risk", "Community"] },
      { slug: "whatsapp", name: "WhatsApp", emoji: "📱", descriptor: "Green + teal. Simple. Secure. Reliable.", tags: ["Low Risk", "Global"] },
      { slug: "twilio", name: "Twilio", emoji: "🔴", descriptor: "Red + dark navy. Ask your developer.", tags: ["Medium Risk", "Developer"] },
    ],
  },
];

// ─── derived counts ─────────────────────────────────────────────────────────
const totalDirections = catalog.reduce((n, c) => n + c.concepts.length, 0);
const totalCategories = catalog.length;
const baselineCount = catalog.find((c) => c.id === "baseline")?.concepts.length ?? 0;
const draftCount = totalDirections - baselineCount;
const totalBrandConcepts = brandConcepts.reduce((n, c) => n + c.concepts.length, 0);

// ─── tag styling ────────────────────────────────────────────────────────────
const riskStyles: Record<Risk, string> = {
  "Low Risk": "border-white/15 text-white/70 bg-white/[0.02]",
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
};

// ─────────────────────────────────────────────────────────────────────────────

export default function MockupIndex() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pt-[var(--nav-height)]">
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <header className="px-6 md:px-10 pt-16 md:pt-24 pb-10 md:pb-16 max-w-[1320px] mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono text-[10px] tracking-[3px] text-qyellow uppercase opacity-80">
            /mockup
          </span>
          <span className="h-px flex-1 bg-white/10 max-w-[120px]" />
          <span className="font-mono text-[10px] tracking-[3px] text-white/35 uppercase">
            Concept Sandbox
          </span>
        </div>

        <h1 className="text-[clamp(40px,6vw,84px)] font-semibold tracking-[-1px] leading-[0.95] max-w-[1100px]">
          Twenty directions, {totalBrandConcepts} concepts.
          <br />
          <span className="text-white/40">One identity to choose.</span>
        </h1>

        <p className="text-[15px] md:text-[16px] text-white/55 mt-8 max-w-[640px] leading-[1.7] font-light">
          Each card below is a fully-built mockup — hero, philosophy, stack,
          portfolio, process, CTA — exploring a different aesthetic answer to
          the same brief. Pick one to polish. Mash up the best parts. Or treat
          them as dead-drops for further iteration.
        </p>

        {/* stat strip */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-5 gap-px bg-white/[0.06] border border-white/[0.06]">
          {[
            { k: "Directions", v: String(totalDirections) },
            { k: "Categories", v: String(totalCategories) },
            { k: "Drafts", v: String(draftCount) },
            { k: "Baseline", v: String(baselineCount) },
            { k: "Concepts", v: String(totalBrandConcepts) },
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

            {/* card grid — gap-px on a tinted bg gives us hairline dividers */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06] border border-white/[0.06]">
              {cat.concepts.map((c) => (
                <Link
                  key={c.slug}
                  href={`/mockup/${c.slug}`}
                  className="group relative bg-[#0A0A0A] hover:bg-[#111] transition-colors p-7 flex flex-col min-h-[260px]"
                >
                  {/* slug label */}
                  <div className="font-mono text-[10px] tracking-[2.5px] text-white/30 uppercase mb-6">
                    /{c.slug}
                  </div>

                  {/* emoji sigil */}
                  <div
                    className="text-[44px] md:text-[52px] leading-none mb-5 select-none transition-transform duration-500 group-hover:scale-[1.08] group-hover:-rotate-[2deg] origin-bottom-left"
                    aria-hidden
                  >
                    {c.emoji}
                  </div>

                  {/* name */}
                  <h3 className="text-[19px] md:text-[20px] font-semibold tracking-[-0.2px] text-white group-hover:text-qyellow transition-colors mb-2">
                    {c.name}
                  </h3>

                  {/* descriptor */}
                  <p className="text-[13px] text-white/55 font-light leading-[1.65] flex-1">
                    {c.descriptor}
                  </p>

                  {/* tag row */}
                  <div className="flex flex-wrap gap-2 mt-5">
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
                </Link>
              ))}
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
            End of catalog · {totalDirections} directions · {totalBrandConcepts} concepts
          </span>
          <span className="h-px flex-1 bg-white/[0.07]" />
        </div>
      </main>
    </div>
  );
}
