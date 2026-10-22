import { useMemo, useState } from "react";
import { Check, Copy, Minus, Plus } from "lucide-react";
import { productos, site } from "../data/site";
import { mensajePedido, waLink } from "../lib/whatsapp";

const cop = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

function Stepper({
  id,
  valor,
  min,
  paso,
  unidad,
  onChange,
}: {
  id: string;
  valor: number;
  min: number;
  paso: number;
  unidad: string;
  onChange: (v: number) => void;
}) {
  const bajar = () => onChange(Math.max(min, +(valor - paso).toFixed(2)));
  const subir = () => onChange(+(valor + paso).toFixed(2));
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={bajar}
        disabled={valor <= min}
        aria-label={`Quitar ${unidad} de ${id}`}
        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-crema-300 bg-white text-verde-800 transition-colors hover:border-verde-400 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Minus className="h-4 w-4" aria-hidden="true" />
      </button>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        value={valor}
        min={min}
        step={paso}
        onChange={(e) => {
          const n = Number(e.target.value);
          if (!Number.isNaN(n) && n >= min) onChange(+n.toFixed(2));
        }}
        className="w-24 rounded-xl border border-crema-300 bg-white px-3 py-2 text-center font-mono text-base font-medium text-verde-900 focus:border-verde-500"
        aria-label={`Cantidad de ${unidad}`}
      />
      <button
        type="button"
        onClick={subir}
        aria-label={`Agregar ${unidad} de ${id}`}
        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-crema-300 bg-white text-verde-800 transition-colors hover:border-verde-400"
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}

export function OrderBuilder({ compacto = false }: { compacto?: boolean }) {
  const [kg, setKg] = useState(1);
  const [botellas, setBotellas] = useState(0);
  const [copiado, setCopiado] = useState(false);

  const queso = productos[0];
  const suero = productos[1];

  const total = useMemo(
    () => kg * queso.precioRef + botellas * suero.precioRef,
    [kg, botellas]
  );

  const lineas = useMemo(() => {
    const l: string[] = [];
    if (kg > 0) l.push(`• Queso costeño: ${kg} kg`);
    if (botellas > 0) l.push(`• Suero de leche: ${botellas} botella${botellas > 1 ? "s" : ""}`);
    return l;
  }, [kg, botellas]);

  const mensaje = mensajePedido(lineas, cop.format(total));
  const link = waLink(mensaje);

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(mensaje);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2200);
    } catch {
      setCopiado(false);
    }
  };

  return (
    <div className="card overflow-hidden">
      <div className="border-b border-crema-300/70 bg-verde-950 px-6 py-5 sm:px-8">
        <span className="eyebrow-light">Arme su pedido</span>
        <h3 className="mt-2 font-display text-2xl font-semibold text-crema-50">
          La calculadora del queso
        </h3>
      </div>

      <div className="grid gap-5 px-6 py-6 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-verde-950">{queso.nombre}</p>
            <p className="ficha text-verde-600">{queso.precio}</p>
          </div>
          <Stepper
            id={queso.id}
            valor={kg}
            min={queso.min}
            paso={queso.paso}
            unidad={queso.unidad}
            onChange={setKg}
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-crema-300/70 pt-5">
          <div>
            <p className="font-semibold text-verde-950">{suero.nombre}</p>
            <p className="ficha text-verde-600">{suero.precio}</p>
          </div>
          <Stepper
            id={suero.id}
            valor={botellas}
            min={0}
            paso={suero.paso}
            unidad={suero.unidad}
            onChange={setBotellas}
          />
        </div>

        <div className="flex items-baseline justify-between rounded-2xl bg-verde-50 px-5 py-4">
          <span className="ficha uppercase tracking-widest text-verde-700">Total estimado</span>
          <span className="font-mono text-2xl font-semibold text-verde-900">{cop.format(total)}</span>
        </div>

        <div className="flex flex-wrap gap-3">
          <a href={link} target="_blank" rel="noopener noreferrer" className="btn btn-wa">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
              <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.7.8-.8 1-.2.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4 0-.5.1-.7l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.8-2c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2 0 1.3.9 2.5 1 2.7.1.2 1.8 2.8 4.5 3.9 2.2.9 2.7.8 3.1.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.2.2-1.3-.1-.2-.2-.2-.5-.3Z" />
            </svg>
            Pedir por WhatsApp
          </a>
          <button type="button" onClick={copiar} className="btn btn-outline">
            {copiado ? (
              <Check className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Copy className="h-4 w-4" aria-hidden="true" />
            )}
            {copiado ? "¡Copiado!" : "Copiar pedido"}
          </button>
        </div>

        <p className="text-xs leading-relaxed text-verde-900/60">
          Precios de referencia ({queso.precio}; suero $5.000/L). El valor final y la entrega se
          confirman en el chat con {site.marca}. {compacto ? "" : "Atendemos 7 días a la semana."}
        </p>
      </div>
    </div>
  );
}
