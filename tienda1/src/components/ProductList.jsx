import React, { useEffect, useState } from 'react'
import { useCart } from '../context/CartContext'
import { fetchProductos } from '../services/api'

export default function ProductList() {
  const { addToCart } = useCart()
  const [productos, setProductos] = useState([])

  useEffect(() => {
    fetchProductos().then(data => setProductos(data))
  }, [])

  if (!productos.length) {
    return <p className="text-center text-gray-600 mt-10">Cargando productos...</p>
  }

  return (
    <section className="mt-6">
      <h2 className="text-2xl font-bold mb-4 text-left">Productos</h2>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {productos.map((p, index) => (
          <div
            key={p.nombre + index}
            className={`bg-white p-3 rounded-lg shadow text-center transition
              ${p.stock <= 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:shadow-lg"}`}
            onClick={() => p.stock > 0 && addToCart(p)}
          >
            <img
              src={p.imagen}
              alt={p.nombre}
              className="w-full h-32 object-cover rounded mb-2"
              loading="lazy"
            />
            <p className="text-gray-700 font-semibold">{p.nombre}</p>
            <p className="text-blue-600 font-bold mt-1">
              ${p.listaUnidad}
            </p>

            {p.stock <= 0 && (
              <p className="text-red-600 text-xs mt-1 font-semibold">Sin stock</p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}