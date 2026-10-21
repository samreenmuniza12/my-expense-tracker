import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";

function GoogleLoginButton({ onLoginSuccess, buttonText = "signin_with" }) {
  const [error, setError] = useState(null);

  const handleSuccess = async (credentialResponse) => {
    try {
      const res = await fetch("http://localhost:8000/api/v1/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: credentialResponse.credential }),
      });

      if (!res.ok) throw new Error("Login failed");

      const data = await res.json();

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      onLoginSuccess(data.user);
    } catch (err) {
      console.error(err);
      setError("Could not sign in. Please try again.");
    }
  };

  return (
    <div>
      <GoogleLogin
        text={buttonText}
        onSuccess={handleSuccess}
        onError={() => setError("Google sign-in was cancelled or failed.")}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default GoogleLoginButton;