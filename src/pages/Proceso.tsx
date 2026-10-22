import { Link } from "react-router-dom";
import { Droplets, Hand, Milk, PackageCheck, Quote, Sunrise, Truck } from "lucide-react";
import { Seo } from "../components/Seo";
import { OriginStrip } from "../components/OriginStrip";
import { proceso, site } from "../data/site";
import { MENSAJE_GENERAL, waLink } from "../lib/whatsapp";
import { Reveal, SectionHeading } from "../ui";

const iconos = { Sunrise, Milk, Droplets, Hand, PackageCheck, Truck } as const;

export function Proceso() {
  return (
    <>
      <Seo
        titulo="El proceso"
        descripcion="Del ordeño del amanecer a la entrega del mismo día: conozca cómo elaboramos el queso costeño artesanal y el suero en la Vereda Jinete."
      />

      <section className="texture-dots bg-crema-100 py-16 sm:py-20">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              como="h1"
              eyebrow="Del campo a su mesa"
              titulo="Un día completo de trabajo honesto"
              bajada="Así viaja la leche de la Vereda Jinete hasta su mesa: el mismo día, sin atajos."
            />
          </Reveal>
          <Reveal delay={1}>
            <OriginStrip className="mt-8 max-h-72" />
          </Reveal>
        </div>
      </section>

      <section className="bg-crema-50 py-16 sm:py-20">
        <div className="container-x mx-auto max-w-3xl">
          <ol className="relative grid gap-8 border-l-2 border-verde-200 pl-8 sm:pl-10">
            {proceso.map((paso, i) => {
              const Icono = iconos[paso.icono as keyof typeof iconos];
              return (
                <Reveal key={paso.titulo}>
                  <li className="relative">
                    <span
                      aria-hidden="true"
                      className="absolute top-0.5 -left-13 flex h-11 w-11 items-center justify-center rounded-full border-2 border-crema-50 bg-verde-700 text-crema-50 sm:-left-15"
                    >
                      <Icono className="h-5 w-5" />
                    </span>
                    <span className="ficha text-verde-500">
                      PASO {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="mt-1 font-display text-2xl font-semibold text-verde-950">
                      {paso.titulo}
                    </h2>
                    <p className="mt-2 text-[0.97rem] leading-relaxed text-verde-900/75">
                      {paso.texto}
                    </p>
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="texture-dots-crema bg-verde-950 py-16 sm:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <Reveal>
            <SectionHeading
              claro
              eyebrow="Nuestra promesa"
              titulo="Leche fresca del día, cuajo y sal"
              bajada="Sin historias raras: la receta es la de siempre y el ritmo también. Por eso el queso sabe a campo."
            />
            <p className="mt-5 max-w-xl text-base leading-relaxed text-crema-200/80">
              La producción es diaria (7 días a la semana) y cada entrega sale el mismo día de su
              elaboración. Así llegan a las tiendas y hogares de la región queso y suero con el
              sabor de la Vereda Jinete.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={waLink(MENSAJE_GENERAL)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-wa"
              >
                Probar el de hoy
              </a>
              <Link to="/productos" className="btn btn-outline-crema">
                Ver productos
              </Link>
            </div>
          </Reveal>
          <Reveal delay={1}>
            <figure className="rounded-3xl border border-crema-200/20 bg-verde-900/50 p-8">
              <Quote className="h-7 w-7 text-oro-300" aria-hidden="true" />
              <blockquote className="mt-4 font-display text-xl leading-snug text-crema-50">
                “{site.eslogan}”
              </blockquote>
              <figcaption className="mt-4 font-mono text-xs tracking-[0.18em] text-crema-200/70 uppercase">
                {site.marca} · {site.origen}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>
    </>
  );
}
