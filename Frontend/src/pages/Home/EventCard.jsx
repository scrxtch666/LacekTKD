import React, { useState, useEffect } from "react";

const API = "http://localhost:3000";

function EventCard() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // Seskup aktuality podle roku
  const groups = news.reduce((acc, event) => {
    // date_start_raw je ve formátu YYYY-MM-DD HH:MM:SS
    const d = new Date(event.date_start_raw);
    const year = `${d.toLocaleString("cs-CZ", { month: "long" })} ${d.getFullYear()}`;

    if (!acc[year]) acc[year] = [];
    acc[year].push(event);
    return acc;
  }, {});

  // Seřaď roky od nejnovějšího
  const sortedGroups = Object.entries(groups).sort(([a], [b]) => b - a);

  return (
    <div className="space-y-8">
      {sortedGroups.map(([year, events]) => (
        <div key={year}>
          {/* Header roku */}
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

          {/* Mřížka aktualit */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((event) => (
              <div
                key={event.id}
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
