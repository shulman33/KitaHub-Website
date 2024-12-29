import InfoSection from "../info-section";

const content = [
  {
    paragraph: `Our mission at KitaHub is to empower students and educators by providing tools that enhance collaboration, streamline assignment management, and support continuous learning. We aim to address the challenges faced in traditional educational environments by offering a platform that accommodates a wide range of subjects and promotes accurate grading through standardized code testing enviroments. KitaHub is designed to facilitate meaningful interactions and foster a deeper understanding of course material, helping students develop their skills and educators manage coursework more effectively.`,
  },
  {
    paragraph: `We are also committed to bridging the gap between academia and industry by offering recruiters authentic insights into candidates' academic performance and collaborative efforts. By showcasing students' genuine skills and achievements, KitaHub enables a more transparent and effective transition from education to career, ultimately contributing to the development of future leaders in the tech industry and beyond.`,
  },
];

export default function OurMission() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-4xl mb-7 md:mb-16 text-center">
        <h2 className="text-2xl md:text-5xl font-bold leading-7 text-midnight-blue">
          Where Education Meets Innovation
        </h2>
        <p className="mt-6 text-lg leading-8 text-gray-500 px-2">
          At KitaHub, we blend cutting-edge technology with educational
          excellence to create a platform that truly reflects the needs of
          modern learners and educators.
        </p>
      </div>
      <InfoSection
        header="Our Mission"
        imagePosition="left"
        imageSrc="/logo-transparent.png"
        withButton={false}
        content={content}
      />
    </div>
  );
}
