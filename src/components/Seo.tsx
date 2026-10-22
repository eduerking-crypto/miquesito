import { useEffect } from "react";

export function Seo({ titulo, descripcion }: { titulo: string; descripcion?: string }) {
  useEffect(() => {
    document.title = `${titulo} — Miquesito`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta && descripcion) meta.setAttribute("content", descripcion);
    return () => {
      document.title = "Miquesito — Queso costeño artesanal de la Vereda Jinete";
    };
  }, [titulo, descripcion]);
  return null;
}
