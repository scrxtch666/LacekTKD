import Fighter from "../pages/Zavodnici/Fighter";
import FighterTest from "../pages/Zavodnici/_test/FighterTest";
import Devider from "../pages/Zavodnici/Devider";
import Pasky from "../pages/Zavodnici/Pasky";
function Zavodnici() {
  return (
    <>
      <Pasky />
      <Devider />

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <FighterTest />
      </div>
      <Devider />
      <div class="flex justify-between">
        <Fighter />
      </div>
    </>
  );
}

export default Zavodnici;
