import React from "react";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, setCart } = useCart();

  const total = cart.reduce((acc, item) => acc + (item.listaUnidad || 0), 0);

  const checkout = async () => {
    if (!cart.length) return;

    const body = {
      productos: cart,
      total
    };

    const res = await fetch(
      "https://script.google.com/macros/s/AKfycbwX7NDsIB0tXoYgPqHlqgfxYJE4SoIa6F3v9VjgSbsuXdOIT75lf0uepwo_RPNynrLN/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      }
    );

    const data = await res.json();

    if (data.status === "ok") {
      alert(`✅ Pedido registrado con ID: ${data.pedidoId}`);
      setCart([]); // Vaciamos carrito
    } else {
      alert("❌ Error procesando pedido");
    }
  };

  if (!cart.length) {
    return <p className="text-center text-gray-600 mt-10">El carrito está vacío 🛒</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Mi Carrito</h2>

      {cart.map((p, index) => (
        <div
          key={index}
          className="flex items-center justify-between bg-white shadow rounded p-2 mb-2"
        >
          <div className="flex items-center gap-2">
            <img
              src={p.imagen}
              alt={p.nombre}
              className="w-12 h-12 object-cover rounded"
            />
            <span className="text-sm font-medium">{p.nombre}</span>
          </div>
          <div className="text-right">
            <p className="text-blue-600 font-bold">${p.listaUnidad}</p>
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
        <span className="font-bold text-blue-600">${total}</span>
      </div>

      <button
        className="mt-4 w-full bg-green-600 text-white p-3 rounded-lg font-bold hover:bg-green-700"
        onClick={checkout}
      >
        Finalizar compra ✅
      </button>
    </div>
  );
}