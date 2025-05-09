import { useState, useEffect, useRef } from "react";

function SponsorCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  const [sponsors, setSponsors] = useState([]); // Stav pro uchování dat sponzorů
  const [loading, setLoading] = useState(true); // Stav pro zobrazení načítání dat

  useEffect(() => {
    // Načítání dat z backendu
    fetch("http://localhost:3000/api/sponsors")
      .then((response) => response.json())
      .then((data) => {
        setSponsors(data); // Nastavení získaných dat do stavu
        setLoading(false); // Nastavení stavu načítání na false
      })
      .catch((error) => {
        console.error("Chyba při načítání dat:", error);
        setLoading(false); // I když dojde k chybě, stav načítání bude false
      });
  }, []);

  // Funkce pro posun přehlídky
  const moveCarousel = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % sponsors.length);
  };

  // Nastavení automatického posouvání - spustí se až po načtení dat
  useEffect(() => {
    // Spouštíme interval pouze pokud máme dostatek sponzorů
    if (sponsors.length > 0) {
      intervalRef.current = setInterval(moveCarousel, 3000);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [sponsors]); // Přidání sponsors jako závislost, aby se interval spustil až po načtení

  // Získání aktuálních log pro zobrazení
  const getVisibleSponsors = () => {
    if (sponsors.length === 0) return [];
    
    const visibleSponsors = [];
    for (let i = 0; i < Math.min(3, sponsors.length); i++) {
      const index = (currentIndex + i) % sponsors.length;
      visibleSponsors.push(sponsors[index]);
    }
    return visibleSponsors;
  };

  if (loading) {
    return <div>Načítám data...</div>; // Zobrazení textu při načítání
  }

  // Nedostatek sponzorů
  if (sponsors.length === 0) {
    return null; // Nezobrazíme nic, pokud nejsou žádní sponzoři
  }

  return (
    <>
      <div className="w-full py-8">
        <div className="container mx-auto">
          <div className="flex justify-center">
            <div className="flex w-full max-w-4xl justify-between">
              {getVisibleSponsors().map((sponsor) => (
                <div
                  key={sponsor.id}
                  className="mx-4 transition-all duration-500 ease-in-out"
                >
                  <img
                    src={sponsor.img_path}
                    alt={`Logo ${sponsor.sponsor_name}`}
                    className="h-16 object-contain mx-auto"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SponsorCarousel;