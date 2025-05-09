const BASE_URL = 'https://script.google.com/macros/s/AKfycbxQoPVXwdqPjdb6cUCBCVFW5V-fi-fkQtfn0ZM0_79w636TzzPAkDwaiRsBoehTutdz3g/exec'; // URL del script de Google Apps

const catalogoContainer = document.getElementById('catalogo-container');
const filtroCategoria = document.getElementById('filtro-categoria');
const busquedaInput = document.getElementById('busqueda');
const filtroOferta = document.getElementById('filtro-oferta');

function construirURL() {
    const categoria = filtroCategoria.value;
    const nombre = busquedaInput.value.trim();
    const soloOferta = filtroOferta.checked;

    const params = new URLSearchParams();

    if (nombre) return `${BASE_URL}?nombre=${encodeURIComponent(nombre)}`;
    if (categoria) return `${BASE_URL}?categoria=${encodeURIComponent(categoria)}`;
    if (soloOferta) params.append('oferta', 'si');

    return `${BASE_URL}?${params.toString()}`;
}

function cargarProductos() {
    const url = construirURL();
    fetch(url)
        .then(res => res.json())
        .then(data => {
            catalogoContainer.innerHTML = '';

            if (data.length === 0) {
                catalogoContainer.innerHTML = '<p>No se encontraron productos.</p>';
                return;
            }

            data.forEach(p => {
                const card = document.createElement('div');
                card.className = 'producto-card';
                card.innerHTML = `
          <img src="${p.Image}" alt="${p.Nombre}" />
          <h3>${p.Nombre}</h3>
          <p>${p.Descripcion}</p>
          <p><strong>Marca:</strong> ${p.Marca}</p>
          <p><strong>Tamaño:</strong> ${p['Tamaño/Volumen']}</p>
          <p><strong>Precio:</strong> $${p['Lista x Unidad']}</p>
          <p><strong>Stock:</strong> ${p.STOCK}</p>
          ${p.Oferta ? `<p class="oferta">🔥 En oferta</p>` : ''}
        `;
                catalogoContainer.appendChild(card);
            });
        })
        .catch(error => {
            catalogoContainer.innerHTML = '<p>Error al cargar productos.</p>';
            console.error(error);
        });
}

filtroCategoria.addEventListener('change', cargarProductos);
busquedaInput.addEventListener('input', () => {
    if (busquedaInput.value.length > 2 || busquedaInput.value.length === 0) {
        cargarProductos();
    }
});

// Cargar productos al inicio
document.addEventListener('DOMContentLoaded', () => {
    filtroCategoria.addEventListener('change', cargarProductos);
    busquedaInput.addEventListener('input', cargarProductos);
    filtroOferta.addEventListener('change', cargarProductos);
    cargarProductos(); // Llama a la función inicialmente para cargar todos los productos
});
