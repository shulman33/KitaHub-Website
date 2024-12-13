import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EmptyState from "@/app/(marketing)/components/empty-state";
import { MessageWidgetProps } from "@/app/(kita)/lib/types";
import CustomBadge from "./Badge";
import { SelectMessage } from "@/app/db/schema";
import { ExtendedMessage, ExtendedSelectMessage } from "@/app/(kita)/lib/types";
;
import SearchBar from "./StudentComponents/SearchBar";
import DropdownMenu from "./StudentComponents/DropDown";
import Image from "next/image";
import DiscussionCard from "./StudentComponents/DiscussionCard";
const emptyProfilePic = () => {
  return (
    <span className="inline-block size-10 overflow-hidden rounded-full bg-gray-100">
      <svg
        fill="currentColor"
        viewBox="0 0 24 24"
        className="size-full text-gray-300"
      >
        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    </span>
  );
};

const BlankPaperIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="mx-auto h-12 w-12 text-gray-400"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
      />
    </svg>
  );
};

const DiscussionBoardWidget: React.FC<MessageWidgetProps> = ({ messages }) => {
  return (
    <div className="p-[24px] max-h-[378px] overflow-y-auto bg-white">

      {/* Header section */}

      <div className="flex justify-between  items-center">
        <div className="text-secondary text-[16px] leading-[19px] font-bold">
          <p className="text-[14px]  leading-[19px] font-bold  ">💬 Discussion Board</p>
        </div>
        <div>
          <p className="text-[#74759A] text-[14px] ">+ New Discussion</p>
        </div>

      </div>
      {/* search bar section */}
      <div className=" flex py-[20px] justify-between gap-4">
        <SearchBar />

        <DropdownMenu />

      </div>

     <DiscussionCard index={0}/>
     <DiscussionCard index={1}/>


    </div>
  );
};

export default DiscussionBoardWidget;
