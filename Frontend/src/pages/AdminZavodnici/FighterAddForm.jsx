import { useState, useEffect } from "react";
import { Upload, X } from "lucide-react";

function FighterAddForm({ onSuccess, onCancel, API, belts, categories }) {
  const [form, setForm] = useState({
    name: "",
    surname: "",
    birth: "",
    belts_id: "",
    category_id: "",
    actual_weight_category: "",
    best: 0,
    legend: 0,
    active: 1,
    image: null,
  });

  const [error, setError] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!form.image) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(form.image);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [form.image]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file });
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    if (!form.name || !form.surname || !form.belts_id) {
      setFormError("Vyplňte všechna povinná pole.");
      return;
    }
    setSaving(true);
    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => {
      if (key === "image" && val) formData.append("image", val);
      else if (key !== "image") formData.append(key, val ?? "");
    });
    try {
      const res = await fetch(`${API}/api/fighters`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          data.error || `Chyba při přidávání závodníka (${res.status}).`,
        );
      }

      onSuccess();
    } catch (err) {
      console.error("Chyba při ukládání závodníka:", err);

      setError(
        err.message || "Nepodařilo se uložit závodníka. Zkuste to znovu.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-customWhite rounded-lg shadow-lg p-6 border-2 border-green-500">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Nový závodník</h3>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            ["Jméno *", "text", "name", "Josef"],
            ["Příjmení *", "text", "surname", "Novák"],
          ].map(([label, type, key, placeholder]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
              </label>
              <input
                type={type}
                value={form[key]}
                placeholder={placeholder}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Datum narození
            </label>
            <input
              type="date"
              value={form.birth}
              onChange={(e) => setForm({ ...form, birth: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Aktuální váha (kg)
            </label>
            <input
              type="number"
              value={form.actual_weight_category}
              placeholder="72"
              onChange={(e) =>
                setForm({
                  ...form,
                  actual_weight_category: e.target.value,
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pásek *
            </label>
            <select
              value={form.belts_id}
              onChange={(e) => setForm({ ...form, belts_id: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">-- Vyber pásek --</option>
              {belts.map((belt) => (
                <option key={belt.id} value={belt.id}>
                  {belt.cup || belt.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Věková kategorie
            </label>
            <select
              value={form.category_id}
              onChange={(e) =>
                setForm({
                  ...form,
                  category_id: e.target.value,
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">-- Vyber kategorii --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}: {cat.min} - {cat.max}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-wrap gap-6">
          {[
            ["active", "Aktivní", "green"],
            ["best", "Nejlepší závodník", "yellow"],
            ["legend", "Legenda", "purple"],
          ].map(([key, label]) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={!!form[key]}
                onChange={(e) =>
                  setForm({
                    ...form,
                    [key]: e.target.checked ? 1 : 0,
                  })
                }
                className="w-5 h-5 rounded"
              />
              <span className="text-sm font-medium text-gray-700">{label}</span>
            </label>
          ))}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fotka závodníka
          </label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg cursor-pointer transition-colors">
              <Upload size={18} />
              <span>Vybrat soubor</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            {form.image && (
              <span className="text-sm text-gray-600">{form.image.name}</span>
            )}
          </div>
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Náhled"
              className="mt-2 h-28 w-28 object-cover rounded-full border-2 border-gray-200"
            />
          )}
        </div>
        {error && (
          <div className="px-4 py-3 bg-red-50 border border-red-300 rounded-lg text-sm text-red-700">
            {error}
          </div>
        )}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50"
          >
            {saving ? "Ukládám..." : "Přidat závodníka"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors"
          >
            Zrušit
          </button>
        </div>
      </form>
    </div>
  );
}

export default FighterAddForm;
