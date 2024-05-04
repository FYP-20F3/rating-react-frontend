import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Stack,
  Paper,
} from "@mui/material";
import Icon1 from "../../../assets/jpg/customerFeature1.jpg";
import Icon2 from "../../../assets/jpg/customerFeature2.jpg";
import Icon3 from "../../../assets/jpg/customerFeature3.jpg";
import Icon4 from "../../../assets/jpg/customerFeature4.jpg";

const CustomerFeatures = () => {
  return (
    <Stack spacing={2} sx={{ mt: 5 }}>
      <Typography
        variant="h2"
        align="center"
        sx={{
          width: "450px",
          marginRight: "auto !important",
          marginLeft: "auto !important",
        }}
      >
        Transforming Customers Experience like Never Before
      </Typography>
      <Grid container spacing={1} sx={{ justifyContent: "center" }}>
        <Grid item xs={11.5} sm={5.5} md={5} lg={2.7}>
          <Card sx={{ backgroundColor: "white", boxShadow: 3 }}>
            <CardContent sx={{ textAlign: "center", aspectRatio: "" }}>
              <img src={Icon1} width={40} style={{ marginTop: "12px" }} />
              <Typography
                variant="h3"
                sx={{ color: "text.primary", px: "70px", mt: 0.5, mb: 4 }}
              >
                Share Your Insights
              </Typography>
              <Typography
                variant="body3"
                sx={{ px: "12px" }}
                className="tw-mt-5"
              >
                With the VOC platform, your insights wield the power to drive
                meaningful transformations
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={11.5} sm={5.5} md={5} lg={2.7}>
          <Card sx={{ backgroundColor: "white", boxShadow: 3 }}>
            <CardContent sx={{ textAlign: "center" }}>
              <img src={Icon2} width={40} style={{ marginTop: "12px" }} />
              <Typography
                variant="h3"
                sx={{ color: "text.primary", px: "70px", mt: 0.5, mb: 4 }}
              >
                Centralized Review Hub
              </Typography>
              <Typography variant="body3" sx={{ px: "5.5px" }}>
                Find comprehensive reviews, genuine ratings, and a unified
                source of information to make informed choices.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={11.5} sm={5.5} md={5} lg={2.7}>
          <Card sx={{ backgroundColor: "white", boxShadow: 3 }}>
            <CardContent sx={{ textAlign: "center" }}>
              <img src={Icon3} width={40} style={{ marginTop: "12px" }} />
              <Typography
                variant="h3"
                sx={{ color: "text.primary", px: "50px", mt: 0.5, mb: 4 }}
              >
                Effortless Issue Resolution
              </Typography>
              <Typography variant="body3" sx={{ px: "5.5px" }}>
                Say goodbye to frustrating customer service experiences and
                hello to quick solutions.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={11.5} sm={5.5} md={5} lg={2.7}>
          <Card sx={{ backgroundColor: "white", boxShadow: 3 }}>
            <CardContent sx={{ textAlign: "center", aspectRatio: "1/.8" }}>
              <img src={Icon4} width={40} style={{ marginTop: "12px" }} />
              <Typography
                variant="h3"
                sx={{ color: "text.primary", px: "40px", mt: 0.5, mb: 4 }}
              >
                Influence Positive Change
              </Typography>
              <Typography variant="body3" sx={{ px: "5.5px", mb: 2 }}>
                By participating in surveys and sharing your insights, you
                actively influence how businesses operate.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default CustomerFeatures;
