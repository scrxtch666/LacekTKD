import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Zavodnici from "./Components/Zavodnici";
import Contact from "./Components/Contact";
import Aktuality from "./Components/Aktuality";
import Zkousky from "./Components/Zkousky";
import Home from "./Components/Home";
import Turnaje from "./Components/Turnaje";
import AboutUs from "./Components/AboutUS";
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
import AdminRequests from "./pages/_Admin/AdminRequests";
import FighterDetail from "./pages/Zavodnici/FighterDetail";
import AdminZkousky from "./pages/_Admin/AdminZkousky";
import Gdpr from "./pages/Login/Gdpr";
import NotFound from "./pages/Login/NotFound";

import PublicLayout from "./layout/PublicLayout";
import AdminLayout from "./layout/AdminLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/turnaje" element={<Turnaje />} />
          <Route path="/kontakt" element={<Contact />} />
          <Route path="/zavodnici" element={<Zavodnici />} />
          <Route path="/aktuality" element={<Aktuality />} />
          <Route path="/zkousky" element={<Zkousky />} />
          <Route path="/nas-oddil" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/aktualita/:id" element={<AktualitaDetail />} />
          <Route path="/turnaj/:id" element={<TurnajDetail />} />
          <Route path="/zavodnik/:id" element={<FighterDetail />} />
          <Route path="/gdpr" element={<Gdpr />} />
        </Route>

        <Route element={<AdminLayout />}>
          <Route
            element={
              <ProtectedRoute allowedRoles={["admin", "trainer", "user"]} />
            }
          >
            <Route path="/admin/me" element={<AdminMe />} />
            <Route path="/admin/zkousky" element={<AdminZkousky />} />
            <Route path="/admin/turnaje" element={<AdminTurnaje />} />
          </Route>

          <Route
            element={<ProtectedRoute allowedRoles={["admin", "trainer"]} />}
          >
            <Route path="/admin/zavodnici" element={<AdminZavodnici />} />
            <Route path="/admin/aktuality" element={<AdminAktuality />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin/banner" element={<AdminBanner />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/zadosti" element={<AdminRequests />} />
            <Route path="/admin/sponsors" element={<AdminSponsors />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
