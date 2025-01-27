import React from 'react';

function Zkousky() {
  return (
    <div className="p-4 flex flex-col gap-5">

    <div class="flex justify-between max-h-64">
        <div class="bg-customWhite w-1/3 h-64 p-2 rounded-lg flex justify-evenly align-middle content-center">
        <div><img src="../src/assets/Belts/blt_yellow.gif" alt="" />
        <img src="../src/assets/Belts/blt_green.gif" alt="" />
        <img src="../src/assets/Belts/blt_blue.gif" alt="" /></div>
        <div><img src="../src/assets/Belts/blt_red.gif" alt="" />
        <img src="../src/assets/Belts/blt_black_1.gif" alt="" />
        <img src="../src/assets/Belts/blt_black_2.gif" alt="" /></div>
        
        </div>
        <div class="bg-customWhite w-1/3 max-h-64 p-2">Ceník</div>
    </div>

    <div class=" bg-customWhite w-full">
        VIDEO
    </div>
     
     <div class="bg-customWhite">Zkoušky probíhají standartně v Pelhřimově v tělocvičně, kde trénujeme. Pokud při zkoušce neuspějete, získáte mezistupeň pásku na který jste zkoušku absolvovali. Zkouška proběhne 
        <span class="text-customGreen font-bold"> 22. 12. 2024</span>
        </div>






    </div>
  );
}

export default Zkousky;
