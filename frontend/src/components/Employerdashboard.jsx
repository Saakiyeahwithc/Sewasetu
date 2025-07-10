import { Briefcase, Home, Plus, Users, Bell, Settings } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

export function EmployerDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Dashboard Layout */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-80 bg-blue-600 text-white min-h-screen p-6">
          {/* Company Profile Section */}
          <div className="mb-8 pb-6 border-b border-blue-500">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-xl">Green Valley Agro</h2>
                <p className="text-blue-100 text-sm">Chitwan, Nepal</p>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-2">
            <div className="bg-blue-700 rounded-lg px-4 py-3 flex items-center gap-3">
              <Home className="w-5 h-5" />
              <span className="font-medium">Dashboard</span>
            </div>

            <div className="px-4 py-3 flex items-center gap-3 hover:bg-blue-700 rounded-lg cursor-pointer transition-colors">
              <Plus className="w-5 h-5" />
              <span>Post New Job</span>
            </div>

            <div className="px-4 py-3 flex items-center gap-3 hover:bg-blue-700 rounded-lg cursor-pointer transition-colors">
              <Briefcase className="w-5 h-5" />
              <span>Manage Jobs</span>
            </div>

            <div className="px-4 py-3 flex items-center gap-3 hover:bg-blue-700 rounded-lg cursor-pointer transition-colors">
              <Users className="w-5 h-5" />
              <span>Candidates</span>
            </div>

            <div className="px-4 py-3 flex items-center gap-3 hover:bg-blue-700 rounded-lg cursor-pointer transition-colors">
              <Bell className="w-5 h-5" />
              <span>Notifications</span>
            </div>

            <div className="px-4 py-3 flex items-center gap-3 hover:bg-blue-700 rounded-lg cursor-pointer transition-colors">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Green Valley Agro Dashboard
            </h1>
            <p className="text-gray-600">
              Manage your job postings and candidates in one place.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">
                  Active Jobs
                </h3>
                <div className="text-3xl font-bold text-blue-600">4</div>
              </CardContent>
            </Card>

            <Card className="border-emerald-200 bg-emerald-50">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold text-emerald-800 mb-2">
                  Applications
                </h3>
                <div className="text-3xl font-bold text-emerald-600">12</div>
              </CardContent>
            </Card>

            <Card className="border-purple-200 bg-purple-50">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold text-purple-800 mb-2">
                  Shortlisted
                </h3>
                <div className="text-3xl font-bold text-purple-600">3</div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Applications */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Recent Applications
              </h2>
              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                View all
              </a>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="text-left p-4 font-medium text-gray-600 uppercase text-sm">
                          Candidate
                        </th>
                        <th className="text-left p-4 font-medium text-gray-600 uppercase text-sm">
                          Job
                        </th>
                        <th className="text-left p-4 font-medium text-gray-600 uppercase text-sm">
                          Applied
                        </th>
                        <th className="text-left p-4 font-medium text-gray-600 uppercase text-sm">
                          Status
                        </th>
                        <th className="text-left p-4 font-medium text-gray-600 uppercase text-sm">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <Users className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-800">
                                Ram Bahadur
                              </div>
                              <div className="text-sm text-gray-600">
                                Chitwan
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="font-medium text-gray-800">
                            Farm Supervisor
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-gray-600">2 days ago</div>
                        </td>
                        <td className="p-4">
                          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                            New
                          </Badge>
                        </td>
                        <td className="p-4">
                          <button
                            variant="outline"
                            size="sm"
                            className="text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <Users className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-800">
                                Sita Devi
                              </div>
                              <div className="text-sm text-gray-600">
                                Bharatpur
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="font-medium text-gray-800">
                            Farm Assistant
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-gray-600">1 week ago</div>
                        </td>
                        <td className="p-4">
                          <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
                            Interview
                          </Badge>
                        </td>
                        <td className="p-4">
                          <button
                            variant="outline"
                            size="sm"
                            className="text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Your Active Job Listings */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Your Active Job Listings
              </h2>
              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Post new job
              </a>
            </div>

            <div className="space-y-4">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800 mb-2">
                        Farm Supervisor
                      </h3>
                      <p className="text-gray-600">
                        4 applications • Closes in 3 days
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white">
                        Manage
                      </button>
                      <button
                        variant="outline"
                        className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800 mb-2">
                        Farm Assistant
                      </h3>
                      <p className="text-gray-600">
                        8 applications • Closes in 1 week
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white">
                        Manage
                      </button>
                      <button
                        variant="outline"
                        className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployerDashboard;
