import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { productos as productosBase, site } from "../data/site";

export type ProductoApi = {
  id: string;
  nombre: string;
  apodo: string;
  descripcion: string;
  precio_min: number;
  precio_max: number;
  precio_ref: number;
  descuento_activo: boolean;
  precio_descuento: number | null;
  unidad: string;
  paso: number;
  minimo: number;
  imagen: string;
  orden: number;
};

export type SiteConfig = {
  whatsapp: string;
  promo: string | null;
  hero: { eyebrow: string; titulo: string; sub: string; imagen: string };
  eslogan: string;
  productos: ProductoApi[];
};

const DEFAULT_CONFIG: SiteConfig = {
  whatsapp: site.contacto.whatsapp,
  promo: null,
  hero: {
    eyebrow: "Vereda Jinete · Rocha — Arjona, Bolívar",
    titulo: "Tan natural como el campo.",
    sub: "Queso costeño artesanal elaborado a diario con la leche fresca de nuestros ganaderos. Del ordeño del amanecer a su mesa, el mismo día.",
    imagen: "/images/hero-campo.jpg",
  },
  eslogan: site.eslogan,
  productos: productosBase.map((p) => ({
    id: p.id,
    nombre: p.nombre,
    apodo: p.apodo,
    descripcion: p.descripcion,
    precio_min: p.id === "queso-costeno" ? 19000 : 5000,
    precio_max: p.id === "queso-costeno" ? 20000 : 5000,
    precio_ref: p.precioRef,
    descuento_activo: false,
    precio_descuento: null,
    unidad: p.unidad,
    paso: p.paso,
    minimo: p.min,
    imagen: p.id === "queso-costeno" ? "/images/queso-bloque.jpg" : "/images/suero-botella.jpg",
    orden: p.id === "queso-costeno" ? 1 : 2,
  })),
};

const ConfigCtx = createContext<SiteConfig>(DEFAULT_CONFIG);

export function ConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_CONFIG);

  useEffect(() => {
    let activo = true;
    fetch("/api/config")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("sin api"))))
      .then((data: Partial<SiteConfig>) => {
        if (!activo) return;
        setConfig({
          whatsapp: data.whatsapp || DEFAULT_CONFIG.whatsapp,
          promo: data.promo ?? null,
          hero: data.hero && data.hero.titulo ? data.hero : DEFAULT_CONFIG.hero,
          eslogan: data.eslogan || DEFAULT_CONFIG.eslogan,
          productos:
            data.productos && data.productos.length > 0
              ? data.productos
              : DEFAULT_CONFIG.productos,
        });
      })
      .catch(() => {
        /* sin API: usamos los valores estáticos */
      });
    return () => {
      activo = false;
    };
  }, []);

  return <ConfigCtx.Provider value={config}>{children}</ConfigCtx.Provider>;
}

export function useSiteConfig(): SiteConfig {
  return useContext(ConfigCtx);
}

export const cop = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

export function precioProducto(p: ProductoApi): string {
  if (p.precio_min === p.precio_max) return cop.format(p.precio_min);
  return `${cop.format(p.precio_min)} – ${cop.format(p.precio_max)}`;
}

export function precioUnidad(p: ProductoApi): string {
  const base = precioProducto(p);
  return p.unidad === "kg" ? `${base} / kg` : `${base} / botella`;
}
