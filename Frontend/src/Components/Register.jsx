import { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({ login: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      alert(data.message || data.error);
    } catch (err) {
      console.error("Chyba při odesílání:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Registrace</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Uživatelské jméno"
          className="w-full p-2 border rounded"
          onChange={(e) => setFormData({ ...formData, login: e.target.value })}
        />
        <input
          type="password"
          placeholder="Heslo"
          className="w-full p-2 border rounded"
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <button className="w-full bg-customGreen text-white p-2 rounded hover:bg-green-600 transition">
          Zaregistrovat se
        </button>
      </form>
    </div>
  );
};

export default Register;