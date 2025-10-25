import { useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";

export default function GoogleLoginButton() {
  const buttonRef = useRef(null);
  const { login } = useAuth();

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "799514085909-f2b0mh1oprkvc12k67oporpujp4ivn95.apps.googleusercontent.com",
      callback: (response) => {
        const payload = JSON.parse(atob(response.credential.split('.')[1]));
        login({
          nombre: payload.name,
          email: payload.email,
          picture: payload.picture
        });
      }
    });

    google.accounts.id.renderButton(buttonRef.current, {
      theme: "outline",
      size: "large"
    });
  }, [login]);

  return <div className="flex justify-center mt-20">
    <div ref={buttonRef}></div>
  </div>;
}