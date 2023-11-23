import React from "react";
import { Grid, Typography, Card, CardContent, Box } from "@mui/material";

const WhyUs = () => {
  return (
    <Grid container spacing={2} sx={{ pt: 6, pb: 3 }}>
      <Grid
        item
        xs={12}
        md={5.6}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Box
          sx={{
            padding: "20px",
            backgroundColor: "white",
            width: "90%",
            height: "fit-content",
            ml: 3,
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              width: { sm: "70%", lg: "40%" },
              mb: 3,
              mt: 1,
              color: "text.primary",
            }}
          >
            Why Choose Us?
          </Typography>
          <Typography
            variant="body3"
            component="p"
            sx={{ width: "82%", color: "text.secondary" }}
          >
            Embark on a journey with VOC, where your choices shape the future of
            customer-business interactions.
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={6.3}>
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Grid item xs={10.5} sm={5.5} md={10.5} lg={6}>
            <Card sx={{ backgroundColor: "white" }}>
              <CardContent>
                <Typography variant="h4" sx={{ mb: 2 }}>
                  Customer-Centric Innovation
                </Typography>
                <Typography variant="body3" sx={{ color: "text.secondary" }}>
                  Empower your voice for change through our seamless platform
                  dedicated to your satisfaction.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={10.5} sm={5.5} md={10.5} lg={6}>
            <Card sx={{ backgroundColor: "white" }}>
              <CardContent>
                <Typography variant="h4" sx={{ mb: 2 }}>
                  Trusted Reviews, Transparency
                </Typography>
                <Typography variant="body3" sx={{ color: "text.secondary" }}>
                  Promoting trust with authentic reviews, verified information,
                  and open communication.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={10.5} sm={5.5} md={10.5} lg={6}>
            <Card sx={{ backgroundColor: "white" }}>
              <CardContent>
                <Typography variant="h4" sx={{ mb: 2 }}>
                  Data-Driven Insights
                </Typography>
                <Typography variant="body3" sx={{ color: "text.secondary" }}>
                  Utilizing advanced sentiment analysis to transform reviews
                  into actionable data that improves businesses' services.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={10.5} sm={5.5} md={10.5} lg={6}>
            <Card sx={{ backgroundColor: "white" }}>
              <CardContent>
                <Typography variant="h4" sx={{ mb: 2 }}>
                  Platform for Change
                </Typography>
                <Typography variant="body3" sx={{ color: "text.secondary" }}>
                  Join us as a catalyst for change, making your voice matter in
                  reshaping how businesses operate.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default WhyUs;
