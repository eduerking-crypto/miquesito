import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, Store, Wheat } from "lucide-react";
import { Seo } from "../components/Seo";
import { OrderBuilder } from "../components/OrderBuilder";
import { productos, site } from "../data/site";
import { waLink } from "../lib/whatsapp";
import { QuesoWedge, Reveal, SectionHeading } from "../ui";

export function Productos() {
  return (
    <>
      <Seo
        titulo="Productos"
        descripcion="Queso costeño artesanal ($19.000–$20.000/kg) y suero de leche ($5.000/botella de 1 L), elaborados a diario con leche fresca de la Vereda Jinete. Pida por WhatsApp."
      />

      <section className="texture-dots bg-crema-100 py-16 sm:py-20">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              como="h1"
              eyebrow="Nuestros productos"
              titulo="Dos productos, una misma leche"
              bajada="Todo comienza con leche fresca de la mañana, de los ganaderos de ASOPEGAJIN en la Vereda Jinete. El resto es oficio: cuajo, sal y manos."
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-crema-50 py-16 sm:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          {productos.map((p, i) => (
            <Reveal key={p.id} delay={((i % 2) + 1) as 1 | 2}>
              <article className="card card-hover flex h-full flex-col p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="ficha text-verde-600">{p.apodo}</p>
                    <h2 className="mt-1 font-display text-3xl font-semibold text-verde-950">
                      {p.nombre}
                    </h2>
                  </div>
                  {p.id === "queso-costeno" ? (
                    <QuesoWedge className="h-20 w-20 flex-none" />
                  ) : (
                    <svg viewBox="0 0 64 64" className="h-20 w-20 flex-none" aria-hidden="true">
                      <path d="M26 6 h12 l3 6 v6 h-18 v-6 z" fill="#93c97b" />
                      <rect x="21" y="17" width="22" height="40" rx="6" fill="#eff6ea" stroke="#bbdfa6" strokeWidth="2" />
                      <path d="M23 30 h18 v25 a4 4 0 0 1 -4 4 h-10 a4 4 0 0 1 -4 -4 z" fill="#e9c46a" opacity="0.85" />
                      <rect x="29" y="9" width="6" height="4" rx="2" fill="#4a9338" />
                    </svg>
                  )}
                </div>

                <p className="mt-4 text-[0.98rem] leading-relaxed text-verde-900/75">
                  {p.descripcion}
                </p>

                <dl className="mt-6 grid gap-2.5 rounded-2xl bg-crema-100 p-5">
                  {p.ficha.map(([clave, valor]) => (
                    <div key={clave} className="flex flex-wrap gap-x-3 gap-y-0.5">
                      <dt className="ficha min-w-[7.5rem] text-verde-600">{clave}</dt>
                      <dd className="ficha text-verde-900">{valor}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                  <p className="font-mono text-xl font-semibold text-verde-700">{p.precio}</p>
                  <a
                    href={waLink(
                      `¡Hola Miquesito! Quiero pedir ${p.nombre.toLowerCase()} (${p.precio}). ¿Me confirman disponibilidad y entrega?`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-wa btn-sm px-6 py-3"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    Pedir {p.nombre.toLowerCase()}
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
          <Reveal>
            <SectionHeading
              eyebrow="Nuestra promesa"
              titulo="Leche del día, cuajo y sal. Nada más que contar."
            />
            <p className="mt-5 text-base leading-relaxed text-verde-900/75">
              Elaboramos todos los días de la semana, 7 de 7, en la Vereda Jinete. Cada bloque de
              8 a 10 kilos se porciona según el pedido y se empaca limpio el mismo día.
            </p>
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-crema-300 bg-crema-100 p-5">
              <Wheat className="mt-0.5 h-5 w-5 flex-none text-oro-600" aria-hidden="true" />
              <p className="text-sm leading-relaxed text-verde-900/75">
                Trabajamos con honestidad artesanal y avanzamos en nuestra formalización sanitaria
                para llevar la etiqueta {site.marca} cada vez más lejos.
              </p>
            </div>
            <Link to="/tiendas" className="btn btn-outline btn-sm mt-7 px-6 py-3">
              <Store className="h-4 w-4" aria-hidden="true" />
              ¿Tiene un negocio? Vea la ficha para tiendas
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
          <Reveal delay={1}>
            <OrderBuilder compacto />
          </Reveal>
        </div>
      </section>
    </>
  );
}
