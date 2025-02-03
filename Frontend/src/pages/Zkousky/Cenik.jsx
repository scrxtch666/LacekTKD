import { Link } from "react-router-dom";
import React from "react";
function Cenik() {
  return (
    <>
 <div className="bg-customWhite w-full h-64 p-2 rounded-lg">
          <p class="font-extrabold text-lg">Ceník</p>
          <div className="flex justify-between">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <img
                  src="../src/assets/Belts/blt_yellow.gif"
                  alt="Yellow belt"
                />
                <p>- 8th CUP -</p>
                <p className="flex-1 text-center font-bold">250 Kč</p>
              </div>
              <div className="flex items-center gap-4">
                <img src="../src/assets/Belts/blt_green.gif" alt="Green belt" />
                <p>- 6th CUP -</p>
                <p className="flex-1 text-center font-bold">350 Kč</p>
              </div>
              <div className="flex items-center gap-4">
                <img src="../src/assets/Belts/blt_blue.gif" alt="Blue belt" />
                <p>- 4th CUP -</p>
                <p className="flex-1 text-center font-bold">450 Kč</p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <img src="../src/assets/Belts/blt_red.gif" alt="Red belt" />
                <p>- 2th CUP -</p>
                <p className="flex-1 text-center font-bold">550 Kč</p>
              </div>
              <div className="flex items-center gap-4">
                <img
                  src="../src/assets/Belts/blt_black_1.gif"
                  alt="Black belt 1"
                />
                <p>- 1th DAN -</p>
                <p className="flex-1 text-center font-bold">1000 Kč + 70 USD</p>
              </div>
              <div className="flex items-center gap-4">
                <img
                  src="../src/assets/Belts/blt_black_2.gif"
                  alt="Black belt 2"
                />
                <p>- 2th DAN -</p>
                <p className="flex-1 text-center font-bold">2000 Kč + 70 USD</p>
              </div>
            </div>
          </div>
          <span>
            Dále se platí poplatek za komisaře - 100 Kč, oddílové poplatky - 4
            000 Kč/rok, roční svazová známka - 300 Kč. Případně si můžete za 150
            Kč zakoupit svazovou knížečku.
          </span>
        </div>
    </>
  );
}

export default Cenik;
