import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  ChefHat,
  Clock,
  Droplets,
  Hand,
  HeartHandshake,
  MapPin,
  Milk,
  PackageCheck,
  Quote,
  Store,
  Sunrise,
  Truck,
  Wheat,
} from "lucide-react";
import { Seo } from "../components/Seo";
import { OriginStrip } from "../components/OriginStrip";
import { OrderBuilder } from "../components/OrderBuilder";
import { Faq } from "../components/Faq";
import { content, productos, proceso, recetas, site } from "../data/site";
import { MENSAJE_GENERAL, waLink } from "../lib/whatsapp";
import { CadenaValor, QuesoWedge, Reveal, SectionHeading } from "../ui";

const iconos = {
  Sunrise,
  Milk,
  Droplets,
  Hand,
  PackageCheck,
  Truck,
  BadgeCheck,
} as const;

function Hero() {
  const wa = waLink(MENSAJE_GENERAL);
  return (
    <section className="texture-dots-crema relative overflow-hidden bg-verde-950">
      <div
        aria-hidden="true"
        className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-verde-800/50 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 -left-24 h-80 w-80 rounded-full bg-oro-600/15 blur-3xl"
      />

      <div className="container-x relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
        <div>
          <Reveal>
            <span className="eyebrow-light text-oro-300">{content.hero.eyebrow}</span>
          </Reveal>
          <Reveal delay={1}>
            <h1 className="mt-5 font-display text-4xl leading-[1.05] font-semibold tracking-tight text-crema-50 sm:text-6xl lg:text-[4.2rem]">
              {content.hero.titulo}
            </h1>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-crema-200/85">
              {content.hero.bajada}
            </p>
          </Reveal>
          <Reveal delay={3}>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="btn px-7 py-3.5 text-base bg-oro-400 text-verde-950 hover:bg-oro-300"
              >
                {content.hero.ctaPrincipal}
              </a>
              <Link to="/proceso" className="btn btn-outline-crema btn-sm px-7 py-3.5 text-base">
                {content.hero.ctaSecundaria}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal delay={2} className="hidden lg:block">
          <div className="relative mx-auto max-w-sm -rotate-2">
            <div className="rounded-3xl border-2 border-crema-200/50 bg-crema-100 p-8 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.55)]">
              <div className="flex items-start justify-between">
                <p className="ficha text-verde-800">QUESO COSTEÑO ARTESANAL</p>
                <Wheat className="h-5 w-5 text-oro-600" aria-hidden="true" />
              </div>
              <div className="mt-6 flex justify-center">
                <QuesoWedge className="h-40 w-40 drop-shadow-md" />
              </div>
              <p className="mt-6 text-center font-display text-4xl font-semibold text-verde-950">
                Miquesito
              </p>
              <p className="mt-2 text-center font-display text-lg text-verde-800 italic">
                “{site.eslogan}”
              </p>
              <div className="mt-6 grid gap-1 border-t border-verde-900/15 pt-4 text-center">
                <p className="ficha text-verde-700">ELABORADO A DIARIO · 7 DÍAS</p>
                <p className="ficha text-verde-700">VEREDA JINETE — ROCHA, ARJONA</p>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-5 flex h-24 w-24 rotate-12 items-center justify-center rounded-full border-2 border-oro-400/80 bg-verde-950 text-center font-mono text-[0.62rem] leading-snug font-semibold tracking-widest text-oro-300">
              HECHO
              <br />
              A MANO
            </div>
          </div>
        </Reveal>
      </div>

      <svg
        aria-hidden="true"
        viewBox="0 0 1440 70"
        preserveAspectRatio="none"
        className="relative block w-full fill-crema-50"
      >
        <path d="M0 70 L0 30 C 240 62 480 8 720 26 C 960 44 1200 18 1440 40 L1440 70 Z" />
      </svg>
    </section>
  );
}

function FranjaOrigen() {
  return (
    <section aria-label="Del campo a su mesa" className="overflow-hidden bg-crema-50">
      <div className="container-x">
        <OriginStrip className="max-h-72" />
      </div>
      <div className="container-x -mt-6 pb-12">
        <CadenaValor />
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="bg-crema-50 pb-16">
      <div className="container-x grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {site.stats.map((stat, i) => (
          <Reveal key={stat.etiqueta} delay={((i % 3) + 1) as 1 | 2 | 3}>
            <div className="card card-hover h-full px-5 py-6 text-center sm:px-6">
              <p className="font-mono text-3xl font-semibold text-verde-700 sm:text-4xl">
                {stat.valor}
                {stat.unidad && (
                  <span className="ml-1 text-base font-medium text-oro-600">{stat.unidad}</span>
                )}
              </p>
              <p className="mt-2 text-sm leading-snug text-verde-900/70">{stat.etiqueta}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Propuesta() {
  return (
    <section className="bg-crema-50 pb-20">
      <div className="container-x grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
        <Reveal>
          <SectionHeading
            eyebrow="Nuestra propuesta de valor"
            titulo="El valor del trabajo, transformado en queso"
            bajada={site.propuesta}
          />
          <p className="mt-6 text-base leading-relaxed text-verde-900/75">
            {site.marca} nace de {site.empresa} ({site.empresaCompleta}), iniciativa aliada de{" "}
            {site.alianzaSigla}: en lugar de que la leche salga del territorio como materia prima,
            la transformamos aquí mismo y el valor vuelve a las familias ganaderas.
          </p>
          <Link to="/nosotros" className="btn btn-outline btn-sm mt-7 px-6 py-3">
            Conozca la historia
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>

        <Reveal delay={1}>
          <figure className="card relative overflow-hidden bg-verde-950 px-8 py-12 text-center">
            <Quote className="mx-auto h-8 w-8 text-oro-400" aria-hidden="true" />
            <blockquote className="mt-5 font-display text-2xl leading-snug font-medium text-crema-50 sm:text-[1.7rem]">
              “{site.fraseEstrategica}”
            </blockquote>
            <figcaption className="mt-6 font-mono text-xs tracking-[0.18em] text-crema-200/70 uppercase">
              Equipo {site.empresa} · Vereda Jinete
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

function ProductosHome() {
  return (
    <section className="bg-white py-20">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            eyebrow="Nuestros productos"
            titulo="Dos sabores de la misma sabana"
            bajada="Queso costeño elaborado a diario y suero fresco de la misma leche. Simple, como debe ser."
          />
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {productos.map((p, i) => (
            <Reveal key={p.id} delay={(i + 1) as 1 | 2}>
              <article className="card card-hover flex h-full flex-col gap-4 p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="ficha text-verde-600">{p.apodo}</p>
                    <h3 className="mt-1 font-display text-2xl font-semibold text-verde-950">
                      {p.nombre}
                    </h3>
                  </div>
                  {p.id === "queso-costeno" ? (
                    <QuesoWedge className="h-16 w-16 flex-none" />
                  ) : (
                    <svg viewBox="0 0 64 64" className="h-16 w-16 flex-none" aria-hidden="true">
                      <path d="M26 6 h12 l3 6 v6 h-18 v-6 z" fill="#93c97b" />
                      <rect x="21" y="17" width="22" height="40" rx="6" fill="#eff6ea" stroke="#bbdfa6" strokeWidth="2" />
                      <path d="M23 30 h18 v25 a4 4 0 0 1 -4 4 h-10 a4 4 0 0 1 -4 -4 z" fill="#e9c46a" opacity="0.85" />
                      <rect x="29" y="9" width="6" height="4" rx="2" fill="#4a9338" />
                    </svg>
                  )}
                </div>
                <p className="text-[0.95rem] leading-relaxed text-verde-900/75">{p.descripcion}</p>
                <p className="mt-auto font-mono text-lg font-semibold text-verde-700">{p.precio}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal delay={2}>
          <div className="mt-8 text-center">
            <Link to="/productos" className="btn btn-primary btn-sm px-6 py-3">
              Ver fichas completas
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ProcesoHome() {
  return (
    <section className="bg-crema-100 py-20">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            eyebrow="Del campo a su mesa"
            titulo="El mismo día, sin atajos"
            bajada="Del ordeño del amanecer a la entrega: un día completo de trabajo honesto detrás de cada porción."
            centrado
          />
        </Reveal>
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {proceso.map((paso, i) => {
            const Icono = iconos[paso.icono as keyof typeof iconos];
            return (
              <Reveal key={paso.titulo} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <li className="card card-hover h-full p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-verde-700 text-crema-50">
                      <Icono className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="ficha text-verde-500">PASO {String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mt-4 font-display text-xl font-semibold text-verde-950">
                    {paso.titulo}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-verde-900/70">{paso.texto}</p>
                </li>
              </Reveal>
            );
          })}
        </ol>
        <Reveal>
          <p className="mt-8 text-center">
            <Link to="/proceso" className="link-underline font-semibold text-verde-800">
              Conozca el proceso completo
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Impacto() {
  return (
    <section className="texture-dots-crema bg-verde-950 py-20">
      <div className="container-x grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <Reveal>
          <SectionHeading
            claro
            eyebrow="Impacto comunitario"
            titulo="Detrás de cada queso hay familias ganaderas"
            bajada={`Cada producto ${site.marca} comienza con el trabajo diario de los pequeños ganaderos de ${site.alianzaSigla} en la Vereda Jinete. Cuando el queso vale más, el trabajo de ellos vale más.`}
          />
          <div className="mt-8">
            <CadenaValor oscuro />
          </div>
        </Reveal>
        <Reveal delay={1}>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                Icono: HeartHandshake,
                titulo: "Base asociativa",
                texto: `${site.alianzaSigla} reúne a pequeños ganaderos de la comunidad afrodescendiente de la Vereda Jinete.`,
              },
              {
                Icono: Milk,
                titulo: "Producción propia",
                texto: "La leche no se compra afuera: la producen los ganaderos socios de la asociación.",
              },
              {
                Icono: Store,
                titulo: "Comercio cercano",
                texto: "Tiendas, distribuidores y hogares de la región reciben queso fresco todos los días.",
              },
              {
                Icono: BadgeCheck,
                titulo: "Origen trazable",
                texto: "De la vereda a la mesa: sabemos el nombre de cada finca que aporta la leche.",
              },
            ].map(({ Icono, titulo, texto }) => (
              <div
                key={titulo}
                className="rounded-2xl border border-crema-200/20 bg-verde-900/50 p-5"
              >
                <Icono className="h-6 w-6 text-oro-300" aria-hidden="true" />
                <h3 className="mt-3 font-semibold text-crema-50">{titulo}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-crema-200/75">{texto}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Pedido() {
  return (
    <section className="bg-crema-50 py-20">
      <div className="container-x grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Reveal>
          <SectionHeading
            eyebrow="Pedidos"
            titulo="Arme su pedido en un minuto"
            bajada="Elija las cantidades, vea el valor estimado y envíe el pedido por WhatsApp. Confirmamos precio y entrega en el mismo chat."
          />
          <ul className="mt-6 grid gap-3 text-sm text-verde-900/75">
            <li className="flex items-center gap-2.5">
              <Clock className="h-4 w-4 flex-none text-oro-600" aria-hidden="true" />
              Atendemos 7 días a la semana
            </li>
            <li className="flex items-center gap-2.5">
              <MapPin className="h-4 w-4 flex-none text-oro-600" aria-hidden="true" />
              Entregas diarias en la región
            </li>
            <li className="flex items-center gap-2.5">
              <BadgeCheck className="h-4 w-4 flex-none text-oro-600" aria-hidden="true" />
              Precio especial para tiendas
            </li>
          </ul>
        </Reveal>
        <Reveal delay={1}>
          <OrderBuilder />
        </Reveal>
      </div>
    </section>
  );
}

function RecetasHome() {
  return (
    <section className="bg-white py-20">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            eyebrow="En la mesa"
            titulo="Recetas de la sabana con Miquesito"
            centrado
          />
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {recetas.map((r, i) => (
            <Reveal key={r.nombre} delay={(i + 1) as 1 | 2 | 3}>
              <article className="card card-hover h-full p-6">
                <div className="flex items-center justify-between">
                  <span className="chip">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    {r.tiempo}
                  </span>
                  <span className="ficha text-verde-500">{r.ocasion}</span>
                </div>
                <h3 className="mt-4 font-display text-xl leading-snug font-semibold text-verde-950">
                  {r.nombre}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-verde-900/70">
                  {r.ingredientes[0]} y más: receta completa en la sección.
                </p>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-8 text-center">
            <Link to="/recetas" className="btn btn-outline btn-sm px-6 py-3">
              <ChefHat className="h-4 w-4" aria-hidden="true" />
              Ver las recetas
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function FaqHome() {
  return (
    <section className="bg-crema-100 py-20">
      <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <SectionHeading eyebrow="Preguntas frecuentes" titulo="Lo que todos nos preguntan" />
        </Reveal>
        <Reveal delay={1}>
          <Faq limite={4} />
          <p className="mt-5 text-sm">
            <Link to="/contacto" className="link-underline font-semibold text-verde-800">
              Ver todas las preguntas
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function CtaFinal() {
  return (
    <section className="texture-dots-crema relative overflow-hidden bg-verde-950 py-20">
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-oro-600/10 blur-3xl"
      />
      <div className="container-x relative text-center">
        <Reveal>
          <h2 className="mx-auto max-w-2xl font-display text-3xl leading-tight font-semibold text-crema-50 sm:text-5xl">
            ¿Ya le dio antojo de un buen queso costeño?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-crema-200/80">
            Pida el suyo hoy: queso fresco del amanecer, entregado el mismo día.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={waLink(MENSAJE_GENERAL)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-wa px-8 py-4 text-lg"
            >
              Pedir por WhatsApp
            </a>
            <Link to="/productos" className="btn btn-outline-crema px-8 py-4 text-lg">
              Ver productos
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Home() {
  return (
    <>
      <Seo
        titulo="Queso costeño artesanal de la Vereda Jinete"
        descripcion="Queso costeño artesanal elaborado a diario con leche fresca de los ganaderos de la Vereda Jinete (Rocha, Arjona — Bolívar). Pida por WhatsApp: tan natural como el campo."
      />
      <Hero />
      <FranjaOrigen />
      <Stats />
      <Propuesta />
      <ProductosHome />
      <ProcesoHome />
      <Impacto />
      <Pedido />
      <RecetasHome />
      <FaqHome />
      <CtaFinal />
    </>
  );
}
