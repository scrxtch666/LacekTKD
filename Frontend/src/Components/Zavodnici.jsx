import Fighter from "../pages/Zavodnici/Fighter";
import Devider from "../pages/Zavodnici/Devider";
function Zavodnici() {
  return (
    <div className="fighters-container flex flex-col gap-5">
    <Devider />

      <div class="flex justify-between">
      <Fighter />
      <Fighter />
      <Fighter />
      
      </div>
    </div>
  );
}

export default Zavodnici;
