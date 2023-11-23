import React from "react";
import { Box, Toolbar, AppBar, Typography } from "@mui/material";
import LogoBox from "./LogoBox";

const LoginNavbar = () => {
  return (
    <Box sx={{ overflowX: "hidden" }}>
      <AppBar
        position="fixed"
        color="background"
        variant="outline"
        sx={{ display: "flex", flexDirection: { xs: "column" } }}
      >
        <Toolbar sx={{ mr: 4, ml: 5 }}>
          <LogoBox />
            <Typography
              variant="body3"
              sx={{
                ml: "auto",
              }}
            >
              Don't have an account?{" "}
              <Typography variant="body3" align="center" color="primary">
                Register Now
              </Typography>
            </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default LoginNavbar;
