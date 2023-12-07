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
import { useForm } from "react-hook-form";
import axios from 'axios';
import { styled } from "@mui/system";
import Icon1 from "../../../assets/jpg/register.jpg";
import { useNavigate } from "react-router-dom";



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
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);
   
    let userData = {
      email: data.email,
      password: data.password,
    };
  
    let dataSet = JSON.stringify({
      "email": data.email,
      "password": data.password
    });
    
    console.log(dataSet);
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:3001/auth/login/customer', // Change this to your backend URL
      headers: { 
        'Content-Type': 'application/json'
      },
      data : dataSet
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log
      console.log(error);
    });
    
  };
  
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
          <form onSubmit={handleSubmit(onSubmit)} >
            <Stack>
              <StyledTextField
                label="Email"
                variant="outlined"
                type="email"
                {...register("email", {
                  required: "This field is required",
                })}
                placeholder="example.email@gmail.com"
                sx={{ mb: 2.6 }}
              />
              <StyledTextField
                label="Password"
                variant="outlined"
                type="password"
                {...register("password")}

                placeholder="Enter your password"
              />
              <StyledButton
                type="submit"
                onClick = {handleSubmit(onSubmit)}
                variant="contained"
                sx={{ mt: 3, px: 10, alignSelf: "center", textAlign: "center" }}
              >
                Sign In
              </StyledButton>
            </Stack>
          </form>
        </Box>
      </StyledGridInner>
    </StyledGrid>
  );
};

export default Login;
