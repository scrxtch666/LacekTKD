import { Link } from "react-router-dom";
import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

function Button() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      <div className="md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse hidden lg:flex">
        <button
          type="button"
          className="text-customGreen bg-customWhite focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-customWhite flex items-center space-x-1 border border-customGreen"
          onClick={() => setModalIsOpen(true)}
        >
          <div className="relative inline-flex rounded-full h-5 w-5 bg-customGreen">
            <img
              className="px-0.6 py-0.6"
              src="../src/assets/Icons/login.png"
              alt="Login"
            />
          </div>
          <span>Přihlášení</span>
        </button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="bg-customWhite p-6 rounded-lg shadow-lg max-w-md mx-auto mt-20 flex flex-col items-center gap-5"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <img
          src="../src/assets/Team/logo_tkdlacek_white.png"
          alt=""
          class="h-28"
        />
        <label>
          Email{" "}
          <input
            name="myInput"
            className="rounded-md border-2 border-customBlack"
          />
        </label>
        <label>
          Heslo{" "}
          <input
            name="myInput"
            className="rounded-md border-2 border-customBlack"
          />
        </label>

        <div className="">
          <button
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            onClick={() => setModalIsOpen(false)}
          >
            Zavřít
          </button>
          <Button />
        </div>
      </Modal>
    </>
  );
}

export default Button;
