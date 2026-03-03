import React from "react";
import EventCard from "../pages/Home/EventCard";
import Setting from "../pages/Aktuality/Setting";

function Aktuality() {
  return (
 <>
      <div class="devider">AKTUALITY</div>

      <Setting />

      

      <div class="grid grid-cols-1 gap-5">
        <EventCard />
      </div>
      </>
  
  );
}

export default Aktuality;
