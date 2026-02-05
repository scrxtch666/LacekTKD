import { Link } from "react-router-dom";
import React from "react";

function Nabor() {
  return (
    <>
      <button
        type="button"
        className="relative flex items-center justify-evenly text-customGreen bg-customWhite rounded-lg text-sm text-center dark:bg-customWhite space-x-6 w-200px border border-customGreen"
      >
        {/* Tlačítko bude skryté na menších obrazovkách (do 1024px) a viditelné na větších */}
        <Link to="/" className="w-full hidden xl:flex items-center justify-between">
       
          <div className="absolute top-1/2 left-5 transform -translate-x-1/2 -translate-y-1/2 flex h-4 w-4 items-center justify-center">
            <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-customGreen opacity-75"></div>
            <div className="relative inline-flex rounded-full h-3 w-3 bg-customGreen"></div>
          </div>

          <div className="flex justify-center align-middle text-xs w-40 h-8 items-center font-semibold">
            NÁBOR OTEVŘEN
          </div>
          
        </Link>
      </button>
    </>
  );
}

export default Nabor;
