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

// Confirmed from the official Lake Arthur scorecard (lakearthur.com/images/SC-1.JPG).
export const courseStats = {
  holes: C(18),
  par: C(71),
  yardageBlue: C("6,637"),    // championship tees
  yardageWhite: C("6,301"),   // regular tees
  yardageGold: C("5,567"),
  yardageRed: C("5,140"),     // forward tees
  ratingBlue: C("71.6 / 129"),
  ratingWhite: C("70.0 / 125"),
  ratingGold: C("66.0 / 115"),
  ratingRed: C("69.6 / 116"),
  // Legacy field aliases the v2 sections still read:
  yardageBack: C("6,637"),
  yardageMiddle: C("6,301"),
  yardageForward: C("5,140"),
  rating: C("71.6 / 129"),
  designer: P("Original layout, 1965 — refined ongoing"),
};

export const courseCharacter =
  "Picturesque, ideal for all levels — designed to help you focus on your game and leave the distractions of life behind.";

export type Hole = {
  number: number;
  par: number;
  yards: Field<string>;        // white-tee yardage (regular play)
  yardsBlue: Field<string>;    // championship tee
  yardsRed: Field<string>;     // forward tee
  handicap: Field<number>;
  title: string;               // editorial name (placeholder — owner-supplied)
  note: string;                // editorial note (placeholder)
  tip?: string;
};

// All yardages, pars, and handicaps below are CONFIRMED from the official
// Lake Arthur scorecard (lakearthur.com/images/SC-1.JPG). Hole names and
// notes are placeholders — owner-supplied copy will replace.
export const holes: Hole[] = [
  { number: 1,  par: 4, yards: C("334"), yardsBlue: C("336"), yardsRed: C("312"), handicap: C(13), title: "The Opening Bow", note: "A generous fairway to settle the nerves. Aim left-center; the slope feeds you toward the green.", tip: "Driver, mid-iron approach." },
  { number: 2,  par: 3, yards: C("171"), yardsBlue: C("194"), yardsRed: C("120"), handicap: C(9),  title: "First Iron", note: "A meaty par three to start. Take enough club to clear the front bunker; long is fine.", tip: "Wind on the tee usually fades a touch." },
  { number: 3,  par: 4, yards: C("382"), yardsBlue: C("410"), yardsRed: C("294"), handicap: C(3),  title: "The Long Look", note: "The third-toughest hole on the course. Position off the tee matters more than distance.", tip: "Aim center; let the slope work." },
  { number: 4,  par: 4, yards: C("302"), yardsBlue: C("312"), yardsRed: C("255"), handicap: C(15), title: "The Bend", note: "A short par four with a dogleg. Resist driver if your tee shot tends to fade — the trouble is right.", tip: "3-wood, mid-iron is rarely wrong." },
  { number: 5,  par: 4, yards: C("374"), yardsBlue: C("393"), yardsRed: C("309"), handicap: C(11), title: "Mid-Round Test", note: "Straightforward but exacting. The green is small; club selection beats power.", tip: "One more than you think." },
  { number: 6,  par: 4, yards: C("463"), yardsBlue: C("487"), yardsRed: C("421"), handicap: C(7),  title: "The Long Par Four", note: "Plays as a par four from the back tees, par five from the forwards. Either way it's a three-shot hole for most.", tip: "Lay up to a comfortable wedge." },
  { number: 7,  par: 4, yards: C("374"), yardsBlue: C("419"), yardsRed: C("290"), handicap: C(5),  title: "The Fifth Hardest", note: "Tight off the tee, demanding into the green. A par here feels like a birdie.", tip: "Take the line off the right edge of the fairway bunker." },
  { number: 8,  par: 5, yards: C("529"), yardsBlue: C("546"), yardsRed: C("468"), handicap: C(1),  title: "The Hardest Hole", note: "The number-one handicap. Long, demanding, no easy bailout. Three good shots for most.", tip: "Pick a target on each shot; commit to it." },
  { number: 9,  par: 3, yards: C("118"), yardsBlue: C("127"), yardsRed: C("110"), handicap: C(17), title: "Short And Sweet", note: "The shortest hole on the course. A small green with no bailout — anything off-line ends in trouble.", tip: "Wedge or pitching wedge for most." },
  { number: 10, par: 4, yards: C("303"), yardsBlue: C("310"), yardsRed: C("285"), handicap: C(18), title: "Easy Restart", note: "The easiest-rated hole on the course. A short par four to settle into the back nine.", tip: "Hybrid + wedge sets up birdie." },
  { number: 11, par: 4, yards: C("390"), yardsBlue: C("411"), yardsRed: C("277"), handicap: C(8),  title: "Mid-Length", note: "A solid par four that asks for a strong drive and a confident approach. Don't short-side yourself.", tip: "Aim at the center of the green; let the pin come to you." },
  { number: 12, par: 4, yards: C("340"), yardsBlue: C("367"), yardsRed: C("275"), handicap: C(16), title: "The Switchback", note: "A reachable par four for the longest hitters. Most will lay up to a comfortable wedge yardage.", tip: "Resist the driver if you're not striping it." },
  { number: 13, par: 3, yards: C("200"), yardsBlue: C("219"), yardsRed: C("155"), handicap: C(6),  title: "The Long Three", note: "The longest par three on the course. Hybrid for many; long iron if you've got it.", tip: "Trust the yardage; the green looks closer than it plays." },
  { number: 14, par: 4, yards: C("414"), yardsBlue: C("441"), yardsRed: C("317"), handicap: C(4),  title: "The Long Test", note: "The fourth-hardest hole. Plays into the prevailing wind most afternoons.", tip: "Take an extra club into the green." },
  { number: 15, par: 5, yards: C("499"), yardsBlue: C("530"), yardsRed: C("392"), handicap: C(10), title: "Reachable In Two", note: "A reachable par five for the long hitter. Two good strikes set up an eagle look.", tip: "Drive it left-center; the angle opens." },
  { number: 16, par: 5, yards: C("531"), yardsBlue: C("531"), yardsRed: C("386"), handicap: C(12), title: "The Long Walk", note: "A three-shot par five for most. The green is the largest on the course.", tip: "Pick a number you trust on each shot." },
  { number: 17, par: 3, yards: C("135"), yardsBlue: C("147"), yardsRed: C("119"), handicap: C(14), title: "The Whisper", note: "A short par three with a tucked pin. The green is small and firm.", tip: "Take less club; let it land short and run." },
  { number: 18, par: 4, yards: C("442"), yardsBlue: C("457"), yardsRed: C("355"), handicap: C(2),  title: "The Closer", note: "The second-toughest hole, finishing back at the clubhouse. A demanding tee shot and a long approach.", tip: "Pick a number; commit to it. Bogey is a fine finish." },
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
    body: "Four tee boxes ranging from 5,140 to 6,637 yards. Wide fairways where they matter; clear bailouts where they don't. Bring the kids; bring the boss.",
    photo: "/sites/lake-arthur/photos/banner_1.jpg",
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
