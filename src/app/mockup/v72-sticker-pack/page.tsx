import { PageApproach } from "../_lib/PageApproach";
import StickerPackEngine from "./_engine/StickerPackEngine";

export default function StickerPackPage() {
  return (
    <main style={{ background: "#F1EEE5", color: "#0A0E1A", minHeight: "100vh" }}>
      <PageApproach>
        <StickerPackEngine />
      </PageApproach>
    </main>
  );
}
