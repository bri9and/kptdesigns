"use client";

/**
 * /projects/touchdesign
 *
 * Standalone TouchDesigner-style network visualization of KPT Designs.
 * The site IS a live operator network: every service, surface, and signal
 * is a node, wires show the data flow.
 *
 * Renders 100vh × 100vw and never scrolls vertically — pan/zoom inside.
 */

import Network from "./_engine/Network";

export default function TouchDesignPage() {
  return <Network />;
}
