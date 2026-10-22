export const site = {
  marca: "Miquesito",
  empresa: "PROLACJIN",
  empresaCompleta: "Productos Lácteos de la Vereda Jinete",
  alianzaSigla: "ASOPEGAJIN",
  alianzaCompleta:
    "Asociación de Pequeños Ganaderos Afrodescendientes de la Vereda Jinete (Rocha — Arjona)",
  eslogan: "Tan natural como el campo.",
  origen: "Vereda Jinete · Corregimiento de Rocha · Arjona, Bolívar",
  dominio: "miquesito.com",
  propuesta:
    "Transformamos la leche de los pequeños ganaderos de la Vereda Jinete en queso costeño y suero artesanales, elaborados a mano todos los días.",
  fraseEstrategica:
    "No queremos solamente producir la leche; queremos transformar el valor de nuestro trabajo.",
  contacto: {
    whatsapp: "573148454059",
    horario: "Lunes a domingo · producción y entregas diarias",
    ubicacion: "Vereda Jinete, corregimiento de Rocha (Arjona), Bolívar, Colombia",
  },
  stats: [
    { valor: "480–520", unidad: "L/día", etiqueta: "de leche fresca procesada" },
    { valor: "75–80", unidad: "kg/día", etiqueta: "de queso elaborado a diario" },
    { valor: "7/7", unidad: "días", etiqueta: "de producción toda la semana" },
    { valor: "100%", unidad: "", etiqueta: "leche de ganaderos de la Vereda Jinete" },
  ],
  cadena: [
    "ASOPEGAJIN",
    "Producción",
    "PROLACJIN",
    "Transformación",
    "Valor agregado",
    "Oportunidades",
  ],
  mision:
    "Transformar la leche producida por pequeños ganaderos de la Vereda Jinete vinculados a ASOPEGAJIN en productos lácteos con valor agregado, calidad, presentación y servicio orientados a las necesidades de nuestros clientes, fortaleciendo la capacidad productiva de la asociación, generando mayores oportunidades para sus productores y contribuyendo al desarrollo económico del territorio.",
  vision:
    "Ser una iniciativa empresarial aliada de ASOPEGAJIN, reconocida en la región por transformar y agregar valor a la producción de leche de sus pequeños ganaderos, por la calidad y presentación de sus productos y por su identidad territorial, consolidando una operación sostenible que fortalezca a los productores y amplíe responsablemente sus mercados y líneas de productos.",
};

export type Producto = {
  id: string;
  nombre: string;
  apodo: string;
  descripcion: string;
  precio: string;
  precioRef: number;
  unidad: "kg" | "botella";
  paso: number;
  min: number;
  ficha: [string, string][];
};

export const productos: Producto[] = [
  {
    id: "queso-costeno",
    nombre: "Queso costeño",
    apodo: "El de todos los días",
    descripcion:
      "Leche fresca de la mañana, cuajo y sal. Firme y sabroso como manda la tradición de las sabanas de Bolívar.",
    precio: "$19.000 – $20.000 / kg",
    precioRef: 19500,
    unidad: "kg",
    paso: 0.5,
    min: 0.5,
    ficha: [
      ["Elaboración", "Diaria, 7 días a la semana"],
      ["Presentación", "Bloque de 8–10 kg o porción al gusto"],
      ["Ingredientes", "Leche fresca, cuajo (renina) y sal"],
      ["Origen", "Vereda Jinete — Rocha, Arjona"],
      ["Conservación", "Refrigerado, siempre fresco"],
    ],
  },
  {
    id: "suero",
    nombre: "Suero de leche",
    apodo: "El compañero de la yuca",
    descripcion:
      "Suero fresco de la elaboración del queso: la bebida que acompaña las comidas de las sabanas, bien fría.",
    precio: "$5.000 / botella de 1 L",
    precioRef: 5000,
    unidad: "botella",
    paso: 1,
    min: 1,
    ficha: [
      ["Elaboración", "Producción semanal"],
      ["Presentación", "Botella de 1 litro"],
      ["Origen", "Vereda Jinete — Rocha, Arjona"],
      ["Conservación", "Refrigerado"],
    ],
  },
];

export const proceso = [
  {
    icono: "Sunrise",
    titulo: "Ordeño al amanecer",
    texto:
      "Cada mañana los ganaderos de ASOPEGAJIN ordeñan sus vacas en la Vereda Jinete. Esa leche fresca es el punto de partida de todo.",
  },
  {
    icono: "Milk",
    titulo: "Recepción y filtrado",
    texto:
      "Recibimos y filtramos la leche del día. Solo trabajamos con lo que llega fresco de nuestros ganaderos.",
  },
  {
    icono: "Droplets",
    titulo: "Cuajo y sal en la tina",
    texto:
      "La leche pasa a la tina artesanal, donde el cuajo y la sal hacen su trabajo lento, como se ha hecho siempre.",
  },
  {
    icono: "Hand",
    titulo: "Moldeado a mano",
    texto:
      "La cuajada se corta y se prensa en moldes artesanales, dando forma al queso bloque de 8 a 10 kilos.",
  },
  {
    icono: "PackageCheck",
    titulo: "Porción y empaque",
    texto:
      "Cada bloque se porciona según el pedido y se empaca limpio, listo para la tienda y la mesa.",
  },
  {
    icono: "Truck",
    titulo: "Entrega del mismo día",
    texto:
      "El queso del amanecer viaja cada día a tiendas, distribuidores y hogares de la región.",
  },
];

export const valores = [
  { nombre: "Origen", texto: "Valoramos la procedencia y el territorio de la Vereda Jinete." },
  { nombre: "Trabajo", texto: "Reconocemos el esfuerzo de quienes producen y transforman." },
  { nombre: "Calidad", texto: "Buscamos mejora continua en producto, proceso y presentación." },
  { nombre: "Confianza", texto: "Construimos relaciones responsables con clientes y aliados." },
  { nombre: "Comunidad", texto: "Generamos valor local mediante el trabajo colectivo." },
  { nombre: "Transformación", texto: "Pasamos de materia prima a productos con mayor valor agregado." },
  { nombre: "Sostenibilidad", texto: "Crecemos manteniendo una operación económicamente viable." },
];

export const historia = [
  {
    capitulo: "01",
    titulo: "La leche salía sin su historia",
    texto:
      "Durante años, los pequeños ganaderos de la Vereda Jinete vendieron su leche como materia prima. El esfuerzo era enorme, pero buena parte del valor se quedaba afuera del territorio.",
  },
  {
    capitulo: "02",
    titulo: "El propósito: transformar",
    texto:
      "De esa realidad nace PROLACJIN, iniciativa aliada de ASOPEGAJIN: dejar de vender solo leche y empezar a transformarla en queso y suero, agregando valor donde se produce.",
  },
  {
    capitulo: "03",
    titulo: "Hoy: Miquesito en su mesa",
    texto:
      "Cada bloque de queso lleva el trabajo diario de familias ganaderas de la Vereda Jinete. Miquesito es la marca con la que ese queso llega a tiendas y hogares, todos los días.",
  },
];

export const tiendas = {
  titulo: "Queso regional con marca, para su negocio",
  intro:
    "Trabajamos con tiendas, distribuidores y restaurantes de la región. Si su negocio vende comida, hablemos.",
  beneficios: [
    { icono: "BadgeCheck", titulo: "Precio directo de planta", texto: "Precio de referencia claro por kilo, sin sorpresas." },
    { icono: "Truck", titulo: "Entrega diaria", texto: "Producción 7 días a la semana: queso fresco todo el tiempo." },
    { icono: "PackageCheck", titulo: "Presentación con marca", texto: "Porciones definidas, empaque limpio y etiqueta Miquesito." },
    { icono: "MessageCircle", titulo: "Pedido simple por WhatsApp", texto: "Un mensaje y su pedido queda listo; sin formatos complicados." },
    { icono: "HeartHandshake", titulo: "Relación de largo plazo", texto: "Cumplimiento y seguimiento: nos gusta que nos recomienden." },
    { icono: "MapPin", titulo: "Origen que se nota", texto: "Queso con historia de la Vereda Jinete que su cliente distingue." },
  ],
  pasos: [
    { titulo: "Escríbanos", texto: "Cuéntenos dónde está su negocio y qué cantidades maneja." },
    { titulo: "Reciba la ficha comercial", texto: "Le enviamos presentaciones, precios y condiciones por WhatsApp." },
    { titulo: "Reciba queso fresco", texto: "Entrega diaria desde la Vereda Jinete, de planta a su mostrador." },
  ],
};

export const recetas = [
  {
    nombre: "Arepa de maíz con queso costeño",
    tiempo: "20 min",
    ocasion: "Desayuno",
    ingredientes: [
      "1 taza de masa de maíz costeño",
      "Queso costeño Miquesito desmenuzado al gusto",
      "Sal al gusto",
      "Aceite para la plancha",
    ],
    pasos: [
      "Forme las arepas con la masa e incorpore el queso desmenuzado en el centro.",
      "Selle en plancha caliente 3 a 4 minutos por lado, hasta dorar.",
      "Sirva caliente, con café o chocolate.",
    ],
  },
  {
    nombre: "Yuca con suero",
    tiempo: "25 min",
    ocasion: "Almuerzo de sabanas",
    ingredientes: [
      "Yuca fresca pelada y partida",
      "Suero Miquesito bien frío (1 botella rinde 4 porciones)",
      "Sal al gusto",
    ],
    pasos: [
      "Cocine la yuca en agua con sal hasta que ablande.",
      "Sirva la yuca caliente y bañe con el suero frío.",
      "El contraste caliente-frío es el secreto de las sabanas.",
    ],
  },
  {
    nombre: "Tostones con queso rallado",
    tiempo: "15 min",
    ocasion: "Pasabocas",
    ingredientes: [
      "2 plátanos verdes",
      "Queso costeño Miquesito",
      "Aceite para freír y sal",
    ],
    pasos: [
      "Corte el plátano en rodajas, fríalas, aplástelas y devuélvalas al aceite.",
      "Escurra y agregue sal al gusto.",
      "Ralle queso costeño encima mientras están bien calientes.",
    ],
  },
];

export const faq = [
  {
    pregunta: "¿Cómo hago un pedido?",
    respuesta:
      "Use la calculadora de pedidos de esta página o escríbanos directo por WhatsApp. Confirmamos precio, cantidad y entrega en el mismo chat.",
  },
  {
    pregunta: "¿Qué presentaciones manejan?",
    respuesta:
      "El queso se elabora en bloques de 8 a 10 kg y se vende por bloque o por porción. El suero viene en botella de 1 litro.",
  },
  {
    pregunta: "¿Entregan a tiendas y otros municipios?",
    respuesta:
      "Sí. Todos los días entregamos a tiendas, distribuidores y consumidores de la región. Cuéntenos su ubicación por WhatsApp y le confirmamos cobertura.",
  },
  {
    pregunta: "¿Cómo se elabora el queso?",
    respuesta:
      "Con leche fresca del día, cuajo (renina) y sal, en tina y moldes artesanales. Elaboración diaria, 7 días a la semana, en la Vereda Jinete.",
  },
  {
    pregunta: "¿Manejan precio especial para tiendas?",
    respuesta:
      "Sí, tenemos condiciones para tiendas y distribuidores. Solicite la ficha comercial por WhatsApp y la enviamos el mismo día.",
  },
  {
    pregunta: "¿De dónde es el queso?",
    respuesta:
      "De la Vereda Jinete, corregimiento de Rocha (Arjona, Bolívar): leche producida por los ganaderos de ASOPEGAJIN y transformada por PROLACJIN, nuestra empresa respaldante.",
  },
];

export const content = {
  hero: {
    eyebrow: "Vereda Jinete · Rocha — Arjona, Bolívar",
    titulo: "Tan natural como el campo.",
    bajada:
      "Queso costeño artesanal elaborado a diario con la leche fresca de nuestros ganaderos. Del ordeño del amanecer a su mesa, el mismo día.",
    ctaPrincipal: "Pedir por WhatsApp",
    ctaSecundaria: "Ver el proceso",
  },
};
