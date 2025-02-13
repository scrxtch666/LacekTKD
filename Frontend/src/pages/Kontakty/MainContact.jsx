import React from "react";

function MainContact() {
  return (
    <>
      <div class="bg-customWhite w-full h-96 rounded-lg flex justify-evenly flex-col items-center">
        <div class="flex justify-between flex-col">
          <img
            src="\src\assets\Fighters\PetrLacek.jpg"
            alt=""
            class="rounded-lg w-56 h-56"
          />

          <div class="flex flex-col justify-center items-center align-middle">
            <p class="flex flex-col justify-center items-center">
              <span>Petr Lacek</span>
              <span>5. DAN</span>
              <span class="text-xs">hlavní trenér, II. trenérská třída</span>
            </p>
          </div>
        </div>

        <div class="flex justify-between gap-3  flex-col">
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
                className="px-0.6 py-0.6"
                src="../src/assets/Icons/login.png"
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
