import { useState } from "react";
import { UserPlus, Trash2 } from "lucide-react";
import FighterCard from "./FighterCard";

function FighterList({ fighters, belts, categories, onRefresh, API }) {
  const [deleting, setDeleting] = useState(null);
  const [editingId, setEditingId] = useState(null);

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
      {fighters.map((fighter, index) => (
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
  );
}

export default FighterList;
