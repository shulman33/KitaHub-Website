import Image from "next/image";


interface HeaderProps {
  name: string;
}

export default function Header({ name }: HeaderProps) {
    const date = new Date();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    return (
      <header className="bg-primary h-60 relative isolate px-12 rounded-2xl">
        <div className="absolute inset-x-12 top-12 bottom-12 left-12 flex flex-col items-start text-base text-white max-w-[277px]">
          <time className="font-medium">{`${month} ${day}, ${year}`}</time>
          <div className="flex gap-2.5 mt-auto font-semibold text-center">
            <h1 className="grow">Welcome Back</h1>
            <Image
              src="/wave.svg"
              width={20}
              height={20}
              className="object-contain shrink-0 w-5 aspect-square"
              alt=""
            />
          </div>
          <h2 className="self-stretch mt-4 w-full text-3xl font-bold">
            {name}
          </h2>
        </div>
      </header>
    );
}