import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function HeaderRibbon() {
  return (
    <div className="hidden lg:flex bg-primary p-3 items-center justify-between">
      <div className="contact-info flex items-center space-x-8 ml-32">
        <div className="flex items-center space-x-3">
          <Image src="/telephone.svg" alt="Telephone" width={20} height={20} />
          <span className="text-white font-medium text-base">
            +1 (973)-699-8748
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <Image src="/email.svg" alt="Email" width={20} height={20} />
          <span className="text-white font-medium text-base">
            support@kitahub.io
          </span>
        </div>
      </div>
      <div className="follow-us-social flex items-center space-x-3 mr-32">
        <span className="text-white font-medium text-base">Follow us</span>
        <Link href="https://www.facebook.com/share/3LoEDricwdQNYGTj/?mibextid=LQQJ4d">
          <Image src="/facebook.svg" alt="Facebook" width={20} height={20} />
        </Link>
        <Link href="https://x.com/kita_hubIO">
          <Image src="/twitter.svg" alt="Twitter" width={20} height={20} />
        </Link>
        <Link href="https://www.instagram.com/kitahub.io/">
          <Image src="/instagram.svg" alt="Instagram" width={20} height={20} />
        </Link>
        <Link href="/help">
          <Image src="/linkedin.svg" alt="LinkedIn" width={20} height={20} />
        </Link>
      </div>
    </div>
  );
}
