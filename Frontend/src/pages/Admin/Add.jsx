function Add() {
  return (
    <>
    <div className="card">
      <h1>Rychlé nastavení</h1>
      <div class="w-full flex justify-center text-customGreen font-semibold">
        <div class="flex justify-between gap-14">
          <div class="bg-customWhite h-10 w-60 flex justify-center items-center rounded-md gap-2 border-2 border-customBlack">
            <div class="bg-customGreen object-cover object-center w-7 rounded-full">
              <img
                src="../src/assets/Icons/plus2.png"
                alt=""
                class="object-cover object-center"
              />
            </div>
            Přidat akci
          </div>

          <div class="bg-customWhite h-10 w-60 flex justify-center items-center rounded-md gap-2 border-2 border-customBlack">
            <div class="bg-customGreen object-cover object-center w-7 rounded-full">
              <img
                src="../src/assets/Icons/plus2.png"
                alt=""
                class="object-cover object-center"
              />
            </div>
            Přidat aktualitu
          </div>

          <div class="bg-customWhite h-10 w-60 flex justify-center items-center rounded-md gap-2 border-2 border-customBlack">
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
      </div>
    </>
  );
}

export default Add;
