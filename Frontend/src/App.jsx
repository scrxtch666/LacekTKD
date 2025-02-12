import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Container from "./layout/Container";
import Zavodnici from "./Components/Zavodnici";
import Contact from "./Components/Contact";
import Aktuality from "./Components/Aktuality";
import Zkousky from "./Components/Zkousky";
import Home from "./Components/Home";
import Admin from "./Components/Admin";
import Turnaje from "./Components/Turnaje";
import AdminHeader from "./layout/_test/AdminHeader";
import AboutUs from "./Components/AboutUS";


function Layout() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <>
      {isAdmin ? <AdminHeader /> : <Header />}
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/turnaje" element={<Turnaje />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/zavodnici" element={<Zavodnici />} />
          <Route path="/aktuality" element={<Aktuality />} />
          <Route path="/zkousky" element={<Zkousky />} />
          <Route path="/nas-oddil" element={<AboutUs />} />
        </Routes>
      </Container>
      {!isAdmin && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
