import React from "react";

function TimeTable() {
  return (
    <div class="bg-customWhite rounded-lg flex w-1/3 p-4 flex-col justify-evenly ">
      <div>
        <span class="font-bold text-xl flex">Adresa</span>
        <span>SK TAEKWONDO LACEK z.s.	</span>
<p>Tř. Legií 1115	</p>
<p>393 01  PELHŘIMOV</p>
      </div>

      <div>
        <span class="font-bold text-xl flex">Tréninky - začátečníci</span>

        <div class="flex justify-between">
          <span>Pondělí - Středa</span>
          <span>16:00 - 18:00</span>
        </div>
      </div>

      <div>
        <span class="font-bold text-xl">Tréninky - pokročilí</span>
        <div class="flex justify-between">
          <span>Pondělí - Středa</span>
          <span>18:00 - 20:00</span>
        </div>
      </div>
    </div>
  );
}

export default TimeTable;
