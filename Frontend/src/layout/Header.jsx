import { Link } from "react-router-dom";
import Nabor from "../Components/Nabor";
import LogInButton from "../Components/LogInButton";
import { useState, useEffect } from "react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`${
        isScrolled ? "bg-customGreen" : "bg-white"
      } text-black fixed w-full z-20 top-0 start-0 dark:border-gray-600 transition-colors duration-300`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-2 px-5">
        <div className="flex items-center space-x-6">
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

        <div className="flex lg:order-2 space-x-3 lg:space-x-0 rtl:space-x-reverse">
          <LogInButton />
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-customBlack rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-customGreen"
            aria-controls="navbar-sticky"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Otevřít menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        <div
          className={`items-center justify-between ${
            isMenuOpen ? "block" : "hidden"
          } w-full lg:flex lg:w-auto lg:order-1`}
          id="navbar-sticky"
        >
          <ul
            className={`flex flex-col p-4 lg:p-0 mt-4 font-medium border border-customWhite rounded-lg ${
              isScrolled ? "bg-customGreen" : "bg-customWhite"
            } lg:space-x-8 rtl:space-x-reverse lg:flex-row lg:mt-0 lg:border-0 ${
              isScrolled ? "lg:bg-customGreen" : "lg:bg-white"
            } dark:border-gray-700 transition-colors duration-300`}
          >
            {[
              { to: "/admin", text: "Admin" },
              { to: "/nas-oddil", text: "Náš oddíl" },
              { to: "/aktuality", text: "Aktuality" },
              { to: "/zkousky", text: "Zkoušky" },
              { to: "/turnaje", text: "Turnaje" },
              { to: "/zavodnici", text: "Závodníci" },
              { to: "/kontakt", text: "Kontakt" },
            ].map((item) => (
              <li key={item.to}
              className="hover:bg-customGreen rounded-md p-1">
                <Link
                  to={item.to}
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-customGreen lg:hover:bg-customGreen lg:hover:text-customGreen lg:p-0 dark:text-customBlack dark:hover:bg-customGreen dark:hover:text-customBlack lg:dark:hover:bg-transparent"
                  onClick={toggleMenu}
                >
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
