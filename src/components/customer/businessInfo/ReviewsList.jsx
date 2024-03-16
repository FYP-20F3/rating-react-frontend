import { Box, Divider, Grid, styled } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { CardHeader } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const StyledGrid = styled(Grid)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: theme.spacing(12),
  marginTop: theme.spacing(7),
}));

const StyledCard = styled(Grid)(({ theme }) => ({
  display: "flex",
  borderRadius: "10px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  backgroundColor: theme.palette.background.paper,
}));

const ReviewsList = () => {
  return (
    <StyledGrid container spacing={1}>
      <Grid item xs={12} md={7} lg={8}>
        <StyledCard sx={{ mx: 10, p: 2, mb: 5 }}>
          <CardMedia
            component="img"
            sx={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              marginTop: "auto",
              marginBottom: "auto",
            }}
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbyWPR_XEwFflTnPQw8tNkj2_-8491kECbLpcjpKm3Zw&s" // Replace with your image source
            alt="Profile Picture"
          />
          <CardContent sx={{ flex: 1 }}>
            <Typography gutterBottom variant="h6" component="div">
              User Name
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Write your review here...
            </Typography>
          </CardContent>
          <Button variant="contained" className="my-7 mr-3">
            Write a Review
          </Button>
        </StyledCard>
        <Box
          sx={{
            ml: 10,
            mr: 30,
            backgroundColor: "background.paper",
            py: 2,
            px: 5,
            borderRadius: 2,
          }}
        >
          <Box>
            <Typography
              variant="h6"
              component="p"
              className="text-lg font-medium text-gray-500"
            >
              Reviews
            </Typography>
          </Box>
          <Box className="star-rating">
            <Link>5 star</Link>
            <Box className="star-rating-bar bg-gray-200">
              <Box className="star-rating-fill" style={{ width: "70%" }} />
            </Box>
            <Typography
              variant="body2"
              component="span"
              className="star-rating-percentage"
            >
              70%
            </Typography>
          </Box>
          <Box className="star-rating">
            <Link>4 star</Link>
            <Box className="star-rating-bar bg-gray-200">
              <Box className="star-rating-fill" style={{ width: "17%" }} />
            </Box>
            <Typography
              variant="body2"
              component="span"
              className="star-rating-percentage"
            >
              17%
            </Typography>
          </Box>
          <Box className="star-rating">
            <Link>3 star</Link>
            <Box className="star-rating-bar bg-gray-200">
              <Box className="star-rating-fill" style={{ width: "8%" }} />
            </Box>
            <Typography
              variant="body2"
              component="span"
              className="star-rating-percentage"
            >
              8%
            </Typography>
          </Box>
          <Box className="star-rating">
            <Link>2 star</Link>
            <Box className="star-rating-bar bg-gray-200">
              <Box className="star-rating-fill" style={{ width: "4%" }} />
            </Box>
            <Typography
              variant="body2"
              component="span"
              className="star-rating-percentage"
            >
              4%
            </Typography>
          </Box>
          <Box className="star-rating">
            <Link>1 star</Link>
            <Box className="star-rating-bar bg-gray-200">
              <Box className="star-rating-fill" style={{ width: "1%" }} />
            </Box>
            <Typography
              variant="body2"
              component="span"
              className="star-rating-percentage"
            >
              1%
            </Typography>
          </Box>
          <Divider sx={{ mt: 3 }} />
          <Box sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              className="text-blue-600 border-blue-600 hover:bg-blue-200"
            >
              Filter
              <FilterAltIcon className="ml-1" />
            </Button>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={7} lg={3.5} className="mr-8">
        <Card className="">
          <CardHeader title="Company Activity" />
          <Divider />
          <CardContent>
            <Link underline="none">
              <Typography
                variant="body2"
                component="p"
                className="text-blue-600 hover:underline"
              >
                Progress Dashboard
              </Typography>
            </Link>
          </CardContent>
        </Card>
      </Grid>
    </StyledGrid>
  );
};
export default ReviewsList;
