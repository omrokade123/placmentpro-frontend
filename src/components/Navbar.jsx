import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Moon, Sun } from "lucide-react";
import { ThemeContext } from "../context/ThemeProvider";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import API from "@/api/axios";

export default function Navbar() {
  const location = useLocation();
  const { logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const routeTitles = {
    "/dashboard": "Dashboard",
    "/practice": "Practice",
    "/analytics": "Analytics",
    "/experiences": "Experiences",
  };

  const currentTitle = Object.keys(routeTitles).find((route) =>
    location.pathname.startsWith(route),
  )
    ? routeTitles[
        Object.keys(routeTitles).find((route) =>
          location.pathname.startsWith(route),
        )
      ]
    : "PlacementPro";

  const navigate = useNavigate();

  const handleLogout = async () => {
    const res = await API.post("/auth/logout");
    if (res) {
      logout();
      navigate("/login");
    }
  };

  return (
    <div
      className="h-16 border-b bg-white dark:bg-gray-950 
    border-gray-200 dark:border-gray-800 
    flex items-center justify-between px-6"
    >
      {/* LEFT */}
      <h2 className="text-xl font-semibold tracking-tight">{currentTitle}</h2>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">
        {/* 🌙 THEME TOGGLE — EXACT LOCATION */}
        <button
          onClick={toggleTheme}
          className="
          p-2 rounded-lg
          hover:bg-gray-100
          hover:scale-105
          dark:hover:bg-gray-800
          transition
          "
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* AVATAR DROPDOWN */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="cursor-pointer">
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>

            <DropdownMenuItem>Settings</DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={handleLogout} className="text-red-500">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
