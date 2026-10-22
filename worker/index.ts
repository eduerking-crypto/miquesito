import { Hono } from "hono";
import { createMiddleware } from "hono/factory";
import {
  hashPassword,
  newSessionToken,
  readCookie,
  sessionExpiry,
  sha256Hex,
  verifyPassword,
} from "./auth";

type Env = {
  DB: D1Database;
  ASSETS: Fetcher;
};

type AuthCtx = { user_id: number; username: string };

type AppEnv = {
  Bindings: Env;
  Variables: { requser: AuthCtx };
};

const COOKIE = "mq_session";
const MAX_IMAGEN = 1_400_000;
const TIPOS_PERMITIDOS: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
};

class HTTPError extends Error {
  status: number;
  constructor(status: number, mensaje: string) {
    super(mensaje);
    this.status = status;
  }
}

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });

const clienteIp = (req: Request): string =>
  req.headers.get("CF-Connecting-IP") ?? "desconocida";

function slug(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

async function usuarioAutenticado(c: { env: Env; req: Request }): Promise<AuthCtx | null> {
  const token = readCookie(c.req, COOKIE);
  if (!token) return null;
  const tokenHash = await sha256Hex(token);
  const fila = await c.env.DB.prepare(
    `SELECT s.user_id, s.expires_at, u.username
       FROM sessions s JOIN admin_users u ON u.id = s.user_id
      WHERE s.token_hash = ?`
  )
    .bind(tokenHash)
    .first<{ user_id: number; expires_at: string; username: string }>();
  if (!fila) return null;
  if (new Date(fila.expires_at).getTime() < Date.now()) {
    await c.env.DB.prepare("DELETE FROM sessions WHERE token_hash = ?").bind(tokenHash).run();
    return null;
  }
  return { user_id: fila.user_id, username: fila.username };
}

const requireAdmin = createMiddleware<AppEnv>(async (c, next) => {
  const user = await usuarioAutenticado({ env: c.env, req: c.req.raw });
  if (!user) throw new HTTPError(401, "No autorizado");
  c.set("requser", user);
  await next();
});

const app = new Hono<AppEnv>();

app.onError((err, c) => {
  if (err instanceof HTTPError) {
    return json({ error: err.message }, err.status);
  }
  console.error(JSON.stringify({ error: String(err) }));
  return json({ error: "Error interno" }, 500);
});

/* ——————————— API pública ——————————— */

app.get("/api/health", (c) => json({ ok: true, servicio: "miquesito" }));

type ProductoPublico = {
  id: string;
  nombre: string;
  apodo: string;
  descripcion: string;
  precio_min: number;
  precio_max: number;
  precio_ref: number;
  descuento_activo: 0 | 1;
  precio_descuento: number | null;
  unidad: string;
  paso: number;
  minimo: number;
  imagen: string;
  orden: number;
};

app.get("/api/config", async (c) => {
  const [productos, config] = await Promise.all([
    c.env.DB.prepare(
      "SELECT id, nombre, apodo, descripcion, precio_min, precio_max, precio_ref, descuento_activo, precio_descuento, unidad, paso, minimo, imagen, orden FROM productos WHERE activo = 1 ORDER BY orden"
    ).all<ProductoPublico>(),
    c.env.DB.prepare("SELECT key, value FROM site_config").all<{ key: string; value: string }>(),
  ]);
  const textos: Record<string, string> = {};
  for (const fila of config.results ?? []) {
    textos[fila.key] = fila.value;
  }
  const configJson = JSON.stringify({
    whatsapp: textos.whatsapp ?? "573148454059",
    promo: textos.promo && textos.promo.trim() ? textos.promo.trim() : null,
    hero: {
      eyebrow: textos.hero_eyebrow ?? "",
      titulo: textos.hero_titulo ?? "",
      sub: textos.hero_sub ?? "",
      imagen: textos.hero_imagen ?? "",
    },
    eslogan: textos.eslogan ?? "",
    productos: (productos.results ?? []).map((p) => ({
      ...p,
      descuento_activo: !!p.descuento_activo,
      precio_descuento: p.descuento_activo ? p.precio_descuento : null,
    })),
  });
  return new Response(configJson, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
});

app.get("/media/:filename", async (c) => {
  const filename = c.req.param("filename");
  if (!filename || !/^[a-z0-9._-]+$/i.test(filename)) return json({ error: "Nombre inválido" }, 400);
  const fila = await c.env.DB.prepare(
    "SELECT content_type, data FROM media WHERE filename = ?"
  )
    .bind(filename)
    .first<{ content_type: string; data: string }>();
  if (!fila) return json({ error: "No encontrado" }, 404);
  const bytes = Uint8Array.from(atob(fila.data), (ch) => ch.charCodeAt(0));
  const headers = new Headers();
  headers.set("Content-Type", fila.content_type);
  headers.set("Cache-Control", "public, max-age=604800");
  return new Response(bytes, { headers });
});

/* ——————————— Auth admin ——————————— */

app.post("/api/admin/login", async (c) => {
  const body = (await c.req.json().catch(() => null)) as
    | { username?: string; password?: string }
    | null;
  const username = (body?.username ?? "").trim();
  const password = body?.password ?? "";
  if (!username || !password) return json({ error: "Usuario y contraseña requeridos" }, 400);

  const ip = clienteIp(c.req.raw);
  const hace15min = Date.now() - 15 * 60 * 1000;
  await c.env.DB.prepare("DELETE FROM login_attempts WHERE ts < ?").bind(hace15min).run();
  const intentos = await c.env.DB.prepare(
    "SELECT COUNT(*) AS n FROM login_attempts WHERE ip = ? AND ts > ?"
  )
    .bind(ip, hace15min)
    .first<{ n: number }>();
  if ((intentos?.n ?? 0) >= 8) {
    return json({ error: "Demasiados intentos. Espere 15 minutos." }, 429);
  }

  const usuario = await c.env.DB.prepare(
    "SELECT id, password_hash FROM admin_users WHERE username = ?"
  )
    .bind(username)
    .first<{ id: number; password_hash: string }>();

  const ok = usuario ? await verifyPassword(password, usuario.password_hash) : false;
  if (!ok || !usuario) {
    await c.env.DB.prepare("INSERT INTO login_attempts (ip, ts) VALUES (?, ?)")
      .bind(ip, Date.now())
      .run();
    return json({ error: "Credenciales incorrectas" }, 401);
  }

  const token = newSessionToken();
  const tokenHash = await sha256Hex(token);
  await c.env.DB.prepare("INSERT INTO sessions (token_hash, user_id, expires_at) VALUES (?, ?, ?)")
    .bind(tokenHash, usuario.id, sessionExpiry())
    .run();

  const res = json({ ok: true, username });
  res.headers.append(
    "Set-Cookie",
    `${COOKIE}=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${7 * 24 * 60 * 60}`
  );
  return res;
});

app.post("/api/admin/logout", async (c) => {
  const token = readCookie(c.req.raw, COOKIE);
  if (token) {
    await c.env.DB.prepare("DELETE FROM sessions WHERE token_hash = ?")
      .bind(await sha256Hex(token))
      .run();
  }
  const res = json({ ok: true });
  res.headers.append("Set-Cookie", `${COOKIE}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`);
  return res;
});

app.get("/api/admin/me", async (c) => {
  const user = await usuarioAutenticado({ env: c.env, req: c.req.raw });
  if (!user) return json({ error: "No autorizado" }, 401);
  return json({ username: user.username });
});

/* ——————————— Productos (admin) ——————————— */

app.get("/api/admin/productos", requireAdmin, async (c) => {
  const filas = await c.env.DB.prepare("SELECT * FROM productos ORDER BY orden").all<ProductoPublico & { activo: number }>();
  return json({ productos: filas.results ?? [] });
});

function validarProducto(body: Record<string, unknown>): string | null {
  const id = body.id;
  if (typeof id !== "string" || !/^[a-z0-9-]{2,40}$/.test(id)) return "id inválido";
  if (typeof body.nombre !== "string" || !body.nombre.trim()) return "nombre requerido";
  for (const campo of ["precio_min", "precio_max", "precio_ref", "paso", "minimo", "orden"]) {
    const n = Number(body[campo]);
    if (!Number.isFinite(n) || n < 0) return `${campo} debe ser un número válido`;
  }
  if (body.descuento_activo && !Number.isFinite(Number(body.precio_descuento))) {
    return "precio_descuento requerido cuando el descuento está activo";
  }
  return null;
}

app.post("/api/admin/productos", requireAdmin, async (c) => {
  const body = (await c.req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return json({ error: "JSON inválido" }, 400);
  const error = validarProducto(body);
  if (error) return json({ error }, 400);
  try {
    await c.env.DB.prepare(
      `INSERT INTO productos (id, nombre, apodo, descripcion, precio_min, precio_max, precio_ref,
         descuento_activo, precio_descuento, unidad, paso, minimo, activo, imagen, orden)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
      .bind(
        body.id,
        body.nombre,
        body.apodo ?? "",
        body.descripcion ?? "",
        Number(body.precio_min),
        Number(body.precio_max),
        Number(body.precio_ref),
        body.descuento_activo ? 1 : 0,
        body.precio_descuento != null ? Number(body.precio_descuento) : null,
        body.unidad ?? "kg",
        Number(body.paso),
        Number(body.minimo),
        body.activo === false ? 0 : 1,
        body.imagen ?? "",
        Number(body.orden ?? 0)
      )
      .run();
    return json({ ok: true }, 201);
  } catch {
    return json({ error: "Ya existe un producto con ese id" }, 409);
  }
});

app.put("/api/admin/productos/:id", requireAdmin, async (c) => {
  const id = c.req.param("id") ?? "";
  const body = (await c.req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return json({ error: "JSON inválido" }, 400);
  const existente = await c.env.DB.prepare("SELECT id FROM productos WHERE id = ?")
    .bind(id)
    .first();
  if (!existente) return json({ error: "Producto no encontrado" }, 404);
  const campos = [
    "nombre",
    "apodo",
    "descripcion",
    "precio_min",
    "precio_max",
    "precio_ref",
    "descuento_activo",
    "precio_descuento",
    "unidad",
    "paso",
    "minimo",
    "activo",
    "imagen",
    "orden",
  ] as const;
  const sets: string[] = [];
  const valores: unknown[] = [];
  for (const campo of campos) {
    if (campo in body) {
      let valor: unknown = body[campo];
      if (campo === "descuento_activo" || campo === "activo") valor = valor ? 1 : 0;
      if (
        ["precio_min", "precio_max", "precio_ref", "precio_descuento", "paso", "minimo", "orden"].includes(campo)
      ) {
        valor = valor == null ? null : Number(valor);
      }
      sets.push(`${campo} = ?`);
      valores.push(valor);
    }
  }
  if (sets.length === 0) return json({ error: "Nada que actualizar" }, 400);
  valores.push(id);
  await c.env.DB.prepare(`UPDATE productos SET ${sets.join(", ")} WHERE id = ?`)
    .bind(...valores)
    .run();
  return json({ ok: true });
});

app.delete("/api/admin/productos/:id", requireAdmin, async (c) => {
  const id = c.req.param("id") ?? "";
  await c.env.DB.prepare("DELETE FROM productos WHERE id = ?").bind(id).run();
  return json({ ok: true });
});

/* ——————————— Configuración del sitio (admin) ——————————— */

app.get("/api/admin/config", requireAdmin, async (c) => {
  const filas = await c.env.DB.prepare("SELECT key, value FROM site_config").all<{
    key: string;
    value: string;
  }>();
  const config: Record<string, string> = {};
  for (const fila of filas.results ?? []) config[fila.key] = fila.value;
  return json({ config });
});

app.put("/api/admin/config", requireAdmin, async (c) => {
  const body = (await c.req.json().catch(() => null)) as Record<string, string> | null;
  if (!body || typeof body !== "object") return json({ error: "JSON inválido" }, 400);
  const permitidas = [
    "whatsapp",
    "eslogan",
    "hero_eyebrow",
    "hero_titulo",
    "hero_sub",
    "hero_imagen",
    "promo",
  ];
  for (const [clave, valor] of Object.entries(body)) {
    if (!permitidas.includes(clave) || typeof valor !== "string") continue;
    if (clave === "whatsapp" && !/^[0-9]{8,15}$/.test(valor)) {
      return json({ error: "WhatsApp debe ser solo dígitos (ej: 573148454059)" }, 400);
    }
    await c.env.DB.prepare(
      "INSERT INTO site_config (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value"
    )
      .bind(clave, valor)
      .run();
  }
  return json({ ok: true });
});

/* ——————————— Contraseña (admin) ——————————— */

app.put("/api/admin/password", requireAdmin, async (c) => {
  const user = c.get("requser");
  const body = (await c.req.json().catch(() => null)) as
    | { actual?: string; nueva?: string }
    | null;
  const actual = body?.actual ?? "";
  const nueva = body?.nueva ?? "";
  if (nueva.length < 8) {
    return json({ error: "La nueva contraseña debe tener al menos 8 caracteres" }, 400);
  }
  const fila = await c.env.DB.prepare("SELECT password_hash FROM admin_users WHERE id = ?")
    .bind(user.user_id)
    .first<{ password_hash: string }>();
  if (!fila || !(await verifyPassword(actual, fila.password_hash))) {
    return json({ error: "Contraseña actual incorrecta" }, 401);
  }
  await c.env.DB.prepare(
    "UPDATE admin_users SET password_hash = ?, updated_at = datetime('now') WHERE id = ?"
  )
    .bind(await hashPassword(nueva), user.user_id)
    .run();
  await c.env.DB.prepare("DELETE FROM sessions WHERE user_id = ?").bind(user.user_id).run();
  const res = json({ ok: true });
  res.headers.append("Set-Cookie", `${COOKIE}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`);
  return res;
});

/* ——————————— Media (imágenes en D1) ——————————— */

app.get("/api/admin/media", requireAdmin, async (c) => {
  const filas = await c.env.DB.prepare(
    "SELECT id, filename, content_type, size, created_at FROM media ORDER BY id DESC"
  ).all<{ id: number; filename: string; content_type: string; size: number; created_at: string }>();
  return json({ media: filas.results ?? [] });
});

app.post("/api/admin/media", requireAdmin, async (c) => {
  const body = (await c.req.json().catch(() => null)) as
    | { nombre?: string; data_base64?: string; content_type?: string }
    | null;
  const base64 = body?.data_base64 ?? "";
  const tipo = body?.content_type ?? "";
  if (!base64 || !tipo) return json({ error: "data_base64 y content_type requeridos" }, 400);
  if (!TIPOS_PERMITIDOS[tipo]) {
    return json({ error: "Solo se permiten imágenes JPG, PNG o WebP" }, 415);
  }
  if (base64.length > MAX_IMAGEN) {
    return json({ error: "Imagen demasiado grande: comprima antes de subir (máx ~1 MB)" }, 413);
  }
  const base = slug(body?.nombre ?? "imagen") || "imagen";
  const filename = `${base}-${toHex6()}-${Date.now().toString(36)}${TIPOS_PERMITIDOS[tipo]}`;
  const tamanio = Math.floor((base64.length * 3) / 4);
  await c.env.DB.prepare(
    "INSERT INTO media (filename, content_type, size, data) VALUES (?, ?, ?, ?)"
  )
    .bind(filename, tipo, tamanio, base64)
    .run();
  return json({ ok: true, filename, url: `/media/${filename}` }, 201);
});

function toHex6(): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(3)))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

app.delete("/api/admin/media/:filename", requireAdmin, async (c) => {
  const filename = c.req.param("filename") ?? "";
  if (!/^[a-z0-9._-]+$/i.test(filename)) return json({ error: "Nombre inválido" }, 400);
  await c.env.DB.prepare("DELETE FROM media WHERE filename = ?").bind(filename).run();
  return json({ ok: true });
});

/* ——————————— Resto → assets estáticos (SPA) ——————————— */

app.all("*", (c) => c.env.ASSETS.fetch(c.req.raw));

export default {
  fetch: app.fetch,
} satisfies ExportedHandler<Env>;
