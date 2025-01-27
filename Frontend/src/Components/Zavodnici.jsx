import Fighter from "./Fighter";
function Zavodnici() {
  return (
    <div className="fighters-container">
      <div class="bg-customWhite h-8 flex justify-between rounded align-middle content-center">
        <div>
          <img src="" alt="" />
          <span>1. DAN</span>
        </div>
        <div>
          {" "}
          <span>Závodníci:</span>
          <span class="text-customGreen"> 4</span>
        </div>
      </div>
      <Fighter />
      <Fighter />
      <Fighter />
      <Fighter />
    </div>
  );
}

export default Zavodnici;
