import { useEffect, useRef, useState, type ReactNode } from "react";
import { site } from "./data/site";

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

  const delayClass = delay ? ` reveal-delay-${delay}` : "";
  return (
    <div ref={ref} className={`reveal${visible ? " is-visible" : ""}${delayClass} ${className}`}>
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  titulo,
  bajada,
  claro = false,
  centrado = false,
  como = "h2",
}: {
  eyebrow: string;
  titulo: string;
  bajada?: string;
  claro?: boolean;
  centrado?: boolean;
  como?: "h1" | "h2";
}) {
  const Encabezado = como;
  return (
    <div className={centrado ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <span className={`eyebrow ${claro ? "text-oro-300" : "text-oro-600"}`}>{eyebrow}</span>
      <Encabezado
        className={`mt-4 leading-tight font-semibold tracking-tight ${
          como === "h1" ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl lg:text-[2.75rem]"
        } ${claro ? "text-crema-50" : "text-verde-950"} ${centrado ? "font-display" : ""}`}
      >
        {titulo}
      </Encabezado>
      {bajada && (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${
            claro ? "text-crema-200/85" : "text-verde-900/75"
          } ${centrado ? "mx-auto" : ""}`}
        >
          {bajada}
        </p>
      )}
    </div>
  );
}

export function CadenaValor({ oscuro = false }: { oscuro?: boolean }) {
  return (
    <ol className="flex flex-wrap items-center gap-x-2 gap-y-2">
      {site.cadena.map((paso, i) => (
        <li key={paso} className="flex items-center gap-2">
          <span
            className={`ficha rounded-full border px-3 py-1 ${
              oscuro
                ? "border-crema-200/25 bg-verde-900/40 text-crema-100"
                : "border-verde-200 bg-verde-50 text-verde-700"
            }`}
          >
            {paso}
          </span>
          {i < site.cadena.length - 1 && (
            <span aria-hidden="true" className={oscuro ? "text-oro-300" : "text-oro-500"}>
              →
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

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
