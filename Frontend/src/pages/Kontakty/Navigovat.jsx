import { Link } from "react-router-dom";
import React from "react";
function Navigovat() {
  return (
    <>
  <div className="md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse hidden lg:flex">
            <button
              type="button"
              className="text-customGreen bg-customGreen focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-customGreen flex items-center space-x-1 border border-customGreen w-full justify-center"
            >
              <div className="relative inline-flex rounded-full h-5 w-5 bg-customGreen items-center">
                <img
                  className="px-0.6 py-0.6 h-4"
                  src="../src/assets/Icons/navigate.png"
                  alt="Login"
                />
              </div>
              <span class="text-customWhite">Navigovat</span>
            </button>
          </div>
    </>
  );
}

export default Navigovat;
