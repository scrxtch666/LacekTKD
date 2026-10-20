import { useState } from "react";
import { UserPlus } from "lucide-react";
import SponsorCard from "./SponsorCard";

function SponsorList({ sponsors, onRefresh, API }) {
  const [deleting, setDeleting] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const handleDelete = async (id) => {
    if (!confirm("Opravdu chcete smazat tohoto sponzora?")) return;
    setDeleting(id);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API}/api/sponsors/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (res.ok) onRefresh();
      else {
        const data = await res.json();
        alert(data.error || "Nepodařilo se smazat sponzora");
      }
    } catch {
      alert("Chyba při mazání");
    } finally {
      setDeleting(null);
    }
  };

  if (!sponsors.length)
    return (
      <div className="bg-customWhite rounded-lg shadow p-8 text-center">
        <UserPlus className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-gray-500">Zatím nejsou žádní sponsoři</p>
      </div>
    );

  return (
    <div className="space-y-4">
      {sponsors.map((sponsor, index) => (
        <SponsorCard
          key={sponsor.id}
          index={index}
          sponsor={sponsor}
          isEditing={editingId === sponsor.id}
          onStartEdit={() => setEditingId(sponsor.id)}
          onCancelEdit={() => setEditingId(null)}
          onEditSuccess={() => {
            setEditingId(null);
            onRefresh();
          }}
          onDelete={() => handleDelete(sponsor.id)}
          isDeleting={deleting === sponsor.id}
          API={API}
        />
      ))}
    </div>
  );
}

export default SponsorList;
