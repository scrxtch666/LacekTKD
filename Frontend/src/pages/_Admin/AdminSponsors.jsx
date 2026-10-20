import React, { useState, useEffect } from "react";
import { Image as ImageIcon, Plus } from "lucide-react";
import config from "../../../config";
import SponsorAddForm from "../AdminSponsors/SponsorAddForm";
import SponsorList from "../AdminSponsors/SponsorList";

function AdminSponsors() {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchSponsors();
  }, []);

  const API = config.API_URL;

  const fetchSponsors = () => {
    fetch(`${API}/api/sponsors`)
      .then((res) => res.json())
      .then((data) => {
        setSponsors(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Chyba při načítání dat:", err);
        setSponsors([]);
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Načítám sponzory...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="devider">Správa sponzorů</div>
        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
          >
            <Plus size={20} />
            <span>Přidat sponzora</span>
          </button>
        )}
      </div>

      {showAddForm && (
        <SponsorAddForm
          onSuccess={() => {
            setShowAddForm(false);
            fetchSponsors();
          }}
          onCancel={() => setShowAddForm(false)}
          API={API}
        />
      )}
      <SponsorList sponsors={sponsors} onRefresh={fetchSponsors} API={API} />
    </div>
  );
}

export default AdminSponsors;
