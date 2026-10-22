import { ChefHat, Clock, ListChecks, UtensilsCrossed } from "lucide-react";
import { Seo } from "../components/Seo";
import { recetas, site } from "../data/site";
import { MENSAJE_GENERAL, waLink } from "../lib/whatsapp";
import { Reveal, SectionHeading } from "../ui";

const fotosReceta: Record<string, string> = {
  "Arepa de maíz con queso costeño": "/images/receta-arepa.jpg",
  "Yuca con suero": "/images/receta-yuca.jpg",
  "Tostones con queso rallado": "/images/queso-hero.jpg",
};

export function Recetas() {
  return (
    <>
      <Seo
        titulo="Recetas"
        descripcion="Recetas de la sabana con queso costeño y suero Miquesito: arepa con queso, yuca con suero y tostones con queso rallado."
      />

      <section className="bg-mesh-claro py-20 sm:py-24">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              como="h1"
              eyebrow="En la mesa"
              titulo={
                <>
                  La cocina de las sabanas, <em className="text-oro-600 italic">con Miquesito</em>
                </>
              }
              bajada="Tres preparaciones de siempre, como se hacen en los hogares de Bolívar: simples, sabrosas y con queso fresco del día."
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-crema-50 py-20 sm:py-24">
        <div className="container-x grid gap-8 lg:grid-cols-3">
          {recetas.map((r, i) => (
            <Reveal key={r.nombre} delay={(i + 1) as 1 | 2 | 3}>
              <article className="card card-hover group flex h-full flex-col overflow-hidden">
                <figure className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={fotosReceta[r.nombre] ?? "/images/queso-hero.jpg"}
                    alt={r.nombre}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <figcaption className="card-glass absolute right-3 bottom-3 px-3 py-1 font-mono text-[11px] font-medium text-crema-50">
                    {r.ocasion} · {r.tiempo}
                  </figcaption>
                </figure>

                <div className="flex flex-1 flex-col p-7">
                  <h2 className="font-display text-2xl leading-snug font-semibold text-verde-950">
                    {r.nombre}
                  </h2>

                  <div className="mt-5">
                    <h3 className="flex items-center gap-2 text-sm font-bold tracking-wide text-verde-800 uppercase">
                      <UtensilsCrossed className="h-4 w-4 text-oro-600" aria-hidden="true" />
                      Ingredientes
                    </h3>
                    <ul className="ficha mt-2.5 grid gap-1.5 text-verde-900/85">
                      {r.ingredientes.map((ing) => (
                        <li key={ing} className="flex gap-2">
                          <span aria-hidden="true" className="text-oro-500">
                            •
                          </span>
                          {ing}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-5">
                    <h3 className="flex items-center gap-2 text-sm font-bold tracking-wide text-verde-800 uppercase">
                      <ListChecks className="h-4 w-4 text-oro-600" aria-hidden="true" />
                      Preparación
                    </h3>
                    <ol className="mt-2.5 grid gap-2 text-sm leading-relaxed text-verde-900/80">
                      {r.pasos.map((paso, j) => (
                        <li key={paso} className="flex gap-2.5">
                          <span className="font-mono text-xs font-semibold text-verde-600">
                            {String(j + 1).padStart(2, "0")}
                          </span>
                          {paso}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-verde-950 py-24">
        <div className="absolute inset-0">
          <img
            src="/images/queso-hero.jpg"
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="h-full w-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-linear-to-b from-verde-950/60 to-verde-950" />
        </div>
        <div className="container-x relative flex flex-col items-center text-center">
          <Reveal>
            <ChefHat className="h-9 w-9 text-oro-300" aria-hidden="true" />
            <h2 className="mx-auto mt-5 max-w-xl font-display text-3xl leading-tight font-semibold text-crema-50 sm:text-4xl">
              ¿Se le antojó alguna? Pida los ingredientes hoy mismo
            </h2>
            <p className="mt-4 flex items-center gap-2 text-base text-crema-200/85">
              <Clock className="h-4 w-4 text-oro-300" aria-hidden="true" />
              Queso y suero frescos de {site.origen}, en su mesa esta semana.
            </p>
            <a
              href={waLink(MENSAJE_GENERAL)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-oro mt-8 px-8 py-4 text-base"
            >
              Pedir por WhatsApp
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
