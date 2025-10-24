import { useState } from "react";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

function App() {
  const [view, setView] = useState("tienda");

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

export default App;
