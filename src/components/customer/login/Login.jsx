import React from "react";
import {
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Divider,
} from "@mui/material";
import { styled } from "@mui/system";
import Icon1 from "../../../assets/jpg/register.jpg";

const StyledGrid = styled(Grid)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(23),
  position: "relative",
  top: "6rem",
  overflow: "hidden",
}));

const StyledGridInner = styled(Grid)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(3),
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  "& .MuiInputBase-input": {
    fontSize: "1rem",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  borderRadius: theme.shape.borderRadius,
  cursor: "pointer",
}));

const StyledImage = styled("img")(({ theme }) => ({
  mixBlendMode: "darken",
  display: "block",
  margin: "0 auto",
  width: 400,
  height: 350,
}));

const description = [
  "By creating an account, you agree to this app's ",
  "Terms ",
  "and ",
  "Privacy Policy.",
];
const Login = () => {
  return (
    <StyledGrid container sx={{width:"100%"}}>
      <StyledGridInner item xs={12}>
        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: "column",
            width: { xs: "79%", sm: "55%", md: "45%", lg: "34%", xl: "32%" },
          }}
        >
          <StyledTypography
            variant="h2"
            align="center"
            sx={{ fontWeight: "800" }}
          >
            Welcome back
          </StyledTypography>
          <Typography
            sx={{ mb: 6, mx: "auto" }}
            align="center"
            component="div"
            variant="body3"
          >
            Enter your details to get sign in to your account.
          </Typography>
          <StyledTextField
            label="Email"
            variant="outlined"
            type="email"
            placeholder="example.email@gmail.com"
            sx={{ mb: 2.6 }}
          />
          <StyledTextField
            label="Password"
            variant="outlined"
            type="password"
            placeholder="Enter your password"
          />
          <StyledButton
            variant="contained"
            sx={{ mt: 3, px: 10, alignSelf: "center", textAlign: "center" }}
          >
            Sign In
          </StyledButton>
        </Box>
      </StyledGridInner>
    </StyledGrid>
  );
};

export default Login;
