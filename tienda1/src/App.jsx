import { useState, useEffect, useRef } from "react";
import { useAuth } from "./context/AuthContext";
import HeaderCompact from "./components/HeaderCompact";
import SearchBar from "./components/SearchBar";
import ProductGrid from "./components/ProductGrid";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import GoogleLoginButton from "./components/GoogleLoginButton";

export default function App() {
  const [view, setView] = useState("home");
  const [search, setSearch] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const { user } = useAuth();

  if (!user) return <GoogleLoginButton />;

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      {/* Header */}
      <HeaderCompact setView={setView} />

      {/* Contenido */}
      <main className="p-4 pt-20 max-w-md mx-auto">
        {view === "home" && (
          <>
            <SearchBar
              value={search}
              setValue={setSearch}
              onCartClick={() => setView("carrito")}
            />
            <ProductGrid
              search={search}
              onSelectProduct={(p) => {
                setProductoSeleccionado(p);
                setView("detalle");
              }}
            />
          </>
        )}
        {view === "detalle" && productoSeleccionado && (
          <ProductDetail
            producto={productoSeleccionado}
            onBack={() => setView("home")}
          />
        )}

        {view === "carrito" && <Cart />}
        
      </main>
    </div>
  );
}