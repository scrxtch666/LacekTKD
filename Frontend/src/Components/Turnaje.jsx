import Devider from "../pages/Turnaje/Devider";
import Turnaj from "../pages/Turnaje/Turnaj";
import Event from "../pages/Home/Event";

function Turnaje() {
  return (
    <>
      <div className="devider">nadcházející turnaje</div>

        <Turnaj />

      <div className="devider">tento měsíc</div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Event />
      </div>
    </>
  );
}

export default Turnaje;
