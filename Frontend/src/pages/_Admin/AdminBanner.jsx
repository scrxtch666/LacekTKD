import React, { useState, useEffect } from "react";
import { Trash2, Image as ImageIcon } from "lucide-react";

function AdminBanner() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = () => {
    fetch("http://localhost:3000/api/banner")
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
      const response = await fetch(`http://localhost:3000/api/banner/${id}`, {
        method: "DELETE",
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Načítám bannery...</div>
      </div>
    );
  }

  if (!banners.length) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-gray-500">Zatím nejsou žádné bannery</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="devider">Správa bannerů</h2>
      
      {banners.map((banner) => (
        <div
          key={banner.id}
          className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-4"
        >
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* ID Badge */}
            <div className="flex-shrink-0">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-800 font-semibold">
                {banner.id}
              </span>
            </div>

            {/* Obrázek */}
            <div className="flex-shrink-0">
              <img
                src={banner.img_path}
                alt={banner.banner_name}
                className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200"
              />
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              <p className="text-sm text-gray-500 mb-1">Název banneru</p>
              <p className="text-lg font-semibold text-gray-800">
                {banner.banner_name}
              </p>
            </div>

            {/* Tlačítko smazat */}
            <div className="flex-shrink-0">
              <button
                onClick={() => handleDelete(banner.id)}
                disabled={deleting === banner.id}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Trash2 size={18} />
                <span>{deleting === banner.id ? "Mažu..." : "Smazat"}</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminBanner;