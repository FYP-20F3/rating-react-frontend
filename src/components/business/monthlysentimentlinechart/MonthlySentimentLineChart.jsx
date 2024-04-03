import React, { useEffect, useState } from "react";
import axios from "axios";
import { ResponsiveBar } from "@nivo/bar";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../../const/APIS";
import { Line } from "@nivo/line";

const MonthlySentimentLineChart = () => {
    const { currentUser, token } = useSelector((state) => state.user);
    const [reviewByMonth, setReviewByMonth] = useState([]); // Updated variable name
    const [totalReview, setTotalReview] = useState(0);
    const [reviews, setReviews] = useState([]);
    const colors = {
        Positive: "#4caf50",
        Negative: "#d32f2f",
        Neutral: "#ffc107",
    };

    useEffect(() => {
        filterReviews();
    }, []);

    const filterReviews = async () => {
        try {
            const response = await axios.get(
                `${BASE_URL}reviews/business/${currentUser._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const processedData = processData(response.data);
            setReviewByMonth(processedData); // Update variable name
            const totalSortedReviews = processedData.reduce(
                (total, data) => total + data.total,
                0
            );
            setTotalReview(totalSortedReviews); // Update variable name
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    };

    const processData = (reviews) => {
        const groupedData = {};

        reviews.forEach((review) => {
            const reviewDate = new Date(review.createdAt);
            const monthYear = `${reviewDate.getFullYear()}-${String(reviewDate.getMonth() + 1).padStart(2, '0')}`;

            if (!groupedData[monthYear]) {
                groupedData[monthYear] = {
                    monthYear,
                    Positive: 0,
                    Negative: 0,
                    Neutral: 0,
                    total: 0,
                };
            }

            const sentiment = review.Sentiment;
            if (groupedData[monthYear][sentiment] !== undefined) {
                groupedData[monthYear][sentiment]++;
            } else {
                console.error("Unexpected sentiment value:", sentiment);
            }
            groupedData[monthYear].total++;
        });

        return Object.values(groupedData);
    };

    const LineChart = ({ data }) => {
        const sortedData = data.sort((a, b) => {
            const [aYear, aMonth] = a.monthYear.split('-').map(Number);
            const [bYear, bMonth] = b.monthYear.split('-').map(Number);
            // Compare years first
            if (aYear !== bYear) {
                return aYear - bYear;
            }
            // If years are equal, compare months
            return aMonth - bMonth;
        });
        const defs = [
            {
                id: "gradientA",
                type: "linearGradient",
                colors: [
                    { offset: 0, color: "inherit" },
                    { offset: 100, color: "inherit", opacity: 0 },
                ],
            },
        ];
        const lineChartData = [
            {
                id: "Positive",
                data: sortedData.map((monthData) => ({ // Updated variable name
                    x: monthData.monthYear,
                    y: monthData.Positive,
                })),
            },
            {
                id: "Negative",
                data: sortedData.map((monthData) => ({ // Updated variable name
                    x: monthData.monthYear,
                    y: monthData.Negative,
                })),
            },
            {
                id: "Neutral",
                data: sortedData.map((monthData) => ({ // Updated variable name
                    x: monthData.monthYear,
                    y: monthData.Neutral,
                })),
            },
        ];

        return (
            <Line
                width={900}
                defs={defs}
                height={400}
                data={lineChartData}
                margin={{ top: 20, right: 20, bottom: 60, left: 80 }}
                xScale={{ type: "point" }}
                yScale={{
                    type: "linear",
                    min: "auto",
                    max: "auto",
                    stacked: false,
                    reverse: false,
                }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    orient: "bottom",
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: -45,
                    legend: "Month",
                    legendOffset: 36,
                    legendPosition: "middle",
                }}
                axisLeft={{
                    orient: "left",
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Sentiment Percentage",
                    legendOffset: -40,
                    legendPosition: "middle",
                }}
            />
        );
    };

    const BarChart = () => {
        const tickValues = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

        return (
            <ResponsiveBar
                data={reviews}
                keys={["Positive", "Negative", "Neutral"]}
                indexBy="monthYear"
                colors={({ id, data }) => colors[id]}
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                groupMode="grouped"
                minValue={0}
                maxValue={100}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Month",
                    legendPosition: "middle",
                    legendOffset: 32,
                }}
                enableLabel={false}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Number of Reviews",
                    legendPosition: "middle",
                    legendOffset: -40,
                    tickValues: tickValues,
                }}
            />
        );
    };

    return (
        <div style={{ height: "500px" }}>
            <p className="legend-container " style={{ marginBottom: "10px" }}>Analysis for reviews based on sentiments</p>
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
                        <span className="legend-text" style={{ fontWeight: "bold" }}>{sentiment} sentiment</span>
                    </div>
                ))}
            </div>

            {reviewByMonth.length > 0 ? (
                <ReviewsTable data={reviewByMonth} />
            ) : (
                <p>No reviews data available</p>
            )}
            <TotalReviewsCard totalReviews={totalReview} />
            {reviewByMonth.length > 0 ? (
                <LineChart data={reviewByMonth} />
            ) : (
                <p>No reviews data available</p>
            )}
        </div>
    );
};

export default MonthlySentimentLineChart;

const TotalReviewsCard = ({ totalReviews }) => {
    console.log(totalReviews);
    return (
        <div className="total-reviews-card">
            <h5>Total Reviews in the last 12 month</h5>
            <p>{totalReviews}</p>
        </div>
    );
};

const ReviewsTable = ({ data }) => {
    return (
        <div>
            <p className="legend-container">Review Sentiments by Month</p>
            <table className="reviews-table">
                <thead>
                    <tr>
                        <th>Month</th>
                        <th>Positive</th>
                        <th>Negative</th>
                        <th>Neutral</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(({ monthYear, Positive, Negative, Neutral }) => ( // Updated variable names
                        <tr key={monthYear}>
                            <td>{monthYear}</td>
                            <td>{Math.round(Positive)}</td>
                            <td>{Math.round(Negative)}</td>
                            <td>{Math.round(Neutral)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
