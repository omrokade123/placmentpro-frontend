import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";



export default function DashboardLayout({ children }) {
  return (

    <div className="flex bg-white dark:bg-gray-900 text-black dark:text-white">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="flex-1 flex flex-col">

        <Navbar />

        <main className="p-8 bg-gray-50 dark:bg-gray-800 min-h-screen">
          {children}
        </main>

      </div>

    </div>
  );
}
