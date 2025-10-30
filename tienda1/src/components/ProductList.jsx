import React, { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";
import { useCart } from "../context/CartContext";

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

  // 🟢 Si hay producto seleccionado, mostrar la vista de detalle
  if (productoSeleccionado) {
    const p = productoSeleccionado;
    const imgSrc = p.imagen_path
      ? supabase.storage.from("productos").getPublicUrl(p.imagen_path).publicURL
      : p.imagen_url || "";

    return (
      <div className="p-4">
        <button
          className="mb-4 text-[#00796B] font-semibold"
          onClick={() => setProductoSeleccionado(null)}
        >
          ← Volver a productos
        </button>

        <div className="bg-white rounded-lg shadow p-4">
          <img
            src={imgSrc}
            alt={p.nombre}
            className="w-full h-64 object-cover rounded mb-4"
          />
          <h2 className="text-lg font-bold mb-2">{p.nombre}</h2>
          <p className="text-gray-700 text-sm mb-2">{p.descripcion}</p>
          <p className="text-sm"><strong>Marca:</strong> {p.marca}</p>
          <p className="text-sm"><strong>Categoría:</strong> {p.categoria}</p>
          <p className="text-sm"><strong>Tamaño:</strong> {p.tamano}</p>
          <p className="text-sm"><strong>Stock:</strong> {p.stock}</p>
          <p className="text-sm"><strong>Peso:</strong> {p.peso || "-"}</p>
          <p className="text-sm"><strong>Barcode:</strong> {p.barcode || "-"}</p>

          <p className="text-[#00796B] font-bold text-lg mt-3">
            {p.precio?.toLocaleString("es-AR", {
              style: "currency",
              currency: "ARS",
              minimumFractionDigits: 0
            })}
          </p>

          <button
            className="mt-4 w-full bg-[#00796B] text-white py-2 rounded-lg font-semibold"
            onClick={() => addToCart(p)}
          >
            🛒 Agregar al carrito
          </button>
        </div>
      </div>
    );
  }

  // 🟢 Vista normal (listado)
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
            className="relative bg-white rounded-lg shadow p-2 hover:shadow-lg transition cursor-pointer flex items-center"
          >
            <div className="relative w-16 h-16 shrink-0">
              <img
                src={imgSrc}
                alt={p.nombre}
                className="w-16 h-16 object-cover rounded"
              />
              <span
                className={`absolute bottom-1 right-1 text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                  p.stock > 0
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
              onClick={(e) => {
                e.stopPropagation();
                addToCart(p);
              }}
            >
              🛒
            </button>
          </div>
        );
      })}
    </div>
  );
}