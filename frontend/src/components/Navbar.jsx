import { Moon } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="max-w-7xl items-center justify-center mx-auto">
      <header className=" flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center">
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
            </div>
          </div>
          <span className="text-2xl font-bold text-gray-800">Sewa Setu</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <NavLink
            to="/"
            className="text-emerald-600 font-medium hover:text-emerald-700"
          >
            Home
          </NavLink>
          <NavLink
            to="/Featuredjobs"
            className="text-gray-600 hover:text-gray-800"
          >
            Find Jobs
          </NavLink>
          <NavLink to="#" className="text-gray-600 hover:text-gray-800">
            Post a Job
          </NavLink>
          <NavLink to="#" className="text-gray-600 hover:text-gray-800">
            Skill Development
          </NavLink>
          <NavLink to="/About" className="text-gray-600 hover:text-gray-800">
            About
          </NavLink>
          <NavLink to="/Contact" className="text-gray-600 hover:text-gray-800">
            Contact
          </NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <button
            size="icon"
            className="rounded-full bg-emerald-100 hover:bg-emerald-200 h-10 w-10 cursor-pointer flex items-center justify-center transition-colors mr-5"
          >
            <Moon className="size-6 text-emerald-700" />
          </button>
          <button
            onClick={() => {
              navigate("/Login");
            }}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg cursor-pointer"
          >
            Login
          </button>
          <button className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-6 bg-transparent cursor-pointer">
            Register
          </button>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
