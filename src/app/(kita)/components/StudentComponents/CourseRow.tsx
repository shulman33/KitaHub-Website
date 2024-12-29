import Link from "next/link";
import Counter from "./Counter";

interface CourseRowProps {
  courseName: string;
  courseId: string;
  title: string;
  timeToDeadline: {
    days: number;
    hours: number;
    minutes: number;
  };
}

const CourseRow: React.FC<CourseRowProps> = ({
  courseName,
  courseId,
  title,
  timeToDeadline,
}) => {
  return (
    <div className="grid grid-cols-3 border-b-[1px] border-[#2165FF]/8 gap-[30px] py-[16px] justify-between items-center text-[16px] text-secondary leading-[19.5px]">
      {/* <p className="text-[16px] flex-shrink-0">{`🗂️ ${courseName}`}</p> */}
      <Link href={`/dashboard/${courseId}`} className="text-[16px] flex-shrink-0">
        {`🗂️ ${courseName}`}
      </Link>
      <p className="flex-shrink-0">{title}</p>
      <Counter initialTime={timeToDeadline} />
    </div>
  );
};
export default CourseRow;