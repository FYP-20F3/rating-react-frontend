import React, { useEffect, useState } from "react";
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
  CardActionArea,
} from "@mui/material";
import { styled } from "@mui/system";
import StarRateIcon from "@mui/icons-material/StarRate";
import Icon1 from "../../../assets/jpg/info.jpg";
import { useNavigate } from "react-router-dom";
import { cities } from "../../../const/data";
import { useSearchName } from "../../../context/SearchNameContext";

const StyledGrid = styled(Grid)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
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

const StyledAvatar = styled("img")(({ theme }) => ({
  width: "90px",
  height: "90px",
  borderRadius: 1,
  mt: 1,
  mr: 1,
  [theme.breakpoints.down("md")]: {
    mt: 0,
    mr: 0,
    width: "80px",
    height: "80px",
  },
}));

const BusinessesList = ({
  data,
  id,
  setLocation,
  setRating,
  sort,
  setSort,
}) => {
  const navigate = useNavigate();
  const ratings = [1, 2, 3, 4, 5];
  const [selectedRating, setSelectedRating] = useState(0.0);
  const { searchName } = useSearchName();

  console.log(data, "data");

  const handleClick = (rating) => {
    setSelectedRating(rating);
  };

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
              <StyledButton
                sx={{ fontWeight: "bold" }}
                className={selectedRating === 0.0 ? "bg-blue-200" : "bg-white"}
                onClick={() => {
                  handleClick(0.0);
                  setRating(0.0);
                }}
              >
                Any
              </StyledButton>
              <StyledButton
                className={selectedRating === 3.0 ? "bg-blue-200" : "bg-white"}
                onClick={() => {
                  handleClick(3.0);
                  setRating(3.0);
                }}
              >
                <StarRateIcon sx={{ color: "primary.main", mr: 0.3 }} />
                <Typography
                  variant="subtitle2"
                  color="inherit"
                  sx={{ fontWeight: "bold" }}
                >
                  +3.0
                </Typography>
              </StyledButton>
              <StyledButton
                className={selectedRating === 4.0 ? "bg-blue-200" : "bg-white"}
                onClick={() => {
                  handleClick(4.0);
                  setRating(4.0);
                }}
              >
                <StarRateIcon sx={{ color: "primary.main", mr: 0.3 }} />
                <Typography
                  variant="subtitle2"
                  color="inherit"
                  sx={{ fontWeight: "bold" }}
                >
                  +4.0
                </Typography>
              </StyledButton>
              <StyledButton
                className={selectedRating === 5.0 ? "bg-blue-200" : "bg-white"}
                onClick={() => {
                  handleClick(5.0);
                  setRating(5.0);
                }}
              >
                <StarRateIcon sx={{ color: "primary.main", mr: 0.3 }} />
                <Typography
                  variant="subtitle2"
                  color="inherit"
                  sx={{ fontWeight: "bold" }}
                >
                  5.O
                </Typography>
              </StyledButton>
            </ButtonGroup>
          </Box>
          <Box sx={{ marginBottom: ".6rem !important" }}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              id="location-select"
              sx={{ marginBottom: ".6rem !important" }}
            >
              Location
            </Typography>
            <StyledSelect
              defaultValue={cities[0]}
              labelId="location-select"
              size="small"
            >
              {cities.map((city, index) => (
                <MenuItem
                  value={city}
                  key={index}
                  onClick={() => setLocation(city)}
                >
                  {city}
                </MenuItem>
              ))}
            </StyledSelect>
          </Box>
          <Box sx={{ marginBottom: ".6rem !important" }}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              id="category-select"
              sx={{ marginBottom: ".6rem !important" }}
            >
              Category
            </Typography>
            <StyledSelect
              defaultValue="all"
              value={id}
              labelId="category-select"
              size="small"
            >
              <MenuItem
                value="all"
                onClick={() => {
                  navigate("/customer/category/all");
                }}
              >
                All Category
              </MenuItem>
              <MenuItem
                value="electronics_tech"
                onClick={() => navigate("/customer/category/electronics_tech")}
              >
                Electronics & Technology
              </MenuItem>
              <MenuItem
                value="clothing_store"
                onClick={() => navigate("/customer/category/clothing_store")}
              >
                Clothing Store
              </MenuItem>
              <MenuItem
                value="cosmetics"
                onClick={() => navigate("/customer/category/cosmetics")}
              >
                Cosmetics
              </MenuItem>
              <MenuItem
                value="food"
                onClick={() => navigate("/customer/category/food")}
              >
                Food
              </MenuItem>
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
              justifyContent: "flex-end",
              alignItems: "center",
              marginBottom: "1rem !important",
            }}
          >
            <Box>
              <Typography
                variant="subtitle2"
                component="span"
                sx={{ mr: { xs: 1, md: 2 } }}
              >
                Sort By:
              </Typography>
              <StyledSelect
                defaultValue={searchName != undefined ? "none" : sort}
                value={sort}
                labelId="sort-select"
                size="small"
              >
                <MenuItem
                  value="reviewCount"
                  onClick={() => setSort("reviewCount")}
                >
                  Highest Number of Reviews
                </MenuItem>
                <MenuItem
                  value="recentReviews"
                  onClick={() => setSort("recentReviews")}
                >
                  Most recent reviews
                </MenuItem>
                <MenuItem value="none" onClick={() => setSort("none")}>
                  None
                </MenuItem>
              </StyledSelect>
            </Box>
          </Box>
          {data.map((item) => (
            <Stack
              spacing={0.4}
              key={item._id}
              sx={{
                "&:hover": {
                  boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.3)", // Adjust shadow darkness and spread
                  cursor: "pointer",
                },
              }}
              onClick={() =>
                navigate(`/customer/reviews/${item._id}/${item.businessName}`)
              }
            >
              <StyledCard>
                <CardHeader
                  avatar={
                    data.length > 0 ? (
                      <StyledAvatar src={item.businessLogoPath} />
                    ) : (
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
                    )
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
                        {item.businessName}
                      </Typography>
                      <Grid container>
                        {ratings.map((rating) => (
                          <Grid item key={rating}>
                            <Avatar
                              aria-label="star box"
                              variant="square"
                              sx={{
                                bgcolor:
                                  rating == 1 && item.overallRating == 1
                                    ? "box.red"
                                    : rating <= 2 && item.overallRating == 2
                                    ? "box.orange"
                                    : rating <= 3 && item.overallRating == 3
                                    ? "box.yellow"
                                    : rating <= 4 && item.overallRating == 4
                                    ? "box.lime"
                                    : rating <= 5 && item.overallRating == 5
                                    ? "box.green"
                                    : "box.default",
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
                            Overall Rating {item.overallRating}
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
                            {item.reviewCount} reviews
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
                      {item.location}
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
                      {item.businessCategory == "electronics_tech"
                        ? "Electronics & Tech"
                        : item.businessCategory === "clothing_store"
                        ? "Clothing Store"
                        : item.businessCategory === "cosmetics"
                        ? "Cosmetics"
                        : item.businessCategory === "food"
                        ? "Food"
                        : ""}
                    </Typography>
                  </Grid>
                </Grid>
              </StyledCard>
            </Stack>
          ))}
          {data.length == 0 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "10rem",
              }}
            >
              <Typography
                variant="h3"
                sx={{ marginBottom: ".6rem !important" }}
              >
                No data to display
              </Typography>
            </Box>
          )}
        </Stack>
      </Grid>
    </StyledGrid>
  );
};

export default BusinessesList;
