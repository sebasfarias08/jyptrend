import React, { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";
import { useCart } from "../context/CartContext";

export default function ProductList({ categoria }) {
  const { addToCart } = useCart();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarProductos = async () => {
      setLoading(true);
      let query = supabase.from("productos").select("*").eq("activo", true);

      // ✅ Filtrado dinámico por categoría
      if (categoria) query = query.eq("categoria", categoria);

      const { data, error } = await query.order("nombre", { ascending: true });

      if (!error) setProductos(data || []);
      setLoading(false);
    };

    cargarProductos();
  }, [categoria]);

  if (loading) return <p className="text-center mt-10">Cargando productos...</p>;

  if (!productos.length)
    return (
      <p className="text-center mt-10 text-gray-600">
        No hay productos en esta categoría 😔
      </p>
    );

  return (
    <div className="flex flex-col gap-2 pb-20">
      {productos.map((p) => {
        const imgSrc = p.imagen_path
          ? supabase.storage.from("productos").getPublicUrl(p.imagen_path).data
              .publicUrl
          : p.imagen_url || "";

        return (
          <div
            key={p.id}
            className="flex items-center bg-white rounded-lg shadow p-2"
          >
            <img
              src={imgSrc}
              alt={p.nombre}
              className="w-16 h-16 object-cover rounded"
            />

            <div className="flex-1 px-3">
              <h3 className="text-sm font-semibold">{p.nombre}</h3>
              <p className="text-gray-600 text-xs">${p.precio}</p>
            </div>

            <button
              className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700"
              onClick={() => addToCart(p)}
            >
              🛒
            </button>
          </div>
        );
      })}
    </div>
  );
}