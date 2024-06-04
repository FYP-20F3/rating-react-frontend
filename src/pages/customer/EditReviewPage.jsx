import { Box } from "@mui/material";
import EditReview from "../../components/customer/createReview/EditReview";

const EditReviewPage = () => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "background.paper",
          paddingTop: ".1rem",
          paddingBottom: "1rem",
        }}
      >
        <EditReview />
      </Box>
    </>
  );
};
export default EditReviewPage;
