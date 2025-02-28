function Add() {
  return (
    <>
    <div className="card w-full">
    <span class="font-bold text-xl">Přidání</span>
    <hr />
    <div class="w-full flex justify-between text-customGreen font-semibold">
        <div class="flex justify-between">
          <div class="bg-customWhite h-10 w-28 flex justify-center items-center rounded-md gap-2 border-2 border-customBlack">
            <div class="bg-customGreen object-cover object-center w-7 rounded-full">
              <img
                src="../src/assets/Icons/plus2.png"
                alt=""
                class="object-cover object-center"
              />
            </div>
            Přidat akci
          </div>

          <div class="bg-customWhite h-10 w-auto flex justify-center items-center rounded-md gap-2 border-2 border-customBlack">
            <div class="bg-customGreen object-cover object-center w-7 rounded-full">
              <img
                src="../src/assets/Icons/plus2.png"
                alt=""
                class="object-cover object-center"
              />
            </div>
            Přidat aktualitu
          </div>

          <div class="bg-customWhite h-10 w-28 flex justify-center items-center rounded-md gap-2 border-2 border-customBlack">
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
