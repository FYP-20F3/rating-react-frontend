import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios
import { ResponsiveBar } from '@nivo/bar'; // Import Nivo ResponsiveBar
import { useSelector } from "react-redux";
import { BASE_URL } from "../../../const/APIS";

const AnalysisFilter = () => {
    const { currentUser, token } = useSelector((state) => state.user);

    const [reviews, setReviews] = useState([]);

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
        setReviews(processData(response.data)); // Process data before setting it
    };

    // Function to process review data for Nivo bar chart
    const processData = (reviews) => {
        const groupedData = {};
        reviews.forEach(({ reviewRating, createdAt }) => {
            const month = new Date(createdAt).getMonth() + 1; // JavaScript months are 0-indexed
            const year = new Date(createdAt).getFullYear();
            const monthYear = `${year}-${month.toString().padStart(2, '0')}`; // Format as "YYYY-MM"

            if (!groupedData[monthYear]) {
                groupedData[monthYear] = { monthYear, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 };
            }
            groupedData[monthYear][reviewRating]++;
        });
        console.log(groupedData)
        return Object.values(groupedData);
    };


    const BarChart = () => {
        const tickValues = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

        return (
            <ResponsiveBar
                data={reviews}
                keys={['1', '2', '3', '4', '5']}
                indexBy="monthYear"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                minValue={0}
                maxValue={100}
                colors={{ scheme: 'nivo' }}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Month-Year',
                    legendPosition: 'middle',
                    legendOffset: 32
                }}
                enableLabel={false} // Disable labels on top of each bar

                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Number of reviews',
                    legendPosition: 'middle',
                    legendOffset: -40,
                    tickValues: tickValues, // Use the custom tick values array
                    // format: v => `${v}`, // Format tick values as string
                    domain: [0, 100] // Set the domain for y-axis to [0, 100]
                }
                }
            />
        );
    };



    return (
        <div style={{ height: "500px" }}>
            <h1>Analysis Filter</h1>
            {/* Conditionally render the BarChart only if reviews exist */}
            {reviews.length > 0 ? <BarChart /> : <p>No reviews data available</p>}
        </div>
    );
};

export default AnalysisFilter;
