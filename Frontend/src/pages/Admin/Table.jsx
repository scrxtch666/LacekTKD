function Table() {
  return (
    <>
      <div className="card">
        <span>Přehledová tabulka</span>
        <hr />
        <div className="flex justify-between">
          <div>Název</div>

          <div className="flex gap-24">
            <p>Typ</p>
            <p>Lokace</p>
            <p>Datum</p>
            <p>Počet závodníků</p>
          </div>
        </div>
        <hr />

        <div className="flex justify-between">
          <div>BRATISLAVA OPEN</div>

          <div className="flex gap-24">
            <p>Turnaj</p>
            <p>Bratislava</p>
            <p>18.05.2025</p>
            <p>27</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Table;
