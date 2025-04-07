import React, { useState, useEffect } from "react";

function ActualEvent() {
  const [events, setEvents] = useState([]); // Stav pro uchování dat turnajů
  const [loading, setLoading] = useState(true); // Stav pro zobrazení načítání dat

  // Funkce pro načítání dat o turnajích
  useEffect(() => {
    // Načítání dat z backendu
    fetch("http://localhost:3000/api/events/latest")
      .then((response) => response.json())
      .then((data) => {
        setEvents(data); // Nastavení získaných dat do stavu
        setLoading(false); // Nastavení stavu načítání na false
      })
      .catch((error) => {
        console.error("Chyba při načítání dat:", error);
        setLoading(false); // I když dojde k chybě, stav načítání bude false
      });
  }, []);

  if (loading) {
    return <div>Načítám data...</div>; // Zobrazení textu při načítání
  }

  return (
    <>
      {events.map((event) => (
        <div
          key={event.name}
          className="relative w-full h-64 rounded-lg group overflow-hidden bg-alertRed"
        >
          <div className="card">
            <div className="h-full flex gap-2">
              <div className="flex max-w-52 w-full object-cover object-center items-center">
                <img
                  src="../src/assets/Events/BT_open.jpg"
                  alt={event.name}
                  className="object-cover object-center rounded-md"
                />
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-extrabold text-xl">{event.name}</span>

                <p className="flex gap-1 items-center">
                  <img
                    src="../src/assets/Icons/Location.png"
                    alt=""
                    className="h-5"
                  />
                  <span className="text-customGreen font-bold">Lokace:</span>
                  {event.location}
                </p>
                <p className="flex gap-1 items-center">
                  <img
                    src="../src/assets/Icons/Price.png"
                    alt=""
                    className="h-5"
                  />
                  <span className="text-customGreen font-bold">
                    Startovné:{" "}
                  </span>
                  {event.price}€
                </p>
                <p className="flex gap-1 items-center">
                  <img
                    src="../src/assets/Icons/Type.png"
                    alt=""
                    className="h-5"
                  />
                  <span className="text-customGreen font-bold">Typ akce: </span>
                  {event.type}
                </p>
                <p className="flex gap-1 items-center">
                  <img
                    src="../src/assets/Icons/Date.png"
                    alt=""
                    className="h-5"
                  />
                  <span className="text-customGreen font-bold">Datum: </span>
                  {event.date_start} - {event.date_end}
                </p>
                <br />
                <p className="flex gap-1 items-center">
                  <img
                    src="../src/assets/Icons/Info.png"
                    alt=""
                    className="h-5"
                  />
                  <span className="text-customGreen font-bold">
                    Informace:{" "}
                  </span>
                  {event.info}
                </p>
              </div>
            </div>
          </div>

          {/* Overlay který se zobrazí při najetí myší */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 rounded-lg flex items-center justify-center">
            <span className="text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              ZOBRAZIT DETAILY
            </span>
          </div>
        </div>
      ))}
    </>
  );
}

export default ActualEvent;
