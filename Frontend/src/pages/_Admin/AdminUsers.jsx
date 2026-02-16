import React, { useState, useEffect } from "react";
import { Trash2, UserPlus, X, UserCheck, UserX, Mail, Shield } from "lucide-react";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [toggling, setToggling] = useState(null);

  // Stav pro přidání nového uživatele
  const [showAddForm, setShowAddForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    fetch("http://localhost:3000/api/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Chyba při načítání uživatelů:", error);
        setUsers([]);
        setLoading(false);
      });
  };

  const handleDelete = async (id) => {
    if (!confirm("Opravdu chcete smazat tohoto uživatele?")) return;

    setDeleting(id);
    try {
      const response = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setUsers(users.filter((user) => user.id !== id));
      } else {
        alert("Nepodařilo se smazat uživatele");
      }
    } catch (error) {
      console.error("Chyba při mazání:", error);
      alert("Chyba při mazání uživatele");
    } finally {
      setDeleting(null);
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newUser.name || !newUser.email || !newUser.password) {
      alert("Vyplňte prosím všechna povinná pole");
      return;
    }

    // Validace emailu
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newUser.email)) {
      alert("Zadejte platnou emailovou adresu");
      return;
    }

    setSaving(true);

    try {
      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newUser.name,
          email: newUser.email,
          password: newUser.password,
          role: newUser.role,
        }),
      });

      if (response.ok) {
        alert("Uživatel byl úspěšně přidán!");

        // Reset formuláře
        setNewUser({
          name: "",
          email: "",
          password: "",
          role: "user",
        });
        setShowAddForm(false);

        // Refresh seznamu
        fetchUsers();
      } else {
        const error = await response.json();
        alert("Chyba: " + (error.error || "Nepodařilo se přidat uživatele"));
      }
    } catch (error) {
      console.error("Chyba při ukládání:", error);
      alert("Chyba při ukládání uživatele");
    } finally {
      setSaving(false);
    }
  };

  const cancelAdd = () => {
    setShowAddForm(false);
    setNewUser({
      name: "",
      email: "",
      password: "",
      role: "user",
    });
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800";
      case "moderator":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Načítám uživatele...</div>
      </div>
    );
  }

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
            <h3 className="text-xl font-semibold text-gray-800">Nový uživatel</h3>
            <button
              onClick={cancelAdd}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Jméno */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jméno *
              </label>
              <input
                type="text"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Jan Novák"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="jan.novak@email.cz"
                required
              />
            </div>

            {/* Heslo */}
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

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>
              <select
                value={newUser.role}
                onChange={(e) =>
                  setNewUser({ ...newUser, role: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="user">Uživatel</option>
                <option value="moderator">Moderátor</option>
                <option value="admin">Administrátor</option>
              </select>
            </div>

           
           

            {/* Tlačítka */}
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
              className={`bg-customWhite rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-4 `}
            >
              <div className="flex flex-col sm:flex-row items-center gap-4">
                {/* ID Badge */}
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-800 font-semibold">
                    {user.id}
                  </span>
                </div>

                {/* Avatar/Ikona */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-2xl font-bold">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 text-center sm:text-left">
                  <p className="text-lg font-semibold text-gray-800">
                    {user.name}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mt-1 justify-center sm:justify-start">
                    <span>login: {user.login}</span>
                  <Mail size={14} />
                    <span>email: {user.email}</span>
                  </div>
                  <div className="mt-2 flex gap-2 justify-center sm:justify-start">
                    
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(
                        user.role
                      )}`}
                    >
                      <Shield size={12} />
                      {user.role_name}
                    </span>
                  </div>
                </div>

                {/* Tlačítka */}
                <div className="flex flex-col sm:flex-row gap-2">
                  {/* Tlačítko smazat */}
                  <button
                    onClick={() => handleDelete(user.id)}
                    disabled={deleting === user.id}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Trash2 size={18} />
                    <span>{deleting === user.id ? "Mažu..." : "Smazat"}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminUsers;