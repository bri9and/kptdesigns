import type { Metadata } from "next";
import { LakeArthurSite } from "./LakeArthurSite";

export const metadata: Metadata = {
  title: "Lake Arthur Golf Club | Butler, PA",
  description:
    "Public 18-hole golf course on Lake Arthur in Butler, PA. Book a tee time, host a banquet, run a tournament, join a league.",
};

export default function Page() {
  return (
      <LakeArthurSite />
  );
}
