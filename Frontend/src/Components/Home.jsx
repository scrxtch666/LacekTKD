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

        <div class="bg-customWhite h-8 flex justify-between content-center px-4 rounded-md font-bold">
          <div class="justify-center align-middle content-center">
            <span class="">AKTUALITY</span>
          </div>
          <div class="justify-center align-middle content-center">
            <span class="text-customGreen">ZÁŘÍ</span>
          </div>
        </div>

        <div className="w-[1280px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <EventCard />
          <EventCard />
          <EventCard />
        </div>

        <div className="grid grid-cols-3 gap-13">
          <EventCard />
          <EventCard />
          <EventCard />
        </div>

        <div className="flex justify-between gap-5">
          <EventCard />
          <EventCard />
          <EventCard />
        </div>

        <div class="bg-customWhite h-8 flex justify-between content-center px-4 rounded-md font-bold">
          <div class="justify-center align-middle content-center">
            <span class="">NADCHÁZEJÍCÍ AKCE</span>
          </div>
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
