import React, { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";

export default function AdminPanel() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    cargarPedidos();
  }, []);

  const cargarPedidos = async () => {
    const { data, error } = await supabase
      .from("pedidos")
      .select("*")
      .order("fecha", { ascending: false });

    if (!error) setPedidos(data);
  };

  const cambiarEstado = async (id, nuevoEstado) => {
    await supabase
      .from("pedidos")
      .update({ estado: nuevoEstado })
      .eq("id", id);

    cargarPedidos();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">📌 Panel Admin</h2>

      {pedidos.map((p) => (
        <div key={p.id} className="bg-white shadow p-3 rounded-lg mb-3">
          <p className="font-bold">Pedido #{p.id}</p>
          <p className="text-sm text-gray-600">{new Date(p.fecha).toLocaleString()}</p>
          <p className="text-sm text-gray-700 mt-2"><b>Vendedor:</b> {p.vendedor_email}</p>
          <p className="text-sm font-semibold mt-2">Total: ${p.total}</p>
          <p className="text-xs mt-1">Estado: {p.estado}</p>

          <details className="mt-2 cursor-pointer">
            <summary className="text-sm text-blue-800">Ver productos</summary>
            <ul className="text-xs mt-1 pl-4 text-gray-700">
              {p.productos.map((prod, i) => (
                <li key={i}>- {prod.nombre} (x1)</li>
              ))}
            </ul>
          </details>

          <div className="flex gap-2 mt-2">
            <button
              className="bg-green-600 text-white text-xs px-2 py-1 rounded"
              onClick={() => cambiarEstado(p.id, "Entregado")}
            >
              ✅ Entregado
            </button>
            <button
              className="bg-yellow-600 text-white text-xs px-2 py-1 rounded"
              onClick={() => cambiarEstado(p.id, "En Proceso")}
            >
              🔄 En Proceso
            </button>
            <button
              className="bg-red-600 text-white text-xs px-2 py-1 rounded"
              onClick={() => cambiarEstado(p.id, "Cancelado")}
            >
              ❌ Cancelar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
