import Showcase from "./Showcase";
import Fighter from "./Fighter";
import EventCard from "./EventCard";
import Event from "../pages/Home/Event";

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

        <div class="flex justify-between">
          <EventCard />
          <EventCard />
          <EventCard />
        </div>

        <div class="bg-customWhite h-8 flex justify-between content-center px-4 rounded-md font-bold">
          <div class="justify-center align-middle content-center">
            <span class="">NADCHÁZEJÍCÍ AKCE</span>
          </div>
         
        </div>

        <div class="flex justify-between h-64 gap-52">
          <div class="bg-customWhite w-full h-64 p-2">Kalendář</div>
          
            <Event />
        
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
<div class="flex justify-center">
      <div class="bg-customWhite flex justify-evenly items-center p-4 rounded-xl w-2/3">
<img src="../src/assets/Team/logo_tkdlacek_white.png" alt="" class="h-28"/>
<span class="font-bold text-l">Přihlas se k odběru novinek a zůstaň v obraze</span>
<input type="text" placeholder="Zadejte email:"/>
<button>Přihlásit</button>
      </div>
      </div>
      </div>
    </>
  );
};

export default Home;
