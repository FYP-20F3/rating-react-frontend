import * as React from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Select,
  MenuItem,
<<<<<<< HEAD
  Divider,
=======
  Snackbar,
>>>>>>> a328159 (design and settings changed)
  Grid,
  Avatar,
  IconButton,
  Alert,
  IconButton,
  Alert,
} from "@mui/material";
import StarRateIcon from "@mui/icons-material/StarRate";
<<<<<<< HEAD

const ReviewForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [rating, setRating] = useState(0); // Initial rating state
  const [ratingError, setRatingError] = useState("");
  const { businessId, businessName } = useParams();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  // const [suggestions, setSuggestions] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  // Function to handle click on a star
  const handleStarClick = (clickedRating) => {
    // If the same star is clicked again, reset the rating
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
    console.log("data:", data);

    // Manually validate the rating field before form submission
    if (rating === 0) {
      // Set an error message for the rating field
      setRatingError("Please select a rating");
      return;
    }

    let payload = {
      ...data,
      customerId: currentUser._id,
      businessId: businessId,
      reviewRating: rating,
    };

    console.log(payload, "payload");

    try {
      const response = await axios.post(`${BASE_URL}reviews/create`, payload);
      console.log("response:", response);
      if (response.data.semantics) {
      } else {
        navigate(`/customer/reviews/${businessId}/${businessName}`);
      }
    } catch (error) {
      const semantics = `Review submission failed. Seems to be ${error.response.data.semantics}.\n`;
      // const msg = error.response.data.details.suggestions;
      setError(semantics);
      // setSuggestions(msg);
      setOpen(true);
    }
  };

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((star) => (
      <Grid item key={star}>
        {/* {console.log(rating, "rating")}
              {console.log(star, "star")}
              {console.log(
                star,
                "<=",
                rating,
                star <= rating,
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
                "color"
              )} */}
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
          variant="body1"
          className="block mb-1"
          id="descriptionLabel"
        >
          Tell us more about your experience
        </Typography>
        <TextField
          id="description" // htmlFor updated to id
          multiline
          rows={4}
          className="w-full py-0.5 px-0.5 border border-gray-300"
        />
      </Box>
      <Box className="mb-4 px-5">
        <Typography variant="body1" className="block mb-1" id="title">
          Give your review a title
        </Typography>
        <TextField
          id="title"
          type="text"
          className="w-full py-0.5 px-0.5 border border-gray-300"
        />
      </Box>
      <Box className="mb-5 px-5">
        <Typography variant="body1" className="block mb-1" id="date">
          Date of experience
        </Typography>
        <TextField
          id="date" // htmlFor updated to id
          type="date"
          className="w-full py-0.5 px-0.5 border border-gray-300"
        />
      </Box>
      <Box className="flex justify-center">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="py-2 px-4 focus:outline-none focus:ring-2"
=======
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../const/APIS";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

const ReviewForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [rating, setRating] = useState(0); // Initial rating state
  const [ratingError, setRatingError] = useState("");
  const { businessId, businessName } = useParams();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  // const [suggestions, setSuggestions] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  // Function to handle click on a star
  const handleStarClick = (clickedRating) => {
    // If the same star is clicked again, reset the rating
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
    console.log("data:", data);

    // Manually validate the rating field before form submission
    if (rating === 0) {
      // Set an error message for the rating field
      setRatingError("Please select a rating");
      return;
    }

    let payload = {
      ...data,
      customerId: currentUser._id,
      businessId: businessId,
      reviewRating: rating,
    };

    console.log(payload, "payload");

    try {
      const response = await axios.post(`${BASE_URL}reviews/create`, payload);
      console.log("response:", response);
      if (response.data.semantics) {
      } else {
        navigate(`/customer/reviews/${businessId}/${businessName}`);
      }
    } catch (error) {
      const semantics = `Review submission failed. Seems to be ${error.response.data.semantics}.\n`;
      // const msg = error.response.data.details.suggestions;
      setError(semantics);
      // setSuggestions(msg);
      setOpen(true);
    }
  };

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((star) => (
      <Grid item key={star}>
        {/* {console.log(rating, "rating")}
              {console.log(star, "star")}
              {console.log(
                star,
                "<=",
                rating,
                star <= rating,
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
                "color"
              )} */}
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
          <Select
            {...register("reviewType", {
              required: "Please select a review type",
            })}
            defaultValue="service"
            size="small"
            className="tw-w-full tw-py-0.5 tw-px-0.5 tw-border tw-border-gray-300"
          >
            <MenuItem value="service">Service</MenuItem>
            <MenuItem value="delivery">Delivery</MenuItem>
            <MenuItem value="product">Product</MenuItem>
            <MenuItem value="packaging">Packaging</MenuItem>
          </Select>
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
          <TextField
            {...register("dateOfExperience", {
              required: "Please select a date",
            })}
            type="date"
            className="tw-w-full tw-py-0.5 tw-px-0.5 tw-border tw-border-gray-300"
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
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
>>>>>>> a328159 (design and settings changed)
        >
          <span>{error}</span>
          {/* <span>Follow this</span>
          <Typography variant="body3" onClick={()=>}>
             Link 
          </Typography>
          <span>to make your review more </span> */}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ReviewForm;
