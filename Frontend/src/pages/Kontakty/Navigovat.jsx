import { Link } from "react-router-dom";
import React from "react";

const navigateToGoogleMaps = () => {
  const lat = 49.4278672; // Souřadnice z vašeho obrázku
  const lon = 15.2179083;

  // api=1 aktivuje Google Maps URL rozhraní
  // destination nastaví cíl (v tomto případě souřadnice)
  // travelmode=driving (volitelné, můžete nastavit walking, bicycling, transit)
  const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}&travelmode=driving`;

  window.open(url, "_blank");
};

function Navigovat() {
  return (
    <>
      <div className="md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        <button
          onClick={navigateToGoogleMaps}
          type="button"
          className="text-customGreen bg-customGreen font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-customGreen flex items-center space-x-1 border border-customGreen w-full justify-center"
        >
          <div className="relative inline-flex rounded-full h-5 w-5 bg-customGreen items-center">
            <img
              className="px-0.6 py-0.6 h-4"
              src="../src/assets/Icons/navigate.png"
              alt="Login"
            />
          </div>
          <span class="text-customWhite">Navigovat</span>
        </button>
      </div>
    </>
  );
}

export default Navigovat;
