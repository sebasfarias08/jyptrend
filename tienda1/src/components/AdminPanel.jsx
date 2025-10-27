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

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead className="bg-blue-600 text-white text-sm">
            <tr>
              <th className="p-2 text-left">ID</th>
              <th className="p-2 text-left">Fecha</th>
              <th className="p-2 text-left">Vendedor</th>
              <th className="p-2 text-left">Total</th>
              <th className="p-2 text-left">Estado</th>
              <th className="p-2 text-left">Acciones</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {pedidos.map((p) => (
              <tr key={p.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{p.id}</td>
                <td className="p-2 text-gray-600">
                  {new Date(p.fecha).toLocaleString()}
                </td>
                <td className="p-2">{p.vendedor_email}</td>
                <td className="p-2 font-bold">${p.total}</td>
                <td className="p-2 font-semibold">{p.estado}</td>

                <td className="p-2">
                  <div className="flex gap-1">
                    <button
                      className="bg-green-600 text-white text-xs px-2 py-1 rounded"
                      onClick={() => cambiarEstado(p.id, "Entregado")}
                    >
                      ✅
                    </button>
                    <button
                      className="bg-yellow-500 text-white text-xs px-2 py-1 rounded"
                      onClick={() => cambiarEstado(p.id, "En Proceso")}
                    >
                      🔄
                    </button>
                    <button
                      className="bg-red-600 text-white text-xs px-2 py-1 rounded"
                      onClick={() => cambiarEstado(p.id, "Cancelado")}
                    >
                      ❌
                    </button>

                    <details>
                      <summary className="cursor-pointer text-blue-800 text-xs">
                        📦
                      </summary>
                      <ul className="absolute bg-white border rounded p-2 shadow text-xs mt-1">
                        {p.productos.map((prod, i) => (
                          <li key={i}>• {prod.nombre}</li>
                        ))}
                      </ul>
                    </details>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
