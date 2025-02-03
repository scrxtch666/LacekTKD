import React from "react";
import Info from "../pages/Zkousky/Info";
import Pasky from "../pages/Zkousky/Pasky";
import Cenik from "../pages/Zkousky/Cenik";
import Video from "../pages/Zkousky/Video";

function Zkousky() {
  return (
    <div className="p-4 flex flex-col gap-5">
      <div className="flex justify-between max-h-64 gap-6">
        <Pasky />
        <Cenik />
      </div>

      <div className=" flex flex-col gap-5">
        <div className="flex justify-between max-h-64 gap-6">
         <Video />

          <Video />
        </div>
      </div>

      <Info />
    </div>
  );
}

export default Zkousky;
