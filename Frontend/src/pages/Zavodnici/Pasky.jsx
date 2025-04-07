import React, { useState, useEffect } from "react";
function Pasky() {
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
      <div class="devider">
        {belts.map((belt) => (
          <img src={belt.img_path} alt={belt.czech_name} className="w-9" />
        ))}
      </div>
    
  );
}

export default Pasky;
