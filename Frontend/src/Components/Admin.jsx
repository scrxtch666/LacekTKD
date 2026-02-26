import Welcome from "../pages/_Admin/Welcome";
import Stats from "../pages/_Admin/Stats";
import Add from "../pages/_Admin/Add";
import Alert from "./_test/Alert";
import Table from "../pages/_Admin/Table";
import { useState } from "react";

function Admin() {
  const [naborVisible, setNaborVisible] = useState(true);

  const handleClick = (e) => {
    e.stopPropagation();
    setNaborVisible(false);
  };

  return (
    <>
      <div className="flex flex-col gap-5">
        <Welcome />

        <div className="devider items-center flex justify-center">
          panel rychlého přístupu
        </div>

        <Alert />

        <div className="flex gap-5 w-full">
          <Stats />
          <Add />
        </div>
      </div>
    </>
  );
}

export default Admin;
