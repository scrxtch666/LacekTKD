import React, { useState, useEffect } from "react";

const EventCardLatest = () => {
  const [news, setNews] = useState([]); // Stav pro uchování dat turnajů
  const [loading, setLoading] = useState(true); // Stav pro zobrazení načítání dat

  // Funkce pro načítání dat o turnajích
  useEffect(() => {
    // Načítání dat z backendu
    fetch("http://localhost:3000/api/events/latest")
      .then((response) => response.json())
      .then((data) => {
        setNews(Array.isArray(data) ? data : []); // Nastavení získaných dat do stavu
        setLoading(false);
      })
      .catch((error) => {
        console.error("Chyba při načítání dat:", error);
        setNews([]); // Při chybě zajistíme, že events zůstane polem
        setLoading(false); // I když dojde k chybě, stav načítání bude false
      });
  }, []);

  if (loading) {
    return <div>Načítám data...</div>; // Zobrazení textu při načítání
  }

  // Ošetření prázdného stavu - pokud pole zůstalo prázdné
  if (news.length === 0) {
    return (
      <div className="card w-full p-10 text-center border-2 border-dashed">
        <p className="text-gray-500">
          Momentálně nejsou naplánovány žádné akce.
        </p>
      </div>
    );
  }

  return (
    <>
      {news.map((event) => (
        <div className="max-w-sm overflow-hidden bg-pink-50 rounded-2xl shadow-xl">
          <div className="relative">
            <img
              src={event.photo}
              alt="Sports competition"
              className="w-full h-52 object-cover"
            />

            {/* Event Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent">
              <div className="px-4 py-3">
                {/*  <h2 className="text-xl font-bold text-white tracking-wide">
              {event.title}
            </h2>
            */}
              </div>
            </div>
          </div>

          {/* Date Container */}
          <div className="px-4 py-2 bg-customWhite">
            <div className="">
              <span className="text-customGreen text-sm font-medium flex justify-between gap-5">
                <p className="text-customBlack">{event.title}</p>
                <p>{event.date_start}</p>
              </span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default EventCardLatest;
