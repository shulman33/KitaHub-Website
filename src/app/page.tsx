import Hero from "@/app/ui/hero";
import Subjects from "@/app/ui/subjects";
import Faq from "@/app/ui/faq";
import Contact from "./ui/contact";
import HowItOperates from "./ui/how-it-operates";
import AboutUsComponent from "@/app/ui/about-us";

export default function Landing() {

  return (
    <main>
      <Hero />
      <AboutUsComponent />
      <Subjects />
      <HowItOperates />
      <Faq />
      <Contact />
    </main>
  );
}
