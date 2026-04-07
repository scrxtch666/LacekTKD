import SearchBar from "../pages/Turnaje/SearchBar";
import TurnajList from "../pages/Turnaje/TurnajList";
import { useState, useEffect } from "react";

const API = "http://localhost:3000";

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
        setUpcoming(data.filter(t => new Date(t.start_date_raw) >= now));
        setPast(data.filter(t => new Date(t.start_date_raw) < now));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
    <div className="devider">Turnaje</div>
    <main className="space-y-8">
      

      {/* Search + filter */}
      <SearchBar
        search={search}
        setSearch={setSearch}
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
      />

      {/* Seznam nadcházejících turnajů */}
      <TurnajList
        title="Nadcházející turnaje"
        tournaments={upcoming}
        search={search}
        selectedPeriod={selectedPeriod}
      />

      {/* Seznam proběhlých turnajů */}
      <TurnajList
        title="Proběhlé turnaje"
        tournaments={past}
        search={search}
        selectedPeriod={selectedPeriod}
      />

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