import * as React from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Select,
  MenuItem,
  Snackbar,
  Grid,
  Avatar,
  Alert,
} from "@mui/material";
import StarRateIcon from "@mui/icons-material/StarRate";
import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../../const/APIS";
import { useNavigate, useParams } from "react-router-dom";

const EditReview = () => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const [rating, setRating] = useState(0); // Initial rating state
  const [ratingError, setRatingError] = useState("");
  const { reviewId } = useParams();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the review data when the component mounts
    const fetchReviewData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}reviews/single-review/${reviewId}`
        );
        const reviewData = response.data;

        // Convert dateOfExperience to YYYY-MM-DD format
        const dateOfExperience = new Date(reviewData.dateOfExperience)
          .toISOString()
          .split("T")[0];

        // Set the default values for the form fields
        setValue("reviewDescription", reviewData.reviewDescription);
        setValue("reviewTitle", reviewData.reviewTitle);
        setValue("reviewType", reviewData.reviewType);
        setValue("dateOfExperience", dateOfExperience);
        setRating(reviewData.reviewRating);
      } catch (error) {
        console.error("Error fetching review data:", error);
        setError("Failed to fetch review data.");
        setOpen(true);
      }
    };

    fetchReviewData();
  }, [reviewId, setValue]);

  // Function to handle click on a star
  const handleStarClick = (clickedRating) => {
    const newRating = clickedRating === rating ? 0 : clickedRating;
    setRating(newRating);
    setRatingError("");
  };

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const onSubmit = async (data) => {
    if (rating === 0) {
      setRatingError("Please select a rating");
      return;
    }

    let payload = {
      ...data,
      reviewRating: rating,
    };

    try {
      const response = await axios.post(
        `${BASE_URL}reviews/edit/${reviewId}`,
        payload
      );
      if (response.data.semantics) {
        setError(`Review edit failed. Seems to be ${response.data.semantics}.`);
        setOpen(true);
      } else if (response.data.msg) {
        setError(`${response.data.msg}.`);
        setOpen(true);
      } else {
        navigate(`/customer/reviewsHistory`);
      }
    } catch (error) {
      console.log(error);
      setError(`Review edit failed. ${error.response?.data?.msg}`);
      setOpen(true);
    }
  };

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((star) => (
      <Grid item key={star}>
        <Avatar
          aria-label={`star-${star}`}
          variant="square"
          onClick={() => handleStarClick(star)}
          sx={{
            bgcolor:
              star <= rating
                ? rating === 1
                  ? "box.red"
                  : rating === 2
                  ? "box.orange"
                  : rating === 3
                  ? "box.yellow"
                  : rating === 4
                  ? "box.lime"
                  : "box.green"
                : "box.default",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: { xs: "20px", sm: "30px" },
            width: { xs: "20px", sm: "30px" },
            marginRight: "1px",
          }}
        >
          <StarRateIcon
            sx={{
              color: "white",
              height: { xs: "20px", sm: "30px" },
              width: { xs: "20px", sm: "30px" },
            }}
          />
        </Avatar>
      </Grid>
    ));
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="tw-max-w-lg tw-mx-auto tw-mt-16 tw-px-7 tw-py-5 tw-bg-white tw-shadow-lg tw-rounded"
      >
        <Typography
          variant="h2"
          className="tw-text-2xl tw-font-bold tw-mb-7 tw-w-full tw-text-center"
        >
          Review Form
        </Typography>
        <Box className="tw-mb-4 tw-px-5">
          <Typography variant="body1" className="tw-block tw-mb-2">
            Rate Your Experience
          </Typography>
          <Grid container>{renderStars()}</Grid>
          {ratingError && (
            <Typography variant="body2" color="error" className="tw-mt-2">
              {ratingError}
            </Typography>
          )}
        </Box>
        <Box className="tw-mb-4 tw-px-5">
          <Typography variant="body1" className="tw-block tw-mb-1">
            Select the Review you want to give
          </Typography>
          <Controller
            name="reviewType"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select
                {...field}
                size="small"
                className="tw-w-full tw-py-0.5 tw-px-0.5 tw-border tw-border-gray-300"
              >
                <MenuItem value="service">Service</MenuItem>
                <MenuItem value="delivery">Delivery</MenuItem>
                <MenuItem value="product">Product</MenuItem>
                <MenuItem value="packaging">Packaging</MenuItem>
              </Select>
            )}
          />
          {errors.reviewType && (
            <Typography variant="body2" color="error" className="tw-mt-2">
              {errors.reviewType.message}
            </Typography>
          )}
        </Box>
        <Box className="tw-mb-4 tw-px-5">
          <Typography variant="body1" className="tw-block tw-mb-1">
            Tell us more about your experience
          </Typography>
          <TextField
            {...register("reviewDescription", {
              required: "Please enter a description",
            })}
            multiline
            rows={6}
            className="tw-w-full tw-py-0.5 tw-px-0.5 tw-border tw-border-gray-300"
          />
          {errors.reviewDescription && (
            <Typography variant="body2" color="error" className="tw-mt-2">
              {errors.reviewDescription.message}
            </Typography>
          )}
        </Box>
        <Box className="tw-mb-4 tw-px-5">
          <Typography variant="body1" className="tw-block tw-mb-1">
            Give your review a title
          </Typography>
          <TextField
            {...register("reviewTitle", { required: "Please enter a title" })}
            type="text"
            className="tw-w-full tw-py-0.5 tw-px-0.5 tw-border tw-border-gray-300"
          />
          {errors.reviewTitle && (
            <Typography variant="body2" color="error" className="tw-mt-2">
              {errors.reviewTitle.message}
            </Typography>
          )}
        </Box>
        <Box className="tw-mb-5 tw-px-5">
          <Typography variant="body1" className="tw-block tw-mb-1">
            Date of experience
          </Typography>
          <Controller
            name="dateOfExperience"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                type="date"
                className="tw-w-full tw-py-0.5 tw-px-0.5 tw-border tw-border-gray-300"
              />
            )}
          />
          {errors.dateOfExperience && (
            <Typography variant="body2" color="error" className="tw-mt-2">
              {errors.dateOfExperience.message}
            </Typography>
          )}
        </Box>
        <Box className="tw-flex tw-justify-center">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="tw-py-2 tw-px-4 focus:tw-outline-none focus:tw-ring-2"
          >
            Submit
          </Button>
        </Box>
      </form>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          variant="filled"
          sx={{ width: "100%" }}
          className="tw-bg-red-500"
        >
          <span>{error}</span>
        </Alert>
      </Snackbar>
    </>
  );
};

export default EditReview;
