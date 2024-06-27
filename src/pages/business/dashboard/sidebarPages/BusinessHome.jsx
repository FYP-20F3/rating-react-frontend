import { useSelector } from "react-redux";
import { businessLoginPath } from "../../../../const/path";
import { Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import HomeCardsLayout from "@components/business/businesshome/HomeCardsLayout";

const BusinessHome = () => {
  const { token, currentUser } = useSelector((state) => state.user);

  if (!token) {
    return <Navigate to={businessLoginPath} />;
  }

  console.log(currentUser, "currentUser");
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
      }}
    >
      <HomeCardsLayout id={currentUser._id} token={token}/>
    </Box>
  );
};

export default BusinessHome;
