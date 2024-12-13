import React from "react";

interface ImageDisplayProps {
  src: string;
  alt: string;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ src, alt }) => {
  return (
    <img
      loading="lazy"
      src={src}
      alt={alt}
      className="object-contain w-full rounded-none aspect-[0.9] max-w-[1067px] max-md:max-w-full"
    />
  );
};

const HowItOperates: React.FC = () => {
  return (
    <div className="flex flex-col rounded-none">
      <section className="flex flex-col justify-center items-center px-20 py-28 w-full bg-white max-md:px-5 max-md:pt-24 max-md:max-w-full">
        <div className="mx-auto max-w-2xl mt-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-midnight-blue sm:text-4xl">
            How it Operates
          </h2>
          <p className="mt-6 text-lg text-center text-gray-700 max-md:text-base">
            Navigate Your Educational Path with Ease: Streamline Learning and
            Enhance Collaboration Through Kitahub.
          </p>
        </div>
        <ImageDisplay src="/how-it-operates.png" alt="Display image" />
      </section>
    </div>
  );
};

export default HowItOperates;




