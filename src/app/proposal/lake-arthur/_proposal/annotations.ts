// src/app/proposal/lake-arthur/_proposal/annotations.ts
export type Annotation = {
  anchorId: string;
  label: string;          // 1-3 words for the dot marker
  what: string;           // one line
  why: string;            // one line
};

export const annotations: Annotation[] = [
  {
    anchorId: "drone-hero",
    label: "Drone reel",
    what: "Cinematic hero replaces the static banner on the current site.",
    why: "Lake Arthur's biggest unfair advantage — its setting — finally takes the front seat. Replace this stock loop with hole-by-hole drone footage you film on the course.",
  },
  {
    anchorId: "course-at-a-glance",
    label: "Course details",
    what: "Course details surfaced as the second thing visitors see, not buried five clicks deep.",
    why: "Visitors today click 3-4 deep to find par, yardage, and rating. We pull it forward and let the design carry it.",
  },
  {
    anchorId: "book",
    label: "Booking",
    what: "Direct online booking with a small deposit hold replaces the third-party cps.golf link-out.",
    why: "Customers stay on your domain, you capture the email + payment method, and a $10/player hold cuts no-shows. Real Stripe integration follows after launch.",
  },
  {
    anchorId: "banquets",
    label: "Banquets",
    what: "Banquet leads captured directly with full context — event type, date, vision — instead of a generic contact form.",
    why: "Banquet inquiries are the highest-value lead type. The new form gives Pat what she needs to follow up the same day.",
  },
  {
    anchorId: "tournaments",
    label: "Tournaments",
    what: "Each tournament type gets its own entry point with format and inclusions visible upfront.",
    why: "Outing organizers comparison-shop. Showing pricing-from + inclusions kills the back-and-forth.",
  },
  {
    anchorId: "leagues",
    label: "Leagues",
    what: "Self-serve league signup; roster grows without phone tag.",
    why: "League captains report 40% of new joiners give up before the call connects. This converts them in-page.",
  },
];

export const annotationsByAnchor: Record<string, Annotation> =
  Object.fromEntries(annotations.map((a) => [a.anchorId, a]));
