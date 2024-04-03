import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios
import { ResponsiveBar } from '@nivo/bar'; // Import Nivo ResponsiveBar
import { useSelector } from "react-redux";
import { BASE_URL } from "../../../const/APIS";

const AnalysisFilter = () => {
    const { currentUser, token } = useSelector((state) => state.user);

    const [reviews, setReviews] = useState([]);
    const colors = {
        '1': '#d32f2f', // Red for 1-star reviews
        '2': '#ff5722', // Deep orange for 2-star reviews
        '3': '#ffc107', // Amber for 3-star reviews
        '4': '#4caf50', // Green for 4-star reviews
        '5': '#1976d2'  // Blue for 5-star reviews
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
        const sortedData = processedData.sort((a, b) => {
            const partsA = a.monthYear.split(' ');
            const partsB = b.monthYear.split(' ');
            const dateA = new Date(`${partsA[1]}-${partsA[0]}-01`);
            const dateB = new Date(`${partsB[1]}-${partsB[0]}-01`);
            return dateA - dateB;
        });
        setReviews(sortedData); // Update this line
    };


    const processData = (reviews) => {
        const groupedData = {};
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const now = new Date();
        const lastYear = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());

        reviews.forEach(({ reviewRating, createdAt }) => {
            const reviewDate = new Date(createdAt);
            if (reviewDate >= lastYear) { // Filter reviews from the last year
                const monthIndex = reviewDate.getMonth();
                const year = reviewDate.getFullYear();
                const monthYear = `${monthNames[monthIndex]} ${year}`;

                if (!groupedData[monthYear]) {
                    groupedData[monthYear] = { monthYear, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, total: 0 };
                }
                groupedData[monthYear][reviewRating]++;
                groupedData[monthYear].total++; // Keep track of total reviews for each month
            }
        });

        // Convert counts to percentages
        Object.values(groupedData).forEach(data => {
            ['1', '2', '3', '4', '5'].forEach(rating => {
                data[rating] = (data[rating] / data.total) * 100; // Convert to percentage
            });
            delete data.total; // Remove total count as it's no longer needed
        });

        return Object.values(groupedData);
    };

    const sortedData = processData(reviews).sort((a, b) => {
        const [yearA, monthA] = a.monthYear.split('-').map(Number);
        const [yearB, monthB] = b.monthYear.split('-').map(Number);
        return yearA !== yearB ? yearA - yearB : monthA - monthB;
    });





    const BarChart = () => {
        const tickValues = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];


        return (
            <ResponsiveBar
                data={reviews}
                keys={['1', '2', '3', '4', '5']}
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
            <p className="legend-container" style={{ marginBottom: "10px" }}>Analysis Filter</p>
            <div className="legend-container" >
                {Object.keys(colors).map(rating => (
                    <div key={rating} className="legend-item " style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', marginLeft: '20px' }}>
                        <span className="legend-color" style={{ backgroundColor: colors[rating], width: '20px', height: '20px', display: 'inline-block', marginRight: '10px', borderRadius: '50%' }}></span>
                        <span className="legend-text">{rating}-star reviews</span>
                    </div>
                ))}
            </div>

            {/* Conditionally render the BarChart only if reviews exist */}


            {reviews.length > 0 ? <BarChart /> : <p>No reviews data available</p>}
        </div>
    );
};

export default AnalysisFilter;
