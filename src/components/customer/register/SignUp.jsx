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
  marginBottom: theme.spacing(13),
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
   width: 400,
  height: 350,
  [theme.breakpoints.down("sm")]: {
    width: 250,
    height: 200,
  },
  margin: "0 auto"
}));

const description = [
  "By creating an account, you agree to this app's ",
  "Terms ",
  "and ",
  "Privacy Policy.",
];
const SignUp = () => {
  return (
    <StyledGrid container>
      <StyledGridInner item xs={12} md={6} xl={6}>
        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: "column",
            width: { xs: "79%", sm: "60%", md: "83%", lg: "65%", xl: "60%" },
          }}
        >
          <StyledTypography
            variant="h2"
            align="center"
            sx={{ fontSize: "1.5rem", fontWeight: "700" }}
          >
            Create an account
          </StyledTypography>
          <Typography
            sx={{ mb: 4, width: { xs: 250, md: 330 }, mx: "auto" }}
            align="center"
            component="div"
          >
            {description.map((item, index) => {
              const color = index % 2 === 0 ? "secondary" : "primary";
              return (
                <Typography key={index} color={color} variant="body4">
                  {item}
                </Typography>
              );
            })}
          </Typography>
          <StyledTextField
            label="First Name"
            variant="outlined"
            type="text"
            sx={{ mb: 2.6 }}
          />
          <StyledTextField
            label="Last Name"
            variant="outlined"
            type="text"
            sx={{ mb: 2.6 }}
          />
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
            sx={{ mt: 3, width: 300, alignSelf: "center", textAlign: "center" }}
          >
            Sign Up
          </StyledButton>
          <Typography variant="body3" align="center" sx={{ mt: 10, mr: 3 }}>
            Have an account?{" "}
            <Typography variant="body3" align="center" color="primary">
              Log in
            </Typography>
          </Typography>
        </Box>
      </StyledGridInner>
      <StyledGridInner item xs={12} md={6} xl={4} sx={{ order: { xs: -1, md: 3 } }}>
        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            ml: 5,
            mr: 5,
            bgcolor: "background.paper",
            borderRadius: "0rem 7rem 0rem 7rem",
            px: {xs: 3, xl: 0},
          }}
        >
          <StyledTypography
            variant="h2"
            sx={{ fontWeight: 500, mt: 4 }}
            align="center"
          >
            Welcome to VOC!
          </StyledTypography>
          <StyledTypography variant="body3" align="center" sx={{ mb: 5 }}>
            First thing first, let set you up with an account. &#128075;
          </StyledTypography>
          <StyledImage src={Icon1} alt="Welcome Image" />
        </Box>
      </StyledGridInner>
    </StyledGrid>
  );
};

export default SignUp;
