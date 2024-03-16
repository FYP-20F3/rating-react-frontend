import { Link } from "react-router-dom";
import Logo from "../../../assets/svg/Logo";
import { Typography, Box } from "@mui/material";

const LogoBox = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Link to="/">
        <Logo />
        <Typography
          variant="h2"
          component="span"
          sx={{ mr: "auto", fontWeight: 700, position: "fixed", top: "14px" }}
        >
          VOC
        </Typography>
      </Link>
    </Box>
  );
};

export default LogoBox;
