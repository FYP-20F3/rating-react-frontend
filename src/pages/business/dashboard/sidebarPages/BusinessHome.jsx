import { useSelector } from "react-redux";
import { customerLoginPath } from "../../../../const/path";
import { Navigate } from "react-router-dom";
import { Box } from "@mui/material";

const BusinessHome = () => {
  const { token } = useSelector((state) => state.user);

  if (!token) {
    return <Navigate to={customerLoginPath} />;
  }

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        pt: 8,
        pb: 2,
        px: 18,
      }}
    >
      <div>home</div>
      <div>home</div>
      <div>home</div>
      <div>home</div>
      <div>home</div>
      <div>home</div>
      <div>home</div>
      <div>home</div>
    </Box>
  );
};

export default BusinessHome;
