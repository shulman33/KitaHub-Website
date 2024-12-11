import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ButtonProps } from "@/app/(marketing)/lib/types";

export default function Button({
  href,
  text,
  variant,
  withIcon = false,
  border = true,
  textColor,
  textSize = "text-[20px]", 
}: ButtonProps) {
  // Base classes for all buttons
  let baseClasses =
    "rounded-md px-6 py-3 font-semibold shadow-sm whitespace-nowrap flex items-center justify-center gap-x-2";

  // Conditional classes based on button variant
  const variantClasses =
    variant === "primary"
      ? `bg-accent-purple hover:bg-accent-purple-hover focus-visible:outline-accent-purple-hover ${
          !border ? "" : "border-none"
        }`
      : `bg-white hover:bg-gray-50 focus-visible:outline-accent-purple ${
          border ? "border border-solid border-accent-purple" : "border-none"
        }`;

  // Conditional text color
  const textClasses = textColor
    ? `text-${textColor}`
    : variant === "primary"
    ? "text-white"
    : "text-accent-purple";

  return (
    <a href={href} className={`${baseClasses} ${variantClasses} z-20`}>
      <span className={`${textClasses} ${textSize} leading-[24px]`}>
        {text}
      </span>
      {withIcon && (
        <Image src="/arrow.svg" alt="Arrow" width={28} height={28} />
      )}
    </a>
  );
}
