import React from 'react';

function MainContact() {
  return (
   <div class="bg-customWhite w-72 h-96 rounded-lg flex justify-center flex-col items-center">
   <div>
    <img src="\src\assets\Fighters\PetrLacek.jpg" alt="" class="rounded-lg w-32"/>
    </div>

<div class="flex flex-col justify-center items-center align-middle">
   
    <p class="flex flex-col justify-center items-center">
    <span>Petr Lacek</span>
      <span>5. DAN</span>
      <span class="text-xs">II. trenérská třída</span>
    </p>

    <p class="flex justify-center items-center flex-col">
      <span>email: <span class="text-customGreen font-bold">lecaf@seznam.cz</span></span>
      <span>telefon: <span class="text-customGreen font-bold">+420 724 209 910</span></span>
    </p>
</div>
<button
              type="button"
              className="text-customGreen bg-customWhite focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-customWhite flex items-center space-x-1 border border-customGreen"
            >
              <div className="relative inline-flex rounded-full h-5 w-5 bg-customGreen">
                <img
                  className="px-0.6 py-0.6"
                  src="../src/assets/Icons/emailWW.png"
                  alt="Login"
                />
              </div>
              <span>lecaf@seznam.cz</span>
            </button>

            <button
              type="button"
              className="text-customGreen bg-customWhite focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-customWhite flex items-center space-x-1 border border-customGreen"
            >
              <div className="relative inline-flex rounded-full h-5 w-5 bg-customGreen">
                <img
                  className="px-0.6 py-0.6"
                  src="../src/assets/Icons/login.png"
                  alt="Login"
                />
              </div>
              <span>+420 724 209 910</span>
            </button>
   </div>
  );
}

export default MainContact;
