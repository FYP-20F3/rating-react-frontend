import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios
import { ResponsiveBar } from '@nivo/bar'; // Import Nivo ResponsiveBar
import { useSelector } from "react-redux";
import { BASE_URL } from "../../../const/APIS";
import { Line } from '@nivo/line';


const RevCatMonthlyLineChart = () => {
    const { currentUser, token } = useSelector((state) => state.user);
    const [reviewByYear, setReviewByYear] = useState([])
    const [totalReview, setTotalReview] = useState(0)
    const [reviews, setReviews] = useState([]);
    const colors = {
        Positive: '#4caf50', // Green for positive sentiment
        Negative: '#d32f2f', // Red for negative sentiment
        Neutral: '#ffc107'  // Amber for neutral sentiment
    };

    useEffect(() => {
        filterReviews();
    }, []);

    const filterReviews = async () => {
        // Assuming currentUser and token are defined somewhere in your component or context

        console.log(token);

        const response = await axios.get(
            `${BASE_URL}reviews/business/${currentUser._id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        console.log(response.data);
        const processedData = processData(response.data);
        console.log(processedData)
        setReviewByYear(processedData)

        const sortedData = processedData.sort((a, b) => {
            return a.year - b.year;
        });


        console.log(sortedData)
        const totalSortedReviews = sortedData.reduce((total, data) => total + data.total, 0);
        console.log(sortedData.length)

        setReviews(sortedData); // Update this line
    };


    const processData = (reviews) => {
        const groupedData = {};

        reviews.forEach((review) => {
            const reviewDate = new Date(review.createdAt);
            const year = reviewDate.getFullYear().toString();

            // Initialize the year object if it doesn't exist
            if (!groupedData[year]) {
                groupedData[year] = {
                    year,
                    product: 0,
                    delivery: 0,
                    packaging: 0,
                    service: 0
                };
            }

            // Increment the count for the reviewType
            const reviewType = review.reviewType;
            if (reviewType in groupedData[year]) {
                groupedData[year][reviewType]++;
            } else {
                console.error('Unexpected review type value:', reviewType);
                // Initialize with 1 if the type is unexpected to account for this review
                groupedData[year][reviewType] = 1;
            }
        });

        // Convert the object into an array of year objects
        return Object.values(groupedData);
    };


    const LineChart = ({ data }) => {
        // Transform data for Nivo Line chart
        const defs = [
            {
                id: 'gradientA',
                type: 'linearGradient',
                colors: [
                    { offset: 0, color: 'inherit' },
                    { offset: 100, color: 'inherit', opacity: 0 },
                ],
            },
        ];
        const lineChartData = [
            {
                "id": "Product",
                "data": data.map(yearData => ({
                    "x": yearData.year,
                    "y": yearData.product || 0 // Ensure a value is provided even if it's 0
                }))
            },
            {
                "id": "Delivery",
                "data": data.map(yearData => ({
                    "x": yearData.year,
                    "y": yearData.delivery || 0
                }))
            },
            {
                "id": "Packaging",
                "data": data.map(yearData => ({
                    "x": yearData.year,
                    "y": yearData.packaging || 0
                }))
            },
            {
                "id": "Service",
                "data": data.map(yearData => ({
                    "x": yearData.year,
                    "y": yearData.service || 0
                }))
            }
        ];
        const CustomTooltip = ({ point }) => {
            // Check the structure of `point` in your console to ensure correct data access
            console.log(point);

            return (
                <div style={{ background: 'white', padding: '9px 12px', border: '1px solid #ccc' }}>
                    <strong>{point.data.xFormatted}</strong>
                    <div>{point.serieId}: {point.data.yFormatted}</div>
                    <div>Total reviews: {point.data.y}</div>
                </div>
            );
        };


        return (
            <Line
                width={900}
                defs={defs}
                tooltip={CustomTooltip}


                height={400}
                data={lineChartData}
                margin={{ top: 20, right: 20, bottom: 60, left: 80 }}
                xScale={{ type: 'point' }}
                yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    orient: 'bottom',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Year',
                    legendOffset: 36,
                    legendPosition: 'middle'
                }}
                axisLeft={{
                    orient: 'left',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Sentiment Percentage',
                    legendOffset: -40,
                    legendPosition: 'middle'
                }}
            // Other necessary props and styling
            />
        );
    };



    return (
        <div style={{ height: "500px" }}>
            <h1>Analysis for reviews based on sentiments</h1>
            <div className="legend flex justify-between	" >
                {Object.keys(colors).map(sentiment => (
                    <div key={sentiment} className="legend-item" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <span className="legend-color" style={{ backgroundColor: colors[sentiment], width: '20px', height: '20px', display: 'inline-block', marginRight: '10px', borderRadius: '50%' }}></span>
                        <span className="legend-text">{sentiment} sentiment</span>
                    </div>
                ))}
            </div>
            {reviews.length > 0 ? <ReviewsTable data={reviewByYear} /> : <p>No reviews data available</p>}
            <TotalReviewsCard totalReviews={totalReview} />
            {reviews.length > 0 ? <LineChart data={reviews} /> : <p>No reviews data available</p>}

            {/* {reviews.length > 0 ? <BarChart /> : <p>No reviews data available</p>} */}
        </div>
    );
};

export default RevCatMonthlyLineChart;

const TotalReviewsCard = ({ totalReviews }) => {
    console.log(totalReviews)
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
            <h3>Review Counts by Type and Year</h3>
            <table className="reviews-table">
                <thead>
                    <tr>
                        <th>Year</th>
                        <th>Product</th>
                        <th>Delivery</th>
                        <th>Packaging</th>
                        <th>Service</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(({ year, product, delivery, packaging, service, total }) => (
                        <tr key={year}>
                            <td>{year}</td>
                            <td>{product}</td>
                            <td>{delivery}</td>
                            <td>{packaging}</td>
                            <td>{service}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


