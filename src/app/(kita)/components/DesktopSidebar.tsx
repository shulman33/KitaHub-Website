import Link from "next/link";
import Image from "next/image";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";

type SubItem = {
  name: string;
  href: string;
  current: boolean;
};

type NavigationItem = {
  name: string;
  href: string;
  icon: any;
  current: boolean;
  children?: SubItem[];
};

type Props = {
  navigation: NavigationItem[];
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function DesktopSidebar({ navigation }: Props) {
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div
        className="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4"
        style={{
          background:
            "linear-gradient(28.77deg, #D620FF 3.77%, #0D6CFF 82.28%)",
        }}
      >
        <div className="flex h-16 shrink-0 items-center justify-center pt-2">
          <Link href="/dashboard">
            <Image
              alt="KitaHub"
              width={8}
              height={48}
              src="/white-kh-logo.svg"
              className="h-12 w-20"
            />
          </Link>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    {!item.children ? (
                      <Link
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-white text-accent-purple"
                            : "text-white hover:bg-indigo-700 hover:text-white",
                          "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                        )}
                      >
                        <item.icon
                          aria-hidden="true"
                          className={classNames(
                            item.current
                              ? "text-accent-purple"
                              : "text-white group-hover:text-white",
                            "h-6 w-6 shrink-0"
                          )}
                        />
                        {item.name}
                      </Link>
                    ) : (
                      <Disclosure as="div">
                        <DisclosureButton
                          className={classNames(
                            item.current
                              ? "bg-white text-accent-purple"
                              : "text-white hover:bg-indigo-700 hover:text-white",
                            "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                          )}
                        >
                          <ChevronRightIcon
                            aria-hidden="true"
                            className="size-5 shrink-0 text-white group-data-[open]:rotate-90 group-data-[open]:text-white"
                          />
                          {item.name}
                        </DisclosureButton>
                        <DisclosurePanel as="ul" className="mt-1 px-2">
                          {item.children.map((subItem) => (
                            <li key={subItem.name}>
                              <DisclosureButton
                                as="a"
                                href={subItem.href}
                                className={classNames(
                                  subItem.current
                                    ? "bg-white text-accent-purple"
                                    : "text-white hover:bg-indigo-700 hover:text-white",
                                  "block rounded-md py-2 pl-9 pr-2 text-sm/6"
                                )}
                              >
                                {subItem.name}
                              </DisclosureButton>
                            </li>
                          ))}
                        </DisclosurePanel>
                      </Disclosure>
                    )}
                  </li>
                ))}
              </ul>
            </li>
            <li className="mt-auto">
              <Link
                href="#"
                className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-white hover:bg-indigo-700 hover:text-white"
              >
                <Cog6ToothIcon
                  aria-hidden="true"
                  className="h-6 w-6 shrink-0 text-white group-hover:text-white"
                />
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
