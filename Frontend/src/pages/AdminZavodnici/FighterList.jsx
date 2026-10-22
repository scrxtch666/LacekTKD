import { useState } from "react";
import { UserPlus, Trash2, Star, UserX, Trophy } from "lucide-react";
import FighterCard from "./FighterCard";
import SearchBar from "../../components/SearchBar";

function FighterList({ fighters, belts, categories, onRefresh, API }) {
  const [deleting, setDeleting] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");
  const [filterBest, setFilterBest] = useState(false);
  const [filterLegend, setFilterLegend] = useState(false);
  const [filterAccount, setFilterAccount] = useState("");

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

  const handleDelete = async (id) => {
    if (!confirm("Opravdu chcete smazat tento závodníka?")) return;
    setDeleting(id);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API}/api/fighters/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (res.ok) onRefresh();
      else {
        const data = await res.json();
        alert(data.error || "Nepodařilo se smazat závodníka");
      }
    } catch {
      alert("Chyba při mazání");
    } finally {
      setDeleting(null);
    }
  };

  if (!fighters.length)
    return (
      <div className="bg-customWhite rounded-lg shadow p-8 text-center">
        <UserPlus className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-gray-500">Zatím nejsou žádné závodníci</p>
      </div>
    );

  return (
    <div className="space-y-4">
      {/* Vyhledávání */}
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

      {/* Výsledky vyhledávání */}
      {filteredFighters.length === 0 ? (
        <div className="bg-customWhite rounded-lg shadow p-8 text-center">
          {fighters.length === 0 ? (
            <>
              <UserPlus className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-500">Zatím nejsou žádní závodníci</p>
            </>
          ) : (
            <>
              <UserX className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-500">
                {hasActiveFilter
                  ? "Žádný závodník neodpovídá vyhledávání"
                  : "Zatím nejsou žádní závodníci"}
              </p>
            </>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredFighters.map((fighter, index) => (
            <FighterCard
              key={fighter.id}
              index={index}
              fighter={fighter}
              belts={belts}
              categories={categories}
              onDelete={() => handleDelete(fighter.id)}
              isDeleting={deleting === fighter.id}
              isEditing={editingId === fighter.id}
              onStartEdit={() => setEditingId(fighter.id)}
              onCancelEdit={() => setEditingId(null)}
              onEditSuccess={() => {
                setEditingId(null);
                onRefresh();
              }}
              API={API}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default FighterList;
