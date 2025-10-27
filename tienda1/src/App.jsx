import { useState } from "react";
import { useAuth } from "./context/AuthContext";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import OrdersList from "./components/OrdersList";
import GoogleLoginButton from "./components/GoogleLoginButton";
import Profile from "./components/Profile";

export default function App() {
  const [view, setView] = useState("tienda");
  const { user } = useAuth();

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
      </main>
    </div>
  );
}