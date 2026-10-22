import React, { useState, useEffect } from "react";
import { Trash2, Image as ImageIcon, Plus } from "lucide-react";
import config from "../../../config";
import BannerAddForm from "../AdminBanner/BannerAddForm";
import BannerList from "../AdminBanner/BannerList";
const API = config.API_URL;

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
