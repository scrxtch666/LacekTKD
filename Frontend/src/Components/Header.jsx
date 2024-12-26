import { useState } from "react";



function Header() {
  const [count, setCount] = useState(0);

  return (
    <>
      
       
      <nav class="bg-white dark:bg-customGreen text-black fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div class="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-2 md:w-3/3">
          <div class="flex space-x-6">
            <a
              href="https://www.tkdlacek.cz/"
              class="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img
                class="h-auto w-20"
                src="../src/assets/Logo.png"
                alt="image description"
              ></img>
            </a>
            
            <button
              type="button"
              class="relative flex items-center justify-center text-customGreen bg-customWhite rounded-lg text-sm text-center dark:bg-customWhite space-x-6 w-200px"
            >
            
               <a
              href="https://www.tkdlacek.cz/">
                <div>
              <div class="absolute top-1/2 left-5 transform -translate-x-1/2 -translate-y-1/2 flex h-4 w-4">
                <div class="animate-ping absolute inline-flex h-full w-full rounded-full bg-customGreen opacity-75"></div>
                <div class="relative inline-flex rounded-full h-4 w-4 bg-customGreen"></div>
              </div>
              </div>
              <div class="flex justify-center align-middle text-xs w-40 h-8 items-center font-semibold">
                NÁBOR OTEVŘEN
              </div>
              </a>
             
            </button>
            
          </div>

          <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              class="text-customGreen bg-customWhite focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-customWhite flex items-center space-x-1"
            >
              {" "}
              <div class="relative inline-flex rounded-full h-5 w-5 bg-customGreen">
                <img
                  class="px-0.6 py-0.6"
                  src="../src/assets/login.png"
                  alt="image description"
                ></img>
              </div>
              <span>Přihlášení</span>
            </button>
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span class="sr-only">Open main menu</span>
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 bg-customGreen"
            id="navbar-sticky"
          >
            <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-customGreen dark:border-gray-700">
              <li>
                <a
                  href="#"
                  class="block py-2 px-3 text-black bg-blue-700 rounded md:bg-transparent md:text-customBlack md:p-0 md:customBlack"
                  aria-current="page"
                >
                  NÁŠ ODDÍL
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block py-2 px-3 text-customGreen rounded hover:bg-gray-100 md:hover:bg-transparent md:text-customBlack md:p-0 md:dark:hover:text-customBlack dark:text-customBlack dark:hover:bg-gray-700 dark:hover:text-black md:dark:hover:bg-transparent dark:border-gray-700 bg-customGreen"
                >
                  AKTUALITY
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block py-2 px-3 text-customGreen rounded hover:bg-gray-100 md:hover:bg-transparent md:text-customBlack md:p-0 md:dark:hover:text-customBlack dark:text-customBlack dark:hover:bg-gray-700 dark:hover:text-black md:dark:hover:bg-transparent dark:border-gray-700 bg-customGreen"
                >
                  ZKOUŠKY
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block py-2 px-3 text-customGreen rounded hover:bg-gray-100 md:hover:bg-transparent md:text-customBlack md:p-0 md:dark:hover:text-customBlack dark:text-customBlack dark:hover:bg-gray-700 dark:hover:text-black md:dark:hover:bg-transparent dark:border-gray-700 bg-customGreen"
                >
                  TURNAJE
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block py-2 px-3 text-customGreen rounded hover:bg-gray-100 md:hover:bg-transparent md:text-customBlack md:p-0 md:dark:hover:text-customBlack dark:text-customBlack dark:hover:bg-gray-700 dark:hover:text-black md:dark:hover:bg-transparent dark:border-gray-700 bg-customGreen"
                >
                  ZÁVODNÍCI
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block py-2 px-3 text-customGreen rounded hover:bg-gray-100 md:hover:bg-transparent md:text-customBlack md:p-0 md:dark:hover:text-customBlack dark:text-customBlack dark:hover:bg-gray-700 dark:hover:text-black md:dark:hover:bg-transparent dark:border-gray-700 bg-customGreen"
                >
                  KONTAKT
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      
    </>
  );
}

export default Header;
