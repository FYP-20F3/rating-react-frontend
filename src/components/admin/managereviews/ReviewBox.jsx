import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { StarRate, Reply, Delete, Block } from "@mui/icons-material";
import { useState } from "react";

import axios from "axios";
import { BASE_URL } from "../../../const/APIS";

const ReviewBox = ({ review, businessName }) => {
  const ratings = [1, 2, 3, 4, 5];
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  console.log(review, "review");
  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const deleteReview = async () => {
    let reviewId = review._id;

    console.log(reviewId, "reviewId");

    try {
      console.log(`${BASE_URL}reviews/${reviewId}`);
      const response = await axios.delete(`${BASE_URL}reviews/${reviewId}`);
      console.log("response:", response);

      if (response.status === 200) {
        console.log(`${response.data.msg}`);
        setError(`${response.data.msg}`);
        setOpen(true);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.msg);
      setOpen(true);
    }
  };

  const blockReview = async () => {
    let reviewId = review._id;
    let block = "block";

    if (review.block === true) {
      block = "unblock";
    }

    try {
      console.log(`${BASE_URL}reviews/${reviewId}/block`);
      const response = await axios.put(`${BASE_URL}reviews/${reviewId}/block`, {
        action: block,
      });
      console.log("response:", response);

      if (response.status === 200) {
        setError(`${response.data.msg}`);
        setOpen(true);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.msg);
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
          <Box className="tw-mb-4 tw-font-bold tw-text-base">
            Review About
            <Typography
              className="tw-font-bold tw-text-base tw-ml-1 tw-text-cyan-700"
              component="span"
            >
              {review.businessId?.businessName}
            </Typography>
          </Box>

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
          <Chip
            label={
              <Typography
                variant="body3"
                component="p"
                className="tw-font-bold"
              >
                by
                <span className="tw-text-orange-500 tw-text-lg tw-ml-[4px] tw-align-text-top tw-font-medium ">
                  {review.customerId?.firstName} {review.customerId?.lastName}
                </span>
              </Typography>
            }
            className="tw-mt-5 tw-py-5 tw-mb-3 tw-bg-purple-100 tw-rounded-full tw-px-2 hover:tw-shadow-md"
          />
          {review.reviewReply && (
            <Box>
              <Divider
                className="tw-mx-1 tw-mb-3 tw-border-zinc-900 tw-mt-5"
                sx={{ border: "1px solid" }}
              />
              <Card
                sx={{ borderLeft: "10px solid blue" }}
                className="tw-mt-8 tw-bg-slate-200"
              >
                <CardContent className="tw-flex">
                  <div className="tw-w-11 tw-flex">
                    <Reply className="tw-text-green-700 tw-text-3xl" />
                  </div>
                  <div className="tw-w-full">
                    <div className="tw-flex tw-items-center tw-justify-between tw-mb-2">
                      <Typography variant="h6">
                        {businessName} Replied
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
          {!review.reviewReply && (
            <Divider
              className="tw-mx-1 tw-mb-3 tw-border-zinc-900 tw-mt-5"
              sx={{ border: "1px solid" }}
            />
          )}
          <Box className="tw-mt-5 tw-flex tw-justify-end tw-items-center tw-gap-5">
            <Button
              variant="contained"
              color="error"
              startIcon={<Delete />}
              aria-label="delete"
              onClick={deleteReview}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              startIcon={<Block />}
              aria-label="block"
              className="tw-bg-yellow-500"
              onClick={blockReview}
            >
              {review.block ? "Unblock" : "Block"}
            </Button>
          </Box>
        </CardContent>
      </Card>
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

export default ReviewBox;
