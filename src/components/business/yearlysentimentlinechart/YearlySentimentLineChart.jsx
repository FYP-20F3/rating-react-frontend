
import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios
import { ResponsiveBar } from '@nivo/bar'; // Import Nivo ResponsiveBar
import { useSelector } from "react-redux";
import { BASE_URL } from "../../../const/APIS";
import { Line } from '@nivo/line';


const YearlySentimentLineChart = () => {
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
            const year = reviewDate.getFullYear().toString(); // Convert to string if needed

            if (!groupedData[year]) {
                groupedData[year] = { year, Positive: 0, Negative: 0, Neutral: 0, total: 0 };
            }

            const sentiment = review.Sentiment;
            if (groupedData[year][sentiment] !== undefined) {
                groupedData[year][sentiment]++;
            } else {
                // Handle unexpected sentiment
                console.error('Unexpected sentiment value:', sentiment);
            }
            groupedData[year].total++;
        });



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
                "id": "Positive",
                "data": data.map(yearData => ({
                    "x": yearData.year,
                    "y": yearData.Positive
                }))
            },
            {
                "id": "Negative",
                "data": data.map(yearData => ({
                    "x": yearData.year,
                    "y": yearData.Negative
                }))
            },
            {
                "id": "Neutral",
                "data": data.map(yearData => ({
                    "x": yearData.year,
                    "y": yearData.Neutral
                }))
            }
        ];

        return (
            <Line
                width={900}
                defs={defs}


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


    const BarChart = () => {
        const tickValues = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];


        return (
            <ResponsiveBar
                data={reviews}
                keys={['Positive', 'Negative', 'Neutral']}

                indexBy="monthYear"
                colors={({ id, data }) => colors[id]}

                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                groupMode="grouped" // This is crucial for having separate bars for each review rating
                minValue={0}
                maxValue={100}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Month',
                    legendPosition: 'middle',
                    legendOffset: 32
                }}
                enableLabel={false}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Number of Reviews',
                    legendPosition: 'middle',
                    legendOffset: -40,
                    tickValues: tickValues, // Use the custom tick values array
                    // Modify this as needed to fit your data
                }}
            // Additional properties and configurations
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

export default YearlySentimentLineChart;

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
            <h3>Review Sentiments by Year</h3>
            <table className="reviews-table">
                <thead>
                    <tr>
                        <th>Year</th>
                        <th>Positive</th>
                        <th>Negative</th>
                        <th>Neutral</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(({ year, Positive, Negative, Neutral }) => (
                        <tr key={year}>
                            <td>{year}</td>
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
