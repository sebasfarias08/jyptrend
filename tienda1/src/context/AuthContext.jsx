import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [rol, setRol] = useState("vendedor");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      cargarRol(parsedUser.email);
    }
  }, []);

  const cargarRol = async (email) => {
    const { data, error } = await supabase
      .from("usuarios_roles")
      .select("rol")
      .eq("email", email)
      .single();

    if (!error && data) {
      setRol(data.rol);
    }
  };

  const login = async (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    cargarRol(userData.email);
  };

  const logout = () => {
    setUser(null);
    setRol("vendedor");
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ user, rol, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
