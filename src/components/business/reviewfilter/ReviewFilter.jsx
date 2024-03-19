import React, { useEffect, useState } from 'react';
import { TextField, Select, MenuItem, InputLabel, FormControl, Grid, Button } from '@mui/material';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { Card, CardContent, } from '@mui/material';
import Rating from '@mui/material/Rating';
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../../const/APIS";



import { Box } from "@mui/material";

const dummyReviews = [
    { title: 'Excellent service', reviewType: 'Service', description: 'The service was excellent and exceeded my expectations.', rating: 5, replyStatus: 'Replied', date: '2023-03-15' },
    { title: 'Good support, but slow', reviewType: 'Delivery', description: 'The support provided was good, but the response time was slow.', rating: 3, replyStatus: 'Not Replied', date: '2023-03-14' },
    { title: 'Unsatisfactory experience', reviewType: 'Product', description: 'My experience was unsatisfactory due to several issues with the service.', rating: 1, replyStatus: 'Replied', date: '2023-03-13' },
    { title: 'Very helpful', reviewType: 'Packaging', description: 'The support team was very helpful and guided me through the process.', rating: 4, replyStatus: 'Replied', date: '2023-03-12' },
    { title: 'Average service', reviewType: 'Service', description: 'The service provided was average and did not meet my expectations.', rating: 3, replyStatus: 'Not Replied', date: '2023-03-11' }
];
const ReviewFilter = () => {
    const { currentUser, token } = useSelector((state) => state.user);
    const [starRating, setStarRating] = useState('');
    const [replyStatus, setReplyStatus] = useState('');
    const [reviewDate, setReviewDate] = useState('');
    const [filteredReviews, setFilteredReviews] = useState(dummyReviews);
    const [reviewType, setReviewType] = useState('');
    const [reviews, setReviews] = useState([])

    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        filterReviews();
    }, [starRating, replyStatus, reviewDate, searchQuery, reviewType]);

    const filterReviews = async () => {
        console.log(currentUser)
        console.log(token)

        const response = await axios.get(
            `${BASE_URL}reviews/business/${currentUser._id}`,
            {
                headers: {
                    // Assuming the token is a Bearer token; adjust if using a different scheme
                    Authorization: `Bearer ${token}`
                }
            }
        );
        console.log(response.data)
        setReviews(response.data)
        let filtered = response.data;

        // Filter by star rating
        if (starRating) {
            filtered = filtered.filter(review => review.reviewRating === starRating);
        }
        if (reviewType) {
            filtered = filtered.filter(review => review.reviewType === reviewType);
        }

        // Filter by reply status
        if (replyStatus) {
            filtered = filtered.filter(review => replyStatus === 'replied' ? review.replyStatus === 'Replied' : review.replyStatus === 'Not Replied');
        }

        // Sort by date
        if (reviewDate) {
            filtered = filtered.sort((a, b) => reviewDate === 'newest' ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date));
        }

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(review => review.title.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        setFilteredReviews(filtered);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleRatingChange = (event) => {
        setStarRating(event.target.value);
    };

    const handleReplyChange = (event) => {
        setReplyStatus(event.target.value);
    };

    const handleDateChange = (event) => {
        setReviewDate(event.target.value);
    };
    const clearFilters = () => {
        setStarRating('');
        setReplyStatus('');
        setReviewDate('');
        setFilteredReviews(dummyReviews);
    };
    const handleSearch = () => {
        filterReviews();
    };

    return (
        <div className="p-4">
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={4}>
                    <TextField
                        label="Search"
                        variant="outlined"
                        fullWidth
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </Grid>
                <Grid item xs={12} sm={2}>
                    <FormControl fullWidth>
                        <InputLabel>Review Type</InputLabel>
                        <Select
                            value={reviewType}
                            onChange={(e) => setReviewType(e.target.value)}
                            label="Review Type"
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="Service">Service</MenuItem>
                            <MenuItem value="Delivery">Delivery</MenuItem>
                            <MenuItem value="Product">Product</MenuItem>
                            <MenuItem value="Packaging">Packaging</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6} sm={2}>
                    <FormControl fullWidth>
                        <InputLabel>Star Rating</InputLabel>
                        <Select
                            value={starRating}
                            onChange={handleRatingChange}
                            label="Star Rating"
                        >
                            <MenuItem value={1}>1 Star</MenuItem>
                            <MenuItem value={2}>2 Stars</MenuItem>
                            <MenuItem value={3}>3 Stars</MenuItem>
                            <MenuItem value={4}>4 Stars</MenuItem>
                            <MenuItem value={5}>5 Stars</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6} sm={2}>
                    <FormControl fullWidth>
                        <InputLabel>Reply</InputLabel>
                        <Select
                            value={replyStatus}
                            onChange={handleReplyChange}
                            label="Reply"
                        >
                            <MenuItem value="replied">Replied</MenuItem>
                            <MenuItem value="not_replied">Not Replied</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6} sm={2}>
                    <FormControl fullWidth>
                        <InputLabel>Date</InputLabel>
                        <Select
                            value={reviewDate}
                            onChange={handleDateChange}
                            label="Date"
                        >
                            <MenuItem value="newest">Newest First</MenuItem>
                            <MenuItem value="oldest">Oldest First</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6} sm={2}>
                    <Button onClick={handleSearch} variant="contained" color="primary" className="w-full px-4 py-3">Search</Button>
                </Grid>
            </Grid>
            <List className="mt-4">
                {filteredReviews.map((review, index) => (
                    <ReviewItem key={index} review={review} />
                ))}
            </List>
        </div>
    );
};

export default ReviewFilter;


const ReviewItem = ({ review }) => {
    return (
        <Card variant="outlined" className="mb-4 bg-white">
            <CardContent>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                    {review.reviewTitle}
                </Typography>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={6}>
                        <Rating name="read-only" value={review.reviewRating} readOnly />
                    </Grid>
                    <Grid item xs={12} sm={6} className="text-right">
                        <Typography variant="body2" color="text.secondary">
                            {review.dateOfExperience} 
                        </Typography>
                    </Grid>
                </Grid>
                <Typography variant="body2" component="p" className="mt-2">
                    {review.reviewDescription}
                </Typography>
                <Grid container spacing={1} className="mt-2">
                    <Grid item>
                        <Button variant="outlined" size="small">Reply</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" size="small">Share</Button>
                    </Grid>
                </Grid>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={10}>
                        <TextField
                            label="Write a reply..."
                            multiline
                            variant="outlined"
                            fullWidth
                            className="mt-2"
                        />
                    </Grid>
                    <Grid item xs={12} sm={2}>

                        <Button variant="contained" fullWidth color="primary" className="mt-2 py-3 px-4">
                            Post reply
                        </Button>
                    </Grid>
                </Grid>

            </CardContent>
        </Card>
    );
};
