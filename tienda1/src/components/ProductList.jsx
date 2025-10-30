import React, { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";
import { useCart } from "../context/CartContext";

export default function ProductList({ categoria }) {
  const { addToCart } = useCart();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    const cargar = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("productos")
        .select("*")
        .eq("activo", true)
        .eq("categoria", categoria) // ✅ filtro por categoría
        .order("nombre", { ascending: true });
      if (!error) setProductos(data);
      setLoading(false);
    };
    cargar();
  }, [categoria]); // ✅ se recarga al cambiar categoría

  const filtrar = (lista) => {
    const q = (filtro || "").toLowerCase();
    if (!q) return lista;
    return lista.filter((item) =>
      (item?.nombre || "").toLowerCase().includes(q)
    );
  };

  const visibles = filtrar(productos);

  if (loading) {
    return <p className="p-4 text-gray-600">Cargando productos…</p>;
  }
  if (error) {
    return <p className="p-4 text-red-600">{error}</p>;
  }

  return (
    <section className="mt-6">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-2xl font-bold">Productos</h2>
        <input
          className="ml-auto border rounded px-2 py-1 text-sm"
          placeholder="Buscar…"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {visibles.map((item) => {
          // ⚠️ TODO ESTO ESTÁ DENTRO DEL MAP — NO MOVER FUERA
          const imgSrc = item?.imagen_path
            ? supabase
                .storage
                .from("productos")
                .getPublicUrl(item.imagen_path).publicURL
            : (item?.imagen_url || "");

          const agotado = (item?.stock ?? 0) <= 0;

          return (
            <article
              key={item.id} // clave estable
              className={`bg-white p-3 rounded-lg shadow transition ${
                agotado ? "opacity-60" : "hover:shadow-lg"
              }`}
            >
              <div className="w-full h-32 bg-gray-100 rounded mb-2 overflow-hidden">
                {imgSrc ? (
                  <img
                    src={imgSrc}
                    alt={item?.nombre || "Producto"}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full grid place-items-center text-xs text-gray-400">
                    Sin imagen
                  </div>
                )}
              </div>

              <h3 className="text-gray-800 font-semibold line-clamp-2 min-h-10">
                {item?.nombre || "Producto"}
              </h3>

              <div className="mt-1 text-sm text-gray-600">
                {item?.marca && <span>{item.marca} · </span>}
                {item?.tamano && <span>{item.tamano}</span>}
              </div>

              <div className="mt-2 flex items-center justify-between">
                <span className="text-blue-600 font-bold">
                  ${Number(item?.precio ?? 0).toLocaleString("es-AR")}
                </span>
                <span className="text-xs text-gray-500">
                  Stock: {Number(item?.stock ?? 0)}
                </span>
              </div>

              <button
                className={`mt-3 w-full rounded-lg font-semibold py-2 ${
                  agotado
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
                disabled={agotado}
                onClick={() =>
                  addToCart({
                    id: item.id,
                    nombre: item.nombre,
                    precio: item.precio,
                    stock: item.stock,
                    imagen_path: item.imagen_path,
                    imagen_url: item.imagen_url,
                  })
                }
              >
                {agotado ? "Sin stock" : "Agregar al carrito"}
              </button>
            </article>
          );
        })}
      </div>

      {visibles.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No hay resultados.</p>
      )}
    </section>
  );
}