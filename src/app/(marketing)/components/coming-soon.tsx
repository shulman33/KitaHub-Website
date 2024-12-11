import Image from "next/image";

export default function ComingSoon() {
  return (
    <div className="bg-primary relative isolate pt-14">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-no-repeat bg-cover"
          style={{ backgroundImage: "url('/HeroBGTexture.png')" }}
        ></div>
      </div>
      <div className="relative py-2 sm:py-2 lg:pb-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-5xl font-bold tracking-normal text-white sm:text-6xl">
              Coming Soon!
            </h1>
          </div>
        </div>
      </div>
      <div className="relative mt-10 lg:-mt-52">
        <Image
          src="/HeroImage.png"
          alt="Hero Image"
          layout="responsive"
          width={1500}
          height={500}
          className="w-full h-auto z-10 relative"
        />
        <div className="absolute bottom-0 left-0 w-full h-[14%] bg-white z-0"></div>
      </div>
    </div>
  );
}
