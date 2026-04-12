import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import AddButton from "../pages/AddFighter/AddButton";
import Stats from "../pages/_Admin/Stats";
import AllFightersAdmin from "../pages/AddFighter/AllFightersAdmin";
import config from "../../config";

function FightersAdminTable() {
  const [fighters, setFighters] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const API = config.API_URL;

 
  useEffect(() => {
    // Načítání dat z backendu
    fetch(`${API}/api/fighters`)
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
      <div className="devider flex justify-between">
        <span>Profilový obrázek</span>
        <span>Celé jméno</span>
        <span>Věk</span>
        <span>Váha</span>
        <span>Pásek</span>
        <span>Best</span>
        <span>Legend</span>
        <span>Aktivní</span>
        <span>Akce</span>
      </div>

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Seznam závodníků</h1>

        <div className="overflow-x-auto rounded-2xl shadow-md border border-gray-200">
          <table className="min-w-full bg-customWhite">
            <thead className="bg-customWhite">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
                  Fotka
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
                  Jméno
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
                  Pásek
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
                  Věk
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
                  Váha
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
                  Best
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
                  Legend
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
                  Aktivní
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
                  Akce
                </th>
              </tr>
            </thead>
            <tbody>
              {fighters.length > 0 ? (
                fighters.map((fighter) => (
                  <tr
                    key={fighter.id}
                    className="hover:bg-gray-50 border-t border-gray-100"
                  >
                    <td className="px-6 py-4">
                      <img
                        src={fighter.img_path}
                        alt={`${fighter.name} ${fighter.surname}`}
                        className="w-14 h-14 rounded-lg object-cover"
                      />
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {fighter.name} {fighter.surname}
                    </td>
                    <td className="px-6 py-4 flex flex-col justify-center object-center items-center">
                      {fighter.cup}
                      <img
                        src={fighter.belt_path}
                        alt="Belt"
                        className="w-8 object-cover object-center"
                      />
                    </td>
                    <td className="px-6 py-4 text-gray-700">{fighter.age}</td>
                    <td className="px-6 py-4 text-gray-700">
                      {fighter.actual_weight_category}
                    </td>
                    <td className="px-6 py-4 text-gray-700">{fighter.best}</td>
                    <td className="px-6 py-4 text-gray-700">
                      {fighter.legend}
                    </td>
                    {fighter.best === 1 ? (
                      <img
                        src="/assets/icons/yes_1.png"
                        alt="Best"
                        className="w-6 h-6 inline-block"
                      />
                    ) : (
                      <img
                        className="px-0.5 py-0.5 flex align-middle items-center"
                        src="/assets/icons/no_1.png"
                        alt="image description"
                      ></img>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-8 text-gray-500 italic"
                  >
                    Žádní závodníci nebyli nalezeni
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default FightersAdminTable;
