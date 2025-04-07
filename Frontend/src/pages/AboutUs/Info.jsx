import { useState, useEffect } from "react";
function Info() {
    const [count, setCount] = useState(null);
  
    useEffect(() => {
      fetch("http://localhost:3000/api/fighters/countAll")
          .then((res) => res.json())
          .then((data) => setCount(data.count))
          .catch((error) => console.error("Chyba při načítání:", error));
  }, []);
  return (
    <>
      <div className="flex gap-5">
        <div className="card">
          <span className="font-bold text-2xl">Taekwondo LACEK</span>
          <p>
            Sportovní klub Taekwondo Lacek je významným oddílem taekwonda v
            České republice, sídlícím v Pelhřimově.
          </p>
          <p>
            Založen byl 19. května 1995 jako Klub Taekwondo WTF Humpolec a je
            nejstarším aktivně fungujícím oddílem taekwonda v zemi.
          </p>
          <p>
            V roce 2008 došlo k přejmenování na Sportovní klub Taekwondo Lacek a
            k přesunu sídla do Pelhřimova.
          </p>
          <p>
            Klub je otevřen všem zájemcům bez ohledu na věk, pohlaví či
            
            národnost a nabízí tréninky v Pelhřimově a Humpolci.
          </p>
          <p>
            Během své existence dosáhl klub mnoha úspěchů, včetně titulů mistra
            České republiky v letech 1999, 2000 a 2008 až 2019.
          </p>
          <p>
            Také pravidelně vítězil v České národní lize od roku 2007 do roku
            2018.
          </p>
          <p>V roce 2013 obsadil 4. místo na Mistrovství Evropy oddílů.</p>
          <p>
            Tréninky v Pelhřimově probíhají na ZŠ Komenského v pondělí a středu
            od 16:00 do 18:00 pro začátečníky a od 18:00 do 20:00 pro pokročilé.
          </p>
          <p>
            Pro více informací můžete navštívit oficiální webové stránky klubu
            na adrese <a href="https://www.tkdlacek.cz/">www.tkdlacek.cz</a>{" "}
            nebo kontaktovat trenéra Petra Lacka na telefonním čísle +420 724
            209 910 či e-mailu{" "}
            <a href="mailto:tkdlacek@gmail.com">tkdlacek@gmail.com</a>.
          </p>
        </div>

        <div className=" card w-1/3 flex flex-col justify-between">
          <div className="flex flex-col justify-center items-center">
            <img
              className="bg-customGreen rounded-full p-2 border-2 border-customWhite"
              src="../src/assets/Icons/world.png"
              alt="Logo"
            />
            <p className="text-customGreen font-medium">36 navštívených zemí</p>
          </div>

          <div className="flex flex-col justify-center items-center">
            <img
              className="bg-customGreen rounded-full p-2 border-2 border-customWhite max-h-20 h-full"
              src="../src/assets/Icons/trophy_w.png"
              alt="Logo"
            />
            <p className="text-customGreen font-medium">
              účast na 72 akcích ročně
            </p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <img
              className="bg-customGreen rounded-full p-2 border-2 border-customWhite"
              src="../src/assets/Icons/fighters_w.png"
              alt="Logo"
            />
            <p className="text-customGreen font-medium">{count !== null ? count : "Načítám..."} členů oddílu</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Info;
