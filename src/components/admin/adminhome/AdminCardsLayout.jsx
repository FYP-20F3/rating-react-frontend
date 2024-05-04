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
import { Bar, ResponsiveBar } from "@nivo/bar";

const AdminCardsLayout = ({ token }) => {
  const [chartData, setChartData] = useState([]);
  const [total, setTotal] = useState({
    reviews: 0,
    customers: 0,
    businesses: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}admin/data`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { customers, reviews, businesses } = response.data;

        // Calculate total counts
        const totalReviews = reviews.length;
        const totalCustomers = customers.length;
        const totalBusinesses = businesses.length;

        setTotal({
          reviews: totalReviews,
          customers: totalCustomers,
          businesses: totalBusinesses,
        });

        // Organize data by month
        let dataByMonth = {};

        // Initialize dataByMonth with 12 months
        const currentDate = new Date();
        for (let i = 0; i < 12; i++) {
          const month = currentDate.toLocaleString("en-US", {
            year: "numeric",
            month: "2-digit",
          });
          dataByMonth[month] = { customers: 0, reviews: 0, businesses: 0 };
          currentDate.setMonth(currentDate.getMonth() - 1);
        }

        console.log(dataByMonth, "heko");
        // Update dataByMonth with actual data if they exist
        if (customers) {
          customers.forEach((customer) => {
            const month = new Date(customer.createdAt).toLocaleString("en-US", {
              year: "numeric",
              month: "2-digit",
            });
            // Check if dataByMonth[month] exists before trying to access its properties
            if (dataByMonth[month]) {
              dataByMonth[month].customers++;
            }
          });
        }

        if (reviews) {
          reviews.forEach((review) => {
            const month = new Date(review.createdAt).toLocaleString("en-US", {
              year: "numeric",
              month: "2-digit",
            });
            // Check if dataByMonth[month] exists before trying to access its properties
            if (dataByMonth[month]) {
              dataByMonth[month].reviews++;
            }
          });
        }

        if (businesses) {
          businesses.forEach((business) => {
            const month = new Date(business.createdAt).toLocaleString("en-US", {
              year: "numeric",
              month: "2-digit",
            });
            // Check if dataByMonth[month] exists before trying to access its properties
            if (dataByMonth[month]) {
              dataByMonth[month].businesses++;
            }
          });
        }
        // Convert data to Nivo format
        const chartData = Object.keys(dataByMonth).map((key) => ({
          month: key,
          customers: dataByMonth[key].customers,
          reviews: dataByMonth[key].reviews,
          businesses: dataByMonth[key].businesses,
        }));

        setChartData(chartData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]);

  return (
    <>
      <Typography variant="h5" className="tw-font-bold tw-mb-3">
        Hi, Welcome back!{" "}
        <FaHandsClapping className="tw-text-amber-400 tw-text-3xl" />
      </Typography>
      <Typography className="tw-font-semibold tw-text-lg tw-pl-1 tw-text-orange-500 tw-mb-3 ">
        Overview
      </Typography>
      <Grid container spacing={3.5} className="tw-mb-6">
        {/* First Column */}
        <Grid item xs={4}>
          <Card className="tw-bg-[#EBFDFF] tw-pl-3">
            <CardContent className="tw-flex tw-items-center">
              <img
                src="../../../src/assets/customer.png"
                alt="Total Customers"
              />
              <Box className="tw-ml-3">
                <Typography variant="h4" className="tw-font-bold">
                  Total Customers
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  className="tw-mt-1"
                >
                  {total.customers}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Second Column */}
        <Grid item xs={4}>
          <Card className="tw-bg-[#FEF6F1] tw-pl-3">
            <CardContent className="tw-flex tw-items-center">
              <img
                src="../../../src/assets/business.png"
                alt="Total Businesses"
              />
              <Box className="tw-ml-3">
                <Typography variant="h4" className="tw-font-bold">
                  Total Businesses
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  className="tw-mt-1"
                >
                  {total.businesses}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Third Column */}
        <Grid item xs={4}>
          <Card className="tw-bg-[#F5F2FD] tw-pl-3">
            <CardContent className="tw-flex tw-items-center">
              <img src="../../../src/assets/review.png" alt="Total Reviews" />
              <Box className="tw-ml-3">
                <Typography variant="h4" className="tw-font-bold">
                  Total Reviews
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  className="tw-mt-1"
                >
                  {total.reviews}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Typography className="tw-font-semibold tw-text-lg tw-pl-1 tw-text-orange-500 tw-mb-1">
        Statistics
      </Typography>
      <Grid container spacing={3} className="tw-mb-4">
        <Grid item xs={12} height={500} className="">
          <Box className="tw-bg-[#fffffc] tw-pt-5 tw-mt-5 tw-rounded-lg hover:tw-shadow-md tw-mr-8 tw-ml-2">
            <Bar
              data={chartData}
              keys={["customers", "reviews", "businesses"]}
              indexBy="month"
              width={1000}
              height={430}
              margin={{ top: 50, right: 130, bottom: 80, left: 60 }}
              padding={0.3}
              colors={{ scheme: "category10" }}
              borderColor={{ from: "color", modifiers: [["darker", "1.6"]] }}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: -45,
                legend: "Month",
                legendPosition: "middle",
                legendOffset: 57,
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Count",
                legendPosition: "middle",
                legendOffset: -40,
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor={{ from: "color", modifiers: [["darker", "1.6"]] }}
              legends={[
                {
                  dataFrom: "keys",
                  anchor: "bottom-right",
                  direction: "column",
                  justify: false,
                  translateX: 120,
                  translateY: 0,
                  itemsSpacing: 2,
                  itemWidth: 100,
                  itemHeight: 20,
                  itemDirection: "left-to-right",
                  itemOpacity: 0.85,
                  symbolSize: 20,
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ]}
              animate={true}
              motionStiffness={90}
              motionDamping={15}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default AdminCardsLayout;
