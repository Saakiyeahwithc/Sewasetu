import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import EmployerDashboard from "./components/Employerdashboard";
import JobseekerDashboard from "./components/Jobseekerdashboard";
import Login from "./pages/login";
import About from "./pages/About";



function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employerdashboard" element={<EmployerDashboard />} />
        <Route path="/jobseekerdashboard" element={<JobseekerDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
