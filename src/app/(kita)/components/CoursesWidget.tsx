import React from 'react';
import { Box, Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import EmptyState from '@/app/(marketing)/components/empty-state';
import { Course, CoursesWidgetProps, ExtendedClass } from '@/app/(kita)/lib/types'; 
import Counter from './StudentComponents/Counter';
import CourseRow from './StudentComponents/CourseRow';


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

const CoursesWidget: React.FC<CoursesWidgetProps> = ({ courses }) => {
  return (
    // <Box
    //   component="div"
    //   sx={{
    //     bgcolor: "#FFFFFF",
    //     border: 1,
    //     borderColor: "#EAEFF0",
    //     borderRadius: "16px",
    //   }}
    // >
    //   <Box
    //     sx={{
    //       display: "flex",
    //       justifyContent: "space-between",
    //       alignItems: "center",
    //       p: 2,
    //     }}
    //   >
    //     <Box sx={{ display: "flex", alignItems: "center" }}>
    //       <Typography sx={{ fontSize: "16px", fontWeight: 700, ml: 1 }}>
    //         🗂️ Courses
    //       </Typography>
    //     </Box>
    //     <Button disableElevation sx={{ color: "#74759A", fontSize: "14px" }}>
    //       View All
    //     </Button>
    //   </Box>
    //   <Box sx={{ p: 2 }}>
    //     {courses.length === 0 ? (
    //       <EmptyState
    //         icon={<BlankPaperIcon />}
    //         title="No Courses Available"
    //         text="Get started by enrolling in a new course"
    //         buttonText="Enroll Now"
    //       />
    //     ) : (
    //       <List sx={{ width: "100%", bgcolor: "background.paper" }}>
    //         {courses.map((course: ExtendedClass) => (
    //           <ListItem key={course.id} alignItems="flex-start">
    //             <ListItemText
    //               primary={course.className}
    //               secondary={
    //                 <>
    //                   <Typography
    //                     sx={{ display: "inline" }}
    //                     component="span"
    //                     variant="body2"
    //                     color="text.primary"
    //                   >
    //                     {`${course.professorFirstName} ${course.professorLastName}`}
    //                   </Typography>
    //                   {" — " + course.description}
    //                 </>
    //               }
    //             />
    //             <Button
    //               disableElevation
    //               sx={{ color: "#74759A", fontSize: "14px", ml: 2 }}
    //             >
    //               View Course
    //             </Button>
    //           </ListItem>
    //         ))}
    //       </List>
    //     )}
    //   </Box>
    // </Box>
    <div className='bg-white p-[24px] rounded-[16px] max-h-[378px] overflow-y-auto'>
      <div className="flex justify-between items-center">
        <p className='text-[16px] leading-[19.5px] font-bold'>🗂️ Upcoming Assignments</p>
        <button className='text-[14px] leading-[17px] text-[#74759A] font-semibold'>View All</button>
      </div>
      <div className='flex border-b-[1px] border-[#2165FF]/8 gap-[30px] py-[16px] justify-between font-semibold  text-[16px] text-secondary leading-[19.5px]'>
         <p>Course</p>
         <p>Title </p>
         <p>Deadline</p>
      </div>
     <CourseRow/>
     <CourseRow/>
     <CourseRow/>
     <CourseRow/>
    </div>
  );
};

export default CoursesWidget;