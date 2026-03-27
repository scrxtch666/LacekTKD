import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, Calendar, Users, Info } from "lucide-react";

const API = "http://localhost:3000";

function FighterDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fighter, setFighter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/fighters/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFighter(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const formatDate = (dateStr) =>
    dateStr ? new Date(dateStr).toLocaleDateString("cs-CZ") : "—";

  if (loading)
    return (
      <div className="flex items-center justify-center h-64 text-gray-400">
        Načítám...
      </div>
    );

  if (!fighter)
    return (
      <div className="flex items-center justify-center h-64 text-gray-400">
        Závodník nebyl nalezen!
      </div>
    );

  return (
    <div className="max-w-4xl space-y-6">
      {/* Zpět */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-customGreen transition-colors"
      >
        <ArrowLeft size={16} /> Zpět na závodníky
      </button>

      {/* Hlavní karta */}
      <div className="bg-customWhite rounded-2xl shadow-md overflow-hidden p-6 flex gap-6">
        {/* Obrázek */}
        <img
          src={fighter.img_path}
          alt={fighter.name}
          className="w-40 h-40 object-cover rounded-xl"
        />

        {/* Info */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              {fighter.name} {fighter.surname}
            </h1>

            <p className="text-gray-500">Věk: {fighter.age} let</p>

            <p className="text-gray-500">
              Váhová kategorie: {fighter.actual_weight_category}
            </p>

            <p className="text-gray-500">
              Stav: {fighter.active ? "Aktivní" : "Neaktivní"}
            </p>
          </div>

          {/* Pás */}
          <div className="flex items-center gap-3 mt-3">
            <img src={fighter.belt_path} alt="belt" className="w-10 h-10" />
            <span>{fighter.cup}</span>
          </div>
        </div>
      </div>

      {/* Výsledky */}
      <div className="bg-customWhite rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Users size={18} /> Poslední výsledky
        </h2>

        {fighter.tournament_results?.length ? (
          <div className="space-y-3">
            {fighter.tournament_results.map((r, i) => (
              <div
                key={i}
                className="flex justify-between border-b pb-2 text-sm"
              >
                <div>
                  <p className="font-medium">{r.tournament}</p>
                  <p className="text-gray-400 flex items-center gap-1">
                    <Calendar size={14} /> {r.date}
                  </p>
                </div>

                <div className="font-semibold">{r.place}. místo</div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">Žádné výsledky</p>
        )}
      </div>
    </div>
  );
}

export default FighterDetail;
