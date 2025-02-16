import React from "react";

function MainContact() {
  return (
    <>
      <div class="bg-customWhite w-full h-max rounded-lg flex justify-between flex-col items-center p-4 gap-5">
        <div class="flex justify-evenly h-1/2 w-full">
          <img
            src="\src\assets\Fighters\PetrLacek.jpg"
            alt=""
            class="rounded-full h-28 w-28 object-cover object-center"
          />

          <div class="flex flex-col justify-center items-center align-middle">
            <p class="flex flex-col">
              <span className="font-bold text-xl">Petr Lacek</span>
              <span className="text-gray-500 font-medium">5. DAN</span>
              <span class="text-xs text-gray-500">hlavní trenér, II. trenérská třída</span>
            </p>
          </div>
        </div>

        <div class="flex justify-between gap-3 w-full">
          <button
            type="button"
            className="text-customGreen bg-customWhite focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-customWhite flex items-center space-x-1 border border-customGreen"
          >
            <div className="relative inline-flex rounded-full h-5 w-5 bg-customGreen">
              <img
                className="px-0.6 py-0.6 m-1"
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
                className="px-1 py-1 "
                src="../src/assets/Icons/phone.png"
                alt="Login"
              />
            </div>
            <span>+420 724 209 910</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default MainContact;
