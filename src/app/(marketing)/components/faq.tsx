import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";

import { faqs } from "@/app/(marketing)/lib/content";

export default function Faq({
  bgColor = "bg-primary",
  textColor = "white",
  answerColor = "gray-300",
}) {
  return (
    <div className={bgColor} id="faq">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className={`mx-auto max-w-4xl divide-y divide-${textColor}/10`}>
          <h2
            className={`text-2xl sm:text-4xl font-bold leading-10 tracking-tight text-${textColor} text-center`}
          >
            Frequently Asked Questions
          </h2>
          <dl className={`mt-10 space-y-6 divide-y divide-${textColor}/10`}>
            {faqs.map((faq) => (
              <Disclosure key={faq.question} as="div" className="pt-6">
                <dt>
                  <DisclosureButton
                    className={`group flex w-full items-start justify-between text-left text-${textColor}`}
                  >
                    <span className="text-lg font-medium leading-7">
                      {faq.question}
                    </span>
                    <span className="ml-6 flex h-7 items-center">
                      <PlusSmallIcon
                        aria-hidden="true"
                        className="h-6 w-6 group-data-[open]:hidden"
                      />
                      <MinusSmallIcon
                        aria-hidden="true"
                        className="h-6 w-6 [.group:not([data-open])_&]:hidden"
                      />
                    </span>
                  </DisclosureButton>
                </dt>
                <DisclosurePanel as="dd" className="mt-2 pr-12">
                  <p className={`text-base leading-7 text-${answerColor}`}>
                    {faq.answer}
                  </p>
                </DisclosurePanel>
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
