document.addEventListener("DOMContentLoaded", () => {

    // script.js
    const url = "https://script.google.com/macros/s/AKfycbxQoPVXwdqPjdb6cUCBCVFW5V-fi-fkQtfn0ZM0_79w636TzzPAkDwaiRsBoehTutdz3g/exec";
    let catalogoCompleto = [];

    // Referencias al modal y elementos internos
    const modal = document.getElementById("modalImagen");
    const imgModal = document.getElementById("imagenAmpliada");
    const btnCerrar = document.getElementById("cerrarModal");

    // Función para abrir el modal
    function abrirModalImagen(src) {
    imgModal.src = src;
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    }

    // Función para cerrar el modal
    function cerrarModalImagen() {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    imgModal.src = "";
    }

    // Event listeners
    btnCerrar.addEventListener("click", cerrarModalImagen);
    modal.addEventListener("click", (e) => {
    if (e.target === modal) cerrarModalImagen(); // Cierra si hace clic fuera de la imagen
    });


    const renderCatalogo = (categoria) => {
        const contenedor = document.getElementById("catalogo");
        contenedor.innerHTML = "";

        let productos = categoria === "Todos"
            ? catalogoCompleto
            : catalogoCompleto.filter(p => (p.categoria || "").toLowerCase() === categoria.toLowerCase());

        // Ordenar: disponibles primero, luego alfabéticamente por nombre
        productos.sort((a, b) => {
            const disponibleA = a.stock > 0 ? 0 : 1;
            const disponibleB = b.stock > 0 ? 0 : 1;
            if (disponibleA !== disponibleB) return disponibleA - disponibleB;
            return a.nombre.localeCompare(b.nombre);
        });

        productos.forEach(item => {
            const disponible = item.stock > 0;
            const estado = disponible ? "Disponible" : "No disponible";
            const color = disponible ? "text-green-600" : "text-gray-500";

            const div = document.createElement("div");
            div.className = "bg-white rounded-lg shadow-md overflow-hidden";
            div.innerHTML = `
            <div class="relative">
                <img src="${item.imagen}" alt="${item.nombre}" class="w-full h-48 object-cover ${!disponible ? 'grayscale opacity-60' : ''}">
                ${!disponible ? '<div class="absolute top-2 left-2 bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded">Agotado</div>' : ''}   
            </div>
            <div class="p-4">
            <h2 class="text-lg font-semibold">${item.nombre}</h2>
            <p class="text-sm text-gray-500">${item.marca} - ${item.tamano}</p>
            <p class="mt-2 text-blue-600 font-bold">$${item.listaUnidad?.toLocaleString("es-AR") || "-"}</p>
            <p class="mt-1 text-sm font-medium ${color}">${estado}</p>
            </div>
            `;
            contenedor.appendChild(div);

            // Agregar evento para abrir modal al hacer clic en la imagen
            const img = div.querySelector("img");
            img.addEventListener("click", () => {
            abrirModalImagen(item.imagen);
            });
        });
    };

    // Cargar primeros 1000 productos (filtro inicial: "Perfume")
    fetch(`${url}?start=0&limit=1000`)
        .then(res => res.json())
        .then(data => {
            catalogoCompleto = data;
            renderCatalogo("Perfume");

            // Cargar el catálogo completo en segundo plano
            fetch(url)
                .then(res => res.json())
                .then(dataCompleta => {
                    catalogoCompleto = dataCompleta;
                })
                .catch(err => console.error("Error cargando catálogo completo:", err));
        })
        .catch(err => console.error("Error cargando los primeros productos:", err));

    // Filtros
    document.getElementById("filtros").addEventListener("click", (e) => {
        if (e.target.classList.contains("filtro-btn")) {
            document.querySelectorAll(".filtro-btn").forEach(btn => {
                btn.classList.remove("text-blue-700", "border-blue-600", "hover:bg-blue-700", "hover:text-white");
                btn.classList.add("text-gray-900", "hover:border-gray-200");
            });

            e.target.classList.add("text-blue-700", "border-blue-600", "hover:bg-blue-700", "hover:text-white");
            
            // 👉 Renderiza el catálogo con el filtro seleccionado
            renderCatalogo(e.target.dataset.filter);

            // 👉 Hace scroll al catálogo
            const catalogo = document.getElementById("catalogo");
            catalogo.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });

    // Menú móvil
    const toggleBtn = document.getElementById('menu-toggle');
    const menu = document.getElementById('mobile-menu');
    toggleBtn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
    });
});