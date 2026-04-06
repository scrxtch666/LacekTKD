import React from "react";
import Pasky from "../pages/Zkousky/Pasky";
import Cenik from "../pages/Zkousky/Cenik";
import Video from "../pages/Zkousky/Video";
import SestavyInfo from "../pages/Zkousky/SestavyInfo";
import Prihlasky from "../pages/Zkousky/Prihlasky";

function Zkousky() {
  return (
    <>
      <div class="devider">ZKOUŠKY</div>

      <div className="grid gap-5 lg:grid-cols-2 md:grid-cols-1">
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

      <Prihlasky />
    </>
  );
}

export default Zkousky;
