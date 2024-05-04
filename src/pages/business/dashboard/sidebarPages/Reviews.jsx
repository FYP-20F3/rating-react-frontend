import React from "react";
import { Box } from "@mui/material";

import ReviewFilter from "../../../../components/business/reviewfilter/ReviewFilter";

const Reviews = () => {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
      }}
    >
      <ReviewFilter />
    </Box>
  );
};

export default Reviews;
