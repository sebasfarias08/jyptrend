import React, { createContext, useContext, useState } from "react";
import { Capacitor } from "@capacitor/core";
import { FirebaseAuthentication } from "@capacitor-firebase/authentication";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async () => {
    try {
      if (Capacitor.isNativePlatform()) {
        // ✅ Login en Android (Capacitor)
        const result = await FirebaseAuthentication.signInWithGoogle();
        setUser({
          nombre: result.user.displayName,
          email: result.user.email,
          picture: result.user.photoUrl,
        });
      } else {
        // ✅ Login Web normal
        const client = google.accounts.id;
        console.log("Google web client no implementado aquí (usa GoogleLoginButton)");
      }
    } catch (err) {
      console.error("❌ Error de login:", err);
      alert("Error al iniciar sesión");
    }
  };

  const logout = async () => {
    try {
      if (Capacitor.isNativePlatform()) {
        await FirebaseAuthentication.signOut();
      }
      setUser(null);
      localStorage.removeItem("user");
      window.location.reload();
    } catch (err) {
      console.error("❌ Error al cerrar sesión:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);