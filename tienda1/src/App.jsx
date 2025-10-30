import { useState, useEffect, useRef } from "react";
import { useAuth } from "./context/AuthContext";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import GoogleLoginButton from "./components/GoogleLoginButton";
import BottomTabs from "./components/BottomTabs";

export default function App() {
  const [view, setView] = useState("tienda");
  const [categoria, setCategoria] = useState("perfumes");
  const { user } = useAuth();

  // 🔹 Control del padding dinámico
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef(null);

  useEffect(() => {
    if (headerRef.current) {
      const observer = new ResizeObserver(() => {
        setHeaderHeight(headerRef.current.offsetHeight);
      });
      observer.observe(headerRef.current);
      return () => observer.disconnect();
    }
  }, []);

  if (!user) return <GoogleLoginButton />;

  return (
    <div className="min-h-screen bg-slate-100 pb-16">
      {/* Header con referencia para medir altura */}
      <div ref={headerRef}>
        <Header setView={setView} />
      </div>

      {/* 🔹 Padding dinámico igual a la altura del header */}
      <main style={{ paddingTop: `${headerHeight + 8}px` }} className="p-2">
        {view === "tienda" && <ProductList categoria={categoria} />}
        {view === "carrito" && <Cart />}
      </main>

      {/* Barra inferior visible solo en vista tienda */}
      {view === "tienda" && (
        <BottomTabs categoria={categoria} setCategoria={setCategoria} />
      )}
    </div>
  );
}