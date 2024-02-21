import React from "react";
import { Grid, Box, Typography, TextField, Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

const StyledGrid = styled(Grid)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(23),
  position: "relative",
  top: "2rem",
  overflow: "hidden",
  height: "85vh",
}));

const StyledGridInner = styled(Grid)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(3),
  backgroundColor: theme.palette.common.white,
  boxShadow: theme.shadows[4],
  borderRadius: theme.shape.borderRadius,
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

const BusinessLogin = () => {
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
      email: data.email,
      password: data.password,
    });

    console.log(dataSet);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3001/auth/login/customer", // Change this to your backend URL
      headers: {
        "Content-Type": "application/json",
      },
      data: dataSet,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        navigate("/customer/home");
      })
      .catch((error) => {
        console.log;
        console.log(error);
      });
  };

  return (
    <Box sx={{ bgcolor: "background.paper", height: "100vh" }}>
      <StyledGrid container justifyContent={"center"}>
        <StyledGridInner item sm={7.5} md={5.5}>
          <Box
            component="div"
            sx={{
              display: "flex",
              flexDirection: "column",
              // width: { xs: "79%", sm: "55%", md: "45%", lg: "34%", xl: "32%" },
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack>
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
                  sx={{ mb: 2.2 }}
                />
                {errors.email && (
                  <Typography
                    variant="body4"
                    sx={{ color: "error.main", mb: 1 }}
                  >
                    {errors.email.message}
                  </Typography>
                )}
                <StyledTextField
                  label="Password"
                  variant="outlined"
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <Typography
                    variant="body4"
                    sx={{ color: "error.main", mb: 1 }}
                  >
                    {errors.password.message}
                  </Typography>
                )}

                <StyledButton
                  type="submit"
                  onClick={handleSubmit(onSubmit)}
                  variant="contained"
                  sx={{
                    mt: 3,
                    px: 10,
                    alignSelf: "center",
                    textAlign: "center",
                  }}
                >
                  Sign In
                </StyledButton>
                <Typography
                  variant="body3"
                  component="p"
                  align="center"
                  sx={{ mt: 4, mr: 3 }}
                >
                  Don't have an Business Account?
                  <Button
                    variant="text"
                    align="center"
                    color="primary"
                    onClick={() => navigate("/business/register")}
                  >
                    Register
                  </Button>
                </Typography>
              </Stack>
            </form>
          </Box>
        </StyledGridInner>
      </StyledGrid>
    </Box>
  );
};

export default BusinessLogin;
