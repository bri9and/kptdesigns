import type { Metadata } from "next";
import { Geist, Instrument_Serif } from "next/font/google";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Voice Landman · Aquivity Mineral Markets",
  description:
    "An AI voice agent that takes the first call from mineral rights owners across the Appalachian basin. It listens, qualifies, values, and routes the call to the right buyer.",
  openGraph: {
    title: "Voice Landman · Aquivity Mineral Markets",
    description:
      "An AI landman who answers your intake line, qualifies the owner, and routes the deal.",
    type: "website",
  },
};

export default function LandmanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`landman-root ${geist.variable} ${instrumentSerif.variable} antialiased`}
    >
      {children}
    </div>
  );
}
