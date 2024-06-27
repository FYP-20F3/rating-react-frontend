import { Box, Card, CardContent, Typography } from "@mui/material";
import HomeNavbar from "@components/customer/header/HomeNavbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../const/APIS";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AnalysisFilter from "@components/business/analysisfilter/analysisFilter";

const ProgressDashboard = () => {
  const { businessId, businessName } = useParams();
  const [data, setData] = useState([]);
  const { token } = useSelector((state) => state.user);

  let rating5, rating4, rating3, rating2, rating1;
  if (data && data.ratingPercentages) {
    [rating5, rating4, rating3, rating2, rating1] = data.ratingPercentages.map(
      ({ rating, percentage }) => `${percentage}%`
    );
  }

  useEffect(() => {
    const fetchBusinessInfo = async () => {
      try {
        // console.log(`${BASE_URL}businesses/${businessId}`);
        const response = await axios.get(
          `${BASE_URL}businesses/${businessId}`,
          {
            headers: {
              // Assuming the token is a Bearer token; adjust if using a different scheme
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setData(response.data);
        console.log(response.data, "businessInfo");
      } catch (error) {
        console.log(error);
      }
    };

    fetchBusinessInfo();
  }, [businessId]);

  return (
    <>
      <HomeNavbar />

      <Box
        sx={{
          backgroundColor: "background.paper",
          py: 5,
          px: 10,
          mt: 8,
        }}
      >
        <Typography variant="h2" component="h2">
          Business Description
        </Typography>
        <Typography
          variant="body2"
          component="p"
          className="tw-mt-2 tw-text-gray-500"
        >
          {data.businessDescription}
        </Typography>

        <Box className="tw-mt-10">
          <div className="tw-flex tw-justify-between tw-w-full">
            <Card className="tw-w-1/2 tw-bg-white tw-shadow-md tw-rounded-lg tw-px-5 tw-py-7 tw-mr-20">
              <CardContent>
                <Typography
                  variant="h5"
                  component="p"
                  className="tw-text-[1.3rem] tw-font-medium tw-text-gray-500 tw-mb-5"
                >
                  Star Distribution by Review Types
                </Typography>
                <Box className="tw-flex tw-items-center tw-mb-2">
                  <Typography
                    className="tw-font-bold tw-mb-3 tw-text-[1.2rem] tw-text-green-600"
                    component="span"
                  >
                    Total Product Reviews:
                  </Typography>
                  <Typography
                    className="tw-font-bold tw-mb-3 tw-text-[1.2rem] tw-pl-3"
                    component="span"
                  >
                    {data.reviewTypeCounts?.productReviews}
                  </Typography>
                </Box>
                <Box className="tw-flex tw-items-center tw-mb-2">
                  <Typography
                    className="tw-font-bold tw-mb-3 tw-text-[1.2rem] tw-text-green-600"
                    component="span"
                  >
                    Total Service Reviews:
                  </Typography>
                  <Typography
                    className="tw-font-bold tw-mb-3 tw-text-[1.2rem] tw-pl-3"
                    component="span"
                  >
                    {data.reviewTypeCounts?.serviceReviews}
                  </Typography>
                </Box>
                <Box className="tw-flex tw-items-center tw-mb-2">
                  <Typography
                    className="tw-font-bold tw-mb-3 tw-text-[1.2rem] tw-text-green-600"
                    component="span"
                  >
                    Total Delivery Reviews:
                  </Typography>
                  <Typography
                    className="tw-font-bold tw-mb-3 tw-text-[1.2rem] tw-pl-3"
                    component="span"
                  >
                    {data.reviewTypeCounts?.deliveryReviews}
                  </Typography>
                </Box>
                <Box className="tw-flex tw-items-center">
                  <Typography
                    className="tw-font-bold  tw-text-[1.2rem] tw-text-green-600"
                    component="span"
                  >
                    Total Packaging Reviews:
                  </Typography>
                  <Typography
                    className="tw-font-bold tw-text-[1.2rem] tw-pl-3"
                    component="span"
                  >
                    {data.reviewTypeCounts?.packagingReviews}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
            <Card className="tw-w-1/2 tw-bg-white tw-shadow-md tw-rounded-lg tw-p-5 tw-px-7">
              <CardContent>
                <Box>
                  <Typography
                    variant="h5"
                    component="p"
                    className="tw-text-[1.3rem] tw-font-medium tw-text-gray-500 tw-mb-5"
                  >
                    Reviews Star Rating Distribution
                  </Typography>
                </Box>
                <Box className="tw-flex tw-items-center tw-mt-3 ">
                  <Typography
                    component="span"
                    className="tw-text-blue-500 tw-text-lg"
                  >
                    5 star
                  </Typography>

                  <Box className="star-rating-bar tw-bg-gray-200">
                    <Box
                      className="star-rating-fill"
                      style={{ width: rating5 }}
                    />
                  </Box>
                  <Typography
                    variant="body2"
                    component="span"
                    className="star-rating-percentage"
                  >
                    {rating5 || 0}
                  </Typography>
                </Box>
                <Box className="tw-flex tw-items-center tw-mt-3 ">
                  <Typography
                    component="span"
                    className="tw-text-blue-500 tw-text-lg"
                  >
                    4 star
                  </Typography>
                  <Box className="star-rating-bar tw-bg-gray-200">
                    <Box
                      className="star-rating-fill"
                      style={{ width: rating4 }}
                    />
                  </Box>
                  <Typography
                    variant="body2"
                    component="span"
                    className="star-rating-percentage"
                  >
                    {rating4 || 0}
                  </Typography>
                </Box>
                <Box className="tw-flex tw-items-center tw-mt-3 ">
                  <Typography
                    component="span"
                    className="tw-text-blue-500 tw-text-lg"
                  >
                    3 star
                  </Typography>

                  <Box className="star-rating-bar tw-bg-gray-200">
                    <Box
                      className="star-rating-fill"
                      style={{ width: rating3 }}
                    />
                  </Box>
                  <Typography
                    variant="body2"
                    component="span"
                    className="star-rating-percentage"
                  >
                    {rating3 || 0}
                  </Typography>
                </Box>
                <Box className="tw-flex tw-items-center tw-mt-3 ">
                  <Typography
                    component="span"
                    className="tw-text-blue-500 tw-text-lg"
                  >
                    2 star
                  </Typography>
                  <Box className="star-rating-bar tw-bg-gray-200">
                    <Box
                      className="star-rating-fill"
                      style={{ width: rating2 }}
                    />
                  </Box>
                  <Typography
                    variant="body2"
                    component="span"
                    className="star-rating-percentage"
                  >
                    {rating2 || 0}
                  </Typography>
                </Box>
                <Box className="tw-flex tw-items-center tw-mt-3 ">
                  <Typography
                    component="span"
                    className="tw-text-blue-500 tw-text-lg"
                  >
                    1 star
                  </Typography>
                  <Box className="star-rating-bar tw-bg-gray-200">
                    <Box
                      className="star-rating-fill"
                      style={{ width: rating1 }}
                    />
                  </Box>
                  <Typography
                    variant="body2"
                    component="span"
                    className="star-rating-percentage"
                  >
                    {rating1 || 0}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </div>
        </Box>
        <Box className="tw-mt-10">
          <Card className="tw-w-full tw-bg-white tw-shadow-md tw-rounded-lg tw-px-5 tw-py-7 tw-mx-auto">
            <CardContent>
              <Typography
                variant="h5"
                component="p"
                className="tw-text-[1.5rem] tw-font-medium tw-text-gray-500 tw-mb-5"
              >
                Review Rating Chart
              </Typography>
              <AnalysisFilter id={businessId} from="customer" />
            </CardContent>
          </Card>
        </Box>
      </Box>
    </>
  );
};
export default ProgressDashboard;
