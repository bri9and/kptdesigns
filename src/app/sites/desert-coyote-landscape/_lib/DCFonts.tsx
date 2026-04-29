"use client";

import { useEffect } from "react";

// Loads DM Serif Display (display, high-contrast didone with flared
// italic — "saloon-chic / rancho-modern" Western without kitsch), Inter
// Tight (body), and JetBrains Mono (small accents). Self-contained.
// `display=optional` to avoid mid-render font swap reflow.

const HREF =
  "https://fonts.googleapis.com/css2" +
  "?family=DM+Serif+Display:ital@0;1" +
  "&family=Inter+Tight:ital,wght@0,400;0,500;0,600;0,700;1,400" +
  "&family=JetBrains+Mono:wght@400;500;600" +
  "&display=optional";

export function DCFonts() {
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.querySelector('link[data-dc2-fonts="1"]')) return;
    const preconnect1 = document.createElement("link");
    preconnect1.rel = "preconnect";
    preconnect1.href = "https://fonts.googleapis.com";
    preconnect1.setAttribute("data-dc2-fonts", "1");
    const preconnect2 = document.createElement("link");
    preconnect2.rel = "preconnect";
    preconnect2.href = "https://fonts.gstatic.com";
    preconnect2.crossOrigin = "anonymous";
    preconnect2.setAttribute("data-dc2-fonts", "1");
    const sheet = document.createElement("link");
    sheet.rel = "stylesheet";
    sheet.href = HREF;
    sheet.setAttribute("data-dc2-fonts", "1");
    document.head.append(preconnect1, preconnect2, sheet);
  }, []);
  return null;
}
