import Logo from "../../../assets/svg/Logo";
import { Typography, Box } from "@mui/material";

const LogoBox = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Logo />
      <Typography
        variant="h2"
        component="span"
        sx={{ mr: "auto", fontWeight: 700 }}
      >
        VOC
      </Typography>
    </Box>
  );
};

export default LogoBox;
