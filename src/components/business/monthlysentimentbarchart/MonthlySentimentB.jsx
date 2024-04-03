import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios
import { ResponsiveBar } from '@nivo/bar'; // Import Nivo ResponsiveBar
import { useSelector } from "react-redux";
import { BASE_URL } from "../../../const/APIS";

const MonthlySentimentB = () => {
    const { currentUser, token } = useSelector((state) => state.user);
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
        const sortedData = processedData.sort((a, b) => {
            const partsA = a.monthYear.split(' ');
            const partsB = b.monthYear.split(' ');
            const dateA = new Date(`${partsA[1]}-${partsA[0]}-01`);
            const dateB = new Date(`${partsB[1]}-${partsB[0]}-01`);
            return dateA - dateB;
        });
        console.log(sortedData)
        const totalSortedReviews = sortedData.reduce((total, data) => total + data.total, 0);
        console.log(sortedData.length)

        setReviews(sortedData); // Update this line
    };


    const processData = (reviews) => {
        const groupedData = {};
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const now = new Date();
        const lastYear = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());

        // Filter out reviews that are not within the last 12 months
        const last12MonthsReviews = reviews.filter(({ createdAt }) => {
            const reviewDate = new Date(createdAt);
            return reviewDate >= lastYear;
        });
        console.log(last12MonthsReviews)

        last12MonthsReviews.forEach((review) => {
            const reviewDate = new Date(review.createdAt);
            const monthIndex = reviewDate.getMonth();
            const year = reviewDate.getFullYear();
            const monthYear = `${monthNames[monthIndex]} ${year}`;

            if (!groupedData[monthYear]) {
                groupedData[monthYear] = { monthYear, Positive: 0, Negative: 0, Neutral: 0, total: 0 };
            }

            // Check if the review sentiment exists in the data object
            const sentiment = review.Sentiment;
            if (['Positive', 'Negative', 'Neutral'].includes(sentiment)) {
                groupedData[monthYear][sentiment]++;
            } else {
                // Handle the case where the sentiment might not be one of the expected values
                // For example, initialize it to Neutral or log an error
                console.error('Unexpected sentiment value:', sentiment);
                groupedData[monthYear]['Neutral']++; // Defaulting to Neutral for this example
            }

            groupedData[monthYear].total++; // Keep track of total reviews for each month
        });


        setTotalReview(last12MonthsReviews.length);



        console.log(Object.values(groupedData))

        return Object.values(groupedData);
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
            <TotalReviewsCard totalReviews={totalReview} />

            {reviews.length > 0 ? <BarChart /> : <p>No reviews data available</p>}
        </div>
    );
};

export default MonthlySentimentB;

const TotalReviewsCard = ({ totalReviews }) => {
    console.log(totalReviews)
    return (
        <div className="total-reviews-card">
            <h2>Total Reviews in the last 12 month</h2>
            <p>{totalReviews}</p>
        </div>
    );
};
