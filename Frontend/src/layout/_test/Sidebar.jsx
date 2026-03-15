import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  Image,
  Phone,
  Mailbox,
  ShieldAlert,
  LogOut,
  User,
} from "lucide-react";
import { getUserRole, authService } from "../../utils/auth";

function SideBar() {
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const userRole = getUserRole();

  useEffect(() => {
    authService.getCurrentUser().then((data) => setCurrentUser(data));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("authChange"));
    navigate("/");
  };

  const sections = [
    {
      title: "Obecné",
      adminOnly: true,
      items: [
        { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
        { name: "Aktuality", path: "/admin/aktuality", icon: LayoutDashboard },
        { name: "Zkoušky", path: "/admin/zkousky", icon: LayoutDashboard },
        { name: "Turnaje", path: "/admin/turnaje", icon: LayoutDashboard },
        { name: "Závodníci", path: "/admin/zavodnici", icon: Users },
        { name: "Kontakt", path: "/admin/kontakt", icon: Phone },
      ],
    },
    {
      title: "Správa webu",
      adminOnly: true,
      items: [
        { name: "Banner", path: "/admin/banner", icon: Image },
        { name: "Sponzoři", path: "/admin/sponsors", icon: Image },
        { name: "Uživatelé", path: "/admin/users", icon: Users },
        { name: "Newsletter", path: "/admin/newsletter", icon: Mailbox },
      ],
    },
    {
      title: "Uživatelské možnosti",
      adminOnly: false,
      userOnly: true,
      items: [
        { name: "Můj účet", path: "/admin/me", icon: User },
        { name: "Zkoušky", path: "/admin/test-reg", icon: Image },
        { name: "Turnaje", path: "/admin/tournaments-reg", icon: Users },
      ],
    },
  ];

  const visibleSections = sections.filter((section) => {
    if (section.adminOnly && userRole !== "admin") return false;
    if (section.userOnly && userRole !== "user") return false;
    return true;
  });

  const initials =
    currentUser?.name && currentUser?.surname
      ? `${currentUser.name.charAt(0)}${currentUser.surname.charAt(0)}`
      : currentUser?.login?.charAt(0).toUpperCase() || "?";

  const SidebarContent = () => (
    <aside
      className="h-screen w-64 fixed top-0 left-0 text-white z-50 flex flex-col"
      style={{
        background:
          "linear-gradient(180deg, #15803d 0%, #166534 60%, #14532d 100%)",
      }}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-green-600 flex-shrink-0">
        <Link to="/" className="text-xl font-bold tracking-wide">
          LacekTKD
        </Link>
        <button
          className="lg:hidden text-green-200 hover:text-white"
          onClick={() => setOpen(false)}
        >
          <X size={22} />
        </button>
      </div>

      {/* Nav */}
      <nav className="p-4 overflow-y-auto flex-1 space-y-5">
        {visibleSections.map((section) => (
          <div key={section.title}>
            <div className="flex items-center gap-2 px-2 mb-2">
              {section.adminOnly && (
                <ShieldAlert size={12} className="text-green-200 opacity-70" />
              )}
              <span className="text-xs font-semibold uppercase tracking-widest text-green-200 opacity-70">
                {section.title}
              </span>
            </div>

            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className={`
                      flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 text-sm
                      ${
                        isActive
                          ? "bg-white/20 text-white font-semibold shadow-inner"
                          : "text-green-100 hover:bg-white/10 hover:text-white"
                      }
                    `}
                  >
                    <Icon size={17} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Uživatel dole */}
      <div className="border-t border-green-600 p-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          {currentUser?.img_path ? (
            <img
              src={currentUser.img_path}
              alt={currentUser.login}
              className="w-9 h-9 rounded-xl object-cover flex-shrink-0"
            />
          ) : (
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              {initials}
            </div>
          )}

          {/* Jméno + role */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">
              {currentUser?.name && currentUser?.surname
                ? `${currentUser.name} ${currentUser.surname}`
                : currentUser?.login || "..."}
            </p>
            <p className="text-xs text-green-200 opacity-80 truncate">
              {currentUser?.role || ""}
            </p>
          </div>

          {/* Odhlášení */}
          <button
            onClick={handleLogout}
            className="flex-shrink-0 p-1.5 rounded-lg text-green-200 hover:bg-white/10 hover:text-white transition-colors"
            title="Odhlásit se"
          >
            <LogOut size={17} />
          </button>
        </div>
      </div>
    </aside>
  );

  return (
    <>
      {/* Mobile header */}
      <div
        className="lg:hidden flex items-center justify-between p-4 text-white sticky top-0 z-50"
        style={{ background: "#15803d" }}
      >
        <button onClick={() => setOpen(true)}>
          <Menu size={24} />
        </button>
        <span className="font-semibold">LacekTKD Admin</span>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar – desktop vždy viditelný, mobile slide-in */}
      <div
        className={`
        fixed top-0 left-0 z-50 transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
      >
        <SidebarContent />
      </div>
    </>
  );
}

export default SideBar;
