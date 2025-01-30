import React from "react";

function Event() {
  return (
    <div className="relative w-full h-64 rounded-lg group">
      <div className="bg-customWhite w-full h-full p-2 rounded-lg">
        <div className="h-full flex gap-2">
          <div className="flex max-w-52 w-full object-cover object-center">
            <img
              src="../src/assets/Events/BT_open2.jpg"
              alt=""
              className="object-cover object-center rounded-md"
            />
          </div>

          <div className="bg-customWhite flex flex-col gap-2">
            <span className="font-extrabold text-xl">BRATISLAVA OPEN</span>

            <p className="flex gap-1">
              <img src="../src/assets/Icons/Location.png" alt="" className="h-5" />
              <span className="text-customGreen font-bold">Lokace:</span>
              Bratislava; Slovensko
            </p>
            <p className="flex gap-1">
              <img src="../src/assets/Icons/Price.png" alt="" className="h-5" />
              <span className="text-customGreen font-bold">Startovné: </span>50€
            </p>
            <p className="flex gap-1">
              <img src="../src/assets/Icons/Type.png" alt="" className="h-5" />
              <span className="text-customGreen font-bold">Typ akce: </span>Turnaj
            </p>
            <p className="flex gap-1">
              <img src="../src/assets/Icons/Date.png" alt="" className="h-5" />
              <span className="text-customGreen font-bold">Datum: </span>12.07. -
              13.07. 2025
            </p>
            <br />
            <p className="flex gap-1">
              <img src="../src/assets/Icons/Info.png" alt="" className="h-5" />
              <span className="text-customGreen font-bold">Informace: </span>Odjezd
              od bazénu v Pelhřimově v 13:30. Menší děti vybavte podsedákem.
            </p>
          </div>
        </div>
      </div>

      {/* Overlay který se zobrazí při najetí myší */}
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 rounded-lg flex items-center justify-center">
        <span className="text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Zobrazit detaily
        </span>
      </div>
    </div>
  );
}

export default Event;