import { PageApproach } from "../_lib/PageApproach";
import LightboardEngine from "./_engine/LightboardEngine";

export default function LightboardPage() {
  return (
    <main style={{ background: "#0A0F12", color: "#E6F5F8", minHeight: "100vh" }}>
      <PageApproach>
        <LightboardEngine />
      </PageApproach>
    </main>
  );
}
