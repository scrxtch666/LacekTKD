import { Link } from "react-router-dom";
import React from "react";
import AddButton from "../pages/AddFighter/AddButton";
import Stats from "../pages/_Admin/Stats";

function FightersAdmin() {
  return (
    <>

<div className="flex gap-5 items-center">
<div className="flex justify-center content-center align-middle items-center bg-customWhite w-16 h-16 rounded-md border-2 border-customGreen">
<img
              className="px-0.6 py-0.6"
              src="../src/assets/Icons/fighters.png"
              alt="Login"
            />
</div>

<span className="devider w-1/5">Všichni závodníci</span>

<span className="devider w-1/5">Přidat závodníka</span>
</div>

     <div className="devider">Všichni závodníci</div>
     <AddButton />
     <div className="flex justify-center">
     <div className="w-1/2 flex justify-center">
     <Stats />
     </div>
     </div>

    </>
  );
}

export default FightersAdmin;
