function AddFighterStats() {
  return (
    <>
      <div className="card flex justify-between w-1/2 h-max gap-5 flex-col">
        <span className="font-bold uppercase">statistiky závodníka</span>

        <div className="flex gap-5">
          <div className="border-2 border-customGreen border-dotted rounded-md flex flex-col items-center justify-center content-center">
            <span className="text-xs">Nahrajte profilový obrázek</span>
            <input
              type="file"
              id="file-input"
              name="ImageStyle"
              className="text-xs"
            />
          </div>

          <div className="flex flex-col justify-between gap-5">
            <div className="flex gap-5">
              <input
                name="myInput  "
                className="rounded-md border-2 border-customGreen border-dotted bg-customWhite px-2 w-full"
                placeholder="Jméno"
              />

              <input
                name="myInput  "
                className="rounded-md border-2 border-customGreen border-dotted bg-customWhite px-2 w-full"
                placeholder="Příjmení"
              />
            </div>

            <div className="border-2 border-customGreen border-dotted rounded-md flex p-4 justify-center">
              <button className="flex gap-2 rounded-lg p-2 justify-between">
                <div className="bg-customGreen rounded-full w-6">
                  <img
                    className=""
                    src="../src/assets/Icons/plus.png"
                    alt="Logo"
                  />
                </div>
                ÚSPĚCHY
              </button>
            </div>

            <div className="border-2 border-customGreen border-dotted rounded-md flex p-2 justify-between">
              <span class="border border-customGreen text-customGreen text-xs font-medium px-2.5 py-0.5 rounded max-w-24 w-full max-h-8 h-full flex items-center justify-around">
                <div class="relative inline-flex rounded-full h-6 w-6 bg-customGreen">
                  <img
                    class="px-0.5 py-0.5 flex align-middle items-center"
                    src="../src/assets/icons/belt.png"
                    alt="image description"
                  ></img>
                </div>
                1. DAN
              </span>

              <span class="border border-customGreen text-customGreen text-xs font-medium px-2.5 py-0.5 rounded max-w-24 w-full max-h-8 h-full flex items-center justify-around">
                <div class="relative inline-flex rounded-full h-6 w-6 bg-customGreen">
                  <input
                    name="myInput  "
                    className="rounded-md border-2 border-customGreen border-dotted bg-customWhite px-2 w-full"
                    placeholder="best"
                    type="checkbox"
                  />
                </div>
                BEST
              </span>

              <span class="border border-customGreen text-customGreen text-[8px] font-medium px-2.5 py-0.5 rounded max-w-24 w-full max-h-8 h-full flex items-center justify-around">
                <div class="relative inline-flex rounded-full h-6 w-6 bg-customGreen">
                  <input
                    name="myInput  "
                    className="rounded-md border-2 border-customGreen border-dotted bg-customWhite px-2 w-full"
                    placeholder="legend"
                    type="checkbox"
                  />
                </div>
                LEGEND
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddFighterStats;
