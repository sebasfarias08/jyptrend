import React from "react";
import { useCart } from "../context/CartContext";
import { supabase } from "../services/supabaseClient";
import { useAuth } from "../context/AuthContext";

export default function Cart() {
  const { cart, setCart } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const formatPrice = (n) =>
    n?.toLocaleString("es-AR", { style: "currency", currency: "ARS" }) || "$0";

  const total = cart.reduce((acc, item) => acc + (item.precio || 0), 0);

  const checkout = async () => {
    if (!cart.length) return alert("El carrito está vacío 🛒");
    if (!user) return alert("Debes iniciar sesión para hacer un pedido ✅");
    if (cart.some((i) => !i.precio)) return alert("Hay productos sin precio válido.");
    
    setLoading(true);
    
    // Llamada atómica a la función en la base
    const { data, error } = await supabase.rpc("process_order", {
      _vendedor: user.email,
      _items: cart,   // supabase-js serializa a jsonb
      _total: total
    });

    setLoading(false);

    if (error) {
      console.error("❌ Error procesando pedido:", error);
      // Mensaje de stock insuficiente desde la excepción de la función
      alert(`❌ No se pudo completar el pedido: ${error.message}`);
      return;
    }

    alert(`✅ Pedido registrado con éxito! ID: ${data}`);
    setCart([]);
    setView("home");
  };

  if (!cart.length) {
    return (
        <div className="p-4 text-center">
          <button
            onClick={() => setView("home")}
            className="text-sm text-blue-600 mb-3 hover:underline"
          >
            ← Volver al inicio
          </button>
          <p className="text-gray-600 mt-10">El carrito está vacío 🛒</p>
        </div>
    );
  }

  return (
    <div className="p-4">
      <button
        onClick={() => setView("home")}
        className="text-sm text-blue-600 mb-3 hover:underline"
      >
        ← Volver al inicio
      </button>

      <h2 className="text-xl font-bold mb-4">Mi Venta</h2>

      {cart.map((p, index) => (
        <div
          key={index}
          className="flex items-center justify-between bg-white shadow rounded p-2 mb-2"
        >
          <div className="flex items-center gap-2">
            <img
              src={p.imagen_url || p.imagen}
              alt={p.nombre}
              className="w-12 h-12 object-cover rounded"
            />
            <span className="text-sm font-medium">{p.nombre}</span>
          </div>
          <div className="text-right">
            <p className="text-blue-600 font-bold">{formatPrice(p.precio)}</p>
            <button
              className="text-xs text-red-600 hover:underline"
              onClick={() =>
                setCart((prev) => prev.filter((_, i) => i !== index))
              }
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}

      <div className="mt-4 flex justify-between items-center bg-gray-100 p-3 rounded">
        <span className="font-bold">Total:</span>
        <span className="font-bold text-blue-600">{formatPrice(total)}</span>
      </div>

      <button
        disabled={loading}
        className={`mt-4 w-full text-white p-3 rounded-lg font-bold transition-all ${
          loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
        }`}
        onClick={checkout}
      >
        {loading ? "Procesando pedido..." : "Finalizar compra"}
      </button>
    </div>
  );
}