import { Link } from "react-router-dom";
import React, { useState } from "react";
import Modal from "react-modal";
import Button from "./Button";

Modal.setAppElement("#root");

function LogInButton() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      <div className="md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse hidden lg:flex">
        <button
          type="button"
          className="text-customGreen bg-customWhite font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-customWhite flex items-center space-x-1 border border-customGreen"
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
        className="bg-customWhite p-2 rounded-lg shadow-lg max-w-lg mx-auto mt-20 flex flex-col items-center w-96 pb-5"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <div className="w-full flex justify-end">
          <img
            src="../src/assets/Icons/cross.png"
            alt=""
            class=""
            onClick={() => setModalIsOpen(false)}
          />
        </div>
        <img src="../src/assets/Team/logo_tkdlacek_white.png" alt="" class="" />
        <hr class="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded-sm dark:bg-customBlack" />
        <div className="flex flex-col gap-2">
          <label>
            <p>Email:</p>
            <input
              name="myInput"
              className="rounded-md border-2 border-customBlack px-2"
              placeholder="Zadejte emial"
            />
          </label>
          <label>
            <p>Heslo:</p>
            <input
              name="myInput"
              className="rounded-md border-2 border-customBlack px-2"
              placeholder="Zadejte heslo"
            />
          </label>
          <div class="flex items-center mb-4">
            <input
              id="default-checkbox"
              type="checkbox"
              value=""
              class="w-4 h-4 text-customGreen bg-gray-100 border-gray-300 rounded-sm focus:ring-customGreen dark:focus:ring-customGreen dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="default-checkbox"
              class="ms-2 text-xs text-gray-900 dark:text-customBlack"
            >
              Zapamatovat
            </label>
          </div>
        </div>

        <div className="flex justify-between">
          {/*
          <button
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            onClick={() => setModalIsOpen(false)}
          >
            Zavřít
          </button>
          */}
         <Button />
        </div>
      </Modal>
    </>
  );
}

export default LogInButton;
