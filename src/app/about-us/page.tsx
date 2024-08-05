import Heading from "../ui/heading";
import Faq from "../ui/faq";
import Contact from "../ui/contact";
import WhatWeOffer from "../ui/about-us-page/what-we-offer";
import OurMission from "../ui/about-us-page/our-mission";
import OurVision from "../ui/about-us-page/our-vision";

export default function AboutUs() {
  return (
    <main>
      <Heading />
      <OurMission />
      <WhatWeOffer />
      <OurVision />
      <Faq
        bgColor="bg-primary"
        textColor="white"
        answerColor="gray-200"
      />
      <Contact />
    </main>
  );
}
