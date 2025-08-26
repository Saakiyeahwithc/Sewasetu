import Ourmission from "@/components/Ourmission";
import { Testimonial } from "@/components/Testimonial";
import { Whoweare } from "@/components/Who-we-are";
import Whatweoffer from "@/components/Whatweoffer";
import { Footer } from "@/components/Footer";
export function About() {
  return (
    <>
      <Whoweare />
      <Ourmission />
      <Whatweoffer />
      <Testimonial />
      <Footer />
    </>
  );
}

export default About;
