import { Link } from "react-router-dom";
import React from "react";
function Pasky() {
  return (
    <>
 <div className="bg-customWhite w-full h-64 p-2 rounded-lg">
          <p class="font-extrabold text-lg">Pásky</p>
          <div className="flex justify-between">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <img
                  src="../src/assets/Belts/blt_yellow.gif"
                  alt="Yellow belt"
                />
                <p>- 8th CUP -</p>
                <p className="flex-1 text-center font-bold">Chon-Ji</p>
              </div>
              <div className="flex items-center gap-4">
                <img src="../src/assets/Belts/blt_green.gif" alt="Green belt" />
                <p>- 6th CUP -</p>
                <p className="flex-1 text-center font-bold">Dan-Gun</p>
              </div>
              <div className="flex items-center gap-4">
                <img src="../src/assets/Belts/blt_blue.gif" alt="Blue belt" />
                <p>- 4th CUP -</p>
                <p className="flex-1 text-center font-bold">Do-San</p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <img src="../src/assets/Belts/blt_red.gif" alt="Red belt" />
                <p>- 2th CUP -</p>
                <p className="flex-1 text-center font-bold">Won-Hyo</p>
              </div>
              <div className="flex items-center gap-4">
                <img
                  src="../src/assets/Belts/blt_black_1.gif"
                  alt="Black belt 1"
                />
                <p>- 1th DAN -</p>
                <p className="flex-1 text-center font-bold">Choong-Moo</p>
              </div>
              <div className="flex items-center gap-4">
                <img
                  src="../src/assets/Belts/blt_black_2.gif"
                  alt="Black belt 2"
                />
                <p>- 2th DAN -</p>
                <p className="flex-1 text-center font-bold">Kwang-Gae</p>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}

export default Pasky;
