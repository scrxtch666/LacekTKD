import React, { useState, useEffect } from "react";

function MainContact() {
  const [coach, setCoach] = useState([]); // Stav pro uchování dat turnajů
      const [loading, setLoading] = useState(true); // Stav pro zobrazení načítání dat
  
      // Funkce pro načítání dat o turnajích
        useEffect(() => {
          // Načítání dat z backendu
          fetch("http://localhost:3000/coach")
            .then((response) => response.json())
            .then((data) => {
              setCoach(data); // Nastavení získaných dat do stavu
              setLoading(false); // Nastavení stavu načítání na false
            })
            .catch((error) => {
              console.error("Chyba při načítání dat:", error);
              setLoading(false); // I když dojde k chybě, stav načítání bude false
            });
        }, []);
      
        if (loading) {
          return <div>Načítám data...</div>; // Zobrazení textu při načítání
        }
  return (
    <>
    {coach.map((ocoach) => (
      <div class="bg-customWhite w-full h-max rounded-lg flex justify-between flex-col items-center p-4 gap-5">
        <div class="flex justify-evenly h-1/2 w-full">
          <img
            src={ocoach.img_path}
            alt=""
            class="rounded-full h-28 w-28 object-cover object-center"
          />

          <div class="flex flex-col justify-center items-center align-middle">
            <p class="flex flex-col">
              <span className="font-bold text-xl">{ocoach.first_name} {ocoach.last_name}</span>
              <span className="text-gray-500 font-medium">{ocoach.belt}</span>
              <span class="text-xs text-gray-500">hlavní trenér, II. trenérská třída</span>
            </p>
          </div>
        </div>

        <div class="flex justify-between gap-3 w-full flex-col">

          <button
            type="button"
            className="text-customGreen bg-customWhite focus:ring-4 focus:outline-none font-medium rounded-lg text-sm p-2 text-center dark:bg-customWhite flex items-center space-x-1"
          >
            <div className="relative inline-flex rounded-full h-5 w-5 bg-customGreen">
              <img
                className="px-0.6 py-0.6 m-1"
                src="../src/assets/Icons/emailWW.png"
                alt="Login"
              />
            </div>
            <span>{ocoach.email}</span>
          </button>

          <button
            type="button"
            className="text-customGreen bg-customWhite focus:ring-4 focus:outline-none font-medium rounded-lg text-sm p-2 text-center dark:bg-customWhite flex items-center space-x-1 borde"
          >
            <div className="relative inline-flex rounded-full h-5 w-5 bg-customGreen">
              <img
                className="px-1 py-1 "
                src="../src/assets/Icons/phone.png"
                alt="Login"
              />
            </div>
            <span>+420 {ocoach.phone_number}</span>
          </button>
        </div>
      </div>
      ))} 
    </>
  );
}

export default MainContact;
