import React, { useEffect, useRef } from "react";
import { Capacitor } from "@capacitor/core";
import { FirebaseAuthentication } from "@capacitor-firebase/authentication";
import { useAuth } from "../context/AuthContext";


export default function GoogleLoginButton() {
  const { login } = useAuth();
  const buttonRef = useRef(null);

  // --- WEB ---
  useEffect(() => {
    if (Capacitor.getPlatform() !== "web") return;

    const initGoogle = () => {
      if (typeof google === "undefined" || !google.accounts?.id) {
        setTimeout(initGoogle, 300);
        return;
      }

      google.accounts.id.initialize({
        client_id:
          "799514085909-f2b0mh1oprkvc12k67oporpujp4ivn95.apps.googleusercontent.com",
        callback: (response) => {
          const payload = JSON.parse(atob(response.credential.split(".")[1]));
          login({
            nombre: payload.name,
            email: payload.email,
            picture: payload.picture,
          });
          window.location.href = "/Tienda"; // redirige al home
        },
      });

      google.accounts.id.renderButton(buttonRef.current, {
        theme: "outline",
        size: "large",
      });
    };

    initGoogle();
  }, [login]);

  // --- ANDROID ---
  const handleNativeLogin = async () => {
    try {
      const result = await FirebaseAuthentication.signInWithGoogle();
      if (result?.user) {
        login({
          nombre: result.user.displayName,
          email: result.user.email,
          picture: result.user.photoUrl,
        });
        alert("Inicio de sesión correcto");
      } else {
        alert("No se pudo iniciar sesión");
      }
    } catch (error) {
      console.error("❌ Error en login Android:", error);
      alert("Error en login: " + error.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#F9FAFB] text-center p-6">
      <h1 className="text-2xl font-bold text-[#00796B] mb-2">
        Bienvenido a JYP Trend
      </h1>
      <p className="text-gray-600 mb-6">
        Iniciá sesión con tu cuenta de Google para continuar
      </p>

      {Capacitor.getPlatform() === "android" ? (
        <button
          onClick={handleNativeLogin}
          className="bg-[#00796B] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#00695C] transition"
        >
          Iniciar sesión con Google
        </button>
      ) : (
        <div ref={buttonRef}></div>
      )}

      <footer className="text-xs text-gray-400 mt-8">© 2025 JYP Trend</footer>
    </div>
  );
}