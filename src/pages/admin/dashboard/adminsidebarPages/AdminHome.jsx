import { useSelector } from "react-redux";
import { businessLoginPath } from "../../../../const/path";
import { Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import AdminCardsLayout from "../../../../components/admin/adminhome/AdminCardsLayout";

const AdminHome = () => {
  const { token, currentUser } = useSelector((state) => state.user);

  if (!token) {
    return <Navigate to={businessLoginPath} />;
  }

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
      }}
    >
      <AdminCardsLayout id={currentUser._id} token={token} />
    </Box>
  );
};

export default AdminHome;
