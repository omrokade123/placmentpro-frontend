import { NavLink, Outlet } from "react-router-dom";

import {
 LayoutDashboard,
 Briefcase,
 Building2,
 LogOut
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";

export default function AdminLayout() {

 const { logout } = useAuth();

 const navStyle = ({ isActive }) =>
   `
   flex items-center gap-3
   px-4 py-3
   rounded-xl
   transition
   font-medium

   ${
     isActive
       ? "bg-white text-black shadow"
       : "text-gray-400 hover:bg-gray-800 hover:text-white"
   }
   `;

 return (

<div className="flex min-h-screen bg-gray-100">

  {/* 🔥 SIDEBAR */}
  <aside className="
    w-72
    bg-black
    text-white
    flex
    flex-col
    justify-between
    p-6
  ">

    {/* TOP */}
    <div>

      <h1 className="text-2xl font-bold mb-10">
        PlacementPro
        <span className="text-gray-400 text-sm ml-2">
          Admin
        </span>
      </h1>

      <nav className="space-y-2">

        <NavLink to="/admin" end className={navStyle}>
          <LayoutDashboard size={20}/>
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/experiences"
          className={navStyle}
        >
          <Briefcase size={20}/>
          Experiences
        </NavLink>

        <NavLink
          to="/admin/companies"
          className={navStyle}
        >
          <Building2 size={20}/>
          Companies
        </NavLink>
        <NavLink
          to="/admin/questions"
          className={navStyle}
        >
          <Building2 size={20}/>
          questions
        </NavLink>
      </nav>

    </div>


    {/* 🔥 LOGOUT */}
    <button
      onClick={logout}
      className="
        flex items-center gap-3
        text-gray-400
        hover:text-white
        transition
      "
    >
      <LogOut size={18}/>
      Logout
    </button>

  </aside>



  {/* 🔥 MAIN AREA */}
  <div className="flex-1 flex flex-col">

    {/* TOPBAR */}
    <header className="
      bg-white
      shadow-sm
      px-8
      py-4
      flex
      justify-between
      items-center
    ">

      <h2 className="text-xl font-semibold">
        Admin Panel
      </h2>

      <div className="
        w-10 h-10
        rounded-full
        bg-black
        text-white
        flex
        items-center
        justify-center
        font-bold
      ">
        A
      </div>

    </header>


    {/* CONTENT */}
    <main className="p-8">
      <Outlet />
    </main>

  </div>

</div>

 );
}
