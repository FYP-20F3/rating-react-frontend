import React from "react";
import {
  Grid,
  Box,
  Typography,
  ButtonGroup,
  Button,
  Stack,
  Select,
  MenuItem,
  Avatar,
  CardHeader,
  Divider,
} from "@mui/material";
import { styled } from "@mui/system";
import StarRateIcon from "@mui/icons-material/StarRate";
import Icon1 from "../../../assets/jpg/info.jpg";

const StyledGrid = styled(Grid)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: theme.spacing(12),
  marginTop: theme.spacing(7),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  borderRadius: theme.shape.borderRadius,
  cursor: "pointer",
  fontSize: "1rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.7rem",
    padding: theme.spacing(1, 1),
  },
}));

const StyledCard = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[300]}`,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  "& .MuiSelect-select": {
    backgroundColor: "white",
  },
  minWidth: "17rem !important",
  maxWidth: "19rem !important",
  fontSize: "1rem",
  [theme.breakpoints.down("md")]: {
    fontSize: "0.7rem", // Smaller placeholder font size for smaller screens
    minWidth: "12.4rem !important",
    maxWidth: "13rem !important",
  },
}));

const StyledImage = styled("img")(({ theme }) => ({
  mixBlendMode: "darken",
  width: "22px",
  height: "22px",
}));

const BusinessLists = () => {
  const ratings = [1, 2, 3, 4, 5];
  return (
    <StyledGrid container spacing={1}>
      <Grid item xs={11} md={4} lg={4}>
        <Stack
          spacing={2}
          sx={{
            marginLeft: { xs: ".5rem", md: "1rem", lg: "2rem" },
            marginRight: { xs: ".5rem", md: "1rem", lg: "2rem" },
            backgroundColor: "background.paper",
            padding: {
              xs: "1rem .6rem 2rem .7rem",
              md: "1.5rem 1rem 3rem 1.4rem",
            },
            borderRadius: 3,
            minWidth: { xs: 250, md: 370 },
            maxWidth: 400,
          }}
        >
          <Box sx={{ marginBottom: ".6rem !important" }}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{ marginBottom: ".6rem !important" }}
            >
              Rating
            </Typography>
            <ButtonGroup
              aria-label="outlined button group"
              variant="outlined"
              sx={{ bgcolor: "white" }}
            >
              <StyledButton sx={{ fontWeight: "bold" }}>Any</StyledButton>
              <StyledButton>
                <StarRateIcon sx={{ color: "primary.main", mr: 0.3 }} />
                <Typography
                  variant="subtitle2"
                  color="inherit"
                  sx={{ fontWeight: "bold" }}
                >
                  +3.0
                </Typography>
              </StyledButton>
              <StyledButton>
                <StarRateIcon sx={{ color: "primary.main", mr: 0.3 }} />
                <Typography
                  variant="subtitle2"
                  color="inherit"
                  sx={{ fontWeight: "bold" }}
                >
                  +4.0
                </Typography>
              </StyledButton>
              <StyledButton>
                <StarRateIcon sx={{ color: "primary.main", mr: 0.3 }} />
                <Typography
                  variant="subtitle2"
                  color="inherit"
                  sx={{ fontWeight: "bold" }}
                >
                  +4.5
                </Typography>
              </StyledButton>
            </ButtonGroup>
          </Box>
          <Box sx={{ marginBottom: ".6rem !important" }}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{ marginBottom: ".6rem !important" }}
            >
              Location
            </Typography>
            <StyledSelect
              defaultValue="sukkur"
              labelId="location-select"
              size="small"
            >
              <MenuItem value="sukkur">Sukkur</MenuItem>
              <MenuItem value="islamabad">Islamabad</MenuItem>
              <MenuItem value="rawalpindi">Rawalpindi</MenuItem>
            </StyledSelect>
          </Box>
          <Box sx={{ marginBottom: ".6rem !important" }}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{ marginBottom: ".6rem !important" }}
            >
              Category
            </Typography>
            <StyledSelect
              defaultValue="all-category"
              labelId="category-select"
              size="small"
            >
              <MenuItem value="all-category">All Category</MenuItem>
              <MenuItem value="electronics_tech">
                Electronics & Technology
              </MenuItem>
              <MenuItem value="clothing_store">Clothing Store</MenuItem>
              <MenuItem value="cosmetics">Cosmetics</MenuItem>
              <MenuItem value="food">Food</MenuItem>
            </StyledSelect>
          </Box>
        </Stack>
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <Stack
          spacing={2}
          sx={{
            margin: "1rem",
            minWidth: { md: 500 },
            maxWidth: { md: 850 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem !important",
            }}
          >
            <Typography variant="subtitle2" component="span">
              1-10 of 148 results
            </Typography>
            <Box>
              <Typography
                variant="subtitle2"
                component="span"
                sx={{ mr: { xs: 1, md: 2 } }}
              >
                Sort By:
              </Typography>
              <StyledSelect
                defaultValue="default"
                labelId="sort-select"
                size="small"
              >
                <MenuItem value="default">Highest Number of Reviews</MenuItem>
                <MenuItem value="ordered-by">
                  Ordered By Overall Rating
                </MenuItem>
              </StyledSelect>
            </Box>
          </Box>
          <Stack spacing={0.4}>
            <StyledCard>
              <CardHeader
                avatar={
                  <Avatar
                    aria-label="profile"
                    variant="square"
                    sx={{
                      bgcolor: "white",
                      color: "primary.main",
                      width: { xs: "60px", md: "90px" },
                      height: { xs: "60px", md: "90px" },
                      borderRadius: 1,
                      mt: { xs: 0, md: 1 },
                      mr: { xs: 0, md: 1 },
                    }}
                  >
                    BN
                  </Avatar>
                }
                title={
                  <Stack>
                    <Typography
                      variant="body2"
                      sx={{
                        marginBottom: ".3rem !important",
                        color: "text.primary",
                      }}
                    >
                      Business Name
                    </Typography>
                    <Grid container>
                      {ratings.map((rating) => (
                        <Grid item key={rating}>
                          <Avatar
                            aria-label="star box"
                            variant="square"
                            sx={{
                              bgcolor: "box.green",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              height: { xs: "15px", sm: "25px" },
                              width: { xs: "15px", sm: "25px" },
                              marginRight: "1px",
                            }}
                          >
                            <StarRateIcon
                              sx={{
                                color: "white",
                                height: { xs: "15px", sm: "25px" },
                                width: { xs: "15px", sm: "25px" },
                              }}
                            />
                          </Avatar>
                        </Grid>
                      ))}
                      <Grid item sx={{ display: "flex" }}>
                        <Typography
                          variant="body3"
                          component="span"
                          sx={{
                            ml: { xs: 0.3, sm: 1, lg: 2.3 },
                            color: "text.secondary",
                            fontSize: { xs: ".7rem", sm: "1rem" },
                          }}
                        >
                          Overall Rating 4.7
                        </Typography>
                        <Divider
                          orientation="vertical"
                          sx={{
                            borderWidth: 1,
                            ml: 1,
                            mr: 1,
                            mt: { xs: 0.5, md: 0 },
                            height: { xs: "80%", sm: "70%", md: "90%" },
                          }}
                        />
                        <Typography
                          variant="body3"
                          component="span"
                          sx={{
                            ml: { xs: 0.5, md: 2 },
                            color: "text.secondary",
                            fontSize: { xs: ".7rem", sm: "1rem" },
                          }}
                        >
                          3,4555 reviews
                        </Typography>
                      </Grid>
                    </Grid>
                  </Stack>
                }
              />
            </StyledCard>
            <StyledCard sx={{ py: 1.4 }}>
              <Grid container>
                <Grid item sx={{ ml: 2, display: "flex" }}>
                  <StyledImage src={Icon1} />
                  <Typography
                    variant="body3"
                    component="span"
                    sx={{ ml: 1, color: "text.secondary" }}
                  >
                    Info
                  </Typography>
                  <Divider
                    orientation="vertical"
                    sx={{ borderWidth: 1, ml: 2, height: "90%" }}
                  />
                  <Typography
                    variant="body3"
                    component="span"
                    sx={{ ml: 2, color: "text.secondary" }}
                  >
                    Category
                  </Typography>
                </Grid>
              </Grid>
            </StyledCard>
          </Stack>
        </Stack>
      </Grid>
    </StyledGrid>
  );
};

export default BusinessLists;
