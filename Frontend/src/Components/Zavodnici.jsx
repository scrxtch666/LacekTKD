import Fighter from "../pages/Zavodnici/Fighter";
import FighterTest from "../pages/Zavodnici/_test/FighterTest";
import Devider from "../pages/Zavodnici/Devider";
import Pasky from "../pages/Zavodnici/Pasky";
function Zavodnici() {
  return (
    <>
    <div className="fighters-container flex flex-col gap-5">
    <Pasky />
      <Devider />

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <FighterTest />
       
      </div>
      <Devider />
      <div class="flex justify-between">
        <Fighter />
        <Fighter />
        <Fighter />
      </div>
      <Devider />
      <div class="flex justify-between">
        <Fighter />
      </div>
    </div>
    </>
  );
}

export default Zavodnici;
