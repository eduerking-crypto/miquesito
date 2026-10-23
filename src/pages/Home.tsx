import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  ChefHat,
  ChevronDown,
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
import { OrderBuilder } from "../components/OrderBuilder";
import { Faq } from "../components/Faq";
import { proceso, recetas, site } from "../data/site";
import { precioUnidad, useSiteConfig } from "../lib/config";
import { MENSAJE_GENERAL, waLink } from "../lib/whatsapp";
import { CadenaValor, CountUp, Marquee, Reveal, SectionHeading, WaveDivider } from "../ui";

const iconos = { Sunrise, Milk, Droplets, Hand, PackageCheck, Truck, BadgeCheck } as const;

const fotosProceso = [
  "/images/proceso-vacas.jpg",
  "/images/proceso-ordeño.jpg",
  "/images/proceso-tina.jpg",
  "/images/proceso-molde.jpg",
  "/images/proceso-empaque.jpg",
  "/images/proceso-entrega.jpg",
];

const fotosReceta: Record<string, string> = {
  "Arepa de maíz con queso costeño": "/images/receta-arepa.jpg",
  "Yuca con suero": "/images/receta-yuca.jpg",
  "Tostones con queso rallado": "/images/queso-hero.jpg",
};

function TituloAcentuado({ titulo }: { titulo: string }) {
  const partes = titulo.split(/(natural)/i);
  if (partes.length === 1) return <>{titulo}</>;
  return (
    <>
      {partes.map((parte, i) =>
        /natural/i.test(parte) ? (
          <em key={i} className="italic">
            {parte}
          </em>
        ) : (
          <span key={i}>{parte}</span>
        )
      )}
    </>
  );
}

function Hero() {
  const config = useSiteConfig();
  const wa = waLink(MENSAJE_GENERAL);
  const chips = ["480–520 L/día", "75–80 kg/día", "7/7 días", "100% Vereda Jinete"];

  return (
    <section className="relative flex min-h-[92svh] items-center overflow-hidden bg-verde-950">
      <div className="absolute inset-0">
        <img
          src={config.hero.imagen || "/images/hero-campo.jpg"}
          alt="Hato de ganado de la Vereda Jinete pastando en la sabana bajo luz dorada"
          className="parallax-img h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-verde-950/55" />
        <div className="absolute inset-0 bg-linear-to-b from-verde-950/60 via-transparent to-verde-950/30" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-oro-400/10 blur-3xl"
        />
      </div>

      <div className="container-x relative grid gap-10 py-24 sm:py-28">
        <div className="max-w-3xl">
          <Reveal>
            <span className="eyebrow eyebrow-light">{config.hero.eyebrow}</span>
          </Reveal>
          <Reveal delay={1}>
            <h1 className="mt-6 font-display text-display font-medium text-crema-50">
              <TituloAcentuado titulo={config.hero.titulo} />
            </h1>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-6 max-w-xl text-lead text-crema-100/90">{config.hero.sub}</p>
          </Reveal>
          <Reveal delay={3}>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-oro text-base">
                Pedir por WhatsApp
                <ArrowRight className="flecha h-4 w-4" aria-hidden="true" />
              </a>
              <Link to="/proceso" className="btn btn-outline-crema text-base">
                Ver el proceso
                <ArrowRight className="flecha h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={3}>
            <ul className="mt-10 flex flex-wrap gap-2.5" aria-label="Datos de la operación">
              {chips.map((chip) => (
                <li
                  key={chip}
                  className="card-glass px-4 py-2 tnum text-[11px] font-medium tracking-[0.14em] text-crema-100/90 uppercase"
                >
                  {chip}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 sm:flex flex-col items-center gap-1 text-crema-100/60"
      >
        <span className="tnum text-[10px] tracking-[0.3em] uppercase">Descubra</span>
        <ChevronDown className="h-5 w-5 animate-bounce" />
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="bg-mesh-claro py-16 sm:py-20">
      <div className="container-x grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Reveal>
          <div className="card card-hover h-full p-6 text-center sm:p-7">
            <p className="tnum text-4xl font-semibold text-verde-950 sm:text-5xl">
              <CountUp end={500} sufix=" L" />
            </p>
            <p className="ficha mt-2 text-verde-950/60">de leche fresca al día</p>
            <p className="mt-1 text-xs text-verde-950/50">(480–520 L)</p>
          </div>
        </Reveal>
        <Reveal delay={1}>
          <div className="card card-hover h-full p-6 text-center sm:p-7">
            <p className="tnum text-4xl font-semibold text-verde-950 sm:text-5xl">
              <CountUp end={80} sufix=" kg" />
            </p>
            <p className="ficha mt-2 text-verde-950/60">de queso elaborado a diario</p>
            <p className="mt-1 text-xs text-verde-950/50">(75–80 kg)</p>
          </div>
        </Reveal>
        <Reveal delay={2}>
          <div className="card card-hover h-full p-6 text-center sm:p-7">
            <p className="tnum text-4xl font-semibold text-verde-950 sm:text-5xl">
              <CountUp end={7} sufix="/7" />
            </p>
            <p className="ficha mt-2 text-verde-950/60">días de producción</p>
            <p className="mt-1 text-xs text-verde-950/50">toda la semana</p>
          </div>
        </Reveal>
        <Reveal delay={3}>
          <div className="card card-hover h-full p-6 text-center sm:p-7">
            <p className="tnum text-4xl font-semibold text-verde-950 sm:text-5xl">
              <CountUp end={100} sufix="%" />
            </p>
            <p className="ficha mt-2 text-verde-950/60">leche de ganaderos</p>
            <p className="mt-1 text-xs text-verde-950/50">de la Vereda Jinete</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Historia() {
  return (
    <section className="bg-mesh-claro pb-24 pt-4">
      <div className="container-x grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <Reveal>
          <SectionHeading
            eyebrow="Nuestra propuesta de valor"
            titulo={
              <>
                El valor del trabajo, <em className="italic">transformado</em> en
                queso
              </>
            }
          />
          <p className="mt-6 text-base leading-relaxed text-verde-950/70">
            {site.propuesta}
          </p>
          <p className="mt-4 text-base leading-relaxed text-verde-950/70">
            {site.marca} nace de {site.empresa} ({site.empresaCompleta}), iniciativa aliada de{" "}
            {site.alianzaSigla}: en lugar de que la leche salga del territorio como materia prima,
            la transformamos aquí mismo y el valor vuelve a las familias ganaderas.
          </p>
          <Link to="/nosotros" className="btn btn-outline btn-sm mt-8 px-6 py-3.5">
            Conozca la historia
            <ArrowRight className="flecha h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>

        <Reveal delay={1} className="relative">
          <figure className="group relative overflow-hidden rounded-[58%_42%_55%_45%/48%_58%_42%_52%] aspect-[4/5] shadow-[0_40px_90px_-30px_rgba(18,59,23,0.45)]">
            <img
              src="/images/queso-hero.jpg"
              alt="Quesos artesanales sobre mesa de madera rústica"
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </figure>
          <figure className="card-glass absolute -bottom-4 left-1/2 max-w-[300px] -translate-x-1/2 p-5 text-center lg:-left-10 lg:bottom-8 lg:translate-x-0">
            <Quote className="mx-auto h-5 w-5 text-crema-200/70" aria-hidden="true" />
            <blockquote className="mt-2 font-display text-sm leading-snug text-crema-50">
              “{site.fraseEstrategica}”
            </blockquote>
            <figcaption className="mt-2 tnum text-[10px] tracking-[0.18em] text-crema-200/70 uppercase">
              Equipo {site.empresa}
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

function ProductosHome() {
  const config = useSiteConfig();
  const productos = config.productos.slice(0, 2);

  return (
    <section className="bg-crema-50 py-24">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            centrado
            eyebrow="Nuestros productos"
            titulo="Dos sabores de la misma sabana"
            bajada="Queso costeño elaborado a diario y suero fresco de la misma leche. Simple, como debe ser."
          />
        </Reveal>
        <div className="mt-12 grid gap-7 md:grid-cols-2">
          {productos.map((p, i) => (
            <Reveal key={p.id} delay={(i + 1) as 1 | 2}>
              <article className="card card-hover group h-full overflow-hidden">
                <figure className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={p.imagen || "/images/queso-bloque.jpg"}
                    alt={p.nombre}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-verde-950/35 to-transparent" />
                  {p.descuento_activo && p.precio_descuento && (
                    <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-verde-950 px-3 py-1 tnum text-[11px] font-bold tracking-wide text-crema-50 uppercase">
                      <Wheat className="h-3.5 w-3.5" aria-hidden="true" />
                      En descuento
                    </span>
                  )}
                  <figcaption className="absolute right-4 bottom-4 card-glass px-3.5 py-1.5 tnum text-xs font-semibold text-crema-50">
                    {p.unidad === "kg" ? `${p.precio_min >= 0 ? "" : ""}$/kg` : "$/botella"}
                  </figcaption>
                </figure>
                <div className="p-7">
                  <p className="ficha text-verde-950/60">{p.apodo}</p>
                  <h3 className="mt-1.5 font-display text-2xl font-semibold text-verde-950">
                    {p.nombre}
                  </h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-verde-950/70">
                    {p.descripcion}
                  </p>
                  <p className="mt-5 flex flex-wrap items-baseline gap-x-3">
                    {p.descuento_activo && p.precio_descuento ? (
                      <>
                        <span className="tnum text-xl font-semibold text-verde-950/60">
                          {precioUnidad(p)}
                        </span>
                        <s className="tnum text-sm text-verde-950/45">
                          {precioUnidad({ ...p, descuento_activo: false })}
                        </s>
                      </>
                    ) : (
                      <span className="tnum text-xl font-semibold text-verde-950">
                        {precioUnidad(p)}
                      </span>
                    )}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal delay={2}>
          <p className="mt-9 text-center">
            <Link to="/productos" className="btn btn-primary btn-sm px-7 py-3.5">
              Ver fichas completas
              <ArrowRight className="flecha h-4 w-4" aria-hidden="true" />
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function ProcesoHome() {
  return (
    <section className="bg-crema-100 py-24">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            centrado
            eyebrow="Del campo a su mesa"
            titulo="El mismo día, sin atajos"
            bajada="Del ordeño del amanecer a la entrega: un día completo de trabajo honesto detrás de cada porción."
          />
        </Reveal>
        <ol className="mx-auto mt-14 max-w-4xl divide-y divide-crema-300/70">
          {proceso.map((paso, i) => {
            const Icono = iconos[paso.icono as keyof typeof iconos];
            return (
              <Reveal key={paso.titulo}>
                <li className="grid grid-cols-[auto_1fr] items-start gap-5 py-7 sm:grid-cols-[auto_1fr_220px] sm:gap-8">
                  <span className="font-display text-5xl leading-none font-semibold text-verde-950/30/50 sm:text-6xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <div className="flex items-center gap-2.5">
                      <Icono className="h-5 w-5 text-verde-950/60" aria-hidden="true" />
                      <h3 className="font-display text-xl font-semibold text-verde-950 sm:text-2xl">
                        {paso.titulo}
                      </h3>
                    </div>
                    <p className="mt-2 max-w-prose text-sm leading-relaxed text-verde-950/70 sm:text-[0.95rem]">
                      {paso.texto}
                    </p>
                  </div>
                  <figure className="hidden aspect-[4/3] overflow-hidden rounded-2xl sm:group sm:block">
                    <img
                      src={fotosProceso[i]}
                      alt={paso.titulo}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </figure>
                </li>
              </Reveal>
            );
          })}
        </ol>
        <Reveal>
          <p className="mt-8 text-center">
            <Link to="/proceso" className="link-underline font-semibold text-verde-950">
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
    <section className="bg-mesh-oscuro py-24">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
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
              <div key={titulo} className="card-glass p-6 transition-transform duration-300 hover:-translate-y-1">
                <Icono className="h-6 w-6 text-crema-200/70" aria-hidden="true" />
                <h3 className="mt-3 font-semibold text-crema-50">{titulo}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-crema-200/80">{texto}</p>
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
    <section className="bg-mesh-claro py-24">
      <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Reveal>
          <SectionHeading
            eyebrow="Pedidos"
            titulo={
              <>
                Arme su pedido en <em className="italic">un minuto</em>
              </>
            }
            bajada="Elija las cantidades, vea el valor estimado y envíe el pedido por WhatsApp. Confirmamos precio y entrega en el mismo chat."
          />
          <ul className="mt-7 grid gap-3.5 text-sm text-verde-950/70">
            <li className="flex items-center gap-3">
              <Clock className="h-4 w-4 flex-none text-verde-950/60" aria-hidden="true" />
              Atendemos 7 días a la semana
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="h-4 w-4 flex-none text-verde-950/60" aria-hidden="true" />
              Entregas diarias en la región
            </li>
            <li className="flex items-center gap-3">
              <BadgeCheck className="h-4 w-4 flex-none text-verde-950/60" aria-hidden="true" />
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
    <section className="bg-crema-50 py-24">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            centrado
            eyebrow="En la mesa"
            titulo="Recetas de la sabana con Miquesito"
          />
        </Reveal>
        <div className="mt-12 grid gap-7 md:grid-cols-3">
          {recetas.map((r, i) => (
            <Reveal key={r.nombre} delay={(i + 1) as 1 | 2 | 3}>
              <article className="card card-hover group h-full overflow-hidden">
                <figure className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={fotosReceta[r.nombre] ?? "/images/queso-hero.jpg"}
                    alt={r.nombre}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <figcaption className="absolute right-3 bottom-3 card-glass px-3 py-1 tnum text-[11px] font-medium text-crema-50">
                    {r.ocasion} · {r.tiempo}
                  </figcaption>
                </figure>
                <div className="p-6">
                  <h3 className="font-display text-xl leading-snug font-semibold text-verde-950">
                    {r.nombre}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-verde-950/70">
                    {r.ingredientes[0]} y más: receta completa en la sección.
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-9 text-center">
            <Link to="/recetas" className="btn btn-outline btn-sm px-7 py-3.5">
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
    <section className="bg-mesh-claro py-24">
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <SectionHeading eyebrow="Preguntas frecuentes" titulo="Lo que todos nos preguntan" />
        </Reveal>
        <Reveal delay={1}>
          <Faq limite={4} />
          <p className="mt-6 text-sm">
            <Link to="/contacto" className="link-underline font-semibold text-verde-950">
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
    <section className="relative overflow-hidden py-28">
      <div className="absolute inset-0">
        <img
          src="/images/proceso-vacas.jpg"
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-verde-950/78" />
        <div
          aria-hidden="true"
          className="glow-anim pointer-events-none absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-verde-950/10 blur-[100px]"
        />
      </div>
      <div className="container-x relative text-center">
        <Reveal>
          <h2 className="mx-auto max-w-2xl font-display text-3xl leading-tight font-semibold text-crema-50 sm:text-5xl">
            ¿Ya le dio antojo de un <em className="italic">buen queso</em> costeño?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lead text-crema-200/80">
            Pida el suyo hoy: queso fresco del amanecer, entregado el mismo día.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a
              href={waLink(MENSAJE_GENERAL)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-oro px-8 py-4 text-base"
            >
              Pedir por WhatsApp
              <ArrowRight className="flecha h-4 w-4" aria-hidden="true" />
            </a>
            <Link to="/productos" className="btn btn-outline-crema px-8 py-4 text-base">
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
      <Marquee
        items={[
          "Queso fresco todos los días",
          "Vereda Jinete · Rocha, Arjona",
          "Hecho a mano",
          "Leche del ordeño del amanecer",
          "Entregas diarias a la región",
          "ASOPEGAJIN × PROLACJIN",
        ]}
      />
      <Stats />
      <Historia />
      <ProductosHome />
      <ProcesoHome />
      <WaveDivider color="var(--color-verde-950)" />
      <Impacto />
      <WaveDivider flip />
      <Pedido />
      <RecetasHome />
      <FaqHome />
      <CtaFinal />
    </>
  );
}
