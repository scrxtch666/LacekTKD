import { useState } from "react";
import { Trash2, Image as ImageIcon, Plus, Upload, X } from "lucide-react";

function SponsorAddForm({ onSuccess, onCancel, API }) {
  const [form, setForm] = useState({
    name: "",
    url: "",
    img_path: null,
  });
  const [previewUrl, setPreviewUrl] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  const authHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, img_path: file });
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.img_path) {
      alert("Vyplňte prosím název a vyberte obrázek");
      return;
    }
    setSaving(true);
    setError("");

    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("sponsor_name", form.name);
    formData.append("url", form.url);
    formData.append("img_path", form.img_path);

    try {
      const res = await fetch(`${API}/api/sponsors`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (res.ok) {
        onSuccess();
      } else {
        const d = await res.json();
        setError(d.error || "Chyba při přidání");
      }
    } catch {
      setError("Chyba při ukládání.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-customWhite rounded-lg shadow-lg p-6 border-2 border-green-500">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Nový sponzor</h3>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Název sponzora
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Např. Firma s.r.o."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Web sponzora (URL)
          </label>
          <input
            type="url"
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="https://www.firma.cz"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Logo sponzora
          </label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg cursor-pointer transition-colors">
              <Upload size={20} />
              <span>Vybrat soubor</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            {form.img_path && (
              <span className="text-sm text-gray-600">
                {form.img_path.name}
              </span>
            )}
          </div>
        </div>
        {previewUrl && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Náhled loga
            </label>
            <img
              src={previewUrl}
              alt="Náhled"
              className="h-24 object-contain rounded-lg border-2 border-gray-200 p-2 bg-gray-50"
            />
          </div>
        )}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Nahrávám..." : "Přidat sponzora"}
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

export default SponsorAddForm;
