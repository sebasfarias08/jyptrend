const BASE_URL = "https://script.google.com/macros/s/AKfycbwX7NDsIB0tXoYgPqHlqgfxYJE4SoIa6F3v9VjgSbsuXdOIT75lf0uepwo_RPNynrLN/exec";

export async function fetchProductos() {
  const res = await fetch(`${BASE_URL}?function=doGetTienda`);

  if (!res.ok) {
    console.error("Error al obtener productos:", res.status, res.statusText);
    return [];
  }

  return res.json();
}