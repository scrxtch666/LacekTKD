function AddFighter() {
  return (
    <>
      <span>Přidání závodníka</span>

      <div className="card flex justify-between w-1/2 h-60 gap-5">
        <div className="border-2 border-customGreen border-dotted rounded-md flex items-center">
          <span className="">Nahrajte profilový obrázek</span>
        </div>

        <div className="flex flex-col justify-between">
          <div className="flex gap-5">
            <input
              name="myInput  "
              className="rounded-md border-2 border-customBlack px-2 w-full"
              placeholder="Jméno"
            />

            <input
              name="myInput  "
              className="rounded-md border-2 border-customBlack px-2 w-full"
              placeholder="Příjmení"
            />
          </div>

          <div className="border-2 border-customGreen border-dotted rounded-md flex p-4 justify-center">
          <button className="flex gap-2 rounded-lg p-2 justify-between">
            <div className="bg-customGreen rounded-full w-6">
              <img className="" src="../src/assets/Icons/plus.png" alt="Logo" />
            </div>
            ÚSPĚCHY
          </button>
          </div>


          <div className="border-2 border-customGreen border-dotted rounded-md flex p-4 justify-between">

          <span class="border border-customGreen text-customGreen text-xs font-medium px-2.5 py-0.5 rounded max-w-20 w-full max-h-5 h-full flex items-center justify-around">
              <div class="relative inline-flex rounded-full h-4 w-4 bg-customGreen">
                <img
                  class="px-0.5 py-0.5 flex align-middle items-center"
                  src="../src/assets/icons/belt.png"
                  alt="image description"
                ></img>
              </div>
              1. DAN
            </span>

          <span class="border border-customGreen text-customGreen text-xs font-medium px-2.5 py-0.5 rounded max-w-20 w-full max-h-5 h-full flex items-center justify-around">
              <div class="relative inline-flex rounded-full h-4 w-4 bg-customGreen">
                <img
                  class="px-0.5 py-0.5 flex align-middle items-center"
                  src="../src/assets/icons/medal.png"
                  alt="image description"
                ></img>
              </div>
              BEST
            </span>

            <span class="border border-customGreen text-customGreen text-[8px] font-medium px-2.5 py-0.5 rounded max-w-20 w-full max-h-5 h-full flex items-center justify-around">
              <div class="relative inline-flex rounded-full h-4 w-4 bg-customGreen">
                <img
                  class="px-0.5 py-0.5 flex align-middle items-center"
                  src="../src/assets/icons/trophy.png"
                  alt="image description"
                ></img>
              </div>
              LEGEND
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddFighter;
