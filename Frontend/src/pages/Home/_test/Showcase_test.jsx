import React, { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

function ShowcaseTest() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  const [emblaRef] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  useEffect(() => {
    fetch("http://localhost:3000/api/banner")
      .then((response) => response.json())
      .then((data) => {
        setBanners(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Chyba při načítání dat:", error);
        setBanners([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Načítám data...</div>;
  }

  if (!banners.length) {
    return null; // nebo nějaký fallback
  }

  return (
    <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
      <div className="flex">
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="relative min-w-full h-[300px] md:h-[400px] lg:h-96 overflow-hidden bg-customBlack"
          >
            <img
              src={`http://localhost:3000${banner.img_path}`}
              alt={banner.banner_name}
              className="w-full h-full object-cover brightness-50 opacity-75"
            />

            <div className="absolute inset-0 flex items-center">
              <div className="px-4 md:px-8 lg:px-12 text-white">
                <p className="text-xl md:text-2xl lg:text-3xl mb-2 font-sans">
                  Sportovní klub
                </p>

                <p className="text-3xl md:text-4xl lg:text-5xl font-mono">
                  {banner.banner_name}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShowcaseTest;
