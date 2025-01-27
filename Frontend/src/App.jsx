import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Zavodnici from "./Components/Zavodnici";
import Contact from "./Components/Contact";
import Admin from "./Components/Admin";
import Container from "./layout/Container";
import Fighter from "./Components/Fighter";
import Aktuality from "./Components/Aktuality";
import Zkousky from "./Components/Zkousky";
import Home from "./Components/Home";


// Komponenty pro jednotlivé stránky





function App() {

  return (
    <Router>
      <Header />

      <Container>
        <Routes> {/* Použití Routes místo Switch */}
        <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} /> {/* Použití element místo component */}
         
          <Route path="/contact" element={<Contact />} />
          <Route path="/zavodnici" element={<Zavodnici />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/aktuality" element={<Aktuality />} />
          <Route path="/zkousky" element={<Zkousky />} />
          {/* Přidej další cesty podle potřeby */}
        </Routes>
      </Container>

    {/*  <Footer />  Povolte, pokud chcete zobrazení footeru */}
    </Router>
  );
}

export default App;
