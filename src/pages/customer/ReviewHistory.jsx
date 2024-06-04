import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Snackbar,
  Typography,
} from "@mui/material";
import Footer from "../../components/customer/footer/Footer";
import HomeNavbar from "../../components/customer/header/HomeNavbar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../const/APIS";
import { StarRate, Edit, Delete } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ReviewHistory = () => {
  const ratings = [1, 2, 3, 4, 5];
  const { token, currentUser } = useSelector((state) => state.user);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [blockedCount, setBlockedCount] = useState(0);

  const id = currentUser._id;

  console.log(id);
  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${BASE_URL}reviews/customer/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const reviews = response.data;
        const unblockedReviews = reviews.filter((review) => !review.block);
        const blockedReviews = reviews.filter((review) => review.block);

        setData(unblockedReviews);
        setBlockedCount(blockedReviews.length);
      } catch (error) {
        console.log(error);
      }
    };

    fetchReviews();
  }, [id, token]);

  useEffect(() => {
    if (blockedCount > 0) {
      setError(
        `You have ${blockedCount} blocked reviews due to policy violation. Is this a mistake? Contact the admin.`
      );
      setOpen(true);
    }
  }, [blockedCount]);

  const deleteReview = async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}reviews/${id}`);
      if (response.status === 200) {
        console.log(`${response.data.msg}`);
        setError(`${response.data.msg}`);
        setOpen(true);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting review:", error);
      setError("Failed to delete review.");
      setOpen(true);
    }
  };

  return (
    <>
      <HomeNavbar />
      <Box className="tw-mx-auto tw-py-14">
        {data &&
          data.map((item) => (
            <Card
              key={item._id}
              sx={{ mb: 4, mt: 3, ml: 10, mr: 19, py: 2, px: 3 }}
            >
              <Box className="tw-flex tw-justify-between tw-items-center ">
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
                <Box className="tw-mr-5">
                  <Button
                    variant="contained"
                    color="success"
                    className="tw-mr-4"
                    onClick={() => {
                      navigate(`/customer/edit-review/${item._id}`);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      deleteReview(item._id);
                    }}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
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
                              rating === 1 && item.reviewRating === 1
                                ? "box.red"
                                : rating <= 2 && item.reviewRating === 2
                                ? "box.orange"
                                : rating <= 3 && item.reviewRating === 3
                                ? "box.yellow"
                                : rating <= 4 && item.reviewRating === 4
                                ? "box.lime"
                                : rating <= 5 && item.reviewRating === 5
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
            </Card>
          ))}
      </Box>
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
      <Footer sx={{ position: "fixed", bottom: 0, width: "100%" }} />
    </>
  );
};
export default ReviewHistory;
