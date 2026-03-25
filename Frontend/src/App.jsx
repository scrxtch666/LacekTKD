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
import AddFighter from "./Components/AddFighter";
import FightersAdmin from "./Components/FightersAdmin";
import Login from "./Components/Login";
import Register from "./Components/Register";
import ProtectedRoute from "./pages/Login/ProtectedRoute";
import AdminBanner from "./pages/_Admin/AdminBanner";
import AdminAktuality from "./pages/_Admin/AdminAktuality";
import AdminUsers from "./pages/_Admin/AdminUsers";
import AdminSponsors from "./pages/_Admin/AdminSponsors";
import AdminZavodnici from "./pages/_Admin/AdminZavodnici";
import AdminTurnaje from "./pages/_Admin/AdminTurnaje";
import AdminMe from "./pages/_Admin/AdminMe";
import AktualitaDetail from "./pages/Home/AktualitaDetail";
import TurnajDetail from "./pages/Turnaje/TurnajDetail";

function Layout() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  if (isAdmin) {
    return (
      // Chráněné admin routy

      <div className="flex min-h-screen bg-slate-100">
        <SideBar />

        <main className="flex-1 p-8 lg:ml-64 w-full">
          <Routes>
            {/* Veřejné admin routy – jen přihlášený */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={["admin", "trainer", "user"]}>
                  <Admin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/me"
              element={
                <ProtectedRoute allowedRoles={["admin", "trainer", "user"]}>
                  <AdminMe />
                </ProtectedRoute>
              }
            />

            {/* Admin + trenér */}
            <Route
              path="/admin/zavodnici"
              element={
                <ProtectedRoute allowedRoles={["admin", "trainer"]}>
                  <AdminZavodnici />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/turnaje"
              element={
                <ProtectedRoute allowedRoles={["admin", "trainer", "user"]}>
                  <AdminTurnaje />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/pridani-zavodnika"
              element={
                <ProtectedRoute allowedRoles={["admin", "trainer"]}>
                  <AddFighter />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/vsichni-zavodnici"
              element={
                <ProtectedRoute allowedRoles={["admin", "trainer"]}>
                  <FightersAdmin />
                </ProtectedRoute>
              }
            />

            {/* Pouze admin */}
            <Route
              path="/admin/aktuality"
              element={
                <ProtectedRoute allowedRoles={["admin", "trainer"]}>
                  <AdminAktuality />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/banner"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminBanner />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminUsers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/sponsors"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminSponsors />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
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
          <Route path="/aktuality/:id" element={<AktualitaDetail />} />
          <Route path="/turnaje/:id" element={<TurnajDetail />} />
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
