import Image from "next/image";
export default function Hero() {

  return (
    <div className="bg-secondary-color">
      <div className="relative isolate pt-14">
        <div className="py-2 sm:py-2 lg:pb-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-5xl font-bold tracking-normal text-white sm:text-6xl">
                Empower Learning and Talent Discovery with KitaHub
              </h1>
              <p className="mt-6 text-lg font-medium leading-8 text-white">
                Transform Education with Seamless Code Testing and
                Collaboration: Empower Students and Enhance Recruiter Insights
                through Genuine Academic Performance
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="#"
                  className="rounded-md bg-white w-[188px] h-[60px] px-7 py-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <div className="flex items-center justify-center gap-x-2">
                    <span className="text-black font-semibold text-[20px] leading-[24px]">
                      Join Now
                    </span>
                    <Image
                      src="/arrow.svg"
                      alt="Arrow"
                      width={28}
                      height={28}
                    />
                  </div>
                </a>
              </div>
            </div>
            <div className="mt-16 flow-root sm:mt-24">
              <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                <img
                  alt="App screenshot"
                  src="https://tailwindui.com/img/component-images/project-app-screenshot.png"
                  width={2432}
                  height={1442}
                  className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
