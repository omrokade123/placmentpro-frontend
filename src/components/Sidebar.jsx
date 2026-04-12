import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  FileText,
  Brain,
  BarChart,
  ChevronLeft,
  ChevronRight,
  Shield,
  Menu,
  X,
  Briefcase
} from "lucide-react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  const { user } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, []);

  const navStyle =
    "flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 font-medium";

  const activeStyle =
    "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md hover:bg-gradient-to-r hover:from-purple-700 hover:to-indigo-700 dark:from-purple-600 dark:to-indigo-600";

  const navItems = [
    {
      to: "/dashboard",
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
    },
    {
      to: "/practice",
      icon: <Brain size={20} />,
      label: "Practice",
    },
    {
      to: "/attempts",
      icon: <BarChart size={20} />,
      label: "Attempts",
    },
    {
      to: "/experiences",
      icon: <FileText size={20} />,
      label: "Experiences",
    },
    {
      to: "/my-experiences",
      icon: <FileText size={20} />,
      label: "My Experiences",
    },
    {
      to: "/interview",
      icon: <Briefcase size={20} />,
      label: "Interview",
    }
  ];

  // Add admin page if user is admin
  if (user?.role === "admin") {
    navItems.push({
      to: "/admin/experiences",
      icon: <Shield size={20} />,
      label: "Admin Page",
    });
  }

  const SidebarContent = () => (
    <>
      {/* HEADER */}
      <div className="mb-8">
        <Link to="/dashboard" onClick={() => setIsMobileOpen(false)}>
          <div
            className={`flex items-center gap-3 transition-all duration-300 ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <div className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white w-10 h-10 flex items-center justify-center rounded-xl shadow-lg flex-shrink-0">
              <Brain size={22} />
            </div>

            {!isCollapsed && (
              <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                PlacementPro
              </h1>
            )}
          </div>
        </Link>
      </div>

      {/* NAV LINKS */}
      <nav className="space-y-2 flex-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={() => setIsMobileOpen(false)}
            className={({ isActive }) =>
              `${navStyle} ${isActive ? activeStyle : ""} ${
                isCollapsed ? "justify-center px-3" : ""
              }`
            }
            title={isCollapsed ? item.label : ""}
          >
            <span className="flex-shrink-0">{item.icon}</span>
            {!isCollapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* USER INFO */}
      {!isCollapsed && user && (
        <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-900 rounded-xl">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-indigo-400 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {user.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{user.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                {user.role || "Student"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TOGGLE BUTTON - Desktop */}
      <div className="hidden lg:block mt-4">
        <Button
          onClick={() => setIsCollapsed(!isCollapsed)}
          variant="outline"
          size="sm"
          className={`w-full h-10 flex items-center justify-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 ${
            isCollapsed ? "px-2" : ""
          }`}
        >
          {isCollapsed ? (
            <ChevronRight size={18} />
          ) : (
            <>
              <ChevronLeft size={18} />
              <span className="text-xs">Collapse</span>
            </>
          )}
        </Button>
      </div>
    </>
  );

  return (
    <>
      {/* MOBILE MENU BUTTON */}
      <Button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 p-0 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-800"
        variant="outline"
      >
        {isMobileOpen ? (
          <X size={20} className="text-gray-700 dark:text-gray-300" />
        ) : (
          <Menu size={20} className="text-gray-700 dark:text-gray-300" />
        )}
      </Button>

      {/* MOBILE OVERLAY */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* DESKTOP SIDEBAR */}
      <aside
        className={`hidden lg:flex flex-col h-screen border-r bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 p-6 transition-all duration-300 sticky top-0 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        <SidebarContent />
      </aside>

      {/* MOBILE SIDEBAR */}
      <aside
        className={`lg:hidden fixed top-0 left-0 z-40 h-screen w-64 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 p-6 flex flex-col transform transition-transform duration-300 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent />
      </aside>
    </>
  );
}
