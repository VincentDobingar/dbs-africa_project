import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Mail,
  FileText,
  Settings,
  Users,
  LogOut,
  Menu,
  Bell,
  CalendarDays,
  Newspaper,
  Briefcase,
  Image,
  Handshake,
} from "lucide-react";
import { useState } from "react";

import dbsLogo from "../../assets/logo/dbs-logo1.png";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [openSidebar, setOpenSidebar] = useState(false);

  const user = JSON.parse(localStorage.getItem("dbs_admin_user") || "{}");

  const logout = () => {
    localStorage.removeItem("dbs_admin_token");
    localStorage.removeItem("dbs_admin_user");
    navigate("/admin/login");
  };

  const links = [
    {
      label: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
    },
    {
      label: "Messages",
      path: "/admin/messages",
      icon: Mail,
      badge: 12,
    },
    {
      label: "Devis",
      path: "/admin/quotes",
      icon: FileText,
      badge: 7,
    },
    {
      label: "Partenaires",
      path: "/admin/partners",
      icon: Handshake,
    },
    {
    label: "Actualités",
    path: "/admin/actualites",
    icon: Newspaper,
    },
    {
    label: "Portfolio",
    path: "/admin/portfolio",
    icon: Image,
    },
    {
      label: "Paramètres",
      path: "/admin/settings",
      icon: Settings,
    },
    {
      label: "Utilisateurs",
      path: "/admin/users",
      icon: Users,
    },
  ];

  const isActive = (path) => location.pathname === path;

  const now = new Date();

  return (
    <div className="min-h-screen bg-[#f6f8fb]">
      {/* Sidebar mobile overlay */}
      {openSidebar && (
        <div
          onClick={() => setOpenSidebar(false)}
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-full w-72 bg-[#031b2b] text-white transition-transform duration-300 ${
          openSidebar ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex h-24 items-center px-8">
            <img
            src={dbsLogo}
            alt="DBS Africa"
            className="max-h-20 w-auto object-contain"
            />
        </div>

        <nav className="mt-6 space-y-8 px-4">
          <div>

            <div className="space-y-2">
              {links.slice(0, 4).map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setOpenSidebar(false)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 transition ${
                      isActive(item.path)
                        ? "bg-dbsOrange text-white shadow-lg shadow-orange-500/30"
                        : "text-gray-200 hover:bg-white/10"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon size={22} />
                      {item.label}
                    </span>

                    {item.badge && (
                      <span className="rounded-full bg-dbsOrange px-2 py-1 text-xs font-bold text-white">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          <div>
            <p className="mb-3 px-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Paramètres
            </p>

            <div className="space-y-2">
              {links.slice(4).map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setOpenSidebar(false)}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                      isActive(item.path)
                        ? "bg-dbsOrange text-white"
                        : "text-gray-200 hover:bg-white/10"
                    }`}
                  >
                    <Icon size={22} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        <button
          onClick={logout}
          className="absolute bottom-6 left-4 right-4 flex items-center justify-center gap-3 rounded-xl border border-white/10 px-4 py-3 font-semibold text-white transition hover:bg-white/10"
        >
          <LogOut size={20} />
          Déconnexion
        </button>
      </aside>

      {/* Main */}
      <div className="lg:ml-72">
        {/* Topbar */}
        <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b bg-white px-4 shadow-sm lg:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setOpenSidebar(true)}
              className="rounded-lg border p-2 lg:hidden"
            >
              <Menu size={22} />
            </button>

            <div className="hidden w-80 rounded-xl border bg-white px-4 py-3 md:flex">
              <input
                placeholder="Rechercher..."
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden items-center gap-2 text-sm text-gray-700 md:flex">
              <CalendarDays size={20} />
              <span>
                {now.toLocaleDateString("fr-FR")} -{" "}
                {now.toLocaleTimeString("fr-FR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>

            <div className="hidden items-center gap-2 text-sm text-gray-600 md:flex">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              En ligne
            </div>

            <button className="relative rounded-full border p-2">
              <Bell size={20} />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-dbsOrange text-xs font-bold text-white">
                5
              </span>
            </button>

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-dbsOrange font-bold text-white">
                {user?.full_name?.charAt(0) || "A"}
              </div>

              <div className="hidden md:block">
                <p className="font-semibold text-gray-900">
                  {user?.full_name || "Admin DBS"}
                </p>
                <p className="text-sm text-gray-500">
                  {user?.role || "Administrateur"}
                </p>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}