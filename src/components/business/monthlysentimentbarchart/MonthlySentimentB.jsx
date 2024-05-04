import React, { useEffect, useState } from "react";
import axios from "axios"; // Import Axios
import { Bar } from "@nivo/bar"; // Import Nivo ResponsiveBar
import { useSelector } from "react-redux";
import { BASE_URL } from "../../../const/APIS";

const MonthlySentimentB = () => {
  const { currentUser, token } = useSelector((state) => state.user);
  const [totalReview, setTotalReview] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const colors = {
    Positive: "#4caf50", // Green for positive sentiment
    Negative: "#d32f2f", // Red for negative sentiment
    Neutral: "#ffc107", // Amber for neutral sentiment
  };

  useEffect(() => {
    filterReviews();
  }, []);

  const filterReviews = async () => {
    // Assuming currentUser and token are defined somewhere in your component or context

    try {
      setLoading(true);

      const response = await axios.get(
        `${BASE_URL}reviews/business/${currentUser._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const processedData = processData(response.data);
      const sortedData = processedData.sort((a, b) => {
        const partsA = a.monthYear.split(" ");
        const partsB = b.monthYear.split(" ");
        const dateA = new Date(`${partsA[1]}-${partsA[0]}-01`);
        const dateB = new Date(`${partsB[1]}-${partsB[0]}-01`);
        return dateA - dateB;
      });
      setReviews(sortedData);
      const lastTwelveMonthsData = sortedData.slice(-12);
      const totalSortedReviews = lastTwelveMonthsData.reduce(
        (total, data) => total + data.total,
        0
      );
      setTotalReview(totalSortedReviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const processData = (reviews) => {
    const groupedData = {};
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const now = new Date();
    const lastYear = new Date(
      now.getFullYear() - 1,
      now.getMonth(),
      now.getDate()
    );

    // Filter out reviews that are not within the last 12 months
    const last12MonthsReviews = reviews.filter(({ createdAt }) => {
      const reviewDate = new Date(createdAt);
      return reviewDate >= lastYear;
    });

    last12MonthsReviews.forEach((review) => {
      const reviewDate = new Date(review.createdAt);
      const monthIndex = reviewDate.getMonth();
      const year = reviewDate.getFullYear();
      const monthYear = `${monthNames[monthIndex]} ${year}`;

      if (!groupedData[monthYear]) {
        groupedData[monthYear] = {
          monthYear,
          Positive: 0,
          Negative: 0,
          Neutral: 0,
          total: 0,
        };
      }

      // Check if the review sentiment exists in the data object
      const sentiment = review.Sentiment;
      if (["Positive", "Negative", "Neutral"].includes(sentiment)) {
        groupedData[monthYear][sentiment]++;
      } else {
        // Handle the case where the sentiment might not be one of the expected values
        // For example, initialize it to Neutral or log an error
        console.error("Unexpected sentiment value:", sentiment);
        groupedData[monthYear]["Neutral"]++; // Defaulting to Neutral for this example
      }

      groupedData[monthYear].total++; // Keep track of total reviews for each month
    });

    return Object.values(groupedData);
  };

  const BarChart = () => {
    const tickValues = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

    return (
      <div className="tw-flex tw-justify-center tw-items-center">
        <div className="tw-bg-[#fffffc] tw-pt-5 tw-mt-5 tw-rounded-lg hover:tw-shadow-md tw-mr-5 tw-ml-2">
          <Bar
            data={reviews}
            keys={["Positive", "Negative", "Neutral"]}
            height={450}
            width={1000}
            indexBy="monthYear"
            colors={({ id, data }) => colors[id]}
            margin={{ top: 50, right: 35, bottom: 90, left: 80 }}
            padding={0.3}
            groupMode="grouped" // This is crucial for having separate bars for each review rating
            minValue={0}
            maxValue={100}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: -45,
              legend: "Month",
              legendPosition: "middle",
              legendOffset: 65,
            }}
            enableLabel={false}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Number of Reviews",
              legendPosition: "middle",
              legendOffset: -40,
              tickValues: tickValues, // Use the custom tick values array
              // Modify this as needed to fit your data
            }}
            // Additional properties and configurations
          />
        </div>
      </div>
    );
  };

  return (
    <div className={`${loading ? "tw-h-[90vh]" : ""}`}>
      {reviews.length == 0 && loading && (
        <p className="tw-text-xl tw-flex tw-justify-center tw-items-center tw-h-3/6">
          No reviews data available
        </p>
      )}
      {reviews.length > 0 && <TotalReviewsCard totalReviews={totalReview} />}
      <p className="legend-container " style={{ marginBottom: "10px" }}>
        Analysis for reviews based on sentiments
      </p>
      <div className="legend-container">
        {Object.keys(colors).map((sentiment) => (
          <div
            key={sentiment}
            className="legend-item"
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
              marginRight: "20px", // Adjust as needed for spacing between items
            }}
          >
            <span
              className="legend-color"
              style={{
                backgroundColor: colors[sentiment],
                width: "20px",
                height: "20px",
                display: "inline-block",
                marginRight: "10px",
                borderRadius: "50%",
              }}
            ></span>
            <span className="legend-text" style={{ fontWeight: "bold" }}>
              {sentiment} sentiment
            </span>
          </div>
        ))}
      </div>
      {reviews.length > 0 && <BarChart />}
    </div>
  );
};

export default MonthlySentimentB;

const TotalReviewsCard = ({ totalReviews }) => {
  return (
    <div className="tw-mt-3 tw-flex tw-justify-center tw-items-center tw-my-5">
      <h3>Total Reviews in the last 12 month: </h3>
      <p className="tw-ml-2 tw-text-xl">{totalReviews}</p>
    </div>
  );
};
