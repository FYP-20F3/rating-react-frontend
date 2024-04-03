import styled from "@emotion/styled";
import { Button, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const StyledCard = styled(Grid)(({ theme }) => ({
  display: "flex",
  borderRadius: "10px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  backgroundColor: theme.palette.background.paper,
}));

const ReviewBox = ({ handleClick }) => {
  const { currentUser } = useSelector((state) => state.user);
  const userName = currentUser?.firstName + " " + currentUser?.lastName;

  return (
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
        image={currentUser?.picturePath} // Replace with your image source
        alt="Profile Picture"
      />
      <CardContent sx={{ flex: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {userName}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            textDecoration: "none", // Remove default underline
            "&:hover": {
              textDecoration: "underline", // Add underline on hover
              color: "info.main",
            },
          }}
          onClick={handleClick}
        >
          Write a review
        </Typography>
      </CardContent>
      <Button
        variant="contained"
        className="tw-my-7 tw-mr-3"
        onClick={handleClick}
      >
        Give Review
      </Button>
    </StyledCard>
  );
};
export default ReviewBox;
