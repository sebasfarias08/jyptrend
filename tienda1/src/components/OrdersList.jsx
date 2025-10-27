import React, { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";
import { useAuth } from "../context/AuthContext";

export default function OrdersList() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) return;
    cargarPedidos();
  }, [user]);

  const cargarPedidos = async () => {
    const { data, error } = await supabase
      .from("pedidos")
      .select("*")
      .eq("vendedor_email", user.email);

    if (error) console.error("❌ Error cargando pedidos", error);
    else setOrders(data);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">🛍 Mis Pedidos</h2>

      {orders.length === 0 && (
        <p className="text-gray-600">No tienes pedidos todavía.</p>
      )}

      {orders.map((o) => (
        <div key={o.id} className="bg-white shadow p-3 rounded-lg mb-3">
          <p className="font-bold">Pedido #{o.id}</p>
          <p className="text-sm text-gray-600">{new Date(o.fecha).toLocaleString()}</p>
          <p className="text-sm font-semibold mt-2">Total: ${o.total}</p>
          <p className="text-xs text-blue-600 mt-1">Estado: {o.estado}</p>

          <details className="mt-2 cursor-pointer">
            <summary className="text-sm text-blue-800">Ver productos</summary>
            <ul className="text-xs mt-1 pl-4 text-gray-700">
              {o.productos.map((p, i) => (
                <li key={i}>- {p.nombre} (x1)</li>
              ))}
            </ul>
          </details>
        </div>
      ))}
    </div>
  );
}