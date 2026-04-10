import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import config from "../../../config";
function Pasky() {
  const [belts, setBelts] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = config.API_URL;
  useEffect(() => {
    fetch(`${API}/api/belts`)
      .then((response) => response.json())
      .then((data) => {
        setBelts(data);
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
      <div className="card w-full overflow-y-hidden">
        <span class="font-extrabold text-lg">Pásky</span>
        <div className="grid grid-cols-2">
          {belts.map((belt) => (
            <div className="flex items-center gap-5">
              <img src={belt.img_path} alt={belt.belt_name} />
              <p>- {belt.cup} -</p>

              <p className="font-bold">{belt.belt_name}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Pasky;
