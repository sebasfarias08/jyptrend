import React from "react";
import { useCart } from "../context/CartContext";

export default function Header({ setView }) {
  const { cart } = useCart();
  const items = cart.length;

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="font-bold text-xl cursor-pointer" onClick={() => setView("tienda")}>
        JYP Trend
      </h1>
      <nav className="flex gap-4 items-center text-sm font-semibold">
        <span className="cursor-pointer hover:underline" onClick={() => setView("tienda")}>
          Tienda
        </span>

        <div className="relative cursor-pointer" onClick={() => setView("carrito")}>
          <span className="material-icons">shopping_cart</span>
          {items > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-xs text-white font-bold rounded-full px-1">
              {items}
            </span>
          )}
        </div>
      </nav>
    </header>
  );
}