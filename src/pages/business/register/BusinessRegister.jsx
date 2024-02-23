import { useState } from "react";
import {
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { styled } from "@mui/system";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import axios from "axios";
import { BASE_URL } from "../../../const/APIS";
import CloseIcon from "@mui/icons-material/Close";

const StyledGrid = styled(Grid)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(13),
  position: "relative",
  top: "0rem",
  overflow: "hidden",
  height: "115vh",
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

const BusinessRegister = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      businessName: "",
      websiteAddress: "",
      businessCategory: "",
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();
  const businessCategoryValue = watch("businessCategory");
  // console.log(businessCategoryValue);

  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  const onSubmit = async (payload) => {
    console.log("payload", payload);

    // let payload = {
    //   businessName: data.businessName,
    //   websiteAddress: data.websiteAddress,
    //   businessCategory: data.businessCategory,
    //   email: data.email,
    //   password: data.password,
    // };
    // console.log(payload);
    // must send the data and field name according to what an apis is expecting

    try {
      const response = await axios.post(
        `${BASE_URL}auth/register/business`,
        payload
      );
      console.log("response:", response);
      navigate("/business/login");
    } catch (error) {
      console.log("error:", error);
      let arr = error.response.data.error.split(":");
      console.log(arr);
      setError(arr[0]);
      setOpen(true);
    }
  };

  return (
    <>
      <Box sx={{ bgcolor: "background.paper", height: "118vh" }}>
        <StyledGrid container justifyContent={"center"}>
          <StyledGridInner item sm={6.9} md={5.5}>
            <Box
              component="div"
              sx={{
                display: "flex",
                flexDirection: "column",
                width: {
                  xs: "79%",
                  sm: "60%",
                  md: "75%",
                  lg: "60%",
                  xl: "60%",
                },
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
                  <Typography
                    variant="body4"
                    sx={{ color: "error.main", mb: 1 }}
                  >
                    {errors.businessName.message}
                  </Typography>
                )}

                <StyledTextField
                  label="Website Link"
                  variant="outlined"
                  type="text"
                  {...register("websiteAddress", {
                    required: "Website Link is required",
                    pattern: {
                      value: /^(http|https|www):\/\/[^ "]+$/,
                      message: "Invalid website link format",
                    },
                  })}
                  sx={{ mb: 2.2 }}
                />
                {errors.websiteAddress && (
                  <Typography
                    variant="body4"
                    sx={{ color: "error.main", mb: 1 }}
                  >
                    {errors.websiteAddress.message}
                  </Typography>
                )}

                <FormControl sx={{ mb: 2.3 }}>
                  <InputLabel id="select-label">Business Category</InputLabel>
                  <Select
                    labelId="select-label"
                    label="Business Category"
                    {...register("businessCategory", {
                      required: "Please Select an option",
                    })}
                    defaultValue=""
                  >
                    <MenuItem value="electronics_tech">
                      Electronics & Technology
                    </MenuItem>
                    <MenuItem value="clothing_store">Clothing Store</MenuItem>
                    <MenuItem value="cosmetics">Cosmetics</MenuItem>
                    <MenuItem value="food">Food</MenuItem>
                  </Select>
                </FormControl>

                {errors.businessCategory && !businessCategoryValue && (
                  <Typography
                    variant="body4"
                    sx={{ color: "error.main", mb: 1 }}
                  >
                    {errors.businessCategory.message}
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
                  <Typography
                    variant="body4"
                    sx={{ color: "error.main", mb: 1 }}
                  >
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
                  sx={{ mt: 3, mr: 3 }}
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
              <DevTool control={control} />
            </Box>
          </StyledGridInner>
        </StyledGrid>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={error}
        action={action}
      />
    </>
  );
};

export default BusinessRegister;
