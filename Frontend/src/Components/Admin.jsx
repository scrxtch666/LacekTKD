import Welcome from "../pages/Admin/Welcome";
import Stats from "../pages/Admin/Stats";
function Admin() {
  return (
    <>
    <div className="flex flex-col gap-5">
    <Welcome />
    <Stats />
      <div className="flex justify-center">
      <span className="bg-customWhite flex items-center justify-center p-4 rounded-md border-2 border-customBlack text-red-600 font-bold w-1/2">Toto zatím slouží jako testovací prostředí</span>
      </div>

      <h1>Rychlé nastavení</h1>
      <div class="w-full flex justify-center text-customGreen font-semibold">
        <div class="flex justify-between gap-14">
          <div class="bg-customWhite h-10 w-60 flex justify-center items-center rounded-md gap-2">
            <div class="bg-customGreen object-cover object-center w-7 rounded-full">
              <img
                src="../src/assets/Icons/plus2.png"
                alt=""
                class="object-cover object-center"
              />
            </div>
            Přidat akci
          </div>

          <div class="bg-customWhite h-10 w-60 flex justify-center items-center rounded-md gap-2">
            <div class="bg-customGreen object-cover object-center w-7 rounded-full">
              <img
                src="../src/assets/Icons/plus2.png"
                alt=""
                class="object-cover object-center"
              />
            </div>
            Přidat aktualitu
          </div>

          <div class="bg-customWhite h-10 w-60 flex justify-center items-center rounded-md gap-2">
            <div class="bg-customGreen object-cover object-center w-7 rounded-full">
              <img
                src="../src/assets/Icons/plus2.png"
                alt=""
                class="object-cover object-center"
              />
            </div>
            Přidat zavodníka
          </div>
        </div>
      </div>
      <span>Nadcházející akce</span>
      <div class="bg-customWhite">
        
        <div class="flex justify-between">
          <div>
          <p>Název</p>
          </div>
          <div class="flex gap-24">
          <p>Typ</p>
          <p>Lokace</p>
          <p>Datum</p>
          <p>Počet závodníků</p>
          </div>
        </div>
        <hr/>
        <span>Test</span>
      </div>

<span>Statistiky</span>
      <div class="bg-customWhite">
      <span>Počet závodníků</span>
      <span>Trunajů tento rok</span>

      </div>
      </div>
    </>
  );
}

export default Admin;
