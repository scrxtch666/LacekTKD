function FighterUdaje() {
  return (
    <>
      <div className="card flex justify-between w-1/2 h-max gap-5 flex-col">
        <span className="font-bold uppercase">Přihlašovací údaje</span>

        <div className="flex gap-5">
          <input
            name="myInput  "
            className="rounded-md border-2 border-customGreen border-dotted bg-customWhite px-2 w-full"
            placeholder="Telefonní číslo"
          />

          <input
            name="myInput  "
            className="rounded-md border-2 border-customGreen border-dotted bg-customWhite px-2 w-full"
            placeholder="Email"
          />
        </div>

        <div className="flex gap-5">
          <input
            name="myInput  "
            className="rounded-md border-2 border-customGreen border-dotted bg-customWhite px-2 w-full"
            placeholder="login"
          />

          <input
            name="myInput  "
            className="rounded-md border-2 border-customGreen border-dotted bg-customWhite px-2 w-full"
            placeholder="heslo"
          />
        </div>

        <div className="flex gap-5">
          <input
            name="myInput  "
            className="rounded-md border-2 border-customGreen border-dotted bg-customWhite px-2 w-full"
            placeholder="role"
          />

          <input
            name="myInput  "
            className="rounded-md border-2 border-customGreen border-dotted bg-customWhite px-2 w-full"
            placeholder="datum narození"
            type="date"
          />
        </div>
      </div>
    </>
  );
}

export default FighterUdaje;
