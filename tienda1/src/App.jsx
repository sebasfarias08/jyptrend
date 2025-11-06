import { useState } from "react";
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
      {/* ✅ Header con animación de entrada/salida */}
      <div className={`fixed top-0 left-0 right-0 z-10 transition-transform duration-300 ${view === "detalle" ? "-translate-y-full" : "translate-y-0"}`}>
        <HeaderCompact setView={setView} />
      </div>

      <main
        className={`p-4 max-w-md mx-auto transition-all duration-300 ${view === "detalle" ? "pt-0" : "pt-16"
          }`}
      >
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
            onBack={() => {
              setProductoSeleccionado(null);
              setView("home");
            }}
          />
        )}

        {view === "carrito" && <Cart setView={setView} />}
      </main>
    </div>
  );
}