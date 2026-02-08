import React, { useState, useEffect } from "react";

function CalendarTournament() {
  const [tournaments, setTournaments] = useState([]); // Stav pro uchování dat turnajů
  const [loading, setLoading] = useState(true); // Stav pro zobrazení načítání dat

  // Funkce pro načítání dat o turnajích
  useEffect(() => {
    // Načítání dat z backendu
    fetch("http://localhost:3000/api/tournaments/latest")
      .then((response) => response.json())
      .then((data) => {
        setTournaments(Array.isArray(data) ? data : []); // Nastavení získaných dat do stavu
        setLoading(false); // Nastavení stavu načítání na false
      })
      .catch((error) => {
        console.error("Chyba při načítání dat:", error);
        setTournaments([]); // Při chybě zajistíme, že Tournaments zůstane polem
        setLoading(false); // I když dojde k chybě, stav načítání bude false
      });
  }, []);

  if (loading) {
    return <div>Načítám data...</div>; // Zobrazení textu při načítání
  }

  // Ošetření prázdného stavu - pokud pole zůstalo prázdné
  if (tournaments.length === 0) {
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
      {tournaments.map((tournament) => (
        <div className="card w-full flex items-center overflow-hidden h-64">
          <div className=" flex gap-2 h-full w-full">
            <div className="flex w-44 max-w-44 h-full items-center justify-center overflow-hidden">
  <img
    src={tournament.img_path}
    alt={tournament.name}
    className="object-cover w-full h-full hidden lg:block rounded-md "
  />
</div>
            <div className="flex flex-col gap-2">
              <span className="font-extrabold text-xl uppercase">{tournament.tournament_name}</span>

              <p className="flex gap-1 items-center">
                <img
                  src="../src/assets/Icons/Location.png"
                  alt=""
                  className="h-5"
                />
                <span className="text-customGreen font-bold">Lokace:</span>
                {tournament.location}
              </p>
              <p className="flex gap-1 items-center">
                <img
                  src="../src/assets/Icons/Price.png"
                  alt=""
                  className="h-5"
                />
                <span className="text-customGreen font-bold">Startovné: </span>
                {tournament.price}€
              </p>
              <p className="flex gap-1 items-center">
                <img
                  src="../src/assets/Icons/Type.png"
                  alt=""
                  className="h-5"
                />
                <span className="text-customGreen font-bold">Typ akce: </span>
                {tournament.type_name}
              </p>
              <p className="flex gap-1 items-center">
                <img
                  src="../src/assets/Icons/Date.png"
                  alt=""
                  className="h-5"
                />
                <span className="text-customGreen font-bold">Datum: </span>
                {tournament.start_date} - {tournament.end_date}
              </p>
              <br />
              <p className="flex gap-1 items-center">
                <img
                  src="../src/assets/Icons/Info.png"
                  alt=""
                  className="h-5"
                />
                <span className="text-customGreen font-bold">Informace: </span>
                {tournament.info}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default CalendarTournament;
