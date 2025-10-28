import React, { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";
import ProductForm from "./ProductForm";

export default function ProductManager() {
  const [productos, setProductos] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    const { data, error } = await supabase
      .from("productos")
      .select("*")
      .order("nombre", { ascending: true });

    if (!error) setProductos(data || []);
  };

  const actualizarProducto = async (id, field, value) => {
    const { error } = await supabase.from("productos").update({ [field]: value }).eq("id", id);
    if (error) {
      alert("Error al actualizar el producto: " + error.message);
    }
    cargarProductos();
  };

  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(filtro.toLowerCase())
  );

  // Local state for editing price and stock
  const [editValues, setEditValues] = useState({});

  const handleEditChange = (id, field, value) => {
    setEditValues((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleEditBlur = (id, field) => {
    if (editValues[id] && editValues[id][field] !== undefined) {
      actualizarProducto(id, field, Number(editValues[id][field]));
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">🛠️ Gestión de Productos</h2>
        <button
          className="bg-purple-600 text-white px-3 py-2 rounded text-sm hover:bg-purple-700"
          onClick={() => setShowForm(!showForm)}
        >
          ➕ Nuevo producto
        </button>
      </div>

      // ProductForm expects:
      // - onClose: callback to close the form modal
      // - reload: callback to refresh the product list after adding a product
            {showForm && (
              <ProductForm onClose={() => setShowForm(false)} reload={cargarProductos} />
            )}

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
              <th className="p-2 text-left">Img</th>
              <th className="p-2 text-left">Nombre</th>
              <th className="p-2 text-left">Precio</th>
              <th className="p-2 text-left">Stock</th>
              <th className="p-2 text-left">Acción</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {productosFiltrados.map((p) => {
              const imgSrc = p.imagen_path
                ? supabase.storage.from("productos").getPublicUrl(p.imagen_path).data.publicUrl
                : p.imagen_url || "";

              return (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="p-2">
                    {imgSrc ? (
                      <img
                        src={imgSrc}
                        alt={p.nombre}
                        className="w-12 h-12 object-cover rounded border"
                      />
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="p-2">{p.nombre}</td>
                  <td className="p-2">
                    <input
                      type="number"
                      value={
                        editValues[p.id]?.precio !== undefined
                          ? editValues[p.id].precio
                          : p.precio
                      }
                      className="w-24 p-1 border rounded"
                      onChange={(e) =>
                        handleEditChange(p.id, "precio", e.target.value)
                      }
                      onBlur={() => handleEditBlur(p.id, "precio")}
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      value={
                        editValues[p.id]?.stock !== undefined
                          ? editValues[p.id].stock
                          : p.stock
                      }
                      className="w-16 p-1 border rounded"
                      onChange={(e) =>
                        handleEditChange(p.id, "stock", e.target.value)
                      }
                      onBlur={() => handleEditBlur(p.id, "stock")}
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
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}