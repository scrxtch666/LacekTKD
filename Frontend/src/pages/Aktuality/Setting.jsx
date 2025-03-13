import React from "react";

function Setting() {
  return (
    <>
      <div class="flex font-bold mb-2 w-full justify-center">
        <div className="w-1/2 flex justify-between">
          <div>
            <input
              type="text"
              placeholder="Zadejte název akce:"
              class="p-2 rounded-lg bg-customWhite"
            />
          </div>
          {/* Použití Routes místo Switch 
        <div class="bg-customWhite p-2 px-4 rounded-md border-2 border-customBlack">2025</div>
        */}
          <div class="flex gap-4">
            <div class="bg-customWhite p-2 px-4 rounded-md">ROK</div>
            <div class="bg-customWhite p-2 px-4 rounded-md">MĚSÍC</div>
            <div class="bg-customWhite p-2 px-4 rounded-md">
              <img
                src="https://img.icons8.com/?size=100&id=7695&format=png&color=01923e"
                alt=""
                class="object-cover object-center max-h-5 justify-center align-middle items-center"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Setting;
