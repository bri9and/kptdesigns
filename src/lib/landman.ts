export const SITE = {
  brand: "Aquivity Mineral Markets",
  brandShort: "Aquivity",
  product: "Voice Landman",
  email: "hello@aquivity.com",
  city: "Pittsburgh, PA",
  region: "Appalachian Basin",
} as const;

// Voice Landman intake number. Drives three rendered locations:
//   1. Site nav (Call link, tel:)
//   2. Hero CallCard (display + tel)
//   3. Final CTA (display + tel)
export const PHONE_DISPLAY = "+1 (724) 576-9027";
export const PHONE_TEL = "+17245769027";
