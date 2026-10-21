import { useState } from "react";
import { UserPlus, Trash2 } from "lucide-react";
import BannerCard from "./BannerCard";

function BannerList({ banners, onRefresh, API }) {
  const [deleting, setDeleting] = useState(null);
  const [toggling, setToggling] = useState(null);

  const authHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });

  const handleDelete = async (id) => {
    if (!confirm("Opravdu chcete smazat tento banner?")) return;
    setDeleting(id);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API}/api/banner/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (res.ok) onRefresh();
      else {
        const data = await res.json();
        alert(data.error || "Nepodařilo se smazat banner");
      }
    } catch {
      alert("Chyba při mazání");
    } finally {
      setDeleting(null);
    }
  };

  const handleToggleActive = async (id, currentActive) => {
    setToggling(id);
    try {
      const response = await fetch(`${API}/api/banner/${id}/toggle`, {
        method: "PATCH",
        headers: {
          ...authHeader(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ active: !currentActive }),
      });

      if (response.ok) {
        await onRefresh();
      } else {
        alert("Nepodařilo se změnit stav banneru");
      }
    } catch (error) {
      console.error("Chyba při změně stavu:", error);
      alert("Chyba při změně stavu banneru");
    } finally {
      setToggling(null);
    }
  };

  if (!banners.length)
    return (
      <div className="bg-customWhite rounded-lg shadow p-8 text-center">
        <UserPlus className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-gray-500">Zatím nejsou žádné bannery</p>
      </div>
    );

  return (
    <div className="space-y-4">
      {banners.map((banner, index) => (
        <BannerCard
          key={banner.id}
          index={index}
          banner={banner}
          onDelete={() => handleDelete(banner.id)}
          isDeleting={deleting === banner.id}
          onToggleActive={() => handleToggleActive(banner.id, banner.active)}
          isToggling={toggling === banner.id}
          API={API}
        />
      ))}
    </div>
  );
}

export default BannerList;
