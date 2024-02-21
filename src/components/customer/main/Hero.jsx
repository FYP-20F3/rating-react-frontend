import React from "react";
import { Box, Typography, Button, Container, Grid } from "@mui/material";
import HeroIcon from "../../../assets/svg/HeroIcon";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  const heading = ["Empowering ", "Trust ", "and ", "Transparency"];
  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        display: "flex",
      }}
    >
      <Grid
        container
        sx={{
          justifyContent: "center",
          columnGap: "100px",
          alignItems: "center",
          height: { md: "80vh", xs: "150vh" },
        }}
      >
        <Grid item xs={9} sm={9} md={4} lg={4}>
          <Box sx={{ width: 400 }}>
            {heading.map((item, index) => {
              const color = index % 2 === 0 ? "secondary" : "primary";
              return (
                <Typography
                  key={index}
                  color={color}
                  variant="h1"
                  component="span"
                >
                  {item}
                </Typography>
              );
            })}
            <Typography
              variant="body4"
              component="h3"
              sx={{ color: "text.secondary", my: 2 }}
            >
              Real Feedback for Customers, Real Insights for Businesses
            </Typography>
          </Box>
          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ px: 3.6 }}
              onClick={() => {
                navigate("/customer/register");
              }}
            >
              Register
            </Button>
            <Button
              variant="contained"
              color="secondary"
              sx={{ px: 2.5, ml: 3 }}
              onClick={() => {
                navigate("/business/register");
              }}
            >
              Business Solutions
            </Button>
          </Box>
        </Grid>
        <Grid item xs={9} sm={9} md={4} lg={4}>
          <HeroIcon />
        </Grid>
      </Grid>
    </Box>
  );
};

export default HeroSection;
