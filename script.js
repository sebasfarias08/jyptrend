const form = document.getElementById("ventaForm");
const ventasTable = document.querySelector("#ventasTable tbody");

const API_URL = "https://script.google.com/macros/s/AKfycb.../exec"; // tu URL de Apps Script

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = {
        cliente: form.cliente.value,
        producto: form.producto.value,
        cantidad: form.cantidad.value,
        precio: form.precio.value,
    };

    const res = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
    });

    const result = await res.json();
    if (result.status === "ok") {
        alert("Venta guardada");
        form.reset();
        cargarVentas();
    } else {
        alert("Error al guardar");
    }
});

async function cargarVentas() {
    const res = await fetch(API_URL);
    const datos = await res.json();

    ventasTable.innerHTML = "";
    datos.forEach((venta) => {
        const row = document.createElement("tr");
        row.innerHTML = `
      <td>${venta.cliente}</td>
      <td>${venta.producto}</td>
      <td>${venta.cantidad}</td>
      <td>${venta.precio}</td>
      <td>${venta.fecha}</td>
    `;
        ventasTable.appendChild(row);
    });
}

// Cargar ventas al inicio
cargarVentas();