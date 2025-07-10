export function Navbar() {
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
          <a
            href="#"
            className="text-emerald-600 font-medium hover:text-emerald-700"
          >
            Home
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800">
            Find Jobs
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800">
            Post a Job
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800">
            Skill Development
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800">
            About
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800">
            Contact
          </a>
        </nav>

        <div className="flex items-center gap-3">
          {/* <b
          size="icon"
          className="rounded-full bg-emerald-100 hover:bg-emerald-200"
          >
          <Moon className="w-4 h-4 text-emerald-700" />
        </b> */}
          <b className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg">
            Login
          </b>
          <b className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-6 bg-transparent">
            Register
          </b>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
