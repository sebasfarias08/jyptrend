import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="p-4 text-center">
      <img
        src={user.picture}
        alt="Foto"
        className="w-20 h-20 rounded-full mx-auto border-4 border-blue-600"
      />
      <h2 className="text-xl font-bold mt-2">{user.nombre}</h2>
      <p className="text-gray-700">{user.email}</p>
    </div>
  );
}