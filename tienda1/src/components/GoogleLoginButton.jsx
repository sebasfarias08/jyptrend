import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function GoogleLoginButton() {
  const buttonRef = useRef(null);
  const { login } = useAuth();
  const [estado, setEstado] = useState("Inicializando...");

  useEffect(() => {
    let intentos = 0;

    const initGoogle = () => {
      intentos += 1;

      if (typeof google === "undefined" || !google.accounts?.id) {
        setEstado(`Esperando SDK de Google... intento ${intentos}`);
        // Después de varios intentos, marcamos error visible
        if (intentos > 10) {
          setEstado("❌ No se pudo cargar Google Identity en este entorno.");
          return;
        }
        setTimeout(initGoogle, 400);
        return;
      }

      try {
        setEstado("SDK detectado, inicializando...");

        google.accounts.id.initialize({
          client_id:
            "799514085909-f2b0mh1oprkvc12k67oporpujp4ivn95.apps.googleusercontent.com",
          callback: (response) => {
            try {
              const payload = JSON.parse(
                atob(response.credential.split(".")[1])
              );
              login({
                nombre: payload.name,
                email: payload.email,
                picture: payload.picture,
              });
            } catch (err) {
              console.error("Error parseando token de Google:", err);
              setEstado("❌ Error procesando respuesta de Google.");
            }
          },
        });

        if (buttonRef.current) {
          google.accounts.id.renderButton(buttonRef.current, {
            theme: "outline",
            size: "large",
            width: 300,
          });
          setEstado("✅ Botón de Google inicializado.");
        } else {
          setEstado("❌ No se encontró el contenedor del botón.");
        }
      } catch (err) {
        console.error("Error inicializando Google Identity:", err);
        setEstado("❌ Error al inicializar Google Identity.");
      }
    };

    initGoogle();
  }, [login]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F9FAFB] p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold text-[#00796B] mb-6">
          Bienvenido a JYP Trend
        </h1>
        <p className="text-gray-600 mb-6 text-sm">
          Iniciá sesión con tu cuenta de Google para continuar
        </p>

        {/* Contenedor del botón oficial de Google */}
        <div ref={buttonRef} className="flex justify-center mb-3" />

        {/* Estado visible para debug, muy útil en APK */}
        <p className="text-[11px] text-gray-500 mt-2">{estado}</p>

        <p className="text-gray-400 text-xs mt-6">
          © {new Date().getFullYear()} JYP Trend
        </p>
      </div>
    </div>
  );
}