import Image from "next/image";
import Button from "./button";
import { InfoSectionProps } from "../lib/types";


export default function InfoSection({
  imagePosition = "right",
  imageSrc = "/logo3d.jpg",
  withButton = true,
  header = "About Us",
  content,
}: InfoSectionProps) {
  const imageOrder = imagePosition === "left" ? "order-first" : "order-last";
  const textOrder = imagePosition === "left" ? "order-last" : "order-first";

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2">
        <div
          className={`flex flex-col items-start rounded-xl max-w-[584px] max-md:pr-5 lg:mr-5 ${imageOrder}`}
        >
          <div className="flex flex-col justify-center items-start pt-5 pl-5 pb-5 rounded-xl bg-blue-600 bg-opacity-10 max-md:max-w-full">
            <Image
              src={imageSrc}
              alt="text"
              width={2048}
              height={2048}
              className="rounded-xl"
            />
          </div>
        </div>
        <div className={`${textOrder}`}>
          <div className="text-base leading-7 text-gray-700 lg:max-w-lg">
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-midnight-blue sm:text-[48px]">
              {header}
            </h1>
            <div className="max-w-xl">
              {content.map((item, index) => (
                <p key={index} className="mt-6">
                  {item.paragraph}
                </p>
              ))}
            </div>
          </div>
          {withButton && (
            <div className="flex mt-10">
              <Button
                href="/about-us"
                text="Read More"
                variant="secondary"
                withIcon={true}
                border={true}
                textColor="black"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
