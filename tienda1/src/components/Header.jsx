import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Header({ setView }) {
  const { cart } = useCart();
  const { user, rol, logout } = useAuth();
  const items = cart.length;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#F1F1F1] text-[#00796B] p-4 flex justify-between items-center shadow-lg">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="text-2xl focus:outline-none hover:text-gray-400 transition"
      >
        ☰
      </button>

      <div
        className="relative cursor-pointer flex items-center gap-1 hover:text-gray-400 transition"
        onClick={() => setView("carrito")}
      >
        🛒
        <span>Carrito Compras</span>
        {items > 0 && (
          <span className="absolute -top-2 -right-2 bg-[#F1F1F1] text-xs text-[#00796B] font-bold rounded-full px-1">
            {items}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        {user && (
          <img
            src={user.picture}
            alt="Perfil"
            className="w-8 h-8 rounded-full border-2 border-white cursor-pointer"
            title={user.email}
            onClick={() => setView("perfil")}
          />
        )}
      </div>

      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            onClick={() => setMenuOpen(false)}
          ></div>

          <div className="fixed top-0 left-0 w-64 h-full bg-white text-gray-800 shadow-lg z-50 animate-slideIn flex flex-col justify-between">
            <div>
              <div className="p-4 font-bold text-[#00796B] border-b">Menú</div>
              <ul className="flex flex-col p-2">
                <li
                  className="p-2 hover:bg-gray-100 cursor-pointer rounded"
                  onClick={() => {
                    setView("tienda");
                    setMenuOpen(false);
                  }}
                >
                  🛍️ Productos
                </li>
                <li
                  className="p-2 hover:bg-gray-100 cursor-pointer rounded"
                  onClick={() => {
                    setView("pedidos");
                    setMenuOpen(false);
                  }}
                >
                  💸 Ventas
                </li>
                {rol === "admin" && (
                  <li
                    className="p-2 hover:bg-gray-100 cursor-pointer rounded"
                    onClick={() => {
                      setView("admin");
                      setMenuOpen(false);
                    }}
                  >
                    ⚙️ Admin
                  </li>
                )}
              </ul>
            </div>

            <div className="p-4 border-t">
              <button
                className="w-full text-sm bg-[#00796B] text-white px-3 py-2 rounded hover:bg-[#009688]"
                onClick={logout}
              >
                🚪 Salir
              </button>
            </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slideIn {
          animation: slideIn 0.25s ease-out;
        }
      `}</style>
    </header>
  );
}