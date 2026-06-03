import React, { use } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Upload,
  History,
  ClipboardList,
  ChevronDown,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useSelector } from "react-redux";

const navbarConfig = {
  admin: [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/",
      type: "link",
    },
    {
      title: "Agents",
      icon: Users,
      type: "dropdown",
      routes: [
        { label: "All Agents", path: "/admin/agents" },
        { label: "Add Agent", path: "/admin/agents/create" },
      ],
    },
    {
      title: "Lists",
      icon: Upload,
      type: "dropdown",
      routes: [
        { label: "Upload List", path: "/admin/upload" },
        { label: "Uploaded History", path: "/admin/upload/history" },
      ],
    },
    {
      title: "Profile",
      icon: Sparkles,
      type: "dropdown",
      routes: [
        { label: "My Profile", path: "/profile" },
        { label: "Logout", path: "/logout" },
      ],
    },
  ],
  agent: [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/",
      type: "link",
    },
    {
      title: "My Lists",
      icon: ClipboardList,
      type: "dropdown",
      routes: [
        { label: "Assigned Lists", path: "/agent/lists" },
      ],
    },
    {
      title: "Profile",
      icon: Sparkles,
      type: "dropdown",
      routes: [
        { label: "My Profile", path: "/profile" },
        { label: "Logout", path: "/logout" },
      ],
    },
  ],
  guest: [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/",
      type: "link",
    },
    {
      title: "Login",
      icon: ShieldCheck,
      path: "/login",
      type: "link",
    }
  ],

};

const Navbar = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState(null);

  const { Userdata } = useSelector((state) => state.User);
  const role = Userdata?.user.role || "guest";
  const menus = navbarConfig[role];

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-15 max-w-7xl items-center justify-between px-3">
          {/* Left brand */}
          <div className="flex items-center gap-3">
            <NavLink
              to="/"
            >
              <img
                src="/am.png"
                alt="AM Logo"
                className="h-8 w-auto object-contain sm:h-9"
              />
            </NavLink>
          </div>

          {/* Desktop menu */}
          <div className="hidden items-center gap-2 lg:flex">
            {menus.map((menu) => {
              const Icon = menu.icon;

              if (menu.type === "link") {
                return (
                  <NavLink
                    key={menu.title}
                    to={menu.path}
                    className={({ isActive }) =>
                      `flex items-center gap-2 rounded cursor-pointer px-4 py-2 text-sm font-medium transition ${isActive
                        ? "bg-cyan-50 text-cyan-700"
                        : "text-slate-700 hover:bg-slate-100"
                      }`
                    }
                  >
                    <Icon size={18} />
                    {menu.title}
                  </NavLink>
                );
              }

              const isOpen = openMenu === menu.title;

              return (
                <div key={menu.title} className="relative">
                  <button
                    onClick={() => setOpenMenu(isOpen ? null : menu.title)}
                    className="flex items-center gap-2 rounded cursor-pointer px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                  >
                    <Icon size={18} />
                    {menu.title}
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${isOpen ? "rotate-180" : ""
                        }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="absolute right-0 top-full mt-4 w-60 overflow-hidden rounded border border-slate-200 bg-white shadow-xl"
                      >
                        <div className="p-2">
                          {menu.routes.map((item) => (
                            <NavLink
                              key={item.path}
                              to={item.path}
                              onClick={() => setOpenMenu(null)}
                              className={({ isActive }) =>
                                `flex items-center justify-between rounded px-4 py-3 font-light text-sm transition ${isActive
                                  ? "bg-cyan-50 text-cyan-700"
                                  : "text-slate-700 hover:bg-slate-100"
                                }`
                              }
                            >
                              {item.label}
                              <p> &gt;   </p>
                            </NavLink>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Mobile button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-slate-700 lg:hidden"
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: 280 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 280 }}
            className="fixed right-0 top-0 z-[60] h-screen w-80 bg-white shadow-2xl lg:hidden"
          >
            <div className="flex items-center h-15 justify-between border-b border-slate-200 px-3">
              <NavLink
                to="/"
              >
                <img
                  src="/am.png"
                  alt="AM Logo"
                  className="h-8 w-auto object-contain sm:h-9"
                />
              </NavLink>

              <button onClick={() => setMobileOpen(false)}>
                <X />
              </button>
            </div>

            <div className="p-4">
              {menus.map((menu) => {
                const Icon = menu.icon;

                if (menu.type === "link") {
                  return (
                    <NavLink
                      key={menu.title}
                      to={menu.path}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `mb-3 flex items-center gap-3 cursor-pointer rounded border px-4 py-4 text-sm transition ${isActive
                          ? "border-cyan-200 bg-cyan-50 text-cyan-700"
                          : "border-slate-200 text-slate-700 hover:bg-slate-100"
                        }`
                      }
                    >
                      <Icon size={18} />
                      <span className="font-medium">{menu.title}</span>
                    </NavLink>
                  );
                }

                const isOpen = openMenu === menu.title;

                return (
                  <div
                    key={menu.title}
                    className="mb-3 overflow-hidden rounded border border-slate-200"
                  >
                    <button
                      onClick={() =>
                        setOpenMenu(isOpen ? null : menu.title)
                      }
                      className="flex w-full items-center justify-between px-4 py-4 text-left"
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={18} className="text-cyan-600" />
                        <span className="font-medium text-slate-800">
                          {menu.title}
                        </span>
                      </div>
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${isOpen ? "rotate-180" : ""
                          }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden border-t border-slate-200 bg-slate-50"
                        >
                          {menu.routes.map((item) => (
                            <NavLink
                              key={item.path}
                              to={item.path}
                              onClick={() => {
                                setMobileOpen(false);
                                setOpenMenu(null);
                              }}
                              className={({ isActive }) =>
                                `flex items-center justify-between border-b border-gray-200 font-light px-5 py-3 text-sm transition ${isActive
                                  ? "bg-cyan-50 text-cyan-700"
                                  : "text-slate-600 hover:bg-slate-100"
                                }`
                              }
                            >
                              {item.label}
                              <p>&gt;</p>
                            </NavLink>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;