import React, { useState, useEffect } from "react";
import { MapPin, Euro, Tag, Calendar, Info } from "lucide-react";

const API = "http://localhost:3000";

function Turnaj() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/tournaments/`)
      .then((res) => res.json())
      .then((data) => {
        setEvents(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="text-gray-400 text-center py-10">Načítám turnaje...</div>
    );
  if (events.length === 0)
    return (
      <div className="text-gray-400 text-center py-10">
        Žádné turnaje k zobrazení
      </div>
    );

  return (
    <div className="flex flex-col gap-4">
      {events.map((event) => (
        <div
          key={event.id}
          className="bg-customWhite rounded-2xl shadow-md overflow-hidden flex flex-col sm:flex-row"
        >
          {/* Obrázek */}
          <div className="sm:w-44 sm:flex-shrink-0 h-44 sm:h-auto">
            {event.img_path ? (
              <img
                src={event.img_path}
                alt={event.name}
                className="w-full h-full object-cover object-center"
              />
            ) : (
              <div className="w-full h-full bg-customGreen flex items-center justify-center text-white text-4xl font-bold">
                {event.name?.charAt(0)}
              </div>
            )}
          </div>

          {/* Obsah */}
          <div className="flex flex-col justify-between p-4 flex-1 min-w-0 gap-3">
            {/* Název + typ */}
            <div className="flex items-start justify-between gap-2">
              <h2 className="font-extrabold text-lg leading-tight truncate">
                {event.name}
              </h2>
            </div>

            {/* Info řádky */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-4 text-sm">
              {event.location && (
                <div className="flex items-center gap-2 min-w-0">
                  <MapPin
                    size={15}
                    className="text-customGreen flex-shrink-0"
                  />
                  <span className="truncate">{event.location}</span>
                </div>
              )}
              {event.price !== undefined && event.price !== null && (
                <div className="flex items-center gap-2 min-w-0">
                  <Euro size={15} className="text-customGreen flex-shrink-0" />
                  <span className="truncate">Startovné: {event.price} €</span>
                </div>
              )}
              {(event.start_date_formatted || event.end_date_formatted) && (
                <div className="flex items-center gap-2 min-w-0">
                  <Calendar
                    size={15}
                    className="text-customGreen flex-shrink-0"
                  />
                  <span className="truncate">
                    {event.start_date_formatted} – {event.end_date_formatted}
                  </span>
                </div>
              )}
              {event.type_name && (
                <div className="flex items-center gap-2 min-w-0">
                  <Tag size={15} className="text-customGreen flex-shrink-0" />
                  <span className="truncate">{event.type_name}</span>
                </div>
              )}
            </div>

            {/* Info text */}
            {event.info && (
              <div className="flex items-start gap-2 text-sm text-gray-500 border-t border-gray-100 pt-3 min-w-0">
                <Info
                  size={15}
                  className="text-customGreen flex-shrink-0 mt-0.5"
                />
                <p className="line-clamp-2 min-w-0">{event.info}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Turnaj;
