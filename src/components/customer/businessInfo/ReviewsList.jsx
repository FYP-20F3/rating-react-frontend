import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Avatar,
  Button,
  CardHeader,
  AppBar,
  Toolbar,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  TextField,
  Box,
  Divider,
  Drawer,
  Grid,
  styled,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate } from "react-router-dom";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import StarRateIcon from "@mui/icons-material/StarRate";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import { useState } from "react";

const StyledGrid = styled(Grid)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: theme.spacing(12),
  marginTop: theme.spacing(7),
}));

const StyledCard = styled(Grid)(({ theme }) => ({
  display: "flex",
  borderRadius: "10px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  backgroundColor: theme.palette.background.paper,
}));

const ReviewsList = ({ data }) => {
  const { currentUser } = useSelector((state) => state.user);
  const userName = currentUser?.firstName + " " + currentUser?.lastName;
  const ratings = [1, 2, 3, 4, 5];
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  console.log(data, "data");
  const reviews = data.reviews;
  console.log(reviews);

  // console.log(currentUser, "current user");
  console.log(data, "data");

  const handleClick = () => {
    navigate(`/customer/evaluate/${data._id}/${data.businessName}`);
  };

  const toggleDrawer = (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(!open);
  };

  const reviewCategories = [
    { value: "all", label: "All Reivews" },
    { value: "service", label: "Service" },
    { value: "delivery", label: "Delivery" },
    { value: "product", label: "Product" },
    { value: "packaging", label: "Packaging" },
  ];

  const [reviewWithReply, setReviewWithReply] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortReview, setSortReview] = useState("new");

  const handleClose = () => {
    setOpen(false);
  };

  const handleReviewWithReplyChange = (event) => {
    setReviewWithReply(event.target.checked);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortReview(event.target.value);
  };

  return (
    <StyledGrid container spacing={1}>
      <Grid item xs={12} md={7} lg={8}>
        <StyledCard sx={{ mx: 10, p: 2, mb: 5 }}>
          <CardMedia
            component="img"
            sx={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              marginTop: "auto",
              marginBottom: "auto",
            }}
            image={currentUser?.picturePath} // Replace with your image source
            alt="Profile Picture"
          />
          <CardContent sx={{ flex: 1 }}>
            <Typography gutterBottom variant="h6" component="div">
              {userName}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                textDecoration: "none", // Remove default underline
                "&:hover": {
                  textDecoration: "underline", // Add underline on hover
                  color: "info.main",
                },
              }}
              onClick={handleClick}
            >
              Write a review
            </Typography>
          </CardContent>
          <Button
            variant="contained"
            className="tw-my-7 tw-mr-3"
            onClick={handleClick}
          >
            Give Review
          </Button>
        </StyledCard>
        <Box
          sx={{
            ml: 10,
            mr: 30,
            backgroundColor: "background.paper",
            py: 2,
            px: 5,
            borderRadius: 2,
          }}
        >
          <Box>
            <Typography
              variant="h6"
              component="p"
              className="tw-text-lg tw-font-medium tw-text-gray-500"
            >
              Reviews
            </Typography>
          </Box>
          <Box className="star-rating">
            <Link>5 star</Link>
            <Box className="star-rating-bar tw-bg-gray-200">
              <Box className="star-rating-fill" style={{ width: "70%" }} />
            </Box>
            <Typography
              variant="body2"
              component="span"
              className="star-rating-percentage"
            >
              70%
            </Typography>
          </Box>
          <Box className="star-rating">
            <Link>4 star</Link>
            <Box className="star-rating-bar tw-bg-gray-200">
              <Box className="star-rating-fill" style={{ width: "17%" }} />
            </Box>
            <Typography
              variant="body2"
              component="span"
              className="star-rating-percentage"
            >
              17%
            </Typography>
          </Box>
          <Box className="star-rating">
            <Link>3 star</Link>
            <Box className="star-rating-bar tw-bg-gray-200">
              <Box className="star-rating-fill" style={{ width: "8%" }} />
            </Box>
            <Typography
              variant="body2"
              component="span"
              className="star-rating-percentage"
            >
              8%
            </Typography>
          </Box>
          <Box className="star-rating">
            <Link>2 star</Link>
            <Box className="star-rating-bar tw-bg-gray-200">
              <Box className="star-rating-fill" style={{ width: "4%" }} />
            </Box>
            <Typography
              variant="body2"
              component="span"
              className="star-rating-percentage"
            >
              4%
            </Typography>
          </Box>
          <Box className="star-rating">
            <Link>1 star</Link>
            <Box className="star-rating-bar tw-bg-gray-200">
              <Box className="star-rating-fill" style={{ width: "1%" }} />
            </Box>
            <Typography
              variant="body2"
              component="span"
              className="star-rating-percentage"
            >
              1%
            </Typography>
          </Box>
          <Divider sx={{ mt: 3 }} />
          <Box sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              className="tw-text-blue-600 tw-border-blue-600 hover:tw-bg-blue-200"
              onClick={toggleDrawer}
            >
              Filter
              <FilterAltIcon className="tw-ml-1" />
            </Button>
            <Drawer
              anchor="right"
              open={open}
              onClose={handleClose}
              sx={{
                "& .MuiDrawer-paper": {
                  backgroundColor: "white",
                  width: "29rem",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                className="drawer-header"
                component="div"
              >
                <Typography variant="h2" component="h2">
                  Filter By
                </Typography>
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <List>
                <ListItem className="tw-px-5 tw-mb-3">
                  <TextField
                    placeholder="Search"
                    variant="outlined"
                    size="small"
                    className="tw-w-[25.5rem]"
                    InputProps={{
                      startAdornment: <SearchIcon />,
                      sx: {
                        "& .MuiInputBase-input": {
                          fontSize: "18px",
                          pl: 1,
                          borderRadius: 2,
                        },
                        "& .MuiOutlinedInput-root": {
                          p: 2.8,
                        },
                      },
                    }}
                  />
                </ListItem>
                <ListItem className="tw-px-5 tw-mb-2">
                  <Typography variant="h3" component="h4">
                    Review With Replies
                  </Typography>
                  <Checkbox
                    checked={reviewWithReply}
                    onChange={handleReviewWithReplyChange}
                  />
                </ListItem>
                <ListItem className="tw-px-5 tw-mb-3">
                  <FormControl fullWidth>
                    <Typography
                      variant="h4"
                      component="h4"
                      id="review-category-label"
                      className="tw-mb-3"
                    >
                      Review Category
                    </Typography>
                    <Select
                      labelId="review-category-label"
                      defaultValue="all"
                      value={selectedCategory}
                      onChange={handleCategoryChange}
                    >
                      {reviewCategories.map((category) => (
                        <MenuItem key={category.value} value={category.value}>
                          {category.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </ListItem>
                <ListItem className="tw-px-5 tw-mb-3">
                  <FormControl fullWidth>
                    <Typography
                      variant="h4"
                      component="h4"
                      id="sort-review-label"
                      className="tw-mb-3"
                    >
                      Sort by date
                    </Typography>
                    <Select
                      labelId="sort-review-label"
                      defaultValue="new"
                      value={sortReview}
                      onChange={handleSortChange}
                    >
                      <MenuItem value="new">New Reviews</MenuItem>
                      <MenuItem value="new">Old Reviews</MenuItem>
                    </Select>
                  </FormControl>
                </ListItem>
              </List>
            </Drawer>
          </Box>
        </Box>
        {reviews &&
          reviews.map((item, index) => (
            <Card
              key={index}
              sx={{ mb: 4, mt: 3, ml: 10, mr: 19, py: 2, px: 3 }}
            >
              <CardHeader
                avatar={
                  <Avatar
                    alt={`${item.customer.firstName} ${item.customer.lastName}`}
                    sx={{
                      width: { xs: "50px", md: "58px" },
                      height: { xs: "50px", md: "58px" },
                      borderRadius: 50,
                    }}
                    src={item.customer.picturePath}
                  />
                }
                title={`${item.customer.firstName} ${item.customer.lastName}`}
              />
              <Divider
                className="tw-mx-5 tw-mb-2"
                sx={{ height: "5px", borderBottom: "2px solid #ccc" }}
              />
              <CardContent>
                <div className="tw-flex tw-items-center tw-mb-2 tw-space-x-1 tw-justify-between">
                  <div className="tw-grid tw-grid-cols-5">
                    {ratings.map((rating) => (
                      <div key={rating}>
                        <Avatar
                          aria-label="star box"
                          variant="square"
                          sx={{
                            bgcolor:
                              rating == 1 && item.reviewRating == 1
                                ? "box.red"
                                : rating <= 2 && item.reviewRating == 2
                                ? "box.orange"
                                : rating <= 3 && item.reviewRating == 3
                                ? "box.yellow"
                                : rating <= 4 && item.reviewRating == 4
                                ? "box.lime"
                                : rating <= 5 && item.reviewRating == 5
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
                      </div>
                    ))}
                  </div>
                  <Typography
                    variant="p"
                    color="text.secondary"
                    className="tw-font-semibold"
                  >
                    {new Date(item.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </Typography>
                </div>
                <Typography
                  variant="h6"
                  component="p"
                  className="tw-mb-5 tw-text-lg tw-font-bold tw-text-gray-500"
                >
                  {item.reviewTitle}
                </Typography>
                <Typography
                  variant="body1"
                  className="tw-mb-2 tw-text-gray-500 tw-text-base"
                >
                  {item.reviewDescription}
                </Typography>
                <Typography
                  variant="body2"
                  className="tw-mb-3 tw-text-gray-500"
                >
                  <span className="tw-font-bold tw-mr-2">
                    Date of Experience:
                  </span>
                  <span>
                    {new Date(item.dateOfExperience).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </span>
                </Typography>
              </CardContent>
            </Card>
          ))}
      </Grid>
      <Grid item xs={12} md={7} lg={3.5} className="tw-mr-8">
        <Card>
          <CardHeader title="Company Activity" />
          <Divider />
          <CardContent>
            <Link underline="none">
              <Typography
                variant="body2"
                component="p"
                className="tw-text-blue-600 hover:tw-underline"
              >
                Progress Dashboard
              </Typography>
            </Link>
          </CardContent>
        </Card>
      </Grid>
    </StyledGrid>
  );
};
export default ReviewsList;
