import Devider from "../pages/Turnaje/Devider";
import Turnaj from "../pages/Turnaje/Turnaj";
import Event from "../pages/Home/Event";
function Turnaje() {
  return (
    <>
    <div class="flex flex-col justify-between gap-5">
    <Devider />
    <Turnaj />

<div className="flex justify-between gap-5">
    <Event />
    <Event />
    <Event />
    </div>
    </div>
    
</>
  );
}

export default Turnaje;
