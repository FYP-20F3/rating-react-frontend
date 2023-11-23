import React from "react";
import { Box, Toolbar, AppBar } from "@mui/material";
import LogoBox from "./LogoBox";

const RegisterNavbar = () => {
  return (
    <Box sx={{ overflowX: "hidden" }}>
      <AppBar position="fixed" color="background" variant="outline" sx={{display: "flex"}}>
        <Toolbar sx={{ mr: 4, ml: 5 }}>
          <LogoBox />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default RegisterNavbar;
