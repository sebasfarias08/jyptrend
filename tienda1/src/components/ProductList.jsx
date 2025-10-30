import React, { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";
import { useCart } from "../context/CartContext";
import ProductDetail from "./ProductDetail";

export default function ProductList({ categoria }) {
  const { addToCart } = useCart();
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarProductos = async () => {
      setLoading(true);
      let query = supabase
        .from("productos")
        .select("*")
        .gt("stock", 0)
        .eq("activo", true);

      // ✅ Filtrado dinámico por categoría
      if (categoria) {
        query = query.ilike("categoria", `%${categoria}%`);
      }

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
          ? supabase.storage.from("productos").getPublicUrl(p.imagen_path).publicURL
          : p.imagen_url || "";

        return (
          <div
            key={p.id}
            onClick={() => setProductoSeleccionado(p)}
            className="relative bg-white rounded-lg shadow p-2 hover:shadow-lg transition cursor-pointer"
          >
            <div className="relative">
              <img
                src={imgSrc}
                alt={p.nombre}
                className="w-16 h-16 object-cover rounded"
              />
              <span
                className={`absolute bottom-1 right-1 text-[10px] font-semibold px-1.5 py-0.5 rounded ${p.stock > 0
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                  }`}
              >
                {p.stock > 0 ? `${p.stock}` : "Agotado"}
              </span>
            </div>

            <div className="flex-1 px-3">
              <h3 className="text-sm font-semibold">{p.nombre}</h3>
              <p className="text-black text-xs">
                {p.precio?.toLocaleString("es-AR", {
                  style: "currency",
                  currency: "ARS",
                  minimumFractionDigits: 0
                })}
              </p>
            </div>

            <button
              className="text-black text-sm px-3 py-1 rounded hover:bg-[#00796B]"
              onClick={() => addToCart(p)}
            >
              🛒
            </button>
          </div>
        );
      })}

      {productoSeleccionado && (
        <ProductDetail
          producto={productoSeleccionado}
          onClose={() => setProductoSeleccionado(null)}
        />
      )}
    </div>
  );
}