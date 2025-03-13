import Showcase from "../pages/Home/Showcase";
import EventCard from "../pages/Home/EventCard";
import Event from "../pages/Home/Event";
import Calendar from "../pages/Home/Calendar";
import Newsletter from "../pages/Home/Newsletter";

const Home = () => {
  return (
    <>
      <Showcase />

      <div className="devider shadow-xl border-2">aktuality</div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <EventCard />
      </div>

      <div className="devider shadow-xl border-2">
        <span>nadcházející akce</span>
      </div>

      <div class="flex justify-between h-64 gap-5">
        <Calendar />
        <Event />
      </div>

      <Newsletter />
    </>
  );
};

export default Home;
