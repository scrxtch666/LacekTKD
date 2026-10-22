import React, { useState, useEffect } from "react";
import SearchBar from "../../Components/SearchBar";
import FighterAddForm from "../AdminZavodnici/FighterAddForm";
import FighterList from "../AdminZavodnici/FighterList";

import { UserPlus, Star, UserX, Trophy } from "lucide-react";
import { getUserRole } from "../../utils/auth";
import config from "../../../config";

const API = config.API_URL;

function AdminZavodnici() {
  const [fighters, setFighters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [belts, setBelts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");
  const [filterBest, setFilterBest] = useState(false);
  const [filterLegend, setFilterLegend] = useState(false);
  const [filterAccount, setFilterAccount] = useState("");

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

  const filteredFighters = fighters.filter((fighter) => {
    const matchesSearch = `${fighter.name} ${fighter.surname}`
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesBest = !filterBest || fighter.best === 1;
    const matchesLegend = !filterLegend || fighter.legend === 1;
    const matchesAccount =
      filterAccount === "" ||
      (filterAccount === "assigned" && fighter.user_login) ||
      (filterAccount === "unassigned" && !fighter.user_login);
    return matchesSearch && matchesBest && matchesLegend && matchesAccount;
  });

  const hasActiveFilter = search || filterBest || filterLegend || filterAccount;

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

      <SearchBar
        search={search}
        onSearchChange={setSearch}
        placeholder="Hledat závodníka..."
        hasActiveFilter={!!(search || filterBest || filterLegend)}
        onClear={() => {
          setSearch("");
          setFilterBest(false);
          setFilterLegend(false);
        }}
        filters={[
          {
            key: "account",
            type: "select",
            value: filterAccount,
            onChange: setFilterAccount,
            placeholder: "Typy účtů",
            options: [
              { value: "assigned", label: "✅ Přiřazený účet" },
              { value: "unassigned", label: "❌Nepřiřazený účet" },
            ],
          },
          {
            key: "best",
            type: "toggle",
            value: filterBest,
            onChange: setFilterBest,
            label: "Nejlepší",
            icon: Star,
          },
          {
            key: "legend",
            type: "toggle",
            value: filterLegend,
            onChange: setFilterLegend,
            label: "Legenda",
            icon: Trophy,
          },
        ]}
      />

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

      {filteredFighters.length === 0 ? (
        <div className="bg-customWhite rounded-lg shadow p-8 text-center">
          <UserX className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-500">
            {hasActiveFilter
              ? "Žádný závodník neodpovídá filtrům"
              : "Zatím nejsou žádní závodníci"}
          </p>
        </div>
      ) : (
        <FighterList
          fighters={fighters}
          belts={belts}
          categories={categories}
          onRefresh={fetchFighters}
          API={API}
        />
      )}
    </div>
  );
}

export default AdminZavodnici;
