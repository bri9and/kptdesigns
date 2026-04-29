import { PageApproach } from "../_lib/PageApproach";
import TarpaperEngine from "./_engine/TarpaperEngine";

export default function TarpaperPage() {
  return (
    <main style={{ background: "#0F0F11", color: "#F2EFEA", minHeight: "100vh" }}>
      <PageApproach>
        <TarpaperEngine />
      </PageApproach>
    </main>
  );
}
