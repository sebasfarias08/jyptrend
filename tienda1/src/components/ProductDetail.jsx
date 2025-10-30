import React from "react";

export default function ProductDetail({ producto, onClose }) {
  if (!producto) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md relative">
        <button
          className="absolute top-2 right-3 text-gray-600 hover:text-black"
          onClick={onClose}
        >
          ✖
        </button>

        <div className="flex flex-col items-center text-center">
          <img
            src={producto.imagen_url || ""}
            alt={producto.nombre}
            className="w-32 h-32 object-cover rounded mb-4 border"
          />
          <h2 className="text-xl font-bold mb-2">{producto.nombre}</h2>
          <p className="text-gray-600 mb-2">{producto.descripcion}</p>
        </div>

        <div className="text-sm text-gray-700">
          <p><strong>Marca:</strong> {producto.marca}</p>
          <p><strong>Categoría:</strong> {producto.categoria}</p>
          <p><strong>Tamaño/Volumen:</strong> {producto.tamano}</p>
          <p><strong>Precio:</strong> {producto.precio?.toLocaleString("es-AR", { style: "currency", currency: "ARS" })}</p>
          <p><strong>Stock:</strong> {producto.stock}</p>
          <p><strong>Peso:</strong> {producto.peso || "-"}</p>
          <p><strong>Barcode:</strong> {producto.barcode || "-"}</p>
        </div>
      </div>
    </div>
  );
}
