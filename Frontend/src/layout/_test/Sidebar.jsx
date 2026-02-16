import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LayoutDashboard, Users, FileText, Settings, Image, Phone, Mailbox } from "lucide-react";

function SideBar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Náš oddíl", path: "/admin/nas-oddil", icon: LayoutDashboard },
    { name: "Aktuality", path: "/admin/aktuality", icon: LayoutDashboard },
    { name: "Zkoušky", path: "/admin/zkousky", icon: LayoutDashboard },
    { name: "Turnaje", path: "/admin/turnaje", icon: LayoutDashboard },
    { name: "Závodníci", path: "/admin/zavodnici", icon: Users },
    { name: "Kontakt", path: "/admin/kontakt", icon: Phone },
    { name: "Dokumenty", path: "/admin/dokumenty", icon: FileText },
    { name: "Nastavení", path: "/admin/nastaveni", icon: Settings },
    { name: "Banner", path: "/admin/banner", icon: Image },
    { name: "Newsletter", path: "/admin/newsletter", icon: Mailbox },
    { name: "Uživatelé", path: "/admin/users", icon: Users },
  ];

  return (
    <>
      {/* MOBILE TOP BAR */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-slate-900 text-white sticky top-0 z-50">
        <button onClick={() => setOpen(true)}>
          <Menu size={24} />
        </button>
        <span className="font-semibold">Admin Panel</span>
      </div>

      {/* OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          h-screen w-64 
          fixed top-0 left-0 bg-slate-900 text-slate-300
          transform transition-transform duration-300 z-50
          flex flex-col
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 flex-shrink-0">
          <Link to="/" className="text-xl font-bold text-white">
            LacekTKD
          </Link>

          <button
            className="lg:hidden"
            onClick={() => setOpen(false)}
          >
            <X size={22} />
          </button>
        </div>

        {/* NAVIGATION - scrollovatelná část */}
        <nav className="p-4 space-y-2 overflow-y-auto flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-200
                  ${isActive
                    ? "bg-slate-800 text-white"
                    : "hover:bg-slate-800 hover:text-white"}
                `}
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

export default SideBar;