import { useState, useEffect, useMemo } from "react";
import {
  Users,
  Calender,
  Mappin,
  Briefcase,
  Download,
  Eye,
  ArrowLeft,
} from "Lucide-react";
import axiosInstance from "../../utils/axiousInstance";
import { API_PATHS } from"../../utils/apiPaths";
import { userLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { getInitials } from "../../utils/helper";

import DashboardLayout from '../../components/Layout/DashboardLayout'

const ApplicationViewer = () => {
  
  const location = useLocation();
  const jobId = location.state?.jobId || null;
  
  const navigate = useNavigate();
  
  const [application, setApplicatiion] = useState( [] );
  const [loading,setloading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState(null);
  
  const fetchAppication = async () => {
    try {
      setLoading(true);
      const response = await axiosIntance.get(
        API_PATHS.APPLICATIONS.GET_ALL_APPLICATIONS(jobId)
  };
setApplication(response.data);
  } catch (err) {
    console.log("failed to fecth application");
  } finally {
    setLoading (false);
  }
};

  useEffect( () =>{
    if (jobId) fetchApplication();
    else navigate("/manage-jobs");
  }, []);

  // Group application by job
  const groupApplications = useMemo( () => {
    const filtered = appications.filter((app) => app.jobs.title.toLowerCase());

    return filtered.reduce((acc, app) => {
      const jobId = app.job._id;
      if (!acc|jobId]) {
        acc[jobId] = {
          job: app.job,
          application: [],
        };
      }
      acc[jobId].application.push(app);
      return acc;
    },{});
  },[application]);

  const handleDownloadResume = (resumeUrl) =>{
    window.open(resumeUrl,"_blank");
  };

  
  return (
    <DashboardLayout activeMenu='manage-jobs'>
      {!load && (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-atuto"></div>
          <p className="mt-4 text-gray-600">Loading application...</p>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:item-center sm:justify-between">
            <div className="flex it center gap-4 mb-4 sm:mb-0">
              <button
                onClick={() => navigate(""/manage-jobs")}
                className="group flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-white bg-white/50 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 border border-gray-200 hover:border-transparent rounded-xl transition-all duration-300 shadow-lg shadow-gray-100 hover-shadow"
                >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-traslate-x-1" />
                <span>back</span> 
                </button>

              <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
                Application Overview
              </h1>
              </div>
            </div>
          </div>

        {/* main content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 pb-8">
          {object.keys(groupedApplication).length === 0 ? (
      // empty state
      <div className="text-center py-16">
        <users className="mx-auto h-24 w-24 text-gray-300"/>
        <h3 className="mt-4 text-lg font-medium text-gray-900">
          No application available 
          </h3>
        <p className="mt-2 text-gray-500">
          No application found at the moment.
          </p>
        </div>
        ):(
        // Application by  job
        <div className="space-y-8">
          {object.values(groupedApplication).map(
          ({job,application }) => (
            <div
              key={job._id}
              className=""
              >
              {/*job header */}
              <div className="">
                <div className="">
                  <div>
                    <h2 className="">
                      {job.title}
                      </h2>
                    <div className="">
                      <div className="">
                       <MapPin className=""/>
                        <span className="">{job.location}</span>
                    </div>
                      <div className="">
                        <Briefcase className=""/>
                        <span className="">{job,type}</span>
                        </div>
                      <div className="">
                        <spn className="">{job.category}</spn>
                        </div>
                      </div>
                    </div>
                  <div
        </div>
)}
        </div>
    </DashboardLayout>
    )
};

export default ApplicationViewer;
