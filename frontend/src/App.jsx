import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import EmployerDashboard from "./components/Employerdashboard";
import JobseekerDashboard from "./components/Jobseekerdashboard";
import Login from "./pages/login";
import About from "./pages/About";
import Register from "./pages/Register";
import SkillDevelopmentPage from "./pages/Skilldevelopment";
import FindJobs from "./pages/FindJobs";
import PostJob from "./pages/Postjobs";
import ProtectedRoute from "./routes/Protectedroute";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute user={null} />}>
          {/* {protected routes} */}
          <Route path="/employerdashboard" element={<EmployerDashboard />} />
          <Route path="/jobseekerdashboard" element={<JobseekerDashboard />} />
          <Route path="/PostJob" element={<PostJob />} />
          <Route path="/FindJobs" element={<FindJobs />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/SkillDevelopment" element={<SkillDevelopmentPage />} />
        <Route path="*" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
