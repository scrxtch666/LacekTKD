import { Link } from "react-router-dom";
import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

function Login() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      <div>Tady bude login page</div>
      <p>Bycript na hesla a JWT na autentizaci</p>
    </>
  );
}

export default Login;
