"use client"
import React, { useState } from "react";
import { MenuItem, Select, FormControl, Typography } from "@mui/material";

const DropdownMenu: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState("Most Recent");

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedValue(event.target.value as string);
  };

  return (
    <FormControl variant="outlined" size="small">
      <Select
        value={selectedValue}
        onChange={handleChange}
        displayEmpty
        sx={{
          backgroundColor: "#EFF4FF",
          borderRadius: "4px",
          fontSize: "14px",
          fontWeight: 500,
          color: "#6C757D",
          maxWidth: 120,
          height: 40,
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#B0BEC5",
          },
        }}
      >
        <MenuItem value="Most Recent">Most Recent</MenuItem>
        <MenuItem value="Oldest">Oldest</MenuItem>
        <MenuItem value="Trending">Trending</MenuItem>
      </Select>
     
    </FormControl>
  );
};

export default DropdownMenu;
