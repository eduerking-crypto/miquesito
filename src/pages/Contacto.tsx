import { Clock, MapPin, MessageCircle, Truck } from "lucide-react";
import { Seo } from "../components/Seo";
import { OrderBuilder } from "../components/OrderBuilder";
import { Faq } from "../components/Faq";
import { site } from "../data/site";
import { MENSAJE_GENERAL, waLink } from "../lib/whatsapp";
import { Reveal, SectionHeading } from "../ui";

export function Contacto() {
  return (
    <>
      <Seo
        titulo="Contacto y pedidos"
        descripcion="Pida queso costeño y suero artesanales por WhatsApp. Atendemos 7 días a la semana con entregas diarias desde la Vereda Jinete (Rocha, Arjona — Bolívar)."
      />

      <section className="bg-mesh-claro py-20 sm:py-24">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              como="h1"
              eyebrow="Contacto y pedidos"
              titulo={
                <>
                  Hablemos <em className="text-oro-600 italic">del queso</em>
                </>
              }
              bajada="Pedidos, precios para tiendas o simplemente contarle dónde nos encuentra: todo pasa por WhatsApp."
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-crema-50 py-20 sm:py-24">
        <div className="container-x grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <Reveal>
            <OrderBuilder />
          </Reveal>

          <div className="grid gap-6">
            <Reveal delay={1}>
              <div className="card card-hover p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-verde-100 text-verde-800">
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 className="mt-4 font-display text-xl font-semibold text-verde-950">
                  WhatsApp directo
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-verde-900/75">
                  Escriba y le respondemos con precios, disponibilidad y cobertura de entrega.
                </p>
                <a
                  href={waLink(MENSAJE_GENERAL)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-wa btn-sm mt-4 px-6 py-3.5"
                >
                  Abrir chat
                </a>
              </div>
            </Reveal>

            <Reveal delay={2}>
              <div className="card card-hover p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-verde-100 text-verde-800">
                  <Clock className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 className="mt-4 font-display text-xl font-semibold text-verde-950">Horario</h2>
                <p className="mt-2 text-sm leading-relaxed text-verde-900/75">
                  {site.contacto.horario}. El queso se elabora en la mañana y sale a entrega el
                  mismo día.
                </p>
              </div>
            </Reveal>

            <Reveal delay={3}>
              <div className="card card-hover p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-verde-100 text-verde-800">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 className="mt-4 font-display text-xl font-semibold text-verde-950">Origen</h2>
                <p className="mt-2 text-sm leading-relaxed text-verde-900/75">
                  {site.contacto.ubicacion}.
                </p>
                <p className="mt-3 flex items-center gap-2 text-sm font-medium text-verde-700">
                  <Truck className="h-4 w-4 text-oro-600" aria-hidden="true" />
                  Entregas diarias a tiendas y hogares de la región
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-mesh-claro py-20 sm:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <SectionHeading
              eyebrow="Preguntas frecuentes"
              titulo="Antes de escribir, quizá esto le ayuda"
            />
          </Reveal>
          <Reveal delay={1}>
            <Faq />
          </Reveal>
        </div>
      </section>
    </>
  );
}
