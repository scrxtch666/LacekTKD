import Showcase from './Showcase';
import Fighter from './Fighter';

const Home = () => {
  return (
    <main className="pt-20">
      <Showcase />
      <div className="fighters-container">
        <Fighter />
        <Fighter />
        <Fighter />
        <Fighter />
      </div>
    </main>
  );
};

export default Home;
