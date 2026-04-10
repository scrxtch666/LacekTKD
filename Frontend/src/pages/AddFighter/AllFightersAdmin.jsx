import React, { useState, useEffect } from "react";
import config from "../../../config";
function AllFightersAdmin() {
  const [fighters, setFighters] = useState([]); 
  const [loading, setLoading] = useState(true); 

  
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
  }, []);

  if (loading) {
    return <div>Načítám data...</div>; 
  }

  return (
    <>
      {fighters.map((fighter) => (
        <div class="w-full h-16 bg-customWhite text-customBlack rounded-md p-2 flex flex-row justify-between items-center">
          <img
            src={fighter.profile_pic_path}
            alt="test"
            class="rounded-full size-10"
          />

          <span class="font-semibold">
            {fighter.first_name} {fighter.last_name}
          </span>

          <span class="font-semibold">19</span>
          <span class="font-semibold">72</span>
          <span class="font-semibold">{fighter.belt}</span>
          <span class="font-semibold">1</span>
          <span class="font-semibold">0</span>
          <span class="font-semibold">ANO</span>
        </div>
      ))}
    </>
  );
}

export default AllFightersAdmin;
