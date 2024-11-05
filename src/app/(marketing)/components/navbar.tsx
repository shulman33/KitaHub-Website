"use client";

import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import HeaderRibbon from "./header-ribbon";
import NavLinks from "./nav-links";

export default function NavBar({ session }: { session: any }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white">
      <HeaderRibbon />
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-4 lg:px-8"
      >
        <NavLinks session={session} /> {/* Pass session to NavLinks */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-0.5 inline-flex items-center justify-center rounded-full p-2.5 text-white bg-accent-purple"
            aria-label="Open main menu"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-8 w-8" />
          </button>
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <NavLinks
            isMobile={true}
            closeMobileMenu={() => setMobileMenuOpen(false)}
            session={session}
          />
        </DialogPanel>
      </Dialog>
    </header>
  );
}
