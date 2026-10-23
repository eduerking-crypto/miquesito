import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, Store, Wheat } from "lucide-react";
import { Seo } from "../components/Seo";
import { OrderBuilder } from "../components/OrderBuilder";
import { productos as productosFicha, site } from "../data/site";
import { cop, precioUnidad, useSiteConfig } from "../lib/config";
import { waLink } from "../lib/whatsapp";
import { Reveal, SectionHeading } from "../ui";

export function Productos() {
  const config = useSiteConfig();

  return (
    <>
      <Seo
        titulo="Productos"
        descripcion="Queso costeño artesanal y suero de leche elaborados a diario con leche fresca de la Vereda Jinete. Pida por WhatsApp."
      />

      <section className="bg-mesh-claro py-20 sm:py-24">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              como="h1"
              eyebrow="Nuestros productos"
              titulo={
                <>
                  Dos productos, <em className="italic">una misma leche</em>
                </>
              }
              bajada="Todo comienza con leche fresca de la mañana, de los ganaderos de ASOPEGAJIN en la Vereda Jinete. El resto es oficio: cuajo, sal y manos."
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-crema-50 py-20 sm:py-24">
        <div className="container-x grid gap-9 lg:grid-cols-2">
          {config.productos.map((p, i) => {
            const ficha = productosFicha.find((f) => f.id === p.id)?.ficha ?? [];
            const conDescuento = p.descuento_activo && p.precio_descuento;
            return (
              <Reveal key={p.id} delay={((i % 2) + 1) as 1 | 2}>
                <article className="card card-hover group flex h-full flex-col overflow-hidden">
                  <figure className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={p.imagen || "/images/queso-bloque.jpg"}
                      alt={p.nombre}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-verde-950/40 to-transparent" />
                    {conDescuento && (
                      <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-verde-950 px-3 py-1 tnum text-[11px] font-bold tracking-wide text-crema-50 uppercase">
                        <Wheat className="h-3.5 w-3.5" aria-hidden="true" />
                        En descuento
                      </span>
                    )}
                  </figure>

                  <div className="flex flex-1 flex-col p-8">
                    <p className="ficha text-verde-950/60">{p.apodo}</p>
                    <h2 className="mt-1.5 font-display text-3xl font-semibold text-verde-950">
                      {p.nombre}
                    </h2>

                    <p className="mt-4 text-[0.98rem] leading-relaxed text-verde-950/70">
                      {p.descripcion}
                    </p>

                    {ficha.length > 0 && (
                      <dl className="mt-6 grid gap-2.5 rounded-2xl bg-crema-100 p-5">
                        {ficha.map(([clave, valor]) => (
                          <div key={clave} className="flex flex-wrap gap-x-3 gap-y-0.5">
                            <dt className="ficha min-w-[7.5rem] text-verde-950/60">{clave}</dt>
                            <dd className="ficha text-verde-950">{valor}</dd>
                          </div>
                        ))}
                      </dl>
                    )}

                    <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
                      <p className="flex flex-wrap items-baseline gap-x-3">
                        {conDescuento ? (
                          <>
                            <span className="tnum text-xl font-semibold text-verde-950/60">
                              {cop.format(p.precio_descuento!)} / {p.unidad}
                            </span>
                            <s className="tnum text-sm text-verde-950/45">
                              {cop.format(p.precio_ref)} / {p.unidad}
                            </s>
                          </>
                        ) : (
                          <span className="tnum text-xl font-semibold text-verde-950">
                            {precioUnidad(p)}
                          </span>
                        )}
                      </p>
                      <a
                        href={waLink(
                          `¡Hola Miquesito! Quiero pedir ${p.nombre.toLowerCase()} (${
                            conDescuento
                              ? `${cop.format(p.precio_descuento!)} en descuento`
                              : precioUnidad(p)
                          }). ¿Me confirman disponibilidad y entrega?`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-wa btn-sm px-6 py-3.5"
                      >
                        <MessageCircle className="h-4 w-4" aria-hidden="true" />
                        Pedir {p.nombre.toLowerCase()}
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="bg-mesh-claro py-20 sm:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start">
          <Reveal>
            <SectionHeading
              eyebrow="Nuestra promesa"
              titulo="Leche del día, cuajo y sal. Nada más que contar."
            />
            <p className="mt-6 text-base leading-relaxed text-verde-950/70">
              Elaboramos todos los días de la semana, 7 de 7, en la Vereda Jinete. Cada bloque de
              8 a 10 kilos se porciona según el pedido y se empaca limpio el mismo día.
            </p>
            <div className="mt-7 flex items-start gap-3 rounded-2xl border border-crema-300 bg-crema-100 p-5">
              <Wheat className="mt-0.5 h-5 w-5 flex-none text-verde-950/60" aria-hidden="true" />
              <p className="text-sm leading-relaxed text-verde-950/70">
                Trabajamos con honestidad artesanal y avanzamos en nuestra formalización sanitaria
                para llevar la etiqueta {site.marca} cada vez más lejos.
              </p>
            </div>
            <Link to="/tiendas" className="btn btn-outline btn-sm mt-8 px-6 py-3.5">
              <Store className="h-4 w-4" aria-hidden="true" />
              ¿Tiene un negocio? Vea la ficha para tiendas
              <ArrowRight className="flecha h-4 w-4" aria-hidden="true" />
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
