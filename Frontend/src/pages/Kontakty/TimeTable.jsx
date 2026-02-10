import React from "react";
import Navigovat from "./Navigovat";
import Otevreno from "./Otevreno";

function TimeTable() {
  return (
    <div class="bg-customWhite rounded-lg flex w-1/3 p-4 flex-col justify-evenly ">
      <span class="font-bold text-2xl">Informace k tréninkům</span>

      <div className="flex justify-between items-center">
        <span className="font-bold text-xl">Tréninky</span>
        <Otevreno />
      </div>

      <div className="flex justify-between items-center">
        <span>Pondělí - Středa</span>
        <span class="text-xs font-medium">začátečníci</span>
        <span>16:00 - 18:00</span>
      </div>

      <div className="flex justify-between items-center">
        <span>Pondělí - Středa</span>
        <span class="text-xs font-medium">pokročilí</span>
        <span>18:00 - 20:00</span>
      </div>

      <div className="flex flex-col gap-2">
        <span class="font-bold text-xl flex">Adresa</span>
        <span>SK TAEKWONDO LACEK z.s. </span>
        <p>Tř. Legií 1115 </p>
        <p>393 01 PELHŘIMOV</p>
        <Navigovat />
      </div>
    </div>
  );
}

export default TimeTable;
