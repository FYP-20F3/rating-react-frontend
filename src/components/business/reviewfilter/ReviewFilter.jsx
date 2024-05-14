import React, { useCallback, useEffect, useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
  Button,
  Checkbox,
  Typography,
  List,
} from "@mui/material";

import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../../const/APIS";
import { Navigate, useNavigate } from "react-router-dom";
import ReviewItem from "./ReviewItem";

const ReviewFilter = () => {
  const { currentUser, token } = useSelector((state) => state.user);
  const businessId = currentUser?._id;
  const businessName = currentUser?.businessName;
  const [starRatings, setStarRatings] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [selectedRatings, setSelectedRatings] = useState([]); // Maintain an array for selected ratings
  const [replyStatus, setReplyStatus] = useState("all");
  const [reviewDate, setReviewDate] = useState("new");
  const [reviewType, setReviewType] = useState("all");
  const [reviews, setReviews] = useState([]);
  const [filterChanged, setFilterChanged] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const queryParams = {
    reply: replyStatus,
    sort: reviewDate,
    category: reviewType,
  };

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
        setReviews(response.data);
        console.log(response.data, "reviews");

        if (filterChanged) {
          console.log(`/business/reviews?${queryString}`);
          navigate(`/business/reviews?${queryString}`);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [filterChanged, navigate, businessId, token]
  );

  useEffect(() => {
    let debounceTimer;

    clearTimeout(debounceTimer);

    if (searchQuery) {
      debounceTimer = setTimeout(() => {
        const updatedQueryParams = {
          keyword: searchQuery,
          ...queryParams,
        };
        fetchBusinessReviews(updatedQueryParams);
      }, 3000);
    } else {
      fetchBusinessReviews(queryParams);
    }

    return () => clearTimeout(debounceTimer);
  }, [replyStatus, reviewType, reviewDate, searchQuery]);

  if (!token) {
    return <Navigate to={customerLoginPath} />;
  }

  // handleCheckboxChange function
  const handleCheckboxChange = (event, index) => {
    const newRatings = [...starRatings];
    newRatings[index] = event.target.checked;
    setStarRatings(newRatings);

    // Update selected ratings in descending order
    const updatedSelectedRatings = newRatings
      .map((checked, idx) => (checked ? 5 - idx : null))
      .filter((value) => value !== null);
    // console.log(updatedSelectedRatings);

    setSelectedRatings(updatedSelectedRatings); // Update selected ratings array

    // Construct an array of rating strings
    const ratingParams = updatedSelectedRatings.map(
      (rating) => `rating=${rating}`
    );

    const updatedQueryParams = {
      ...queryParams,
      rating: ratingParams,
    };

    // Use fetchBusinessReviews from the outer scope
    fetchBusinessReviews(updatedQueryParams);
    setFilterChanged(true);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setFilterChanged(true);
  };

  const handleRatingChange = (event) => {
    setSelectedRatings(event.target.value); // Update selected ratings array
  };

  const handleReplyChange = (event) => {
    setReplyStatus(event.target.value);
    setFilterChanged(true);
  };

  const handleDateChange = (event) => {
    setReviewDate(event.target.value);
    setFilterChanged(true);
  };

  const handleReviewChange = (event) => {
    setReviewType(event.target.value);
    setFilterChanged(true);
  };

  const handleSearch = () => {
    filterReviews();
  };

  const pageHeight = reviews.length === 0 ? "tw-h-[86vh]" : "";
  return (
    <div className={`tw-p-4 ${pageHeight}`}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={4}>
          <TextField
            label="Search"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Grid>
        <Grid item xs={12} sm={2.5}>
          <FormControl fullWidth>
            <InputLabel>Review Type</InputLabel>
            <Select
              value={reviewType}
              onChange={handleReviewChange}
              label="Review Type"
              defaultValue="all"
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="service">Service</MenuItem>
              <MenuItem value="delivery">Delivery</MenuItem>
              <MenuItem value="product">Product</MenuItem>
              <MenuItem value="packaging">Packaging</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={3}>
          <FormControl fullWidth>
            <InputLabel>Star Rating</InputLabel>
            <Select
              value={selectedRatings} // Use selectedRatings instead of starRating
              onChange={handleRatingChange}
              label="Star Rating"
              renderValue={(selected) => (
                <div>
                  <Typography variant="body2" component="span">
                    Selected Rating{" "}
                  </Typography>
                  {selected.map((value) => (
                    <Typography key={value} variant="body2" component="span">
                      {`${value}, `}
                    </Typography>
                  ))}
                </div>
              )}
              multiple
            >
              {[1, 2, 3, 4, 5].map((rating) => (
                <MenuItem key={rating} value={rating}>
                  <Checkbox
                    checked={starRatings[5 - rating]}
                    onChange={(event) =>
                      handleCheckboxChange(event, 5 - rating)
                    }
                    color="primary"
                    inputProps={{ "aria-label": `rating-${rating}` }}
                  />
                  <Typography
                    component="span"
                    className="tw-text-blue-500 tw-text-sm"
                  >
                    {`${rating} star`}
                  </Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={2.5}>
          <FormControl fullWidth>
            <InputLabel>Reply</InputLabel>
            <Select
              value={replyStatus}
              onChange={handleReplyChange}
              label="Reply"
              defaultValue="all"
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="true">Replied</MenuItem>
              <MenuItem value="false">Not Replied</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Date</InputLabel>
            <Select
              value={reviewDate}
              onChange={handleDateChange}
              label="Date"
              defaultValue="new"
            >
              <MenuItem value="new">Newest First</MenuItem>
              <MenuItem value="old">Oldest First</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <List className="tw-mt-4">
        {reviews.map((review, index) => (
          <ReviewItem
            key={index}
            review={review}
            businessName={businessName}
            businessId={businessId}
          />
        ))}
      </List>
    </div>
  );
};

export default ReviewFilter;
