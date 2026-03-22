import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:3000";

function EventCard() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API}/api/events`)
      .then((res) => res.json())
      .then((data) => {
        setNews(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div>Načítám data...</div>;

  
  const periods = [
    ...new Set(
      news.map((event) => {
        const d = new Date(event.date_start_raw);
        return `${d.toLocaleString("cs-CZ", { month: "long" })} ${d.getFullYear()}`;
      }),
    ),
  ].sort((a, b) => b.localeCompare(a));

  // Filtruj podle textu i období
  const filtered = news.filter((event) => {
    const matchesSearch = event.title
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const d = new Date(event.date_start_raw);
    const period = `${d.toLocaleString("cs-CZ", { month: "long" })} ${d.getFullYear()}`;
    const matchesPeriod = selectedPeriod === "" || period === selectedPeriod;

    return matchesSearch && matchesPeriod;
  });

  // Seskup filtrovaná data
  const groups = filtered.reduce((acc, event) => {
    const d = new Date(event.date_start_raw);
    const year = `${d.toLocaleString("cs-CZ", { month: "long" })} ${d.getFullYear()}`;
    if (!acc[year]) acc[year] = [];
    acc[year].push(event);
    return acc;
  }, {});

  const sortedGroups = Object.entries(groups).sort(([a], [b]) => b - a);

  return (
    <div className="space-y-8">
      {/* Searchbar + filtr období */}
      <div className="flex gap-3 flex-col sm:flex-row">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Hledat aktualitu..."
          className="bg-customWhite flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-customGreen focus:border-transparent"
        />
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="bg-customWhite px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-customGreen focus:border-transparent"
        >
          <option value="">Všechna období</option>
          {periods.map((period) => (
            <option key={period} value={period}>
              {period}
            </option>
          ))}
        </select>

        {/* Reset filtrů – zobrazí se jen když je něco vyplněno */}
        {(search || selectedPeriod) && (
          <button
            onClick={() => {
              setSearch("");
              setSelectedPeriod("");
            }}
            className="bg-customWhite px-4 py-2 rounded-lg transition-colors"
          >
            Zrušit filtry
          </button>
        )}
      </div>

      {/* Žádné výsledky */}
      {sortedGroups.length === 0 && (
        <p className="text-gray-400 text-center italic py-8">
          Žádná aktualita neodpovídá zadaným filtrům
        </p>
      )}

      {sortedGroups.map(([year, events]) => (
        <div key={year}>
          <div className="devider flex justify-between mb-4">
            <span>{year}</span>
            <span className="text-customGreen">
              {events.length}{" "}
              {events.length === 1
                ? "aktualita"
                : events.length <= 4
                  ? "aktuality"
                  : "aktualit"}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((event) => (
              <div
                key={event.id}
                onClick={() => navigate(`/aktuality/${event.id}`)}
                className="max-w-sm overflow-hidden bg-pink-50 rounded-2xl shadow-xl"
              >
                <div className="relative">
                  <img
                    src={event.cover_photo}
                    alt={event.title}
                    className="w-full h-52 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent">
                    <div className="px-4 py-3">
                      <h2 className="text-xl font-bold text-white tracking-wide">
                        {event.title}
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-2 bg-customWhite">
                  <span className="text-customGreen text-sm font-medium">
                    {event.date_start}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default EventCard;
