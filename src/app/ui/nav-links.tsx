import Link from "next/link";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about-us" },
  { name: "Demo Class", href: "/demo-class" },
  { name: "Faq", href: "/faq" },
  { name: "Help", href: "/help" },
];

export default function NavLinks() {
  return (
    <>
      <div className="flex lg:flex-1">
        <Link href="/" className="-m-1.5 p-1.5">
          <span className="sr-only">KitaHub</span>
          <img
            alt="KitaHub Logo"
            src="logo-navbar.svg"
            className="h-12 sm:h-11 w-auto"
          />
        </Link>
      </div>
      <div className="hidden lg:flex lg:gap-x-12">
        {navigation.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="text-base font-normal leading-6 text-gray-900"
          >
            {item.name}
          </a>
        ))}
      </div>
      <div className="hidden lg:flex flex-1 items-center justify-end gap-x-6">
        <Link
          href="#"
          className="rounded-md bg-secondary-2rd-color px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 whitespace-nowrap"
        >
          Sign Up
        </Link>
        <Link
          href="#"
          className="rounded-md bg-white border border-solid border-secondary-2rd-color px-6 py-3 text-sm font-semibold text-secondary-2rd-color shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 whitespace-nowrap"
        >
          Log In
        </Link>
      </div>
    </>
  );
}
