export default function TopoBackground() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1600 1000"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="landman-topo-fade" cx="50%" cy="40%" r="80%">
          <stop offset="0%" stopColor="#c8602c" stopOpacity="0.16" />
          <stop offset="60%" stopColor="#c8602c" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#0e0f0c" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1600" height="1000" fill="url(#landman-topo-fade)" />

      <g fill="none" stroke="#c8602c" strokeWidth="1">
        <path d="M -200 220 C 220 130 540 280 860 200 S 1480 110 1900 230" strokeOpacity="0.07" />
        <path d="M -200 300 C 240 210 560 360 880 280 S 1480 190 1900 310" strokeOpacity="0.06" />
        <path d="M -200 380 C 260 290 580 440 900 360 S 1480 270 1900 390" strokeOpacity="0.055" />
        <path d="M -200 460 C 280 370 600 520 920 440 S 1480 350 1900 470" strokeOpacity="0.05" />
        <path d="M -200 540 C 300 450 620 600 940 520 S 1480 430 1900 550" strokeOpacity="0.045" />
        <path d="M -200 620 C 320 530 640 680 960 600 S 1480 510 1900 630" strokeOpacity="0.04" />
        <path d="M -200 700 C 340 610 660 760 980 680 S 1480 590 1900 710" strokeOpacity="0.035" />
        <path d="M -200 780 C 360 690 680 840 1000 760 S 1480 670 1900 790" strokeOpacity="0.03" />
        <path d="M -200 860 C 380 770 700 920 1020 840 S 1480 750 1900 870" strokeOpacity="0.025" />
        <path d="M -200 940 C 400 850 720 1000 1040 920 S 1480 830 1900 950" strokeOpacity="0.022" />

        <ellipse cx="360" cy="430" rx="220" ry="130" strokeOpacity="0.05" />
        <ellipse cx="360" cy="430" rx="160" ry="92" strokeOpacity="0.045" />
        <ellipse cx="360" cy="430" rx="100" ry="58" strokeOpacity="0.04" />
        <ellipse cx="360" cy="430" rx="50" ry="28" strokeOpacity="0.035" />

        <ellipse cx="1240" cy="720" rx="260" ry="160" strokeOpacity="0.045" />
        <ellipse cx="1240" cy="720" rx="190" ry="115" strokeOpacity="0.04" />
        <ellipse cx="1240" cy="720" rx="125" ry="74" strokeOpacity="0.035" />
        <ellipse cx="1240" cy="720" rx="62" ry="36" strokeOpacity="0.03" />
      </g>
    </svg>
  );
}
