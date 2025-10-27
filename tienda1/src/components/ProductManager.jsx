import React, { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";

export default function ProductManager() {
  const [productos, setProductos] = useState([]);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    const { data, error } = await supabase
      .from("productos")
      .select("*")
      .order("nombre", { ascending: true });

    if (!error) setProductos(data);
  };

  const actualizarProducto = async (id, field, value) => {
    await supabase
      .from("productos")
      .update({ [field]: value })
      .eq("id", id);

    cargarProductos();
  };

  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">🛠️ Gestión de Productos</h2>

      <input
        type="text"
        placeholder="Buscar producto..."
        className="p-2 border rounded w-full mb-4"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      />

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead className="bg-blue-600 text-white text-sm">
            <tr>
              <th className="p-2 text-left">Nombre</th>
              <th className="p-2 text-left">Precio</th>
              <th className="p-2 text-left">Stock</th>
              <th className="p-2 text-left">Acción</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {productosFiltrados.map((p) => (
              <tr key={p.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{p.nombre}</td>
                <td className="p-2">
                  <input
                    type="number"
                    defaultValue={p.precio}
                    className="w-20 p-1 border rounded"
                    onBlur={(e) =>
                      actualizarProducto(p.id, "precio", Number(e.target.value))
                    }
                  />
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    defaultValue={p.stock}
                    className="w-16 p-1 border rounded"
                    onBlur={(e) =>
                      actualizarProducto(p.id, "stock", Number(e.target.value))
                    }
                  />
                </td>
                <td className="p-2">
                  <button
                    className="bg-blue-600 text-white text-xs px-2 py-1 rounded"
                    onClick={() => actualizarProducto(p.id, "activo", !p.activo)}
                  >
                    {p.activo ? "🔴 Desactivar" : "🟢 Activar"}
                  </button> 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}