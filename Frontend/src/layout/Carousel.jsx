import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import config from "../../config";

const API = config.API_URL;

function SponsorCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Načítání dat z backendu
    fetch(`${API}/api/sponsors`)
      .then((response) => response.json())
      .then((data) => {
        setSponsors(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Chyba při načítání dat:", error);
        setLoading(false);
      });
  }, []);

  // Funkce pro posun přehlídky
  const moveCarousel = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % sponsors.length);
  };

  useEffect(() => {
    if (sponsors.length > 0) {
      intervalRef.current = setInterval(moveCarousel, 3000);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [sponsors]);

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
    return <div>Načítám data...</div>;
  }

  if (sponsors.length === 0) {
    return null;
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
                  <Link to={sponsor.url} target="_blank">
                    <img
                      src={`${API}${sponsor.img_path}`}
                      alt={`Logo ${sponsor.sponsor_name}`}
                      className="h-16 object-contain mx-auto"
                    />
                  </Link>
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
