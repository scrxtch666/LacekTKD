import TurnajList from "../pages/Turnaje/TurnajList";
import SearchBar from "./SearchBar";
import { useState, useEffect } from "react";
import config from "../../config";

const API = config.API_URL;

function Turnaje() {
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("");

  useEffect(() => {
    fetch(`${API}/api/tournaments/`)
      .then((res) => res.json())
      .then((data) => {
        const now = new Date();
        setUpcoming(data.filter((t) => new Date(t.start_date_raw) >= now));
        setPast(data.filter((t) => new Date(t.start_date_raw) < now));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="devider">Turnaje</div>
      <main className="space-y-8">
        <SearchBar
          search={search}
          onSearchChange={setSearch}
          hasActiveFilter={!!(search || selectedPeriod)}
          onClear={() => {
            setSearch("");
            setSelectedPeriod("");
          }}
          filters={[
            {
              key: "period",
              type: "select",
              value: selectedPeriod,
              onChange: setSelectedPeriod,
              placeholder: "Časové období",
              options: [
                { value: "upcoming", label: "Nadcházející" },
                { value: "past", label: "Proběhlé" },
              ],
            },
          ]}
        />

        {(selectedPeriod === "" || selectedPeriod === "upcoming") && (
          <TurnajList
            title="Nadcházející turnaje"
            tournaments={upcoming}
            search={search}
            selectedPeriod={selectedPeriod}
          />
        )}

        {(selectedPeriod === "" || selectedPeriod === "past") && (
          <TurnajList
            title="Proběhlé turnaje"
            tournaments={past}
            search={search}
            selectedPeriod={selectedPeriod}
          />
        )}

        {loading && (
          <div className="text-gray-400 text-center py-10">
            Načítám turnaje...
          </div>
        )}
      </main>
    </>
  );
}

export default Turnaje;
