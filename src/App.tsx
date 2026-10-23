import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Nosotros } from "./pages/Nosotros";
import { Productos } from "./pages/Productos";
import { Proceso } from "./pages/Proceso";
import { Tiendas } from "./pages/Tiendas";
import { Recetas } from "./pages/Recetas";
import { Contacto } from "./pages/Contacto";
import { Ambiente } from "./pages/Ambiente";
import { Admin } from "./pages/Admin";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function RutasPublicas() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/proceso" element={<Proceso />} />
        <Route path="/tiendas" element={<Tiendas />} />
        <Route path="/recetas" element={<Recetas />} />
        <Route path="/ambiente" element={<Ambiente />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/*" element={<RutasPublicas />} />
      </Routes>
    </BrowserRouter>
  );
}
