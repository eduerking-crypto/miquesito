import { Link } from "react-router-dom";
import { ArrowRight, HandHeart, Leaf, Sprout } from "lucide-react";
import { Seo } from "../components/Seo";
import { historia, site, valores } from "../data/site";
import { CadenaValor, Reveal, SectionHeading } from "../ui";

export function Nosotros() {
  return (
    <>
      <Seo
        titulo="Nosotros"
        descripcion={`Conozca ${site.marca}: la historia de ${site.empresa} y ${site.alianzaSigla}, pequeños ganaderos de la Vereda Jinete que transforman su leche en queso costeño artesanal.`}
      />

      <section className="bg-mesh-claro overflow-hidden py-20 sm:py-24">
        <div className="container-x grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <SectionHeading
              como="h1"
              eyebrow="Quiénes somos"
              titulo={
                <>
                  Una vereda que decidió <em className="italic">transformar</em> su
                  leche
                </>
              }
              bajada={`${site.marca} es la marca con la que ${site.empresa} — ${site.empresaCompleta} — lleva sus productos a tiendas y hogares. Esta es la historia.`}
            />
          </Reveal>
          <Reveal delay={1}>
            <figure className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_36px_80px_-30px_rgba(18,59,23,0.4)]">
              <img
                src="/images/proceso-vacas.jpg"
                alt="Ganado de la Vereda Jinete pastando en la sabana"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-linear-to-t from-verde-950/45 to-transparent" />
            </figure>
          </Reveal>
        </div>
      </section>

      <section className="bg-crema-50 py-20 sm:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <Reveal>
            <p className="text-lg leading-relaxed text-verde-950/75">
              {site.empresa} nace como iniciativa aliada y estrechamente vinculada a{" "}
              <strong>{site.alianzaCompleta}</strong>. La asociación constituye la base social,
              productiva y comunitaria del proyecto: reúne a pequeños ganaderos que encuentran en la
              leche su sustento diario.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-verde-950/75">
              Durante mucho tiempo, la producción salía del territorio como materia prima. Hoy, esa
              misma leche se transforma aquí, en queso y suero con valor agregado.
            </p>
          </Reveal>
          <Reveal delay={1}>
            <div className="card bg-mesh-oscuro overflow-hidden p-8">
              <h3 className="font-display text-xl font-semibold text-crema-50">
                La cadena de valor
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-crema-200/80">
                Así funciona nuestra ruta: cada eslabón ocurre en el mismo territorio.
              </p>
              <div className="mt-6">
                <CadenaValor oscuro />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-mesh-claro py-20 sm:py-24">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              centrado
              eyebrow="Historia de marca"
              titulo="Tres capítulos de una misma vereda"
            />
          </Reveal>
          <ol className="mt-14 grid gap-7 lg:grid-cols-3">
            {historia.map((cap, i) => (
              <Reveal key={cap.capitulo} delay={(i + 1) as 1 | 2 | 3}>
                <li className="card card-hover h-full p-8">
                  <span className="font-display text-5xl font-semibold text-verde-950/30/60">
                    {cap.capitulo}
                  </span>
                  <h3 className="mt-4 font-display text-xl leading-snug font-semibold text-verde-950">
                    {cap.titulo}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-verde-950/70">{cap.texto}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-crema-50 py-20 sm:py-24">
        <div className="container-x grid gap-7 lg:grid-cols-2">
          <Reveal>
            <article className="card card-hover h-full p-9">
              <Sprout className="h-7 w-7 text-verde-950/60" aria-hidden="true" />
              <h3 className="mt-4 font-display text-2xl font-semibold text-verde-950">Misión</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-verde-950/70">{site.mision}</p>
            </article>
          </Reveal>
          <Reveal delay={1}>
            <article className="card card-hover h-full p-9">
              <Leaf className="h-7 w-7 text-verde-950/60" aria-hidden="true" />
              <h3 className="mt-4 font-display text-2xl font-semibold text-verde-950">Visión</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-verde-950/70">{site.vision}</p>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="bg-mesh-claro py-20 sm:py-24">
        <div className="container-x">
          <Reveal>
            <SectionHeading centrado eyebrow="Principios empresariales" titulo="Lo que nos mueve" />
          </Reveal>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {valores.map((v, i) => (
              <Reveal key={v.nombre} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <li className="card card-hover h-full p-7">
                  <h3 className="font-display text-lg font-semibold text-verde-950">{v.nombre}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-verde-950/70">{v.texto}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-mesh-oscuro py-20 sm:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <Reveal>
            <SectionHeading
              claro
              eyebrow="La alianza"
              titulo="ASOPEGAJIN produce, PROLACJIN transforma"
              bajada={`${site.alianzaSigla} representa la base asociativa, los productores y la capacidad de organización. ${site.empresa} representa la transformación y la generación de valor. ${site.marca} lleva el resultado a su mesa.`}
            />
          </Reveal>
          <Reveal delay={1}>
            <div className="card-glass p-9">
              <HandHeart className="h-8 w-8 text-crema-200/70" aria-hidden="true" />
              <blockquote className="mt-4 font-display text-xl leading-snug text-crema-50">
                “{site.fraseEstrategica}”
              </blockquote>
              <p className="mt-4 tnum text-xs tracking-[0.18em] text-crema-200/70 uppercase">
                Equipo {site.empresa} · Vereda Jinete
              </p>
              <Link to="/productos" className="btn btn-outline-crema btn-sm mt-7 px-6 py-3.5">
                Ver nuestros productos
                <ArrowRight className="flecha h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
