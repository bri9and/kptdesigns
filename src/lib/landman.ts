export const SITE = {
  brand: "Aquivity Mineral Markets",
  brandShort: "Aquivity",
  product: "Voice Landman",
  email: "hello@aquivity.com",
  city: "Pittsburgh, PA",
  region: "Appalachian Basin",
} as const;

// Display-only. Rendered as plain text in the final CTA: no tel: link,
// no click-to-call affordances. Update here when the real Twilio number
// is provisioned.
export const PHONE_DISPLAY = "+1 (724) 576-9027";
