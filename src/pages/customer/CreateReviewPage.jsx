import { Box } from "@mui/material";
import ReviewForm from "../../components/customer/createReview/ReviewForm";

const CreateReviewPage = () => {
  
  return (
    <>
      <Box
        sx={{
          backgroundColor: "background.paper",
          paddingTop: ".1rem",
          paddingBottom: "1rem",
        }}
      >
        <ReviewForm />
      </Box>
    </>
  );
};
export default CreateReviewPage;
