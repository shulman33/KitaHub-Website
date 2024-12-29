import React from "react";
import Button from "./button";
import { cards } from "@/app/(marketing)/lib/content";
import SubjectButton from "./subject-button";


export default function Subjects() {
  return (
    <div className="bg-off-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-midnight-blue sm:text-4xl">
            Explore How KITAHUB Supports Your Studies
          </h1>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6 sm:gap-x-8 sm:gap-y-10">
            {cards.map((card) => (
              <div key={card.subject} className="flex justify-center">
                <SubjectButton icon={card.icon} subject={card.subject} />
              </div>
            ))}
          </dl>
        </div>
        <div className="flex mt-14 items-center justify-center">
          <Button
            href="/subjects"
            text="View All Subjects"
            variant="secondary"
            withIcon={true}
            border={true}
            textColor="black"
          />
        </div>
      </div>
    </div>
  );
}
