INSERT OR IGNORE INTO productos (id, nombre, apodo, descripcion, precio_min, precio_max, precio_ref, descuento_activo, precio_descuento, unidad, paso, minimo, activo, imagen, orden) VALUES
  ('queso-costeno', 'Queso costeño', 'El de todos los días',
   'Leche fresca de la mañana, cuajo y sal. Firme y sabroso como manda la tradición de las sabanas de Bolívar.',
   19000, 20000, 19500, 0, NULL, 'kg', 0.5, 0.5, 1, '/images/queso-bloque.jpg', 1),
  ('suero', 'Suero de leche', 'El compañero de la yuca',
   'Suero fresco de la elaboración del queso: la bebida que acompaña las comidas de las sabanas, bien fría.',
   5000, 5000, 5000, 0, NULL, 'botella', 1, 1, 1, '/images/suero-botella.jpg', 2);

INSERT OR IGNORE INTO site_config (key, value) VALUES
  ('whatsapp', '573148454059'),
  ('eslogan', 'Tan natural como el campo.'),
  ('hero_eyebrow', 'Vereda Jinete · Rocha — Arjona, Bolívar'),
  ('hero_titulo', 'Tan natural como el campo.'),
  ('hero_sub', 'Queso costeño artesanal elaborado a diario con la leche fresca de nuestros ganaderos. Del ordeño del amanecer a su mesa, el mismo día.'),
  ('hero_imagen', '/images/hero-campo.jpg'),
  ('promo', '');
