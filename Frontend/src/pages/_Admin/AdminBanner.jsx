import React, { useState, useEffect } from "react";
import {
  Trash2,
  Image as ImageIcon,
  Plus,
  Upload,
  X,
  Eye,
  EyeOff,
} from "lucide-react";
import config from "../../../config";
import BannerAddForm from "../AdminBanner/BannerAddForm";
import BannerList from "../AdminBanner/BannerList";
const API = config.API_URL;
const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

function AdminBanner() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState(null);

  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = () => {
    fetch(`${API}/api/banner`)
      .then((response) => response.json())
      .then((data) => {
        setBanners(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Chyba při načítání dat:", error);
        setBanners([]);
        setLoading(false);
      });
  };

  const handleDelete = async (id) => {
    if (!confirm("Opravdu chcete smazat tento banner?")) return;

    setDeleting(id);
    try {
      const response = await fetch(`${API}/api/banner/${id}`, {
        method: "DELETE",
        headers: authHeader(),
      });

      if (response.ok) {
        setBanners(banners.filter((banner) => banner.id !== id));
      } else {
        alert("Nepodařilo se smazat banner");
      }
    } catch (error) {
      console.error("Chyba při mazání:", error);
      alert("Chyba při mazání banneru");
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
        setBanners(
          banners.map((banner) =>
            banner.id === id ? { ...banner, active: !currentActive } : banner,
          ),
        );
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewBanner({ ...newBanner, image: file });

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newBanner.name || !newBanner.image) {
      alert("Vyplňte prosím název a vyberte obrázek");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("banner_name", newBanner.name);
    formData.append("image", newBanner.image);
    formData.append("active", newBanner.active ? "1" : "0");

    try {
      const response = await fetch(`${API}/api/banner`, {
        method: "POST",
        headers: authHeader(),
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        alert("Banner byl úspěšně přidán!");

        // Reset formuláře
        setNewBanner({ name: "", image: null, active: true });
        setPreviewUrl(null);
        setShowAddForm(false);

        fetchBanners();
      } else {
        const error = await response.json();
        alert("Chyba: " + (error.error || "Nepodařilo se přidat banner"));
      }
    } catch (error) {
      console.error("Chyba při nahrávání:", error);
      alert("Chyba při nahrávání banneru");
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Načítám bannery...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="devider">Správa bannerů</div>

        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
          >
            <Plus size={20} />
            <span>Přidat banner</span>
          </button>
        )}
      </div>

      {showAddForm && (
        <BannerAddForm
          onSuccess={() => {
            setShowAddForm(false);
            fetchBanners();
          }}
          onCancel={() => setShowAddForm(false)}
          API={API}
        />
      )}
      <BannerList banners={banners} onRefresh={fetchBanners} API={API} />
    </div>
  );
}

export default AdminBanner;
