import { Link } from "react-router-dom";
import Button from "../../Components/Button";
import React from "react";
function Newsletter() {
  return (
    <>
  <div class="flex justify-center">
          <div class="bg-customWhite flex justify-evenly items-center p-4 rounded-xl gap-4">
            <img
              src="../src/assets/Team/logo_tkdlacek_white.png"
              alt=""
              class="h-28"
            />
            <span class="font-bold text-xl">
              Přihlas se k odběru novinek a zůstaň v obraze!
            </span>
            <input type="text" placeholder="Zadejte email:" />

            <Button />
            
          </div>
        </div>
    </>
  );
}

export default Newsletter;
