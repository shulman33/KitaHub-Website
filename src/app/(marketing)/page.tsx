import Hero from "@/app/(marketing)/components/hero";
import Subjects from "@/app/(marketing)/components/subjects";
import Faq from "@/app/(marketing)/components/faq";
import Contact from "@/app/(marketing)/components/contact";
import HowItOperates from "@/app/(marketing)/components/how-it-operates";
import AboutUsComponent from "@/app/(marketing)/components/about-us";

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
