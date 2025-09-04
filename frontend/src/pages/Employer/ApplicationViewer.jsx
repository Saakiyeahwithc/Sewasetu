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
              className="bg-white rounded-xl shadow-md overflow-hidden"
              >
              {/*job header */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
                <div className="flex flex-col sm:flex-row sm:item-center sm:justify-between gap-4">
                  <div>
                    <h2 className="text-lg front-semibold text-white">
                      {job.title}
                      </h2>
                    <div className="flex flex-wrap items-center gap-4 nt-2 text-blue-100">
                      <div className="flex item-center gap-1">
                       <MapPin className="h-4 w-4"/>
                        <span className="text-sm">{job.location}</span>
                    </div>
                      <div className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4"/>
                        <span className="text-sm">{job,type}</span>
                        </div>
                      <div className="flex item-center gap-1">
                        <spn className="text-sm">{job.category}</spn>
                        </div>
                      </div>
                    </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
                    <span className="text-sm text-white font-medium">
                      {application.length} Application
                      {application.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                </div>

              {/* Application List */}
              <div className="p-6">
                <div className="space-y-4">
                  {application.map(application) =>(
                  <div
                    key={application._id}
                    className="flex flex-col md:flex-row md:item-center justify-between p-4 border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                    <div className="flex item-center gap-4">
                      {/* Avatar */}
                      <div className="flex-shrink-0">
                        {application.applicant.avatar ?(
                      <img
                        src={application.applicant.avatar}
                        alt={applicant.applicant.name}
                        className="h-12 w-12 rounded-full object-cover"
                        />
                      ): (
                      <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-semibold">
                          {genInitials(application.applicant.name)}
                          </span>
                        </div>
                      )}
                        </div>

                      {/* Applicant Info */}
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-gray-900">
                          {application.applicant.name}
                          </h3>
                        <p className="text-gray-600 text-sm">
                          {application.applicant.email}
                          </p>
                        <div className="flex item-center gap-1 mt-1 text-gray-500 text-xs">
                          <Callender className="h-3 w-3" />
                          <span>
                            Applied{""}
                            {moment(application.createdAt)?.format(
                      "Do MM YYYY"
                      )}
                            </span>
                          </div>
                        </div>
                      </div>

                    {/* Action */}
                    <div className="flex item-center gap-3 mt-4 md:m-0">
                      <Statusbadge status={application.status} /> 
                      <button
                        onClick={() =>
                          handleDownloadResume(
                            application.applicant.resume
                            )
                        }
                        className="inline-flex item-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                        <Download className="h-4 w-4" />
                        Resume
                        </button>

                      <button
                        onClick={() =>
                          setSelectedApplication(application)
                        }
                        className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100  text-gray-700 text-sm font-medium rounded-lh hover:bg-gray-200 transition-colors"
                        >
                        <Eye className="h-4 w-4" />
                        View Profile
                        </button>
                      </div>
                    </div>
                  ))}
                  </div>
                </div>
              </div>
            )
            )}
        </div>

      {/* profile model */}
          {selectedApplicant && (
      <applicationProfilePreview
        selectedApplicant={setSelectedApplicant}
        handleDownloadResume={handleDownloadResume}
        handleClose={() =>{
          setSelectedApplicant(null);
          fetchApplications();
        }}
        />
      )}
        </div>
    </DashboardLayout>
    )
}

export default ApplicationViewer;
