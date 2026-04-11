import Button from "../../Components/LogInButton";

function Newsletter() {
  return (
    <>
      <div className="w-full flex justify-center">
        <div className="lg:w-2/3 w-full">
          <div className="bg-customWhite flex flex-col sm:flex-row justify-evenly items-center p-4 sm:p-6 rounded-xl gap-4 shadow-xl border-2">
            <img
              src="/assets/Team/logo_tkdlacek_white.png"
              alt=""
              className="h-20 sm:h-28 hidden lg:flex"
            />
            <span className="font-bold text-base sm:text-lg lg:text-xl text-center sm:text-left">
              Přihlas se k odběru novinek a zůstaň v obraze!
            </span>
            <input
              type="text"
              placeholder="Zadejte email:"
              className="p-2 rounded-lg w-full sm:w-auto min-w-0"
            />
            <Button />
          </div>
        </div>
      </div>
    </>
  );
}

export default Newsletter;
