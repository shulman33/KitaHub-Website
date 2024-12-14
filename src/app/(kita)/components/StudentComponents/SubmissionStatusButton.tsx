"use client"
import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const SubmissionStatusButton: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleClick}
        endIcon={<ArrowDropDownIcon />}
        sx={{
          backgroundColor: "#007BFF",
          color: "#fff",
          textTransform: "none",
          fontSize: "14px",
          fontWeight: "500",
          borderRadius: "8px",
          padding: "8px 16px",
          "&:hover": {
            backgroundColor: "#0056b3",
          },
        }}
      >
        Submission Status
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Pending</MenuItem>
        <MenuItem onClick={handleClose}>Approved</MenuItem>
        <MenuItem onClick={handleClose}>Rejected</MenuItem>
      </Menu>
    </div>
  );
};

export default SubmissionStatusButton;
