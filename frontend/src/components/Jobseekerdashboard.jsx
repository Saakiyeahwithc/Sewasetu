import { Card, CardContent } from "./ui/card";
import { Users } from "lucide-react";
import { GraduationCap, ArrowRight } from "lucide-react";
import { Hammer } from "lucide-react";

export function JobseekerDashboard() {
  return (
    <section className="mt-24 max-w-7xl">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
        Job Seeker Dashboard
      </h2>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-4 min-h-[600px]">
          {/* Sidebar */}
          <div className="bg-emerald-600 text-white p-6">
            {/* User Profile Section */}
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-emerald-500">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Prashant Shakya</h3>
                <p className="text-emerald-100 text-sm">Chitwan, Nepal</p>
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

        </div>
      </div>
    </section>
  );
}
export default JobseekerDashboard;
