import "./App.css";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import Jobsearch from "./components/Jobsearch";
import Featuredjobs from "./components/Featuredjobs";
import Working from "./components/working";
import EmployerDashboard from "./components/Employerdashboard";
import JobseekerDashboard from "./components/Jobseekerdashboard";
function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Jobsearch />
      <Featuredjobs />
      <Working />
      <JobseekerDashboard />
      {/* <EmployerDashboard /> */}
    </>
  );
}

export default App;
