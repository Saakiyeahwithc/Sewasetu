import HeroSection from "@/components/HeroSection";
import Jobsearch from "@/components/Jobsearch";
import Featuredjobs from "@/components/Featuredjobs";
import Working from "@/components/Working";
import Footer from "@/components/Footer";
import Endnote from "@/components/Endnote";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Jobsearch />
      <Featuredjobs />
      <Working />
      <Endnote />
      <Footer />
    </>
  );
}
