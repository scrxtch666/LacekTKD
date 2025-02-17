import { useState } from "react";



function Fighter() {
  const [count, setCount] = useState(0);

  return (
    <>
      
       
      <div class="w-[400px] h-40 bg-customWhite text-customBlack rounded-md p-2 flex flex-row justify-between">
        <div class="w-28 h-full rounded-xl overflow-hidden">
  <img
    src="\src\assets\Fighters\PetrLacek.jpg"
    alt="test"
    class="w-full h-full object-cover object-center"
  />
</div>

          <div class="flex flex-col text-left w-64 justify-between overflow-hidden">
            <span class="font-semibold">Petr Lacek</span>

            <div class="flex flex-col">
            <span class="text-xs">1. místo Children Championship (2011)</span>
            <span class="text-xs">2. místo Children Championship (2011)</span>
            <span class="text-xs">3. místo Children Championship (2011)</span>
            
           { /*
            <span class="text-[10px] text-customGreen font-bold text-right">zobrazit vše...</span>
*/}
            </div>

            <span class="border border-customGreen text-customGreen text-xs font-medium px-2.5 py-0.5 rounded max-w-full w-full max-h-5 h-full flex items-center justify-around">
            ÚSPĚCHY
              </span>

            <div class="flex justify-between">
              <span class="border border-customGreen text-customGreen text-xs font-medium px-2.5 py-0.5 rounded max-w-20 w-full max-h-5 h-full flex items-center justify-around">
                <div class="relative inline-flex rounded-full h-4 w-4 bg-customGreen">
                  <img
                    class="px-0.5 py-0.5 flex align-middle items-center"
                    src="../src/assets/icons/belt.png"
                    alt="image description"
                  ></img>
                </div>
                1. DAN
              </span>

              <span class="border border-customGreen text-customGreen text-xs font-medium px-2.5 py-0.5 rounded max-w-20 w-full max-h-5 h-full flex items-center justify-around">
                <div class="relative inline-flex rounded-full h-4 w-4 bg-customGreen">
                  <img
                    class="px-0.5 py-0.5 flex align-middle items-center"
                    src="../src/assets/icons/medal.png"
                    alt="image description"
                  ></img>
                </div>
                BEST
              </span>

              <span class="border border-customGreen text-customGreen text-[8px] font-medium px-2.5 py-0.5 rounded max-w-20 w-full max-h-5 h-full flex items-center justify-around">
                <div class="relative inline-flex rounded-full h-4 w-4 bg-customGreen">
                  <img
                    class="px-0.5 py-0.5 flex align-middle items-center"
                    src="../src/assets/icons/trophy.png"
                    alt="image description"
                  ></img>
                </div>
                LEGEND
              </span>
            </div>

          </div>
        </div>
      
    </>
  );
}

export default Fighter;
