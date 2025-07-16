import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import EmployerDashboard from "./components/Employerdashboard";
import JobseekerDashboard from "./components/Jobseekerdashboard";
import Login from "./pages/login";
import About from "./pages/About";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import SkillDevelopmentPage from "./pages/Skilldevelopment";
import FindJobs from "./pages/FindJobs";
import PostJob from "./pages/Postjobs";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employerdashboard" element={<EmployerDashboard />} />
        <Route path="/jobseekerdashboard" element={<JobseekerDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/SkillDevelopment" element={<SkillDevelopmentPage />} />
        <Route path="/FindJobs" element={<FindJobs />} />
        <Route path="/PostJob" element={<PostJob />} />
        <Route path="*" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
