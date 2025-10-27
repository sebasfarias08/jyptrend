import { useState } from "react";
import { useAuth } from "./context/AuthContext";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import OrdersList from "./components/OrdersList";
import Profile from "./components/Profile";
import AdminPanel from "./components/AdminPanel";
import ProductManager from "./components/ProductManager";
import GoogleLoginButton from "./components/GoogleLoginButton";

export default function App() {
  const [view, setView] = useState("tienda");
  const { user, rol } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-100 flex justify-center items-center">
        <GoogleLoginButton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <Header setView={setView} />

      <main className="p-4">
        {view === "tienda" && <ProductList />}
        {view === "carrito" && <Cart />}
        {view === "pedidos" && <OrdersList />}
        {view === "perfil" && <Profile />}

        {/* ✅ Estas dos requieren permisos admin */}
        {view === "admin" && rol === "admin" && (
          <AdminPanel setView={setView} />
        )}

        {view === "productos" && rol === "admin" && (
          <ProductManager />
        )}
      </main>
    </div>
  );
}