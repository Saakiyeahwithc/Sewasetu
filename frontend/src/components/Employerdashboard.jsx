import { Briefcase, Home, Plus, Users, Bell, Settings } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

export function Employerdashboard() {
  return (
    <section className="min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 text-center my-12">
        Employers Dashboard
      </h2>

      {/* Main Dashboard Layout */}
      <div className="flex max-w-7xl mx-auto">
        {/* Sidebar */}
        <aside className="w-80 bg-blue-600 text-white min-h-screen p-6 flex flex-col rounded-lg shadow-lg">
          {/* Company Profile Section */}
          <div className="mb-8 pb-6 border-b border-blue-500 rounded-lg">
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
          <nav className="space-y-2 flex-grow">
            <div className="bg-blue-700 rounded-lg px-4 py-3 flex items-center gap-3 cursor-pointer">
              <Home className="w-5 h-5" />
              <span className="font-medium">Dashboard</span>
            </div>

            {[
              { icon: Plus, label: "Post New Job" },
              { icon: Briefcase, label: "Manage Jobs" },
              { icon: Users, label: "Candidates" },
              { icon: Bell, label: "Notifications" },
              { icon: Settings, label: "Settings" },
            ].map((item) => (
              <div
                key={item.label}
                className="px-4 py-3 flex items-center gap-3 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 p-8 shadow-lg-50 min-h-screen bg-gray-50 rounded-lg">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Green Valley Agro Dashboard
            </h1>
            <p className="text-gray-600">
              Manage your job postings and candidates in one place.
            </p>
          </header>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="border border-blue-200 bg-blue-50 rounded-xl shadow hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">
                  Active Jobs
                </h3>
                <div className="text-3xl font-bold text-blue-600">4</div>
              </CardContent>
            </Card>

            <Card className="border border-emerald-200 bg-emerald-50 rounded-xl shadow hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold text-emerald-800 mb-2">
                  Applications
                </h3>
                <div className="text-3xl font-bold text-emerald-600">12</div>
              </CardContent>
            </Card>

            <Card className="border border-purple-200 bg-purple-50 rounded-xl shadow hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold text-purple-800 mb-2">
                  Shortlisted
                </h3>
                <div className="text-3xl font-bold text-purple-600">3</div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Applications */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Recent Applications
              </h2>
              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                View all
              </a>
            </div>

            <Card className="rounded-xl shadow">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        {[
                          "Candidate",
                          "Job",
                          "Applied",
                          "Status",
                          "Action",
                        ].map((header) => (
                          <th
                            key={header}
                            className="text-left p-4 font-medium text-gray-600 uppercase text-sm"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          candidate: "Ram Bahadur",
                          location: "Chitwan",
                          job: "Farm Supervisor",
                          applied: "2 days ago",
                          status: "New",
                          badgeColor: "blue",
                        },
                        {
                          candidate: "Sita Devi",
                          location: "Bharatpur",
                          job: "Farm Assistant",
                          applied: "1 week ago",
                          status: "Interview",
                          badgeColor: "yellow",
                        },
                      ].map(
                        ({
                          candidate,
                          location,
                          job,
                          applied,
                          status,
                          badgeColor,
                        }) => (
                          <tr
                            key={candidate}
                            className="border-b hover:bg-gray-50 transition-colors"
                          >
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                  <Users className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                  <div className="font-semibold text-gray-800">
                                    {candidate}
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    {location}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="font-medium text-gray-800">
                                {job}
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="text-gray-600">{applied}</div>
                            </td>
                            <td className="p-4">
                              <Badge
                                className={`bg-${badgeColor}-100 text-${badgeColor}-700 hover:bg-${badgeColor}-100 transition-colors`}
                              >
                                {status}
                              </Badge>
                            </td>
                            <td className="p-4">
                              <button
                                variant="outline"
                                size="sm"
                                className="text-blue-600 border border-blue-600 hover:bg-blue-50 bg-transparent rounded-md px-3 py-1 transition-colors"
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Your Active Job Listings */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Your Active Job Listings
              </h2>
              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Post new job
              </a>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: "Farm Supervisor",
                  applications: 4,
                  closesIn: "3 days",
                },
                {
                  title: "Farm Assistant",
                  applications: 8,
                  closesIn: "1 week",
                },
              ].map(({ title, applications, closesIn }) => (
                <Card
                  key={title}
                  className="hover:shadow-md transition-shadow rounded-xl"
                >
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800 mb-2">
                        {title}
                      </h3>
                      <p className="text-gray-600">
                        {applications} applications • Closes in {closesIn}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2 font-medium transition-colors">
                        Manage
                      </button>
                      <button
                        variant="outline"
                        className="border border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent rounded-md px-4 py-2 font-medium transition-colors"
                      >
                        Edit
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}

export default Employerdashboard;
