import { Link } from "react-router-dom";
import Nabor from "../Components/Nabor";
import Button from "../Components/Button";

function Header() {
  return (
    <>
      <nav className="bg-white dark:bg-customGreen text-black fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2 md:w-3/3">
          <div className="flex space-x-6">
            <Link
              to="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img
                className="h-auto w-20"
                src="../src/assets/Team/Logo.png"
                alt="Logo"
              />
            </Link>

            <Nabor />
          </div>

         <Button />

          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 bg-customGreen"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-customGreen dark:border-gray-700">
              <li>
                <Link
                  to="/admin"
                  className="block py-2 px-3 text-black bg-blue-700 rounded md:bg-transparent md:text-customBlack md:p-0 md:customBlack"
                >
                  ADMIN
                </Link>
              </li>
              <li>
                <Link
                  to="/admin"
                  className="block py-2 px-3 text-black bg-blue-700 rounded md:bg-transparent md:text-customBlack md:p-0 md:customBlack"
                >
                  NÁŠ ODDÍL
                </Link>
              </li>
              <li>
                <Link
                  to="/aktuality"
                  className="block py-2 px-3 text-customGreen rounded hover:bg-gray-100 md:hover:bg-transparent md:text-customBlack md:p-0"
                >
                  AKTUALITY
                </Link>
              </li>
              <li>
                <Link
                  to="/zkousky"
                  className="block py-2 px-3 text-customGreen rounded hover:bg-gray-100 md:hover:bg-transparent md:text-customBlack md:p-0"
                >
                  ZKOUŠKY
                </Link>
              </li>
              <li>
                <Link
                  to="/turnaje"
                  className="block py-2 px-3 text-customGreen rounded hover:bg-gray-100 md:hover:bg-transparent md:text-customBlack md:p-0"
                >
                  TURNAJE
                </Link>
              </li>
              <li>
                <Link
                  to="/zavodnici"
                  className="block py-2 px-3 text-customGreen rounded hover:bg-gray-100 md:hover:bg-transparent md:text-customBlack md:p-0"
                >
                  ZÁVODNÍCI
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="block py-2 px-3 text-customGreen rounded hover:bg-gray-100 md:hover:bg-transparent md:text-customBlack md:p-0"
                >
                  KONTAKT
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
