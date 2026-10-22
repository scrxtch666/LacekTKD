import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Trash2,
  X,
  Pencil,
  Check,
  Star,
  Eye,
  EyeOff,
  Upload,
  UserX,
  User,
  Trophy,
  Mail,
  Phone,
} from "lucide-react";

function FighterCard({
  index,
  fighter,
  belts,
  categories,
  isEditing,
  onStartEdit,
  onCancelEdit,
  onEditSuccess,
  isDeleting,
  onDelete,
  API,
}) {
  const figNumber = index + 1;

  const startEdit = () => {
    setForm({
      name: fighter.name || "",
      surname: fighter.surname || "",
      birth: fighter.birth ? fighter.birth.substring(0, 10) : "",
      belts_id: String(fighter.belts_id ?? ""),
      category_id: String(fighter.category_id ?? ""),
      actual_weight_category: fighter.actual_weight_category || "",
      best: fighter.best || 0,
      legend: fighter.legend || 0,
      active: fighter.active ?? 1,
      image: null,
    });

    setError("");
    onStartEdit();
  };

  const [form, setForm] = useState({});
  const [editPreviewUrl, setEditPreviewUrl] = useState(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file });
      const reader = new FileReader();
      reader.onloadend = () => setEditPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Přidáno přijetí ID jako argumentu funkce
  const handleSave = async (id) => {
    setError("");
    if (!form.name || !form.surname) {
      setError("Jméno a příjmení nesmí být prázdné.");
      return;
    }
    setSaving(true);
    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => {
      if (key === "image" && val) formData.append("image", val);
      else if (key !== "image") formData.append(key, val ?? "");
    });
    try {
      const response = await fetch(`${API}/api/fighters/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (response.ok) onEditSuccess();
      else {
        const d = await response.json();
        setError(d.error || "Chyba při ukládání");
      }
    } catch {
      setError("Chyba při ukládání.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <div
        key={fighter.id}
        className="bg-customWhite rounded-lg shadow-md hover:shadow-lg transition-shadow p-4"
      >
        {isEditing ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">
                Editace závodníka #{figNumber}
              </span>
              <button
                onClick={onCancelEdit}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: "Jméno *", key: "name", type: "text" },
                { label: "Příjmení *", key: "surname", type: "text" },
              ].map(({ label, key, type }) => (
                <div key={key}>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    {label}
                  </label>

                  <input
                    type={type}
                    value={form[key] || ""}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        [key]: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Datum narození
                </label>
                <input
                  type="date"
                  value={form.birth || ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      birth: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Aktuální váha (kg)
                </label>
                <input
                  type="number"
                  value={form.actual_weight_category || ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      actual_weight_category: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Pásek *
                </label>
                <select
                  value={form.belts_id || ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      belts_id: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">-- Vyber pásek --</option>
                  {(Array.isArray(belts) ? belts : []).map((belt) => (
                    <option key={belt.id} value={belt.id}>
                      {belt.cup || belt.belt_name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Věková kategorie
                </label>
                <select
                  value={form.category_id || ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      category_id: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">-- Vyber kategorii --</option>
                  {(Array.isArray(categories) ? categories : []).map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}: {cat.min} - {cat.max}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-wrap gap-6">
              {[
                { label: "Aktivní", key: "active" },
                { label: "Nejlepší závodník", key: "best" },
                { label: "Legenda", key: "legend" },
              ].map(({ label, key }) => (
                <label
                  key={key}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={!!form[key]}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        [key]: e.target.checked ? 1 : 0,
                      }))
                    }
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm text-gray-700">{label}</span>
                </label>
              ))}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Nová fotka <span className="text-gray-400">(nepovinné)</span>
              </label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg cursor-pointer text-sm">
                  <Upload size={16} />
                  <span>Vybrat soubor</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleEditImageChange}
                    className="hidden"
                  />
                </label>
                {form.image && (
                  <span className="text-sm text-gray-600">
                    {form.image.name}
                  </span>
                )}
              </div>
              {editPreviewUrl && (
                <img
                  src={editPreviewUrl}
                  alt="Náhled"
                  className="mt-2 h-24 w-24 object-cover rounded-full border-2 border-gray-200"
                />
              )}
            </div>

            {error && (
              <div className="px-3 py-2 bg-red-50 border border-red-300 rounded-lg text-sm text-red-700">
                {error}
              </div>
            )}

            <div className="flex gap-2 pt-1">
              {/* Opravené volání s předáním ID závodníka */}
              <button
                onClick={() => handleSave(fighter.id)}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors disabled:opacity-50"
              >
                <Check size={16} />
                {saving ? "Ukládám..." : "Uložit změny"}
              </button>
              <button
                onClick={onCancelEdit}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-sm transition-colors"
              >
                Zrušit
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-800 font-semibold flex-shrink-0">
              {figNumber}
            </span>
            <div className="flex-shrink-0">
              {fighter.img_path ? (
                <img
                  src={`${API}${fighter.img_path}`}
                  alt={fighter.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                />
              ) : (
                <div className="w-16 h-16 noPfp flex items-center justify-center bg-gray-200 rounded-full font-bold text-gray-600">
                  {fighter.name?.charAt(0).toUpperCase() || "Z"}
                </div>
              )}
            </div>
            <div className="flex-1 text-center sm:text-left">
              <p className="text-lg font-semibold text-gray-800">
                {fighter.name} {fighter.surname}
              </p>
              <p className="text-sm text-gray-500">
                {fighter.birth
                  ? new Date(fighter.birth).toLocaleDateString("cs-CZ")
                  : "Datum narození neznámé"}
                {fighter.actual_weight_category
                  ? ` · ${fighter.actual_weight_category} kg`
                  : ""}
              </p>
              <div className="flex flex-wrap gap-2 mt-2 justify-center sm:justify-start">
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${fighter.active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-500"}`}
                >
                  {fighter.active ? (
                    <Eye size={11} className="mr-1" />
                  ) : (
                    <EyeOff size={11} className="mr-1" />
                  )}
                  {fighter.active ? "Aktivní" : "Neaktivní"}
                </span>
                {!!fighter.best && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    <Star size={11} />
                    Nejlepší
                  </span>
                )}
                {!!fighter.legend && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    <Trophy size={11} />
                    Legenda
                  </span>
                )}
                {fighter.user_login ? (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    <User size={11} />
                    {fighter.user_login}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    <UserX size={11} />
                    Nepřiřazený účet
                  </span>
                )}
              </div>
              {fighter.user_login &&
                (fighter.user_email || fighter.user_phone) && (
                  <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 mt-1 justify-center sm:justify-start">
                    {fighter.user_email && (
                      <>
                        <Mail size={14} />
                        <span>{fighter.user_email}</span>
                      </>
                    )}
                    {fighter.user_phone && (
                      <>
                        <Phone size={14} />
                        <span>{fighter.user_phone}</span>
                      </>
                    )}
                  </div>
                )}
            </div>
            <div className="flex gap-2">
              <button onClick={startEdit} className="editBtn">
                <Pencil size={18} />
                <span>Editovat</span>
              </button>
              <button
                onClick={onDelete}
                disabled={isDeleting}
                className="deleteBtn"
              >
                <Trash2 size={18} />
                <span>{isDeleting ? "Mažu..." : "Smazat"}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FighterCard;