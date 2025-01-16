import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Contact from "./Components/Contact";
import Admin from "./Components/Admin";
import Container from "./Components/Container";
import Fighter from "./Components/Fighter";
import Aktuality from "./Components/Aktuality";

import Home from "./Components/Home";

// Komponenty pro jednotlivé stránky





function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Header />

      <Container>
        <Routes> {/* Použití Routes místo Switch */}
          <Route path="/home" element={<Home />} /> {/* Použití element místo component */}
         
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/aktuality" element={<Aktuality />} />
          {/* Přidej další cesty podle potřeby */}
        </Routes>
      </Container>

      <Footer /> {/* Povolte, pokud chcete zobrazení footeru */}
    </Router>
  );
}

export default App;
