import React from "react";

export default function BottomTabs({ categoria, setCategoria }) {
  const tabs = [
    { id: "botellas", icon: "🧴", label: "Botellas" },
    { id: "perfumes", icon: "💎", label: "Perfumes" },
    { id: "importados", icon: "🌍", label: "Importados" },
    { id: "outlet", icon: "🔖", label: "Outlet" },
    { id: "reservas", icon: "📦", label: "Reservas" }
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t flex justify-around py-2 text-sm font-medium z-50">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`flex flex-col items-center ${
            categoria === tab.id ? "text-blue-600" : "text-gray-500"
          }`}
          onClick={() => setCategoria(tab.id)}
        >
          <span className="text-lg">{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
