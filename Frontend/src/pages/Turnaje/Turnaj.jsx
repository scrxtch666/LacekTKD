import React, { useState, useEffect } from "react";

function Turnaj() {
  const [events, setEvents] = useState([]); // Stav pro uchování dat turnajů
  const [loading, setLoading] = useState(true); // Stav pro zobrazení načítání dat

  // Funkce pro načítání dat o turnajích
  useEffect(() => {
    // Načítání dat z backendu
    fetch("http://localhost:3000/api/tournaments/")
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
        <div className="card w-full flex items-center overflow-hidden h-64">
          <div className=" flex gap-2 h-full w-full">
            <div className="flex max-w-52 object-cover object-center items-center h-full">
              <img
                src="../src/assets/Events/BT_open.jpg"
                alt={event.name}
                className="object-cover object-center rounded-md h-full hidden lg:flex"
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
                <span className="text-customGreen font-bold">Startovné: </span>
                {event.price}€
              </p>
              <p className="flex gap-1 items-center">
                <img
                  src="../src/assets/Icons/Type.png"
                  alt=""
                  className="h-5"
                />
                <span className="text-customGreen font-bold">Typ akce: </span>
                {event.type_name}
              </p>
              <p className="flex gap-1 items-center">
                <img
                  src="../src/assets/Icons/Date.png"
                  alt=""
                  className="h-5"
                />
                <span className="text-customGreen font-bold">Datum: </span>
                {event.start_date_formatted} - {event.end_date_formatted}
              </p>
              <br />
              <p className="flex gap-1 items-center">
                <img
                  src="../src/assets/Icons/Info.png"
                  alt=""
                  className="h-5"
                />
                <span className="text-customGreen font-bold">Informace: </span>
                {event.info}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default Turnaj;
