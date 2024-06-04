import {
  Card,
  CardContent,
  Typography,
  Avatar,
  CardHeader,
  Box,
  Divider,
  Grid,
  styled,
  CircularProgress,
} from "@mui/material";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { StarRate, Reply } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { customerLoginPath } from "../../../const/path";
import axios from "axios";
import { BASE_URL } from "../../../const/APIS";
import ReviewBox from "./ReviewBox";
import FilterBox from "./FilterBox";

const StyledGrid = styled(Grid)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: theme.spacing(12),
  marginTop: theme.spacing(7),
}));

const ReviewsList = ({ businessData }) => {
  const { token } = useSelector((state) => state.user);
  const { businessId, businessName } = useParams();

  let rating5, rating4, rating3, rating2, rating1;
  if (businessData && businessData.ratingPercentages) {
    [rating5, rating4, rating3, rating2, rating1] =
      businessData.ratingPercentages.map(
        ({ rating, percentage }) => `${percentage}%`
      );
  }

  const navigate = useNavigate();

  const ratings = [1, 2, 3, 4, 5];

  const [reply, setReply] = useState(undefined);
  const [category, setCategory] = useState("all");
  const [keyword, setkeyword] = useState("");
  const [sort, setSort] = useState("new");
  const [starRatings, setStarRatings] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [data, setData] = useState([]);
  const [filterChanged, setFilterChanged] = useState(false);

  const queryParams = {
    ...(reply && { reply }),
    category: category,
    sort: sort,
  };

  // Define fetchBusinessReviews function
  const fetchBusinessReviews = useCallback(
    async (params) => {
      try {
        // Construct the query string including the rating parameter
        let queryString = Object.keys(params)
          .map((key) => {
            if (key === "rating" && Array.isArray(params[key])) {
              // Construct an array of rating strings
              const ratingParams = params[key].map((rating) => `${rating}`);
              return ratingParams.join("&");
            }
            return (
              encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
            );
          })
          .join("&");

        console.log(
          `${BASE_URL}reviews/searchReviews/${businessId}?${queryString}`
        );
        const response = await axios.get(
          `${BASE_URL}reviews/searchReviews/${businessId}?${queryString}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data);
        console.log(response.data, "reviews");

        if (filterChanged) {
          console.log(
            `/customer/reviews/${businessId}/${businessName}?${queryString}`
          );
          navigate(
            `/customer/reviews/${businessId}/${businessName}?${queryString}`
          );
        }
      } catch (error) {
        console.log(error);
      }
    },
    [filterChanged, navigate, businessId, businessName, token]
  );

  // handleCheckboxChange function
  const handleCheckboxChange = (event, index) => {
    const newRatings = [...starRatings];
    newRatings[index] = event.target.checked;
    setStarRatings(newRatings);

    // Update selected ratings in descending order
    const selectedRatings = newRatings
      .map((checked, idx) => (checked ? 5 - idx : null))
      .filter((value) => value !== null);

    // Construct an array of rating strings
    const ratingParams = selectedRatings.map((rating) => `rating=${rating}`);

    // Update query parameters
    const updatedQueryParams = {
      ...queryParams,
      rating: ratingParams,
    };

    // Use fetchBusinessReviews from the outer scope
    fetchBusinessReviews(updatedQueryParams);
    setFilterChanged(true);
  };

  useEffect(() => {
    let debounceTimer;

    clearTimeout(debounceTimer);

    if (keyword) {
      debounceTimer = setTimeout(() => {
        const updatedQueryParams = {
          keyword: keyword,
          ...queryParams,
        };
        fetchBusinessReviews(updatedQueryParams);
      }, 1000);
    } else {
      fetchBusinessReviews(queryParams);
    }

    return () => clearTimeout(debounceTimer);
  }, [reply, category, sort, keyword]);

  if (!token) {
    return <Navigate to={customerLoginPath} />;
  }

  const handleClick = () => {
    navigate(`/customer/evaluate/${businessId}/${businessName}`);
  };

  const handleKeywordChange = (event) => {
    setkeyword(event.target.value);
    setFilterChanged(true);
  };

  const handleReplyChange = (event) => {
    setReply(event.target.checked);
    setFilterChanged(true);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setFilterChanged(true);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
    setFilterChanged(true);
  };

  return (
    <Box>
      {businessData ? (
        <StyledGrid container spacing={1}>
          <Grid item xs={12} md={7} lg={8}>
            <ReviewBox handleClick={handleClick} />
            <FilterBox
              starRatings={starRatings}
              handleCheckboxChange={handleCheckboxChange}
              keyword={{ keyword, handleKeywordChange }}
              reply={{ reply, handleReplyChange }}
              sort={{ sort, handleSortChange }}
              category={{ category, handleCategoryChange }}
              ratings={{ rating5, rating4, rating3, rating2, rating1 }}
            />
            {data &&
              data.map((item) => (
                <Card
                  key={item._id}
                  sx={{ mb: 4, mt: 3, ml: 10, mr: 19, py: 2, px: 3 }}
                >
                  <CardHeader
                    avatar={
                      <Avatar
                        alt={`${item.customerId.firstName} ${item.customerId.lastName}`}
                        sx={{
                          width: { xs: "50px", md: "58px" },
                          height: { xs: "50px", md: "58px" },
                          borderRadius: 50,
                        }}
                        src={item.customerId.picturePath}
                      />
                    }
                    title={`${item.customerId.firstName} ${item.customerId.lastName}`}
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
                              <StarRate
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
                      className="tw-mb-2 tw-text-gray-500 tw-text-large"
                    >
                      {item.reviewDescription}
                    </Typography>
                    <Typography
                      variant="body2"
                      className="tw-mb-2 tw-text-gray-500"
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

                  {item.reviewReply && (
                    <Box>
                      <Divider
                        className="tw-mx-3 tw-mb-3 tw-border-zinc-900"
                        sx={{ border: "1px solid" }}
                      />
                      <Card
                        sx={{ borderLeft: "10px solid blue" }}
                        className="tw-bg-white tw-mx-3"
                      >
                        <CardContent className="tw-flex">
                          <div className="tw-w-11 tw-flex">
                            <Reply className="tw-text-green-700 tw-text-3xl" />
                          </div>
                          <div className="tw-w-full">
                            <div className="tw-flex tw-items-center tw-justify-between tw-mb-2">
                              <Typography variant="h6">
                                Reply from {businessName}
                              </Typography>
                              <Typography variant="body2">
                                {new Date(
                                  item.reviewReply.createdAt
                                ).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </Typography>
                            </div>
                            <Typography variant="body1">
                              {item.reviewReply.replyDescription}
                            </Typography>
                          </div>
                        </CardContent>
                      </Card>
                    </Box>
                  )}
                </Card>
              ))}
          </Grid>
          <Grid item xs={12} md={7} lg={3.5} className="tw-mr-8">
            <Card>
              <CardHeader title="Company Activity" />
              <Divider />
              <CardContent>
                <Typography
                  variant="body2"
                  component="p"
                  className="tw-text-blue-600 hover:tw-underline"
                  onClick={() =>
                    navigate(
                      `/customer/reviews/dashboard/${businessId}/${businessName}`
                    )
                  }
                >
                  Progress Dashboard
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </StyledGrid>
      ) : (
        <CircularProgress />
      )}
    </Box>
  );
};
export default ReviewsList;
