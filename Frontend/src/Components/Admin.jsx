import Welcome from "../pages/_Admin/Welcome";
import Stats from "../pages/_Admin/Stats";
import Add from "../pages/_Admin/Add";
import Alert from "./_test/Alert";
import Table from "../pages/_Admin/Table";
import { useState } from "react";
import Nabor from "./Nabor";
function Admin() {

  const[naborVisible, setNaborVisible] = useState(true);

  const handleClick = (e) => {
    e.stopPropagation();
    setNaborVisible(false);
  };


  return (
    <>
      <div className="flex flex-col gap-5">
        <Welcome />
        <Alert />
        <div className="flex justify-center">
          <span className="bg-customWhite flex items-center justify-center p-4 rounded-md border-2 border-customBlack text-red-600 font-bold w-1/2">
            Toto zatím slouží jako testovací prostředí
          </span>
        </div>

        <div className="flex gap-5 w-full">
          <Stats />
          <Add />
        </div>

        <div>
          {naborVisible && <Nabor />}
          <button onClick={handleClick}>Zobrazit nabor</button>
        </div>

        <Table />
      </div>
    </>
  );
}

export default Admin;
