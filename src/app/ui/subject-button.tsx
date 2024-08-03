import { SubjectButtonProps } from "@/app/lib/types";
import Image from "next/image";

const SubjectButton: React.FC<SubjectButtonProps> = ({ icon, subject }) => {
  return (
    <button className="flex items-center justify-center w-full max-w-[180px] h-12 p-3 gap-2 text-xs sm:text-sm font-medium text-black bg-white rounded-tl-md hover:bg-gray-100 transition-all duration-200">
      <Image
        src={icon}
        alt={`${subject} icon`}
        width={24}
        height={24}
        className="object-contain shrink-0 w-6 h-6"
      />
      <span className="whitespace-nowrap">{subject}</span>
    </button>
  );
};

export default SubjectButton;