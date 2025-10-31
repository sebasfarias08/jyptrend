export default function SearchBar({ value, setValue, onCartClick }) {
  return (
    <div className="flex items-center bg-white shadow rounded-full px-3 py-2 mb-4">
      <input
        type="text"
        placeholder="Buscar producto..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="flex-1 outline-none text-sm text-gray-700 px-2"
      />
      <button onClick={onCartClick} className="text-[#00796B] text-xl ml-2">
        🛒
      </button>
    </div>
  );
}