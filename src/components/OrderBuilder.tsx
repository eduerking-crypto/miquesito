import { useMemo, useState } from "react";
import { Check, Copy, MessageCircle, Minus, Plus, Tag } from "lucide-react";
import { cop, precioUnidad, useSiteConfig, type ProductoApi } from "../lib/config";
import { site } from "../data/site";
import { mensajePedido, waLink } from "../lib/whatsapp";

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
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-crema-300 bg-white text-verde-950 transition-all hover:border-verde-400 hover:bg-verde-50 disabled:cursor-not-allowed disabled:opacity-40"
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
        className="campo w-24 text-center tnum font-medium"
        aria-label={`Cantidad de ${unidad}`}
      />
      <button
        type="button"
        onClick={subir}
        aria-label={`Agregar ${unidad} de ${id}`}
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-crema-300 bg-white text-verde-950 transition-all hover:border-verde-400 hover:bg-verde-50"
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}

function precioEfectivo(p: ProductoApi): number {
  return p.descuento_activo && p.precio_descuento ? p.precio_descuento : p.precio_ref;
}

export function OrderBuilder({ compacto = false }: { compacto?: boolean }) {
  const config = useSiteConfig();
  const productos = config.productos.filter((p) => p.minimo > 0);

  const [cantidades, setCantidades] = useState<Record<string, number>>(() =>
    Object.fromEntries(productos.slice(0, 1).map((p) => [p.id, p.minimo]))
  );
  const [copiado, setCopiado] = useState(false);

  const setCantidad = (id: string, v: number) =>
    setCantidades((prev) => ({ ...prev, [id]: v }));

  const { total, lineas, sinDescuento } = useMemo(() => {
    let total = 0;
    let sinDescuento = 0;
    const lineas: string[] = [];
    for (const p of productos) {
      const cantidad = cantidades[p.id] ?? 0;
      if (cantidad > 0) {
        const efectivo = precioEfectivo(p);
        total += cantidad * efectivo;
        sinDescuento += cantidad * p.precio_ref;
        lineas.push(
          `• ${p.nombre}: ${cantidad} ${p.unidad}${cantidad > 1 && p.unidad === "botella" ? "s" : ""}`
        );
      }
    }
    return { total, lineas, sinDescuento };
  }, [cantidades, productos]);

  const mensaje = mensajePedido(lineas, cop.format(total));
  const link = waLink(mensaje);
  const hayDescuento = total < sinDescuento;

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
      <div className="bg-mesh-oscuro px-6 py-6 sm:px-8">
        <span className="eyebrow eyebrow-left eyebrow-light">Arme su pedido</span>
        <h3 className="mt-2 font-display text-2xl font-semibold text-crema-50">
          La calculadora del queso
        </h3>
      </div>

      <div className="grid gap-5 px-6 py-6 sm:px-8">
        {productos.map((p) => {
          const cantidad = cantidades[p.id] ?? 0;
          return (
            <div
              key={p.id}
              className="flex flex-wrap items-center justify-between gap-4 border-b border-crema-300/70 pb-5 last:border-0 last:pb-0"
            >
              <div>
                <p className="font-semibold text-verde-950">
                  {p.nombre}
                  {p.descuento_activo && p.precio_descuento && (
                    <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-verde-950/10 px-2 py-0.5 tnum text-[10px] font-semibold tracking-wide text-verde-950/75 uppercase">
                      <Tag className="h-3 w-3" aria-hidden="true" />
                      Descuento
                    </span>
                  )}
                </p>
                <p className="ficha mt-1 flex flex-wrap items-center gap-x-2 text-verde-950/60">
                  {p.descuento_activo && p.precio_descuento ? (
                    <>
                      <s className="text-verde-950/45">{cop.format(p.precio_ref)}</s>
                      <span className="font-semibold text-verde-950/60">
                        {cop.format(p.precio_descuento)}
                      </span>
                      <span className="text-verde-950/50">/ {p.unidad}</span>
                    </>
                  ) : (
                    <span>{precioUnidad(p)}</span>
                  )}
                </p>
              </div>
              <Stepper
                id={p.id}
                valor={cantidad}
                min={p.minimo}
                paso={p.paso}
                unidad={p.unidad}
                onChange={(v) => setCantidad(p.id, v)}
              />
            </div>
          );
        })}

        <div className="flex items-baseline justify-between rounded-2xl bg-verde-50 px-5 py-4">
          <span className="ficha tracking-widest text-verde-950 uppercase">Total estimado</span>
          <span className="text-right">
            <span className="tnum text-2xl font-semibold text-verde-950">
              {cop.format(total)}
            </span>
            {hayDescuento && (
              <s className="ml-2 tnum text-sm text-verde-950/45">
                {cop.format(sinDescuento)}
              </s>
            )}
          </span>
        </div>

        <div className="flex flex-wrap gap-3">
          <a href={link} target="_blank" rel="noopener noreferrer" className="btn btn-wa">
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
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

        <p className="text-xs leading-relaxed text-verde-950/60">
          Precios de referencia. El valor final y la entrega se confirman en el chat con{" "}
          {site.marca}. {compacto ? "" : "Atendemos 7 días a la semana."}
        </p>
      </div>
    </div>
  );
}
