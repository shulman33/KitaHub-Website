import React from "react";
import Image from "next/image";

export default function HeaderRibbon() {
  return (
    <div className="hidden lg:flex bg-secondary-color p-3 items-center justify-between">
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
        <Image src="/facebook.png" alt="Facebook" width={20} height={20} />
        <Image src="/twitter.png" alt="Twitter" width={20} height={20} />
        <Image src="/instagram.png" alt="Instagram" width={20} height={20} />
        <Image src="/linkedin.png" alt="LinkedIn" width={20} height={20} />
      </div>
    </div>
  );
}
