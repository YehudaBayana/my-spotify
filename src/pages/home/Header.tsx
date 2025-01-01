import React from "react";
import { Box, Typography } from "@mui/material";

const Header: React.FC = () => {
  return (
    <Box sx={{ borderBottom: "2px solid #888", paddingBottom: "10px" }}>
      <Typography variant="h5">Home</Typography>
    </Box>
  );
};

export default Header;
