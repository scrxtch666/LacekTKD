import Showcase from "../pages/Home/Showcase";
import EventCard from "../pages/Home/EventCard";
import Event from "../pages/Home/Event";
import Calendar from "../pages/Home/Calendar";
import Newsletter from "../pages/Home/Newsletter";

const Home = () => {
  return (
    <>
      <div class="flex flex-col gap-5">
        <Showcase />

        <div className="devider shadow-xl border-2">aktuality</div>

        <div className="flex justify-between gap-5">
          <EventCard />
          <EventCard />
          <EventCard />
        </div>

        <div className="devider shadow-xl border-2">
          <span>nadcházející akce</span>
        </div>

        <div class="flex justify-between h-64 gap-6">
          <Calendar />

          <Event />
        </div>

        <Newsletter />
      </div>
    </>
  );
};

export default Home;
