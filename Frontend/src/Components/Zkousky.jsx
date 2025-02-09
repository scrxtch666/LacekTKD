import React from "react";
import Info from "../pages/Zkousky/Info";
import Pasky from "../pages/Zkousky/Pasky";
import Cenik from "../pages/Zkousky/Cenik";
import Video from "../pages/Zkousky/Video";
import SestavyInfo from "../pages/Zkousky/SestavyInfo";

function Zkousky() {
  return (
    <div className="flex flex-col gap-5">
      <div class="bg-customWhite rounded-lg p-2 font-bold">ZKOUŠKY</div>
      <div className="flex justify-between max-h-64 gap-6">
        <Pasky />
        <Cenik />
      </div>
      <Info />
      <div className=" flex flex-col gap-5">
        <div className="flex justify-between max-h-64 gap-6">
          <Video />
          <SestavyInfo />
        </div>
      </div>
    </div>
  );
}

export default Zkousky;
