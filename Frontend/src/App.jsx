import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
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
import Login from "./Components/Login";
import Register from "./Components/Register";
import ProtectedRoute from "./pages/Login/ProtectedRoute";
import AdminBanner from "./pages/_Admin/AdminBanner";
import AdminAktuality from "./pages/_Admin/AdminAktuality";
import AdminUsers from "./pages/_Admin/AdminUsers";
import AdminSponsors from "./pages/_Admin/AdminSponsors";
import AdminZavodnici from "./pages/_Admin/AdminZavodnici";

function Layout() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  // Dynamické routování
  if (isAdmin) {
    return (
      <ProtectedRoute>
        <div className="flex min-h-screen bg-slate-100">
          <SideBar />

          <main className="flex-1 p-8 lg:ml-64 w-full">
            <Routes>
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/pridani-zavodnika" element={<AddFighter />} />
              <Route
                path="/admin/vsichni-zavodnici"
                element={<FightersAdmin />}
              />
              <Route path="/admin/banner" element={<AdminBanner />} />
              <Route path="/admin/aktuality" element={<AdminAktuality />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/sponsors" element={<AdminSponsors />} />
              <Route path="/admin/zavodnici" element={<AdminZavodnici />} />
            </Routes>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <>
      <Header />
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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Container>
      <Footer />
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
