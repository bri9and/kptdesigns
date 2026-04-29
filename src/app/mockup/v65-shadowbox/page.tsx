import { PageApproach } from "../_lib/PageApproach";
import ShadowboxEngine from "./_engine/ShadowboxEngine";

export default function ShadowboxPage() {
  return (
    <main style={{ background: "#1A1816", color: "#E5DDC9", minHeight: "100vh" }}>
      <PageApproach>
        <ShadowboxEngine />
      </PageApproach>
    </main>
  );
}
