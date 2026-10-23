import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { ArrowRight, Droplet, GraduationCap, Leaf, Recycle, Sprout, TreePine } from "lucide-react";
import { Seo } from "../components/Seo";
import { ambiente, site } from "../data/site";
import { MENSAJE_GENERAL, waLink } from "../lib/whatsapp";
import { Reveal, SectionHeading } from "../ui";

const iconos = [Recycle, Leaf, TreePine, Droplet, Sprout, GraduationCap] as const;

function Shutter({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const figura = entry.target.firstElementChild;
            figura?.classList.add("is-in");
            obs.disconnect();
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative">
      <figure className={`shutter group relative overflow-hidden ${className}`}>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </figure>
    </div>
  );
}

export function Ambiente() {
  return (
    <>
      <Seo
        titulo="Ambiente y sabana"
        descripcion="Cuidamos la sabana que da origen a nuestra leche: abono orgánico, fertilización consciente, reforestación, cuidado del agua y educación ambiental en la Vereda Jinete, Bolívar."
      />

      <section className="relative overflow-hidden bg-verde-950 py-24 sm:py-28">
        <div className="absolute inset-0">
          <img
            src="/images/ambiente-sabana.jpg"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-linear-to-b from-verde-950/60 to-verde-950" />
        </div>
        <div className="container-x relative">
          <Reveal>
            <SectionHeading
              como="h1"
              claro
              eyebrow={ambiente.eyebrow}
              titulo={
                <>
                  La sabana también es <em className="italic">parte del queso</em>
                </>
              }
              bajada={ambiente.intro}
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-mesh-claro py-20 sm:py-24">
        <div className="container-x grid gap-16">
          {ambiente.pilares.map((p, i) => {
            const Icono = iconos[i % iconos.length];
            const invertido = i % 2 === 1;
            return (
              <Reveal key={p.id}>
                <article className="grid items-center gap-8 sm:gap-12 lg:grid-cols-[1fr_1.1fr]">
                  <div className={invertido ? "lg:order-2" : ""}>
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-verde-100 text-verde-800">
                      <Icono className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h2 className="mt-4 font-display text-2xl font-semibold text-verde-950 sm:text-3xl">
                      {p.titulo}
                    </h2>
                    <p className="mt-4 text-[1.02rem] leading-relaxed text-verde-950/70">
                      {p.texto}
                    </p>
                  </div>
                  <Shutter
                    src={p.foto}
                    alt={p.alt}
                    className={`aspect-[4/3] w-full rounded-2xl ${invertido ? "lg:order-1" : ""}`}
                  />
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="bg-verde-950 py-20 sm:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <Reveal>
            <SectionHeading
              claro
              eyebrow="Nuestro compromiso"
              titulo="Producir hoy sin agotar la sabana de mañana"
              bajada={ambiente.mensaje}
            />
          </Reveal>
          <Reveal delay={1}>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link to="/proceso" className="btn btn-outline-crema">
                Ver el proceso
                <ArrowRight className="flecha h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={waLink(MENSAJE_GENERAL)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-oro"
              >
                Pedir mi queso
              </a>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-crema-200/70 lg:ml-auto">
              {site.marca} — una marca de {site.empresa}, junto a los ganaderos de{" "}
              {site.alianzaSigla} en la Vereda Jinete.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
