import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { StarRate, Reply } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../const/APIS";

const ReviewItem = ({ review, businessName, businessId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const ratings = [1, 2, 3, 4, 5];
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const onSubmit = async (data) => {
    console.log("data:", data);

    let payload = {
      ...data,
      businessId: businessId,
      reviewId: review._id,
    };

    console.log(payload, "payload");

    try {
      console.log(`${BASE_URL}reviews/replies`);
      const response = await axios.post(`${BASE_URL}reviews/replies`, payload);
      console.log("response:", response);

      // Refresh the page after successfully posting the reply
      window.location.reload();
    } catch (error) {
      //   console.log(error);
      setError(error.response.data.error);
      setOpen(true);
    }
  };

  return (
    <>
      <Card
        variant="outlined"
        className="tw-mb-4 tw-bg-white tw-mr-16 tw-px-4 tw-py-3"
      >
        <CardContent>
          <Typography
            variant="h6"
            color="text.secondary"
            className="tw-mb-2 tw-font-bold"
          >
            {review.reviewTitle}
          </Typography>
          <Grid
            container
            alignItems="center"
            justifyContent="between"
            className="tw-mb-8"
          >
            <Grid item className="tw-grid-cols-5" sm={6}>
              <Box className="tw-flex tw-w-full">
                {ratings.map((rating) => (
                  <div key={rating} className="tw-flex">
                    <Avatar
                      aria-label="star box"
                      variant="square"
                      sx={{
                        bgcolor:
                          rating == 1 && review.reviewRating == 1
                            ? "box.red"
                            : rating <= 2 && review.reviewRating == 2
                            ? "box.orange"
                            : rating <= 3 && review.reviewRating == 3
                            ? "box.yellow"
                            : rating <= 4 && review.reviewRating == 4
                            ? "box.lime"
                            : rating <= 5 && review.reviewRating == 5
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
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} className="tw-text-right">
              <Typography variant="body2" color="text.secondary">
                {new Date(review.dateOfExperience).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Typography>
            </Grid>
          </Grid>
          <Typography variant="body1" component="p" className="tw-mt-2">
            {review.reviewDescription}
          </Typography>
          {!review.reviewReply && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={1} className="tw-mt-2">
                <Grid item>
                  <Button variant="outlined" size="small">
                    Reply
                  </Button>
                </Grid>
              </Grid>
              <Grid container spacing={1} className="tw-mt-2">
                <Grid item xs={12} sm={10}>
                  <TextField
                    label="Write a reply..."
                    multiline
                    variant="outlined"
                    fullWidth
                    rows={4}
                    {...register("replyDescription", {
                      required: "Please enter a description",
                    })}
                  />
                  {errors.replyDescription && (
                    <Typography
                      variant="body2"
                      color="error"
                      className="tw-mt-2"
                    >
                      {errors.replyDescription.message}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Button
                    variant="contained"
                    fullWidth
                    color="primary"
                    type="submit"
                    className="tw-py-3 tw-px-4 tw-ml-2"
                  >
                    Post reply
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
          {review.reviewReply && (
            <Box>
              <Divider
                className="tw-mx-1 tw-mb-3 tw-border-zinc-900 tw-mt-5"
                sx={{ border: "1px solid" }}
              />
              <Card
                sx={{ borderLeft: "10px solid blue" }}
                className="tw-bg-white tw-mt-8 tw-bg-slate-200"
              >
                <CardContent className="tw-flex">
                  <div className="tw-w-11 tw-flex">
                    <Reply className="tw-text-green-700 tw-text-3xl" />
                  </div>
                  <div className="tw-w-full">
                    <div className="tw-flex tw-items-center tw-justify-between tw-mb-2">
                      <Typography variant="h6">
                        You({businessName}) Replied
                      </Typography>
                      <Typography variant="body2">
                        {new Date(
                          review.reviewReply.createdAt
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </Typography>
                    </div>
                    <Typography variant="body1">
                      {review.reviewReply.replyDescription}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </Box>
          )}
        </CardContent>
      </Card>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          <span>{error}</span>
        </Alert>
      </Snackbar>
    </>
  );
};

export default ReviewItem;
