import React, { useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { Capacitor } from "@capacitor/core";

export default function GoogleLoginButton() {
  const { login } = useAuth();
  const buttonRef = useRef(null);

  useEffect(() => {
    if (Capacitor.isNativePlatform()) return; // No renderizamos botón en Android

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
        },
      });

      google.accounts.id.renderButton(buttonRef.current, {
        theme: "outline",
        size: "large",
      });
    };

    initGoogle();
  }, [login]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#F9FAFB] text-center p-6">
      <h1 className="text-2xl font-bold text-[#00796B] mb-2">
        Bienvenido a JYP Trend
      </h1>
      <p className="text-gray-600 mb-6">
        Iniciá sesión con tu cuenta de Google para continuar
      </p>

      {Capacitor.isNativePlatform() ? (
        <button
          onClick={login}
          className="bg-[#00796B] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#00695C] transition"
        >
          Iniciar sesión con Google
        </button>
      ) : (
        <div ref={buttonRef}></div>
      )}

      <footer className="text-xs text-gray-400 mt-8">
        © 2025 JYP Trend
      </footer>
    </div>
  );
}