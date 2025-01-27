import Showcase from "./Showcase";
import Fighter from "./Fighter";
import EventCard from "./EventCard";

const Home = () => {
  return (
    <>
      <div class="flex flex-col gap-5">
        <Showcase />

        <div class="bg-customWhite h-8 flex justify-between rounded align-middle content-center font-bold">
          <div class="justify-center align-middle content-center">
            <span>AKTUALITY</span>
          </div>
          <div class="justify-center align-middle content-center">
            <span class="text-customGreen">ZÁŘÍ</span>
          </div>
        </div>

        <div class="flex justify-between">
          <EventCard />
          <EventCard />
          <EventCard />
        </div>

        <div class="bg-customWhite h-8 flex justify-between rounded align-middle content-center font-bold">
          <div class="justify-center align-middle content-center">
            <span>NADCHÁZEJÍCÍ AKCE</span>
          </div>
          <div class="justify-center align-middle content-center">
            <span class="text-customGreen"></span>
          </div>
        </div>

        <div class="flex justify-between h-64">
          <div class="bg-customWhite w-1/3 h-64 p-2">Kalendář</div>
          <div class="bg-customWhite w-1/3 h-64 p-2">Další akce</div>
        </div>

{/*
        <div class="flex justify-between h-24 gap-52">
          <div class="flex bg-customBlack w-full h-24 p-2 justify-evenly items-center rounded-md">
            <p>Přihlásit se k odběru novinek</p>
            <input type="text" placeholder="Zadejte email" class="h-8"/>
            <button class="h-8">Odeslat</button>
          </div>
          <div class="bg-customWhite w-full h-24 p-2 justify-evenly flex items-center rounded-md">
            <p>Staň se součástí týmu</p>
            <button class="h-8">Přihláška</button>
          </div>
        </div>
*/}

      <div class="bg-customWhite flex justify-evenly items-center p-4">
<img src="../src/assets/logo_tkdlacek_white.png" alt="" class="h-28"/>
<span class="font-bold text-xl">Přihlas se k odběru novinek a zůstaň v obraze</span>
<input type="text" placeholder="Zadejte email:"/>
<button>Přihlásit</button>
      </div>

      </div>
    </>
  );
};

export default Home;
