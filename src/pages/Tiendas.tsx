import {
  ArrowRight,
  BadgeCheck,
  ClipboardList,
  HeartHandshake,
  MapPin,
  MessageCircle,
  PackageCheck,
  Store,
  Truck,
} from "lucide-react";
import { Seo } from "../components/Seo";
import { tiendas } from "../data/site";
import { MENSAJE_TIENDA, waLink } from "../lib/whatsapp";
import { Reveal, SectionHeading } from "../ui";

const iconos = {
  BadgeCheck,
  Truck,
  PackageCheck,
  MessageCircle,
  HeartHandshake,
  MapPin,
} as const;

export function Tiendas() {
  return (
    <>
      <Seo
        titulo="Para tiendas y negocios"
        descripcion="Queso costeño artesanal con marca para su tienda o negocio: precio directo de planta, entrega diaria y pedido simple por WhatsApp desde la Vereda Jinete."
      />

      <section className="bg-mesh-claro py-20 sm:py-24">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              como="h1"
              eyebrow="Canal comercial"
              titulo={tiendas.titulo}
              bajada={tiendas.intro}
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-crema-50 py-20 sm:py-24">
        <div className="container-x">
          <Reveal>
            <SectionHeading eyebrow="Beneficios" titulo="Por qué trabajar con Miquesito" />
          </Reveal>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tiendas.beneficios.map((b, i) => {
              const Icono = iconos[b.icono as keyof typeof iconos];
              return (
                <Reveal key={b.titulo} delay={((i % 3) + 1) as 1 | 2 | 3}>
                  <li className="card card-hover h-full p-7">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-verde-100 text-verde-800">
                      <Icono className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 font-display text-lg font-semibold text-verde-950">
                      {b.titulo}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-verde-900/70">{b.texto}</p>
                  </li>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="bg-mesh-claro py-20 sm:py-24">
        <div className="container-x grid gap-14 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <Reveal>
              <SectionHeading
                eyebrow="Cómo empezamos"
                titulo="Tres pasos y queso fresco en su mostrador"
              />
            </Reveal>
            <ol className="mt-12 grid gap-8">
              {tiendas.pasos.map((paso, i) => (
                <Reveal key={paso.titulo} delay={(i + 1) as 1 | 2 | 3}>
                  <li className="flex gap-6">
                    <span className="font-display text-5xl leading-none font-semibold text-oro-400/60">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-verde-950">
                        {paso.titulo}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-verde-900/70">
                        {paso.texto}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>

          <Reveal delay={1}>
            <div className="card overflow-hidden">
              <div className="bg-mesh-oscuro flex items-center justify-between px-7 py-5">
                <span className="eyebrow eyebrow-left eyebrow-light">Ficha comercial</span>
                <Store className="h-5 w-5 text-oro-300" aria-hidden="true" />
              </div>
              <div className="px-7 py-7">
                <dl className="ficha grid gap-2.5">
                  {[
                    ["Producto", "Queso costeño artesanal"],
                    ["Presentación", "Bloque 8–10 kg o porciones"],
                    ["Producción", "Diaria, 7 días/semana"],
                    ["Entrega", "Diaria en la región"],
                    ["Precio", "$19.000 – $20.000 / kg"],
                    ["Pedido", "WhatsApp, sin formatos"],
                    ["Complementario", "Suero de leche $5.000 / botella 1 L"],
                  ].map(([clave, valor]) => (
                    <div key={clave} className="flex flex-wrap gap-x-3">
                      <dt className="min-w-[8.5rem] text-verde-600">{clave}</dt>
                      <dd className="text-verde-900">{valor}</dd>
                    </div>
                  ))}
                </dl>
                <a
                  href={waLink(MENSAJE_TIENDA)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-wa mt-8 w-full"
                >
                  <ClipboardList className="h-4 w-4" aria-hidden="true" />
                  Solicitar ficha comercial
                </a>
                <p className="mt-3 text-center text-xs text-verde-900/60">
                  Respondemos el mismo día con precios y condiciones para su negocio.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-verde-950 py-24">
        <div
          aria-hidden="true"
          className="glow-anim pointer-events-none absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-oro-400/20 blur-[100px]"
        />
        <div className="container-x relative text-center">
          <Reveal>
            <h2 className="mx-auto max-w-2xl font-display text-3xl leading-tight font-semibold text-crema-50 sm:text-4xl">
              Su tienda, con queso fresco de la Vereda Jinete, todos los días
            </h2>
            <a
              href={waLink(MENSAJE_TIENDA)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-oro mt-9 px-8 py-4 text-base"
            >
              Hablemos por WhatsApp
              <ArrowRight className="flecha h-5 w-5" aria-hidden="true" />
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
