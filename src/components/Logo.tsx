export function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect width="64" height="64" rx="14" fill="#123b17" />
      <path d="M18 27 L34 19 L50 27 L34 35 Z" fill="#f3e9d3" />
      <path d="M18 27 L34 35 L34 49 L18 41 Z" fill="#e0c896" />
      <path d="M34 35 L50 27 L50 41 L34 49 Z" fill="#efe1c4" />
      <circle cx="27" cy="32.5" r="2.1" fill="#123b17" />
      <circle cx="23.5" cy="37.5" r="1.5" fill="#123b17" />
      <circle cx="40" cy="39" r="2.4" fill="#c99a38" />
      <path
        d="M34 19 c0-3.6 2.4-5.5 4.6-4.4 2 1 1.4 3.8-0.4 4.6 -1.6 0.7-4.2 0.6-4.2-0.2 z"
        fill="#faf4e6"
      />
    </svg>
  );
}

export function Logo({ claro = false }: { claro?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark />
      <span
        className={`font-display text-[1.55rem] leading-none font-semibold tracking-tight ${
          claro ? "text-crema-50" : "text-verde-950"
        }`}
      >
        Miquesito
      </span>
    </span>
  );
}
