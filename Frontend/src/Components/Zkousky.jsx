import React from "react";
import Info from "../pages/Zkousky/Info";
import Pasky from "../pages/Zkousky/Pasky";
import Cenik from "../pages/Zkousky/Cenik";
import Video from "../pages/Zkousky/Video";
import SestavyInfo from "../pages/Zkousky/SestavyInfo";

function Zkousky() {
  return (
    <>
      <div class="devider">ZKOUŠKY</div>

      {/* Sekce ve které je to obalené */}
      <div className="flex justify-between max-h-96 h-full gap-5">
        <Pasky />
        <Cenik />
      </div>

      <div className="devider">sestavy</div>
      <div className=" flex flex-col gap-5">
        <div className="flex justify-between max-h-64 gap-6">
          <Video />
          <SestavyInfo />
        </div>
      </div>

      <div className="devider">informace ke zkouškám</div>
      <Info />
    </>
  );
}

export default Zkousky;
