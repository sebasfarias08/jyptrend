import React, { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";
import { useCart } from "../context/CartContext";

export default function ProductGrid({ search }) {
  const { addToCart } = useCart();
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const cargar = async () => {
      let query = supabase.from("productos").select("*").gt("stock", 0).eq("activo", true);
      if (search) query = query.ilike("nombre", `%${search}%`);
      const { data } = await query.order("nombre", { ascending: true });
      setProductos(data || []);
    };
    cargar();
  }, [search]);

  return (
    <div className="grid grid-cols-2 gap-3">
      {productos.map((p) => {
        const imgSrc = p.imagen_path
          ? `https://vbafwbityuxbpnunfvej.supabase.co/storage/v1/object/public/${p.imagen_path}`
          : p.imagen_url || "";
        return (
          <div key={p.id} className="bg-white rounded-2xl shadow-md overflow-hidden relative">
            <img src={imgSrc} alt={p.nombre} className="w-full h-32 object-cover" />
            <div className="p-2">
              <h3 className="text-xs font-semibold text-gray-700 truncate">{p.nombre}</h3>
              <p className="text-[#00796B] text-sm font-bold">
                {p.precio?.toLocaleString("es-AR", { style: "currency", currency: "ARS", minimumFractionDigits: 0 })}
              </p>
            </div>
            <button
              onClick={() => addToCart(p)}
              className="absolute bottom-2 right-2 bg-[#00796B] text-white w-7 h-7 rounded-full flex items-center justify-center shadow-md hover:bg-[#00695C]"
            >
              +
            </button>
          </div>
        );
      })}
    </div>
  );
}