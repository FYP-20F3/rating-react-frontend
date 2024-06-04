import React from "react";
import { Grid, Paper, Typography, Stack, Box } from "@mui/material";
import Logo from "../../../assets/svg/Logo";
import { grey } from "@mui/material/colors";

const Footer = () => {
  return (
    <Box
      sx={{
        padding: "20px",
        color: "background.paper",
        backgroundColor: "secondary.main",
        display: "flex",
        position: "relative",
        bottom: 0,
      }}
    >
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          md={4}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Box sx={{ width: "62%" }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <Logo />
              <Typography variant="h3" sx={{ ml: 0.3, fontSize: "1.4rem" }}>
                VOC
              </Typography>
            </Box>
            <Typography variant="body4">
              Copyright © 2023 Voice of Customer. All rights reserved.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack spacing={2}>
            <Typography variant="h3">Our Links</Typography>
            <Typography variant="body4">Help Center</Typography>
            <Typography variant="body4">Terms & Conditions</Typography>
            <Typography variant="body4">Privacy Policy</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack spacing={2}>
            <Typography variant="h3">Contact Us</Typography>
            <Typography variant="body4">
              Email: support@yourcompany.com
            </Typography>
            <Typography variant="body4">Phone: +1-234-567-8900</Typography>
            <Typography variant="body4">
              Address: 123 Main Street, Anytown, CA 12345
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
