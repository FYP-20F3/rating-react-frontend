import React from "react";
import { Box, Toolbar, AppBar, Typography, Button } from "@mui/material";
import LogoBox from "./LogoBox";
import { useNavigate } from "react-router-dom";

const LoginNavbar = () => {
  const navigate = useNavigate();
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
            <Button
              variant="text"
              align="center"
              color="primary"
              onClick={() => navigate("/customer/register")}
            >
              Register Now
            </Button>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default LoginNavbar;
