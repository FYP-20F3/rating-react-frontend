import { Box, Divider, Grid, styled } from "@mui/material";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Avatar,
  Button,
  CardHeader,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import StarRateIcon from "@mui/icons-material/StarRate";
import { useSelector } from "react-redux";

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
  const navigate = useNavigate();
  const reviews = data.reviews;
  console.log(reviews);

  // console.log(currentUser, "current user");
  console.log(data, "data");

  const handleClick = () => {
    navigate(`/customer/evaluate/${data._id}/${data.businessName}`);
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
            className="my-7 mr-3"
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
              className="text-lg font-medium text-gray-500"
            >
              Reviews
            </Typography>
          </Box>
          <Box className="star-rating">
            <Link>5 star</Link>
            <Box className="star-rating-bar bg-gray-200">
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
            <Box className="star-rating-bar bg-gray-200">
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
            <Box className="star-rating-bar bg-gray-200">
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
            <Box className="star-rating-bar bg-gray-200">
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
            <Box className="star-rating-bar bg-gray-200">
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
              className="text-blue-600 border-blue-600 hover:bg-blue-200"
            >
              Filter
              <FilterAltIcon className="ml-1" />
            </Button>
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
                className="mx-5 mb-2"
                sx={{ height: "5px", borderBottom: "2px solid #ccc" }}
              />
              <CardContent>
                <div className="flex items-center mb-2 space-x-1 justify-between">
                  <div className="grid grid-cols-5">
                    {ratings.map((rating) => (
                      <div key={rating}>
                        <Avatar
                          aria-label="star box"
                          variant="square"
                          sx={{
                            bgcolor:
                              rating <= item.reviewRating
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
                    className="font-semibold"
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
                  className="mb-5 text-lg font-bold text-gray-500"
                >
                  {item.reviewTitle}
                </Typography>
                <Typography
                  variant="body1"
                  className="mb-2 text-gray-500 text-base"
                >
                  {item.reviewDescription}
                </Typography>
                <Typography variant="body2" className="mb-3 text-gray-500">
                  <span className="font-bold mr-2">Date of Experience:</span>
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
      <Grid item xs={12} md={7} lg={3.5} className="mr-8">
        <Card className="">
          <CardHeader title="Company Activity" />
          <Divider />
          <CardContent>
            <Link underline="none">
              <Typography
                variant="body2"
                component="p"
                className="text-blue-600 hover:underline"
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
