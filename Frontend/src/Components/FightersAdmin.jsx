import { Link } from "react-router-dom";
import React from "react";
import Button from "./Button";
import Stats from "../pages/_Admin/Stats";

function FightersAdmin() {
  return (
    <>

<div className="flex justify-center content-center align-middle items-center bg-customWhite w-16 h-16">
    <p>A</p>
</div>

     <div className="devider">Všichni závodníci</div>
     <Button />
     <div className="flex justify-center">
     <div className="w-1/2 flex justify-center">
     <Stats />
     </div>
     </div>

    </>
  );
}

export default FightersAdmin;
