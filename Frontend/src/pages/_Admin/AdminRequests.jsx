import { useState, useEffect } from "react";
import { Check, X, User, Mail } from "lucide-react";

const API = "http://localhost:3000";
const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

function AdminRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = () => {
    fetch(`${API}/auth/pending`, { headers: authHeader() })
      .then((res) => res.json())
      .then((data) => {
        setRequests(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleApprove = async (id) => {
    const response = await fetch(`${API}/auth/approve/${id}`, {
      method: "PUT",
      headers: authHeader(),
    });
    if (response.ok) fetchRequests();
    else alert("Nepodařilo se schválit účet");
  };

  const handleReject = async (id) => {
    if (!confirm("Opravdu zamítnout tuto žádost?")) return;
    const response = await fetch(`${API}/auth/reject/${id}`, {
      method: "PUT",
      headers: authHeader(),
    });
    if (response.ok) fetchRequests();
    else alert("Nepodařilo se zamítnout účet");
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64 text-gray-400">
        Načítám...
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="devider">Žádosti o registraci</div>

      {requests.length === 0 ? (
        <div className="bg-customWhite rounded-lg shadow p-8 text-center">
          <User className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-500">Žádné čekající žádosti</p>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div
              key={req.id}
              className="bg-customWhite rounded-lg shadow-md p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold flex-shrink-0">
                {req.login?.charAt(0).toUpperCase()}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800">{req.login}</p>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Mail size={13} />
                  <span>{req.email}</span>
                </div>
                {req.created_at && (
                  <p className="text-xs text-gray-400 mt-0.5">
                    Registrován:{" "}
                    {new Date(req.created_at).toLocaleDateString("cs-CZ")}
                  </p>
                )}
              </div>

              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => handleApprove(req.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors"
                >
                  <Check size={16} /> Schválit
                </button>
                <button
                  onClick={() => handleReject(req.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm transition-colors"
                >
                  <X size={16} /> Zamítnout
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminRequests;
