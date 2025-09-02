import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/LandingPage/Home";
import JobseekerDashboard from "./pages/JobSeeker/Jobseekerdashboard";
import Employerdashboard from "./pages/Employer/Employerdashboard";
import Login from "./pages/Auth/Login";
import About from "./pages/LandingPage/About";
import Register from "./pages/Auth/Register";
import SkillDevelopmentPage from "./pages/LandingPage/Skilldevelopment";
import FindJobs from "./pages/JobSeeker/Findjobs";
import PostJob from "./pages/Employer/Postjobs";
import ProtectedRoute from "./routes/Protectedroute";
import ManageJobs from "./pages/Employer/ManageJobs";
import EmployerProfilePage from "./pages/Employer/EmployerProfilePage";
import ApplicationViewer from "./pages/Employer/Applicationviewer";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
    
      <Routes>
        {/*Public Routes*/}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />

        {/* {protected routes} */}
        <Route element={<ProtectedRoute allowedRoles="employer" />}>
          <Route path="/employerdashboard" element={<Employerdashboard />} />
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/manage-jobs" element={<ManageJobs />} />
          <Route path="/applicants" element={<ApplicationViewer />} />
          <Route path="/company-profile" element={<EmployerProfilePage />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles="jobseeker" />}>
          <Route path="/jobseekerdashboard" element={<JobseekerDashboard />} />
          <Route path="/FindJobs" element={<FindJobs />} />
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
    </>
  );
}

export default App;
