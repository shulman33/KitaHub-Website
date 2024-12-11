import EmptyState from "@/app/(marketing)/components/empty-state";
import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typeography from "@mui/material/Typography";
import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

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


export default function UpcomingAssignmentsStudent() {
  return (
    <Box
      component="div"
      sx={{
        bgcolor: "#FFFFFF",
        border: 1,
        borderColor: "#EAEFF0",
        borderRadius: "16px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typeography sx={{ fontSize: "16px", fontWeight: 700, ml: 1 }}>
            🗂️ Upcoming Assignments
          </Typeography>
        </Box>
        <Box>
          <Button disableElevation sx={{ color: "#74759A" }}>
            View All
          </Button>
        </Box>
      </Box>
      <EmptyState
        icon={<BlankPaperIcon />}
        title="No Courses Available"
        text="Get started by enrolling in a new course"
        buttonText="Enroll Now"
      />
    </Box>
  );
}
