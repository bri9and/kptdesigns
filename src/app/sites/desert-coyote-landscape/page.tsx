import type { Metadata } from "next";
import { DesertCoyoteSite } from "./DesertCoyoteSite";

export const metadata: Metadata = {
  title: "Desert Coyote Landscape | East Valley AZ",
  description:
    "Sonoran-tough landscapes in Mesa, Gilbert, Chandler, and Queen Creek. Hardscape, irrigation, turf, sod, trees. Free estimates by appointment.",
};

// No PageApproach wrapper — the depth-entrance zoom didn't fit the
// production-site feel for Desert Coyote.
export default function Page() {
  return <DesertCoyoteSite />;
}
