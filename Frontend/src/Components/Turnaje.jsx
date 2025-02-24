import Devider from "../pages/Turnaje/Devider";
import Turnaj from "../pages/Turnaje/Turnaj";
import Event from "../pages/Home/Event";
import Detail from "../pages/Turnaje/Detail";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

function Turnaje() {
  return (
    <>
    <div class="flex flex-col justify-between gap-5">
    <Devider />
    
    
    <Routes>
      <Route path="/Detail" element={<Detail />} />
    </Routes>
 
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
