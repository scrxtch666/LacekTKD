import { useState, useEffect } from "react";

function Devider() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/fighters/countAll")
        .then((res) => res.json())
        .then((data) => setCount(data.count))
        .catch((error) => console.error("Chyba při načítání:", error));
}, []);

  return (
    <div class="bg-customWhite h-8 flex justify-between content-center px-4 rounded-md font-bold">
    <div class="justify-center align-middle content-center flex items-center gap-2">
        <img src="../src/assets/Belts/blt_black_2.gif" alt="2 DAN" class="w-9" />
      <span class="">2. DAN</span>
    </div>
    <div class="justify-center align-middle content-center gap-2 flex items-center">
        <span>ZÁVODNÍCI:</span>
      <span class="text-customGreen">{count !== null ? count : "Načítám..."}</span>
    </div>
  </div>
  );
}

export default Devider;
