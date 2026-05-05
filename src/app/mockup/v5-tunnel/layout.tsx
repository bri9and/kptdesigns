/**
 * v5-tunnel layout — full-bleed.
 *
 * The Tunnel mockup runs its own fixed canvas, sticky scroll sections, and HUD
 * chrome (progress bar, section pill, scroll dots). The global site header and
 * footer would conflict with that chrome and obscure the hero, so this route
 * opts out by rendering bare.
 */
export default function V5TunnelLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
