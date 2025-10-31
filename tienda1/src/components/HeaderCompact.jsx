import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function HeaderCompact({ setView }) {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="top-0 left-0 right-0 bg-[#F1F1F1] text-[#00796B] shadow-sm z-50 flex justify-between items-center px-4 py-3">
      {/* Menú hamburguesa */}
      <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl">☰</button>

      {/* Icono perfil */}
      <img
        src={user.picture}
        alt="Perfil"
        className="w-8 h-8 rounded-full border border-[#00796B] cursor-pointer"
        title={user.email}
        onClick={() => setView("perfil")}
      />

      {/* Menú lateral */}
      {menuOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-40 z-40" onClick={() => setMenuOpen(false)}></div>
          <div className="fixed top-0 left-0 w-64 h-full bg-white text-gray-800 shadow-lg z-50 animate-slideIn">
            <div className="p-4 font-bold text-[#00796B] border-b">Menú</div>
            <ul className="flex flex-col p-2">
              <li className="p-2 hover:bg-gray-100 cursor-pointer rounded" onClick={() => {setView("home"); setMenuOpen(false);}}>🏠 Inicio</li>
              <li className="p-2 hover:bg-gray-100 cursor-pointer rounded" onClick={() => {setView("carrito"); setMenuOpen(false);}}>🛒 Carrito</li>
              <li className="p-2 hover:bg-gray-100 cursor-pointer rounded" onClick={() => {logout();}}>🚪 Salir</li>
            </ul>
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