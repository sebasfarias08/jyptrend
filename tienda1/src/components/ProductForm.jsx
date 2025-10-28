import React, { useState } from "react";
import { supabase } from "../services/supabaseClient";

const CATEGORIAS = [
  "Perfumes",
  "Body Spray",
  "Cremas",
  "Botellas",
  "Importados",
  "Outlet"
];

export default function ProductForm({ onClose, reload }) {
  const [form, setForm] = useState({
    nombre: "",
    precio: 0,
    stock: 0,
    categoria: "",
    descripcion: "",
    tamano: "",
    marca: "",
  });

  const [imagen, setImagen] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const subirImagen = async () => {
    if (!imagen || !form.categoria) return null;

    const fileExt = imagen.name.split(".").pop();
    const safeName = form.nombre.replace(/[^a-zA-Z0-9]/g, "_");
    const fileName = `${safeName}_${Date.now()}.${fileExt}`;
    const filePath = `${form.categoria.toLowerCase()}/${fileName}`;

    const { error } = await supabase.storage
      .from("productos")
      .upload(filePath, imagen);

    if (error) {
      alert("❌ Error al subir imagen");
      console.error(error);
      return null;
    }

    return filePath;
  };

  const guardarProducto = async () => {
    setLoading(true);
    try {
      const imagePath = await subirImagen();

      if (!imagePath) {
        alert("❌ Error al subir imagen. Debes seleccionar una imagen y categoría antes de guardar.");
        setLoading(false);
        return;
      }

      const { error } = await supabase.from("productos").insert([
        {
          ...form,
          activo: true,
          imagen_path: imagePath,
        },
      ]);

      if (error) {
        alert("❌ Error guardando producto");
        console.error(error);
        setLoading(false);
        return;
      }

      alert("✅ Producto agregado!");
      reload();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow mt-4">
      <h3 className="text-lg font-bold mb-3">➕ Nuevo producto</h3>

      <input
        className="border p-2 w-full mb-2"
        placeholder="Nombre"
        name="nombre"
        value={form.nombre}
        onChange={handleChange}
      />

      <select
        className="border p-2 w-full mb-2"
        name="categoria"
        value={form.categoria}
        onChange={handleChange}
      >
        <option value="">Elegir categoría</option>
        {CATEGORIAS.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <input
        className="border p-2 w-full mb-2"
        placeholder="Precio"
        name="precio"
        type="number"
        value={form.precio}
        onChange={handleChange}
      />

      <input
        className="border p-2 w-full mb-2"
        placeholder="Stock"
        name="stock"
        type="number"
        value={form.stock}
        onChange={handleChange}
      />

      <input
        className="border p-2 w-full mb-2"
        placeholder="Marca"
        name="marca"
        value={form.marca}
        onChange={handleChange}
      />

      <input
        className="border p-2 w-full mb-2"
        placeholder="Tamaño / Volumen"
        name="tamano"
        value={form.tamano}
        onChange={handleChange}
      />

      <textarea
        className="border p-2 w-full mb-2"
        placeholder="Descripción"
        name="descripcion"
        value={form.descripcion}
        onChange={handleChange}
      />

      <label className="text-sm font-semibold mb-1 block">
        Imagen del producto:
      </label>
      <input
        type="file"
        className="mb-3"
        accept="image/*"
        onChange={(e) => setImagen(e.target.files[0])}
      />

      <button
        className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700"
        onClick={guardarProducto}
        disabled={loading}
      >
        {loading ? "Guardando..." : "Guardar ✅"}
      </button>
    </div>
  );
}