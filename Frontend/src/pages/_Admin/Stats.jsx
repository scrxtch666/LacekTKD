import { useState, useEffect } from "react";

function Stats() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/fighters/countAll")
        .then((res) => res.json())
        .then((data) => setCount(data.count))
        .catch((error) => console.error("Chyba při načítání:", error));
}, []);

  return (
    <>
      <div class="card w-full">
        <span class="font-bold uppercase">Statistiky</span>
        <hr />
        <div className="flex justify-between">
          <div className="flex flex-col justify-center items-center">
            <span>Počet závodníků:</span>
            <span className="font-bold text-customGreen">{count !== null ? count : "Načítám..."}</span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <span>Počet akcí:</span>
            <span className="font-bold text-customGreen">23</span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <span>Počet závodníků:</span>
            <span className="font-bold text-customGreen">69</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Stats;
