/**
 * v2-cosmos layout — full-bleed.
 *
 * The Cosmos mockup runs its own fixed canvas backdrop, snap-to-station engine,
 * and HUD chrome (progress bar, section pill, scroll dots). The global site
 * header and footer would conflict with that chrome, so this route opts out by
 * rendering bare. Mirrors the v5-tunnel pattern.
 */
export default function V2CosmosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
