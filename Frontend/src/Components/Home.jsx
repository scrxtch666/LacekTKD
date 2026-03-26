import ShowcaseCarousel from "../pages/Home/ShowcaseCarousel";
import Newsletter from "../pages/Home/Newsletter";
import EventCardLatest from "../pages/Home/EventCardLatest";
import Calendar from "../pages/Home/Calendar";

const Home = () => {
  return (
    <>
      <ShowcaseCarousel />

      <div className="devider">aktuality</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <EventCardLatest />
      </div>

      <div className="devider">nadcházející akce</div>

      <Calendar />

      {/*
      <Newsletter />
       */}
    </>
  );
};

export default Home;
