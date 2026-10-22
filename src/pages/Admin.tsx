import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Check,
  Copy,
  ImagePlus,
  Loader2,
  Lock,
  LogOut,
  Package,
  Save,
  Settings,
  Trash2,
  User,
} from "lucide-react";
import { Seo } from "../components/Seo";
import { Logo } from "../components/Logo";
import type { ProductoApi } from "../lib/config";

type ProductoAdmin = ProductoApi & { activo: boolean };

type MediaItem = {
  id: number;
  filename: string;
  content_type: string;
  size: number;
  created_at: string;
};

async function api<T>(ruta: string, opciones?: RequestInit): Promise<T> {
  const res = await fetch(ruta, {
    headers: { "Content-Type": "application/json" },
    ...opciones,
  });
  const data = (await res.json().catch(() => ({}))) as T & { error?: string };
  if (!res.ok) throw new Error(data?.error ?? `Error ${res.status}`);
  return data;
}

/* ————— Compresión de imagen en el navegador (antes de subir) ————— */

async function comprimirImagen(
  archivo: File
): Promise<{ data_base64: string; content_type: string; nombre: string }> {
  const bitmap = await createImageBitmap(archivo);
  const maxW = 1600;
  const escala = Math.min(1, maxW / bitmap.width);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * escala);
  canvas.height = Math.round(bitmap.height * escala);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("No se pudo procesar la imagen");
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  let calidad = 0.82;
  let blob = await new Promise<Blob>((res) => canvas.toBlob((b) => res(b!), "image/webp", calidad));
  while (blob.size > 1_000_000 && calidad > 0.4) {
    calidad -= 0.1;
    blob = await new Promise<Blob>((res) => canvas.toBlob((b) => res(b!), "image/webp", calidad));
  }
  const buffer = new Uint8Array(await blob.arrayBuffer());
  let bin = "";
  const chunk = 0x8000;
  for (let i = 0; i < buffer.length; i += chunk) {
    bin += String.fromCharCode(...buffer.subarray(i, i + chunk));
  }
  return {
    data_base64: btoa(bin),
    content_type: "image/webp",
    nombre: archivo.name.replace(/\.[^.]+$/, ""),
  };
}

/* ————— Login ————— */

function Login({ onOk }: { onOk: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    setError("");
    try {
      await api("/api/admin/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });
      onOk();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="bg-mesh-oscuro flex min-h-svh items-center justify-center px-5">
      <div className="card-glass w-full max-w-md p-9">
        <div className="flex justify-center">
          <Logo claro />
        </div>
        <h1 className="mt-7 text-center font-display text-2xl font-semibold text-crema-50">
          Panel de administración
        </h1>
        <p className="mt-2 text-center text-sm text-crema-200/70">
          Configure precios, descuentos, información e imágenes del sitio.
        </p>
        <form onSubmit={enviar} className="mt-8 grid gap-4">
          <label className="grid gap-1.5">
            <span className="text-xs font-semibold tracking-wide text-crema-200/80 uppercase">
              Usuario
            </span>
            <div className="relative">
              <User className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-crema-200/50" aria-hidden="true" />
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
                className="campo border-crema-200/30 bg-crema-50/95 pl-10"
                placeholder="admin"
              />
            </div>
          </label>
          <label className="grid gap-1.5">
            <span className="text-xs font-semibold tracking-wide text-crema-200/80 uppercase">
              Contraseña
            </span>
            <div className="relative">
              <Lock className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-crema-200/50" aria-hidden="true" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className="campo border-crema-200/30 bg-crema-50/95 pl-10"
                placeholder="••••••••"
              />
            </div>
          </label>
          {error && (
            <p role="alert" className="rounded-xl bg-red-500/15 px-4 py-2.5 text-sm text-red-200">
              {error}
            </p>
          )}
          <button type="submit" disabled={cargando} className="btn btn-oro mt-2 w-full">
            {cargando ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Lock className="h-4 w-4" aria-hidden="true" />}
            {cargando ? "Verificando…" : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ————— Pestaña Productos ————— */

function FormularioProducto({
  inicial,
  onGuardado,
  onCancelar,
}: {
  inicial: Partial<ProductoAdmin> & { id?: string };
  onGuardado: () => void;
  onCancelar?: () => void;
}) {
  const [p, setP] = useState({
    id: inicial.id ?? "",
    nombre: inicial.nombre ?? "",
    apodo: inicial.apodo ?? "",
    descripcion: inicial.descripcion ?? "",
    precio_min: inicial.precio_min ?? 0,
    precio_max: inicial.precio_max ?? 0,
    precio_ref: inicial.precio_ref ?? 0,
    descuento_activo: inicial.descuento_activo ?? false,
    precio_descuento: inicial.precio_descuento ?? "",
    unidad: inicial.unidad ?? "kg",
    paso: inicial.paso ?? 1,
    minimo: inicial.minimo ?? 1,
    activo: inicial.activo ?? true,
    imagen: inicial.imagen ?? "",
    orden: inicial.orden ?? 0,
  });
  const [error, setError] = useState("");
  const [guardando, setGuardando] = useState(false);

  const nuevo = !inicial.id;

  const guardar = async () => {
    setGuardando(true);
    setError("");
    try {
      const cuerpo: Record<string, unknown> = { ...p, precio_descuento: p.precio_descuento || null };
      if (nuevo) {
        await api("/api/admin/productos", { method: "POST", body: JSON.stringify(cuerpo) });
      } else {
        await api(`/api/admin/productos/${p.id}`, { method: "PUT", body: JSON.stringify(cuerpo) });
      }
      onGuardado();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar");
    } finally {
      setGuardando(false);
    }
  };

  const num = (v: string) => (v === "" ? 0 : Number(v));

  return (
    <div className="grid gap-4">
      {nuevo && (
        <label className="grid gap-1.5">
          <span className="ficha text-verde-600">ID (ej: queso-especial)</span>
          <input
            className="campo font-mono text-sm"
            value={p.id}
            onChange={(e) => setP({ ...p, id: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-") })}
          />
        </label>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5">
          <span className="ficha text-verde-600">Nombre</span>
          <input className="campo" value={p.nombre} onChange={(e) => setP({ ...p, nombre: e.target.value })} />
        </label>
        <label className="grid gap-1.5">
          <span className="ficha text-verde-600">Apodo (etiqueta corta)</span>
          <input className="campo" value={p.apodo} onChange={(e) => setP({ ...p, apodo: e.target.value })} />
        </label>
      </div>
      <label className="grid gap-1.5">
        <span className="ficha text-verde-600">Descripción</span>
        <textarea className="campo min-h-20" value={p.descripcion} onChange={(e) => setP({ ...p, descripcion: e.target.value })} />
      </label>
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="grid gap-1.5">
          <span className="ficha text-verde-600">Precio mínimo (COP)</span>
          <input type="number" className="campo font-mono" value={p.precio_min} onChange={(e) => setP({ ...p, precio_min: num(e.target.value) })} />
        </label>
        <label className="grid gap-1.5">
          <span className="ficha text-verde-600">Precio máximo (COP)</span>
          <input type="number" className="campo font-mono" value={p.precio_max} onChange={(e) => setP({ ...p, precio_max: num(e.target.value) })} />
        </label>
        <label className="grid gap-1.5">
          <span className="ficha text-verde-600">Precio referencia (COP)</span>
          <input type="number" className="campo font-mono" value={p.precio_ref} onChange={(e) => setP({ ...p, precio_ref: num(e.target.value) })} />
        </label>
      </div>
      <div className="grid gap-4 rounded-2xl border border-oro-300/60 bg-oro-200/20 p-4 sm:grid-cols-2">
        <label className="flex cursor-pointer items-center gap-3 text-sm font-semibold text-verde-900">
          <input
            type="checkbox"
            checked={p.descuento_activo}
            onChange={(e) => setP({ ...p, descuento_activo: e.target.checked })}
            className="h-5 w-5 accent-verde-700"
          />
          Descuento activo
        </label>
        <label className={`grid gap-1.5 ${p.descuento_activo ? "" : "opacity-40"}`}>
          <span className="ficha text-verde-600">Precio con descuento (COP)</span>
          <input
            type="number"
            className="campo font-mono"
            disabled={!p.descuento_activo}
            value={p.precio_descuento}
            onChange={(e) => setP({ ...p, precio_descuento: e.target.value === "" ? "" : num(e.target.value) })}
          />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-4">
        <label className="grid gap-1.5">
          <span className="ficha text-verde-600">Unidad</span>
          <select className="campo" value={p.unidad} onChange={(e) => setP({ ...p, unidad: e.target.value })}>
            <option value="kg">kg</option>
            <option value="botella">botella</option>
          </select>
        </label>
        <label className="grid gap-1.5">
          <span className="ficha text-verde-600">Paso</span>
          <input type="number" step="0.5" className="campo font-mono" value={p.paso} onChange={(e) => setP({ ...p, paso: num(e.target.value) })} />
        </label>
        <label className="grid gap-1.5">
          <span className="ficha text-verde-600">Mínimo</span>
          <input type="number" step="0.5" className="campo font-mono" value={p.minimo} onChange={(e) => setP({ ...p, minimo: num(e.target.value) })} />
        </label>
        <label className="grid gap-1.5">
          <span className="ficha text-verde-600">Orden</span>
          <input type="number" className="campo font-mono" value={p.orden} onChange={(e) => setP({ ...p, orden: num(e.target.value) })} />
        </label>
      </div>
      <label className="grid gap-1.5">
        <span className="ficha text-verde-600">Imagen (URL: /images/… o /media/…)</span>
        <input className="campo font-mono text-sm" value={p.imagen} onChange={(e) => setP({ ...p, imagen: e.target.value })} placeholder="/images/queso-bloque.jpg" />
      </label>
      <label className="flex cursor-pointer items-center gap-3 text-sm font-semibold text-verde-900">
        <input
          type="checkbox"
          checked={p.activo}
          onChange={(e) => setP({ ...p, activo: e.target.checked })}
          className="h-5 w-5 accent-verde-700"
        />
        Visible en el sitio
      </label>
      {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
      <div className="flex gap-3">
        <button type="button" onClick={guardar} disabled={guardando} className="btn btn-primary btn-sm">
          {guardando ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Save className="h-4 w-4" aria-hidden="true" />}
          {nuevo ? "Crear producto" : "Guardar cambios"}
        </button>
        {onCancelar && (
          <button type="button" onClick={onCancelar} className="btn btn-outline btn-sm">
            Cancelar
          </button>
        )}
      </div>
    </div>
  );
}

function TabProductos({ productos, recargar }: { productos: ProductoAdmin[]; recargar: () => void }) {
  const [editando, setEditando] = useState<string | null>(null);
  const [creando, setCreando] = useState(false);

  const eliminar = async (id: string) => {
    if (!window.confirm(`¿Eliminar el producto "${id}"?`)) return;
    await api(`/api/admin/productos/${id}`, { method: "DELETE" });
    recargar();
  };

  return (
    <section className="grid gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-verde-900/70">
          Los cambios se reflejan al instante en el sitio público.
        </p>
        <button type="button" onClick={() => setCreando((v) => !v)} className="btn btn-primary btn-sm">
          <Package className="h-4 w-4" aria-hidden="true" />
          {creando ? "Cerrar nuevo" : "Nuevo producto"}
        </button>
      </div>

      {creando && (
        <div className="card p-7">
          <h3 className="mb-5 font-display text-xl font-semibold text-verde-950">Nuevo producto</h3>
          <FormularioProducto
            inicial={{}}
            onGuardado={() => {
              setCreando(false);
              recargar();
            }}
            onCancelar={() => setCreando(false)}
          />
        </div>
      )}

      {productos.map((p) => (
        <div key={p.id} className="card p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={p.imagen || "/images/queso-bloque.jpg"}
                alt=""
                className="h-16 w-16 rounded-2xl border border-crema-300 object-cover"
              />
              <div>
                <p className="flex items-center gap-2 font-semibold text-verde-950">
                  {p.nombre}
                  {!p.activo && (
                    <span className="rounded-full bg-verde-100 px-2 py-0.5 font-mono text-[10px] font-semibold text-verde-700 uppercase">
                      Oculto
                    </span>
                  )}
                  {p.descuento_activo && (
                    <span className="rounded-full bg-oro-400/30 px-2 py-0.5 font-mono text-[10px] font-semibold text-oro-700 uppercase">
                      Descuento
                    </span>
                  )}
                </p>
                <p className="ficha mt-0.5 text-verde-600">
                  {p.precio_min === p.precio_max
                    ? `$${p.precio_min.toLocaleString("es-CO")}`
                    : `$${p.precio_min.toLocaleString("es-CO")}–$${p.precio_max.toLocaleString("es-CO")}`}{" "}
                  / {p.unidad}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setEditando(editando === p.id ? null : p.id)}
                className="btn btn-outline btn-sm"
              >
                {editando === p.id ? "Cerrar" : "Editar"}
              </button>
              <button
                type="button"
                onClick={() => eliminar(p.id)}
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-red-200 text-red-700 transition-colors hover:bg-red-50"
                aria-label={`Eliminar ${p.nombre}`}
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
          {editando === p.id && (
            <div className="mt-6 border-t border-crema-300 pt-6">
              <FormularioProducto inicial={p} onGuardado={() => { setEditando(null); recargar(); }} />
            </div>
          )}
        </div>
      ))}
    </section>
  );
}

/* ————— Pestaña Información ————— */

const CLAVES_INFO: [string, string, string][] = [
  ["whatsapp", "WhatsApp (solo dígitos con 57)", "573148454059"],
  ["promo", "Banner promocional (vacío = oculto)", "¡Queso fresco todos los días a $19.000/kg!"],
  ["eslogan", "Eslogan", "Tan natural como el campo."],
  ["hero_eyebrow", "Hero · línea superior", "Vereda Jinete · Rocha — Arjona, Bolívar"],
  ["hero_titulo", "Hero · título principal", "Tan natural como el campo."],
  ["hero_sub", "Hero · bajada", "Queso costeño artesanal…"],
  ["hero_imagen", "Hero · imagen de fondo (URL)", "/images/hero-campo.jpg"],
];

function TabInfo({ config, recargar }: { config: Record<string, string>; recargar: () => void }) {
  const [valores, setValores] = useState<Record<string, string>>(config);
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const guardar = async () => {
    setGuardando(true);
    setMensaje("");
    try {
      await api("/api/admin/config", { method: "PUT", body: JSON.stringify(valores) });
      setMensaje("Guardado: los cambios ya están en el sitio.");
      recargar();
    } catch (err) {
      setMensaje(err instanceof Error ? err.message : "Error al guardar");
    } finally {
      setGuardando(false);
    }
  };

  return (
    <section className="grid gap-5">
      <div className="card p-7">
        <div className="grid gap-5">
          {CLAVES_INFO.map(([clave, etiqueta, placeholder]) => (
            <label key={clave} className="grid gap-1.5">
              <span className="ficha text-verde-600">{etiqueta}</span>
              {clave === "hero_sub" ? (
                <textarea
                  className="campo min-h-20"
                  value={valores[clave] ?? ""}
                  onChange={(e) => setValores({ ...valores, [clave]: e.target.value })}
                  placeholder={placeholder}
                />
              ) : (
                <input
                  className="campo font-mono text-sm"
                  value={valores[clave] ?? ""}
                  onChange={(e) => setValores({ ...valores, [clave]: e.target.value })}
                  placeholder={placeholder}
                />
              )}
            </label>
          ))}
        </div>
        {mensaje && <p className="mt-4 text-sm font-medium text-verde-700">{mensaje}</p>}
        <button type="button" onClick={guardar} disabled={guardando} className="btn btn-primary btn-sm mt-6">
          {guardando ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Save className="h-4 w-4" aria-hidden="true" />}
          Guardar información
        </button>
      </div>
    </section>
  );
}

/* ————— Pestaña Imágenes ————— */

function TabMedia({ recargarMedia }: { recargarMedia: () => void }) {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [subiendo, setSubiendo] = useState(false);
  const [error, setError] = useState("");
  const [copiado, setCopiado] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const cargar = useCallback(async () => {
    try {
      const data = await api<{ media: MediaItem[] }>("/api/admin/media");
      setItems(data.media);
      recargarMedia();
    } catch {
      /* ignorar */
    }
  }, [recargarMedia]);

  useEffect(() => {
    void cargar();
  }, [cargar]);

  const subir = async (archivo: File) => {
    setSubiendo(true);
    setError("");
    try {
      const comprimida = await comprimirImagen(archivo);
      await api("/api/admin/media", {
        method: "POST",
        body: JSON.stringify(comprimida),
      });
      await cargar();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al subir");
    } finally {
      setSubiendo(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const copiar = async (filename: string) => {
    await navigator.clipboard.writeText(`/media/${filename}`);
    setCopiado(filename);
    setTimeout(() => setCopiado(""), 1800);
  };

  const eliminar = async (filename: string) => {
    if (!window.confirm(`¿Eliminar ${filename}?`)) return;
    await api(`/api/admin/media/${filename}`, { method: "DELETE" });
    await cargar();
  };

  return (
    <section className="grid gap-5">
      <div className="card p-7">
        <p className="text-sm text-verde-900/70">
          Suba fotos del proceso, del queso o promociones. Se comprimen automáticamente. Luego copie
          la URL y úsela en productos, hero o banner.
        </p>
        <label className="mt-5 flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-crema-300 bg-crema-100/60 px-6 py-10 text-center transition-colors hover:border-verde-400 hover:bg-verde-50">
          <ImagePlus className="h-8 w-8 text-verde-600" aria-hidden="true" />
          <span className="text-sm font-semibold text-verde-800">
            {subiendo ? "Comprimiendo y subiendo…" : "Haga clic o arrastre una imagen (JPG, PNG, WebP)"}
          </span>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="sr-only"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void subir(f);
            }}
          />
        </label>
        {error && <p role="alert" className="mt-3 text-sm text-red-700">{error}</p>}
      </div>

      {items.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((m) => (
            <div key={m.id} className="card overflow-hidden">
              <img src={`/media/${m.filename}`} alt={m.filename} className="aspect-[4/3] w-full object-cover" />
              <div className="grid gap-2 p-4">
                <p className="ficha truncate text-verde-900">/media/{m.filename}</p>
                <p className="ficha text-verde-600">
                  {Math.round(m.size / 1024)} KB · {m.content_type.replace("image/", "").toUpperCase()}
                </p>
                <div className="flex gap-2">
                  <button type="button" onClick={() => copiar(m.filename)} className="btn btn-outline btn-sm flex-1 px-3 py-2 text-xs">
                    {copiado === m.filename ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
                    {copiado === m.filename ? "¡Copiada!" : "Copiar URL"}
                  </button>
                  <button
                    type="button"
                    onClick={() => eliminar(m.filename)}
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-red-200 text-red-700 transition-colors hover:bg-red-50"
                    aria-label={`Eliminar ${m.filename}`}
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

/* ————— Pestaña Contraseña ————— */

function TabPassword() {
  const [actual, setActual] = useState("");
  const [nueva, setNueva] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  const cambiar = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje("");
    if (nueva !== confirmar) {
      setMensaje("Las contraseñas nuevas no coinciden.");
      return;
    }
    setCargando(true);
    try {
      await api("/api/admin/password", { method: "PUT", body: JSON.stringify({ actual, nueva }) });
      setMensaje("Contraseña actualizada. Inicie sesión de nuevo.");
      setActual("");
      setNueva("");
      setConfirmar("");
    } catch (err) {
      setMensaje(err instanceof Error ? err.message : "Error");
    } finally {
      setCargando(false);
    }
  };

  return (
    <section className="card max-w-lg p-7">
      <form onSubmit={cambiar} className="grid gap-4">
        <label className="grid gap-1.5">
          <span className="ficha text-verde-600">Contraseña actual</span>
          <input type="password" className="campo" value={actual} onChange={(e) => setActual(e.target.value)} required autoComplete="current-password" />
        </label>
        <label className="grid gap-1.5">
          <span className="ficha text-verde-600">Nueva contraseña (mín. 8 caracteres)</span>
          <input type="password" className="campo" value={nueva} onChange={(e) => setNueva(e.target.value)} required minLength={8} autoComplete="new-password" />
        </label>
        <label className="grid gap-1.5">
          <span className="ficha text-verde-600">Confirmar nueva contraseña</span>
          <input type="password" className="campo" value={confirmar} onChange={(e) => setConfirmar(e.target.value)} required autoComplete="new-password" />
        </label>
        {mensaje && <p role="alert" className="text-sm font-medium text-verde-700">{mensaje}</p>}
        <button type="submit" disabled={cargando} className="btn btn-primary btn-sm">
          {cargando ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Lock className="h-4 w-4" aria-hidden="true" />}
          Cambiar contraseña
        </button>
      </form>
    </section>
  );
}

/* ————— Panel principal ————— */

type Pestaña = "productos" | "info" | "media" | "password";

const PESTANAS: [Pestaña, string][] = [
  ["productos", "Productos y precios"],
  ["info", "Información del sitio"],
  ["media", "Imágenes"],
  ["password", "Contraseña"],
];

export function Admin() {
  const [estado, setEstado] = useState<"cargando" | "login" | "panel">("cargando");
  const [pestana, setPestana] = useState<Pestaña>("productos");
  const [productos, setProductos] = useState<ProductoAdmin[]>([]);
  const [config, setConfig] = useState<Record<string, string>>({});
  const [versionConfig, setVersionConfig] = useState(0);

  const verificar = useCallback(async () => {
    try {
      await api("/api/admin/me");
      setEstado("panel");
    } catch {
      setEstado("login");
    }
  }, []);

  const cargarDatos = useCallback(async () => {
    try {
      const [prod, conf] = await Promise.all([
        api<{ productos: ProductoAdmin[] }>("/api/admin/productos"),
        api<{ config: Record<string, string> }>("/api/admin/config"),
      ]);
      setProductos(prod.productos);
      setConfig(conf.config);
    } catch {
      /* sesión inválida */
    }
  }, []);

  useEffect(() => {
    void verificar();
  }, [verificar]);

  useEffect(() => {
    if (estado === "panel") void cargarDatos();
  }, [estado, cargarDatos, versionConfig]);

  const salir = async () => {
    await api("/api/admin/logout", { method: "POST" }).catch(() => {});
    window.location.href = "/";
  };

  if (estado === "cargando") {
    return (
      <div className="bg-mesh-claro flex min-h-svh items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-verde-700" aria-hidden="true" />
      </div>
    );
  }

  if (estado === "login") {
    return (
      <>
        <Seo titulo="Panel de administración" />
        <Login onOk={() => setEstado("panel")} />
      </>
    );
  }

  return (
    <div className="bg-mesh-claro min-h-svh">
      <Seo titulo="Panel de administración" />
      <header className="sticky top-0 z-40 border-b border-crema-300/70 bg-crema-50/90 backdrop-blur-lg">
        <div className="container-x flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Logo />
            <span className="hidden rounded-full bg-verde-100 px-3 py-1 font-mono text-[10px] font-semibold tracking-widest text-verde-800 uppercase sm:inline">
              Panel
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a href="/" className="btn btn-outline btn-sm">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Ver sitio
            </a>
            <button type="button" onClick={salir} className="btn btn-sm bg-verde-950 text-crema-50 hover:bg-verde-900">
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Salir
            </button>
          </div>
        </div>
      </header>

      <div className="container-x grid gap-6 py-10 lg:grid-cols-[240px_1fr]">
        <nav aria-label="Secciones del panel" className="flex gap-2 overflow-x-auto lg:grid lg:content-start lg:gap-1.5">
          {PESTANAS.map(([id, label]) => {
            const Icono = id === "productos" ? Package : id === "info" ? Settings : id === "media" ? ImagePlus : Lock;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setPestana(id)}
                aria-current={pestana === id}
                className={`flex flex-none cursor-pointer items-center gap-2.5 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition-colors ${
                  pestana === id
                    ? "bg-verde-700 text-crema-50"
                    : "bg-white/70 text-verde-900/75 hover:bg-white"
                }`}
              >
                <Icono className="h-4 w-4 flex-none" aria-hidden="true" />
                {label}
              </button>
            );
          })}
        </nav>

        <main>
          {pestana === "productos" && (
            <TabProductos productos={productos} recargar={() => setVersionConfig((v) => v + 1)} />
          )}
          {pestana === "info" && (
            <TabInfo config={config} recargar={() => setVersionConfig((v) => v + 1)} />
          )}
          {pestana === "media" && (
            <TabMedia recargarMedia={() => setVersionConfig((v) => v + 1)} />
          )}
          {pestana === "password" && <TabPassword />}
        </main>
      </div>
    </div>
  );
}
