import React, { useState, useEffect } from "react";
import { Trash2, UserPlus, X, Pencil, Check, Star, Eye, EyeOff, Upload, UserX, User, Trophy } from "lucide-react";

function AdminZavodnici() {
  const [fighters, setFighters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [belts, setBelts] = useState([]);
  const [categories, setCategories] = useState([]);

  // Přidání
  const [showAddForm, setShowAddForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [newFighter, setNewFighter] = useState({
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
  const [previewUrl, setPreviewUrl] = useState(null);
  const [formError, setFormError] = useState("");

  // Editace
  const [editingId, setEditingId] = useState(null);
  const [editFighter, setEditFighter] = useState({});
  const [editPreviewUrl, setEditPreviewUrl] = useState(null);
  const [editError, setEditError] = useState("");
  const [editSaving, setEditSaving] = useState(false);

  useEffect(() => {
    fetchFighters();
    fetchBelts();
    fetchCategories();
  }, []);

  const fetchFighters = () => {
    fetch("http://localhost:3000/api/fighters")
      .then((res) => res.json())
      .then((data) => {
        setFighters(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Chyba při načítání závodníků:", err);
        setFighters([]);
        setLoading(false);
      });
  };

  const fetchBelts = () => {
    fetch("http://localhost:3000/api/belts")
      .then((res) => res.json())
      .then((data) => setBelts(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Chyba při načítání pásků:", err));
  };

  const fetchCategories = () => {
    fetch("http://localhost:3000/api/category")
      .then((res) => res.json())
      .then((data) => setCategories(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Chyba při načítání kategorií:", err));
  };

  const handleDelete = async (id) => {
    if (!confirm("Opravdu chcete smazat tohoto závodníka?")) return;
    setDeleting(id);
    try {
      const response = await fetch("http://localhost:3000/api/fighters/" + id, {
        method: "DELETE",
      });
      if (response.ok) {
        setFighters(fighters.filter((f) => f.id !== id));
      } else {
        alert("Nepodařilo se smazat závodníka");
      }
    } catch (err) {
      alert("Chyba při mazání závodníka");
    } finally {
      setDeleting(null);
    }
  };

  // --- ADD ---
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewFighter({ ...newFighter, image: file });
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!newFighter.name || !newFighter.surname) {
      setFormError("Vyplňte prosím jméno a příjmení.");
      return;
    }

    setSaving(true);
    const formData = new FormData();
    formData.append("name", newFighter.name);
    formData.append("surname", newFighter.surname);
    formData.append("birth", newFighter.birth || "");
    formData.append("belts_id", newFighter.belts_id || "");
    formData.append("category_id", newFighter.category_id || "");
    formData.append("actual_weight_category", newFighter.actual_weight_category || "");
    formData.append("best", newFighter.best ? 1 : 0);
    formData.append("legend", newFighter.legend ? 1 : 0);
    formData.append("active", newFighter.active ? 1 : 0);
    if (newFighter.image) formData.append("image", newFighter.image);

    try {
      const response = await fetch("http://localhost:3000/api/fighters", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        alert("Závodník byl úspěšně přidán!");
        cancelAdd();
        fetchFighters();
      } else {
        const error = await response.json();
        setFormError("Chyba: " + (error.error || "Nepodařilo se přidat závodníka"));
      }
    } catch (err) {
      setFormError("Chyba při ukládání závodníka.");
    } finally {
      setSaving(false);
    }
  };

  const cancelAdd = () => {
    setShowAddForm(false);
    setFormError("");
    setPreviewUrl(null);
    setNewFighter({
      name: "", surname: "", birth: "", belts_id: "", category_id: "",
      actual_weight_category: "", best: 0, legend: 0, active: 1, image: null,
    });
  };

  // --- EDIT ---
  const startEdit = (fighter) => {
    setEditingId(fighter.id);
    setEditFighter({
      name: fighter.name || "",
      surname: fighter.surname || "",
      birth: fighter.birth ? fighter.birth.substring(0, 10) : "",
      belts_id: fighter.belts_id || "",
      category_id: fighter.category_id || "",
      actual_weight_category: fighter.actual_weight_category || "",
      best: fighter.best || 0,
      legend: fighter.legend || 0,
      active: fighter.active ?? 1,
      image: null,
    });
    setEditPreviewUrl(null);
    setEditError("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditFighter({});
    setEditPreviewUrl(null);
    setEditError("");
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditFighter({ ...editFighter, image: file });
      const reader = new FileReader();
      reader.onloadend = () => setEditPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleEditSubmit = async (id) => {
    setEditError("");
    if (!editFighter.name || !editFighter.surname) {
      setEditError("Jméno a příjmení nesmí být prázdné.");
      return;
    }

    setEditSaving(true);
    const formData = new FormData();
    formData.append("name", editFighter.name);
    formData.append("surname", editFighter.surname);
    formData.append("birth", editFighter.birth || "");
    formData.append("belts_id", editFighter.belts_id || "");
    formData.append("category_id", editFighter.category_id || "");
    formData.append("actual_weight_category", editFighter.actual_weight_category || "");
    formData.append("best", editFighter.best ? 1 : 0);
    formData.append("legend", editFighter.legend ? 1 : 0);
    formData.append("active", editFighter.active ? 1 : 0);
    if (editFighter.image) formData.append("image", editFighter.image);

    try {
      const response = await fetch("http://localhost:3000/api/fighters/" + id, {
        method: "PUT",
        body: formData,
      });
      if (response.ok) {
        cancelEdit();
        fetchFighters();
      } else {
        const error = await response.json();
        setEditError("Chyba: " + (error.error || "Nepodařilo se uložit změny"));
      }
    } catch (err) {
      setEditError("Chyba při ukládání závodníka.");
    } finally {
      setEditSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Načítám závodníky...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="devider">Správa závodníků</div>
        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
          >
            <UserPlus size={20} />
            <span>Přidat závodníka</span>
          </button>
        )}
      </div>

      {/* Formulář pro přidání */}
      {showAddForm && (
        <div className="bg-customWhite rounded-lg shadow-lg p-6 border-2 border-green-500">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Nový závodník</h3>
            <button onClick={cancelAdd} className="text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jméno *</label>
                <input type="text" value={newFighter.name}
                  onChange={(e) => setNewFighter({ ...newFighter, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Josef" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Příjmení *</label>
                <input type="text" value={newFighter.surname}
                  onChange={(e) => setNewFighter({ ...newFighter, surname: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Novák" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Datum narození</label>
                <input type="date" value={newFighter.birth}
                  onChange={(e) => setNewFighter({ ...newFighter, birth: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Aktuální váha (kg)</label>
                <input type="number" value={newFighter.actual_weight_category}
                  onChange={(e) => setNewFighter({ ...newFighter, actual_weight_category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="72" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pásek</label>
                <select value={newFighter.belts_id}
                  onChange={(e) => setNewFighter({ ...newFighter, belts_id: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option value="">-- Vyber pásek --</option>
                  {belts.map((belt) => (
                    <option key={belt.id} value={belt.id}>{belt.belt_name || belt.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kategorie</label>
                <select value={newFighter.category_id}
                  onChange={(e) => setNewFighter({ ...newFighter, category_id: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option value="">-- Vyber kategorii --</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name || cat.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Přepínače */}
            <div className="flex flex-wrap gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={!!newFighter.active}
                  onChange={(e) => setNewFighter({ ...newFighter, active: e.target.checked ? 1 : 0 })}
                  className="w-5 h-5 text-green-600 rounded" />
                <span className="text-sm font-medium text-gray-700">Aktivní</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={!!newFighter.best}
                  onChange={(e) => setNewFighter({ ...newFighter, best: e.target.checked ? 1 : 0 })}
                  className="w-5 h-5 text-yellow-500 rounded" />
                <span className="text-sm font-medium text-gray-700">Nejlepší závodník</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={!!newFighter.legend}
                  onChange={(e) => setNewFighter({ ...newFighter, legend: e.target.checked ? 1 : 0 })}
                  className="w-5 h-5 text-purple-600 rounded" />
                <span className="text-sm font-medium text-gray-700">Legenda</span>
              </label>
            </div>

            {/* Foto */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fotka závodníka</label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg cursor-pointer transition-colors">
                  <Upload size={18} />
                  <span>Vybrat soubor</span>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
                {newFighter.image && <span className="text-sm text-gray-600">{newFighter.image.name}</span>}
              </div>
              {previewUrl && (
                <img src={previewUrl} alt="Náhled" className="mt-2 h-28 w-28 object-cover rounded-full border-2 border-gray-200" />
              )}
            </div>

            {formError && (
              <div className="px-4 py-3 bg-red-50 border border-red-300 rounded-lg text-sm text-red-700">{formError}</div>
            )}

            <div className="flex gap-3 pt-4">
              <button type="submit" disabled={saving}
                className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                {saving ? "Ukládám..." : "Přidat závodníka"}
              </button>
              <button type="button" onClick={cancelAdd}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors">
                Zrušit
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Seznam závodníků */}
      {!fighters.length ? (
        <div className="bg-customWhite rounded-lg shadow p-8 text-center">
          <UserPlus className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-500">Zatím nejsou žádní závodníci</p>
        </div>
      ) : (
        <div className="space-y-4">
          {fighters.map((fighter) => (
            <div key={fighter.id} className="bg-customWhite rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-4">
              {editingId === fighter.id ? (
                /* --- EDIT FORMULÁŘ --- */
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-700">Editace závodníka #{fighter.id}</span>
                    <button onClick={cancelEdit} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Jméno *</label>
                      <input type="text" value={editFighter.name}
                        onChange={(e) => setEditFighter({ ...editFighter, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Příjmení *</label>
                      <input type="text" value={editFighter.surname}
                        onChange={(e) => setEditFighter({ ...editFighter, surname: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Datum narození</label>
                      <input type="date" value={editFighter.birth}
                        onChange={(e) => setEditFighter({ ...editFighter, birth: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Aktuální váha (kg)</label>
                      <input type="number" value={editFighter.actual_weight_category}
                        onChange={(e) => setEditFighter({ ...editFighter, actual_weight_category: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Pásek</label>
                      <select value={editFighter.belts_id}
                        onChange={(e) => setEditFighter({ ...editFighter, belts_id: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option value="">-- Vyber pásek --</option>
                        {belts.map((belt) => (
                          <option key={belt.id} value={belt.id}>{belt.belt_name || belt.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Kategorie</label>
                      <select value={editFighter.category_id}
                        onChange={(e) => setEditFighter({ ...editFighter, category_id: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option value="">-- Vyber kategorii --</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>{cat.category_name || cat.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Přepínače */}
                  <div className="flex flex-wrap gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={!!editFighter.active}
                        onChange={(e) => setEditFighter({ ...editFighter, active: e.target.checked ? 1 : 0 })}
                        className="w-4 h-4 text-green-600 rounded" />
                      <span className="text-sm text-gray-700">Aktivní</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={!!editFighter.best}
                        onChange={(e) => setEditFighter({ ...editFighter, best: e.target.checked ? 1 : 0 })}
                        className="w-4 h-4 text-yellow-500 rounded" />
                      <span className="text-sm text-gray-700">Nejlepší závodník</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={!!editFighter.legend}
                        onChange={(e) => setEditFighter({ ...editFighter, legend: e.target.checked ? 1 : 0 })}
                        className="w-4 h-4 text-purple-600 rounded" />
                      <span className="text-sm text-gray-700">Legenda</span>
                    </label>
                  </div>

                  {/* Nová fotka */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Nová fotka <span className="text-gray-400">(nepovinné – ponechá stávající)</span>
                    </label>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg cursor-pointer transition-colors text-sm">
                        <Upload size={16} />
                        <span>Vybrat soubor</span>
                        <input type="file" accept="image/*" onChange={handleEditImageChange} className="hidden" />
                      </label>
                      {editFighter.image && <span className="text-sm text-gray-600">{editFighter.image.name}</span>}
                    </div>
                    {editPreviewUrl && (
                      <img src={editPreviewUrl} alt="Náhled" className="mt-2 h-24 w-24 object-cover rounded-full border-2 border-gray-200" />
                    )}
                  </div>

                  {editError && (
                    <div className="px-3 py-2 bg-red-50 border border-red-300 rounded-lg text-sm text-red-700">{editError}</div>
                  )}

                  <div className="flex gap-2 pt-1">
                    <button onClick={() => handleEditSubmit(fighter.id)} disabled={editSaving}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                      <Check size={16} />
                      {editSaving ? "Ukládám..." : "Uložit změny"}
                    </button>
                    <button onClick={cancelEdit}
                      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-sm transition-colors">
                      Zrušit
                    </button>
                  </div>
                </div>
              ) : (
                /* --- ZOBRAZENÍ --- */
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {/* ID */}
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-800 font-semibold">
                      {fighter.id}
                    </span>
                  </div>

                  {/* Foto */}
                  <div className="flex-shrink-0">
                    {fighter.img_path ? (
                      <img src={fighter.img_path} alt={fighter.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-gray-200" />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-2xl font-bold">
                        {fighter.name?.charAt(0).toUpperCase() || "Z"}
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 text-center sm:text-left">
                    <p className="text-lg font-semibold text-gray-800">
                      {fighter.name} {fighter.surname}
                    </p>
                    <p className="text-sm text-gray-500">
                      {fighter.birth ? new Date(fighter.birth).toLocaleDateString("cs-CZ") : "Datum narození neznámé"}
                      {fighter.actual_weight_category ? ` · ${fighter.actual_weight_category} kg` : ""}
                    </p>
                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mt-2 justify-center sm:justify-start">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${fighter.active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-500"}`}>
                        {fighter.active ? <Eye size={11} className="mr-1" /> : <EyeOff size={11} className="mr-1" />}
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

                    {fighter.user_login && (fighter.user_email || fighter.user_phone) && (
                      <div className="flex flex-wrap gap-3 mt-1 justify-center sm:justify-start text-xs text-gray-500">
                        {fighter.user_email && <span>✉ {fighter.user_email}</span>}
                        {fighter.user_phone && <span>📞 {fighter.user_phone}</span>}
                      </div>
                    )}
                  </div>

                  {/* Tlačítka */}
                  <div className="flex gap-2">
                    <button onClick={() => startEdit(fighter)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200">
                      <Pencil size={18} />
                      <span>Editovat</span>
                    </button>
                    <button onClick={() => handleDelete(fighter.id)} disabled={deleting === fighter.id}
                      className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                      <Trash2 size={18} />
                      <span>{deleting === fighter.id ? "Mažu..." : "Smazat"}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminZavodnici;