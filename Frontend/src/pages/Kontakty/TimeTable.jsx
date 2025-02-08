import React from "react";

function TimeTable() {
  return (
      <div class="bg-customWhite rounded-lg flex w-1/3 items-center p-4 flex-col justify-center">
        <p class="flex flex-col">
          <span class="text-customGreen text-xl font-bold">Pondělí</span>
          <span class="flex flex-col items-center"><span class="text-xs">Začátečníci:</span> 16:00 - 18:00</span>
          <span class="flex flex-col items-center"><span class="text-xs">Pokročilí:</span> 18:00 - 20:00</span>
        </p>
        <p class="flex flex-col">
          <span class="text-customGreen text-xl font-bold">Úterý</span>
          <span class="flex flex-col items-center"><span class="text-xs">Začátečníci:</span> 16:00 - 18:00</span>
          <span class="flex flex-col items-center"><span class="text-xs">Pokročilí:</span> 18:00 - 20:00</span>
        </p>
        <p class="flex flex-col">
          <span class="text-customGreen text-xl font-bold">Středa</span>
          <span class="flex flex-col items-center"><span class="text-xs">Začátečníci:</span> 16:00 - 18:00</span>
          <span class="flex flex-col items-center"><span class="text-xs">Pokročilí:</span> 18:00 - 20:00</span>
        </p>
      </div>
  );
}

export default TimeTable;
