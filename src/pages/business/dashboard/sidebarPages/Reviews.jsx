import React from "react";
import { Box } from "@mui/material";

import ReviewFilter from "../../../../components/business/reviewfilter/ReviewFilter";

const Reviews = () => {

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        pt: 8,
        pb: 2,
        px: 18,
      }}
    >
      <ReviewFilter />
    </Box>
  );
};

export default Reviews;
