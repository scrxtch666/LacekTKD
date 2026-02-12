import { useState, useEffect } from "react";
import ShowcaseCarousel from "../pages/Home/ShowcaseCarousel";
import Newsletter from "../pages/Home/Newsletter";
import EventCardLatest from "../pages/Home/EventCardLatest";
import CalendarTournament from "../pages/Home/CalendarTournament";
import Calendar from "../pages/Home/Calendar";

const Home = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Načtení dat pro obě komponenty najednou
  useEffect(() => {
    fetch("http://localhost:3000/api/tournaments/latest")
      .then((res) => res.json())
      .then((data) => {
        const events = Array.isArray(data) ? data : [];
        setAllEvents(events);
        setFilteredEvents(events); // Na začátku ukážeme vše nebo filtr na dnešek
        setLoading(false);
      })
      .catch((err) => {
        console.error("Chyba:", err);
        setLoading(false);
      });
  }, []);

  // 2. Funkce pro filtraci, kterou předáme kalendáři
  const handleDateSelect = (selectedDay) => {
    const { isSameDay } = require("date-fns"); // nebo import nahoře
    const filtered = allEvents.filter((event) =>
      isSameDay(new Date(event.start_date), selectedDay),
    );
    setFilteredEvents(filtered);
  };

  return (
    <>
      <ShowcaseCarousel />

      <div className="devider">aktuality</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <EventCardLatest />
      </div>

      <div className="devider">nadcházející akce</div>

      {/* Mřížka pro Kalendář a Karty - md - tablet */}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="md:grid-cols-2">
          <Calendar tournaments={allEvents} onDateSelect={handleDateSelect} />
        </div>
        <div className="md:grid-cols-2">
          {loading ? (
            <p>Načítání akcí...</p>
          ) : (
            <CalendarTournament tournaments={filteredEvents} />
          )}
        </div>
      </div>

      <Newsletter />
    </>
  );
};

export default Home;
