import React, { useState, useEffect } from "react";
import {
  Trash2,
  Plus,
  X,
  Pencil,
  Upload,
  Trophy,
  MapPin,
  Calendar,
  Coins,
} from "lucide-react";

// ✅ MIMO AdminTurnaje – jinak se při každém psaní komponenta remountuje a ztrácíš focus
const TournamentForm = ({
  data,
  setData,
  onSubmit,
  onCancel,
  isSaving,
  error,
  previewImg,
  onImageChange,
  isEdit,
  types,
}) => (
  <form onSubmit={onSubmit} className="space-y-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="sm:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Název turnaje *
        </label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Bratislava Open 2026"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Místo konání *
        </label>
        <input
          type="text"
          value={data.location}
          onChange={(e) => setData({ ...data, location: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Praha"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Cena (Kč) *
        </label>
        <input
          type="number"
          value={data.price}
          onChange={(e) => setData({ ...data, price: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Typ *
        </label>
        <select
          value={data.type_id}
          onChange={(e) => setData({ ...data, type_id: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="">-- Vyber typ --</option>
          {types.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Datum začátku *
        </label>
        <input
          type="date"
          value={data.start_date}
          onChange={(e) => setData({ ...data, start_date: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Datum konce
        </label>
        <input
          type="date"
          value={data.end_date}
          onChange={(e) => setData({ ...data, end_date: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Uzávěrka přihlášek *
        </label>
        <input
          type="date"
          value={data.registrable_date}
          onChange={(e) =>
            setData({ ...data, registrable_date: e.target.value })
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>
      <div className="sm:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Popis / info
        </label>
        <textarea
          value={data.info}
          rows={3}
          onChange={(e) => setData({ ...data, info: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
          placeholder="Další informace o turnaji..."
        />
      </div>
    </div>

    {/* Foto */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Fotka / plakát{" "}
        {isEdit && (
          <span className="text-gray-400 font-normal">
            (nepovinné – ponechá stávající)
          </span>
        )}
      </label>
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg cursor-pointer transition-colors text-sm">
          <Upload size={16} />
          <span>Vybrat soubor</span>
          <input
            type="file"
            accept="image/*"
            onChange={onImageChange}
            className="hidden"
          />
        </label>
        {data.image && (
          <span className="text-sm text-gray-600">{data.image.name}</span>
        )}
      </div>
      {previewImg && (
        <img
          src={previewImg}
          alt="Náhled"
          className="mt-2 h-28 object-contain rounded-lg border border-gray-200"
        />
      )}
    </div>

    {error && (
      <div className="px-4 py-3 bg-red-50 border border-red-300 rounded-lg text-sm text-red-700">
        {error}
      </div>
    )}

    <div className="flex gap-3 pt-2">
      <button
        type="submit"
        disabled={isSaving}
        className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSaving ? "Ukládám..." : isEdit ? "Uložit změny" : "Přidat turnaj"}
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
);

// ─────────────────────────────────────────────
function AdminTurnaje() {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [types, setTypes] = useState([]);

  // Přidání
  const [showAddForm, setShowAddForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [newTournament, setNewTournament] = useState({
    name: "",
    location: "",
    price: "",
    type_id: "",
    start_date: "",
    end_date: "",
    registrable_date: "",
    info: "",
    image: null,
  });
  const [previewUrl, setPreviewUrl] = useState(null);
  const [formError, setFormError] = useState("");

  // Editace
  const [editingId, setEditingId] = useState(null);
  const [editTournament, setEditTournament] = useState({});
  const [editPreviewUrl, setEditPreviewUrl] = useState(null);
  const [editError, setEditError] = useState("");
  const [editSaving, setEditSaving] = useState(false);

  useEffect(() => {
    fetchTournaments();
    fetchTypes();
  }, []);

  const fetchTournaments = () => {
    fetch("http://localhost:3000/api/tournaments")
      .then((res) => res.json())
      .then((data) => {
        setTournaments(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setTournaments([]);
        setLoading(false);
      });
  };
  const validateForm = (data, setError) => {
    if (!data.name) {
      setError("Vyplňte prosím název turnaje.");
      return false;
    }
    if (!data.location) {
      setError("Vyplňte prosím místo konání.");
      return false;
    }
    if (!data.price) {
      setError("Vyplňte prosím cenu.");
      return false;
    }
    if (!data.type_id) {
      setError("Vyberte prosím typ akce.");
      return false;
    }
    if (!data.start_date) {
      setError("Vyplňte prosím datum začátku.");
      return false;
    }
    if (!data.registrable_date) {
      setError("Vyplňte prosím uzávěrku přihlášek.");
      return false;
    }
    return true;
  };

  const fetchTypes = () => {
    fetch("http://localhost:3000/api/tournaments/types")
      .then((res) => res.json())
      .then((data) => setTypes(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Chyba při načítání typů:", err));
  };

  const handleDelete = async (id) => {
    if (!confirm("Opravdu chcete smazat tento turnaj?")) return;
    setDeleting(id);
    try {
      const response = await fetch(
        `http://localhost:3000/api/tournaments/${id}`,
        { method: "DELETE" },
      );
      if (response.ok) setTournaments(tournaments.filter((t) => t.id !== id));
      else alert("Nepodařilo se smazat turnaj");
    } catch {
      alert("Chyba při mazání turnaje");
    } finally {
      setDeleting(null);
    }
  };

  // --- ADD ---
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewTournament({ ...newTournament, image: file });
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    if (!validateForm(newTournament, setFormError)) return;

    setSaving(true);
    const formData = new FormData();
    Object.entries(newTournament).forEach(([key, val]) => {
      if (key === "image" && val) formData.append("image", val);
      else if (key !== "image") formData.append(key, val || "");
    });

    try {
      const response = await fetch("http://localhost:3000/api/tournaments", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        cancelAdd();
        fetchTournaments();
      } else {
        const err = await response.json();
        setFormError("Chyba: " + (err.error || "Nepodařilo se přidat turnaj"));
      }
    } catch {
      setFormError("Chyba při ukládání turnaje.");
    } finally {
      setSaving(false);
    }
  };

  const cancelAdd = () => {
    setShowAddForm(false);
    setFormError("");
    setPreviewUrl(null);
    setNewTournament({
      name: "",
      location: "",
      price: "",
      type_id: "",
      start_date: "",
      end_date: "",
      registrable_date: "",
      info: "",
      image: null,
    });
  };

  // --- EDIT ---
  const startEdit = (t) => {
    setEditingId(t.id);
    setEditTournament({
      name: t.name || "",
      location: t.location || "",
      price: t.price || "",
      type_id: t.type_id || "",
      start_date: t.start_date_raw?.substring(0, 10) || "",
      end_date: t.end_date_raw?.substring(0, 10) || "",
      registrable_date: t.registrable_date?.substring(0, 10) || "",
      info: t.info || "",
      image: null,
    });
    setEditPreviewUrl(null);
    setEditError("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTournament({});
    setEditPreviewUrl(null);
    setEditError("");
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditTournament({ ...editTournament, image: file });
      const reader = new FileReader();
      reader.onloadend = () => setEditPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleEditSubmit = async (id) => {
    setEditError("");
    if (!validateForm(editTournament, setEditError)) return;

    setEditSaving(true);
    const formData = new FormData();
    Object.entries(editTournament).forEach(([key, val]) => {
      if (key === "image" && val) formData.append("image", val);
      else if (key !== "image") formData.append(key, val || "");
    });

    try {
      const response = await fetch(
        `http://localhost:3000/api/tournaments/${id}`,
        { method: "PUT", body: formData },
      );
      if (response.ok) {
        cancelEdit();
        fetchTournaments();
      } else {
        const err = await response.json();
        setEditError("Chyba: " + (err.error || "Nepodařilo se uložit změny"));
      }
    } catch {
      setEditError("Chyba při ukládání turnaje.");
    } finally {
      setEditSaving(false);
    }
  };

  const formatDate = (dateStr) =>
    dateStr ? new Date(dateStr).toLocaleDateString("cs-CZ") : "—";

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Načítám turnaje...</div>
      </div>
    );

  return (
    <div className="space-y-6">
      {/* Hlavička */}
      <div className="flex justify-between items-center">
        <div className="devider">Správa turnajů</div>
        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
          >
            <Plus size={20} />
            <span>Přidat turnaj</span>
          </button>
        )}
      </div>

      {/* Formulář přidání */}
      {showAddForm && (
        <div className="bg-customWhite rounded-lg shadow-lg p-6 border-2 border-green-500">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Nový turnaj</h3>
            <button
              onClick={cancelAdd}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>
          <TournamentForm
            data={newTournament}
            setData={setNewTournament}
            onSubmit={handleSubmit}
            onCancel={cancelAdd}
            isSaving={saving}
            error={formError}
            previewImg={previewUrl}
            onImageChange={handleImageChange}
            isEdit={false}
            types={types}
          />
        </div>
      )}

      {/* Seznam */}
      {!tournaments.length ? (
        <div className="bg-customWhite rounded-lg shadow p-8 text-center">
          <Trophy className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-500">Zatím nejsou žádné turnaje</p>
        </div>
      ) : (
        <div className="space-y-4">
          {tournaments.map((tournament) => (
            <div
              key={tournament.id}
              className="bg-customWhite rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-4"
            >
              {editingId === tournament.id ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-700">
                      Editace turnaje #{tournament.id}
                    </span>
                    <button
                      onClick={cancelEdit}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <TournamentForm
                    data={editTournament}
                    setData={setEditTournament}
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleEditSubmit(tournament.id);
                    }}
                    onCancel={cancelEdit}
                    isSaving={editSaving}
                    error={editError}
                    previewImg={editPreviewUrl}
                    onImageChange={handleEditImageChange}
                    isEdit={true}
                    types={types}
                  />
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  {/* ID */}
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-800 font-semibold text-sm">
                      {tournament.id}
                    </span>
                  </div>

                  {/* Foto */}
                  <div className="flex-shrink-0">
                    {tournament.img_path ? (
                      <img
                        src={tournament.img_path}
                        alt={tournament.name}
                        className="w-16 h-16 rounded-lg object-cover border-2 border-gray-200"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white">
                        <Trophy size={28} />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <p className="text-lg font-semibold text-gray-800">
                        {tournament.name}
                      </p>
                      {tournament.type_name && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {tournament.type_name}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                      {tournament.location && (
                        <span className="flex items-center gap-1">
                          <MapPin size={13} /> {tournament.location}
                        </span>
                      )}
                      {tournament.start_date_raw && (
                        <span className="flex items-center gap-1">
                          <Calendar size={13} />
                          {formatDate(tournament.start_date_raw)}
                          {tournament.end_date_raw &&
                          tournament.end_date_raw !== tournament.start_date_raw
                            ? ` – ${formatDate(tournament.end_date_raw)}`
                            : ""}
                        </span>
                      )}
                      {tournament.price && (
                        <span className="flex items-center gap-1">
                          <Coins size={13} /> {tournament.price} Kč
                        </span>
                      )}
                    </div>
                    {tournament.registrable_date && (
                      <p className="text-xs text-orange-600 mt-1">
                        Uzávěrka přihlášek:{" "}
                        {formatDate(tournament.registrable_date)}
                      </p>
                    )}
                    {tournament.info && (
                      <p className="text-xs text-gray-400 mt-1 truncate">
                        {tournament.info}
                      </p>
                    )}
                  </div>

                  {/* Tlačítka */}
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => startEdit(tournament)}
                      className="flex items-center gap-2 px-4 py-2 bg-customGreen/85 hover:bg-customGreen text-white rounded-lg transition-colors duration-200"
                    >
                      <Plus size={18} />
                      <span>Přihlásit se</span>
                    </button>
                    <button
                      onClick={() => startEdit(tournament)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200"
                    >
                      <Pencil size={18} />
                      <span>Editovat</span>
                    </button>
                    <button
                      onClick={() => handleDelete(tournament.id)}
                      disabled={deleting === tournament.id}
                      className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 disabled:opacity-50"
                    >
                      <Trash2 size={18} />
                      <span>
                        {deleting === tournament.id ? "Mažu..." : "Smazat"}
                      </span>
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

export default AdminTurnaje;
