import { Link } from "react-router-dom";
import React from "react";
function Info() {
  return (
    <>
 <div className="bg-customWhite rounded-lg p-2">
        <p>
          Zkoušky probíhají standartně v Pelhřimově v tělocvičně, kde trénujeme.
          Pokud při zkoušce neuspějete, získáte mezistupeň pásku na který jste
          zkoušku absolvovali. Zkouška proběhne
          <span className="text-customGreen font-bold"> 22. 12. 2024</span>
        </p>

        <p>
          Na zkoušky si s sebou vezměte celý dobok, svazový průkaz případně na
          místě za 150 Kč. Pakliže vaše dítě dělá první zkoušky a vše umí na
          žlutý pásek tzn. 8.kup. Musíte zaplatit: poplatek za komisaře - 100 Kč
          + 9.kup - 150 Kč + 8.kup - 250 Kč =
          <span class="font-bold"> 500 Kč</span>
        </p>
      </div>
    </>
  );
}

export default Info;
