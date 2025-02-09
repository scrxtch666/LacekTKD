import React from "react";
import MainContact from "../pages/Kontakty/MainContact";
import Location from "../pages/Kontakty/Location";
import TimeTable from "../pages/Kontakty/TimeTable";
import Map from "../pages/Kontakty/Map";

function Contact() {
  return (
    <div className=" flex gap-5 flex-col">
      <div class="bg-customWhite rounded-lg p-2 font-bold">NAŠI TRENÉŘI</div>
      <div class="flex justify-between gap-5">
        <MainContact />
        <MainContact />
        <MainContact />
      </div>
      <Location />
      <div class="flex gap-5">
        <TimeTable />
        <Map />
      </div>
    </div>
  );
}

export default Contact;
