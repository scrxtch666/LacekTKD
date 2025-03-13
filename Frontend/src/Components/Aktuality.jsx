import React from "react";
import EventCard from "../pages/Home/EventCard";
import Setting from "../pages/Aktuality/Setting";

function Aktuality() {
  return (
 <>
      <div class="devider">AKTUALITY</div>

      <Setting />

      <div className="devider">
        <span>ZÁŘÍ</span>
        <span>
          POČET: <span class="text-customGreen">3</span>
        </span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <EventCard />
      </div>
      </>
  
  );
}

export default Aktuality;
