import React from "react";
import { Paper, Typography, Grid, Stack } from "@mui/material";
import Icon1 from "../../../assets/jpg/businessFeature1.jpg";
import Icon2 from "../../../assets/jpg/businessFeature2.jpg";
import Icon3 from "../../../assets/jpg/businessFeature3.jpg";
import Icon4 from "../../../assets/jpg/businessFeature4.jpg";

const BusinessFeatures = () => {
  return (
    <Stack spacing={2} mt={11}>
      <Typography variant="h2" align="center" sx={{ color: "text.primary" }}>
        Boosting Your Business Reputation
      </Typography>
      <Grid container spacing={2} sx={{ justifyContent: "center" }}>
        <Grid item xs={11} md={5}>
          <Paper
            elevation={0}
            sx={{ padding: "10px", backgroundColor: "white" }}
          >
            <img src={Icon1} width={40} style={{ marginTop: "12px" }} />
            <Typography
              variant="h4"
              mt={1}
              mb={0.7}
              sx={{ color: "text.primary" }}
            >
              Unlock Insights
            </Typography>
            <Typography variant="body3" sx={{ color: "text.secondary" }}>
              Gain valuable data-driven insights into customer sentiment and
              preferences.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={11} md={5}>
          <Paper
            elevation={0}
            sx={{ padding: "10px", backgroundColor: "white" }}
          >
            <img src={Icon2} width={40} style={{ marginTop: "12px" }} />
            <Typography
              variant="h4"
              mt={1}
              mb={0.7}
              sx={{ color: "text.primary" }}
            >
              Build Trust and Loyalty
            </Typography>
            <Typography variant="body3" sx={{ color: "text.secondary" }}>
              Engage with customers promptly, resolving issues and fostering
              trust and loyalty.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={11} md={5}>
          <Paper
            elevation={0}
            sx={{ padding: "10px", backgroundColor: "white" }}
          >
            <img src={Icon3} width={40} style={{ marginTop: "12px" }} />
            <Typography
              variant="h4"
              mt={1}
              mb={0.7}
              sx={{ color: "text.primary" }}
            >
              Efficient Feedback Management
            </Typography>
            <Typography variant="body3" sx={{ color: "text.secondary" }}>
              Streamline the management of customer reviews and complaints
              effortlessly.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={11} md={5}>
          <Paper
            elevation={0}
            sx={{ padding: "10px", backgroundColor: "white" }}
          >
            <img src={Icon4} width={40} style={{ marginTop: "12px" }} />
            <Typography
              variant="h4"
              mt={1}
              mb={0.7}
              sx={{ color: "text.primary" }}
            >
              Competitive Edge Through Data
            </Typography>
            <Typography variant="body3" sx={{ color: "text.secondary" }}>
              Stay ahead of the competition by comparing your performance
              against rivals in key areas.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default BusinessFeatures;
