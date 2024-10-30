import InfoSection from "../info-section";

const content = [
  {
    paragraph: `KitaHub envisions a world where education is accessible, interactive, and impactful for learners of all disciplines. We strive to revolutionize traditional teaching methods by integrating innovative technology that supports the evolving needs of students and educators. Our platform is designed to create a supportive online learning environment where curiosity thrives, knowledge is shared, and academic success is achieved.`,
  },
  {
    paragraph: `By connecting academic achievement with real-world opportunities, Kitahub aims to prepare students for future challenges and empower them to reach their full potential. We are dedicated to fostering an educational experience that not only enriches students' academic journeys but also bridges the gap between learning and career advancement, paving the way for a brighter and more connected future.`,
  },
];

export default function OurVision() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <InfoSection
        header="Our Vision"
        imagePosition="right"
        imageSrc="/logo-bg-blue.jpg"
        withButton={false}
        content={content}
      />
    </div>
  );
}
