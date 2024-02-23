import { useState } from "react";
import {
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  IconButton,
  Snackbar,
} from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../const/APIS";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import { signInSuccess, signInFailure } from "../../../redux/userSlice";

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

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.user);

  const handleClose = (reason) => {
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

  const onSubmit = async (data) => {
    console.log("data", data);
    let payload = {
      email: data.email,
      password: data.password,
    };
    console.log(payload);

    try {
      const response = await axios.post(
        `${BASE_URL}auth/login/customer`,
        payload
      );
      console.log("response:", response);
      const { token, rest } = response.data;
      dispatch(signInSuccess({ token, rest }));
      navigate("/customer/home");
    } catch (err) {
      console.log(err.response);
      if (err.response.data.msg) {
        console.log(err.response.data.msg);
        dispatch(signInFailure(err.response.data.msg));
        setOpen(true);
      } else {
        let arr = err.response.data.error.split(":");
        dispatch(signInFailure(arr[0]));
        setOpen(true);
      }
    }
  };

  return (
    <>
      <StyledGrid container sx={{ width: "100%" }}>
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
              </Stack>
            </form>
          </Box>
        </StyledGridInner>
      </StyledGrid>
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

export default Login;
