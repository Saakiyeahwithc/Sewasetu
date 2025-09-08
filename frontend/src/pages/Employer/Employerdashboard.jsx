import {
  Briefcase,
  Users,
  TrendingUp,
  CheckCircle2,
  LogOut,
  Building2,
  Plus,
} from "lucide-react";

import DashboardLayout from "../../components/layouts/DashboardLayout";
import LoadingSpinner from "../../components/layouts/LoadingSpinner.jsx";
import { useNavigate } from "react-router-dom";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import moment from "moment";
import { useEffect, useState } from "react";
import JobDashboardCard from "../../components/Cards/JobDashboardCard.jsx";
import ApplicantDashboardCard from "../../components/layouts/ApplicantDashboardCard.jsx";

const Card = ({ title, subtitle, className, headerAction, children }) => {
  return (
    <div
      className={`bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}
    >
      {(title || headerAction) && (
        <div className="flex items-center justify-between p-6 pb-4">
          <div>
            {title && (
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            )}
            {subtitle && (
              <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
            )}
          </div>
          {headerAction}
        </div>
      )}
      <div className={title ? "px-6 pb-6" : "p-6"}>{children} </div>
    </div>
  );
};

const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendValue,
  color = "blue",
}) => {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    green: "from-emerald-500 to-emerald-600",
    purple: "from-violet-500 to-violet-600",
    orange: "from-orange-500 to-orange-600",
  };

  return (
    <Card
      className={`bg-gradient-to-br ${colorClasses[color]} text-white border-0`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/80 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
          {trend && (
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span className="font-medium">{trendValue}</span>
            </div>
          )}
        </div>
        <div className="bg-white/10 p-3 rounded-xl">
          <Icon className="h-6 w-6 " />
        </div>
      </div>
    </Card>
  );
};

export function Employerdashboard() {
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getDashboardOverview = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.OVERVIEW);
      if (response.status === 200) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error("Dashboard API error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        // User authentication validated
      } catch (e) {
        console.error("Error parsing user:", e);
      }
    }

    getDashboardOverview();
    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="employer-dashboard">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="max-w-7xl mx-auto space-y-8 mb-96">
          {/* Dashboard Status*/}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard
              title="Active  Jobs"
              value={dashboardData?.counts?.totalActiveJobs || 0}
              icon={Briefcase}
              trend={true}
              trendValue={`${dashboardData?.counts?.trends?.activeJobs || 0}%`}
              color="blue"
            />

            <StatCard
              title="Total Applicants"
              value={dashboardData?.counts?.totalApplications || 0}
              icon={Users}
              trend={true}
              trendValue={`${
                dashboardData?.counts?.trends?.totalApplications || 0
              }%`}
              color="green"
            />

            <StatCard
              title="Hired"
              value={dashboardData?.counts?.totalHired || 0}
              icon={CheckCircle2}
              trend={true}
              trendValue={`${dashboardData?.counts?.trends?.totalHired || 0}%`}
              color="purple"
            />
          </div>

          {/* Recent Job Posts Section */}
          <div className="mt-8">
            <Card
              title="Recent Job Posts"
              subtitle="Your latest job postings"
              headerAction={
                <button
                  className="text-blue-600 hover:text-blue-800 font-medium"
                  onClick={() => {
                    navigate("/manage-job");
                  }}
                >
                  View All
                </button>
              }
            >
              <div className="space-y-3">
                {dashboardData?.data?.recentJobs
                  ?.slice(0, 3)
                  ?.map((job, index) => (
                    <JobDashboardCard key={index} job={job} />
                  ))}
              </div>
            </Card>
          </div>
          <div className="mt-8">
            <Card
              title="Recent Applications"
              subtitle="Latest candidate application"
              headerAction={
                <button
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  onClick={() => navigate("/manage-jobs")}
                >
                  View All
                </button>
              }
            >
              <div className="space-y-3">
                {dashboardData?.data?.recentApplications
                  ?.slice(0, 3)
                  ?.map((data, index) => {
                    // Handle case where applicant exists but doesn't have a name
                    const applicantWithName = {
                      ...data?.applicant,
                      name:
                        data?.applicant?.name ||
                        data?.applicant?.email ||
                        "Unknown User",
                    };

                    return (
                      <ApplicantDashboardCard
                        key={index}
                        applicant={applicantWithName}
                        position={data?.job?.title || ""}
                        time={moment(data?.updateAt).fromNow()}
                      />
                    );
                  })}
              </div>
            </Card>
          </div>
          {/* Quick Actions*/}
          <Card
            title="Quick Actions"
            subtitle="Commom tasks to get you started"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  title: "Post New Job",
                  icon: Plus,
                  color: "bg-blue-50 text-blue-700",
                  path: "/post-Job",
                },
                {
                  title: "Review Applicatinos",
                  icon: Users,
                  color: "bg-green-50 text-green-700",
                  path: "/manage-jobs",
                },
                {
                  title: "company Settings",
                  icon: Building2,
                  color: "bg-orange-50 text-orange-700",
                  path: "/company-profile",
                },
              ].map((action, index) => (
                <button
                  key={index}
                  className="flex items-center space-x-3  p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all duration-200 text-left"
                  onClick={() => navigate(action.path)}
                >
                  <div className={`p-2 rounded-lg ${action.color}`}>
                    <action.icon className="h-5 w-5" />
                  </div>
                  <span className="font-medium text-gray-900">
                    {action.title}
                  </span>
                </button>
              ))}
            </div>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
}

export default Employerdashboard;
