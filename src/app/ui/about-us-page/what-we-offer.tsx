import Image from "next/image";
import { features } from "@/app/lib/content";

export default function WhatWeOffer() {
  return (
    <div className="bg-primary py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl sm:text-5xl font-bold leading-7 text-white">
            What We Offer
          </h2>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-white">
            {features.map((feature, index) => (
              <div
                key={feature.name}
                className={`flex flex-col ${
                  index > 0 ? "lg:pl-10 pt-7" : "" // Add padding-left for items after the first one
                }`}
              >
                <dt className="flex flex-col gap-y-8 text-xl font-semibold leading-7 text-white">
                  <Image
                    src={feature.icon}
                    alt=""
                    width={70}
                    height={70}
                    className="flex-none"
                  />
                  <span>{feature.name}</span>
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-100">
                  <ul className="list-disc space-y-2">
                    {feature.description.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
