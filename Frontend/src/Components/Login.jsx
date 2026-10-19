
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserRole } from "../utils/auth";
import config from "../../config";
import WarningMessage from "./Messages/WarningMessage";

const API = config.API_URL;

const Login = () => {
  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Přihlášení se nezdařilo.");
        return;
      }

      if (!data.token) {
        setError("Server nevrátil přihlašovací token.");
        return;
      }

      localStorage.setItem("token", data.token);

      window.dispatchEvent(new Event("authChange"));

      const role = getUserRole();

      if (role === "admin" || role === "trainer") {
        navigate("/admin/me", { replace: true });
      } else {
        navigate("/admin/me", { replace: true });
      }
    } catch (err) {
      console.error("Chyba přihlášení:", err);
      setError("Nepodařilo se spojit se serverem.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border-t-4 border-customGreen">
      <h2 className="text-2xl font-bold mb-4">Přihlášení</h2>

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="text"
          placeholder="Uživatelské jméno"
          autoComplete="username"
          required
          className="w-full p-2 border rounded"
          value={formData.login}
          onChange={(e) =>
            setFormData({ ...formData, login: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Heslo"
          autoComplete="current-password"
          required
          className="w-full p-2 border rounded"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />

        {error && <WarningMessage message={error} />}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-customGreen text-white p-2 rounded hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Přihlašuji..." : "Přihlásit se"}
        </button>
      </form>
    </div>
  );
};

export default Login;
