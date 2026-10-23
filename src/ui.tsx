import { useEffect, useRef, useState, type ReactNode } from "react";
import { site } from "./data/site";

/* ————— Reveal legado (wrapper) ————— */

export function Reveal({
  children,
  className = "",
  delay,
}: {
  children: ReactNode;
  className?: string;
  delay?: 1 | 2 | 3;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -36px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const delayMs = delay ? delay * 90 : 0;
  const delayClass = delay ? ` reveal-delay-${delay}` : "";
  return (
    <div
      ref={ref}
      className={`reveal-legacy${visible ? " is-visible" : ""}${delayClass} ${className}`}
      style={delay ? ({ transitionDelay: `${delayMs}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}

/* ————— Contador animado ————— */

export function CountUp({
  end,
  prefixo = "",
  sufix = "",
  duration = 1600,
}: {
  end: number;
  prefixo?: string;
  sufix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVal(end);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min((t - t0) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(eased * end));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref}>
      {prefixo}
      {val.toLocaleString("es-CO")}
      {sufix}
    </span>
  );
}

/* ————— Encabezado de sección ————— */

export function SectionHeading({
  eyebrow,
  titulo,
  bajada,
  claro = false,
  centrado = false,
  como = "h2",
}: {
  eyebrow: string;
  titulo: ReactNode;
  bajada?: ReactNode;
  claro?: boolean;
  centrado?: boolean;
  como?: "h1" | "h2";
}) {
  const Encabezado = como;
  return (
    <div className={centrado ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <span className={`eyebrow ${claro ? "eyebrow-light" : ""}`}>{eyebrow}</span>
      <Encabezado
        className={`mt-5 text-h2 ${como === "h1" ? "font-medium" : "font-semibold"} ${
          claro ? "text-crema-50" : "text-verde-950"
        }`}
      >
        {titulo}
      </Encabezado>
      {bajada && (
        <p
          className={`mt-5 text-lead ${
            claro ? "text-crema-200/80" : "text-verde-950/70"
          } ${centrado ? "mx-auto" : ""}`}
        >
          {bajada}
        </p>
      )}
    </div>
  );
}

/* ————— Marquee ————— */

export function Marquee({ items }: { items: string[] }) {
  const contenido = [...items, ...items];
  return (
    <div
      className="marquee-pausable marquee-mask overflow-hidden bg-verde-950 py-4"
      aria-hidden="true"
    >
      <div className="marquee-track items-center gap-10">
        {contenido.map((texto, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="tnum text-xs font-semibold tracking-[0.25em] whitespace-nowrap text-crema-200/60 uppercase">
              {texto}
            </span>
            <span className="text-crema-200/40">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ————— Divisor de onda ————— */

export function WaveDivider({ color = "var(--color-crema-50)", flip = false }: { color?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`block w-full ${flip ? "rotate-180" : ""}`}
      style={{ height: "clamp(40px, 7vw, 110px)" }}
    >
      <path
        fill={color}
        d="M0,64L80,58.7C160,53,320,43,480,80C640,117,800,80,960,74C1120,69,1280,96,1360,48L1440,0L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
      />
    </svg>
  );
}

/* ————— Cadena de valor ————— */

export function CadenaValor({ oscuro = false }: { oscuro?: boolean }) {
  return (
    <ol className="flex flex-wrap items-center gap-x-2 gap-y-2">
      {site.cadena.map((paso, i) => (
        <li key={paso} className="flex items-center gap-2">
          <span
            className={`ficha rounded-full border px-3 py-1 ${
              oscuro
                ? "border-crema-200/25 bg-verde-900/40 text-crema-100"
                : "border-verde-200 bg-verde-50 text-verde-950"
            }`}
          >
            {paso}
          </span>
          {i < site.cadena.length - 1 && (
            <span aria-hidden="true" className={oscuro ? "text-crema-200/70" : "text-verde-950/45"}>
              →
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

/* ————— Cuña de queso (SVG) ————— */

export function QuesoWedge({ className = "h-16 w-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path d="M18 27 L34 19 L50 27 L34 35 Z" fill="#f3e9d3" />
      <path d="M18 27 L34 35 L34 49 L18 41 Z" fill="#e0c896" />
      <path d="M34 35 L50 27 L50 41 L34 49 Z" fill="#efe1c4" />
      <circle cx="27" cy="32.5" r="2.1" fill="#123b17" />
      <circle cx="23.5" cy="37.5" r="1.5" fill="#123b17" />
      <circle cx="40" cy="39" r="2.4" fill="#c99a38" />
    </svg>
  );
}
