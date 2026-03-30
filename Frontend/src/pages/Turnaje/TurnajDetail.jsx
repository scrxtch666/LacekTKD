import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUserRole } from "../../utils/auth";
import { Plus } from "lucide-react";

import {
  MapPin,
  Calendar,
  Coins,
  Tag,
  Info,
  ArrowLeft,
  Users,
} from "lucide-react";

const API = "http://localhost:3000";

function TurnajDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tournament, setTournament] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const userRole = getUserRole();

  useEffect(() => {
      fetchRegistrations();
    fetch(`${API}/api/tournaments/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTournament(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    const token = localStorage.getItem("token");

    fetch(`${API}/api/tournamentRegistration?tournamentId=${id}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then((res) => res.json())
      .then((data) => {
        const filtered = Array.isArray(data)
          ? data.filter((r) => String(r.tournament_id) === String(id))
          : [];
        setRegistrations(filtered);

        // Zkontroluj jestli je přihlášený uživatel v seznamu
        if (token && userRole === "user") {
          fetch(`${API}/api/tournamentRegistration/prihlaseny`, {
            headers: { Authorization: `Bearer ${token}` },
          })
            .then((res) => res.json())
            .then((myRegs) => {
              const alreadyIn =
                Array.isArray(myRegs) &&
                myRegs.some((r) => String(r.tournament_id) === String(id));
              setIsRegistered(alreadyIn);
            })
            .catch(() => {});
        }
      })
      .catch(() => {});
  }, [id]);

const handleRegister = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API}/api/tournaments/${id}/register`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();

  if (response.ok) {
    setIsRegistered(true);

    // 🔥 DŮLEŽITÉ – reload registrací
    fetchRegistrations();
  } else {
    alert(data.error || "Nepodařilo se přihlásit.");
  }
};

const fetchRegistrations = () => {
  const token = localStorage.getItem("token");

  fetch(`${API}/api/tournamentRegistration?tournamentId=${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })
    .then((res) => res.json())
    .then((data) => {
      const filtered = Array.isArray(data)
        ? data.filter((r) => String(r.tournament_id) === String(id))
        : [];

      setRegistrations(filtered);
    });
};

  const handleUnregister = async () => {
    if (!confirm("Opravdu se odhlásit z turnaje?")) return;
    const token = localStorage.getItem("token");
    const response = await fetch(`${API}/api/tournaments/${id}/register`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) setIsRegistered(false);
    else alert("Nepodařilo se odhlásit.");
  };

  const formatDate = (dateStr) =>
    dateStr ? new Date(dateStr).toLocaleDateString("cs-CZ") : "—";

  if (loading)
    return (
      <div className="flex items-center justify-center h-64 text-gray-400">
        Načítám...
      </div>
    );
  if (!tournament)
    return (
      <div className="flex items-center justify-center h-64 text-gray-400">
        Turnaj nenalezen
      </div>
    );

  return (
    <div className="max-w-4xl space-y-6">
      {/* Zpět */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-customGreen transition-colors"
      >
        <ArrowLeft size={16} /> Zpět na turnaje
      </button>

      {/* Hero karta */}
      <div className="bg-customWhite rounded-2xl shadow-md overflow-hidden">
        {tournament.img_path && (
          <div className="h-64 sm:h-80 overflow-hidden">
            <img
              src={tournament.img_path}
              alt={tournament.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="p-6 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-800">
              {tournament.name}
            </h1>
            {tournament.type_name && (
              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {tournament.type_name}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            {tournament.location && (
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin size={16} className="text-customGreen flex-shrink-0" />
                <span>{tournament.location}</span>
              </div>
            )}
            {tournament.start_date_raw && (
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar
                  size={16}
                  className="text-customGreen flex-shrink-0"
                />
                <span>
                  {formatDate(tournament.start_date_raw)}
                  {tournament.end_date_raw &&
                  tournament.end_date_raw !== tournament.start_date_raw
                    ? ` – ${formatDate(tournament.end_date_raw)}`
                    : ""}
                </span>
              </div>
            )}
            {tournament.price && (
              <div className="flex items-center gap-2 text-gray-600">
                <Coins size={16} className="text-customGreen flex-shrink-0" />
                <span>Startovné: {tournament.price} Kč</span>
              </div>
            )}
            {tournament.registrable_date && (
              <div className="flex items-center gap-2 text-orange-600">
                <Calendar size={16} className="flex-shrink-0" />
                <span>Uzávěrka: {formatDate(tournament.registrable_date)}</span>
              </div>
            )}
          </div>

          {tournament.info && (
            <div className="flex items-start gap-2 border-t border-gray-100 pt-4 text-sm text-gray-600">
              <Info
                size={16}
                className="text-customGreen flex-shrink-0 mt-0.5"
              />
              <p className="leading-relaxed">{tournament.info}</p>
            </div>
          )}

          {/* Tlačítko přihlášení – pouze pro závodníky */}
          {userRole === "user" && tournament.registrable_date && (
            <div className="border-t border-gray-100 pt-4">
              {new Date() < new Date(tournament.registrable_date) ? (
                isRegistered ? (
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5 px-4 py-2 bg-green-50 text-green-700 border border-green-300 rounded-lg text-sm font-medium">
                      ✓ Přihlášen na turnaj
                    </span>
                    <button
                      onClick={handleUnregister}
                      className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-300 rounded-lg text-sm transition-colors"
                    >
                      Odhlásit se
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleRegister}
                    className="flex items-center gap-2 px-5 py-2.5 bg-customGreen hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    <Plus size={16} /> Přihlásit se na turnaj
                  </button>
                )
              ) : (
                <span className="text-sm text-gray-400 italic">
                  Uzávěrka přihlášek proběhla
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Přihlášení závodníci */}
      <div className="bg-customWhite rounded-2xl shadow-md p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Users size={18} className="text-customGreen" />
          <h2 className="font-semibold text-gray-700">
            Přihlášení závodníci
            <span className="text-gray-400 font-normal text-sm ml-2">
              ({registrations.length})
            </span>
          </h2>
        </div>

        {registrations.length === 0 ? (
          <p className="text-gray-400 italic text-sm">
            Zatím žádní přihlášení závodníci
          </p>
        ) : (
          <div className="divide-y divide-gray-50">
            {registrations.map((reg, i) => (
              <div
                key={reg.id}
                onClick={() => navigate(`/zavodnik/${reg.fighter_id}`)}
                className="flex items-center gap-3 py-3 cursor-pointer"
              >
                <span className="w-6 text-xs text-gray-400 text-center">
                  {i + 1}.
                </span>
                {reg.fighter_pfp ? (
                  <img
                    className="w-9 h-9 rounded-full object-cover"
                    src={reg.fighter_pfp}
                    alt={reg.fighter_name}
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-sm font-bold flex-shrink-0">
                    {reg.fighter_name?.charAt(0)}
                    {reg.fighter_surname?.charAt(0)}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {reg.fighter_name} {reg.fighter_surname}
                  </p>
                  {reg.fighter_weight && (
                    <p className="text-xs text-gray-400">
                      {reg.fighter_weight} kg
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TurnajDetail;
