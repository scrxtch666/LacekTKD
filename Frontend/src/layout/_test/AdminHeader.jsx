import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function AdminHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-20 top-0 start-0 border-b transition-all duration-300 ${
        scrolled ? "bg-customWhite shadow-lg" : "bg-white dark:bg-customWhite"
      }`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2 md:w-3/3">
        <div className="flex space-x-6">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img className="h-auto w-20" src="../src/assets/Logo.png" alt="Logo" />
          </Link>

        
        </div>

        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            className="text-customGreen bg-customWhite focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-customWhite flex items-center space-x-1"
          >
            <div className="relative inline-flex rounded-full h-5 w-5 bg-customGreen">
              <img className="px-0.6 py-0.6" src="../src/assets/login.png" alt="Login" />
            </div>
            <span>Přihlášení</span>
          </button>
        </div>

        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 bg-customGreen"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-customGreen dark:border-gray-700">
            <li>
              <Link to="/home" className="block py-2 px-3 text-black rounded md:bg-transparent md:text-customBlack md:p-0">
                Domů
              </Link>
            </li>
            <li>
              <Link to="/admin" className="block py-2 px-3 text-black rounded md:bg-transparent md:text-customBlack md:p-0">
                NÁŠ ODDÍL
              </Link>
            </li>
            <li>
              <Link to="/aktuality" className="block py-2 px-3 text-customGreen rounded hover:bg-gray-100 md:hover:bg-transparent md:text-customBlack md:p-0">
                AKTUALITY
              </Link>
            </li>
            <li>
              <Link to="/zkousky" className="block py-2 px-3 text-customGreen rounded hover:bg-gray-100 md:hover:bg-transparent md:text-customBlack md:p-0">
                ZKOUŠKY
              </Link>
            </li>
            <li>
              <Link to="/turnaje" className="block py-2 px-3 text-customGreen rounded hover:bg-gray-100 md:hover:bg-transparent md:text-customBlack md:p-0">
                TURNAJE
              </Link>
            </li>
            <li>
              <Link to="/zavodnici" className="block py-2 px-3 text-customGreen rounded hover:bg-gray-100 md:hover:bg-transparent md:text-customBlack md:p-0">
                ZÁVODNÍCI
              </Link>
            </li>
            <li>
              <Link to="/contact" className="block py-2 px-3 text-customGreen rounded hover:bg-gray-100 md:hover:bg-transparent md:text-customBlack md:p-0">
                KONTAKT
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default AdminHeader;
