import Image from "next/image";
import Link from "next/link";

const stats = [
  { label: "Founded", value: "2021" },
  { label: "Employees", value: "37" },
  { label: "Countries", value: "12" },
  { label: "Raised", value: "$25M" },
];

export default function AboutUs() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col items-start rounded-xl max-w-[584px] max-md:pr-5 lg:mr-5">
            <div className="flex flex-col justify-center items-start pt-5 pl-5 pb-5 rounded-xl bg-blue-600 bg-opacity-10 max-md:max-w-full">
              <Image
                loading="lazy"
                src="/AboutUs.png"
                alt="text"
                width={564}
                height={498}
              />
            </div>
          </div>
          <div>
            <div className="text-base leading-7 text-gray-700 lg:max-w-lg">
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-[48px]">
                About Us
              </h1>
              <div className="max-w-xl">
                <p className="mt-6">
                  Kitahub was founded by a team of passionate computer science
                  students from Yeshiva University who experienced firsthand the
                  challenges in classroom assignment grading and the recruitment
                  process. We saw how traditional educational tools often failed
                  to reflect a student's true capabilities and how recruitment
                  practices relied heavily on artificial assessments.
                </p>
                <p className="mt-6">
                  Driven by a desire to make a meaningful change, we built
                  Kitahub to empower students and educators with a platform that
                  ensures accurate grading through standardized code testing and
                  fosters dynamic collaboration.
                </p>
                <p className="mt-6">
                    Our
                  mission extends to bridging the gap between academia and
                  industry by providing recruiters with authentic insights into
                  candidates' academic performance and contributions, making the
                  path from education to career more transparent and effective.
                </p>
              </div>
            </div>

            <div className="mt-10 flex">
              <Link
                href="/about-us"
                className="rounded-md bg-white border border-solid border-secondary-2rd-color px-6 py-3 text-sm font-semibold text-secondary-2rd-color shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 whitespace-nowrap"
              >
                <div className="flex items-center justify-center gap-x-2">
                  <span className="text-black font-semibold text-[20px] leading-[24px]">
                    Read More
                  </span>
                  <Image src="/arrow.svg" alt="Arrow" width={28} height={28} />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
