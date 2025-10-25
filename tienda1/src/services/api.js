const BASE_URL = "https://script.google.com/macros/s/AKfycbxJiplFtZ2NoYZtgK0fLJA4-J9UjXjuN6MVnQPp5gBPNapmH9cFzCV6W-Uacz8f4MGPtg/exec";

export async function fetchProductos() {
  const res = await fetch(`${BASE_URL}?function=doGetTienda`);

  if (!res.ok) {
    console.error("Error al obtener productos:", res.status, res.statusText);
    return [];
  }

  return res.json();
}