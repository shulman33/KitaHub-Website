import Heading from "../components/heading";
import Faq from "../components/faq";
import Contact from "../components/contact";
import WhatWeOffer from "../components/about-us-page/what-we-offer";
import OurMission from "../components/about-us-page/our-mission";
import OurVision from "../components/about-us-page/our-vision";

export default function AboutUs() {
  return (
    <main>
      <Heading />
      <OurMission />
      <WhatWeOffer />
      <OurVision />
      <Faq />
      <Contact />
    </main>
  );
}
