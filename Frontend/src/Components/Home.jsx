import Showcase from "../pages/Home/Showcase";
import Calendar from "../pages/Home/Calendar";
import Newsletter from "../pages/Home/Newsletter";
import EventCardLatest from "../pages/Home/EventCardLatest";
import CalendarTournament from "../pages/Home/_test/CalendarTournament";

const Home = () => {
  return (
    <>
      <Showcase />

      <div className="devider shadow-xl border-2">aktuality</div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <EventCardLatest />
      </div>

      <div className="devider shadow-xl border-2">nadcházející akce</div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
        <Calendar />
        <CalendarTournament />
      </div>

      <Newsletter />
    </>
  );
};

export default Home;
