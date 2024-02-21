import { Grid, Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { styled } from "@mui/system";
import axios from "axios";
import { useForm } from "react-hook-form";

const StyledGrid = styled(Grid)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(13),
  position: "relative",
  top: "0rem",
  overflow: "hidden",
  height: "107vh",
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

const BusinessRegister = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    // console.log(data);

    console.log("hello");
  };
  return (
    <Box sx={{ bgcolor: "background.paper", height: "113vh" }}>
      <StyledGrid container justifyContent={"center"}>
        <StyledGridInner item sm={6.9} md={5.5}>
          <Box
            component="div"
            sx={{
              display: "flex",
              flexDirection: "column",
              width: { xs: "79%", sm: "60%", md: "75%", lg: "60%", xl: "60%" },
            }}
          >
            <StyledTypography
              variant="h3"
              align="center"
              sx={{ fontSize: "1.3rem", fontWeight: "700", mb: 4 }}
            >
              Create Your Business Account
            </StyledTypography>
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
              control={control}
            >
              <StyledTextField
                label="Business Name"
                variant="outlined"
                type="text"
                {...register("businessName", {
                  required: "Business Name is required",
                })}
                sx={{ mb: 2.2 }}
              />
              {errors.businessName && (
                <Typography variant="body4" sx={{ color: "error.main", mb: 1 }}>
                  {errors.businessName.message}
                </Typography>
              )}

              <StyledTextField
                label="Website Link"
                variant="outlined"
                type="text"
                {...register("website", {
                  required: "Website Link is required",
                  pattern: {
                    value: /^(http|https|www):\/\/[^ "]+$/,
                    message: "Invalid website link format",
                  },
                })}
                sx={{ mb: 2.2 }}
              />
              {errors.website && (
                <Typography variant="body4" sx={{ color: "error.main", mb: 1 }}>
                  {errors.website.message}
                </Typography>
              )}

              <StyledTextField
                label="Business Email"
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
                sx={{
                  mt: 2.3,
                  width: 300,
                  alignSelf: "center",
                  textAlign: "center",
                }}
                onClick={handleSubmit(onSubmit)}
              >
                Sign Up
              </StyledButton>
              <Typography
                variant="body3"
                component="p"
                align="center"
                sx={{ mt: 5, mr: 3 }}
              >
                Have an account?
                <Button
                  variant="text"
                  align="center"
                  color="primary"
                  onClick={() => navigate("/business/login")}
                >
                  Log in
                </Button>
              </Typography>
            </form>
          </Box>
        </StyledGridInner>
      </StyledGrid>
    </Box>
  );
};

export default BusinessRegister;
