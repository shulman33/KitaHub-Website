import InfoSection from "./info-section";

const content = [
  {
    paragraph: `KitaHub was founded by computer science students who experienced the challenges of traditional grading and recruitment processes firsthand. We recognized that existing educational tools often failed to capture a student's true abilities, while recruitment relied on artificial assessments.`,
  },
  {
    paragraph: `KitaHub was created to empower students and educators with a platform that ensures accurate grading through standardized code testing enviroments and encourages dynamic collaboration. Our mission is to bridge the gap between academia and industry, providing recruiters with genuine insights into candidates' academic performance and contributions, thereby making the transition from education to career more transparent and effective.`,
  },
];

export default function AboutUs(){

  return (
    <div className="bg-white py-24 sm:py-32">
      <InfoSection imagePosition="left" imageSrc="/logo3d.jpg" content={ content } />
    </div>
  );
}
