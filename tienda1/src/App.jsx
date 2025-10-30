import { useState } from "react";
import { useAuth } from "./context/AuthContext";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import GoogleLoginButton from "./components/GoogleLoginButton";
import BottomTabs from "./components/BottomTabs"; // ✅ NUEVO

export default function App() {
  const [view, setView] = useState("tienda");
  const [categoria, setCategoria] = useState("perfumes"); // ✅ categoría por defecto
  const { user } = useAuth();

  if (!user) {
    return <GoogleLoginButton />; // Si no hay usuario, mostramos login
  }

  return (
    <div className="min-h-screen bg-slate-100 pb-16"> 
      {/* pb-16 deja espacio para la barra inferior */}
      <Header setView={setView} />

      <main className="p-2">
        {view === "tienda" && <ProductList categoria={categoria} />}
        {view === "carrito" && <Cart />}
      </main>

      {/* ✅ Barra inferior solo visible en vista tienda */}
      {view === "tienda" && (
        <BottomTabs categoria={categoria} setCategoria={setCategoria} />
      )}
    </div>
  );
}