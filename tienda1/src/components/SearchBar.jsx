import { useCart } from "../context/CartContext";

export default function SearchBar({ value, setValue, onCartClick }) {
  const { cart } = useCart();
  const totalItems = cart.reduce((acc, item) => acc + (item.cantidad || 1), 0);

  return (
    <div className="flex items-center bg-white shadow rounded-full px-3 py-2 mb-4">
      <input
        type="text"
        placeholder="Buscar producto..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="flex-1 outline-none text-sm text-gray-700 px-2"
      />

      <div className="relative ml-2">
        <button
          onClick={onCartClick}
          className="text-[#00796B] text-xl hover:text-[#005f56] transition"
        >
          🛒
        </button>

        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#FF7A00] text-white text-xs font-bold rounded-full px-1.5">
            {totalItems}
          </span>
        )}
      </div>
    </div>
  );
}