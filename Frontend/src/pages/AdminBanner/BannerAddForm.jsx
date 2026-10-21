import { useState, useEffect } from "react";
import { Upload, X } from "lucide-react";

function BannerAddForm({ onSuccess, onCancel, API }) {
  const [form, setForm] = useState({
    banner_name: "",
    img_path: null,
    active: true,
  });

  const [error, setError] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [saving, setSaving] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!form.img_path) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(form.img_path);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [form.img_path]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setError("");

    if (!file.type.startsWith("image/")) {
      setError("Vyberte platný obrázek.");
      e.target.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Obrázek může mít maximálně 10 MB.");
      e.target.value = "";
      return;
    }

    setForm((prev) => ({
      ...prev,
      img_path: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const bannerName = form.banner_name.trim();

    if (!bannerName || !form.img_path) {
      setError("Vyplňte název banneru a vyberte obrázek.");
      return;
    }

    if (bannerName.length < 3) {
      setError("Název banneru musí mít minimálně 3 znaky.");
      return;
    }

    if (!token) {
      setError("Nejste přihlášeni. Přihlaste se prosím znovu.");
      return;
    }

    setSaving(true);

    try {
      const formData = new FormData();

      formData.append("banner_name", bannerName);
      formData.append("image", form.img_path);
      formData.append("active", form.active ? "1" : "0");

      const res = await fetch(`${API}/api/banner`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          data.error || `Chyba při přidávání banneru (${res.status}).`,
        );
      }

      onSuccess();
    } catch (err) {
      console.error("Chyba při ukládání banneru:", err);

      setError(err.message || "Nepodařilo se uložit banner. Zkuste to znovu.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-customWhite rounded-lg shadow-lg p-6 border-2 border-green-500">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Nový banner</h3>

        <button
          type="button"
          onClick={onCancel}
          disabled={saving}
          className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
          aria-label="Zavřít formulář"
        >
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="banner_name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Název banneru
          </label>

          <input
            id="banner_name"
            type="text"
            value={form.banner_name}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                banner_name: e.target.value,
              }))
            }
            minLength={3}
            maxLength={255}
            required
            disabled={saving}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50"
            placeholder="Např. Hlavní banner 2026"
          />
        </div>

        <div>
          <label
            htmlFor="banner_image"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Obrázek
          </label>

          <div className="flex flex-wrap items-center gap-4">
            <label
              className={`flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors ${
                saving ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              <Upload size={20} />
              <span>Vybrat soubor</span>

              <input
                id="banner_image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                disabled={saving}
                className="hidden"
              />
            </label>

            {form.img_path && (
              <span className="text-sm text-gray-600 break-all">
                {form.img_path.name}
              </span>
            )}
          </div>

          <p className="mt-2 text-xs text-gray-500">
            Povolené jsou obrázky do velikosti 10 MB.
          </p>
        </div>

        <div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  active: e.target.checked,
                }))
              }
              disabled={saving}
              className="w-5 h-5 text-green-600 rounded focus:ring-2 focus:ring-green-500"
            />

            <span className="text-sm font-medium text-gray-700">
              Banner aktivní (zobrazovat na webu)
            </span>
          </label>
        </div>

        {previewUrl && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Náhled
            </label>

            <img
              src={previewUrl}
              alt="Náhled vybraného banneru"
              className="w-full max-w-md h-48 object-cover rounded-lg border-2 border-gray-200"
            />
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="p-3 rounded-lg border border-red-300 bg-red-50 text-red-700 text-sm"
          >
            {error}
          </div>
        )}

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Ukládám..." : "Přidat banner"}
          </button>

          <button
            type="button"
            onClick={onCancel}
            disabled={saving}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors disabled:opacity-50"
          >
            Zrušit
          </button>
        </div>
      </form>
    </div>
  );
}

export default BannerAddForm;
