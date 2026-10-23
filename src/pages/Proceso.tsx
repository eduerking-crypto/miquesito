import { Link } from "react-router-dom";
import { Quote } from "lucide-react";
import { Seo } from "../components/Seo";
import { proceso, site } from "../data/site";
import { useSiteConfig } from "../lib/config";
import { MENSAJE_GENERAL, waLink } from "../lib/whatsapp";
import { Reveal, SectionHeading, WaveDivider } from "../ui";

const iconosNombres: Record<string, string> = {
  Sunrise: "/images/proceso-vacas.jpg",
  Milk: "/images/proceso-ordeño.jpg",
  Droplets: "/images/proceso-tina.jpg",
  Hand: "/images/proceso-molde.jpg",
  PackageCheck: "/images/proceso-empaque.jpg",
  Truck: "/images/proceso-entrega.jpg",
};

export function Proceso() {
  const config = useSiteConfig();

  return (
    <>
      <Seo
        titulo="El proceso"
        descripcion="Del ordeño del amanecer a la entrega del mismo día: conozca cómo elaboramos el queso costeño artesanal y el suero en la Vereda Jinete."
      />

      <section className="relative overflow-hidden bg-verde-950 py-24 sm:py-28">
        <div className="absolute inset-0">
          <img
            src="/images/proceso-tina.jpg"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover opacity-45"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-linear-to-b from-verde-950/70 to-verde-950" />
        </div>
        <div className="container-x relative">
          <Reveal>
            <SectionHeading
              como="h1"
              claro
              eyebrow="Del campo a su mesa"
              titulo={
                <>
                  Un día completo de <em className="italic">trabajo honesto</em>
                </>
              }
              bajada="Así viaja la leche de la Vereda Jinete hasta su mesa: el mismo día, sin atajos."
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-crema-50 py-20 sm:py-24">
        <div className="container-x mx-auto max-w-4xl">
          <ol className="grid gap-10">
            {proceso.map((paso, i) => (
              <Reveal key={paso.titulo}>
                <li className="grid items-center gap-6 sm:grid-cols-[1fr_280px] sm:gap-10">
                  <div className="order-2 sm:order-1">
                    <span className="font-display text-6xl leading-none font-semibold text-verde-950/30/50">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="mt-3 font-display text-2xl font-semibold text-verde-950 sm:text-3xl">
                      {paso.titulo}
                    </h2>
                    <p className="mt-3 max-w-prose text-[0.98rem] leading-relaxed text-verde-950/70">
                      {paso.texto}
                    </p>
                  </div>
                  <figure className="group relative order-1 aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_28px_60px_-24px_rgba(18,59,23,0.4)] sm:order-2">
                    <img
                      src={iconosNombres[paso.icono]}
                      alt={paso.titulo}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </figure>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <WaveDivider color="var(--color-verde-950)" />
      <section className="bg-mesh-oscuro py-20 sm:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <Reveal>
            <SectionHeading
              claro
              eyebrow="Nuestra promesa"
              titulo="Leche fresca del día, cuajo y sal"
              bajada="Sin historias raras: la receta es la de siempre y el ritmo también. Por eso el queso sabe a campo."
            />
            <p className="mt-6 max-w-xl text-base leading-relaxed text-crema-200/80">
              La producción es diaria (7 días a la semana) y cada entrega sale el mismo día de su
              elaboración. Así llegan a las tiendas y hogares de la región queso y suero con el
              sabor de la Vereda Jinete.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={waLink(MENSAJE_GENERAL)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-oro"
              >
                Probar el de hoy
              </a>
              <Link to="/productos" className="btn btn-outline-crema">
                Ver productos
              </Link>
            </div>
          </Reveal>
          <Reveal delay={1}>
            <figure className="card-glass p-9">
              <Quote className="h-7 w-7 text-crema-200/70" aria-hidden="true" />
              <blockquote className="mt-4 font-display text-2xl leading-snug text-crema-50">
                “{config.eslogan || site.eslogan}”
              </blockquote>
              <figcaption className="mt-4 tnum text-xs tracking-[0.18em] text-crema-200/70 uppercase">
                {site.marca} · {site.origen}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>
      <WaveDivider flip />
    </>
  );
}
