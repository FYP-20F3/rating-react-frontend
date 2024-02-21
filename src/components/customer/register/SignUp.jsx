import React from "react";
import { Grid, Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { styled } from "@mui/system";
import Icon1 from "../../../assets/jpg/register.jpg";
import axios from "axios";
import { useForm } from "react-hook-form";

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
  margin: "0 auto",
}));

const description = [
  "By creating an account, you agree to this app's ",
  "Terms ",
  "and ",
  "Privacy Policy.",
];

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);

    let userData = {
      email: data.email,
      password: data.password,
    };

    let dataSet = JSON.stringify({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      picturePath: "http://dummyimage.com/193x100.png/ff4444/ffff",
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3001/auth/register/customer", // Change this to your backend URL
      headers: {
        "Content-Type": "application/json",
      },
      data: dataSet,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        navigate("/customer/login");
      })

      .catch((error) => {
        console.log;
        console.log(error);
      });
  };
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

          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ display: "flex", flexDirection: "column", width: "100%" }}
          >
            <StyledTextField
              label="First Name"
              variant="outlined"
              type="text"
              {...register("firstName", {
                required: "This field is required",
              })}
              sx={{ mb: 2.6 }}
            />
            {errors.firstName && (
              <Typography variant="body4" sx={{ color: "error.main", mb: 1 }}>
                {errors.firstName.message}
              </Typography>
            )}

            <StyledTextField
              label="Last Name"
              variant="outlined"
              type="text"
              {...register("lastName", {
                required: "This field is required",
              })}
              sx={{ mb: 2.6 }}
            />
            {errors.lastName && (
              <Typography variant="body4" sx={{ color: "error.main", mb: 1 }}>
                {errors.lastName.message}
              </Typography>
            )}
            <StyledTextField
              label="Email"
              variant="outlined"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address",
                },
              })}
              placeholder="example.email@gmail.com"
              sx={{ mb: 2.6 }}
            />
            {errors.email && (
              <Typography variant="body4" sx={{ color: "error.main", mb: 1 }}>
                {errors.email.message}
              </Typography>
            )}
            <StyledTextField
              label="Password"
              variant="outlined"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              })}
              type="password"
              placeholder="Enter your password"
            />
            {errors.password && (
              <Typography variant="body4" sx={{ color: "error.main", mb: 1 }}>
                {errors.password.message}
              </Typography>
            )}
            <StyledButton
              variant="contained"
              onClick={handleSubmit(onSubmit)}
              sx={{
                mt: 3,
                width: 300,
                alignSelf: "center",
                textAlign: "center",
              }}
            >
              Sign Up
            </StyledButton>
            <Typography
              variant="body3"
              component="p"
              align="center"
              sx={{ mt: 5, mr: 3 }}
            >
              Have an account?{" "}
              <Button
                variant="text"
                align="center"
                color="primary"
                onClick={() => navigate("/customer/login")}
              >
                Log in
              </Button>
            </Typography>
          </form>
        </Box>
      </StyledGridInner>
      <StyledGridInner
        item
        xs={12}
        md={6}
        xl={4}
        sx={{ order: { xs: -1, md: 3 } }}
      >
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
            px: { xs: 3, xl: 0 },
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
