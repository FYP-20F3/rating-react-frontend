import React from "react";
import {
  Grid,
  Stack,
  Typography,
  Card,
  CardContent,
  Box,
  CardHeader,
  Avatar,
} from "@mui/material";
import StarRateIcon from "@mui/icons-material/StarRate";

const Review = () => {
  const ratings = [1, 2, 3, 4, 5];

  return (
    <Grid
      container
      spacing={2}
      mt={5}
      sx={{ backgroundColor: "background.paper", py: 4 }}
    >
      <Grid item xs={11} md={6}>
        <Stack
          spacing={2}
          sx={{ display: "flex", alignItems: "flex-end", mr: 3 }}
        >
          <Box sx={{ marginTop: "10px", position: "relative" }}>
            <Typography
              component="span"
              sx={{
                fontSize: "24rem",
                color: "info.main",
                position: "absolute",
                opacity: "30%",
                top: "8rem",
                right: "22rem",
              }}
            >
              &ldquo;
            </Typography>
            <Typography
              variant="h2"
              align="left"
              sx={{
                width: 300,
                marginRight: "6.5rem !important",
                marginTop: "3.4rem !important",
                marginBottom: ".07rem !important",
                fontSize: "1.7rem",
                color: "text.primary",
              }}
            >
              Real Stories from Real Customers
            </Typography>
            <Typography variant="body3" sx={{ color: "text.secondary" }}>
              Get inspired by these stories.
            </Typography>
          </Box>

          <Card
            sx={{
              bgcolor: "white",
              width: "72%",
              marginTop: { xs: "4rem !important", md: "6rem !important" },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              px: 4,
              borderRadius: 2,
            }}
          >
            <CardHeader
              sx={{ mt: 2 }}
              avatar={
                <Avatar
                  aria-label="profile"
                  variant="square"
                  sx={{ bgcolor: "red", width: "40px", height: "40px" }}
                >
                  S
                </Avatar>
              }
              title={
                <Grid container>
                  {ratings.map((rating) => (
                    <Grid item key={rating}>
                      <Avatar
                        aria-label="star box"
                        variant="square"
                        sx={{
                          bgcolor: rating >= 4 ? "box.default" : "box.yellow",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "25px",
                          width: "25px",
                          marginRight: "1px",
                        }}
                      >
                        <StarRateIcon sx={{ color: "white" }} />
                      </Avatar>
                    </Grid>
                  ))}
                </Grid>
              }
            />
            <CardContent>
              <Typography
                component="span"
                sx={{
                  fontSize: "2.2rem",
                  color: "info.main",
                  fontWeight: "700",
                  marginRight: "1rem !important",
                }}
              >
                &ldquo;
              </Typography>
              <Typography
                variant="body2"
                component="span"
                sx={{ color: "text.secondary" }}
              >
                There products of their shoes are unique and long lasting.
              </Typography>
              <Typography
                variant="h4"
                color="secondary"
                sx={{ mt: 3, mb: 0.6 }}
              >
                Shamsiyah Yahuza
              </Typography>
              <Typography variant="body3" sx={{ color: "text.secondary" }}>
                reviewed, GoPro
              </Typography>
            </CardContent>
          </Card>
        </Stack>
      </Grid>
      <Grid item xs={9} md={6} sx={{ marginLeft: { xs: "8rem", md: 0 } }}>
        <Stack>
          <Card
            sx={{
              bgcolor: "white",
              width: "77%",
              marginTop: { md: "7rem !important" },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              px: 4,
              borderRadius: 2,
            }}
          >
            <CardHeader
              sx={{ mt: 2 }}
              avatar={
                <Avatar
                  aria-label="profile"
                  variant="square"
                  sx={{ bgcolor: "red", width: "40px", height: "40px" }}
                >
                  S
                </Avatar>
              }
              title={
                <Grid container>
                  {ratings.map((rating) => (
                    <Grid item key={rating}>
                      <Avatar
                        aria-label="star box"
                        variant="square"
                        sx={{
                          bgcolor: rating >= 4 ? "box.default" : "box.yellow",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "25px",
                          width: "25px",
                          marginRight: "1px",
                        }}
                      >
                        <StarRateIcon sx={{ color: "white" }} />
                      </Avatar>
                    </Grid>
                  ))}
                </Grid>
              }
            />
            <CardContent>
              <Typography
                component="span"
                sx={{
                  fontSize: "2.2rem",
                  color: "info.main",
                  fontWeight: "700",
                  marginRight: "1rem !important",
                }}
              >
                &ldquo;
              </Typography>
              <Typography
                variant="body2"
                component="span"
                sx={{ color: "text.secondary" }}
              >
                There products of their shoes are unique and long lasting.
              </Typography>
              <Typography
                variant="h4"
                color="secondary"
                sx={{ mt: 3, mb: 0.6 }}
              >
                Shamsiyah Yahuza
              </Typography>
              <Typography variant="body3" sx={{ color: "text.secondary" }}>
                reviewed, GoPro
              </Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              bgcolor: "white",
              width: "72%",
              marginTop: "5rem !important",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              px: 4,
              borderRadius: 2,
            }}
          >
            <CardHeader
              sx={{ mt: 2 }}
              avatar={
                <Avatar
                  aria-label="profile"
                  variant="square"
                  sx={{ bgcolor: "red", width: "40px", height: "40px" }}
                >
                  S
                </Avatar>
              }
              title={
                <Grid container>
                  {ratings.map((rating) => (
                    <Grid item key={rating}>
                      <Avatar
                        aria-label="star box"
                        variant="square"
                        sx={{
                          bgcolor: rating >= 4 ? "box.default" : "box.yellow",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "25px",
                          width: "25px",
                          marginRight: "1px",
                        }}
                      >
                        <StarRateIcon sx={{ color: "white" }} />
                      </Avatar>
                    </Grid>
                  ))}
                </Grid>
              }
            />
            <CardContent>
              <Typography
                component="span"
                sx={{
                  fontSize: "2.2rem",
                  color: "info.main",
                  fontWeight: "700",
                  marginRight: "1rem !important",
                }}
              >
                &ldquo;
              </Typography>
              <Typography
                variant="body2"
                component="span"
                sx={{ color: "text.secondary" }}
              >
                There products of their shoes are unique and long lasting.
              </Typography>
              <Typography
                variant="h4"
                color="secondary"
                sx={{ mt: 3, mb: 0.6 }}
              >
                Shamsiyah Yahuza
              </Typography>
              <Typography variant="body3" sx={{ color: "text.secondary" }}>
                reviewed, GoPro
              </Typography>
            </CardContent>
          </Card>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Review;
