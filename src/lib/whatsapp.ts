import { site } from "../data/site";

export function waLink(mensaje: string): string {
  return `https://wa.me/${site.contacto.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}

export const MENSAJE_GENERAL =
  "¡Hola Miquesito! Vi su página y quiero hacer un pedido. ¿Me ayudan con precios y entrega?";

export const MENSAJE_TIENDA =
  "¡Hola Miquesito! Tengo un negocio y quiero recibir la ficha comercial para tiendas: presentaciones, precios y entrega.";

export function mensajePedido(lineas: string[], total: string): string {
  const cuerpo = lineas.length > 0 ? lineas.join("\n") + "\n" : "";
  return `¡Hola Miquesito! Quiero hacer este pedido:\n${cuerpo}Total estimado: ${total}.\n¿Me confirman precio y entrega?`;
}
