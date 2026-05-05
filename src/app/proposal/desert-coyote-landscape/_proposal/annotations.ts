// src/app/proposal/desert-coyote-landscape/_proposal/annotations.ts
export type Annotation = {
  anchorId: string;
  label: string;          // 1-3 words for the dot marker
  what: string;           // one line
  why: string;            // one line
};

export const annotations: Annotation[] = [
  {
    anchorId: "desert-hero",
    label: "Field-guide hero",
    what: "A Sonoran Field Guide hero replaces the four-link landing page on desertcoyotelandscape.com.",
    why: "The current site is Home / Trailer Rental / Photos / Facebook — that's a brochure, not a business. The new hero shows the work, the territory, and the phone number in one breath.",
  },
  {
    anchorId: "about-at-a-glance",
    label: "At a glance",
    what: "Years in business, yards completed, and 'free estimates' surfaced on the home page — not buried.",
    why: "Most East Valley homeowners shopping a landscaper are pricing 3 quotes. Putting trust signals up front kills the bounce on the most important screen.",
  },
  {
    anchorId: "quote",
    label: "On-domain quote",
    what: "Free-estimate request flow with photo upload lives on your domain — replaces 'Call us / Facebook us'.",
    why: "Captures the lead with full context (yard photos, scope, timeline) the moment intent is hottest, instead of losing them to a missed phone call or a Facebook DM that never gets read.",
  },
  {
    anchorId: "gallery",
    label: "Project gallery",
    what: "Real before/after gallery organized by project type, replacing the un-categorized Photos tab.",
    why: "Lets a homeowner see exactly the project they're imagining — pool deck, pet turf, drought yard — not scroll through 200 unsorted phone shots.",
  },
  {
    anchorId: "trailer",
    label: "Trailer booking",
    what: "Trailer rental gets a real rate card and booking flow instead of a phone-only ask.",
    why: "Trailer rental is its own revenue line. Letting customers book online captures the 7 PM browser who'd never call.",
  },
  {
    anchorId: "process",
    label: "How we work",
    what: "A clear four-step process — estimate, design, build, care — replaces the implicit 'just call and find out'.",
    why: "Showing the process up front converts the cautious shopper. People hire crews they can predict.",
  },
];

export const annotationsByAnchor: Record<string, Annotation> =
  Object.fromEntries(annotations.map((a) => [a.anchorId, a]));
