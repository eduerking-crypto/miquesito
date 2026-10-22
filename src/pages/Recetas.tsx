import { ChefHat, Clock, ListChecks, UtensilsCrossed } from "lucide-react";
import { Seo } from "../components/Seo";
import { recetas, site } from "../data/site";
import { MENSAJE_GENERAL, waLink } from "../lib/whatsapp";
import { Reveal, SectionHeading } from "../ui";

export function Recetas() {
  return (
    <>
      <Seo
        titulo="Recetas"
        descripcion="Recetas de la sabana con queso costeño y suero Miquesito: arepa con queso, yuca con suero y tostones con queso rallado."
      />

      <section className="texture-dots bg-crema-100 py-16 sm:py-20">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              como="h1"
              eyebrow="En la mesa"
              titulo="La cocina de las sabanas, con Miquesito"
              bajada="Tres preparaciones de siempre, como se hacen en los hogares de Bolívar: simples, sabrosas y con queso fresco del día."
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-crema-50 py-16 sm:py-20">
        <div className="container-x grid gap-8 lg:grid-cols-3">
          {recetas.map((r, i) => (
            <Reveal key={r.nombre} delay={(i + 1) as 1 | 2 | 3}>
              <article className="card card-hover flex h-full flex-col p-7">
                <div className="flex items-center justify-between">
                  <span className="chip">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    {r.tiempo}
                  </span>
                  <span className="ficha text-verde-500">{r.ocasion}</span>
                </div>
                <h2 className="mt-4 font-display text-2xl leading-snug font-semibold text-verde-950">
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
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="texture-dots-crema bg-verde-950 py-16 sm:py-20">
        <div className="container-x flex flex-col items-center text-center">
          <Reveal>
            <ChefHat className="h-9 w-9 text-oro-300" aria-hidden="true" />
            <h2 className="mt-5 max-w-xl font-display text-3xl leading-tight font-semibold text-crema-50 sm:text-4xl">
              ¿Se le antojoó alguna? Pida los ingredientes hoy mismo
            </h2>
            <p className="mt-4 max-w-lg text-base text-crema-200/80">
              Queso y suero frescos de {site.origen}, en su mesa esta semana.
            </p>
            <a
              href={waLink(MENSAJE_GENERAL)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-wa mt-8 px-8 py-4 text-lg"
            >
              Pedir por WhatsApp
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
