import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex justify-center items-center flex-col min-h-screen">
      <Image src="/Opps.svg" width={353} height={156} alt="Oops" priority />
      <p className="mb-[50px] mt-[10px]">Page Not Found</p>
      <Image
        src="/OBJECTS.svg"
        width={797}
        height={423}
        alt="404 illustration"
        priority
      />

      <Link
        href="/"
        className="bg-[#0D6CFF] mt-[70px] rounded-[4px] text-[16px] py-[16px] px-[32px] text-white hover:bg-blue-600 transition-colors"
      >
        Go To Homepage
      </Link>
    </div>
  );
}
