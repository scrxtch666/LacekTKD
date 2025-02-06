import React from 'react';
import EventCard from '../pages/Home/EventCard';

function Aktuality() {
  return (
    <div className="p-4">
     <h1 class="font-bold text-2xl">AKTUALITY</h1>
      
      <div class="flex justify-end font-bold mb-2">
       {/* Použití Routes místo Switch 
        <div class="bg-customWhite p-2 px-4 rounded-md border-2 border-customBlack">2025</div>
        */}
        <div class="flex gap-4">
            <div class="bg-customWhite p-2 px-4 rounded-md border-2 border-customBlack">ROK</div>
            <div class="bg-customWhite p-2 px-4 rounded-md border-2 border-customBlack">MĚSÍC</div>
            <div class="bg-customWhite p-2 px-4 rounded-md border-2 border-customBlack"><img src="https://img.icons8.com/?size=100&id=7695&format=png&color=01923e" alt="" class="object-cover object-center max-h-5 justify-center align-middle"/></div>
        </div>
      </div>

      <div class="mb-2 bg-customWhite p-2 px-4 rounded-md border-2 border-customBlack flex justify-between font-bold">
        <span>ZÁŘÍ</span>
        <span>POČET: <span class="text-customGreen">3</span></span>
      </div>

<div class="flex justify-between"><EventCard />
<EventCard />
<EventCard /></div>




    </div>
  );
}

export default Aktuality;
