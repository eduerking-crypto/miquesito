import { useState, type ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Clock, MapPin, Menu, MessageCircle, Sparkles, X } from "lucide-react";
import { site } from "../data/site";
import { useSiteConfig } from "../lib/config";
import { MENSAJE_GENERAL, waLink } from "../lib/whatsapp";
import { Logo, LogoMark } from "./Logo";
import { CadenaValor } from "../ui";

const nav = [
  { to: "/", label: "Inicio" },
  { to: "/nosotros", label: "Nosotros" },
  { to: "/productos", label: "Productos" },
  { to: "/proceso", label: "Proceso" },
  { to: "/tiendas", label: "Tiendas" },
  { to: "/recetas", label: "Recetas" },
  { to: "/contacto", label: "Contacto" },
];

function PromoBar() {
  const config = useSiteConfig();
  if (!config.promo) return null;
  return (
    <div className="flex items-center justify-center gap-2 bg-oro-400 px-4 py-2 text-center">
      <Sparkles className="h-4 w-4 flex-none text-verde-950" aria-hidden="true" />
      <p className="text-sm font-semibold text-verde-950">{config.promo}</p>
    </div>
  );
}

function Navbar() {
  const [abierto, setAbierto] = useState(false);
  const location = useLocation();
  const wa = waLink(MENSAJE_GENERAL);

  return (
    <header className="sticky top-0 z-50">
      <PromoBar />
      <div className="border-b border-crema-300/60 bg-crema-50/85 backdrop-blur-lg">
        <div className="container-x flex h-16 items-center justify-between gap-4">
          <Link to="/" aria-label="Miquesito — inicio" onClick={() => setAbierto(false)}>
            <Logo />
          </Link>

          <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `nav-link rounded-full px-3.5 py-2 text-[0.92rem] font-medium ${
                    isActive ? "text-verde-900" : "text-verde-900/65 hover:text-verde-900"
                  }`
                }
              >
                {({ isActive }) => <span data-activo={isActive}>{item.label}</span>}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm hidden sm:inline-flex"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Pedir
            </a>
            <button
              type="button"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-crema-300 bg-white text-verde-900 lg:hidden"
              aria-expanded={abierto}
              aria-controls="menu-movil"
              aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
              onClick={() => setAbierto((v) => !v)}
            >
              {abierto ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {abierto && (
        <nav
          id="menu-movil"
          aria-label="Principal móvil"
          className="border-b border-crema-300/60 bg-crema-50/97 px-5 pb-5 backdrop-blur-lg lg:hidden"
        >
          <ul className="grid gap-1 pt-2">
            {nav.map((item) => {
              const activo =
                item.to === "/" ? location.pathname === "/" : location.pathname.startsWith(item.to);
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={() => setAbierto(false)}
                    className={`block rounded-xl px-4 py-3 text-base font-medium ${
                      activo ? "bg-verde-100 text-verde-900" : "text-verde-900/75 hover:bg-verde-50"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li className="pt-2">
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary w-full"
                onClick={() => setAbierto(false)}
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Pedir por WhatsApp
              </a>
            </li>
          </ul>
        </nav>
      )}
      <span className="sr-only">{site.marca}</span>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-mesh-oscuro text-crema-100">
      <div className="container-x grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Logo claro />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-crema-200/80">{site.propuesta}</p>
          <div className="mt-6">
            <CadenaValor oscuro />
          </div>
        </div>

        <div>
          <h3 className="eyebrow eyebrow-left eyebrow-light">Explorar</h3>
          <ul className="mt-4 grid gap-2.5 text-sm">
            {nav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-crema-200/85 transition-colors hover:text-oro-300">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="eyebrow eyebrow-left eyebrow-light">Productos</h3>
          <ul className="mt-4 grid gap-2.5 text-sm">
            <li>
              <Link to="/productos" className="text-crema-200/85 transition-colors hover:text-oro-300">
                Queso costeño
              </Link>
            </li>
            <li>
              <Link to="/productos" className="text-crema-200/85 transition-colors hover:text-oro-300">
                Suero de leche
              </Link>
            </li>
            <li>
              <Link to="/tiendas" className="text-crema-200/85 transition-colors hover:text-oro-300">
                Ficha para tiendas
              </Link>
            </li>
            <li>
              <Link to="/recetas" className="text-crema-200/85 transition-colors hover:text-oro-300">
                Recetas
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow eyebrow-left eyebrow-light">Contacto</h3>
          <ul className="mt-4 grid gap-3 text-sm text-crema-200/85">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 flex-none text-oro-300" aria-hidden="true" />
              <span>{site.contacto.ubicacion}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Clock className="mt-0.5 h-4 w-4 flex-none text-oro-300" aria-hidden="true" />
              <span>{site.contacto.horario}</span>
            </li>
          </ul>
          <a href={waLink(MENSAJE_GENERAL)} target="_blank" rel="noopener noreferrer" className="btn btn-wa mt-5">
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Escríbanos
          </a>
        </div>
      </div>

      <div className="border-t border-crema-200/15">
        <div className="container-x flex flex-col gap-3 py-6 text-xs leading-relaxed text-crema-200/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.empresa} — {site.empresaCompleta}. {site.marca}® es
            una marca de {site.empresa}, iniciativa aliada de {site.alianzaSigla}.
          </p>
          <p className="flex items-center gap-2">
            <LogoMark className="h-5 w-5" />
            Hecho en la Vereda Jinete · Bolívar, Colombia
          </p>
        </div>
      </div>
    </footer>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:rounded-full focus:bg-verde-900 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-crema-50"
      >
        Saltar al contenido
      </a>
      <Navbar />
      <main id="contenido">{children}</main>
      <Footer />
      <a
        href={waLink(MENSAJE_GENERAL)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Pedir por WhatsApp"
        className="fixed right-5 bottom-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-wa-600 text-crema-50 shadow-[0_10px_30px_-8px_rgba(18,120,61,0.7)] transition-transform hover:scale-105 hover:bg-wa-700"
      >
        <MessageCircle className="h-6 w-6" aria-hidden="true" />
      </a>
    </>
  );
}
