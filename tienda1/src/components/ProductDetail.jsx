import React from "react";
import { useCart } from "../context/CartContext";

export default function ProductDetail({ producto, onBack }) {
  const { addToCart } = useCart();

  const {
    nombre,
    precio,
    descripcion,
    categoria,
    stock,
    imagen_path,
    imagen_url
  } = producto;

  const imgSrc = imagen_path
    ? `https://vbafwbityuxbpnunfvej.supabase.co/storage/v1/object/public/${imagen_path}`
    : imagen_url || "";

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
      {/* Imagen principal */}
      <div className="relative">
        <button
          onClick={onBack}
          className="absolute top-3 left-3 bg-white rounded-full shadow-md w-8 h-8 flex items-center justify-center text-gray-700"
        >
          ←
        </button>

        <img
          src={imgSrc}
          alt={nombre}
          className="w-full h-72 object-cover rounded-b-3xl"
        />
      </div>

      {/* Contenido del producto */}
      <div className="flex-1 p-4 space-y-2">
        <h2 className="text-xl font-bold text-gray-800">{nombre}</h2>
        <p className="text-[#E53935] font-bold text-lg">
          {precio?.toLocaleString("es-AR", {
            style: "currency",
            currency: "ARS",
            minimumFractionDigits: 0,
          })}
        </p>

        <div className="flex items-center gap-1 text-yellow-500 text-sm">
          ⭐⭐⭐⭐☆
          <span className="text-gray-500 ml-1 text-xs">(4.5)</span>
        </div>

        <p className="text-gray-500 text-sm">
          <span className="font-semibold text-gray-700">Categoría:</span>{" "}
          {categoria || "Sin categoría"}
        </p>

        <p className="text-gray-500 text-sm">
          <span className="font-semibold text-gray-700">Stock:</span>{" "}
          {stock > 0 ? `${stock} unidades disponibles` : "Agotado"}
        </p>

        <div className="pt-3 border-t">
          <h3 className="text-gray-700 font-semibold mb-1">Descripción</h3>
          <p className="text-gray-600 text-sm leading-snug">
            {descripcion || "Sin descripción."}
          </p>
        </div>
      </div>

      {/* Botón fijo inferior */}
      <div className="p-4 bg-white shadow-inner">
        <button
          className="w-full bg-[#00796B] text-white font-semibold py-3 rounded-xl hover:bg-[#00695C] transition"
          onClick={() => addToCart(producto)}
          disabled={stock <= 0}
        >
          {stock > 0 ? "🛒 Agregar al carrito" : "❌ Sin stock"}
        </button>
      </div>
    </div>
  );
}