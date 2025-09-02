import { Card, CardContent } from "@/components/ui/card";
import { Users, GraduationCap, ArrowRight, Hammer, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export function JobseekerDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove authentication cookies
    Cookies.remove("user");
    Cookies.remove("token");
    // Redirect to the login page
    navigate("/login");
  };

  return (
    <section className="mt-24">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
        Job Seeker Dashboard
      </h2>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-4 min-h-[600px]">
          {/* Sidebar */}
          <div className="bg-emerald-600 text-white p-6 flex flex-col justify-between">
            <div>
              {/* User Profile Section */}
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-emerald-500">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Prashant Shakya</h3>
                  <p className="text-emerald-100 text-sm">Dharan, Nepal</p>
                </div>
              </div>

              {/* Navigation Menu */}
              <nav className="space-y-2">
                {/* Active Item */}
                <div className="bg-emerald-700 rounded-lg px-4 py-3 flex items-center gap-3">
                  <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
                    <div className="w-2 h-2 bg-emerald-600 rounded-sm" />
                  </div>
                  <span className="font-medium">Dashboard</span>
                </div>

                {/* My Profile */}
                <div className="px-4 py-3 flex items-center gap-3 hover:bg-emerald-700 rounded-lg cursor-pointer transition-colors">
                  <Users className="w-5 h-5" />
                  <span>My Profile</span>
                </div>

                {/* Job Applications */}
                <div className="px-4 py-3 flex items-center gap-3 hover:bg-emerald-700 rounded-lg cursor-pointer transition-colors">
                  <div className="w-5 h-5 border-2 border-white rounded flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded" />
                  </div>
                  <span>Job Applications</span>
                </div>

                {/* Skill Development */}
                <div className="px-4 py-3 flex items-center gap-3 hover:bg-emerald-700 rounded-lg cursor-pointer transition-colors">
                  <GraduationCap className="w-5 h-5" />
                  <span>Skill Development</span>
                </div>

                {/* Notifications */}
                <div className="px-4 py-3 flex items-center gap-3 hover:bg-emerald-700 rounded-lg cursor-pointer transition-colors">
                  <div className="w-5 h-5 border-2 border-white rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                  <span>Notifications</span>
                </div>

                {/* Settings */}
                <div className="px-4 py-3 flex items-center gap-3 hover:bg-emerald-700 rounded-lg cursor-pointer transition-colors">
                  <div className="w-5 h-5 border-2 border-white rounded flex items-center justify-center">
                    <div className="w-1 h-1 bg-white rounded-full" />
                    <div className="w-1 h-1 bg-white rounded-full ml-0.5" />
                  </div>
                  <span>Settings</span>
                </div>
              </nav>
            </div>

            {/* --- Logout Button --- */}
            <div>
              <button
                onClick={handleLogout}
                className="w-full mt-8 px-4 py-3 flex items-center gap-3 hover:bg-emerald-700 rounded-lg cursor-pointer transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 p-8 bg-gray-50">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Welcome Back, Prashant!
              </h1>
              <p className="text-gray-600">
                Here are your recent activities and job matches.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Recommended Jobs Card */}
              <Card className="border border-blue-200 bg-blue-50 rounded-xl shadow hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">
                    Recommended Jobs
                  </h3>
                  <p className="text-blue-600 text-2xl font-bold mb-3">
                    5 new jobs match your skills
                  </p>
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 transition-colors"
                  >
                    View all
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </CardContent>
              </Card>

              {/* Applications Status Card */}
              <Card className="border border-emerald-200 bg-emerald-50 rounded-xl shadow hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-emerald-800 mb-4">
                    Applications Status
                  </h3>
                  <div className="flex justify-between">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-600">
                        3
                      </div>
                      <div className="text-sm text-emerald-700">Applied</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-600">
                        1
                      </div>
                      <div className="text-sm text-emerald-700">Interview</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-600">
                        0
                      </div>
                      <div className="text-sm text-emerald-700">Hired</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Job Matches */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Recent Job Matches
              </h3>
              <Card className="hover:shadow-md transition-shadow rounded-xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-lg text-gray-800 mb-1">
                        Farm Assistant
                      </h4>
                      <p className="text-gray-600">
                        Organic Valley Farm • Chitwan
                      </p>
                    </div>
                    <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-md font-medium shadow transition-colors">
                      Apply
                    </button>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover:shadow-md transition-shadow rounded-xl mt-4">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-lg text-gray-800 mb-1">
                        Construction Helper
                      </h4>
                      <p className="text-gray-600">
                        Nepal Builders • Bharatpur
                      </p>
                    </div>
                    <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-md font-medium shadow transition-colors">
                      Apply
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Skill Development Courses */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Skill Development Courses
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Organic Farming Course */}
                <Card className="border border-purple-200 bg-purple-50 hover:shadow-md transition-shadow rounded-xl">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <div className="w-6 h-6 text-purple-600">🌱</div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg text-gray-800 mb-1">
                          Organic Farming Techniques
                        </h4>
                        <p className="text-gray-600 mb-3">Free • 2 weeks</p>
                        <a
                          href="#"
                          className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
                        >
                          Enroll Now
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Carpentry Course */}
                <Card className="border border-blue-200 bg-blue-50 hover:shadow-md transition-shadow rounded-xl">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Hammer className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg text-gray-800 mb-1">
                          Basic Carpentry Skills
                        </h4>
                        <p className="text-gray-600 mb-3">Rs. 500 • 4 weeks</p>
                        <a
                          href="#"
                          className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                        >
                          Enroll Now
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default JobseekerDashboard;
