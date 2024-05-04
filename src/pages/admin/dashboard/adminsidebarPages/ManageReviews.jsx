import React from "react";
import { Box } from "@mui/material";

import AdminFilterBox from "../../../../components/admin/managereviews/AdminFilterBox";

const ManageReviews = () => {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
      }}
    >
      <AdminFilterBox />
    </Box>
  );
};

export default ManageReviews;
