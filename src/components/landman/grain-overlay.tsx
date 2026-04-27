export default function GrainOverlay() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-[5] h-full w-full opacity-[0.07] mix-blend-overlay"
      xmlns="http://www.w3.org/2000/svg"
    >
      <filter id="landman-grain-filter">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.9"
          numOctaves="2"
          stitchTiles="stitch"
        />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0
                  0 0 0 0 0
                  0 0 0 0 0
                  0 0 0 0.85 0"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#landman-grain-filter)" />
    </svg>
  );
}
