import { useState, useEffect } from "react";
import {
  Calendar,
  MapPin,
  Coins,
  Users,
  CalendarOff,
  Plus,
  X,
} from "lucide-react";
import { getUserRole } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:3000";

function Prihlasky() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [myFighterId, setMyFighterId] = useState(null);
  const userRole = getUserRole();
  const navigate = useNavigate();

  useEffect(() => {
    fetchExams();
    // Načti fighter_id přihlášeného uživatele
    const token = localStorage.getItem("token");
    if (token && userRole === "user") {
      fetch(`${API}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.fighter_id) setMyFighterId(data.fighter_id);
        })
        .catch(() => {});
    }
  }, []);

  const fetchExams = () => {
    fetch(`${API}/api/exams`)
      .then((res) => res.json())
      .then((data) => {
        setExams(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleRegister = async (examId) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API}/api/exams/${examId}/register`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (res.ok) fetchExams();
    else alert(data.error || "Nepodařilo se přihlásit");
  };

  const handleUnregister = async (examId) => {
    if (!confirm("Odhlásit se ze zkoušek?")) return;
    const token = localStorage.getItem("token");
    const res = await fetch(`${API}/api/exams/${examId}/register`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) fetchExams();
  };

  const formatDate = (d) => (d ? new Date(d).toLocaleDateString("cs-CZ") : "—");

  if (loading)
    return (
      <div className="text-center py-10 text-gray-400">Načítám zkoušky...</div>
    );

  if (!exams.length)
    return (
      <div className="text-center py-16 space-y-2">
       
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="devider">Informace ke zkouškám</div>

      {exams.map((exam) => {
        const canRegister = exam.registrable_date
          ? new Date() <= new Date(exam.registrable_date + "T23:59:59")
          : true;

        // Zkontroluj zda je přihlášen – porovnej myFighterId se seznamem registrací
        const isRegistered = myFighterId
          ? exam.registrations?.some((r) => r.fighter_id === myFighterId)
          : false;

        return (
          <div
            key={exam.id}
            className="bg-customWhite rounded-2xl shadow-md overflow-hidden"
          >
            <div className="p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <h2 className="text-xl font-bold text-gray-800">
                    {exam.title}
                  </h2>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                    {exam.date && (
                      <span className="flex items-center gap-1">
                        <Calendar size={15} className="text-customGreen" />{" "}
                        {formatDate(exam.date)}
                      </span>
                    )}
                    {exam.location && (
                      <span className="flex items-center gap-1">
                        <MapPin size={15} className="text-customGreen" />{" "}
                        {exam.location}
                      </span>
                    )}
                    {exam.price && (
                      <span className="flex items-center gap-1">
                        <Coins size={15} className="text-customGreen" />{" "}
                        {exam.price} Kč
                      </span>
                    )}
                  </div>
                  {exam.registrable_date && (
                    <p
                      className={`text-sm flex items-center gap-1 ${canRegister ? "text-orange-600" : "text-gray-400"}`}
                    >
                      <CalendarOff size={14} />
                      {canRegister
                        ? `Uzávěrka přihlášek: ${formatDate(exam.registrable_date)}`
                        : `Přihlášky uzavřeny (${formatDate(exam.registrable_date)})`}
                    </p>
                  )}
                  {exam.description && (
                    <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                      {exam.description}
                    </p>
                  )}
                </div>

                {/* Tlačítko přihlášení – pouze pro role user */}
                {userRole === "user" && (
                  <div className="flex-shrink-0">
                    {!canRegister ? (
                      <span className="text-sm text-gray-400 italic px-3 py-2 border border-gray-200 rounded-lg bg-gray-50">
                        Přihlášky uzavřeny
                      </span>
                    ) : isRegistered ? (
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1.5 px-3 py-2 bg-green-50 text-green-700 border border-green-300 rounded-lg text-sm font-medium">
                          ✓ Přihlášen
                        </span>
                        <button
                          onClick={() => handleUnregister(exam.id)}
                          className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-300 rounded-lg text-sm transition-colors"
                        >
                          Odhlásit se
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleRegister(exam.id)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-customGreen hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
                      >
                        <Plus size={16} /> Přihlásit se
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Přihlášení závodníci */}
              <div className="border-t border-gray-100 pt-4">
                <button
                  onClick={() =>
                    setExpanded(expanded === exam.id ? null : exam.id)
                  }
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-customGreen transition-colors"
                >
                  <Users size={15} />
                  Přihlášení závodníci ({exam.registrations?.length || 0})
                  {expanded === exam.id ? " ▲" : " ▼"}
                </button>

                {expanded === exam.id && (
                  <div className="mt-3 space-y-1">
                    {!exam.registrations?.length ? (
                      <p className="text-sm text-gray-400 italic">
                        Zatím nikdo není přihlášen
                      </p>
                    ) : (
                      exam.registrations.map((reg) => (
                        <div
                          key={reg.reg_id}
                          onClick={() =>
                            navigate(`/zavodnik/${reg.fighter_id}`)
                          }
                          className="flex items-center cursor-pointer gap-3 py-2 border-b border-gray-50 last:border-0"
                        >
                            {reg.fighter_pfp ? (
                              <img
                                src={reg.fighter_pfp}
                                alt={reg.fighter_name}
                                className="w-9 h-9 rounded-full object-cover border-2 border-gray-200"
                              />
                            ) : (
                          <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-xs font-bold">
                            {reg.fighter_name?.charAt(0)}
                            {reg.fighter_surname?.charAt(0)}
                          </div>
                           )}
                          <div>
                            <p className="text-sm font-medium text-gray-800">
                              {reg.fighter_name} {reg.fighter_surname}
                            </p>
                            <p className="text-xs text-gray-400">{reg.cup}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Prihlasky;
