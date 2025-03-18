
import FighterMain from "../pages/AddFighter/AddFighter";
import FighterUdaje from "../pages/AddFighter/NewFighter";
import Options from "../pages/AddFighter/Options";
function AddFighter() {
  
  return (
    <>
      <div className="devider">Tvorba uživatelského profilu</div>
        <div className="gap-5 flex">
          <FighterMain />
          <FighterUdaje />
        </div>

        <div className="flex w-full justify-center">
          <Options />
        </div>
    </>
  );
}

export default AddFighter;