import React, { useState, useEffect } from "react";
import {
  Trash2,
  UserPlus,
  X,
  Mail,
  Shield,
  Pencil,
  Check,
  ShieldCheck,
  User,
  Users,
} from "lucide-react";
import config from "../../../config";

const API = config.API_URL;

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [roles, setRoles] = useState([]);
  const [fighters, setFighters] = useState([]);

  // Přidání uživatele
  const [showAddForm, setShowAddForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [newUser, setNewUser] = useState({
    login: "",
    email: "",
    password: "",
    passwordConfirm: "",
    role: "",
    fighter_id: "",
  });
  const [formError, setFormError] = useState("");

  // Editace uživatele
  const [editingId, setEditingId] = useState(null);
  const [editUser, setEditUser] = useState({});
  const [editError, setEditError] = useState("");
  const [editSaving, setEditSaving] = useState(false);

  useEffect(() => {
    fetchUsers();
    fetchRoles();
    fetchFighters();
  }, []);

  const fetchUsers = () => {
    fetch(`${API}/api/users`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setUsers([]);
        setLoading(false);
      });
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case "admin":
        return "administrátor";
      case "trainer":
        return "trenér";
      case "user":
        return "závodník";
      default:
        return role || "";
    }
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case "admin":
        return {
          label: "Administrátor",
          icon: <Shield size={12} />,
          className: "bg-red-50 text-red-600",
        };
      case "trainer":
        return {
          label: "Trenér",
          icon: <Users size={12} />,
          className: "bg-blue-50 text-blue-600",
        };
      default:
        return {
          label: "Závodník",
          icon: <User size={12} />,
          className: "bg-green-50 text-customGreen",
        };
    }
  };

  const fetchRoles = () => {
    fetch(`${API}/api/roles`)
      .then((res) => res.json())
      .then((data) => setRoles(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Chyba při načítání rolí:", err));
  };

  const fetchFighters = () => {
    fetch(`${API}/api/fighters`)
      .then((res) => res.json())
      .then((data) => setFighters(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Chyba při načítání závodníků:", err));
  };

  const handleDelete = async (id) => {
    if (!confirm("Opravdu chcete smazat tohoto uživatele?")) return;
    setDeleting(id);
    try {
      const response = await fetch(`${API}/api/users/${id}`, {
        method: "DELETE",
      });
      if (response.ok) setUsers(users.filter((u) => u.id !== id));
      else alert("Nepodařilo se smazat uživatele");
    } catch {
      alert("Chyba při mazání uživatele");
    } finally {
      setDeleting(null);
    }
  };

  // --- Editace ---
  const startEdit = (user) => {
    setEditingId(user.id);
    setEditUser({
      login: user.login || "",
      email: user.email || "",
      password: "",
      passwordConfirm: "",
      role: user.role_id || "",
      fighter_id: user.fighter_id || "",
    });
    setEditError("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditUser({});
    setEditError("");
  };

  const handleEditSubmit = async (id) => {
    setEditError("");
    if (!editUser.login) {
      setEditError("Login nesmí být prázdný.");
      return;
    }
    if (editUser.password && editUser.password.length < 6) {
      setEditError("Heslo musí mít minimálně 6 znaků.");
      return;
    }
    if (editUser.password && editUser.password !== editUser.passwordConfirm) {
      setEditError("Hesla se neshodují.");
      return;
    }
    if (!editUser.role) {
      setEditError("Vyberte prosím roli.");
      return;
    }

    setEditSaving(true);
    const payload = {
      login: editUser.login,
      email: editUser.email,
      role_id: editUser.role,
      fighter_id: editUser.fighter_id || null,
    };
    if (editUser.password) payload.password = editUser.password;

    try {
      const response = await fetch(`${API}/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        cancelEdit();
        fetchUsers();
      } else {
        const error = await response.json();
        setEditError("Chyba: " + (error.error || "Nepodařilo se uložit změny"));
      }
    } catch {
      setEditError("Chyba při ukládání uživatele.");
    } finally {
      setEditSaving(false);
    }
  };

  // --- Přidání ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    if (!newUser.login || !newUser.password || !newUser.passwordConfirm) {
      setFormError("Vyplňte prosím všechna povinná pole.");
      return;
    }
    if (newUser.password.length < 6) {
      setFormError("Heslo musí mít minimálně 6 znaků.");
      return;
    }
    if (newUser.password !== newUser.passwordConfirm) {
      setFormError("Hesla se neshodují.");
      return;
    }
    if (!newUser.role) {
      setFormError("Vyberte prosím roli.");
      return;
    }

    setSaving(true);
    try {
      const response = await fetch(`${API}/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          login: newUser.login,
          password: newUser.password,
          email: newUser.email,
          role_id: newUser.role,
          fighter_id: newUser.fighter_id || null,
        }),
      });
      if (response.ok) {
        alert("Uživatel byl úspěšně přidán!");
        cancelAdd();
        fetchUsers();
      } else {
        const error = await response.json();
        setFormError(
          "Chyba: " + (error.error || "Nepodařilo se přidat uživatele"),
        );
      }
    } catch {
      setFormError("Chyba při ukládání uživatele.");
    } finally {
      setSaving(false);
    }
  };

  const cancelAdd = () => {
    setShowAddForm(false);
    setFormError("");
    setNewUser({
      login: "",
      email: "",
      password: "",
      passwordConfirm: "",
      role: "",
      fighter_id: "",
    });
  };

  // Pomocná funkce – najde fightera přiřazeného k userovi
  const getFighterLabel = (fighter_id) => {
    const f = fighters.find((f) => f.id === fighter_id);
    return f ? `${f.name} ${f.surname}` : null;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Načítám uživatele...</div>
      </div>
    );
  }

  // Fighter select – sdílený pro add i edit
  const FighterSelect = ({ value, onChange }) => (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">
        Přiřazený závodník <span className="text-gray-400">(nepovinné)</span>
      </label>
      <select
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
      >
        <option value="">-- Bez přiřazení --</option>
        {fighters.map((f) => (
          <option key={f.id} value={f.id}>
            {f.name} {f.surname}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="devider">Správa uživatelů</div>
        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
          >
            <UserPlus size={20} />
            <span>Přidat uživatele</span>
          </button>
        )}
      </div>

      {/* Formulář pro přidání */}
      {showAddForm && (
        <div className="bg-customWhite rounded-lg shadow-lg p-6 border-2 border-green-500">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">
              Nový uživatel
            </h3>
            <button
              onClick={cancelAdd}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Login *
                </label>
                <input
                  type="text"
                  value={newUser.login}
                  onChange={(e) =>
                    setNewUser({ ...newUser, login: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="novak30"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="novak@email.cz"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Heslo *
                </label>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
                <p className="text-xs text-gray-500 mt-1">Minimálně 6 znaků</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Potvrzení hesla *
                </label>
                <input
                  type="password"
                  value={newUser.passwordConfirm}
                  onChange={(e) =>
                    setNewUser({ ...newUser, passwordConfirm: e.target.value })
                  }
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${newUser.passwordConfirm && newUser.password !== newUser.passwordConfirm ? "border-red-400 bg-red-50" : "border-gray-300"}`}
                  placeholder="••••••••"
                  required
                />
                {newUser.passwordConfirm &&
                  newUser.password !== newUser.passwordConfirm && (
                    <p className="text-xs text-red-500 mt-1">
                      Hesla se neshodují
                    </p>
                  )}
                {newUser.passwordConfirm &&
                  newUser.password === newUser.passwordConfirm && (
                    <p className="text-xs text-green-600 mt-1">
                      ✓ Hesla se shodují
                    </p>
                  )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role *
                </label>
                <select
                  value={newUser.role}
                  onChange={(e) =>
                    setNewUser({ ...newUser, role: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="">-- Vyber roli --</option>
                  {roles.map((role) => {
                    let label = role.role_name;
                    if (role.role_name === "user") label = "závodník";
                    if (role.role_name === "trainer") label = "trenér";
                    if (role.role_name === "admin") label = "administrátor";
                    return (
                      <option key={role.id} value={role.id}>
                        {label}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Závodník{" "}
                  <span className="text-gray-400 font-normal">(nepovinné)</span>
                </label>
                <select
                  value={newUser.fighter_id}
                  onChange={(e) =>
                    setNewUser({ ...newUser, fighter_id: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">-- Bez přiřazení --</option>
                  {fighters.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name} {f.surname}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {formError && (
              <div className="px-4 py-3 bg-red-50 border border-red-300 rounded-lg text-sm text-red-700">
                {formError}
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? "Ukládám..." : "Přidat uživatele"}
              </button>
              <button
                type="button"
                onClick={cancelAdd}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors"
              >
                Zrušit
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Seznam uživatelů */}
      {!users.length ? (
        <div className="bg-customWhite rounded-lg shadow p-8 text-center">
          <UserPlus className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-500">Zatím nejsou žádní uživatelé</p>
        </div>
      ) : (
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-customWhite rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-4"
            >
              {editingId === user.id ? (
                /* --- Editační formulář --- */
                <div className="space-y-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-700">
                      Editace uživatele #{user.id}
                    </span>
                    <button
                      onClick={cancelEdit}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Login *
                      </label>
                      <input
                        type="text"
                        value={editUser.login}
                        onChange={(e) =>
                          setEditUser({ ...editUser, login: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={editUser.email}
                        onChange={(e) =>
                          setEditUser({ ...editUser, email: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="novak@email.cz"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Nové heslo{" "}
                        <span className="text-gray-400">
                          (nevyplňujte pro zachování)
                        </span>
                      </label>
                      <input
                        type="password"
                        value={editUser.password}
                        onChange={(e) =>
                          setEditUser({ ...editUser, password: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="••••••••"
                        minLength={6}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Potvrzení hesla
                      </label>
                      <input
                        type="password"
                        value={editUser.passwordConfirm}
                        onChange={(e) =>
                          setEditUser({
                            ...editUser,
                            passwordConfirm: e.target.value,
                          })
                        }
                        className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent ${editUser.passwordConfirm && editUser.password !== editUser.passwordConfirm ? "border-red-400 bg-red-50" : "border-gray-300"}`}
                        placeholder="••••••••"
                      />
                      {editUser.passwordConfirm &&
                        editUser.password !== editUser.passwordConfirm && (
                          <p className="text-xs text-red-500 mt-1">
                            Hesla se neshodují
                          </p>
                        )}
                      {editUser.passwordConfirm &&
                        editUser.password === editUser.passwordConfirm && (
                          <p className="text-xs text-green-600 mt-1">
                            ✓ Hesla se shodují
                          </p>
                        )}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Role *
                      </label>
                      <select
                        value={editUser.role}
                        onChange={(e) =>
                          setEditUser({ ...editUser, role: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">-- Vyber roli --</option>
                        {roles.map((role) => {
                          let label = role.role_name;
                          if (role.role_name === "user") label = "závodník";
                          if (role.role_name === "trainer") label = "trenér";
                          if (role.role_name === "admin")
                            label = "administrátor";
                          return (
                            <option key={role.id} value={role.id}>
                              {label}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    {/* --- FIGHTER SELECT --- */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Závodník{" "}
                        <span className="text-gray-400">(nepovinné)</span>
                      </label>
                      <select
                        value={editUser.fighter_id}
                        onChange={(e) =>
                          setEditUser({
                            ...editUser,
                            fighter_id: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">-- Bez přiřazení --</option>
                        {fighters.map((f) => (
                          <option key={f.id} value={f.id}>
                            {f.name} {f.surname}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {editError && (
                    <div className="px-3 py-2 bg-red-50 border border-red-300 rounded-lg text-sm text-red-700">
                      {editError}
                    </div>
                  )}

                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => handleEditSubmit(user.id)}
                      disabled={editSaving}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Check size={16} />
                      {editSaving ? "Ukládám..." : "Uložit změny"}
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-sm transition-colors"
                    >
                      Zrušit
                    </button>
                  </div>
                </div>
              ) : (
                /* --- Normální zobrazení --- */
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-800 font-semibold">
                      {user.id}
                    </span>
                  </div>
                  <div className="flex-shrink-0">
                    {user.img_path ? (
                      <img
                        className="w-16 h-16 rounded-full object-cover"
                        src={`${API}${user.img_path}`}
                        alt={user.login}
                      />
                    ) : (
                      <div className="w-16 h-16 noPfp">
                        {user.login?.charAt(0).toUpperCase() || "U"}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <p className="text-lg font-semibold text-gray-800">
                      {user.name} {user.surname}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 mt-1 justify-center sm:justify-start">
                      <span>login: {user.login}</span>
                      {user.email && (
                        <>
                          <Mail size={14} />
                          <span>{user.email}</span>
                        </>
                      )}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
                      {(() => {
                        const badge = getRoleBadge(user.role_name);
                        return (
                          <span
                            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full ${badge.className}`}
                          >
                            {badge.icon}
                            {badge.label}
                          </span>
                        );
                      })()}

                      {/* Badge závodníka */}
                      {user.fighter_id && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <ShieldCheck size={11} />
                          Přiřazený účet
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => startEdit(user)}
                      className="editBtn"
                    >
                      <Pencil size={18} />
                      <span>Editovat</span>
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      disabled={deleting === user.id}
                      className="deleteBtn disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Trash2 size={18} />
                      <span>{deleting === user.id ? "Mažu..." : "Smazat"}</span>
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

export default AdminUsers;
