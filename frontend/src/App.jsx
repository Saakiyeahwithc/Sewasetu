import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/LandingPage/Home";
import JobseekerDashboard from "./pages/JobSeeker/Jobseekerdashboard";
import Employerdashboard from "./pages/Employer/Employerdashboard";
import Login from "./pages/Auth/Login";
import About from "./pages/LandingPage/About";
import Register from "./pages/Auth/register";
import SkillDevelopmentPage from "./pages/LandingPage/Skilldevelopment";
import JobPostingForm from "./pages/Employer/JobPostingForm";
import ProtectedRoute from "./routes/Protectedroute";
import ManageJobs from "./pages/Employer/ManageJobs";
import EmployerProfilePage from "./pages/Employer/EmployerProfilePage";
import ApplicationViewer from "./pages/Employer/ApplicationViewer";
import SavedJobs from "./pages/JobSeeker/SavedJobs";
import JobDetails from "./pages/JobSeeker/JobDetails";
import UserProfile from "./pages/JobSeeker/UserProfile";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/*Public Routes*/}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />

        {/* {protected routes} */}
        <Route element={<ProtectedRoute allowedRoles="employer" />}>
          <Route path="/employerdashboard" element={<Employerdashboard />} />
          <Route path="/post-job" element={<JobPostingForm />} />
          <Route path="/manage-jobs" element={<ManageJobs />} />
          <Route path="/applicants" element={<ApplicationViewer />} />
          <Route path="/company-profile" element={<EmployerProfilePage />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles="jobseeker" />}>
          <Route path="/jobseekerdashboard" element={<JobseekerDashboard />} />
          <Route path="/job/:jobId" element={<JobDetails />} />
          <Route path="/saved-jobs" element={<SavedJobs />} />
          <Route path="/profile/:id" element={<UserProfile />} />
          <Route path="/SkillDevelopment" element={<SkillDevelopmentPage />} />
        </Route>

        {/*catch all routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontsize: "13px",
          },
        }}
      />
    </AuthProvider>
  );
}

export default App;
