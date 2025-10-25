import { useState } from "react";
import { useAuth } from "./context/AuthContext";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import GoogleLoginButton from "./components/GoogleLoginButton";

export default function App() {
  const [view, setView] = useState("tienda");
  const { user } = useAuth();

  if (!user) {
    return <GoogleLoginButton />; // Si no hay usuario, mostramos login
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <Header setView={setView} />

      <main className="p-4">
        {view === "tienda" && <ProductList />}
        {view === "carrito" && <Cart />}
      </main>
    </div>
  );
}