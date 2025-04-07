import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
function Cenik() {
  const [belts, setBelts] = useState([]); // Stav pro uchování dat turnajů
  const [loading, setLoading] = useState(true); // Stav pro zobrazení načítání dat

  // Funkce pro načítání dat o turnajích
  useEffect(() => {
    // Načítání dat z backendu
    fetch("http://localhost:3000/api/belts")
      .then((response) => response.json())
      .then((data) => {
        setBelts(data); // Nastavení získaných dat do stavu
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
    <div className="card w-full overflow-y-hidden">
    <span class="font-extrabold text-lg">Ceník</span>
  <div className="grid grid-cols-2">

  
      {belts.map((belt) => (
        <div className="flex items-center gap-5">
          <img src={belt.img_path} alt={belt.czech_name} />
          <p>- {belt.cup} -</p>

          <p className="font-bold">{belt.price} Kč</p>
        </div>
      ))}
      </div>
      </div>
    </>
  );
}

export default Cenik;
