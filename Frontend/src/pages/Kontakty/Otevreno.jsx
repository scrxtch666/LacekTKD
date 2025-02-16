import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

function Otevreno() {
  // TODO: podmínka na pondělí - středa
  const openingHour = 16;
  const closingHour = 20;
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkOpeningHours = () => {
      const now = new Date();
      const currentHour = now.getHours();
      setIsOpen(currentHour >= openingHour && currentHour < closingHour);
    };

    checkOpeningHours();
    const interval = setInterval(checkOpeningHours, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <button
      type="button"
      className="relative flex items-center justify-center bg-customWhite rounded-lg text-sm text-center dark:bg-customWhite space-x-6 w-200px"
    >
      <Link
        to="/"
        className="w-full hidden xl:flex items-center justify-center"
      >
        <div className="absolute top-1/2 left-5 transform -translate-x-1/2 -translate-y-1/2 flex h-2 w-2 items-center justify-center">
          {isOpen ? (
            <>
              <div className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-customGreen opacity-75"></div>
              <div className="relative inline-flex rounded-full h-2 w-2 bg-customGreen"></div>
            </>
          ) : (
            <div className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></div>
          )}
        </div>
        <div
          className={`flex justify-center align-middle text-xs w-32 h-8 items-center font-semibold ${
            isOpen ? "text-customGreen" : "text-red-500"
          }`}
        >
          {isOpen ? "Trénujeme" : "Odpočíváme"}
        </div>
      </Link>
    </button>
  );
}

export default Otevreno;
