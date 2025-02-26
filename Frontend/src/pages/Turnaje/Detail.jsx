import Event from "../Home/Event";
import Fighter from "../Zavodnici/Fighter";
function Detail() {
  return (
    <>
      <div className="flex flex-col gap-5">
        <div class="bg-customWhite h-8 flex justify-between content-center px-4 rounded-md font-bold">
          <div class="justify-center align-middle content-center">
            <span class="">DETAIL TURNAJE</span>
          </div>
          <div class="justify-center align-middle content-center">
            <span class="text-customGreen"></span>
          </div>
        </div>
        <div className="w-1/2">
          <Event />
        </div>

        <div class="bg-customWhite h-8 flex justify-between content-center px-4 rounded-md font-bold">
          <div class="justify-center align-middle content-center">
            <span class="">PŘIHLÁŠENÍ ZÁVODNÍCI</span>
          </div>
          <div class="justify-center align-middle content-center">
            <span class="text-customGreen">12</span>
          </div>
        </div>

        <div className="flex gap-5">
          <div className="bg-customWhite w-full rounded-md flex justify-between p-4">
            <img
              src="\src\assets\Fighters\PetrLacek.jpg"
              alt=""
              class="rounded-lg w-16"
            />
            <img
              src="\src\assets\Fighters\PetrLacek.jpg"
              alt=""
              class="rounded-lg w-16"
            />
            <img
              src="\src\assets\Fighters\PetrLacek.jpg"
              alt=""
              class="rounded-lg w-16"
            />
            <img
              src="\src\assets\Fighters\PetrLacek.jpg"
              alt=""
              class="rounded-lg w-16"
            />
            <img
              src="\src\assets\Fighters\PetrLacek.jpg"
              alt=""
              class="rounded-lg w-16"
            />{" "}
            <img
              src="\src\assets\Fighters\PetrLacek.jpg"
              alt=""
              class="rounded-lg w-16"
            />
          </div>
          <div className="bg-customBlack w-full rounded-md flex justify-center">
            <Fighter />
          </div>
        </div>
      </div>
    </>
  );
}

export default Detail;
