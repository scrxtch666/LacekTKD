function Table() {
  return (
    <>
      <div className="card">
        <span className="font-bold uppercase">Přehledová tabulka</span>
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

      <table class="table-auto">
  <thead>
    <tr>
      <th>Song</th>
      <th>Artist</th>
      <th>Year</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
      <td>Malcolm Lockyer</td>
      <td>1961</td>
    </tr>
    <tr>
      <td>Witchy Woman</td>
      <td>The Eagles</td>
      <td>1972</td>
    </tr>
    <tr>
      <td>Shining Star</td>
      <td>Earth, Wind, and Fire</td>
      <td>1975</td>
    </tr>
  </tbody>
</table>
    </>
  );
}

export default Table;
