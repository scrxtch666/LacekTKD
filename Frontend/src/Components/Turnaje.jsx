import Devider from "../pages/Turnaje/Devider";
import Turnaj from "../pages/Turnaje/Turnaj";
import Event from "../pages/Home/Event";
function Turnaje() {
  return (
    <>
    <Devider />
    <Turnaj />
    <div class="flex justify-between gap-5">
    <Event />
    <Event />
    </div>
    
</>
  );
}

export default Turnaje;
