function Detail() {
  return (
    <>
      <div className="devider">detail proběhlého turnaje</div>

      <div className="flex gap-5">
        <div className="card w-full">
        <span className="font-extrabold text-xl">xx</span>
          <div className="flex justify-between
          ">
            

            <p className="flex gap-1 items-center">
              <img
                src="/assets/Icons/Location.png"
                alt=""
                className="h-5"
              />
              <span className="text-customGreen font-bold">Lokace:</span>
              xx
            </p>
            <p className="flex gap-1 items-center">
              <img src="/assets/Icons/Type.png" alt="" className="h-5" />
              <span className="text-customGreen font-bold">Typ akce: </span>
              yy
            </p>
            <p className="flex gap-1 items-center">
              <img src="/assets/Icons/Date.png" alt="" className="h-5" />
              <span className="text-customGreen font-bold">Datum: </span>
              xx
            </p>
            <br />
          </div>
          <p className="flex gap-1 items-center">
              <img src="/assets/Icons/Info.png" alt="" className="h-5" />
              <span className="text-customGreen font-bold">Informace: </span>
              info
            </p>
            <p className="flex gap-1 items-center">
              <img src="/assets/Icons/Info.png" alt="" className="h-5" />
              <span className="text-customGreen font-bold">Výsledky: </span>
              info
            </p>
        </div>

        <div className="card w-full gap-5 justify-between flex flex-col">
          <div className="bg-alertRed flex justify-center">
          <img
                src="/assets/Events/BT_open.jpg"
                alt="xxx"
                className="object-cover object-center rounded-md h-full hidden lg:flex"
              />
          </div>
          <div className="bg-customGreen rounded-md">C</div>
        </div>

      </div>

      <div className="devider">účastníci</div>

      <div className="card">Aleš Lin Mocek</div>
    </>
  );
}

export default Detail;
