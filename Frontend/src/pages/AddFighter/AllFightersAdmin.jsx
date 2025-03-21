import React, { useState, useEffect } from "react";
function AllFightersAdmin() {
  const [fighters, setFighters] = useState([]); // Stav pro uchování dat turnajů
  const [loading, setLoading] = useState(true); // Stav pro zobrazení načítání dat

  // Funkce pro načítání dat o turnajích
  useEffect(() => {
    // Načítání dat z backendu
    fetch("http://localhost:3000/fighters")
      .then((response) => response.json())
      .then((data) => {
        setFighters(data); // Nastavení získaných dat do stavu
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
      {fighters.map((fighter) => (
        <div class="w-full h-16 bg-customWhite text-customBlack rounded-md p-2 flex flex-row justify-between items-center">
          <img
            src={fighter.profile_pic_path}
            alt="test"
            class="rounded-full size-10"
          />

          <span class="font-semibold">
            {fighter.first_name} {fighter.last_name}
          </span>

          <span class="font-semibold">19</span>
          <span class="font-semibold">72</span>
          <span class="font-semibold">{fighter.belt}</span>
          <span class="font-semibold">1</span>
          <span class="font-semibold">0</span>
          <span class="font-semibold">ANO</span>
        </div>
      ))}
    </>
  );
}

export default AllFightersAdmin;
