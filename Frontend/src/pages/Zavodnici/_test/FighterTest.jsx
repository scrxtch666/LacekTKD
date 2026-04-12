import { useState, useEffect } from "react";
import config from "../../../../config";

function FighterTest() {
  const [fighters, setFighters] = useState([]); 
  const [loading, setLoading] = useState(true); 

  const API = config.API_URL;

  useEffect(() => {
    
    fetch(`${API}/fighters`)
      .then((response) => response.json())
      .then((data) => {
        setFighters(data); 
        setLoading(false); 
      })
      .catch((error) => {
        console.error("Chyba při načítání dat:", error);
        setLoading(false); 
      });
  }, [API]);

  if (loading) {
    return <div>Načítám data...</div>; 
  }
  return (
    <>
      {fighters.map((fighter, index) => (
        <div className="w-[400px] h-40 bg-customWhite text-customBlack rounded-md p-2 flex flex-row justify-between" key={`fighter-${index}`}>
          <div className="w-28 h-full rounded-xl overflow-hidden">
            <img
              src={fighter.profile_pic_path}
              alt="test"
              className="w-full h-full object-cover object-center"
            />
          </div>

          <div className="flex flex-col text-left w-64 justify-between overflow-hidden">
            <span className="font-semibold">
              {fighter.first_name} {fighter.last_name}
            </span>

            <div className="flex flex-col">
              <span className="text-xs">1. místo Children Championship (2011)</span>
              <span className="text-xs">2. místo Children Championship (2011)</span>
              <span className="text-xs">3. místo Children Championship (2011)</span>

              {/*
            <span class="text-[10px] text-customGreen font-bold text-right">zobrazit vše...</span>
*/}
            </div>

            <span className="border border-customGreen text-customGreen text-xs font-medium px-2.5 py-0.5 rounded max-w-full w-full max-h-5 h-full flex items-center justify-around">
              ÚSPĚCHY
            </span>

            <div className="flex justify-between">
              <span className="border border-customGreen text-customGreen text-xs font-medium px-2.5 py-0.5 rounded max-w-20 w-full max-h-5 h-full flex items-center justify-around">
                <div className="relative inline-flex rounded-full h-4 w-4 bg-customGreen">
                  <img
                    className="px-0.5 py-0.5 flex align-middle items-center"
                    src="/assets/icons/belt.png"
                    alt="image description"
                  ></img>
                </div>
                {fighter.belt}
              </span>

              <span className="border border-customGreen text-customGreen text-xs font-medium px-2.5 py-0.5 rounded max-w-20 w-full max-h-5 h-full flex items-center justify-around">
                <div className="relative inline-flex rounded-full h-4 w-4 bg-customGreen">
                  <img
                    className="px-0.5 py-0.5 flex align-middle items-center"
                    src="/assets/icons/medal.png"
                    alt="image description"
                  ></img>
                </div>
                BEST
              </span>

              <span className="border border-customGreen text-customGreen text-[8px] font-medium px-2.5 py-0.5 rounded max-w-20 w-full max-h-5 h-full flex items-center justify-around">
                <div className="relative inline-flex rounded-full h-4 w-4 bg-customGreen">
                  <img
                    className="px-0.5 py-0.5 flex align-middle items-center"
                    src="/assets/icons/trophy.png"
                    alt="image description"
                  ></img>
                </div>
                LEGEND
              </span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default FighterTest;
