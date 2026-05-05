"use client";

import { useEffect } from "react";

// Loads Fraunces (display, variable with SOFT axis), DM Sans (body), and
// DM Mono (mono accents) — all from Google Fonts. Self-contained: no edits
// to the global layout. The fallback chain in tokens.ts means text still
// renders gracefully before fonts load.

// `display=optional` instead of `swap` — Fraunces only renders if it loads
// in <100ms (cached); otherwise the fallback is permanent for that visit.
// No mid-render swap = no wobble. Trade-off: first-time visitors may see
// the fallback for the whole session. Worth it for stable text.
// SOFT axis dropped from the family URL — we explicitly use only opsz+wght
// in the components, but loading the SOFT axis triggered visible
// re-rendering even when font-variation-settings: normal was set.
const HREF =
  "https://fonts.googleapis.com/css2" +
  "?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700" +
  "&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500" +
  "&family=DM+Mono:ital,wght@0,400;0,500;1,400" +
  "&display=optional";

export function LakeArthurFonts() {
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.querySelector('link[data-la-fonts="1"]')) return;
    const preconnect1 = document.createElement("link");
    preconnect1.rel = "preconnect";
    preconnect1.href = "https://fonts.googleapis.com";
    preconnect1.setAttribute("data-la-fonts", "1");
    const preconnect2 = document.createElement("link");
    preconnect2.rel = "preconnect";
    preconnect2.href = "https://fonts.gstatic.com";
    preconnect2.crossOrigin = "anonymous";
    preconnect2.setAttribute("data-la-fonts", "1");
    const sheet = document.createElement("link");
    sheet.rel = "stylesheet";
    sheet.href = HREF;
    sheet.setAttribute("data-la-fonts", "1");
    document.head.append(preconnect1, preconnect2, sheet);
  }, []);
  return null;
}
