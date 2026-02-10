import { useAuth } from "@/context/AuthContext";
import { LayoutDashboard, FileText, Brain, BarChart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const navStyle =
    "flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition";

  const activeStyle = "bg-black text-white shadow-sm dark:bg-white dark:text-black";

  return (
    <div className="w-64 h-screen border-r bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 p-6 flex flex-col">
      <Link to="/dashboard">
        <div className="flex items-center gap-2 mb-10">
          <div className="bg-black text-white dark:bg-white dark:text-black w-9 h-9 flex items-center justify-center rounded-lg">
            <Brain size={18} />
          </div>

          <h1 className="text-xl font-bold tracking-tight">PlacementPro</h1>
        </div>
      </Link>

      {/* NAV LINKS */}
      <div className="space-y-2 flex-1">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${navStyle} ${isActive ? activeStyle : ""}`
          }
        >
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink
          to="/practice"
          className={({ isActive }) =>
            `${navStyle} ${isActive ? activeStyle : ""}`
          }
        >
          <Brain size={18} />
          Practice
        </NavLink>

        <NavLink
          to="/attempts"
          className={({ isActive }) =>
            `${navStyle} ${isActive ? activeStyle : ""}`
          }
        >
          <BarChart size={18} />
          Attempts
        </NavLink>

        <NavLink
          to="/experiences"
          className={({ isActive }) =>
            `${navStyle} ${isActive ? activeStyle : ""}`
          }
        >
          <FileText size={18} />
          Experiences
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${navStyle} ${isActive ? activeStyle : ""}`
          }
          to="/my-experiences"
        >
          <FileText size={18} />
          My Experiences
        </NavLink>
        {user?.role === "admin" && (
          <NavLink
            to="/admin/experiences"
            className={({ isActive }) =>
              `${navStyle} ${isActive ? activeStyle : ""}`
            }
          >
            <FileText size={18} />
            Admin Page
          </NavLink>
        )}
      </div>
    </div>
  );
}