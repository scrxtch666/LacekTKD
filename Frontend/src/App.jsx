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
import AboutUs from "./Components/AboutUS";
import Detail from "./pages/Turnaje/Detail";
import SideBar from "./layout/_test/Sidebar";
import AdminContainer from "./layout/AdminContainer";
import AddFighter from "./Components/AddFighter";
import FightersAdmin from "./Components/FightersAdmin";
import FooterTest from "./layout/_test/FooterTest";



function Layout() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    // Dynamické routování
    <>
      {isAdmin ? <SideBar /> : <Header />}
      {isAdmin ? (
        <AdminContainer>
          <Routes>
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/pridani-zavodnika" element={<AddFighter />} />
            <Route path="/admin/vsichni-zavodnici" element={<FightersAdmin />} />
            {/* Další admin routy zde */}
          </Routes>
        </AdminContainer>
      ) : (
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/turnaje" element={<Turnaje />} />
            <Route path="/kontakt" element={<Contact />} />
            <Route path="/zavodnici" element={<Zavodnici />} />
            <Route path="/aktuality" element={<Aktuality />} />
            <Route path="/zkousky" element={<Zkousky />} />
            <Route path="/nas-oddil" element={<AboutUs />} />
            <Route path="/detail" element={<Detail />} />
          </Routes>
        </Container>
      )}
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
