Buenas este es el proyecto para la publicacion de la pagina web de JyP Trend
🧩 Arquitectura propuesta
✅ Frontend:
GitHub Pages
Hospedás tu HTML/CSS/JS ahí (gratis y rápido).
Hace llamadas HTTP (con fetch) al backend.

✅ Backend/API:
Google Apps Script Web App
Expone funciones vía doGet() / doPost() como una mini API.
Interactúa con Google Sheets, que hace de base de datos.

✅ Base de datos:
Google Sheets
Tus datos se guardan y consultan desde ahí vía Apps Script.

✅ Dominio personalizado:
Squarespace administra tu dominio comprado por Google.
Lo podés redirigir a tu sitio en GitHub Pages.

🔄 Flujo de trabajo
1-El visitante entra a www.tudominio.com (redirigido a GitHub Pages).
2-GitHub sirve tu frontend.
3-Tu JS hace fetch('https://script.google.com/macros/s/AKfycb.../exec').
4-Apps Script responde con los datos desde Sheets.
5-Se renderiza la página con la información.

https://sebasfarias08.github.io/jyptrend