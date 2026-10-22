export function OriginStrip({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 300"
      preserveAspectRatio="xMidYMax meet"
      className={`w-full ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      {/* Sol */}
      <circle cx="88" cy="64" r="30" fill="#e9c46a" opacity="0.9" />
      <circle cx="88" cy="64" r="42" fill="none" stroke="#e9c46a" strokeWidth="2" opacity="0.35" strokeDasharray="4 8" />

      {/* Aves */}
      <path d="M250 70 q8 -8 16 0 q8 -8 16 0" fill="none" stroke="#17491c" strokeWidth="2.4" strokeLinecap="round" opacity="0.55" />
      <path d="M310 96 q6 -6 12 0 q6 -6 12 0" fill="none" stroke="#17491c" strokeWidth="2" strokeLinecap="round" opacity="0.4" />

      {/* Nubes */}
      <g fill="#fdfaf3" opacity="0.9">
        <ellipse cx="520" cy="60" rx="46" ry="16" />
        <ellipse cx="556" cy="50" rx="30" ry="14" />
        <ellipse cx="920" cy="46" rx="38" ry="13" />
        <ellipse cx="948" cy="38" rx="22" ry="10" />
      </g>

      {/* Colina trasera */}
      <path d="M0 200 C210 150 400 185 620 165 C840 145 1010 185 1200 158 L1200 300 L0 300 Z" fill="#dcefd2" />

      {/* Colina media */}
      <path d="M0 240 C260 205 520 235 760 215 C960 200 1090 225 1200 210 L1200 300 L0 300 Z" fill="#93c97b" />

      {/* Colina frontal */}
      <path d="M0 272 C300 242 620 268 900 250 C1020 243 1120 255 1200 248 L1200 300 L0 300 Z" fill="#4a9338" />

      {/* Árboles sabana */}
      <g>
        <rect x="205" y="168" width="5" height="16" rx="2" fill="#8a4f2c" />
        <circle cx="207" cy="160" r="14" fill="#2f7826" />
        <rect x="232" y="176" width="4" height="12" rx="2" fill="#8a4f2c" />
        <circle cx="233" cy="169" r="10" fill="#1f6120" />
        <rect x="1108" y="182" width="5" height="14" rx="2" fill="#8a4f2c" />
        <circle cx="1110" cy="174" r="12" fill="#2f7826" />
      </g>

      {/* Vaca 1 (sobre colina trasera) */}
      <g transform="translate(60,178)">
        <path d="M92 44 q14 -2 12 -14" fill="none" stroke="#dcc08e" strokeWidth="3.5" strokeLinecap="round" />
        <rect x="0" y="18" width="86" height="40" rx="19" fill="#faf4e6" stroke="#e0c896" strokeWidth="1.5" />
        <ellipse cx="30" cy="30" rx="10" ry="7" fill="#1f6120" opacity="0.85" />
        <ellipse cx="58" cy="44" rx="9" ry="6" fill="#2f7826" opacity="0.8" />
        <rect x="12" y="54" width="8" height="18" rx="4" fill="#e0c896" />
        <rect x="66" y="54" width="8" height="18" rx="4" fill="#e0c896" />
        <circle cx="88" cy="22" r="15" fill="#faf4e6" stroke="#e0c896" strokeWidth="1.5" />
        <ellipse cx="94" cy="28" rx="8" ry="6" fill="#e9dab8" />
        <circle cx="86" cy="20" r="2" fill="#123b17" />
        <path d="M78 8 q4 -6 8 -2 M96 7 q3 -7 8 -3" fill="none" stroke="#dcc08e" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="79" cy="12" rx="5" ry="7" fill="#1f6120" opacity="0.8" />
        <ellipse cx="99" cy="11" rx="5" ry="7" fill="#1f6120" opacity="0.8" />
      </g>

      {/* Vaca 2 (pequeña, lejana) */}
      <g transform="translate(196,196) scale(0.62)" opacity="0.92">
        <rect x="0" y="18" width="86" height="40" rx="19" fill="#faf4e6" stroke="#e0c896" strokeWidth="1.5" />
        <ellipse cx="30" cy="30" rx="10" ry="7" fill="#1f6120" opacity="0.85" />
        <rect x="12" y="54" width="8" height="18" rx="4" fill="#e0c896" />
        <rect x="66" y="54" width="8" height="18" rx="4" fill="#e0c896" />
        <circle cx="88" cy="22" r="15" fill="#faf4e6" stroke="#e0c896" strokeWidth="1.5" />
        <ellipse cx="94" cy="28" rx="8" ry="6" fill="#e9dab8" />
        <circle cx="86" cy="20" r="2" fill="#123b17" />
      </g>

      {/* Cantinas de leche */}
      <g transform="translate(330,196)">
        <path d="M8 10 L46 10 L40 62 L14 62 Z" fill="#dcc08e" />
        <ellipse cx="27" cy="10" rx="19" ry="6" fill="#e9dab8" />
        <rect x="20" y="2" width="14" height="8" rx="3" fill="#a8683a" />
        <path d="M56 24 L86 24 L82 62 L60 62 Z" fill="#dcc08e" opacity="0.92" />
        <ellipse cx="71" cy="24" rx="15" ry="5" fill="#e9dab8" />
        <rect x="65" y="18" width="12" height="6" rx="3" fill="#a8683a" />
      </g>

      {/* Casa de la vereda */}
      <g transform="translate(475,172)">
        <rect x="0" y="30" width="74" height="44" rx="4" fill="#f3e9d3" stroke="#e9dab8" strokeWidth="1.5" />
        <path d="M-8 32 L37 6 L82 32 Z" fill="#a8683a" />
        <rect x="28" y="46" width="18" height="28" rx="2" fill="#123b17" />
        <rect x="8" y="40" width="12" height="12" rx="2" fill="#93c97b" stroke="#1f6120" strokeWidth="2" />
        <rect x="54" y="40" width="12" height="12" rx="2" fill="#93c97b" stroke="#1f6120" strokeWidth="2" />
        <rect x="64" y="8" width="9" height="16" rx="2" fill="#dcc08e" />
      </g>

      {/* Tina de queso */}
      <g transform="translate(600,206)">
        <path d="M0 8 L84 8 L78 56 L6 56 Z" fill="#a8683a" />
        <path d="M14 8 L12 56 M42 8 L42 56 M70 8 L72 56" stroke="#8a4f2c" strokeWidth="3" fill="none" />
        <ellipse cx="42" cy="8" rx="42" ry="10" fill="#e9dab8" />
        <ellipse cx="42" cy="7" rx="34" ry="7" fill="#fdfaf3" />
        <circle cx="30" cy="5" r="3" fill="#fdfaf3" stroke="#e9dab8" strokeWidth="1" />
        <circle cx="52" cy="8" r="2.4" fill="#fdfaf3" stroke="#e9dab8" strokeWidth="1" />
      </g>

      {/* Mesa de moldeado: rueda de queso + cuña */}
      <g transform="translate(760,208)">
        <rect x="0" y="44" width="120" height="7" rx="3.5" fill="#8a4f2c" />
        <rect x="10" y="51" width="7" height="26" rx="3" fill="#8a4f2c" />
        <rect x="103" y="51" width="7" height="26" rx="3" fill="#8a4f2c" />
        <ellipse cx="46" cy="40" rx="30" ry="9" fill="#e9c46a" stroke="#a16207" strokeWidth="1.5" />
        <path d="M16 40 a30 9 0 0 0 60 0" fill="#c99a38" opacity="0.5" />
        <circle cx="36" cy="38" r="3" fill="#a16207" opacity="0.7" />
        <circle cx="56" cy="40" r="2.4" fill="#a16207" opacity="0.7" />
        <g transform="translate(72,10)">
          <path d="M2 20 L22 4 L40 12 L20 28 Z" fill="#f3e9d3" stroke="#e0c896" strokeWidth="1" />
          <circle cx="16" cy="18" r="3.4" fill="#c99a38" />
          <circle cx="27" cy="14" r="2.4" fill="#c99a38" />
        </g>
      </g>

      {/* Camioneta de entrega */}
      <g transform="translate(955,212)">
        <rect x="0" y="14" width="96" height="34" rx="6" fill="#123b17" />
        <path d="M96 22 L122 22 L134 36 L134 48 L96 48 Z" fill="#1f6120" />
        <path d="M102 26 L118 26 L126 36 L102 36 Z" fill="#93c97b" />
        <circle cx="26" cy="52" r="10" fill="#123b17" stroke="#dcc08e" strokeWidth="4" />
        <circle cx="108" cy="52" r="10" fill="#123b17" stroke="#dcc08e" strokeWidth="4" />
        <g transform="translate(10,18)">
          <path d="M2 14 L18 4 L32 10 L16 20 Z" fill="#e9c46a" />
          <circle cx="14" cy="13" r="2.4" fill="#a16207" />
        </g>
        <g transform="translate(44,18)">
          <path d="M2 14 L18 4 L32 10 L16 20 Z" fill="#e9c46a" />
          <circle cx="14" cy="13" r="2.4" fill="#a16207" />
        </g>
      </g>

      {/* Plato final: la mesa */}
      <g transform="translate(1108,196)">
        <path d="M0 52 a42 12 0 0 0 84 0 Z" fill="#123b17" opacity="0.85" />
        <path d="M0 52 a42 12 0 0 0 84 0" fill="none" stroke="#dcc08e" strokeWidth="2" />
        <g transform="translate(18,20)">
          <path d="M4 18 L24 4 L44 12 L24 26 Z" fill="#f3e9d3" stroke="#e0c896" strokeWidth="1" />
          <circle cx="18" cy="16" r="3.2" fill="#123b17" />
          <circle cx="31" cy="14" r="2.2" fill="#c99a38" />
        </g>
        <path d="M62 2 c0 -4 3 -6 6 -5 3 1 2 5 -1 6 -2 1 -5 0 -5 -1 z" fill="#93c97b" opacity="0.8" />
      </g>
    </svg>
  );
}
