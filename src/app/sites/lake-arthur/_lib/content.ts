// Single source of truth for all Lake Arthur copy & data.
// Placeholder values are wrapped in P() so the QA pass and the proposal
// annotation rail can both surface flagged values to the customer.

export type Field<T> = { value: T; isPlaceholder: boolean };
const P = <T>(value: T): Field<T> => ({ value, isPlaceholder: true });
const C = <T>(value: T): Field<T> => ({ value, isPlaceholder: false }); // confirmed

export const meta = {
  name: "Lake Arthur Golf Club",
  tagline: "Golf on the lake.",
  address: C("255 Isle Road, Butler, PA 16001"),
  phone: C("(724) 865-2765"),
  email: P("info@lakearthur.com"),
  hoursLine: P("Open daily, sunrise to sunset · Apr–Nov"),
  bookingUrlExternal: C("https://lakearthur.cps.golf/"),
};

export const courseStats = {
  holes: C(18),
  par: P(72),
  yardageBack: P("6,412"),
  yardageMiddle: P("6,003"),
  yardageForward: P("5,221"),
  rating: P("70.8 / 124"),
  designer: P("Original layout, 1965 — refined ongoing"),
};

export const courseCharacter =
  "Picturesque, ideal for all levels — designed to help you focus on your game and leave the distractions of life behind.";

export type Hole = {
  number: number;
  par: number;
  yards: Field<string>;
  title: string;
  note: string;
  tip?: string;
};

export const holes: Hole[] = [
  { number: 1, par: 4, yards: P("372"), title: "The Opening Bow", note: "A generous fairway to settle the nerves. Aim left-center; the slope feeds you toward the green.", tip: "Driver, mid-iron approach." },
  { number: 2, par: 5, yards: P("498"), title: "Cathedral Pines", note: "A reachable par five framed by mature pines on both sides. Two good strikes leave a wedge.", tip: "Bombs reward; misses are punished." },
  { number: 3, par: 3, yards: P("164"), title: "Lake Glance", note: "First sight of Lake Arthur from the elevated tee. Wind off the water adds a club.", tip: "Take more than you think." },
  { number: 4, par: 4, yards: P("405"), title: "The Long Look", note: "Dogleg right around a stand of oaks. Drive it down the left side and the green opens up.", tip: "Don't flirt with the right tree line." },
  { number: 5, par: 4, yards: P("388"), title: "The Fold", note: "Fairway folds into a swale ~250 out. Stop short of the fold or carry it — anything in is a blind approach.", tip: "Lay-up is the smart play." },
  { number: 6, par: 3, yards: P("172"), title: "Island Of Quiet", note: "Pin tucked behind a small front bunker. The green is firm; aim center.", tip: "Spin matters — flighted iron." },
  { number: 7, par: 5, yards: P("522"), title: "The Bend", note: "Sweeping dogleg left; cut the corner and a 200-yard approach is on. Bail out right and you're laying three.", tip: "Pick a target; commit." },
  { number: 8, par: 4, yards: P("355"), title: "The Short Bite", note: "Driveable for the long hitter, but the green is tilted back-to-front and won't hold.", tip: "Hybrid + wedge is rarely wrong here." },
  { number: 9, par: 4, yards: P("411"), title: "Turn Home", note: "Plays back toward the clubhouse. Modest fairway, demanding approach to a tucked pin.", tip: "Pick a side; both shoulders punish." },
  { number: 10, par: 4, yards: P("396"), title: "Second Wind", note: "Restart with a generous landing area. The fairway tilts left — favor the right rough off the tee.", tip: "Take what the course gives." },
  { number: 11, par: 3, yards: P("145"), title: "The Whisper", note: "The shortest hole on the course. A small green with no bailout — anything off-line ends in trouble.", tip: "One club less than instinct." },
  { number: 12, par: 5, yards: P("541"), title: "The Long Walk", note: "Three honest shots for most. Out of bounds left from tee through green; respect it.", tip: "Stay right; don't get cute." },
  { number: 13, par: 4, yards: P("367"), title: "The Switchback", note: "Fairway turns 90° right around a pond. Lay up to 130, hit the green, walk off with par.", tip: "Resist driver — wedge in is gold." },
  { number: 14, par: 4, yards: P("422"), title: "The Test", note: "Longest par four on the course. Headwind most afternoons. Take three good shots if you have to.", tip: "Bogey is a fine score here." },
  { number: 15, par: 3, yards: P("198"), title: "Skyline", note: "Long iron from an elevated tee. The green sits below; gauge the wind by the flag — the trees lie.", tip: "Trust the yardage, not the eye." },
  { number: 16, par: 4, yards: P("378"), title: "The Hinge", note: "Slight dogleg left to a green guarded by a single deep bunker on the right. Pin the left side; bail right.", tip: "A confident draw saves a stroke." },
  { number: 17, par: 5, yards: P("509"), title: "Reachable Dreams", note: "Players who hit it long and straight will have a look in two. The green is the largest on the course.", tip: "Eagle is on the table — go get it." },
  { number: 18, par: 4, yards: P("431"), title: "The Closer", note: "Finishing hole plays back toward the clubhouse. A demanding tee shot with water down the right edge.", tip: "Aim at the left bunker; the slope feeds right." },
];

export const rates = [
  { row: "Weekday — 18 holes", price: P("$28") },
  { row: "Weekday — 9 holes",  price: P("$18") },
  { row: "Weekend — 18 holes", price: P("$36") },
  { row: "Weekend — 9 holes",  price: P("$24") },
  { row: "Senior 62+ (Mon–Fri)", price: P("$24") },
  { row: "Junior 12-17", price: P("$16") },
  { row: "Cart — 18 holes", price: P("$18") },
  { row: "Cart — 9 holes",  price: P("$12") },
  { row: "Twilight (after 4 PM)", price: P("$22") },
];

export const tournaments = [
  {
    slug: "charity-scramble",
    title: "Charity Scramble",
    pitch: "Run your fundraiser on the most scenic course in Butler County.",
    capacity: P("Up to 144 players · 36 teams of 4"),
    pricePerTeam: P("From $640"),
    inclusions: [
      "Shotgun start",
      "Carts for every player",
      "Prize package (gross / net / longest drive / closest to pin)",
      "Lunch & post-round reception in the clubhouse",
      "Branded scoring + leaderboard",
    ],
  },
  {
    slug: "corporate-outing",
    title: "Corporate Outing",
    pitch: "A half-day off-site that doesn't feel like one.",
    capacity: P("Up to 80 players · 20 teams of 4"),
    pricePerTeam: P("From $720"),
    inclusions: [
      "Shotgun or tee-time start",
      "Carts, range balls, scoring",
      "Optional clinic with our pro before play",
      "Hosted bar and lunch buffet",
      "Custom signage / branded tee gifts available",
    ],
  },
  {
    slug: "member-guest",
    title: "Member-Guest",
    pitch: "Two days, paired teams, a real trophy on the line.",
    capacity: P("Up to 64 teams · invitation only"),
    pricePerTeam: P("From $560"),
    inclusions: [
      "Two days of competitive play",
      "Friday evening welcome reception",
      "Saturday awards dinner",
      "Caddies and tournament-quality course setup",
      "Mementos for every team",
    ],
  },
];

export const leagues = [
  {
    slug: "mon-mens",
    title: "Monday Men's League",
    schedule: P("Mondays · 5:30 PM shotgun · May–August"),
    season: P("16 weeks"),
    fee: P("$280 / season · cart not included"),
  },
  {
    slug: "wed-womens",
    title: "Wednesday Women's League",
    schedule: P("Wednesdays · 9 AM tee times · May–September"),
    season: P("18 weeks"),
    fee: P("$240 / season"),
  },
  {
    slug: "thu-seniors",
    title: "Thursday Senior League",
    schedule: P("Thursdays · 10 AM shotgun · April–October"),
    season: P("24 weeks"),
    fee: P("$320 / season · 9 holes weekly"),
  },
  {
    slug: "sun-couples",
    title: "Sunday Couples League",
    schedule: P("Sunday afternoons · twice a month · June–August"),
    season: P("8 sessions"),
    fee: P("$180 / couple · season"),
  },
];

export const proShop = [
  { slug: "logo-cap-classic", title: "Lake Arthur Classic Cap", price: P("$28"), tag: "Apparel" },
  { slug: "logo-polo-mens",   title: "Course Polo — Men's",      price: P("$54"), tag: "Apparel" },
  { slug: "logo-polo-womens", title: "Course Polo — Women's",    price: P("$54"), tag: "Apparel" },
  { slug: "logo-quarter-zip", title: "Lakeside Quarter-Zip",     price: P("$72"), tag: "Apparel" },
  { slug: "course-towel",     title: "Course Towel · 16×24",     price: P("$18"), tag: "Accessories" },
  { slug: "ball-marker-set",  title: "Engraved Ball Markers (4)", price: P("$22"), tag: "Accessories" },
  { slug: "logo-balls-dz",    title: "Logo Balls · Pro V1 Dozen", price: P("$56"), tag: "Equipment" },
  { slug: "divot-tool",       title: "Divot Tool + Marker",       price: P("$16"), tag: "Accessories" },
];

// — v2 design data (Newport-club photographic editorial) —

export const whyPlay = [
  {
    slug: "lakeside",
    title: "On the lake",
    body: "Holes 3, 12, and 18 trace the water's edge. Wind off Lake Arthur reads the course before you do.",
    photo: "/sites/lake-arthur/photos/banner_2.jpg",
  },
  {
    slug: "all-levels",
    title: "Every handicap, welcome",
    body: "Three tee boxes. Wide fairways where they matter; clear bailouts where they don't. Bring the kids; bring the boss.",
    photo: "/sites/lake-arthur/photos/btn_2.jpg",
  },
  {
    slug: "events",
    title: "Built for the moment",
    body: "Member-guests on Saturday. Charity scramble on Sunday. Wedding reception on Friday night. The clubhouse handles all of it.",
    photo: "/sites/lake-arthur/photos/btn_3.jpg",
  },
];

// Four signature holes pulled from the 18-hole roster.
export const signatureHoles = [3, 7, 12, 18].map((n) => holes.find((h) => h.number === n)!);

// Consolidated event categories — replaces the three separate
// banquets/tournaments/leagues sections in v1.
export const eventCategories = [
  {
    slug: "banquets",
    title: "Banquets & Weddings",
    eyebrow: "Up to 220 guests",
    body: "Sunset receptions over the water, corporate dinners in the clubhouse, charity galas in the tented terrace.",
    cta: "Plan your event",
    anchor: "#banquets",
    photo: "/sites/lake-arthur/photos/banner_3.jpg",
  },
  {
    slug: "tournaments",
    title: "Tournaments",
    eyebrow: "Charity · Corporate · Member-Guest",
    body: "Three formats. Shotgun starts, branded scoring, hosted bar and lunch. Capacity from 64 teams down to 16.",
    cta: "Run your event here",
    anchor: "#tournaments",
    photo: "/sites/lake-arthur/photos/btn_4.jpg",
  },
  {
    slug: "leagues",
    title: "Weekly Leagues",
    eyebrow: "Mon · Wed · Thu · Sun",
    body: "Four leagues across the week. Men's, women's, seniors, couples. Sign-ups open in March each season.",
    cta: "Join a league",
    anchor: "#leagues",
    photo: "/sites/lake-arthur/photos/btn_1.jpg",
  },
];

export const navLinks = [
  { label: "Course",     href: "#course" },
  { label: "Heritage",   href: "#heritage" },
  { label: "Book",       href: "#book" },
  { label: "Events",     href: "#events" },
  { label: "Visit",      href: "#visit" },
];

// Heritage / legacy block. All milestone copy is placeholder — owner to
// confirm or correct. The founding year (1965) tracks the placeholder
// already declared in `courseStats.designer`.
export const heritage = {
  founded: P(1965),
  era: P("1965 — present"),
  intro:
    "Lake Arthur Golf Club opened on a parcel of the old Isle Road farm — carved by hand around the natural folds of the land. The lake to the north. The woods to the east. The hayfield where the back nine still rolls.",
  pull: "Sixty seasons. Same eighteen holes. Better every year.",
  milestones: [
    { year: P("1965"), note: P("Opened with nine holes. Par 36.") },
    { year: P("1972"), note: P("Back nine added — the course played as eighteen for the first time.") },
    { year: P("1996"), note: P("Drainage rebuilt across holes 9–14 after a heavy spring.") },
    { year: P("2018"), note: P("Clubhouse renovated; banquet hall expanded to seat 220.") },
    { year: P("2024"), note: P("Tee boxes regraded and new irrigation laid through the front nine.") },
  ],
  photo: "/sites/lake-arthur/photos/banner_3.jpg",
};

export type SectionAnchor =
  | "hero"
  | "why-play"
  | "course"
  | "signature-holes"
  | "book"
  | "events"
  | "banquets"
  | "tournaments"
  | "leagues"
  | "visit"
  | "footer";
