function Stats() {
  return (
    <>
      <div class="card w-full">
        <span class="font-bold uppercase">Statistiky</span>
        <hr />
        <div className="flex justify-between">
          <div className="flex flex-col justify-center items-center">
            <span>Počet závodníků:</span>
            <span className="font-bold text-customGreen">69</span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <span>Počet akcí:</span>
            <span className="font-bold text-customGreen">23</span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <span>Počet závodníků:</span>
            <span className="font-bold text-customGreen">69</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Stats;
