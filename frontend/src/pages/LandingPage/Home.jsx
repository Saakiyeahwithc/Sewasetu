import HeroSection from "@/components/HeroSection";
import Jobsearch from "@/components/Jobsearch";
import Featuredjobs from "@/components/Featuredjobs";
import Working from "@/components/Working";
import Footer from "@/components/Footer";
import Endnote from "@/components/Endnote";
import Navbar from "../../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Jobsearch />
      <Featuredjobs />
      <Working />
      <Endnote />
      <Footer />
    </>
  );
}
