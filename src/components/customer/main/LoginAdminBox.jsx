import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginAdminBox = () => {
  const navigate = useNavigate();
  return (
    <Box className="tw-flex tw-justify-center tw-items-center tw-bg-[#FEF6F1] tw-py-4">
      <Typography variant="h5" className="tw-text-orange-600">
        Are you an admin?
      </Typography>
      <Button
        variant="contained"
        sx={{ px: 3.6 }}
        onClick={() => {
          navigate("/admin/login");
        }}
        className="tw-ml-10 tw-bg-amber-500 tw-rounded-2xl"
      >
        Login
      </Button>
    </Box>
  );
};
export default LoginAdminBox;
