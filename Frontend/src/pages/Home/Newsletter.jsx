import Button from "../../Components/LogInButton";
import React from "react";
function Newsletter() {
  return (
    <>
    <div className="w-full flex justify-center">
  <div class="w-2/3 grid grid-cols-1">
          <div class="bg-customWhite flex justify-evenly items-center p-4 rounded-xl gap-4 shadow-xl border-2 overflow-hidden">
            <img
              src="../src/assets/Team/logo_tkdlacek_white.png"
              alt=""
              class="h-28 hidden lg:flex"
            />
            <span class="font-bold text-xl">
              Přihlas se k odběru novinek a zůstaň v obraze!
            </span>
            <input type="text" placeholder="Zadejte email:" class="p-2 rounded-lg" />

            <Button />
            
          </div>
        </div>
        </div>
    </>
  );
}

export default Newsletter;
