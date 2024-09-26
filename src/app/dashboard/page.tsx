"use client";

import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { UpcomingAssignmentsWrapper } from "./components/UpcomingAssignments";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import {
  Dialog,
  DialogPanel,
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import {
  CalendarDaysIcon,
  CreditCardIcon,
  FaceFrownIcon,
  FaceSmileIcon,
  FireIcon,
  HandThumbUpIcon,
  HeartIcon,
  PaperClipIcon,
  UserCircleIcon,
  XMarkIcon as XMarkIconMini,
} from "@heroicons/react/20/solid";
import {} from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import DiscussionBoardWidget from "./components/DiscussionBoardWidget";
import UpcomingDeadline from "./components/UpcomingDeadlineWidget";
import SubmissionStatusWidget from "./components/SubmissionStatusWidget";
import Image from "next/image";

const invoice = {
  subTotal: "$8,800.00",
  tax: "$1,760.00",
  total: "$10,560.00",
  items: [
    {
      id: 1,
      title: "Logo redesign",
      description: "New logo and digital asset playbook.",
      hours: "20.0",
      rate: "$100.00",
      price: "$2,000.00",
    },
    {
      id: 2,
      title: "Website redesign",
      description: "Design and program new company website.",
      hours: "52.0",
      rate: "$100.00",
      price: "$5,200.00",
    },
    {
      id: 3,
      title: "Business cards",
      description: 'Design and production of 3.5" x 2.0" business cards.',
      hours: "12.0",
      rate: "$100.00",
      price: "$1,200.00",
    },
    {
      id: 4,
      title: "T-shirt design",
      description: "Three t-shirt design concepts.",
      hours: "4.0",
      rate: "$100.00",
      price: "$400.00",
    },
  ],
};
const activity = [
  {
    id: 1,
    type: "created",
    person: { name: "Chelsea Hagon" },
    date: "7d ago",
    dateTime: "2023-01-23T10:32",
  },
  {
    id: 2,
    type: "edited",
    person: { name: "Chelsea Hagon" },
    date: "6d ago",
    dateTime: "2023-01-23T11:03",
  },
  {
    id: 3,
    type: "sent",
    person: { name: "Chelsea Hagon" },
    date: "6d ago",
    dateTime: "2023-01-23T11:24",
  },
  {
    id: 4,
    type: "commented",
    person: {
      name: "Chelsea Hagon",
      imageUrl:
        "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    comment:
      "Called client, they reassured me the invoice would be paid by the 25th.",
    date: "3d ago",
    dateTime: "2023-01-23T15:56",
  },
  {
    id: 5,
    type: "viewed",
    person: { name: "Alex Curren" },
    date: "2d ago",
    dateTime: "2023-01-24T09:12",
  },
  {
    id: 6,
    type: "paid",
    person: { name: "Alex Curren" },
    date: "1d ago",
    dateTime: "2023-01-24T09:20",
  },
];
const moods = [
  {
    name: "Excited",
    value: "excited",
    icon: FireIcon,
    iconColor: "text-white",
    bgColor: "bg-red-500",
  },
  {
    name: "Loved",
    value: "loved",
    icon: HeartIcon,
    iconColor: "text-white",
    bgColor: "bg-pink-400",
  },
  {
    name: "Happy",
    value: "happy",
    icon: FaceSmileIcon,
    iconColor: "text-white",
    bgColor: "bg-green-400",
  },
  {
    name: "Sad",
    value: "sad",
    icon: FaceFrownIcon,
    iconColor: "text-white",
    bgColor: "bg-yellow-400",
  },
  {
    name: "Thumbsy",
    value: "thumbsy",
    icon: HandThumbUpIcon,
    iconColor: "text-white",
    bgColor: "bg-blue-500",
  },
  {
    name: "I feel nothing",
    value: null,
    icon: XMarkIconMini,
    iconColor: "text-gray-400",
    bgColor: "bg-transparent",
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default withPageAuthRequired(function MainDashboard() {
  const [selected, setSelected] = useState(moods[5]);
  const { user, error, isLoading } = useUser();

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
    <div>
      <main>
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
              {user?.name}
            </h2>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid grid-cols-8 max-w-7xl gap-4">
            <div className="col-span-6 sm:col-span-4">
              <UpcomingAssignmentsWrapper />
            </div>

            <div className="col-span-6 sm:col-span-4">
              <DiscussionBoardWidget
              initialDiscussions={[]}
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <UpcomingDeadline month="September" year={2024} />
            </div>

            <div className="col-span-6 sm:col-span-5">
              <SubmissionStatusWidget />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
});
