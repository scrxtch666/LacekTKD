import { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    login: "", password: "", passwordConfirm: "", email: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.login || !formData.email || !formData.password || !formData.passwordConfirm) {
      setError("Vyplňte prosím všechna pole.");
      return;
    }
    if (formData.password.length < 6) {
      setError("Heslo musí mít minimálně 6 znaků.");
      return;
    }
    if (formData.password !== formData.passwordConfirm) {
      setError("Hesla se neshodují.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        setFormData({ login: "", password: "", passwordConfirm: "", email: "" });
        setError("");
        alert(data.message || "Registrace odeslána! Počkej na schválení od admina.");
      } else {
        setError(data.error || "Chyba při registraci.");
      }
    } catch (err) {
      setError("Chyba při odesílání.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Registrace</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Uživatelské jméno"
          value={formData.login}              
          className="w-full p-2 border rounded"
          onChange={(e) => setFormData({ ...formData, login: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}              
          className="w-full p-2 border rounded"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Heslo"
          value={formData.password}           
          className="w-full p-2 border rounded"
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <div>
          <input
            type="password"
            placeholder="Zopakujte heslo"
            value={formData.passwordConfirm}  
            className="w-full p-2 border rounded"
            onChange={(e) => setFormData({ ...formData, passwordConfirm: e.target.value })}
          />
          {formData.passwordConfirm && formData.password !== formData.passwordConfirm && (
            <p className="text-xs text-red-500 mt-1">Hesla se neshodují</p>
          )}
          {formData.passwordConfirm && formData.password === formData.passwordConfirm && (
            <p className="text-xs text-green-600 mt-1">✓ Hesla se shodují</p>
          )}
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button className="w-full bg-customGreen text-white p-2 rounded hover:bg-green-600 transition">
          Zaregistrovat se
        </button>
      </form>
    </div>
  );
};

export default Register;