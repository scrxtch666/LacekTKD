import { useState } from "react";
import { Trash2, Upload, X, Pencil, Check } from "lucide-react";

function SponsorCard({
  sponsor,
  index,
  isEditing,
  onStartEdit,
  onCancelEdit,
  onEditSuccess,
  onDelete,
  isDeleting,
  API,
}) {
  const [form, setForm] = useState({
    name: "",
    url: "",
    img_path: null,
  });

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [editPreviewUrl, setEditPreviewUrl] = useState(null);

  const token = localStorage.getItem("token");
  const sponNumber = index + 1;

  const startEdit = () => {
    setForm({
      name: sponsor.sponsor_name || "",
      url: sponsor.url || "",
      img_path: null,
    });

    setError("");
    setEditPreviewUrl(null);
    onStartEdit();
  };

  const cancelEdit = () => {
    setForm({
      name: "",
      url: "",
      img_path: null,
    });

    setError("");
    setEditPreviewUrl(null);
    onCancelEdit();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, img_path: file });
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setError("");

    if (!form.name.trim()) {
      setError("Název nesmí být prázdný.");
      return;
    }

    setSaving(true);

    const formData = new FormData();

    formData.append("sponsor_name", form.name.trim());
    formData.append("url", form.url);

    // Obrázek se odešle pouze tehdy,
    // pokud uživatel vybral nový.
    if (form.img_path) {
      formData.append("img_path", form.img_path);
    }

    try {
      const response = await fetch(`${API}/api/sponsors/${sponsor.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        onEditSuccess();
      } else {
        const data = await response.json();

        setError(data.error || "Nepodařilo se upravit sponzora.");
      }
    } catch (err) {
      console.error("Chyba při ukládání sponzora:", err);
      setError("Chyba při ukládání sponzora.");
    } finally {
      setSaving(false);
    }
  };

  // Editační formulář
  if (isEditing) {
    return (
      <div className="bg-customWhite rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-4">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="font-semibold text-gray-700">
              Upravit sponzora #{sponsor.id}
            </p>

            <button
              type="button"
              onClick={cancelEdit}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Název
              </label>

              <input
                type="text"
                value={form.name}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL
              </label>

              <input
                type="url"
                value={form.url}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    url: e.target.value,
                  }))
                }
                placeholder="https://www.firma.cz"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nové logo{" "}
              <span className="text-gray-400 font-normal">
                (nepovinné – ponechá stávající)
              </span>
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

              {form.img_path && (
                <span className="text-sm text-gray-600 break-all">
                  {form.img_path.name}
                </span>
              )}
            </div>

            {editPreviewUrl && (
              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Náhled nového loga
                </label>

                <img
                  src={editPreviewUrl}
                  alt="Náhled nového loga"
                  className="h-20 object-contain rounded-lg border-2 border-gray-200 p-2 bg-gray-50"
                />
              </div>
            )}
          </div>

          {error && (
            <div className="px-3 py-2 bg-red-50 border border-red-300 rounded-lg text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Check size={18} />
              <span>{saving ? "Ukládám..." : "Uložit"}</span>
            </button>

            <button
              type="button"
              onClick={cancelEdit}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors"
            >
              Zrušit
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Běžné zobrazení sponzora
  return (
    <div className="card flex flex-col sm:flex-row items-center gap-4">
      <div className="flex-shrink-0">
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-800 font-semibold">
          {sponNumber}
        </span>
      </div>

      <div className="flex-shrink-0">
        <img
          src={`${API}${sponsor.img_path}`}
          alt={sponsor.sponsor_name}
          className="w-32 h-20 object-contain rounded-lg border-2 border-gray-200 p-1 bg-gray-50"
        />
      </div>

      <div className="flex-1 text-center sm:text-left">
        <p className="text-sm text-gray-500 mb-1">Název sponzora</p>

        <p className="text-lg font-semibold text-gray-800">
          {sponsor.sponsor_name}
        </p>

        {sponsor.url && (
          <a
            href={sponsor.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-green-600 hover:underline mt-1 inline-block"
          >
            {sponsor.url}
          </a>
        )}
      </div>

      <div className="flex gap-2">
        <button type="button" onClick={startEdit} className="editBtn">
          <Pencil size={18} />
          <span>Upravit</span>
        </button>

        <button
          type="button"
          onClick={onDelete}
          disabled={isDeleting === sponsor.id}
          className="deleteBtn disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Trash2 size={18} />
          <span>{isDeleting === sponsor.id ? "Mažu..." : "Smazat"}</span>
        </button>
      </div>
    </div>
  );
}

export default SponsorCard;
