import { useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";

export default function GoogleLoginButton() {
  const buttonRef = useRef(null);
  const { login } = useAuth();

  useEffect(() => {
    const initGoogle = () => {
      if (typeof google === "undefined" || !google.accounts?.id) {
        console.log("Google API todavía no disponible, reintentando...");
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
        width: 300,
      });
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

        <div ref={buttonRef} className="flex justify-center"></div>

        <p className="text-gray-400 text-xs mt-6">
          © {new Date().getFullYear()} JYP Trend
        </p>
      </div>
    </div>
  );
}