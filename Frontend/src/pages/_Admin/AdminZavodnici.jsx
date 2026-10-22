import React, { useState, useEffect } from "react";
import FighterAddForm from "../AdminZavodnici/FighterAddForm";
import FighterList from "../AdminZavodnici/FighterList";

import { UserPlus} from "lucide-react";
import { getUserRole } from "../../utils/auth";
import config from "../../../config";

const API = config.API_URL;

function AdminZavodnici() {
  const [fighters, setFighters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [belts, setBelts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchFighters();
    fetchBelts();
    fetchCategories();
  }, []);

  const fetchFighters = () => {
    const role = getUserRole();

    const url =
      role === "admin" || role === "trainer"
        ? `${API}/api/fighters/admin`
        : `${API}/api/fighters`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setFighters(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setFighters([]);
        setLoading(false);
      });
  };

  const fetchBelts = () => {
    fetch(`${API}/api/belts`)
      .then((res) => res.json())
      .then((data) => setBelts(Array.isArray(data) ? data : []))
      .catch(console.error);
  };

  const fetchCategories = () => {
    fetch(`${API}/api/category`)
      .then((res) => res.json())
      .then((data) => setCategories(Array.isArray(data) ? data : []))
      .catch(console.error);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Načítám závodníky...
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="devider">Správa závodníků</div>
        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            <UserPlus size={20} />
            <span>Přidat závodníka</span>
          </button>
        )}
      </div>

      {showAddForm && (
        <FighterAddForm
          onSuccess={() => {
            setShowAddForm(false);
            fetchFighters();
          }}
          onCancel={() => setShowAddForm(false)}
          API={API}
          belts={belts}
          categories={categories}
        />
      )}

      <FighterList
        fighters={fighters}
        belts={belts}
        categories={categories}
        onRefresh={fetchFighters}
        API={API}
      />
    </div>
  );
}

export default AdminZavodnici;
