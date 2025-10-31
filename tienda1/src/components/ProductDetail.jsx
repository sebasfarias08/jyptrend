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
    imagen_url,
  } = producto;

  const imgSrc = imagen_path
    ? `https://vbafwbityuxbpnunfvej.supabase.co/storage/v1/object/public/${imagen_path}`
    : imagen_url || "";

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col animate-fadeSlide">
      {/* Imagen principal */}
      <div className="relative">
        <button
          onClick={onBack}
          aria-label="Volver atrás"
          className="absolute top-3 left-3 bg-white rounded-full shadow-md w-8 h-8 flex items-center justify-center text-gray-700"
        >
          ←
        </button>

        <img
          src={imgSrc}
          alt={`Imagen del producto ${nombre}`}
          className="w-full h-72 object-cover rounded-b-3xl"
        />
      </div>

      {/* Contenido del producto */}
      <div className="flex-1 p-4 space-y-2">
        <h2 className="text-xl font-bold text-gray-800">{nombre}</h2>

        <p className="text-[#E53935] font-bold text-lg">
          {precio
            ? precio.toLocaleString("es-AR", {
                style: "currency",
                currency: "ARS",
                minimumFractionDigits: 0,
              })
            : "Precio no disponible"}
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

      {/* Botón tipo lengüeta inferior derecha */}
      <div className="fixed bottom-0 right-0 p-0">
        <button
          onClick={() => addToCart(producto)}
          disabled={stock <= 0}
          className={`
            py-3 px-6
            flex items-center gap-2
            font-semibold text-white
            bg-[#00796B]
            rounded-tl-3xl
            hover:bg-[#00695C]
            transition-all
            shadow-lg
            disabled:opacity-60 disabled:cursor-not-allowed
          `}
        >
          {stock > 0 ? (
            <>
              <span className="text-lg">＋</span>
              Agregar al carrito
            </>
          ) : (
            "❌ Sin stock"
          )}
        </button>
      </div>
      {/* Animación fade + slide */}
       <style>{`
        @keyframes fadeSlide {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeSlide {
          animation: fadeSlide 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}