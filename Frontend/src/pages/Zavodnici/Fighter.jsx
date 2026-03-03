import React, { useState, useEffect } from "react";

const API = "http://localhost:3000";

const BELT_ORDER = [
  "5. DAN",
  "4. DAN",
  "3. DAN",
  "2. DAN",
  "1. DAN",
  "1. CUP",
  "2. CUP",
  "3. CUP",
  "4. CUP",
  "5. CUP",
  "6. CUP",
  "7. CUP",
  "8. CUP",
];

function Fighter() {
  const [fighters, setFighters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/fighters`)
      .then((response) => response.json())
      .then((data) => {
        setFighters(Array.isArray(data) ? data : []);
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

  // Seskup závodníky podle pásu
  const groups = fighters.reduce((acc, fighter) => {
    const key = fighter.cup || "Ostatní";
    if (!acc[key]) acc[key] = { fighters: [], belt_path: fighter.belt_path };
    acc[key].fighters.push(fighter);
    return acc;
  }, {});

  // Seřaď skupiny podle BELT_ORDER
  const sortedGroups = Object.entries(groups).sort(([a], [b]) => {
    const ai = BELT_ORDER.indexOf(a);
    const bi = BELT_ORDER.indexOf(b);
    if (ai === -1 && bi === -1) return 0;
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });

  return (
    <div className="space-y-8">
      {sortedGroups.map(([cup, group]) => (
        <div key={cup}>
          {/* Header skupiny */}
          <div className="devider flex justify-between mb-4">
            <div className="flex items-center gap-2">
              <img
                src={group.belt_path}
                alt={cup}
                className="w-9 object-cover object-center"
              />
              <span>{cup}</span>
            </div>
            <span className="text-customGreen">
              {group.fighters?.length || 0}{" "}
              {group.fighters?.length === 1
                ? "závodník"
                : group.fighters?.length >= 2 && group.fighters?.length <= 4
                  ? "závodníci"
                  : "závodníků"}
            </span>
          </div>

          {/* Mřížka závodníků */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {group.fighters.map((fighter) => (
              <div
                key={fighter.id}
                className="w-full h-40 bg-customWhite text-customBlack rounded-md p-2 flex flex-row justify-between"
              >
                <div className="w-28 h-full rounded-xl overflow-hidden">
                  <img
                    src={fighter.img_path}
                    alt={fighter.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                <div className="flex flex-col text-left w-64 justify-between overflow-hidden">
                  <span className="font-semibold">
                    {fighter.name} {fighter.surname}
                  </span>

                  {/* TOP 3 úspěchy */}
                  <div className="flex flex-col">
                    {(fighter.tournament_results || []).length > 0 ? (
                      fighter.tournament_results.map((result, i) => (
                        <span key={i} className="text-xs">
                          {result.place}. místo – {result.tournament} (
                          {result.date})
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-gray-400 italic">
                        Závodník zatím nemá žádný úspěch
                      </span>
                    )}
                  </div>

                  <span className="border border-customGreen text-customGreen text-xs font-medium px-2.5 py-0.5 rounded max-w-full w-full max-h-5 h-full flex items-center justify-around">
                    ÚSPĚCHY
                  </span>

                  <div className="flex justify-between">
                    <span className="border border-customGreen text-customGreen text-xs font-medium px-2.5 py-0.5 rounded max-w-20 w-full max-h-5 h-full flex items-center justify-around">
                      <div className="relative inline-flex rounded-full h-4 w-4 bg-customGreen">
                        <img
                          className="px-0.5 py-0.5 flex align-middle items-center"
                          src="../src/assets/icons/belt.png"
                          alt=""
                        />
                      </div>
                      {fighter.cup}
                    </span>

                    {fighter.best === 1 && (
                      <span className="border border-customGreen text-customGreen text-xs font-medium px-2.5 py-0.5 rounded max-w-20 w-full max-h-5 h-full flex items-center justify-around">
                        <div className="relative inline-flex rounded-full h-4 w-4 bg-customGreen">
                          <img
                            className="px-0.5 py-0.5 flex align-middle items-center"
                            src="../src/assets/icons/medal.png"
                            alt=""
                          />
                        </div>
                        BEST
                      </span>
                    )}

                    {fighter.legend === 1 && (
                      <span className="border border-customGreen text-customGreen text-[8px] font-medium px-2.5 py-0.5 rounded max-w-20 w-full max-h-5 h-full flex items-center justify-around">
                        <div className="relative inline-flex rounded-full h-4 w-4 bg-customGreen">
                          <img
                            className="px-0.5 py-0.5 flex align-middle items-center"
                            src="../src/assets/icons/trophy.png"
                            alt=""
                          />
                        </div>
                        LEGEND
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Fighter;
