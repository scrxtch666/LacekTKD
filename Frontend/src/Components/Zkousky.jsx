import React from 'react';

function Zkousky() {
  return (
    <div className="p-4 flex flex-col gap-5">
      <div className="flex justify-between max-h-64 gap-6">
        <div className="bg-customWhite w-full h-64 p-2 rounded-lg">
        <p class="font-extrabold text-lg">Pásky</p>
          <div className="flex justify-between">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <img src="../src/assets/Belts/blt_yellow.gif" alt="Yellow belt" />
                <p className="flex-1 text-center">Chon-Ji</p>
              </div>
              <div className="flex items-center gap-4">
                <img src="../src/assets/Belts/blt_green.gif" alt="Green belt" />
                <p className="flex-1 text-center">Dan-Gun</p>
              </div>
              <div className="flex items-center gap-4">
                <img src="../src/assets/Belts/blt_blue.gif" alt="Blue belt" />
                <p className="flex-1 text-center">Do-San</p>
              </div>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <img src="../src/assets/Belts/blt_red.gif" alt="Red belt" />
                <p className="flex-1 text-center">Won-Hyo</p>
              </div>
              <div className="flex items-center gap-4">
                <img src="../src/assets/Belts/blt_black_1.gif" alt="Black belt 1" />
                <p className="flex-1 text-center">Choong-Moo</p>
              </div>
              <div className="flex items-center gap-4">
                <img src="../src/assets/Belts/blt_black_2.gif" alt="Black belt 2" />
                <p className="flex-1 text-center">Kwang-Gae</p>
              </div>
            </div>
          </div>
        </div>

        
        <div className="bg-customWhite w-full h-64 p-2 rounded-lg">
        <p class="font-extrabold text-lg">Ceník</p>
          <div className="flex justify-between">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <img src="../src/assets/Belts/blt_yellow.gif" alt="Yellow belt" />
                <p className="flex-1 text-center">Chon-Ji</p>
              </div>
              <div className="flex items-center gap-4">
                <img src="../src/assets/Belts/blt_green.gif" alt="Green belt" />
                <p className="flex-1 text-center">Dan-Gun</p>
              </div>
              <div className="flex items-center gap-4">
                <img src="../src/assets/Belts/blt_blue.gif" alt="Blue belt" />
                <p className="flex-1 text-center">Do-San</p>
              </div>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <img src="../src/assets/Belts/blt_red.gif" alt="Red belt" />
                <p className="flex-1 text-center">Won-Hyo</p>
              </div>
              <div className="flex items-center gap-4">
                <img src="../src/assets/Belts/blt_black_1.gif" alt="Black belt 1" />
                <p className="flex-1 text-center">Choong-Moo</p>
              </div>
              <div className="flex items-center gap-4">
                <img src="../src/assets/Belts/blt_black_2.gif" alt="Black belt 2" />
                <p className="flex-1 text-center">Kwang-Gae</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className=" flex flex-col gap-5">
      <div className="flex justify-between max-h-64 gap-6">
      <div className="bg-customWhite w-full p-2 rounded-lg">
        <iframe 
          width="560" 
          height="315" 
          src="https://www.youtube.com/embed/OIjMWGM5wkQ?list=PL_IlyM5-dT-kCGRfq3EItDJSmbg6S7dtX" 
          title="YouTube video player" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
          className="mx-auto max-h-64 w-full"
        ></iframe>
      </div>

      <div className="bg-customWhite w-full p-2 rounded-lg">
        <iframe 
          width="560" 
          height="315" 
          src="https://www.youtube.com/embed/OIjMWGM5wkQ?list=PL_IlyM5-dT-kCGRfq3EItDJSmbg6S7dtX" 
          title="YouTube video player" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
          className="mx-auto"
        ></iframe>
      </div>
     
      
    </div>
    </div>
    <div className="bg-customWhite rounded-lg p-2">
        Zkoušky probíhají standartně v Pelhřimově v tělocvičně, kde trénujeme. Pokud při zkoušce neuspějete, získáte mezistupeň pásku na který jste zkoušku absolvovali. Zkouška proběhne 
        <span className="text-customGreen font-bold"> 22. 12. 2024</span>
      </div>
    </div>
    
  );
}

export default Zkousky;