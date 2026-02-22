import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LayoutDashboard, Users, FileText, Settings, Image, Phone, Mailbox, ShieldAlert } from "lucide-react";

// Simulovaná role – nahraď svým auth systémem
const useUserRole = () => {
  return "admin"; // "admin" | "trainer" | "user"
};

function SideBar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const userRole = useUserRole();

  const sections = [
    {
      title: "Obecné",
      adminOnly: false,
      items: [
        { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
        { name: "Náš oddíl", path: "/admin/nas-oddil", icon: LayoutDashboard },
        { name: "Aktuality", path: "/admin/aktuality", icon: LayoutDashboard },
        { name: "Zkoušky", path: "/admin/zkousky", icon: LayoutDashboard },
        { name: "Turnaje", path: "/admin/turnaje", icon: LayoutDashboard },
        { name: "Závodníci", path: "/admin/zavodnici", icon: Users },
        { name: "Kontakt", path: "/admin/kontakt", icon: Phone },
        { name: "Dokumenty", path: "/admin/dokumenty", icon: FileText },
      ],
    },
    {
      title: "Správa webu",
      adminOnly: false,
      items: [
        { name: "Banner", path: "/admin/banner", icon: Image },
        { name: "Newsletter", path: "/admin/newsletter", icon: Mailbox },
        { name: "Sponzoři", path: "/admin/sponsors", icon: Image },
        { name: "Nastavení", path: "/admin/nastaveni", icon: Settings },
      ],
    },
    {
      title: "Administrace",
      adminOnly: true,
      items: [
        { name: "Uživatelé", path: "/admin/users", icon: Users },
        { name: "Role a oprávnění", path: "/admin/roles", icon: ShieldAlert },
      ],
    },
  ];

  const visibleSections = sections.filter(
    (section) => !section.adminOnly || userRole === "admin"
  );

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
          <button className="lg:hidden" onClick={() => setOpen(false)}>
            <X size={22} />
          </button>
        </div>

        {/* NAVIGATION */}
        <nav className="p-4 overflow-y-auto flex-1 space-y-6">
          {visibleSections.map((section) => (
            <div key={section.title}>
              {/* Název sekce */}
              <div className="flex items-center gap-2 px-2 mb-2">
                {section.adminOnly && (
                  <ShieldAlert size={13} className="text-rose-400" />
                )}
                <span className={`text-xs font-semibold uppercase tracking-widest ${section.adminOnly ? "text-rose-400" : "text-slate-500"}`}>
                  {section.title}
                </span>
              </div>

              {/* Položky */}
              <div className="space-y-1">
                {section.items.map((item) => {
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
              </div>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}

export default SideBar;