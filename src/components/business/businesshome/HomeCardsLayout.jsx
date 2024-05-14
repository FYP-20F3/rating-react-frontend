import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Avatar,
  Chip,
  Tooltip,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaHandsClapping } from "react-icons/fa6";
import { BASE_URL } from "../../../const/APIS";

const HomeCardsLayout = ({ id, token }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchBusinessInfo = async () => {
      try {
        // console.log(`${BASE_URL}businesses/${businessId}`);
        const response = await axios.get(`${BASE_URL}businesses/${id}`, {
          headers: {
            // Assuming the token is a Bearer token; adjust if using a different scheme
            Authorization: `Bearer ${token}`,
          },
        });

        setData(response.data);
        console.log(response.data, "businessInfo");
      } catch (error) {
        console.log(error);
      }
    };

    fetchBusinessInfo();
  }, [id]);
  return (
    <>
      <Typography variant="h5" className="tw-font-bold tw-mb-3">
        Hi, Welcome back!{" "}
        <FaHandsClapping className="tw-text-amber-400 tw-text-3xl" />
      </Typography>
      <Grid container spacing={2.5}>
        {/* First Column */}
        <Grid item xs={3}>
          <Card className="tw-bg-[#EBFDFF] tw-pl-3">
            <CardContent className="tw-flex tw-items-center">
              <img
                src="../../../src/assets/the-sum-of.png"
                alt="Total Reviews"
              />
              <Box className="tw-ml-3">
                <Typography variant="h4" className="tw-font-bold">
                  Total Reviews
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  className="tw-mt-1"
                >
                  {data?.reviewCount}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Second Column */}
        <Grid item xs={3}>
          <Card className="tw-bg-[#FEF6F1] tw-pl-3">
            <CardContent className="tw-flex tw-items-center">
              <img src="../../../src/assets/favorite.png" alt="Total Reviews" />
              <Box className="tw-ml-3">
                <Typography variant="h4" className="tw-font-bold">
                  Overall Rating
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  className="tw-mt-1"
                >
                  {data?.overallRating}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Third Column (Nested Grid) */}
        <Grid item xs={6}>
          <Card className="tw-bg-[#F5F2FD]">
            <CardContent className="tw-py-0 tw-pt-3 tw-pb-3">
              <Grid container spacing={2} className="tw-pl-2">
                <Grid item xs={5.5}>
                  <Box className="tw-flex tw-items-center">
                    <Typography className="tw-font-bold tw-text-[1.1rem]">
                      Product Reviews:
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      className="tw-ml-2 tw-mt-0.5"
                    >
                      {data?.reviewTypeCounts?.productReviews}
                    </Typography>
                  </Box>
                  <Box className="tw-flex tw-items-center tw-mt-4">
                    <Typography className="tw-font-bold tw-text-[1.1rem]">
                      Delivery Reviews:
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      className="tw-ml-2 tw-mt-0.5"
                    >
                      {data?.reviewTypeCounts?.deliveryReviews}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={0.3} className="tw-flex tw-justify-center">
                  <Divider
                    orientation="vertical"
                    className="tw-h-[160%] -tw-mt-4 tw-border-r-[2px] tw-border-dotted tw-border-blue-300"
                  />
                </Grid>

                {/* Row 1 - Box 2 */}
                <Grid item xs={5.5}>
                  <Box className="tw-flex tw-items-center">
                    <Typography className="tw-font-bold tw-text-[1.07rem]">
                      Packaging Reviews:
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      className="tw-ml-2 tw-mt-0.5"
                    >
                      {data?.reviewTypeCounts?.packagingReviews}
                    </Typography>
                  </Box>
                  <Box className="tw-flex tw-items-center tw-mt-4">
                    <Typography className="tw-font-bold tw-text-[1.1rem]">
                      Service Reviews:
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      className="tw-ml-2 tw-mt-0.5"
                    >
                      {data?.reviewTypeCounts?.serviceReviews}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={3} className="tw-mt-2">
        <Grid item xs={12}>
          <Card className="tw-bg-[#fffffa] tw-h-[21.2rem]">
            <CardContent className="tw-py-0 tw-pt-3">
              <Grid container spacing={2}>
                <Grid item xs={4.6} className="tw-bg-[#F1F4FD]">
                  <Box className="tw-flex tw-flex-col tw-items-center tw-flex-wrap tw-justify-evenly tw-h-[21.2rem] ">
                    <Chip label={data?.businessCategory} className="tw-mb-5" />
                    <Avatar
                      sx={{ bgcolor: deepOrange[500], width: 100, height: 100 }}
                      src={data?.businessLogoPath}
                    >
                      {data?.businessName?.slice(0, 1)}
                    </Avatar>
                    <Tooltip title={data?.websiteAddress}>
                      <Typography
                        variant="body3"
                        color="text.secondary"
                        className="tw-mt-2 tw-pl-3 tw-pr-5"
                        noWrap={true}
                      >
                        {data?.websiteAddress}
                      </Typography>
                    </Tooltip>
                  </Box>
                </Grid>
                <Grid item xs={7.3} className="tw-pl-6 tw-pr-4 tw-my-2">
                  <Box className="tw-h-[19rem]">
                    <Typography className="tw-font-bold tw-text-[1.5rem] tw-text-center tw-text-green-700">
                      {data?.businessName}
                    </Typography>
                    <Box className="tw-mt-8">
                      <Typography className="tw-mt-5 tw-font-medium tw-text-slate-600 tw-text-base ">
                        {data?.businessDescription}
                      </Typography>
                    </Box>
                    <Tooltip title={data?.location} className="tw-pb-5">
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        className="tw-mt-2 tw-text-right"
                        noWrap={true}
                      >
                        {data?.location}
                      </Typography>
                    </Tooltip>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default HomeCardsLayout;
